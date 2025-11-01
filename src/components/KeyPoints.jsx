import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Globe2, Network, Radar } from 'lucide-react'

const icons = [Shield, Globe2, Network, Radar]

export default function KeyPoints({ id, title, items }) {
  return (
    <section id={id} className="py-14">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">{title}</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((t, i) => {
            const Icon = icons[i % icons.length]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: .28, delay: i * .04 }}
                className="group relative rounded-2xl bg-gradient-to-br from-white/6 to-white/2 dark:from-white/5 dark:to-white/[.03] p-[1px] shadow-card"
              >
                <div className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/60 backdrop-blur-xl px-4 py-4 flex gap-3 items-start">
                  <div className="flex-none size-10 rounded-xl bg-brand-600/15 text-brand-200 grid place-content-center border border-brand-300/30">
                    <Icon size={18} />
                  </div>
                  <p className="text-slate-800 dark:text-slate-200">{t}</p>

                  {/* số thứ tự nổi ở góc */}
                  <div className="absolute -top-2 -right-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-white text-xs font-bold px-2 py-1 shadow-lg">
                    {i + 1}
                  </div>
                </div>

                {/* border gradient glow khi hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none"
                     style={{ background: 'linear-gradient(120deg, rgba(59,91,219,.45), transparent 40%, rgba(59,91,219,.25))' }}/>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
