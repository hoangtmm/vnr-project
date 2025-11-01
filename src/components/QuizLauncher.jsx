import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import QuizAI from './QuizAI'

export default function QuizLauncher({ data, knowledge }) {
  const [open, setOpen] = useState(false)
  const launcherRef = useRef(null)

  // khóa scroll nền khi mở modal
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  // ESC để đóng
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <section id="quiz" className="py-20">
      <div className="container">
        {/* Card Launcher: glass + gradient viền + glow */}
        <div
          ref={launcherRef}
          className="mx-auto max-w-3xl relative rounded-3xl p-[2px] bg-gradient-to-br from-brand-500/40 via-white/10 to-amber-400/30
                     shadow-[0_20px_60px_-10px_rgba(59,91,219,.25)]"
        >
          <div className="rounded-3xl bg-white/[.06] dark:bg-slate-900/70 backdrop-blur-xl border border-white/[.12] px-8 py-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow">Quiz</h2>
            <p className="mt-2 text-slate-300">Nhấn vào nút dưới để bắt đầu. Có gợi ý thông minh</p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="px-6 py-3 rounded-2xl text-white font-medium bg-gradient-to-r from-pink-500 to-amber-400 shadow-card shine"
              >
                Làm Quiz
              </button>
            
            </div>

            {/* aura vòng tròn nhỏ phía sau cho sang */}
            <div className="pointer-events-none absolute -z-10 inset-0 rounded-3xl aura" />
          </div>
        </div>

        {/* ===== Modal Quiz ===== */}
        <AnimatePresence>
          {open && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                className="fixed inset-0 z-[80] modal-blur"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              {/* Panel */}
              <motion.div
                key="panel"
                className="fixed inset-0 z-[90] grid place-items-center p-4"
                initial={{ opacity: 0, scale: .96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: .98, y: -6 }}
                transition={{ duration: .22 }}
                aria-modal="true" role="dialog"
              >
                <div className="w-full max-w-4xl relative rounded-3xl p-[2px] bg-gradient-to-br from-brand-500/40 via-white/10 to-amber-400/30">
                  <div className="rounded-3xl bg-white dark:bg-slate-900 border border-white/[.12] dark:border-slate-800 overflow-hidden">
                    {/* Header modal */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[.08] dark:border-slate-800 bg-white/[.65] dark:bg-slate-900/70 backdrop-blur">
                      <h3 className="text-lg font-semibold text-brand-900 dark:text-white">Quiz</h3>
                      <button
                        onClick={() => setOpen(false)}
                        aria-label="Đóng quiz"
                        className="rounded-full p-2 border border-white/[.18] dark:border-slate-700 hover:bg-white/[.06] dark:hover:bg-slate-800 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Nội dung Quiz */}
                    <div className="p-6">
                      <QuizAI data={data} knowledge={knowledge} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
