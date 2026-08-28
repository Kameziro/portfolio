"use client";

/**
 * Focus Reveal — Origin Kit stagger (scale + fade). No CSS filter —
 * filter:blur was sticking mid-animation and wiping the hero.
 */

import { motion, type Transition } from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from "react";

type TransitionValue = {
  duration?: number;
  delay?: number;
  ease?: string | number[];
  staggerChildren?: number;
};

type StaggerFrom = "start" | "center" | "end" | "random";

type FocusRevealProps = {
  text?: string;
  font?: CSSProperties;
  color?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  blur?: number;
  staggerFrom?: StaggerFrom;
  transition?: TransitionValue;
  onComplete?: () => void;
};

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const DEFAULT_TRANSITION: TransitionValue = {
  duration: 0.28,
  delay: 0,
  ease: "easeOut",
  staggerChildren: 0.028,
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

export default function FocusReveal({
  text = "",
  font,
  color,
  className = "",
  as: Tag = "h1",
  staggerFrom = "center",
  transition = DEFAULT_TRANSITION,
  onComplete,
}: FocusRevealProps) {
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const duration = transition.duration ?? DEFAULT_TRANSITION.duration!;
  const baseDelay = transition.delay ?? DEFAULT_TRANSITION.delay!;
  const staggerEach =
    transition.staggerChildren ?? DEFAULT_TRANSITION.staggerChildren!;
  const lastIndex = text.length - 1;

  const delays = useMemo(
    () =>
      buildStaggerDelays(
        text.length,
        staggerEach,
        staggerFrom,
        baseDelay,
      ),
    [text.length, staggerFrom, baseDelay, staggerEach],
  );

  const words = useMemo(() => {
    const parts: { chars: string[]; startIndex: number }[] = [];
    let startIndex = 0;
    for (const token of text.split(/(\s+)/)) {
      if (!token) continue;
      parts.push({ chars: token.split(""), startIndex });
      startIndex += token.length;
    }
    return parts;
  }, [text]);

  useEffect(() => {
    completedRef.current = false;
  }, [text, staggerFrom, duration, baseDelay, staggerEach]);

  return (
    <Tag
      aria-label={text}
      className={className}
      style={{
        margin: 0,
        display: "block",
        width: "100%",
        ...(color ? { color } : null),
        ...(font ?? null),
      }}
    >
      {words.map((word, wordIndex) => {
        const isWhitespace = word.chars.every((c) => /\s/.test(c));
        return (
          <span
            key={`word-${wordIndex}`}
            className={
              isWhitespace ? undefined : "inline-block whitespace-nowrap"
            }
            aria-hidden="true"
          >
            {word.chars.map((char, charOffset) => {
              const index = word.startIndex + charOffset;
              return (
                <motion.span
                  key={`${char}-${index}`}
                  className="inline-block"
                  initial={{
                    opacity: 0,
                    transform: "translateY(8px) scale(0.96)",
                  }}
                  animate={{
                    opacity: 1,
                    transform: "translateY(0px) scale(1)",
                  }}
                  transition={{
                    type: "tween",
                    duration,
                    delay: delays[index] ?? 0,
                    ease: resolveEase(transition.ease),
                  }}
                  onAnimationComplete={() => {
                    if (index !== lastIndex || completedRef.current) return;
                    completedRef.current = true;
                    onCompleteRef.current?.();
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </Tag>
  );
}

export type { FocusRevealProps, StaggerFrom };
