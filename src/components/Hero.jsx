import React, { useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const rootRef = useRef(null)
  const onMove = (e) => {
    const r = rootRef.current?.getBoundingClientRect()
    if (!r) return
    rootRef.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    rootRef.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <header ref={rootRef} onMouseMove={onMove} className="relative overflow-hidden">
      {/* nền + spotlight */}
      <div className="absolute inset-0 -z-20 bg-[#0b1020] dark:bg-[#0a0e1a]" />
      <div className="spotlight pointer-events-none" />
      <div className="fx-blob" />

      <div className="container relative z-10 py-16 md:py-24">
        {/* GRID: 5/7 để title rộng hơn, media gọn hơn */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT */}
          <div className="lg:col-span-5 xl:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold
                            bg-white/[.08] text-brand-200 border border-white/[.15] shadow-[0_10px_30px_rgba(0,0,0,.25)]">
              1975 — nay • 4 giai đoạn 
            </div>

            <h1 className="mt-4 font-extrabold leading-tight text-transparent bg-clip-text
                           text-[clamp(36px,6vw,64px)]
                           bg-gradient-to-r from-[#ff9472] via-[#ffcc70] to-[#8fd3f4]">
              Tổ chức & Hoạt động Tình Báo
              <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8fd3f4] via-[#a8b4ff] to-white">
                Sau Chiến Tranh
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[clamp(15px,2vw,18px)] text-slate-300">
              Trình bày trực quan bối cảnh, nguyên tắc và các giai đoạn trọng tâm (1975—nay),
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a href="#timeline" className="btn-primary shine">Bắt đầu khám phá</a>
              <a href="#quiz" className="btn-ghost">Làm Quiz</a>
            </div>

            {/* meta chips */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] tracking-widest text-pink-200/80">
              <span className="chip-dot">TƯƠNG TÁC</span>
              <span className="chip-dot">TRỰC QUAN</span>
              <span className="chip-dot">ĐA PHƯƠNG TIỆN</span>
            </div>
          </div>

          {/* RIGHT: 2 card ảnh xếp chồng */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="grid gap-6">
              <article className="hero-card border-t-[3px] border-pink-400/70 shadow-[0_20px_60px_-10px_rgba(255,115,179,.25)]">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <img src="/images/4.jpg" alt="Giai đoạn 1" className="w-full h-full object-cover hero-img" />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute left-3 bottom-3">
                    <div className="text-[11px] tracking-widest text-slate-300/90 uppercase">1975 — 1978</div>
                    <h3 className="font-semibold text-white/95 drop-shadow">Củng cố chính quyền – “an dân”</h3>
                  </div>
                </div>
              </article>

              <article className="hero-card border-t-[3px] border-amber-300/80 shadow-[0_20px_60px_-10px_rgba(250,204,21,.22)]">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                  <img src="/images/3.jpg" alt="Giai đoạn 2" className="w-full h-full object-cover hero-img" />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute left-3 bottom-3">
                    <div className="text-[11px] tracking-widest text-slate-300/90 uppercase">1979 — 1989</div>
                    <h3 className="font-semibold text-white/95 drop-shadow">Bảo vệ biên giới – phản gián chiến lược</h3>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="mt-12 flex justify-center">
          <div className="scroll-mouse">
            <span className="wheel" />
          </div>
        </div>
      </div>
    </header>
  )
}
