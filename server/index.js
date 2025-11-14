require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => res.json({ ok: true, msg: "Mock server running" }));

// Mock convai/start — always returns a simple reply for frontend
app.post("/convai/start", (req, res) => {
  console.log("convai.start called ->", req.body);
  const userMessage = req.body?.message || "";
  const reply = `Mock reply: I received '${userMessage}'. (Backend mock)`;
  return res.json({ success: true, data: { message: reply, mock: true }});
});

// Quiz endpoints (mock)
app.post("/quiz/get", (req, res) => {
  const id = "quiz_mock_1";
  const questions = [
    { id: 1, question: "What is recursion?", answer: "When a function calls itself" },
    { id: 2, question: "Which data structure uses FIFO?", answer: "Queue" }
  ];
  return res.json({ quizId: id, questions });
});

app.post("/quiz/submit", (req, res) => {
  const { quizId, questionId, answer } = req.body || {};
  return res.json({ correct: false, expected: "Sample answer (mock)" });
});

app.get("/history", (req, res) => res.json({ history: [] }));

app.listen(PORT, () => console.log("Mock server listening on", PORT));
