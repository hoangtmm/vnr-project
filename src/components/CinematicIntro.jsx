import React, { useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * CinematicIntro
 * - Chạy khi `opened === true`
 * - Kết thúc sẽ gọi onDone() để hiện các card "hồi"
 * - Có SFX nhẹ; nếu không có file audio, intro vẫn chạy bình thường.
 */
export default function CinematicIntro({
  opened,
  onDone = () => {},
  // ảnh tư liệu chạy film-strip (đặt 6–10 ảnh)
  filmImages = [
    "/images/film/01.jpg",
    "/images/film/02.jpg",
    "/images/film/03.jpg",
    "/images/film/04.jpg",
    "/images/film/05.jpg",
    "/images/film/06.jpg",
  ],
  // điểm sáng trên hologram map (x,y theo % khung)
  hotspots = [
    { x: 22, y: 58, label: "Biên giới Tây Nam" },
    { x: 78, y: 36, label: "Biên giới phía Bắc" },
    { x: 61, y: 48, label: "Trọng điểm đô thị" },
  ],
  // counters (từ PDF)
  counters = [
    { label: "Giai đoạn", value: 4 },
    { label: "Mốc chủ đạo", value: 30 },
    { label: "Năm", value: 1975, suffix: "—nay" },
  ],
  // thời lượng intro (ms)
  duration = 9000,
  sfx = {
    curtain: "/sfx/curtain.mp3",
    sweep: "/sfx/sweep.mp3",
    pop: "/sfx/pop.mp3",
  },
}) {
  // đếm số (Framer Motion)
  const values = counters.map(() => useMotionValue(0));
  const rounded = values.map((v, i) =>
    useTransform(v, (latest) =>
      counters[i].value >= 100 ? Math.round(latest) : Math.floor(latest)
    )
  );

  useEffect(() => {
    if (!opened) return;
    // play counters sau 1.2s
    const timers = [
      setTimeout(() => values.forEach((mv, i) => animate(mv, counters[i].value, { duration: 1.2, ease: "easeOut" })), 1200),
      setTimeout(onDone, duration), // gọi onDone khi kết thúc intro
    ];

    // âm thanh nhẹ (nếu có file)
    try {
      const sweep = new Audio(sfx.sweep); sweep.volume = 0.15;
      const pop = new Audio(sfx.pop); pop.volume = 0.18;
      setTimeout(()=> sweep.play().catch(()=>{}), 600);
      setTimeout(()=> pop.play().catch(()=>{}), 1300);
    } catch {}
    return () => timers.forEach(clearTimeout);
  }, [opened]);

  return (
    <AnimatePresence>
      {opened && (
        <motion.div
          className="cinematic-intro pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .4 }}
        >
          {/* LENS SWEEP qua tiêu đề */}
          <motion.span
            initial={{ left: "-30%" }}
            animate={{ left: "130%" }}
            transition={{ delay: .35, duration: 1.3 }}
            className="intro-lens"
          />

          {/* TITLE sequence (tagline + main) */}
          <motion.div className="intro-title-wrap"
            initial={{ filter: "blur(6px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: .55 }}
          >
            <div className="intro-tag">KỊCH • TRÌNH DIỄN</div>
            <h3 className="intro-title">Tổ chức & hoạt động tình báo sau chiến tranh</h3>
          </motion.div>

          {/* FACT chips */}
          <motion.div
            className="intro-chips"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .9, duration: .4 }}
          >
            {["1975—nay", "4 giai đoạn", "đa phương tiện"].map((t, i) => (
              <motion.span
                key={t}
                className="chip"
                initial={{ scale: .8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22, delay: 1 + i * .08 }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* HOLOGRAM MAP */}
          <motion.div
            className="intro-holo"
            initial={{ opacity: 0, scale: .96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: .5, duration: .5 }}
          >
            <svg viewBox="0 0 1200 500" className="intro-holo-svg">
              {/* lưới mờ */}
              {Array.from({ length: 24 }).map((_, i) => (
                <line key={`v${i}`} x1={(i+1)*48} y1="20" x2={(i+1)*48} y2="480" stroke="rgba(255,255,255,.06)" strokeWidth="1"/>
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`h${i}`} x1="20" y1={(i+1)*54} x2="1180" y2={(i+1)*54} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
              ))}
              {/* đường biên “quốc gia” giả lập */}
              <path d="M120 320 C 240 260, 360 180, 520 220 S 900 400, 1080 160"
                    fill="none" stroke="rgba(124,137,248,.45)" strokeWidth="2"/>
              <path d="M120 320 C 240 260, 360 180, 520 220 S 900 400, 1080 160"
                    fill="none" stroke="url(#rg)" strokeWidth="8" opacity=".5">
                <animate attributeName="stroke-dasharray" values="0,2000;600,2000" dur="2.6s" fill="freeze"/>
              </path>
              <defs>
                <linearGradient id="rg" x1="0" x2="1">
                  <stop offset="0%" stopColor="rgba(99,102,241,.35)"/>
                  <stop offset="100%" stopColor="rgba(250,204,21,.3)"/>
                </linearGradient>
              </defs>
              {/* hotspots */}
              {hotspots.map((p, idx) => (
                <g key={idx} transform={`translate(${(p.x/100)*1200} ${(p.y/100)*500})`}>
                  <circle r="5" fill="#9aa3ff"/>
                  <circle r="10" fill="none" stroke="rgba(154,163,255,.5)">
                    <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" values=".8;0;.8" dur="2s" repeatCount="indefinite"/>
                  </circle>
                  {p.label && (
                    <foreignObject x="8" y="-6" width="220" height="22">
                      <div className="intro-holo-label">{p.label}</div>
                    </foreignObject>
                  )}
                </g>
              ))}
            </svg>
          </motion.div>

          {/* FILM STRIP */}
          <motion.div
            className="intro-film"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .9, duration: .4 }}
          >
            <motion.div
              className="intro-film-track"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 10, ease: "linear" }}
            >
              {[...filmImages, ...filmImages].map((src, i) => (
                <div className="intro-frame" key={i}>
                  <img src={src} alt="" onError={(e)=>{e.currentTarget.style.opacity=.2}} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* COUNTERS */}
          <div className="intro-counters">
            {counters.map((c, i) => (
              <motion.div
                key={c.label}
                className="intro-counter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * .08, duration: .35 }}
              >
                <div className="num">
                  {c.value >= 100 ? Math.round(rounded[i].get()) : Math.floor(rounded[i].get())}
                </div>
                <div className="lbl">{c.label} {c.suffix && <span className="suffix">{c.suffix}</span>}</div>
              </motion.div>
            ))}
          </div>

          {/* NARRATOR BUBBLE */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: .35 }}
            className="intro-narrator"
          >
            <div className="bubble">
              Sau khi mở màn, chúng ta sẽ đi qua 4 “hồi” trọng tâm: an dân, bảo vệ biên giới, hội nhập,
              và an ninh phi truyền thống. Sẵn sàng chưa?
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
