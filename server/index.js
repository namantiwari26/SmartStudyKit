require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const APP_ID = process.env.APP_ID || null;
const CONV_ID = process.env.CONV_AI_CUSTOMER_ID || null;
const CONV_SECRET = process.env.CONV_AI_CUSTOMER_SECRET || null;

// simple health
app.get('/', (req,res)=> res.json({ ok: true }));

// mock token endpoint
app.post('/token', (req,res)=>{
  return res.json({ appId: APP_ID || null, token: null });
});

// convai start — mock if no creds, else call Agora new endpoint from docs
app.post('/convai/start', async (req,res) => {
  const { channel = 'test', mode = 'chat', name } = req.body;
  // If credentials present try real call, otherwise mock success
  if (APP_ID && CONV_ID && CONV_SECRET) {
    try {
      const body = {
        name: name || `agent_${Date.now()}`,
        properties: {
          channel,
          token: "server-generated-rtc-token-placeholder",
          agent_rtc_uid: "0",
          remote_rtc_uids: ["*"],
          asr: { language: "en-US" },
          tts: { vendor: "openai" },
          llm: { vendor: "custom", url: "" }
        }
      };
      const url = `https://api.agora.io/api/conversational-ai-agent/v2/projects/${APP_ID}/join`;
      const r = await axios.post(url, body, {
        auth: { username: CONV_ID, password: CONV_SECRET },
        headers: { 'Content-Type': 'application/json' }
      });
      return res.json({ success: true, data: r.data });
    } catch(err) {
      console.error('convai start error', err.response?.status, err.response?.data || err.message);
      return res.status(err.response?.status || 500).json({ error: err.response?.data || err.message });
    }
  } else {
    // mock response for hackathon/demo
    console.log(`[MOCK] convai.start channel=${channel} mode=${mode}`);
    return res.json({ success: true, data: { mock: true, message: `Mock agent started in ${channel}` }});
  }
});

// quiz endpoints
const quizzes = {};
app.post('/quiz/get', (req,res)=>{
  const id = 'quiz_' + uuidv4();
  const questions = [
    { id: 1, question: 'What is recursion?', answer: 'A function that calls itself' },
    { id: 2, question: 'Which data structure is used by DFS?', answer: 'Stack' }
  ];
  quizzes[id] = { id, questions, createdAt: Date.now() };
  res.json({ quizId: id, questions });
});

app.post('/quiz/submit',(req,res)=>{
  const { quizId, questionId, answer } = req.body;
  const qset = quizzes[quizId];
  if(!qset) return res.status(404).json({ error: 'quiz not found' });
  const q = qset.questions.find(x => x.id == questionId);
  const correct = q && String(answer).toLowerCase().includes(String(q.answer).toLowerCase());
  res.json({ correct: !!correct, expected: q?.answer || null });
});

app.get('/history', (req,res)=>{
  // mock empty
  res.json({ history: [] });
});

app.listen(PORT, ()=> console.log('Server listening on', PORT));
