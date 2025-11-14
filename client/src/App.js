import React, { useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatSection from "./pages/ChatSection";
import NotesSection from "./pages/NotesSection";
import QuizSection from "./pages/QuizSection";
import HistorySection from "./pages/HistorySection";

export default function App() {
  const [activePage, setActivePage] = useState("chat");

  function renderPage() {
    switch (activePage) {
      case "chat":
        return <ChatSection />;
      case "notes":
        return <NotesSection />;
      case "quiz":
        return <QuizSection />;
      case "history":
        return <HistorySection />;
      default:
        return <ChatSection />;
    }
  }

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div style={{ flex: 1, padding: "20px" }}>{renderPage()}</div>
    </div>
  );
}
