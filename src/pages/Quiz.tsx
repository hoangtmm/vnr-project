import { useMemo, useState, useEffect } from "react";
import Section from "../components/Section";
import { useLang } from "../context/LangContext";
import { buildQuiz, QuizItem } from "../utils/quiz";
import QuizCard from "../components/QuizCard";
import { motion } from "framer-motion";
import * as VI from "../data/vi";
import * as EN from "../data/en";

function ConfettiBurst({ show }: { show: boolean }) {
  useEffect(() => {
    if (!show) return;
    const colors = ["#60a5fa","#34d399","#f472b6","#facc15","#22d3ee"];
    const pieces = 30;
    const els: HTMLDivElement[] = [];
    for (let i = 0; i < pieces; i++) {
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.left = `${50 + (Math.random()*40-20)}%`;
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.animationDelay = `${Math.random()*0.3}s`;
      el.style.transform = `translateY(-20vh) rotate(${Math.random()*360}deg)`;
      document.body.appendChild(el);
      els.push(el);
      setTimeout(() => el.remove(), 1900);
    }
  }, [show]);
  return null;
}

export default function Quiz() {
  const { lang } = useLang();
  const D = lang === "vi" ? VI : EN;
  const [count, setCount] = useState(8);
  const [tag, setTag] = useState<string | "all">("all");
  const [step, setStep] = useState<"setup" | "run" | "review">("setup");

  const questions = useMemo<QuizItem[]>(
    () => buildQuiz(lang as any, count, tag === "all" ? undefined : tag),
    [lang, count, tag]
  );

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<Record<string, number>>({});
  const [reveal, setReveal] = useState(false);

  const current = questions[idx];
  const total = questions.length;
  const score = Object.entries(picked).reduce((sum, [id, p]) => {
    const q = questions.find((x) => x.id === id);
    return sum + (q && q.answerIndex === p ? 1 : 0);
  }, 0);
  const percent = total ? Math.round((score / total) * 100) : 0;

  function start() {
    setPicked({});
    setReveal(false);
    setIdx(0);
    setStep("run");
  }

  function answer(i: number) {
    if (reveal) return;
    setPicked((s) => ({ ...s, [current.id]: i }));
    setReveal(true);
  }
  function next() {
    if (idx < total - 1) { setIdx(idx + 1); setReveal(false); }
    else { setStep("review"); }
  }

  return (
    <>
      {step === "setup" && (
        <Section title={lang === "vi" ? "Quiz" : "AI Quiz"}
        >
          <div className="max-w-4xl mx-auto quiz-hero p-6">
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-sm mb-1">{lang === "vi" ? "Số câu" : "Question count"}</div>
                <input type="range" min={4} max={15} value={count}
                  onChange={(e) => setCount(Number(e.target.value))} className="w-full" />
                <div className="text-sm mt-1">{count}</div>
              </div>
              <div className="sm:col-span-2">
                <div className="text-sm mb-1">{lang === "vi" ? "Chủ đề" : "Topic"}</div>
                <select className="w-full px-3 py-2 rounded-xl bg-transparent border"
                  value={tag}
                  onChange={(e) => setTag(e.target.value as any)}
                >
                  <option value="all">{lang === "vi" ? "Tất cả" : "All"}</option>
                  {Array.from(new Set(buildQuiz(lang as any, 12).map(q => q.tag))).map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="progress-dots">
                {Array.from({ length: count }).map((_, i) => (
                  <span key={i} className={`dot ${i < idx ? "done" : i === idx ? "active" : ""}`} />
                ))}
              </div>
              <button className="btn btn-primary" onClick={start}>
                {lang === "vi" ? "Bắt đầu" : "Start"}
              </button>
            </div>
          </div>
        </Section>
      )}

      {step === "run" && current && (
        <Section
          title={lang === "vi" ? "Trả lời câu hỏi" : "Answer questions"}
          subtitle={`${idx + 1}/${total} · ${lang === "vi" ? "Điểm hiện tại" : "Score"}: ${score}`}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            {/* top progress bar */}
            <div className="h-1.5 rounded bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${((idx + (reveal ? 1 : 0)) / total) * 100}%` }}
                transition={{ duration: .5 }}
                className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400"
              />
            </div>

            <QuizCard
              item={current}
              index={idx}
              total={total}
              picked={picked[current.id] ?? null}
              onPick={answer}
              reveal={reveal}
            />

            <div className="flex gap-2 justify-between">
              <button className="btn" onClick={() => setStep("setup")}>
                {lang === "vi" ? "Cài đặt lại" : "Reset"}
              </button>
              <button className="btn btn-primary" onClick={next}>
                {idx < total - 1 ? (lang === "vi" ? "Câu tiếp" : "Next") : (lang === "vi" ? "Kết thúc" : "Finish")}
              </button>
            </div>
          </div>
        </Section>
      )}

      {step === "review" && (
        <Section title={lang === "vi" ? "Kết quả" : "Results"}
          subtitle={`${lang === "vi" ? "Điểm" : "Score"}: ${score}/${total} (${percent}%)`}
        >
          {/* confetti khi >= 80% */}
          <ConfettiBurst show={percent >= 80} />

          <div className="max-w-4xl mx-auto mb-6">
            <div className="h-3 rounded-xl bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: .7 }}
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400"
              />
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
            {questions.map((q, i) => {
              const pick = picked[q.id];
              const ok = pick === q.answerIndex;
              return (
                <motion.div key={q.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`quiz-result ${ok ? "border-emerald-500/50" : "border-rose-500/50"}`}>
                  <div className="flex items-center justify-between mb-1 text-xs muted">
                    <span>{i + 1}. {q.tag}</span>
                    <span className="quiz-chip">{ok ? "✅ Đúng" : "❌ Sai"}</span>
                  </div>
                  <div className="font-medium mb-1">{q.question}</div>
                  <div className="text-sm">
                    <div>✅ {lang === "vi" ? "Đáp án" : "Answer"}: {q.choices[q.answerIndex]}</div>
                    {pick !== undefined && (
                      <div>🧭 {lang === "vi" ? "Bạn chọn" : "You picked"}: {q.choices[pick]}</div>
                    )}
                  </div>
                  <div className="mt-2 text-sm muted">{q.explain}</div>
                </motion.div>
              );
            })}
          </div>
          <div className="max-w-4xl mx-auto mt-6 flex gap-2">
            <button className="btn" onClick={() => setStep("setup")}>{lang === "vi" ? "Làm lại" : "Try again"}</button>
            <button className="btn btn-primary" onClick={() => { setIdx(0); setReveal(false); setStep("run"); }}>
              {lang === "vi" ? "Thi lại ngay" : "Retake now"}
            </button>
          </div>
        </Section>
      )}
    </>
  );
}
