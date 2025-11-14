import React from "react";

export default function Sidebar({ activePage, setActivePage }) {
  const btn = (name, label) => (
    <button
      onClick={() => setActivePage(name)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "12px",
        background: activePage === name ? "#4a9fff" : "#e4e4e4",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "15px",
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        width: "180px",
        height: "100vh",
        background: "#f2f2f2",
        padding: "20px",
        boxShadow: "3px 0px 6px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      {btn("chat", "Chat AI")}
      {btn("notes", "Smart Notes")}
      {btn("quiz", "Quiz")}
      {btn("history", "History")}
    </div>
  );
}
