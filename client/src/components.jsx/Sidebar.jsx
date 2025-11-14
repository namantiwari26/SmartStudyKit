import React from "react";

const Item = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      display: "block",
      width: "100%",
      padding: "12px 14px",
      marginBottom: 12,
      background: active ? "#0b72ff" : "#ffffff",
      color: active ? "#fff" : "#222",
      border: "1px solid #e6e9ee",
      borderRadius: 8,
      cursor: "pointer",
      textAlign: "left",
      fontWeight: 600
    }}
  >
    {label}
  </button>
);

export default function Sidebar({ activePage, setActivePage }) {
  return (
    <div style={{ width: 220, padding: 20, borderRight: "1px solid #eef2f6", background: "#fff" }}>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 2 }}>Smart Study Kit</h3>
        <div style={{ color: "#666", fontSize: 13 }}>Hackfest — Learning Assistant</div>
      </div>

      <Item active={activePage === "chat"} onClick={() => setActivePage("chat")} label="Chat AI" />
      <Item active={activePage === "notes"} onClick={() => setActivePage("notes")} label="Smart Notes" />
      <Item active={activePage === "quiz"} onClick={() => setActivePage("quiz")} label="Quiz" />
      <Item active={activePage === "history"} onClick={() => setActivePage("history")} label="History" />

      <div style={{ marginTop: 30, fontSize: 12, color: "#888" }}>
        Team: {process.env.REACT_APP_TEAM || "Your Team"}
      </div>
    </div>
  );
}
