require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// In-memory storage (for prototype)
const quizzes = {};
const history = [];

// Token endpoint (demo)
app.post('/token', (req, res) => {
  const { channel, uid = 0 } = req.body;
  // For demo return appId only; production: generate token
  return res.json({ appId: process.env.APP_ID || null, token: null });
});

// Start ConvAI agent (demo wrapper)
app.post('/convai/start', async (req, res) => {
  const { channel = 'default', mode = 'explain' } = req.body;
  // Build minimal body to create agent (requires ConvAI creds)
  const systemPrompts = {
    explain: 'You are SmartStudyKit. Explain concisely in bullets.',
    quiz: 'You are QuizMaster. Ask short questions and wait for answers.',
    flashcards: 'You are FlashcardsMaker.'
  };
  const body = {
    app_id: process.env.APP_ID,
    channel,
    agent_name: 'smart-study-agent',
    system_prompt: systemPrompts[mode] || systemPrompts.explain,
    remote_rtc_uids: ['*'],
    asr: { language: 'en-US', params: { language_hints: ['en','hi'] } }
  };

  try {
    const resp = await axios.post('https://api.agora.io/v1/conversational-ai/agents', body, {
      auth: { username: process.env.CONV_AI_CUSTOMER_ID, password: process.env.CONV_AI_CUSTOMER_SECRET }
    });
    return res.json({ success: true, data: resp.data });
  } catch (err) {
    console.error('convai start error', err.response?.data || err.message);
    return res.status(500).json({ error: err.response?.data || err.message });
  }
});

// Simple summary (placeholder)
app.post('/summary', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'no text' });
  const summary = text.split('.').slice(0,4).join('. ') + (text.length>200 ? '...' : '');
  res.json({ summary });
});

// Quiz: create and fetch
app.post('/quiz/get', (req, res) => {
  const { channel = 'default' } = req.body;
  const questions = [
    { id: 1, q: 'What is recursion in one sentence?', answer: 'a function calling itself', explanation: 'Recursion is...' },
    { id: 2, q: 'Which data structure suits DFS? (stack/queue)', answer: 'stack', explanation: 'DFS uses stack.'}
  ];
  const quizId = 'quiz_' + uuidv4();
  quizzes[quizId] = { quizId, channel, questions, createdAt: Date.now() };
  const publicQs = questions.map(({id,q})=>({id,q}));
  res.json({ quizId, questions: publicQs });
});

app.post('/quiz/submit', (req, res) => {
  const { quizId, questionId, answer, userId = 'anon' } = req.body;
  const qset = quizzes[quizId];
  if (!qset) return res.status(404).json({ error: 'quiz not found' });
  const q = qset.questions.find(x => x.id === Number(questionId));
  if (!q) return res.status(404).json({ error: 'question not found' });
  const pass = String(answer).toLowerCase().includes(String(q.answer).toLowerCase());
  history.push({ userId, quizId, questionId, answer, correct: pass, at: Date.now() });
  res.json({ correct: pass, expected: q.answer, explanation: q.explanation });
});

app.get('/history', (req, res) => {
  res.json({ rows: history.slice().reverse() });
});

app.listen(PORT, () => console.log('Server running on', PORT));
