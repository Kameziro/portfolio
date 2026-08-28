"use client";

/**
 * Scroll emerge — fade + slide + optional reveal line.
 * Below-fold content starts hidden; animates once in view.
 */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Variant = "section" | "item";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  /** section = larger travel; item = list rows */
  variant?: Variant;
  /** Draw a short rule before content (editorial) */
  revealLine?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ScrollEmerge({
  children,
  className = "",
  delay = 0,
  once = true,
  variant = "section",
  revealLine = false,
}: Props) {
  const reduce = useReducedMotion();
  const travel = variant === "section" ? 52 : 28;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: travel }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.18, margin: "0px 0px -6% 0px" }}
      transition={{
        type: "tween",
        duration: variant === "section" ? 0.75 : 0.55,
        delay,
        ease: EASE,
      }}
    >
      {revealLine ? (
        <motion.span
          className="mb-8 block h-px w-14 origin-left bg-foreground/30"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once, amount: 0.5 }}
          transition={{ duration: 0.6, delay: delay + 0.05, ease: EASE }}
          aria-hidden
        />
      ) : null}
      {children}
    </motion.div>
  );
}
