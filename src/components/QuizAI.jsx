import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Quiz AI-style (no external API)
 * - Gợi ý thông minh từ dữ liệu (heuristics) + typing effect
 * - Confetti (canvas) khi đúng
 * - Shake khi sai
 * - Tiến độ dạng vòng + âm thanh (Speech Synthesis)
 * - Dark mode sẵn
 */
export default function QuizAI({ data, knowledge = {} }) {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState(null)
  const [locked, setLocked] = useState(false)
  const [score, setScore] = useState(0)
  const [hint, setHint] = useState('')
  const [explain, setExplain] = useState('')
  const [showExplain, setShowExplain] = useState(false)
  const [shake, setShake] = useState(false)
  const total = data.length
  const canvasRef = useRef(null)

  const q = data[idx]

  // --- helper: typewriter for hint/explain ---
  const typeText = (text, setter, speed = 18) => {
    setter('')
    let i = 0
    const id = setInterval(() => {
      i++
      setter(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
  }

  // --- simple “AI” hint: generate hint from question using knowledge ---
  const genHint = (q) => {
    const s = q.q.toLowerCase()
    // heuristics theo từ khoá
    if (s.includes('asean')) return 'Gợi ý: mốc hội nhập khu vực quan trọng giữa thập niên 90.'
    if (s.includes('biên giới') || s.includes('phản gián')) return 'Gợi ý: giai đoạn xung đột hai đầu biên giới.'
    if (s.includes('đổi mới') || s.includes('1986')) return 'Gợi ý: gắn với mở cửa kinh tế, KH&CN và an ninh phi truyền thống.'
    if (s.includes('01/7/2020') || s.includes('bí mật')) return 'Gợi ý: đạo luật về bảo vệ bí mật nhà nước.'
    if (knowledge?.keywords) {
      const hit = knowledge.keywords.find(k => s.includes(k.key))
      if (hit) return hit.hint
    }
    return 'Gợi ý: thử loại trừ những phương án “quá hiển nhiên” hoặc “quá sớm”.'
  }

  const playSpeech = (text) => {
    try {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'vi-VN'
      u.rate = 1.02
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    } catch {}
  }

  // confetti mini
  const blast = () => {
    const cvs = canvasRef.current
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    const W = (cvs.width = cvs.offsetWidth)
    const H = (cvs.height = cvs.offsetHeight)
    const particles = Array.from({ length: 80 }, () => ({
      x: W / 2,
      y: H / 2,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.8) * 6 - 2,
      g: 0.12 + Math.random() * 0.08,
      life: 80 + Math.random() * 30,
      c: `hsl(${200 + Math.random() * 80} 80% 60%)`,
      size: 3 + Math.random() * 3,
    }))

    let f = 0
    const tick = () => {
      f++
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy += p.g
        p.life--
        ctx.fillStyle = p.c
        ctx.fillRect(p.x, p.y, p.size, p.size)
      })
      if (f < 110) requestAnimationFrame(tick)
      else ctx.clearRect(0, 0, W, H)
    }
    tick()
  }

  useEffect(() => {
    // mỗi lần đổi câu, reset trạng thái + tạo hint
    setPicked(null)
    setLocked(false)
    setShowExplain(false)
    setExplain('')
    const h = genHint(q)
    typeText(h, setHint, 12)
  }, [idx]) // eslint-disable-line

  const onPick = (i) => {
    if (locked) return
    setPicked(i)
  }

  const onSubmit = () => {
    if (picked == null) return
    const ok = picked === q.answer
    setLocked(true)
    setShowExplain(true)
    typeText(q.explain, setExplain, 14)

    if (ok) {
      setScore(s => s + 1)
      blast()
      playSpeech('Chính xác! Tuyệt vời.')
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 360)
      playSpeech('Chưa đúng. Hãy xem giải thích và thử câu tiếp theo.')
    }
  }

  const next = () => {
    if (idx < total - 1) setIdx(i => i + 1)
  }
  const retry = () => {
    setIdx(0); setScore(0); setPicked(null); setLocked(false); setShowExplain(false); setExplain('')
    const h = genHint(data[0]); typeText(h, setHint, 12)
  }

  const progress = useMemo(() => ((idx + (locked ? 1 : 0)) / total) * 100, [idx, locked, total])
  const pctScore = useMemo(() => (score / total) * 100, [score, total])

  return (
    <section id="quiz" className="py-16 bg-brand-50/60 dark:bg-slate-900/50 relative">
      <div className="container">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-white">Quiz</h2>
          {/* progress ring */}
          <div className="relative size-16">
            <svg viewBox="0 0 36 36" className="absolute inset-0">
              <path d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                    fill="none" stroke="currentColor" opacity=".14" strokeWidth="3"/>
              <path d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                    fill="none" stroke="rgb(54,79,199)" strokeWidth="3"
                    strokeDasharray={`${progress}, 100`} strokeLinecap="round"/>
            </svg>
            <div className="absolute inset-0 grid place-content-center text-xs">
              <div className="text-brand-900 dark:text-brand-200 font-semibold">{Math.round(progress)}%</div>
            </div>
          </div>
        </div>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Gợi ý thông minh</p>

        {/* canvas confetti */}
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0"></canvas>

        {/* HINT */}
        <div className="mt-6 p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-brand-100 dark:border-slate-800">
          <div className="text-sm uppercase tracking-wider text-brand-600 dark:text-brand-200 font-semibold">Gợi ý</div>
          <p className="mt-1 text-slate-700 dark:text-slate-300 min-h-[1.5rem]">{hint}</p>
        </div>

        {/* QUESTION */}
        <div className="mt-6">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .25 }}
            className="p-5 bg-white dark:bg-slate-900 border border-brand-100 dark:border-slate-800 rounded-xl shadow-sm"
          >
            <div className="font-semibold text-brand-900 dark:text-white">{idx + 1}. {q.q}</div>
            <div className={`mt-3 grid md:grid-cols-2 gap-2 ${shake ? 'animate-[shake_.36s_ease-in-out]' : ''}`}>
              {q.options.map((op, i) => {
                const isPicked = picked === i
                const isCorrect = locked && q.answer === i
                const isWrong = locked && isPicked && !isCorrect
                return (
                  <button
                    key={i}
                    onClick={() => onPick(i)}
                    className={`text-left px-4 py-3 rounded-lg border transition ${
                      isCorrect ? 'bg-green-50 dark:bg-green-950/40 border-green-300 dark:border-green-700' :
                      isWrong   ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700' :
                      isPicked  ? 'bg-brand-50 dark:bg-slate-800 border-brand-300 dark:border-slate-700' :
                                  'bg-white dark:bg-slate-900 hover:bg-brand-50 dark:hover:bg-slate-800 border-brand-100 dark:border-slate-800'
                    }`}
                  >{op}</button>
                )
              })}
            </div>

            <div className="mt-4 flex items-center gap-3">
              {!locked ? (
                <button onClick={onSubmit}
                        className="px-5 py-3 rounded-2xl bg-brand-600 text-white shadow-card hover:-translate-y-0.5 transition">Nộp bài</button>
              ) : (
                <>
                  {idx < total - 1 ? (
                    <button onClick={next}
                            className="px-5 py-3 rounded-2xl border border-brand-200 dark:border-slate-700 hover:bg-brand-50 dark:hover:bg-slate-900 transition">
                      Câu tiếp theo
                    </button>
                  ) : (
                    <button onClick={retry}
                            className="px-5 py-3 rounded-2xl border border-brand-200 dark:border-slate-700 hover:bg-brand-50 dark:hover:bg-slate-900 transition">
                      Làm lại
                    </button>
                  )}
                </>
              )}
              <div className="text-brand-900 dark:text-white font-semibold">Điểm: {score} / {total}</div>
              <div className="ml-auto text-xs opacity-70">Độ chính xác: {Math.round(pctScore)}%</div>
            </div>

            {/* EXPLAIN */}
            <AnimatePresence>
              {showExplain && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: .25 }}
                  className="mt-3 text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="font-medium">Giải thích:</span> {explain}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* CSS animation keyframes (inject with tailwind arbitrary) */
/* Thêm vào global: index.css có thể bổ sung:
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
*/
