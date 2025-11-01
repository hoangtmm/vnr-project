import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Keyboard, A11y, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

export default function Timeline({ phases, activeId, onSelect }) {
  useEffect(() => {
    if (!activeId && phases?.length) onSelect?.(phases[0].id)
  }, [activeId, phases, onSelect])

  return (
    <section id="timeline" className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-900 dark:text-white">Dòng thời gian</h2>

        <div className="relative mt-8">
          <Swiper
            modules={[EffectCoverflow, Pagination, Navigation, Keyboard, A11y, Parallax]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            spaceBetween={24}
            coverflowEffect={{
              rotate: 26,
              stretch: 0,
              depth: 160,
              modifier: 1.2,
              slideShadows: true,
            }}
            keyboard={{ enabled: true }}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={(sw) => {
              const idx = sw.activeIndex
              const phase = phases[idx % phases.length]
              if (phase) onSelect?.(phase.id)
            }}
            className="!pb-14"
          >
            {phases.map((p) => (
              <SwiperSlide key={p.id} className="!w-[min(92vw,780px)]">
                <article className="overflow-hidden rounded-2xl border border-brand-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-card">
                  {/* Parallax image layer */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      data-swiper-parallax="-30%"
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent dark:from-black/35 pointer-events-none" />
                  </div>

                  <div className="p-6">
                    <div className="text-sm opacity-80">{p.year}</div>
                    <h3 className="mt-1 text-2xl font-bold text-brand-900 dark:text-white">{p.title}</h3>
                    <ul className="mt-3 list-disc pl-5 space-y-1.5 text-slate-700 dark:text-slate-300">
                      {p.points.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Panel “đang chọn” */}
        <div className="mt-8 rounded-2xl border border-brand-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          {phases.filter(p => p.id === activeId).map(p => (
            <div key={p.id}>
              <h4 className="text-xl font-bold text-brand-900 dark:text-white">{p.year} · {p.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
