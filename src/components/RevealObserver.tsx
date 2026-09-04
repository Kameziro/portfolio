"use client";

import { useLayoutEffect } from "react";

const SELECTOR = ".pixel-reveal, .pixel-reveal-item";

export function RevealObserver() {
  useLayoutEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(SELECTOR);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      nodes.forEach((node) => node.setAttribute("data-in", ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "-80px 0px", threshold: 0.08 },
    );

    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, []);

  return null;
}
