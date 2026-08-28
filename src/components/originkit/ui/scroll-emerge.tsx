"use client";

/**
 * Scroll emerge — short fade + 8px travel. Pixel HUD, not editorial slide.
 */

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useMounted } from "@/hooks/use-mounted";

type Variant = "section" | "item";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  /** section = slightly longer; item = list rows */
  variant?: Variant;
  /** Draw a short gold rule before content */
  revealLine?: boolean;
};

const EASE = [0.23, 1, 0.32, 1] as const;

export default function ScrollEmerge({
  children,
  className = "",
  delay = 0,
  once = true,
  variant = "section",
  revealLine = false,
}: Props) {
  const mounted = useMounted();
  const duration = variant === "section" ? 0.28 : 0.22;
  const shown = { opacity: 1, transform: "translateY(0px)" };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, transform: "translateY(8px)" }}
      whileInView={mounted ? shown : undefined}
      viewport={{ once, amount: 0.18, margin: "0px 0px -6% 0px" }}
      transition={{
        type: "tween",
        duration,
        delay,
        ease: EASE,
      }}
    >
      {revealLine ? (
        <motion.span
          className="pixel-rule mb-8 block"
          initial={{ clipPath: "inset(0 100% 0 0)", opacity: 1 }}
          whileInView={
            mounted ? { clipPath: "inset(0 0 0 0)", opacity: 1 } : undefined
          }
          viewport={{ once, amount: 0.5 }}
          transition={{ duration: 0.2, delay: delay + 0.04, ease: EASE }}
          aria-hidden
        />
      ) : null}
      {children}
    </motion.div>
  );
}
