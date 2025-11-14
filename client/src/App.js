import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatSection from "./Pages/ChatSection";
import NotesSection from "./Pages/NotesSection";
import QuizSection from "./Pages/QuizSection";
import HistorySection from "./Pages/HistorySection";

export default function App() {
  const [activePage, setActivePage] = useState("chat");

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw", background: "#f7f8fa" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, padding: 24 }}>
        {activePage === "chat" && <ChatSection />}
        {activePage === "notes" && <NotesSection />}
        {activePage === "quiz" && <QuizSection />}
        {activePage === "history" && <HistorySection />}
      </div>
    </div>
  );
}
