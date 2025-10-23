import { motion } from "framer-motion";

const items = [
  { k: "Giai đoạn", v: "1975→nay" },
  { k: "Chủ đề", v: "5 nhóm" },
  { k: "Tư liệu", v: "2+ seed" },
];

export default function StatBadges() {
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="glass px-4 py-2 rounded-xl text-sm text-white/90"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.25 }}
        >
          <span className="opacity-70 mr-2">{it.k}:</span>
          <span className="font-medium">{it.v}</span>
        </motion.div>
      ))}
    </div>
  );
}
