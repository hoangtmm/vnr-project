import React, { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type BriefCtx = { brief: boolean; toggle: () => void };
const Ctx = createContext<BriefCtx>({ brief: false, toggle: () => {} });

export const BriefProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brief, setBrief] = useLocalStorage<boolean>("brief-mode", false);
  return (
    <Ctx.Provider value={{ brief, toggle: () => setBrief(v => !v) }}>
      <div className={brief ? "brief-mode" : ""}>{children}</div>
    </Ctx.Provider>
  );
};

export const useBrief = () => useContext(Ctx);
