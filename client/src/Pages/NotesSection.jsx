import React, { useState } from "react";
import axios from "axios";
const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function NotesSection() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");

  async function gen() {
    if (!text.trim()) return;
    const res = await axios.post(`${SERVER}/summary`, { text });
    setNotes(res.data.summary || res.data || "Notes (mock)");
  }

  return (
    <div>
      <h2>Smart Notes</h2>
      <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Paste lecture / chapter..." style={{ width:"100%", height:150, padding:12, borderRadius:8, border:"1px solid #ddd" }} />
      <button onClick={gen} style={{ marginTop:10, padding:"8px 14px", background:"#0b72ff", color:"#fff", border:"none", borderRadius:8 }}>Generate Notes</button>

      {notes && <div style={{ marginTop:16, padding:12, background:"#fff", borderRadius:8, border:"1px solid #eef2f6" }}>
        <h4>Notes</h4>
        <p>{notes}</p>
      </div>}
    </div>
  );
}
