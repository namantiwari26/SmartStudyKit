import React, { useState } from "react";
import axios from "axios";
const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!text.trim()) return;
    const user = { id: Date.now(), sender: "you", text };
    setMessages(prev => [...prev, user]);
    setText("");
    setLoading(true);
    try {
      const res = await axios.post(`${SERVER}/convai/start`, { channel: "demo", mode: "chat", message: text });
      const bot = { id: Date.now()+1, sender: "bot", text: res.data.data?.message || res.data.data?.mock || "AI responded (mock)" };
      setMessages(prev => [...prev, bot]);
    } catch (e) {
      setMessages(prev => [...prev, { id: Date.now()+2, sender: "bot", text: "Server error. Check backend." }]);
    }
    setLoading(false);
  }

  return (
    <div>
      <h2 style={{ marginBottom: 12 }}>Chat AI</h2>
      <div style={{ height: "60vh", overflowY: "auto", padding: 12, borderRadius: 8, background: "#fff", border: "1px solid #eef2f6" }}>
        {messages.map(m => (
          <div key={m.id} style={{ margin: 8, textAlign: m.sender === "you" ? "right" : "left" }}>
            <div style={{ display: "inline-block", padding: "8px 12px", borderRadius: 12, background: m.sender === "you" ? "#0b72ff" : "#f1f5f9", color: m.sender === "you" ? "#fff" : "#000" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Ask study questions..." style={{ flex:1, padding: 12, borderRadius: 8, border: "1px solid #ddd" }} />
        <button onClick={send} disabled={loading} style={{ padding: "10px 16px", background: "#0b72ff", color:"#fff", border:"none", borderRadius:8 }}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
