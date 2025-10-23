import { KBarProvider, KBarPortal, KBarPositioner, KBarSearch, KBarResults, useMatches } from "kbar";
import { useLang } from "../context/LangContext";
import * as VI from "../data/vi";
import * as EN from "../data/en";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function Results() {
  const { results } = useMatches();
  return (
    <KBarPortal>
      <KBarPositioner style={{ zIndex: 60, backdropFilter: "blur(6px)", background: "rgba(0,0,0,.35)" }}>
        <div className="w-[90vw] max-w-xl rounded-2xl overflow-hidden border border-white/10 bg-gray-900 text-white">
          <KBarSearch className="w-full px-4 py-3 bg-gray-950 outline-none" placeholder="Tìm trang, tư liệu, nhân vật..." />
          <KBarResults
            items={results}
            onRender={({ item, active }) => (
              <div className={"px-4 py-2 text-sm " + (active ? "bg-white/10" : "")}>
                {typeof item === "string" ? <div className="opacity-60">{item}</div> : item.name}
              </div>
            )}
          />
        </div>
      </KBarPositioner>
    </KBarPortal>
  );
}

export default function CommandPalette({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();
  const cfg = lang === "vi" ? VI : EN;
  const navigate = useNavigate();

  const actions = useMemo(() => {
    const navActs = cfg.nav.map(n => ({
      id: n.path,
      name: n.label,
      shortcut: [],
      section: lang === "vi" ? "Điều hướng" : "Navigation",
      perform: () => navigate(n.path)
    }));
    const resActs = (cfg as any).resources.map((r: any) => ({
      id: "res-" + r.id,
      name: r.title,
      section: lang === "vi" ? "Tư liệu" : "Documents",
      perform: () => navigate(`/documents/${r.id}`)
    }));
    return [
      { id: "home", name: lang === "vi" ? "Mở Command Palette" : "Open Command Palette", shortcut: ["ctrl", "k"], keywords: "cmdk", perform: () => {} },
      ...navActs,
      ...resActs
    ];
  }, [cfg, lang, navigate]);

  return (
    <KBarProvider actions={actions}>
      {children}
      <Results/>
    </KBarProvider>
  );
}
