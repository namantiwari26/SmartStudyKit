import React, { useState } from "react";
import axios from "axios";

const SERVER = process.env.REACT_APP_SERVER_URL;

export default function ChatSection() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    setLoading(true);

    try {
      const response = await axios.post(`${SERVER}/convai/start`, {
        channel: "test-user",
        mode: "chat",
        message: input,
      });

      const botMessage = {
        sender: "bot",
        text:
          response.data.data?.reply ||
          response.data.data?.message ||
          "AI responded successfully (mock mode)",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "AI Error. Check backend." },
      ]);
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Smart Study Chat</h2>

      <div
        style={{
          height: "65vh",
          overflowY: "auto",
          padding: 10,
          border: "1px solid #ddd",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: msg.sender === "user" ? "#4a9fff" : "#e8e8e8",
                color: msg.sender === "user" ? "white" : "black",
                padding: "10px 15px",
                borderRadius: 10,
                maxWidth: "70%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            padding: "10px 18px",
            background: "#4a9fff",
            border: "none",
            color: "white",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
