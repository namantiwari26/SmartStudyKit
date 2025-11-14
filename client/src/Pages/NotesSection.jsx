import React, { useState } from "react";
import axios from "axios";

const SERVER = process.env.REACT_APP_SERVER_URL;

export default function NotesSection() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");

  async function generateNotes() {
    if (!text.trim()) return;

    const res = await axios.post(`${SERVER}/summary`, {
      content: text,
      channel: "notes",
    });

    setNotes(res.data.summary || "Summary generated (mock)");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Smart Notes Generator</h2>

      <textarea
        style={{
          width: "100%",
          height: "150px",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
        placeholder="Paste study material here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={generateNotes}
        style={{
          marginTop: 10,
          padding: "10px 18px",
          background: "#4a9fff",
          border: "none",
          color: "white",
          borderRadius: 8,
        }}
      >
        Generate Notes
      </button>

      {notes && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "#f5f5f5",
            borderRadius: 10,
          }}
        >
          <h3>Generated Notes:</h3>
          <p>{notes}</p>
        </div>
      )}
    </div>
  );
}
