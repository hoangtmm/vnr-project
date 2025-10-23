import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../anim';

export default function Section({
  title, subtitle, children,
}: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="section-y container-px">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <motion.h2 className="h2" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p className="mt-3 muted" variants={fadeInUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {subtitle}
          </motion.p>
        )}
      </div>
      {children}
    </section>
  );
}
