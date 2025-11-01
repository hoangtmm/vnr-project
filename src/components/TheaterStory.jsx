import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw, Volume2, VolumeX } from "lucide-react";

export default function TheaterStory({ autoPlay = true, paceMs = 5200, accent = "#7c89f8" }) {
  const ACTS = useMemo(
    () => [
      { year: "1975-1978", title: "Củng cố chính quyền - an dân", desc: "Ổn định chính trị; bóc gỡ gián điệp còn cài cắm; bảo vệ mục tiêu trọng điểm." },
      { year: "1979-1989", title: "Bảo vệ biên giới - phản gián chiến lược", desc: "Phục vụ biên giới Tây Nam & phía Bắc; theo dõi cục diện quốc tế trong bối cảnh căng thẳng." },
      { year: "1990-2005", title: "Đổi mới - ký kết hòa bình, hội nhập", desc: "Mở rộng đối ngoại; gia nhập, ký kết, hội nhập khu vực và quốc tế." },
      { year: "2006-nay", title: "Hội nhập sâu - an ninh phi truyền thống, không gian mạng", desc: "Ứng phó thách thức an ninh phi truyền thống; bảo vệ không gian mạng và hạ tầng số." },
    ],
    []
  );
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const mobileBubbleLayout = useMemo(() => ({
    container: {
      position: "relative",
      right: "auto",
      bottom: "auto",
      marginTop: "1.5rem",
      padding: "0 12px",
      width: "100%",
      zIndex: 80,
    },
    card: {
      position: "relative",
      width: "100%",
      maxWidth: "100%",
      zIndex: 90,
      boxShadow: "0 22px 60px -22px rgba(12,18,34,.55)",
    },
    puppet: {
      position: "relative",
      right: "auto",
      bottom: "auto",
      margin: "12px auto 0",
      display: "block",
      width: "clamp(100px, 28vw, 140px)",
      zIndex: 85,
    },
  }), []);

  const getBubbleLayout = useCallback((desktopLayout) => ({
    container: {
      ...desktopLayout.container,
      ...(isMobile ? mobileBubbleLayout.container : {}),
    },
    card: {
      ...desktopLayout.card,
      ...(isMobile ? mobileBubbleLayout.card : {}),
    },
    puppet: {
      ...desktopLayout.puppet,
      ...(isMobile ? mobileBubbleLayout.puppet : {}),
    },
  }), [isMobile, mobileBubbleLayout]);
// trên cùng component
const [viVoice, setViVoice] = useState(null);

// load danh sách voice & chọn giọng tiếng Việt
useEffect(() => {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const synth = window.speechSynthesis;

  const pickVoice = () => {
    const voices = synth.getVoices();
    const viCandidates = voices.filter(v =>
      /vi|viet/i.test(v.lang) || /viet/i.test(v.name)
    );

    const preferredOrder = [
      "Google Vietnamese",
      "Microsoft HoaiMy", "Microsoft NamMinh", "Microsoft An", "Microsoft My"
    ];

    const preferred =
      viCandidates.find(v => preferredOrder.some(p => v.name.includes(p))) ||
      viCandidates[0] || null;

    setViVoice(preferred);
  };

  // Chrome tải voices async → nghe sự kiện
  pickVoice();
  synth.addEventListener("voiceschanged", pickVoice);
  return () => synth.removeEventListener("voiceschanged", pickVoice);
}, []);

  // Intro = -1
  const [opened, setOpened] = useState(false);
  const [index, setIndex] = useState(-1);            // vào Intro trước
  const [typed, setTyped] = useState("");
  const [playing, setPlaying] = useState(false);     // chưa gõ/đọc khi chưa mở
  const [voiceOn, setVoiceOn] = useState(true);

  const playingRef = useRef(playing);
  const utterRef = useRef(null);

  useEffect(() => { playingRef.current = playing; }, [playing]);

 const makeSpeech = (i) => {
  if (i < 0) {
    return `Xin chào! Mình là người dẫn chuyện.\nHôm nay chúng ta sẽ cùng đi qua 4 giai đoạn: **1975–1978**, **1979–1989**, **1990–2005**, **2006–nay**.\n`;
  } else if (i >= ACTS.length) {
    return `**Kết màn** — Cảm ơn bạn đã theo dõi! Hẹn gặp lại trong hành trình sau.`;
  }

  const a = ACTS[i];
  return `**${a.year}** - ${a.title}\n${a.desc}`;
};


  // Gõ chữ từng ký tự — gated theo opened
  useEffect(() => {
    if (!opened) return;
    const text = makeSpeech(index);
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      if (!playingRef.current) return;
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(t);
    }, 15);
    return () => clearInterval(t);
  }, [index, opened]);

  // Đọc giọng nói — chỉ khi gõ xong & đã mở màn
  useEffect(() => {
    if (!opened) return;
    const full = makeSpeech(index);
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    if (!voiceOn) return;
    if (typed !== full) return;

const u = new SpeechSynthesisUtterance(full.replace(/\*\*(.*?)\*\*/g, "$1"));
u.lang = "vi-VN";
if (viVoice) u.voice = viVoice;     // <-- ép dùng giọng Việt đã chọn
u.rate = 1.02;
u.pitch = 1.0;
utterRef.current = u;
window.speechSynthesis.speak(u);


    return () => { try { window.speechSynthesis.cancel(); } catch {} };
  }, [typed, index, voiceOn, opened]);

  const prev = () => setIndex((i) => Math.max(-1, i - 1));
  const next = () => setIndex((i) => Math.min(ACTS.length, i + 1));


  // HTML hiển thị trong bubble
  const bubbleHTML = useMemo(
    () => typed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>"),
    [typed]
  );

  // ================== INTRO ==================
  const Intro = () => (
    <div className="scene intro-scene relative h-full min-h-[420px]">
      {/* nền intro */}
      <div className="intro-bg" style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <img src="/images/nen.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div className="scene-chip" style={{ zIndex: 2 }}>
        <span className="dot" />
        <span className="label-text">Mở màn - Giới thiệu</span>
      </div>

      {/* Rối mở màn + bubble */}
      <div className="intro-actor" style={{ position: "absolute", left: 24, bottom: 120, zIndex: 22 }}>
        <img
          src="/images/puppet.png"
          alt="Rối giới thiệu"
          className="puppet-3d"
          style={{ width: "clamp(120px, 16vw, 180px)", height: "auto", pointerEvents: "none" }}
        />
        {typed && (
          <div
            className="intro-bubble bubble-card"
            style={{
              position: "absolute",
              left: "calc(100% + 12px)",
              bottom: "100px",
              zIndex: 40,
              boxShadow: "0 18px 60px -10px rgba(0,0,0,.35)",
              minWidth: "clamp(260px, 46vw, 520px)",
              maxWidth: "clamp(320px, 56vw, 640px)",
            }}
          >
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v) => !v)}>
              {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
        )}
      </div>
    </div>
  );

  // ================== ACTS ==================
  const Act1 = () => {
    const layout = getBubbleLayout({
      container: { position: "absolute", right: 16, bottom: 220, zIndex: 80 },
      card: { position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 90 },
      puppet: {
        position: "absolute",
        right: "calc(100% + 12px)",
        bottom: "-8px",
        width: "clamp(90px, 12vw, 150px)",
        height: "auto",
        pointerEvents: "none",
        zIndex: 85,
      },
    });

    return (
      <div className="scene act-1 relative h-full min-h-[440px] md:min-h-[520px]">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[0].year} - ${ACTS[0].title}`}</span></div>
      <div className="act1-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_1.png" alt="Giai đoạn 1" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act1-bubble-wrap" style={layout.container}>
          <div className="act1-bubble bubble-card" style={layout.card}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v)=>!v)}>
              {voiceOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={layout.puppet} />
        </div>
      )}
      <div className="act1-crowd" style={{ position: "absolute", left: 0, right: 0, bottom: "6%", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", zIndex: 5 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <img key={i} src="/images/puppet_2.png" alt="crowd" className="puppet-3d soft" style={{ width: "84px", height: "auto" }} />
        ))}
      </div>
      </div>
    );
  };

  const Act2 = () => {
    const layout = getBubbleLayout({
      container: { position: "absolute", right: 16, bottom: 420, zIndex: 80 },
      card: { position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 90 },
      puppet: {
        position: "absolute",
        right: "calc(100% + 12px)",
        bottom: "-8px",
        width: "clamp(90px, 12vw, 150px)",
        height: "auto",
        pointerEvents: "none",
        zIndex: 85,
      },
    });

    return (
      <div className="scene act-2 relative h-full min-h-[440px] md:min-h-[520px]">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[1].year} - ${ACTS[1].title}`}</span></div>
      <div className="act2-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_2.png" alt="Giai đoạn 2" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act2-bubble-wrap" style={layout.container}>
          <div className="act2-bubble bubble-card" style={layout.card}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v) => !v)}>
              {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={layout.puppet} />
        </div>
      )}
      </div>
    );
  };

  const Act3 = () => {
    const layout = getBubbleLayout({
      container: { position: "absolute", right: 16, bottom: 480, zIndex: 80 },
      card: { position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 90 },
      puppet: {
        position: "absolute",
        right: "calc(100% + 12px)",
        bottom: "-8px",
        width: "clamp(90px, 12vw, 150px)",
        height: "auto",
        pointerEvents: "none",
        zIndex: 85,
      },
    });

    return (
      <div className="scene act-3 relative min-h-[460px] md:min-h-[560px] overflow-visible">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[2].year} - ${ACTS[2].title}`}</span></div>
      <div className="act3-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_3.png" alt="Giai đoạn 3" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act3-bubble-wrap" style={layout.container}>
          <div className="act3-bubble bubble-card" style={layout.card}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v) => !v)}>
              {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={layout.puppet} />
        </div>
      )}
      </div>
    );
  };

  const Act4 = () => {
    const layout = getBubbleLayout({
      container: { position: "absolute", right: 16, bottom: 420, zIndex: 80 },
      card: { position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 90 },
      puppet: {
        position: "absolute",
        right: "calc(100% + 12px)",
        bottom: "-8px",
        width: "clamp(90px, 12vw, 150px)",
        height: "auto",
        pointerEvents: "none",
        zIndex: 85,
      },
    });

    return (
      <motion.div className="scene act-4 relative h-full min-h-[440px] md:min-h-[520px]">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[3].year} - ${ACTS[3].title}`}</span></div>
      <div className="act4-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_4.png" alt="Giai đoạn 4" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act4-bubble-wrap" style={layout.container}>
          <div className="act4-bubble bubble-card" style={layout.card}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v) => !v)}>
              {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={layout.puppet} />
        </div>
      )}
      </motion.div>
    );
  };
