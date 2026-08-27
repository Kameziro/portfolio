"use client";

/**
 * Scroll emerge wrapper — Origin Kit Focus Reveal motion language
 * (blur + scale + fade) applied to block content on scroll into view.
 */

import { motion, useReducedMotion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.2 });
  const show = inView || reduce === true;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={
        reduce
          ? { opacity: 1 }
          : { opacity: 0, scale: 0.96, filter: "blur(10px)" }
      }
      animate={
        show
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.96, filter: "blur(10px)" }
      }
      transition={{
        type: "tween",
        duration: reduce ? 0.15 : 0.5,
        delay: reduce ? 0 : delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
