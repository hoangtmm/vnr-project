import { motion } from 'framer-motion';
import { stagger, item } from '../anim';

export default function Timeline({items}:{items:{year:string,title:string,desc:string}[]}) {
  return (
    <motion.ol
      className="relative border-s-2 border-brand-200 dark:border-gray-700 max-w-4xl mx-auto"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {items.map((it, idx) => (
        <motion.li key={idx} className="mb-10 ms-6" variants={item}>
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white text-xs">
            {idx + 1}
          </span>
          <h4 className="font-semibold">{it.year} · {it.title}</h4>
          <p className="muted mt-1">{it.desc}</p>
        </motion.li>
      ))}
    </motion.ol>
  );
}
