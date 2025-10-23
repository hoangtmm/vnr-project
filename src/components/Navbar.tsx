import { Link, NavLink } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import LangSwitch from "./LangSwitch";
import { useLang } from "../context/LangContext";
import * as VI from "../data/vi";
import * as EN from "../data/en";
import logo from "../assets/logo.svg";
import { useBrief } from "../context/BriefContext";
import { Sparkles } from "lucide-react"; // nếu chưa có lucide-react: đã cài rồi

export default function Navbar() {
  const { lang } = useLang();
  const nav = lang === "vi" ? VI.nav : EN.nav;
    const { brief, toggle } = useBrief();
  return (
    <header className="sticky top-0 z-50 bg-gray-950/70 backdrop-blur border-b border-white/10 text-white">
      <div className="container-px h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8" alt="logo" />
          <span className="font-semibold">INTEL</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {nav.map((n) => (
            <NavLink
              key={n.path}
              to={n.path}
              className={({ isActive }) => `nav-pill ${isActive ? "is-active" : ""}`}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
               <button onClick={toggle} className={"btn " + (brief ? "btn-primary" : "")} title="Brief Mode">
        <Sparkles className="w-4 h-4"/><span className="hidden sm:inline">Brief</span>
      </button>
          <LangSwitch />
          <DarkModeToggle />
        </div>
        
      </div>
      
    </header>
    
  );
}
