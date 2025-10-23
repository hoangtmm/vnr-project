import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import DarkModeToggle from "./DarkModeToggle";
import LangSwitch from "./LangSwitch";
import { useLang } from "../context/LangContext";
import { useBrief } from "../context/BriefContext";
import * as VI from "../data/vi";
import * as EN from "../data/en";
import logo from "../assets/logo.svg";

export default function Navbar() {
  const { lang } = useLang();
  const { brief, toggle } = useBrief();
  const nav = lang === "vi" ? VI.nav : EN.nav;
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container-px h-16 flex items-center justify-between gap-3">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} className="w-8 h-8 rounded-lg" alt="logo" />
          <span className="font-semibold text-white">VNR</span>
        </Link>

        {/* Center: Nav with animated indicator (desktop) */}
        <nav className="hidden md:block">
          <ul className="relative flex items-center gap-2">
            {nav.map((n) => (
              <li key={n.path} className="relative">
                <NavLink
                  to={n.path}
                  className={({ isActive }) => "nav-item " + (isActive ? "font-medium" : "")}
                  data-active={({ isActive }: { isActive: boolean }) => isActive}
                >
                  {({ isActive }) => (
                    <>
                      {n.label}
                      {isActive && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute inset-0 -z-10 rounded-xl"
                          style={{ background: "linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.06))" }}
                          transition={{ type: "spring", stiffness: 450, damping: 38 }}
                        />
                      )}
                      {/* subtle underline on hover */}
                      <span className="pointer-events-none absolute left-3 right-3 bottom-1 h-0.5 rounded bg-gradient-to-r from-indigo-300/0 via-indigo-300/40 to-indigo-300/0 opacity-0 group-hover:opacity-100" />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <LangSwitch />
          <DarkModeToggle />
          {/* Mobile hamburger */}
          <button
            className="md:hidden btn"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            title="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <motion.aside
            className="sheet"
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <img src={logo} className="w-7 h-7 rounded" alt="logo" />
                <span className="font-medium text-white">VNR</span>
              </div>
              <button className="btn" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="space-y-1">
              {nav.map((n) => (
                <NavLink key={n.path} to={n.path} onClick={() => setOpen(false)}>
                  {n.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 border-t border-white/10 pt-3 grid grid-cols-2 gap-2">
              <button onClick={toggle} className={"btn w-full " + (brief ? "btn-primary" : "")}>✨ Brief</button>
              <DarkModeToggle />
              <div className="col-span-2"><LangSwitch /></div>
            </div>
          </motion.aside>
        </div>
      )}
    </header>
  );
}
