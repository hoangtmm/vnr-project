import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Moon, SunMedium } from "lucide-react";

const THEMES = ["light", "dark"];
const ROOT = typeof document !== "undefined" ? document.documentElement : null;

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";

    const stored = window.localStorage?.getItem("theme");
    let resolved = stored && THEMES.includes(stored) ? stored : null;

    if (!resolved) {
      const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
      resolved = prefersDark ? "dark" : "light";
    }

    if (ROOT) {
      ROOT.classList.remove(...THEMES);
      ROOT.classList.add(resolved);
    }

    return resolved;
  });

  useEffect(() => {
    if (!ROOT) return;

    ROOT.classList.remove(...THEMES);
    ROOT.classList.add(theme);

    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (event) => setTheme(event.matches ? "dark" : "light");
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, []);

  const toggle = useCallback(() => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  }, []);

  const label = useMemo(
    () => (theme === "dark" ? "Chuyển sang nền sáng" : "Chuyển sang nền tối"),
    [theme],
  );

  return (
    <button
      type="button"
      onClick={toggle}
      className="relative inline-flex items-center gap-2 rounded-full border border-transparent bg-slate-900/5 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-900/10 dark:bg-slate-200/10 dark:text-slate-200 dark:hover:bg-slate-200/20"
      aria-label={label}
      title={label}
    >
      {theme === "dark" ? (
        <SunMedium size={16} strokeWidth={1.8} />
      ) : (
        <Moon size={16} strokeWidth={1.8} />
      )}
      <span className="hidden sm:inline">
        {theme === "dark" ? "Nền sáng" : "Nền tối"}
      </span>
    </button>
  );
}
