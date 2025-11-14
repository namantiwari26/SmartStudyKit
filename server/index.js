require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const agentStore = {};     // maps channel -> { agent_id, meta }
const agentEvents = {};    // maps channel -> [ {type, text, ts} ... ]

// helper to push events
function pushEvent(channel, event) {
  agentEvents[channel] = agentEvents[channel] || [];
  agentEvents[channel].push({ ...event, ts: Date.now() });
  
  if (agentEvents[channel].length > 200) agentEvents[channel].shift();
}

app.use(cors());
app.use(express.json());

const APP_ID = process.env.APP_ID;
const APP_CERT = process.env.APP_CERTIFICATE;
const CONV_ID = process.env.CONV_AI_CUSTOMER_ID;
const CONV_SECRET = process.env.CONV_AI_CUSTOMER_SECRET;

if (!APP_ID || !APP_CERT || !CONV_ID || !CONV_SECRET) {
  console.error("❌ Missing values in .env file");
  process.exit(1);
}

app.post('/token', (req, res) => {
  try {
    const { channel, uid } = req.body;

    const role = RtcRole.PUBLISHER;
    const expire = 3600; // 1 hour
    const now = Math.floor(Date.now() / 1000);
    const expiredTs = now + expire;

    const token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID,
      APP_CERT,
      channel,
      uid || 0,
      role,
      expiredTs
    );

    res.json({ token, appId: APP_ID });
  } catch (err) {
    res.status(500).json({ error: 'token error' });
  }
});

app.post('/convai/stop', async (req, res) => {
  try {
    const { agent_id, channel } = req.body;
    let idToStop = agent_id;
    if (!idToStop) {
      if (!channel) return res.status(400).json({ error: 'agent_id or channel required' });
      const store = agentStore[channel];
      if (!store) return res.status(400).json({ error: 'no agent found for channel' });
      idToStop = store.agent_id;
    }

    const url = `https://api.agora.io/v1/conversational-ai/agents/${idToStop}/leave`;
    const response = await axios.post(url, {}, {
      auth: { username: CONV_ID, password: CONV_SECRET }
    });

    // cleanup
    if (channel && agentStore[channel]) delete agentStore[channel];
    pushEvent(channel || 'unknown', { type: 'agent_stopped', text: `agent stopped (${idToStop})` });

    return res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('convai stop error', err.response?.data || err.message || err);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.post('/convai/start', async (req, res) => {
  try {
    const { channel, agent_name = 'smart-study-agent', model = 'gpt-4o-mini' } = req.body;
    if (!channel) return res.status(400).json({ error: 'channel is required' });

    // Backend callback URL for Agora to POST ASR/LLM events
    const callbackUrl = process.env.CONVAI_CALLBACK_URL || `http://localhost:${process.env.PORT || 4000}/convai/callback`;

    const body = {
      app_id: APP_ID,
      channel,
      agent_name,
      model,
      // subscribe to all so agent can hear anyone: use ['*'] or explicit uids
      remote_rtc_uids: ['*'],
      // ask Agora to POST events (ASR transcripts, llm replies etc.)
      http_callback: {
        url: callbackUrl,
      
      },
      
    };

    const response = await axios.post(
      'https://api.agora.io/v1/conversational-ai/agents',
      body,
      { auth: { username: CONV_ID, password: CONV_SECRET } }
    );

    const data = response.data;
    // store agent_id keyed by channel for quick stop lookup
    const agentId = data?.agent_id || data?.id || null;
    agentStore[channel] = { agent_id: agentId, meta: data };
    pushEvent(channel, { type: 'agent_created', text: `agent started (${agentId || 'no-id'})` });

    return res.json({ success: true, data });
  } catch (err) {
    console.error('convai start error', err.response?.data || err.message || err);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.post('/convai/stop', async (req, res) => {
  try {
    const { agent_id, channel } = req.body;
    let idToStop = agent_id;
    if (!idToStop) {
      if (!channel) return res.status(400).json({ error: 'agent_id or channel required' });
      const store = agentStore[channel];
      if (!store) return res.status(400).json({ error: 'no agent found for channel' });
      idToStop = store.agent_id;
    }

    const url = `https://api.agora.io/v1/conversational-ai/agents/${idToStop}/leave`;
    const response = await axios.post(url, {}, {
      auth: { username: CONV_ID, password: CONV_SECRET }
    });

    // cleanup
    if (channel && agentStore[channel]) delete agentStore[channel];
    pushEvent(channel || 'unknown', { type: 'agent_stopped', text: `agent stopped (${idToStop})` });

    return res.json({ success: true, data: response.data });
  } catch (err) {
    console.error('convai stop error', err.response?.data || err.message || err);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
});

// GET /convai/events?channel=yourchannel
app.get('/convai/events', (req, res) => {
  const channel = req.query.channel;
  if (!channel) return res.json({ events: [] });
  return res.json({ events: agentEvents[channel] || [] });
});
