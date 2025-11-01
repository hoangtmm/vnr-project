import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export default function TheaterPuppetNarrationMap({
  title = "Sân khấu — rối kể + bản đồ",
  subtitle = "Rối SVG bên trái chỉ tay; bong bóng gõ chữ theo từng giai đoạn",
  acts = DEFAULT_ACTS,
  autoPlay = true,
  paceMs = 5200,
  accent = "#7c89f8",
  puppetScale = 1.7,
}) {
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(-1);
  const [playing, setPlaying] = useState(autoPlay);
  const [typed, setTyped] = useState("");
  const [doneTyping, setDoneTyping] = useState(false);

  const mapRef = useRef(null);
  const timerRef = useRef(null);
  const typingRef = useRef(null);
  const anchorRef = useRef(null);                 // neo tay phải (vai phải)

  const [mapRect, setMapRect] = useState({ x: 0, y: 0, w: 800, h: 420 });
  const [puppetAnchor, setPuppetAnchor] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    const recalc = () => {
      const r = mapRef.current?.getBoundingClientRect();
      if (r) setMapRect({ x: r.left, y: r.top, w: r.width, h: r.height });

      const a = anchorRef.current?.getBoundingClientRect?.();
      if (a) setPuppetAnchor({ x: a.left, y: a.top });
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") { e.preventDefault(); setPlaying(v => !v); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (index < 0) return;
    const a = acts[index];
    const text = `**${a.year}** — ${a.title}\n${a.desc}`;
    setTyped("");
    setDoneTyping(false);
    let i = 0;
    const speed = 18;
    const type = () => {
      i++;
      setTyped(text.slice(0, i));
      if (i < text.length) typingRef.current = setTimeout(type, speed);
      else setDoneTyping(true);
    };
    typingRef.current = setTimeout(type, 220);
    return () => clearTimeout(typingRef.current);
  }, [index, acts]);

  useEffect(() => {
    if (!playing || index < 0) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (index < acts.length - 1) setIndex(i => i + 1);
      else setPlaying(false);
    }, paceMs);
    return () => clearTimeout(timerRef.current);
  }, [playing, index, paceMs, acts.length]);

  const openStage = () => { setOpened(true); setTimeout(() => setIndex(0), 900); };
  const reset = () => { setOpened(false); setIndex(-1); setPlaying(autoPlay); setTyped(""); };
  const next = () => setIndex(i => Math.min(i + 1, acts.length - 1));
  const prev = () => setIndex(i => Math.max(i - 1, 0));

  const progress = useMemo(() => (index < 0 ? 0 : ((index + 1) / acts.length) * 100), [index, acts.length]);

  // hotspot theo px để xoay tay
  const hotspotPx = useMemo(() => {
    if (index < 0) return { x: 0, y: 0 };
    const s = acts[index].spot;
    return { x: mapRect.x + (s.x / 100) * mapRect.w, y: mapRect.y + (s.y / 100) * mapRect.h };
  }, [index, mapRect, acts]);

  const armAngle = useMemo(() => {
    const dx = hotspotPx.x - puppetAnchor.x;
    const dy = hotspotPx.y - puppetAnchor.y;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  }, [hotspotPx, puppetAnchor]);

  const renderMarkdownBold = (s) =>
    s.split(/\*\*(.*?)\*\*/g).map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p));

  return (
    <section className="py-8 md:py-10">
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-white">{title}</h2>
          <div className="flex gap-2">
            <button onClick={openStage} className="inline-flex items-center gap-2 rounded-xl border border-brand-200 dark:border-slate-700 px-3 py-2 text-sm hover:bg-brand-50 dark:hover:bg-slate-900"><Play size={14} /> Mở màn</button>
            <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-brand-200 dark:border-slate-700 px-3 py-2 text-sm hover:bg-brand-50 dark:hover:bg-slate-900"><RotateCcw size={14} /> Làm lại</button>
          </div>
        </div>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Rối SVG bên trái <b>chỉ tay</b> vào bản đồ bên phải; bong bóng thoại gõ chữ theo từng giai đoạn.
        </p>

        {/* STAGE */}
        <div className="mt-6 theater-stage stage-wide rounded-[28px] overflow-hidden border border-brand-100 dark:border-slate-800 relative" style={{ '--accent': accent }}>
          <div className="theater-backdrop" /><div className="theater-floor" />
          <div className={`theater-sweep ${opened ? 'on' : ''}`} />

          {/* RỐI (sprite PNG 3D) */}
          <div
            className={`puppet-wrap ${opened ? 'enter' : ''}`}
             style={{ '--puppet-scale': String(puppetScale) }} 
          >
            <div className="puppet-scale pointer-events-none">
              {/* Thanh treo + dây (hiệu ứng nhẹ) */}
              <div className="sprite-bar" />
              <span className="sprite-string s1" />
              <span className="sprite-string s2" />
              <span className="sprite-string s3" />

              {/* Ảnh rối 3D nền trong suốt */}
              <img
                className="puppet-sprite bob gentle-tilt"
                src="/assets/puppet.png"
                alt="Puppet 3D"
                width={120}
                height={160}
                decoding="async"
                loading="eager"   // để vào mượt ngay đầu cảnh
              />
            </div>

            {/* Bong bóng thoại (Framer Motion giữ nguyên) */}
            <AnimatePresence>
              {index >= 0 && (
                <motion.div
                  key={index + typed.length}
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="puppet-bubble max-w-[560px]"
                >
                  <div className="bubble-text">
                    {renderMarkdownBold(typed)}
                    <span className="caret">▌</span>
                  </div>
                  {doneTyping && (
                    <div className="mt-1 text-[11px] text-white/70">(Nhấn → để tiếp)</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>


          {/* BẢN ĐỒ */}
          <div className="absolute inset-0 z-10 grid grid-cols-12 items-center px-4 md:px-6">
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <div ref={mapRef} className="map-box h-[360px] md:h-[420px]">
                <SVGMap acts={acts} currentIndex={index} />
              </div>
            </div>
          </div>

          {/* Controls + progress */}
          <div className="narration-controls">
            <button onClick={prev} disabled={index <= 0} className="btn-ghost small"><ChevronLeft size={16} /> Trước</button>
            <button onClick={() => setPlaying(v => !v)} className="btn-primary small">{playing ? <Pause size={16} /> : <Play size={16} />} {playing ? "Tạm dừng" : "Tự động"}</button>
            <button onClick={next} disabled={index >= acts.length - 1} className="btn-ghost small">Tiếp <ChevronRight size={16} /></button>
          </div>
          <div className="narration-progress"><div className="bar" style={{ width: `${progress}%` }} /></div>

          {/* rèm */}
          <motion.div className="curtain curtain-left" animate={opened ? { x: "-100%" } : { x: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} />
          <motion.div className="curtain curtain-right" animate={opened ? { x: "100%" } : { x: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} />
          <motion.div className="valance-top" animate={opened ? { y: -60 } : { y: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} />
        </div>
      </div>
    </section>
  );
}

/* ================= SVG MAP (giữ nguyên) ================= */
function SVGMap({ acts, currentIndex }) {
  const current = currentIndex >= 0 ? acts[currentIndex].spot : null;
  return (
    <svg viewBox="0 0 800 420" className="map-svg">
      <defs>
        <linearGradient id="rg" x1="0" x2="1">
          <stop offset="0%" stopColor="rgba(99,102,241,.30)" />
          <stop offset="100%" stopColor="rgba(250,204,21,.30)" />
        </linearGradient>
      </defs>

      {Array.from({ length: 16 }).map((_, i) => (
        <line key={`v${i}`} x1={(i + 1) * 45} y1={20} x2={(i + 1) * 45} y2={400} stroke="rgba(255,255,255,.06)" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1={20} y1={(i + 1) * 50} x2={780} y2={(i + 1) * 50} stroke="rgba(255,255,255,.05)" />
      ))}
      <path d="M80 300 C 200 240, 300 160, 460 200 S 680 360, 740 120" fill="none" stroke="rgba(124,137,248,.45)" strokeWidth="2" />
      <path d="M80 300 C 200 240, 300 160, 460 200 S 680 360, 740 120" fill="none" stroke="url(#rg)" strokeWidth="8" opacity=".5" />

      {acts.map((a, idx) => (
        <g key={idx} transform={`translate(${(a.spot.x / 100) * 800} ${(a.spot.y / 100) * 420})`} opacity={idx === currentIndex ? 1 : .25}>
          <circle r={5} fill="#9aa3ff" />
          <circle r={11} fill="none" stroke="rgba(154,163,255,.55)" />
        </g>
      ))}
      {current && (
        <g transform={`translate(${(current.x / 100) * 800} ${(current.y / 100) * 420})`}>
          <circle r={5} fill="#fff" />
          <circle r={10} fill="none" stroke="#cfd9ff" opacity=".9">
            <animate attributeName="r" values="8;16;8" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values=".9;0;.9" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <foreignObject x={10} y={-8} width={220} height={24}>
            <div className="map-tag">{current.label}</div>
          </foreignObject>
        </g>
      )}
    </svg>
  );
}

const DEFAULT_ACTS = [
  { year: "1975—1978", title: "Củng cố chính quyền – “an dân”", desc: "Ổn định chính trị; bóc gỡ gián điệp còn cài cắm; bảo vệ mục tiêu trọng điểm.", spot: { x: 22, y: 62, label: "Trọng điểm đô thị" } },
  { year: "1979—1989", title: "Bảo vệ biên giới – phản gián chiến lược", desc: "Phục vụ biên giới Tây Nam & phía Bắc; theo dõi cục diện quốc tế thời cấm vận.", spot: { x: 75, y: 36, label: "Biên giới phía Bắc" } },
  { year: "1995", title: "Gia nhập ASEAN – hợp tác sâu rộng", desc: "Chuẩn hoá nghiệp vụ theo thông lệ khu vực; đẩy mạnh phối hợp quốc tế.", spot: { x: 58, y: 52, label: "Hợp tác khu vực" } },
  { year: "2006—nay", title: "An ninh phi truyền thống – không gian mạng", desc: "Chống gián điệp công nghệ cao, khủng bố, tội phạm xuyên quốc gia; bảo vệ hạ tầng số.", spot: { x: 66, y: 72, label: "Không gian mạng" } }
];
