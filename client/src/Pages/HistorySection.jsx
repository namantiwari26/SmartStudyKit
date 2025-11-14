import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER = process.env.REACT_APP_SERVER_URL;

export default function HistorySection() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const res = await axios.get(`${SERVER}/history`);
    setHistory(res.data.history || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>History</h2>

      {history.length === 0 && <p>No history found.</p>}

      {history.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#f5f5f5",
            padding: 10,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <strong>{item.type}</strong>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
}
