import React from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/65 dark:supports-[backdrop-filter]:bg-slate-950/65 bg-white/85 dark:bg-slate-950/85 border-b border-brand-100 dark:border-slate-800">
      <div className="container h-14 flex items-center justify-between">
        <a href="#" className="font-extrabold tracking-tight text-brand-700 dark:text-brand-200 fancy-underline">VNR202</a>
        <div className="flex items-center gap-3">
          <a href="#timeline" className="text-sm hover:underline glow px-3 py-1 rounded-full">Dòng thời gian</a>
          <a href="#quiz" className="text-sm hover:underline glow px-3 py-1 rounded-full">Quiz</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
