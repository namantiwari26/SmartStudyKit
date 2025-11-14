import React, { useState } from "react";
import axios from "axios";
const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function QuizSection() {
  const [quiz, setQuiz] = useState(null);

  async function load() {
    const res = await axios.post(`${SERVER}/quiz/get`, { channel: "quiz" });
    setQuiz(res.data.questions || res.data.quiz || []);
  }

  return (
    <div>
      <h2>Quiz</h2>
      <button onClick={load} style={{ padding:"8px 14px", background:"#0b72ff", color:"#fff", border:"none", borderRadius:8 }}>Load Quiz</button>
      {quiz && <div style={{ marginTop:16 }}>
        {quiz.map(q => (
          <div key={q.id} style={{ padding:12, background:"#fff", border:"1px solid #eef2f6", borderRadius:8, marginBottom:10 }}>
            <strong>Q:</strong> {q.question || q.q || q.qn}
            <div style={{ marginTop:6, color:"#666" }}>{q.answer ? `Ans: ${q.answer}` : ""}</div>
          </div>
        ))}
      </div>}
    </div>
  );
}
