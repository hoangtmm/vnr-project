import type { Variants, Transition } from "framer-motion";

// Dùng cubic-bezier thay cho chuỗi 'easeOut' để khớp kiểu Transition['ease']
const EASE: Transition["ease"] = [0.16, 1, 0.3, 1]; // tương đương easeOut mượt

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: EASE },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: EASE },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: EASE },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: EASE },
  },
};
