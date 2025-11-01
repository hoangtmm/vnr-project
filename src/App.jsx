import React, { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Timeline from "./components/Timeline";
import KeyPoints from "./components/KeyPoints";
import Footer from "./components/Footer";
import QuizLauncher from "./components/QuizLauncher";
import TheaterStory from "./components/TheaterStory.jsx";
import { timelinePhases, sections, quizData } from "./content";

export default function App() {
  const [activeId, setActiveId] = useState(timelinePhases[0].id);
  const [detailPhaseId, setDetailPhaseId] = useState(null);

  const principleList = useMemo(() => sections.principles ?? [], []);
  const methodList = useMemo(() => sections.methods ?? [], []);
  const contextList = useMemo(() => sections.context ?? [], []);
  const detailPhase = useMemo(
    () => timelinePhases.find((phase) => phase.id === detailPhaseId) ?? null,
    [detailPhaseId],
  );

  const handleSelectPhase = (id) => {
    setActiveId(id);
    setDetailPhaseId((curr) => (curr && curr !== id ? null : curr));
  };

  const handleDetailPhase = (id) => {
    setActiveId(id);
    setDetailPhaseId((curr) => (curr === id ? null : id));
  };

  const handleCloseDetail = () => setDetailPhaseId(null);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors">
      <Navbar />

      <main className="pb-20">
        <Hero />

        <section id="insights" className="relative py-20">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <article className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-br from-white via-[var(--panel)] to-white/80 p-10 shadow-[0_40px_120px_-60px_rgba(48,72,216,0.55)] dark:from-[rgba(26,34,56,0.95)] dark:via-[rgba(24,34,60,0.85)] dark:to-[rgba(17,25,48,0.9)]">
                <div className="pointer-events-none absolute -top-20 -right-24 h-56 w-56 rounded-full bg-[var(--brand)]/18 blur-[128px] dark:bg-[var(--brand-soft)]/24" />
                <h2 className="text-3xl font-bold text-[var(--text)] md:text-4xl">
                  Sau chiến tranh: Củng cố bộ máy, mở rộng tầm nhìn
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-[var(--muted)]">
                  Dưới sự lãnh đạo của Đảng, tình báo Việt Nam chuyển mình từ nhiệm vụ ổn định hậu chiến đến
                  kiến tạo chiều sâu chiến lược, sẵn sàng trước thách thức khu vực và toàn cầu.
                </p>
                <ul className="mt-8 space-y-4">
                  {contextList.map((item, index) => (
                    <li key={item} className="flex gap-4">
                      <span className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full border border-[var(--border)] bg-white text-xs font-semibold text-[var(--brand)] dark:bg-[rgba(24,34,60,0.9)]">
                        0{index + 1}
                      </span>
                      <p className="text-base leading-relaxed text-[var(--text)] opacity-80 dark:text-[var(--bubble-text)]">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>

              <div className="grid gap-6">
                <div className="surface-card rounded-3xl p-8 backdrop-blur">
                  <h3 className="text-xl font-semibold text-[var(--text)] dark:text-[var(--bubble-text)]">
                    Quan điểm lãnh đạo
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Hệ thống hóa nguyên tắc chỉ đạo xuyên suốt trong mọi giai đoạn.
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--text)] opacity-80 dark:text-[var(--bubble-text)]">
                    {principleList.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-[var(--brand)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="surface-card rounded-3xl p-8 backdrop-blur">
                  <h3 className="text-xl font-semibold text-[var(--text)] dark:text-[var(--bubble-text)]">
                    Phương thức chủ đạo
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    Sự kết hợp giữa chiến lược, công nghệ và hợp tác quốc tế.
                  </p>
                  <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--text)] opacity-80 dark:text-[var(--bubble-text)]">
                    {methodList.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-2.5 w-2.5 flex-none rounded-full bg-[var(--brand-warm)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Timeline
          phases={timelinePhases}
          activeId={activeId}
          onSelect={handleSelectPhase}
          detailPhase={detailPhase}
          onRequestDetail={handleDetailPhase}
          onCloseDetail={handleCloseDetail}
        />

        <section id="theater" className="py-20">
          <div className="container">
            <div className="surface-card rounded-3xl p-10">
              <div className="mx-auto max-w-3xl text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                  Sân khấu tương tác
                </span>
                <h2 className="mt-2 text-3xl font-bold text-[var(--text)] md:text-4xl">
                  Nghe kể chuyện bằng hoạt cảnh rối
                </h2>
                <p className="mt-3 text-[var(--muted)]">
                  Đi cùng người dẫn chuyện để trải nghiệm 4 hồi kịch lịch sử – mỗi hồi khắc hoạ một bước chuyển của
                  lực lượng tình báo Việt Nam sau chiến tranh.
                </p>
              </div>
              <div className="mt-10 overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--panel)] shadow-inner">
                <TheaterStory />
              </div>
            </div>
          </div>
        </section>

        <KeyPoints id="lessons" title="Bài học kinh nghiệm cốt lõi" items={sections.lessons} />

        <QuizLauncher
          data={quizData}
          knowledge={{
            keywords: [
              { key: "asean", hint: "Mốc hội nhập khu vực vào giữa thập niên 90." },
              { key: "biên giới", hint: "Liên quan xung đột phía Bắc & Tây Nam." },
            ],
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
