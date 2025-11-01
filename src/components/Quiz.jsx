import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'

export default function Quiz({ data }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return data.reduce((acc, q, idx) => acc + ((answers[idx] === q.answer) ? 1 : 0), 0)
  }, [answers, data])

  const onPick = (qi, oi) => setAnswers(prev => ({ ...prev, [qi]: oi }))

  return (
    <section id="quiz" className="py-16 bg-brand-50/60 dark:bg-slate-900/50">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-white">Quiz ôn tập</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">5 câu trắc nghiệm nhanh dựa trên nội dung phía trên.</p>

        <div className="mt-8 space-y-6">
          {data.map((q, qi) => (
            <motion.div
              key={qi}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25 }}
              className="p-5 bg-white dark:bg-slate-900 border border-brand-100 dark:border-slate-800 rounded-xl shadow-sm"
            >
              <div className="font-semibold text-brand-900 dark:text-white">{qi + 1}. {q.q}</div>
              <div className="mt-3 grid md:grid-cols-2 gap-2">
                {q.options.map((op, oi) => {
                  const isPicked = answers[qi] === oi
                  const isCorrect = submitted && q.answer === oi
                  const isWrong = submitted && isPicked && !isCorrect
                  return (
                    <button
                      key={oi}
                      onClick={() => !submitted && onPick(qi, oi)}
                      className={`text-left px-4 py-3 rounded-lg border transition ${
                        isCorrect ? 'bg-green-50 dark:bg-green-950/40 border-green-300 dark:border-green-700' :
                        isWrong ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700' :
                        isPicked ? 'bg-brand-50 dark:bg-slate-800 border-brand-300 dark:border-slate-700' :
                        'bg-white dark:bg-slate-900 hover:bg-brand-50 dark:hover:bg-slate-800 border-brand-100 dark:border-slate-800'
                      }`}
                    >{op}</button>
                  )
                })}
              </div>
              {submitted && (
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400"><span className="font-medium">Giải thích:</span> {q.explain}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-4">
          {!submitted ? (
            <button onClick={() => setSubmitted(true)} className="px-5 py-3 rounded-2xl bg-brand-600 text-white shadow-card hover:translate-y-[-1px] active:translate-y-0 transition">Nộp bài</button>
          ) : (
            <button onClick={() => { setAnswers({}); setSubmitted(false); }} className="px-5 py-3 rounded-2xl border border-brand-200 dark:border-slate-700 text-brand-900 dark:text-slate-100 hover:bg-brand-50 dark:hover:bg-slate-900 transition">Làm lại</button>
          )}
          {submitted && (
            <div className="text-brand-900 dark:text-white font-semibold">Điểm: {score} / {data.length}</div>
          )}
        </div>
      </div>
    </section>
  )
}
