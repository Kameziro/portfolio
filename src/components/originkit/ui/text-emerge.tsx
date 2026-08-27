"use client";

/**
 * Text Emerge — Origin Kit motion pattern (word-by-word scale + blur),
 * adapted from the delivered Focus Reveal source for scroll/section use.
 * Full registry fetch blocked by weekly quota; API matches originkit.dev/text-emerge.
 */

import {
  motion,
  useReducedMotion,
  useInView,
  type Transition,
} from "motion/react";
import { useMemo, useRef, type CSSProperties, type ElementType } from "react";

type StaggerFrom = "start" | "center" | "end" | "random";

type TransitionValue = {
  type?: string;
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
  /** Animate once when scrolled into view */
  once?: boolean;
};

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const DEFAULT_TRANSITION: TransitionValue = {
  type: "tween",
  duration: 0.45,
  delay: 0,
  ease: "easeOut",
  staggerChildren: 0.06,
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
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once, amount: 0.25 });

  const words = useMemo(
    () => text.split(/\s+/).filter(Boolean),
    [text],
  );

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
  const show = inView || skip;

  return (
    <MotionTag
      ref={ref as never}
      id={id}
      className={className}
      style={{ margin: 0, ...(color ? { color } : null) } satisfies CSSProperties}
      aria-label={text}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="mr-[0.3em] inline-block will-change-[transform,opacity,filter] last:mr-0"
          aria-hidden
          initial={
            skip
              ? { opacity: 1 }
              : { opacity: 0, scale: 0.86, filter: "blur(12px)" }
          }
          animate={
            show
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.86, filter: "blur(12px)" }
          }
          transition={{
            type: "tween",
            duration: skip ? 0.15 : duration,
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
