import React, { useState } from "react";
import axios from "axios";

const SERVER = process.env.REACT_APP_SERVER_URL;

export default function QuizSection() {
  const [quiz, setQuiz] = useState(null);

  async function loadQuiz() {
    const res = await axios.post(`${SERVER}/quiz/get`, {
      channel: "quiz",
    });

    setQuiz(res.data.quiz || [
      { question: "Mock question 1?", answer: "Answer 1" },
      { question: "Mock question 2?", answer: "Answer 2" },
    ]);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Quiz Generator</h2>

      <button
        onClick={loadQuiz}
        style={{
          padding: "10px 18px",
          background: "#4a9fff",
          border: "none",
          color: "white",
          borderRadius: 8,
        }}
      >
        Load Quiz
      </button>

      {quiz && (
        <div style={{ marginTop: 20 }}>
          {quiz.map((q, i) => (
            <div
              key={i}
              style={{
                background: "#f5f5f5",
                marginBottom: 15,
                padding: 12,
                borderRadius: 8,
              }}
            >
              <strong>Q{i + 1}:</strong> {q.question} <br />
              <em>Ans: {q.answer}</em>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
