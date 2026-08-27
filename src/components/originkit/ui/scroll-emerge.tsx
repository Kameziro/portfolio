"use client";

/** Soft fade/slide on enter — no CSS filter (avoids stuck blur). */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

export default function ScrollEmerge({
  children,
  className = "",
  delay = 0,
  once = true,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 1, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{
        type: "tween",
        duration: reduce ? 0.01 : 0.45,
        delay: reduce ? 0 : delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
