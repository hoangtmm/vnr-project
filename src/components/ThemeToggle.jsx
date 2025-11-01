import React, { useEffect } from "react";
import { Moon } from "lucide-react";

export default function ThemeToggle() {
  useEffect(() => {
    const root = document.documentElement;
    // Ép dark mode
    root.classList.add("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch {}
  }, []);
}
