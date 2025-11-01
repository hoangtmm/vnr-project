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
          className="relative mx-auto max-w-3xl rounded-3xl p-[2px] bg-gradient-to-br from-[var(--brand)]/45 via-white/40 to-[var(--brand-warm)]/40 shadow-[0_24px_80px_-40px_rgba(48,72,216,0.65)]"
        >
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)]/95 px-8 py-10 text-center backdrop-blur">
            <h2 className="text-3xl font-extrabold text-[var(--text)] md:text-4xl">Quiz Kiểm Tra Kiến Thức</h2>
            <p className="mt-3 text-[var(--muted)]">
              Sẵn sàng tổng kết hiểu biết về tổ chức và hoạt động tình báo Việt Nam? Bộ câu hỏi có gợi ý thông minh
              sẽ giúp bạn ôn lại những điểm then chốt.
            </p>

            <div className="mt-7 flex items-center justify-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="shine rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand-warm)] px-6 py-3 text-white font-medium shadow-card"
              >
                Làm Quiz
              </button>
            
            </div>

            {/* aura vòng tròn nhỏ phía sau cho sang */}
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-3xl aura" />
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
                <div className="relative w-full max-w-4xl rounded-3xl p-[2px] bg-gradient-to-br from-[var(--brand)]/45 via-white/30 to-[var(--brand-warm)]/40">
                  <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--panel)]">
                    {/* Header modal */}
                    <div className="flex items-center justify-between border-b border-[var(--border)] bg-white/80 px-6 py-4 backdrop-blur dark:bg-[rgba(24,34,60,0.9)]">
                      <h3 className="text-lg font-semibold text-[var(--text)]">Quiz</h3>
                      <button
                        onClick={() => setOpen(false)}
                        aria-label="Đóng quiz"
                        className="rounded-full border border-[var(--border)] p-2 transition hover:bg-white/60 dark:hover:bg-[rgba(24,34,60,0.8)]"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Nội dung Quiz */}
                    <div className="p-6 text-left text-[var(--text)] dark:text-[var(--bubble-text)]">
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
