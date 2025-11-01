import React, { useEffect, useMemo } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation, Keyboard, A11y, Parallax } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const TimelineModal = ({ phase, onClose }) => {
  if (!phase) return null
  const modal = phase.modal ?? {}
  const sections = modal.focus ?? []

  React.useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <motion.div
      key={phase.id}
      className="fixed inset-0 z-[110] flex items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="absolute inset-0 bg-[rgba(6,12,24,0.6)] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.article
        className="relative z-[120] flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_40px_120px_-40px_rgba(12,18,34,0.7)] max-h-[min(92vh,760px)]"
        initial={{ y: 36, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 26, opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel-soft)]/85 text-[var(--muted)] transition hover:text-[var(--text)]"
          aria-label="Đóng chi tiết"
        >
          <X size={18} />
        </button>

        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/8]">
          <img
            src={phase.image}
            alt={phase.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,12,24,0.65)] via-transparent to-transparent" />
          <div className="absolute left-6 bottom-6">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-white/70">{phase.year}</span>
            <h3 className="mt-2 text-2xl font-bold text-white drop-shadow-lg">{phase.title}</h3>
          </div>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-6 py-8 md:px-10 md:py-10">
          {modal.intro && (
            <p className="text-base leading-relaxed text-[var(--muted)]">
              {modal.intro}
            </p>
          )}

          {sections.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((section, index) => (
                <div
                  key={`${section.heading}-${index}`}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--panel-soft)]/60 p-6"
                >
                  <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand)] dark:text-[var(--brand-soft)]">
                    {String(index + 1).padStart(2, '0')}
                    <span className="text-[var(--muted)]">{section.heading}</span>
                  </div>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--text)]/85 dark:text-[var(--bubble-text)]">
                    {section.items?.map((item, itemIndex) => (
                      <li key={itemIndex} className="relative pl-4">
                        <span className="absolute left-0 top-2 block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {modal.note && (
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--panel-soft)]/40 px-5 py-4 text-xs font-medium text-[var(--muted)]">
              {modal.note}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  )
}

export default function Timeline({ phases, activeId, onSelect, detailPhase, onRequestDetail, onCloseDetail }) {
  useEffect(() => {
    if (!activeId && phases?.length) onSelect?.(phases[0].id)
  }, [activeId, phases, onSelect])

  const activePhase = useMemo(() => phases.find((p) => p.id === activeId) ?? phases[0], [activeId, phases])

  return (
    <section id="timeline" className="py-16">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Hành trình 4 giai đoạn
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[var(--text)] md:text-4xl">Dòng thời gian chiến lược</h2>
          </div>
          <p className="max-w-sm text-sm text-[var(--muted)]">
            Trượt từng giai đoạn để xem chuyển biến nhiệm vụ. Nhấn “Xem chi tiết” ngay trên slide để mở phân tích sâu.
          </p>
        </div>

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
            {phases.map((p) => {
              const isOpen = detailPhase?.id === p.id
              return (
              <SwiperSlide key={p.id} className="!w-[min(92vw,780px)]">
                <article className="group overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--panel)] shadow-[0_32px_90px_-50px_rgba(48,72,216,0.45)] transition">
                  {/* Parallax image layer */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      data-swiper-parallax="-30%"
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full scale-[1.03] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent dark:from-black/45" />
                  </div>

                  <div className="p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">{p.year}</div>
                    <h3 className="mt-2 text-2xl font-bold text-[var(--text)]">{p.title}</h3>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[var(--muted)]">
                      {p.points.map((t, i) => <li key={i} className="relative pl-5">
                        <span className="absolute left-0 top-2 block h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                        {t}
                      </li>)}
                    </ul>

                    <button
                      type="button"
                      onClick={() => onRequestDetail?.(p.id)}
                      className={`mt-6 inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                        isOpen
                          ? 'border-[var(--brand)] bg-[var(--brand)]/15 text-[var(--brand)] dark:bg-[var(--brand-soft)]/15 dark:text-[var(--brand-soft)]'
                          : 'border-[var(--border)] bg-white/70 text-[var(--brand)] hover:bg-white dark:bg-[rgba(24,34,60,0.9)] dark:text-[var(--brand-soft)]'
                      }`}
                    >
                      {isOpen ? 'Đang xem chi tiết' : 'Xem chi tiết'}
                      <ArrowRight size={16} className={isOpen ? 'opacity-100' : 'opacity-70'} />
                    </button>
                  </div>
                </article>
              </SwiperSlide>
            )})}
          </Swiper>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,0.6fr)]">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--panel)] p-8 shadow-[0_36px_100px_-58px_rgba(48,72,216,0.35)]">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Giai đoạn đang xem
            </span>
            <h4 className="mt-2 text-2xl font-bold text-[var(--text)]">
              {activePhase.year} · {activePhase.title}
            </h4>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--muted)]">
              {activePhase.points.map((point, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1 inline-flex h-2 w-2 flex-none rounded-full bg-[var(--brand)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => onRequestDetail?.(activePhase.id)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--panel-soft)]/80 px-5 py-2 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--panel-soft)] dark:text-[var(--brand-soft)]"
            >
              Xem phân tích chi tiết
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--panel-soft)]/50 p-6 text-sm leading-relaxed text-[var(--muted)]">
            <h5 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted)]">
              Gợi ý nghiên cứu thêm
            </h5>
            <p className="mt-3">
              {activePhase.modal?.note ?? 'Tài liệu lưu trữ, văn kiện Đại hội Đảng và các báo cáo tổng kết công tác an ninh là nguồn tham khảo chính cho giai đoạn này.'}
            </p>
            <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-[var(--muted)]">
              Tip · Nhấn “Xem chi tiết” hoặc dùng phím mũi tên để chuyển giai đoạn.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {detailPhase && (
          <TimelineModal phase={detailPhase} onClose={onCloseDetail} />
        )}
      </AnimatePresence>
    </section>
  )
}
