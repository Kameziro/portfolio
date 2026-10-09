"use client";

import { useEffect, useRef } from "react";

type Props = {
  href: string;
  label: string;
  keyLabel: string;
};

const PRESS_MS = 160;

/**
 * Hero CTA that also answers to Enter, like a cartridge title screen — but
 * only while nothing else has focus and the hero is still on screen, so it
 * never hijacks Enter from links, buttons or form fields.
 */
export function PressStart({ href, label, keyLabel }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let timer = 0;

    const onKey = (event: KeyboardEvent) => {
      const link = ref.current;
      if (!link || event.key !== "Enter" || event.repeat) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const active = document.activeElement;
      if (active && active !== document.body) return;
      if (window.scrollY > window.innerHeight / 2) return;

      event.preventDefault();
      link.setAttribute("data-pressed", "");
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        link.removeAttribute("data-pressed");
        link.click();
      }, PRESS_MS);
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <a ref={ref} href={href} className="pixel-btn pixel-btn-fill hero-cta hero-start">
      <span aria-hidden className="hero-start__play" />
      {label}
      <kbd aria-hidden className="hero-start__key">{keyLabel}</kbd>
    </a>
  );
}
