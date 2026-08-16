import React, { useState } from "react";
import { Crown, LogOut, Plus, Swords } from "lucide-react";
import { useStore } from "../store/PartiyaStore.jsx";
import { GameRow } from "./GameRow.jsx";

export function Dashboard() {
  const { state, dispatch } = useStore();
  const user = state.users.find((u) => u.id === state.currentUserId);
  const games = state.gamesByUser[state.currentUserId] || [];

  const [opponent, setOpponent] = useState("");
  const [myColor, setMyColor] = useState("w");

  const myTurnCount = games.filter((g) => {
    const nextIsWhite = g.moves.length % 2 === 0;
    return (nextIsWhite && g.myColor === "w") || (!nextIsWhite && g.myColor === "b");
  }).length;
  const longest = games.reduce((max, g) => Math.max(max, g.moves.length), 0);

  function createGame(e) {
    e.preventDefault();
    if (!opponent.trim()) return;
    dispatch({ type: "CREATE_GAME", opponent: opponent.trim(), myColor });
    setOpponent("");
  }

  return (
    <div className="dashboard">
      <header className="topbar">
        <div className="brand"><Crown size={18} /><span>Partiya</span></div>
        <div className="who">
          <span>{user?.name}</span>
          <button className="btn-ghost" onClick={() => dispatch({ type: "LOGOUT" })}>
            <LogOut size={15} /> Çıxış
          </button>
        </div>
      </header>

      <section className="stats-strip">
        <div className="stat"><strong>{games.length}</strong><span>aktiv partiya</span></div>
        <div className="stat"><strong>{myTurnCount}</strong><span>sənin növbən</span></div>
        <div className="stat"><strong>{longest}</strong><span>ən uzun partiya (hərəkət)</span></div>
      </section>

      <form className="add-form" onSubmit={createGame}>
        <Swords size={16} className="add-icon" aria-hidden="true" />
        <input
          type="text" placeholder="Rəqibin adı…" value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        />
        <select value={myColor} onChange={(e) => setMyColor(e.target.value)} className="select-color">
          <option value="w">Mən ağla oynayıram</option>
          <option value="b">Mən qara ilə oynayıram</option>
        </select>
        <button type="submit" className="btn-primary small"><Plus size={15} /> Partiya aç</button>
      </form>

      <div className="games-list">
        {games.length === 0 && <div className="empty-state">Hələ partiya yoxdur. Yuxarıdan birini aç.</div>}
        {games.map((g) => (
          <GameRow
            key={g.id}
            game={g}
            onDelete={(id) => dispatch({ type: "DELETE_GAME", gameId: id })}
            onAddMove={(id, move) => dispatch({ type: "ADD_MOVE", gameId: id, move })}
          />
        ))}
      </div>
    </div>
  );
}
