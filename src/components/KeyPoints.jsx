import React from "react";
import { motion } from "framer-motion";
import { Shield, Globe2, Network, Radar } from "lucide-react";

const icons = [Shield, Globe2, Network, Radar];

export default function KeyPoints({ id, title, items }) {
  return (
    <section id={id} className="py-16">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-bold text-[var(--text)] md:text-4xl">{title}</h2>
          <p className="max-w-xl text-sm text-[var(--muted)]">
            Tinh thần xuyên suốt giúp lực lượng tình báo Việt Nam giữ vững chủ quyền, phát huy sức mạnh toàn dân và
            thích ứng trước những thách thức mới trong thời kỳ hội nhập.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((content, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--panel)]/95 p-6 shadow-[0_26px_68px_-42px_rgba(48,72,216,0.45)]"
              >
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100"
                     style={{ background: "linear-gradient(135deg, rgba(48,72,216,0.18), transparent 55%, rgba(255,180,84,0.16))" }} />
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand)]/14 text-lg font-semibold text-[var(--brand)] dark:text-[var(--brand-soft)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[var(--brand)]/12 text-[var(--brand)] dark:text-[var(--brand-soft)]">
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-[var(--text)]/90 dark:text-[var(--bubble-text)]">
                    {content}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
