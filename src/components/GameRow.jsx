import React, { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { MiniBoard } from "./Board.jsx";

export function GameRow({ game, onDelete, onAddMove }) {
  const [open, setOpen] = useState(false);
  const [move, setMove] = useState("");

  const nextIsWhite = game.moves.length % 2 === 0;
  const myTurn = (nextIsWhite && game.myColor === "w") || (!nextIsWhite && game.myColor === "b");

  const pairs = [];
  for (let i = 0; i < game.moves.length; i += 2) {
    pairs.push({ n: i / 2 + 1, white: game.moves[i], black: game.moves[i + 1] });
  }

  function submitMove(e) {
    e.preventDefault();
    if (!move.trim()) return;
    onAddMove(game.id, move.trim());
    setMove("");
  }

  return (
    <div className="game-row">
      <div className="game-row-top" onClick={() => setOpen((o) => !o)}>
        <MiniBoard />
        <div className="game-meta">
          <strong>{game.opponent}</strong>
          <span className="game-sub">
            Sən: {game.myColor === "w" ? "Ağ" : "Qara"} · {game.moves.length} hərəkət
          </span>
        </div>
        <span className={"turn-badge" + (myTurn ? " mine" : "")}>
          {myTurn ? "Sənin növbən" : "Rəqibin növbəsi"}
        </span>
        <button className="icon-btn" aria-label={open ? "Bağla" : "Aç"}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {open && (
        <div className="game-row-body">
          <table className="scoresheet">
            <thead>
              <tr><th>№</th><th>Ağ</th><th>Qara</th></tr>
            </thead>
            <tbody>
              {pairs.length === 0 && (
                <tr><td colSpan={3} className="empty-cell">Hələ hərəkət yazılmayıb.</td></tr>
              )}
              {pairs.map((row) => (
                <tr key={row.n}>
                  <td>{row.n}</td>
                  <td>{row.white}</td>
                  <td>{row.black || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="row-actions">
            <form onSubmit={submitMove} className="move-form">
              <input
                type="text" placeholder="məs. Nf3" value={move}
                onChange={(e) => setMove(e.target.value)}
              />
              <button type="submit" className="btn-primary small"><Plus size={14} /> Hərəkət yaz</button>
            </form>
            <button className="btn-ghost danger" onClick={() => onDelete(game.id)}>
              <Trash2 size={14} /> Partiyanı sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
