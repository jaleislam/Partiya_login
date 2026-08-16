import React, { useState, useEffect } from "react";
import { PartiyaProvider, useStore } from "./store/PartiyaStore.jsx";
import { AuthScreen } from "./components/AuthScreen.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import "./partiya.scss";

function Shell() {
  const { state } = useStore();
  const [view, setView] = useState("auth");
  const [mode, setMode] = useState("login");

  useEffect(() => {
    setView(state.currentUserId ? "dashboard" : "auth");
  }, [state.currentUserId]);

  return (
    <div className="partiya-app">
      {view === "auth" && <AuthScreen mode={mode} setMode={setMode} setView={setView} />}
      {view === "dashboard" && <Dashboard />}
    </div>
  );
}

export default function PartiyaApp() {
  return (
    <PartiyaProvider>
      <Shell />
    </PartiyaProvider>
  );
}
