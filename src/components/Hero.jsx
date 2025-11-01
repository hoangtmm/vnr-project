import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Satellite, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Lãnh đạo tuyệt đối",
    desc: "Bộ máy tình báo đặt dưới sự lãnh đạo trực tiếp của Đảng để giữ vững thế trận an ninh nhân dân.",
  },
  {
    icon: Satellite,
    title: "Phủ rộng đa miền",
    desc: "Kết hợp mặt trận chính trị, kinh tế, khoa học – công nghệ và hợp tác quốc tế từ sớm, từ xa.",
  },
];

const timelineCards = [
  {
    tag: "1975 – 1978",
    title: "Ổn định hậu chiến",
    text: "Triệt phá mạng lưới gián điệp cài cắm, bảo vệ chính quyền cơ sở và mục tiêu trọng điểm.",
    accent: "from-[#8fa8ff] to-[#b3e5fc]",
    image: "/images/1975-1978.jpg",
  },
  {
    tag: "1979 – 1989",
    title: "Phản gián biên giới",
    text: "Chiến dịch chiến lược bảo vệ biên giới Bắc – Tây Nam, theo dõi cục diện quốc tế thời cấm vận.",
    accent: "from-[#ffd29d] to-[#ff9a9e]",
    image: "/images/1979-1989.jpg",
  },
];

const stats = [
  { label: "Giai đoạn trọng tâm", value: "4", hint: "1975 – nay" },
  { label: "Mốc hội nhập", value: "1995", hint: "Gia nhập ASEAN" },
  { label: "Trụ cột chiến lược", value: "3", hint: "Chính trị · kinh tế · công nghệ" },
];

export default function Hero() {
  const rootRef = useRef(null);
  const onMove = (event) => {
    const bounds = rootRef.current?.getBoundingClientRect();
    if (!bounds) return;
    rootRef.current.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
    rootRef.current.style.setProperty("--my", `${event.clientY - bounds.top}px`);
  };

  return (
    <header
      ref={rootRef}
      onMouseMove={onMove}
      className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg-soft)]"
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[rgba(148,163,255,0.18)] via-transparent to-[rgba(255,180,84,0.2)] dark:from-[rgba(61,87,255,0.32)] dark:via-transparent dark:to-[rgba(249,201,125,0.18)]" />
      <div className="spotlight pointer-events-none" />
      <div className="fx-blob" />

      <div className="container relative z-10 py-16 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--muted)] dark:bg-white/5 dark:text-slate-200/80">
              <Sparkles size={14} />
              Chuyên đề tình báo Việt Nam
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-[var(--text)] md:text-[clamp(44px,5vw,68px)]">
              Tổ chức &amp; Hoạt động Tình Báo
              <span className="block text-transparent bg-gradient-to-r from-[var(--brand)] via-[#5f64ff] to-[var(--brand-warm)] bg-clip-text">
                Dưới Sự Lãnh Đạo của Đảng
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-[clamp(16px,2vw,18px)] text-[var(--muted)]">
              Khám phá hành trình củng cố an ninh quốc gia sau 1975: từ trấn giữ hậu phương, phản gián biên giới
              tới phòng tuyến không gian mạng và hợp tác quốc tế sâu rộng trong thời kỳ hội nhập.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-[var(--border)] bg-[var(--panel)]/95 p-5 shadow-[0_18px_45px_-22px_rgba(48,72,216,.35)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_-20px_rgba(48,72,216,.45)] dark:bg-[var(--panel)]/90"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--brand)]/12 text-[var(--brand)] dark:text-[var(--brand)]">
                    <Icon size={18} strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[var(--text)]">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#timeline" className="btn-primary shine">
                Khám phá dòng thời gian
              </a>
              <a href="#theater" className="btn-ghost">
                Nghe sân khấu kể chuyện
              </a>
            </div>

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--panel)]/92 p-4 text-center shadow-[0_18px_46px_-32px_rgba(17,25,54,0.55)]"
                >
                  <dt className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">{item.label}</dt>
                  <dd className="mt-1 text-3xl font-bold text-[var(--text)]">{item.value}</dd>
                  <p className="mt-1 text-xs font-medium text-[var(--muted)]">{item.hint}</p>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-y-20 -left-24 -right-10 -z-10 rounded-[40px] bg-gradient-to-br from-[rgba(148,163,255,0.22)] via-transparent to-[rgba(255,180,84,0.28)] blur-2xl dark:from-[rgba(61,87,255,0.28)] dark:to-[rgba(249,201,125,0.24)]" />

            <div className="space-y-5">
              {timelineCards.map((card, index) => (
                <motion.article
                  key={card.tag}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_24px_60px_-30px_rgba(17,25,54,0.65)]"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`} />
                  <div className="relative grid gap-5 p-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </div>

                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
                        {card.tag}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold text-[var(--text)]">{card.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{card.text}</p>

                      <a
                        href="#timeline"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline dark:text-[var(--brand-soft)]"
                      >
                        Xem bối cảnh trong Timeline →
                      </a>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="scroll-mouse">
            <span className="wheel" />
          </div>
        </div>
      </div>
    </header>
  );
}
