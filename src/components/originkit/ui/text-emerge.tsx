"use client";

/**
 * Text Emerge — word stagger on scroll (opacity + y).
 */

import { motion, type Transition } from "motion/react";
import { useMemo, type CSSProperties } from "react";
import { useMounted } from "@/hooks/use-mounted";

type StaggerFrom = "start" | "center" | "end" | "random";

type TransitionValue = {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  staggerChildren?: number;
};

type TextEmergeProps = {
  text?: string;
  className?: string;
  color?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  id?: string;
  staggerFrom?: StaggerFrom;
  transition?: TransitionValue;
  once?: boolean;
  /** enter = play on mount (hero); scroll = whileInView after hydrate */
  play?: "scroll" | "enter";
};

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const DEFAULT_TRANSITION: TransitionValue = {
  duration: 0.28,
  delay: 0,
  ease: "easeOut",
  staggerChildren: 0.04,
};

const resolveEase = (
  ease: TransitionValue["ease"],
): Transition["ease"] => {
  if (Array.isArray(ease)) return ease as [number, number, number, number];
  if (ease === "linear") return "linear";
  if (ease === "easeIn") return [0.55, 0.085, 0.68, 0.53];
  if (ease === "easeInOut") return [0.645, 0.045, 0.355, 1];
  return EASE_OUT;
};

const buildStaggerDelays = (
  count: number,
  each: number,
  from: StaggerFrom,
  baseDelay: number,
): number[] => {
  if (count === 0) return [];
  if (from === "end") {
    return Array.from(
      { length: count },
      (_, i) => baseDelay + (count - 1 - i) * each,
    );
  }
  if (from === "center") {
    const mid = (count - 1) / 2;
    return Array.from(
      { length: count },
      (_, i) => baseDelay + Math.abs(i - mid) * each,
    );
  }
  if (from === "random") {
    const order = Array.from({ length: count }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order.map((rank) => baseDelay + rank * each);
  }
  return Array.from({ length: count }, (_, i) => baseDelay + i * each);
};

export default function TextEmerge({
  text = "",
  className = "",
  color,
  as: Tag = "p",
  id,
  staggerFrom = "start",
  transition = DEFAULT_TRANSITION,
  once = true,
  play = "scroll",
}: TextEmergeProps) {
  const mounted = useMounted();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const duration = transition.duration ?? DEFAULT_TRANSITION.duration!;
  const baseDelay = transition.delay ?? DEFAULT_TRANSITION.delay!;
  const staggerEach =
    transition.staggerChildren ?? DEFAULT_TRANSITION.staggerChildren!;
  const delays = useMemo(
    () =>
      buildStaggerDelays(
        words.length,
        staggerEach,
        staggerFrom,
        baseDelay,
      ),
    [words.length, staggerFrom, baseDelay, staggerEach],
  );

  const viewport = { once, amount: 0.25, margin: "0px 0px -8% 0px" as const };
  const hidden = { opacity: 0, transform: "translateY(8px)" };
  const shown = { opacity: 1, transform: "translateY(0px)" };

  return (
    <Tag
      id={id}
      className={className}
      style={{ margin: 0, ...(color ? { color } : null) } satisfies CSSProperties}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.3em] inline-block last:mr-0"
          aria-hidden
          initial={hidden}
          animate={play === "enter" ? shown : undefined}
          whileInView={play === "scroll" && mounted ? shown : undefined}
          viewport={viewport}
          transition={{
            type: "tween",
            duration,
            delay: delays[index] ?? 0,
            ease: resolveEase(transition.ease),
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}

export type { TextEmergeProps, StaggerFrom };
