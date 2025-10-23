import { motion } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import { QuizItem } from "../utils/quiz";

export default function QuizCard({
  item, index, total, picked, onPick, reveal,
}: {
  item: QuizItem;
  index: number;
  total: number;
  picked: number | null;
  onPick: (i: number) => void;
  reveal: boolean;
}) {
  // dùng cubic-bezier và khai báo đúng kiểu để TS không báo lỗi
  const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: EASE },
    },
  };

  return (
    <motion.div
      key={item.id}
      variants={cardVariants}
      initial="hidden"
      animate="show"
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs muted">{index + 1}/{total} · {item.tag}</div>
        {/* mini progress bar per-question */}
        <div className="h-1 w-28 rounded bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: reveal ? "100%" : "50%" }}
            transition={{ duration: 0.6 }}
            className="h-full bg-gradient-to-r from-indigo-400 to-cyan-400"
          />
        </div>
      </div>

      <h3 className="h3 mb-4">{item.question}</h3>

      <div className="grid gap-2">
        {item.choices.map((c, i) => {
          const isPicked = picked === i;
          const isCorrect = i === item.answerIndex;

          const state =
            reveal && isCorrect
              ? "correct"
              : reveal && isPicked && !isCorrect
              ? "wrong"
              : "idle";

          const cls =
            state === "correct" ? "choice correct" :
            state === "wrong"   ? "choice wrong"   : "choice";

          return (
            <motion.button
              key={i}
              className={cls}
              onClick={() => onPick(i)}
              disabled={reveal}
              whileTap={{ scale: 0.98 }}
              animate={state === "wrong" ? { x: [0, -6, 6, -4, 4, 0] } : {}}
              transition={{ duration: 0.35, ease: EASE as Transition["ease"] }}
            >
              <span className="tick">
                {state === "correct" ? "✅" : state === "wrong" ? "❌" : "•"}
              </span>
              {c}
            </motion.button>
          );
        })}
      </div>

      {reveal && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-4 text-sm"
        >
          <div className="font-medium mb-1">Giải thích</div>
          <p className="muted">{item.explain}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
