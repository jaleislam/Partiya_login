import React, { createContext, useContext, useReducer, useMemo } from "react";

const seedUser = { id: "u_demo", name: "Kamran", email: "demo@partiya.app", password: "partiya1" };

const initialState = {
  users: [seedUser],
  currentUserId: null,
  gamesByUser: {
    u_demo: [
      { id: "g1", opponent: "Elvin Məmmədov", myColor: "w", moves: ["e4", "e5", "Nf3", "Nc6", "Bb5"] },
      { id: "g2", opponent: "Nərmin Qasımova", myColor: "b", moves: ["d4", "d5", "c4"] },
      { id: "g3", opponent: "Rəşad Əliyev", myColor: "w", moves: ["e4", "c5", "Nf3", "d6", "d4", "cxd4", "Nxd4", "Nf6", "Nc3"] },
    ],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "SIGNUP": {
      if (state.users.some((u) => u.email === action.email)) return state;
      const id = "u" + Date.now();
      const user = { id, name: action.name, email: action.email, password: action.password };
      // Diqqət: qeydiyyatdan sonra istifadəçini avtomatik daxil ETMİRİK —
      // currentUserId dəyişmir, o, Daxil ol formuna yönləndirilir.
      return {
        ...state,
        users: [...state.users, user],
        gamesByUser: { ...state.gamesByUser, [id]: [] },
      };
    }
    case "LOGIN": {
      const user = state.users.find((u) => u.email === action.email && u.password === action.password);
      if (!user) return state;
      return { ...state, currentUserId: user.id };
    }
    case "LOGOUT":
      return { ...state, currentUserId: null };
    case "CREATE_GAME": {
      const uid = state.currentUserId;
      const game = { id: "g" + Date.now(), opponent: action.opponent, myColor: action.myColor, moves: [] };
      const list = state.gamesByUser[uid] || [];
      return { ...state, gamesByUser: { ...state.gamesByUser, [uid]: [game, ...list] } };
    }
    case "ADD_MOVE": {
      const uid = state.currentUserId;
      const list = (state.gamesByUser[uid] || []).map((g) =>
        g.id === action.gameId ? { ...g, moves: [...g.moves, action.move] } : g
      );
      return { ...state, gamesByUser: { ...state.gamesByUser, [uid]: list } };
    }
    case "DELETE_GAME": {
      const uid = state.currentUserId;
      const list = (state.gamesByUser[uid] || []).filter((g) => g.id !== action.gameId);
      return { ...state, gamesByUser: { ...state.gamesByUser, [uid]: list } };
    }
    default:
      return state;
  }
}

const StoreCtx = createContext(null);

export function PartiyaProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreCtx);
  if (!ctx) throw new Error("useStore must be used inside <PartiyaProvider>");
  return ctx;
}
