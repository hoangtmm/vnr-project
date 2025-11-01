import React from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] nav-surface transition">
      <div className="container flex h-16 items-center justify-between">
        <a href="#" className="text-lg font-black uppercase tracking-[0.4em] text-[var(--brand)] dark:text-[var(--brand-soft)]">
          VNR<span className="ml-1 text-[var(--brand-warm)]">202</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-4">
          <a
            href="#insights"
            className="rounded-full px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-white/10 hover:text-[var(--text)] dark:hover:bg-white/5"
          >
            Tổng quan
          </a>
          <a
            href="#timeline"
            className="rounded-full px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-white/10 hover:text-[var(--text)] dark:hover:bg-white/5"
          >
            Dòng thời gian
          </a>
          <a
            href="#theater"
            className="rounded-full px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-white/10 hover:text-[var(--text)] dark:hover:bg-white/5"
          >
            Sân khấu kể chuyện
          </a>
          <a
            href="#quiz"
            className="rounded-full px-3 py-2 text-sm font-medium text-[var(--muted)] transition hover:bg-white/10 hover:text-[var(--text)] dark:hover:bg-white/5"
          >
            Quiz
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
