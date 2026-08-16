import React from "react";

const BACK = ["r", "n", "b", "q", "k", "b", "n", "r"];

const PIECE_ICON = {
  p: (
    <>
      <circle cx="12" cy="7.5" r="3" />
      <path d="M8.7 12h6.6l1.7 7H7z" />
    </>
  ),
  r: (
    <>
      <rect x="5" y="4" width="2.6" height="4" />
      <rect x="10.7" y="4" width="2.6" height="4" />
      <rect x="16.4" y="4" width="2.6" height="4" />
      <rect x="5" y="8" width="14" height="2.5" />
      <path d="M6 10.5h12l1 8.5H5z" />
    </>
  ),
  n: (
    <path d="M15.5 3c-3 0-5.2 1.7-6 4.2L7 10l1.7 1.6 1.6-1.3c.2 1-.1 2-1 2.8L6 16v3h3.2l.6-2 2.6-.5L14 19h4l-.6-6.4c-.2-2 .3-3.7 1.6-5.3L20 5.5C18.7 4 17.2 3 15.5 3z" />
  ),
  b: (
    <>
      <circle cx="12" cy="5.2" r="1.6" />
      <path d="M12 7c-2.2 1.4-3.4 3.4-3.4 6 0 1.6.6 2.7 1.6 3.4H13.8c1-.7 1.6-1.8 1.6-3.4 0-2.6-1.2-4.6-3.4-6z" />
      <rect x="8.4" y="17" width="7.2" height="2.2" />
    </>
  ),
  q: (
    <>
      <circle cx="5" cy="7" r="1.4" />
      <circle cx="9.7" cy="5.4" r="1.4" />
      <circle cx="12" cy="4.6" r="1.4" />
      <circle cx="14.3" cy="5.4" r="1.4" />
      <circle cx="19" cy="7" r="1.4" />
      <path d="M5.8 8.6h12.4l-.9 6.4H6.7z" />
      <rect x="6.5" y="16" width="11" height="3" />
    </>
  ),
  k: (
    <>
      <rect x="11" y="2.2" width="2" height="4" />
      <rect x="9.4" y="3.6" width="5.2" height="1.8" />
      <path d="M5.5 9.5l3-2.6 3.5 2.4 3.5-2.4 3 2.6-1 6.5H6.5z" />
      <rect x="6.3" y="17" width="11.4" height="3" />
    </>
  ),
};

function PieceBadge({ piece, color }) {
  return (
    <span className={"piece-badge " + (color === "w" ? "pw" : "pb")}>
      <svg viewBox="0 0 24 24" className="piece-svg" fill="currentColor" aria-hidden="true">
        {PIECE_ICON[piece]}
      </svg>
    </span>
  );
}

function buildStartPosition() {
  const rows = [];
  rows.push(BACK.map((p) => ({ p, c: "b" })));
  rows.push(Array.from({ length: 8 }, () => ({ p: "p", c: "b" })));
  for (let i = 0; i < 4; i++) rows.push(Array.from({ length: 8 }, () => null));
  rows.push(Array.from({ length: 8 }, () => ({ p: "p", c: "w" })));
  rows.push(BACK.map((p) => ({ p, c: "w" })));
  return rows;
}
const START_POSITION = buildStartPosition();

export function HeroBoard() {
  return (
    <div className="hero-board" role="img" aria-label="Şahmat lövhəsi, başlanğıc mövqe">
      {START_POSITION.map((row, r) =>
        row.map((cell, c) => {
          const light = (r + c) % 2 === 0;
          return (
            <div key={`${r}-${c}`} className={"sq" + (light ? " light" : " dark")}>
              {cell && <PieceBadge piece={cell.p} color={cell.c} />}
            </div>
          );
        })
      )}
    </div>
  );
}

export function MiniBoard() {
  const cells = Array.from({ length: 16 });
  return (
    <div className="mini-board" aria-hidden="true">
      {cells.map((_, i) => {
        const r = Math.floor(i / 4), c = i % 4;
        const light = (r + c) % 2 === 0;
        return <div key={i} className={"msq" + (light ? " light" : " dark")} />;
      })}
    </div>
  );
}
