import React from "react";

export default function Sidebar({ setPage }) {
  return (
    <div style={{ width: "150px", background: "#eee", padding: "20px" }}>
      <button onClick={() => setPage("chat")}>Chat</button>
      <button onClick={() => setPage("notes")}>Notes</button>
      <button onClick={() => setPage("quiz")}>Quiz</button>
      <button onClick={() => setPage("history")}>History</button>
    </div>
  );
}