// ================== OUTRO ==================
const Outro = () => {
  const [closing, setClosing] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  useEffect(() => {
    // chỉ chạy một lần dù StrictMode render lại
    if (hasTriggered) return;
    setHasTriggered(true);
    const timer = setTimeout(() => setClosing(true), 5000);
    return () => clearTimeout(timer);
  }, [hasTriggered]);

  useEffect(() => {
    if (closing && !hasClosed) {
      setHasClosed(true);
      const timer = setTimeout(() => setOpened(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [closing, hasClosed]);

  return (
    <div className="scene outro-scene relative h-full min-h-[420px]">
      {/* nền outro */}
      <div className="intro-bg" style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <img
          src="/images/nen_1.png"
          alt="Nền outro"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.65)" }}
        />
      </div>

      <div className="scene-chip" style={{ zIndex: 2 }}>
        <span className="dot" />
        <span className="label-text">Kết màn - Cảm ơn</span>
      </div>

      {/* Rối bên trái + bong bóng cảm ơn */}
      <div className="outro-actor" style={{ position: "absolute", left: 24, bottom: 120, zIndex: 22 }}>
        <motion.img
          src="/images/puppet.png"
          alt="Rối cảm ơn"
          className="puppet-3d"
          style={{ width: "clamp(120px, 16vw, 180px)", height: "auto", pointerEvents: "none" }}
          animate={closing ? { rotate: [0, -15, 0], y: [0, -10, 0] } : { rotate: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        {!closing && (
          <motion.div
            className="outro-bubble bubble-card"
            style={{
              position: "absolute",
              left: "calc(100% + 12px)",
              bottom: "100px",
              zIndex: 40,
              boxShadow: "0 18px 60px -10px rgba(0,0,0,.35)",
              minWidth: "clamp(260px, 46vw, 520px)",
              maxWidth: "clamp(320px, 56vw, 640px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <div className="bubble-text font-medium leading-relaxed text-center">
              <strong>Cảm ơn bạn đã theo dõi!</strong>
              <br />
              Hy vọng chuyến hành trình qua các giai đoạn lịch sử
              đã mang lại cho bạn nhiều cảm xúc và hiểu biết hơn.
            </div>
          </motion.div>
        )}
      </div>

      {/* Hiệu ứng đóng màn */}
      {closing && !hasClosed && (
        <>
          <motion.div
            className="curtain curtain-left"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <motion.div
            className="curtain curtain-right"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
          />
        </>
      )}
    </div>
  );
};

  const stageClassName = [
    "mt-6",
    "theater-stage",
    "no-glow",
    "stage-wide",
    index >= -1 ? "puppet-show" : "",
    "rounded-[28px]",
    "overflow-visible",
    "relative",
    "border",
    "border-[var(--border)]",
    "bg-[var(--panel)]/90",
    "shadow-[0_36px_110px_-60px_rgba(12,18,34,0.55)]",
    "min-h-[min(92vh,720px)]",
  ].join(" ");

  return (
    <section className="py-10 md:py-12">
      <div className="container max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--muted)]">
              Hoạt cảnh tương tác
            </span>
            <h2 className="text-3xl font-bold text-[var(--text)] md:text-4xl">
              Sân khấu kể chuyện lịch sử
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setOpened(true); setIndex(-1); setPlaying(true); }}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel-soft)]/85 px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--panel-soft)]"
            >
              <Play size={14}/> Mở màn
            </button>
            <button
              onClick={() => {
                setOpened(false);
                setIndex(-1);
                setTyped("");
                setPlaying(false);
                if (typeof window !== "undefined") window.speechSynthesis?.cancel();
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--panel-soft)]/85 px-3 py-2 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--panel-soft)]"
            >
              <RotateCcw size={14}/> Làm lại
            </button>
          </div>
        </div>

        <div
          className={`${stageClassName}`}
          style={{ "--accent": index===1 ? "transparent" : accent }}
        >
          <AnimatePresence mode="wait">
            {index === -1 && <Intro key="intro" />}
            {index === 0 && <Act1 key="a1" />}
            {index === 1 && <Act2 key="a2" />}
            {index === 2 && <Act3 key="a3" />}
            {index === 3 && <Act4 key="a4" />}
            {index === 4 && <Outro key="outro" />}
          </AnimatePresence>

          {/* controls */}
          <div className="narration-controls">
            <button onClick={() => prev()} disabled={index <= -1} className="btn-ghost small">
              <ChevronLeft size={16}/> Trước
            </button>
            <button onClick={() => setPlaying(v=>!v)} className="btn-primary small">
              {playing ? <Pause size={16}/> : <Play size={16}/> } {playing ? "Tạm dừng" : "Tiếp tục"}
            </button>
           <button onClick={() => next()} disabled={index >= ACTS.length} className="btn-ghost small">
  Tiếp <ChevronRight size={16}/>
</button>

          </div>

          {/* Curtains */}
          <motion.div className="curtain curtain-left" animate={opened ? { x: "-100%" } : { x: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} />
          <motion.div className="curtain curtain-right" animate={opened ? { x: "100%" } : { x: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} />
          <motion.div className="valance-top" animate={opened ? { y: -60 } : { y: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }} />
        </div>
      </div>
    </section>
  );
}
