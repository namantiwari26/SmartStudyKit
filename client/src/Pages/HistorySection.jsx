import React, { useEffect, useState } from "react";
import axios from "axios";
const SERVER = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

export default function HistorySection() {
  const [history, setHistory] = useState([]);
  useEffect(()=>{ (async ()=>{ const r = await axios.get(`${SERVER}/history`); setHistory(r.data.history || []); })(); },[]);
  return (
    <div>
      <h2>History</h2>
      {history.length === 0 ? <p>No history yet.</p> : history.map((h,i)=>(
        <div key={i} style={{ padding:12, background:"#fff", border:"1px solid #eef2f6", borderRadius:8, marginBottom:8 }}>
          <div><strong>{h.type || h.event || "Event"}</strong></div>
          <div style={{ color:"#555" }}>{h.content || JSON.stringify(h)}</div>
        </div>
      ))}
    </div>
  );
}
