import React, { useEffect, useMemo, useRef, useState } from "react";
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
      return `**Mở màn** — Xin chào! Mình là người dẫn chuyện.\nHôm nay chúng ta sẽ cùng đi qua 4 giai đoạn: **1975–1978**, **1979–1989**, **1990–2005**, **2006–nay**.\n`;
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
  const next = () => setIndex((i) => Math.min(ACTS.length - 1, i + 1));

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
      <div className="intro-actor" style={{ position: "absolute", left: 24, bottom: 160, zIndex: 22 }}>
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
  const Act1 = () => (
    <div className="scene act-1 relative h-full min-h-[420px]">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[0].year} - ${ACTS[0].title}`}</span></div>
      <div className="act1-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_1.png" alt="Giai đoạn 1" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act1-bubble-wrap" style={{ position: "absolute", right: 16, bottom: 220, zIndex: 10 }}>
          <div className="act1-bubble bubble-card" style={{ position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 1 }}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v)=>!v)}>
              {voiceOn ? <Volume2 size={16}/> : <VolumeX size={16}/>}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={{ position: "absolute", right: "calc(100% + 12px)", bottom: "-8px", width: "clamp(90px, 12vw, 150px)", height: "auto", pointerEvents: "none", zIndex: 0 }} />
        </div>
      )}
      <div className="act1-crowd" style={{ position: "absolute", left: 0, right: 0, bottom: "6%", display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", zIndex: 5 }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <img key={i} src="/images/puppet_2.png" alt="crowd" className="puppet-3d soft" style={{ width: "84px", height: "auto" }} />
        ))}
      </div>
    </div>
  );

  const Act2 = () => (
    <div className="scene act-2 relative h-full min-h-[420px]">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[1].year} - ${ACTS[1].title}`}</span></div>
      <div className="act2-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_2.png" alt="Giai đoạn 2" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act2-bubble-wrap" style={{ position: "absolute", right: 16, bottom: 420, zIndex: 10 }}>
          <div className="act2-bubble bubble-card" style={{ position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 1 }}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v) => !v)}>
              {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={{ position: "absolute", right: "calc(100% + 12px)", bottom: "-8px", width: "clamp(90px, 12vw, 150px)", height: "auto", pointerEvents: "none", zIndex: 0 }} />
        </div>
      )}
    </div>
  );

  const Act3 = () => (
    <div className="scene act-3 relative min-h-[100vh] overflow-visible">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[2].year} - ${ACTS[2].title}`}</span></div>
      <div className="act3-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_3.png" alt="Giai đoạn 3" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act3-bubble-wrap" style={{ position: "absolute", right: 16, bottom: 800, zIndex: 10 }}>
          <div className="act3-bubble bubble-card" style={{ position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 1 }}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v) => !v)}>
              {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={{ position: "absolute", right: "calc(100% + 12px)", bottom: "-8px", width: "clamp(90px, 12vw, 150px)", height: "auto", pointerEvents: "none", zIndex: 0 }} />
        </div>
      )}
    </div>
  );

  const Act4 = () => (
    <motion.div className="scene act-4 relative h-full min-h-[420px]">
      <div className="scene-chip"><span className="dot" /><span className="label-text">{`${ACTS[3].year} - ${ACTS[3].title}`}</span></div>
      <div className="act4-image" style={{ position: "absolute", inset: 0, zIndex: 6 }}>
        <img src="/images/story_4.png" alt="Giai đoạn 4" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 26%" }} />
      </div>
      {typed && (
        <div className="act4-bubble-wrap" style={{ position: "absolute", right: 16, bottom: 420, zIndex: 10 }}>
          <div className="act4-bubble bubble-card" style={{ position: "relative", maxWidth: "clamp(260px, 42vw, 520px)", zIndex: 1 }}>
            <button className="voice-btn" title={voiceOn ? "Tắt đọc" : "Bật đọc"} onClick={() => setVoiceOn((v) => !v)}>
              {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <div className="bubble-text" dangerouslySetInnerHTML={{ __html: bubbleHTML }} />
          </div>
          <img src="/images/puppet.png" alt="Rối suy nghĩ" className="puppet-3d"
               style={{ position: "absolute", right: "calc(100% + 12px)", bottom: "-8px", width: "clamp(90px, 12vw, 150px)", height: "auto", pointerEvents: "none", zIndex: 0 }} />
        </div>
      )}
    </motion.div>
  );

  return (
    <section className="py-8 md:py-10">
      <div className="container max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Sân khấu</h2>
          <div className="flex gap-2">
            {/* vào Intro trước */}
            <button
              onClick={() => { setOpened(true); setIndex(-1); setPlaying(true); }}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/5"
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
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm hover:bg-white/5"
            >
              <RotateCcw size={14}/> Làm lại
            </button>
          </div>
        </div>

        <div
          className={`mt-6 theater-stage no-glow stage-wide ${index>=-1? 'puppet-show': ''} rounded-[28px] overflow-hidden border border-white/10 relative`}
          style={{ "--accent": index===1 ? "transparent" : accent }}
        >
          <AnimatePresence mode="wait">
            {index === -1 && <Intro key="intro" />}
            {index === 0 && <Act1 key="a1" />}
            {index === 1 && <Act2 key="a2" />}
            {index === 2 && <Act3 key="a3" />}
            {index === 3 && <Act4 key="a4" />}
          </AnimatePresence>

          {/* controls */}
          <div className="narration-controls">
            <button onClick={() => prev()} disabled={index <= -1} className="btn-ghost small">
              <ChevronLeft size={16}/> Trước
            </button>
            <button onClick={() => setPlaying(v=>!v)} className="btn-primary small">
              {playing ? <Pause size={16}/> : <Play size={16}/> } {playing ? "Tạm dừng" : "Tiếp tục"}
            </button>
            <button onClick={() => next()} disabled={index >= ACTS.length - 1} className="btn-ghost small">
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
