"use client";

/**
 * Text Emerge — word stagger on scroll (opacity + y only, no filter).
 */

import { motion, useReducedMotion, type Transition } from "motion/react";
import { useMemo, type CSSProperties, type ElementType } from "react";

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
};

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const DEFAULT_TRANSITION: TransitionValue = {
  duration: 0.4,
  delay: 0,
  ease: "easeOut",
  staggerChildren: 0.05,
};

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
} as const satisfies Record<string, ElementType>;

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
}: TextEmergeProps) {
  const reduceMotion = useReducedMotion();
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const duration = transition.duration ?? DEFAULT_TRANSITION.duration!;
  const baseDelay = transition.delay ?? DEFAULT_TRANSITION.delay!;
  const staggerEach =
    transition.staggerChildren ?? DEFAULT_TRANSITION.staggerChildren!;
  const skip = reduceMotion === true;
  const delays = useMemo(
    () =>
      buildStaggerDelays(
        words.length,
        skip ? 0 : staggerEach,
        staggerFrom,
        baseDelay,
      ),
    [words.length, skip, staggerFrom, baseDelay, staggerEach],
  );

  const MotionTag = MOTION_TAGS[Tag];

  return (
    <MotionTag
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
          initial={skip ? false : { opacity: 1, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once, amount: 0.2 }}
          transition={{
            type: "tween",
            duration: skip ? 0.01 : duration,
            delay: delays[index] ?? 0,
            ease: resolveEase(transition.ease),
          }}
        >
          {word}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export type { TextEmergeProps, StaggerFrom };
