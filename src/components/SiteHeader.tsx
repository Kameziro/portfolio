"use client";

import { useEffect, useState } from "react";
import type { PortfolioCopy } from "@/content/pt";
import { cn } from "@/lib/utils";

type Props = { copy: PortfolioCopy };

const NAV_LINKS = [
  { href: "#sobre", key: "about" },
  { href: "#projetos", key: "projects" },
  { href: "#experiencia", key: "experience" },
] as const;

export function SiteHeader({ copy }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const mq = window.matchMedia("(min-width: 640px)");
    const onViewport = () => {
      if (mq.matches) setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onViewport);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onViewport);
    };
  }, [menuOpen]);

  const links = NAV_LINKS.map((link) => ({
    href: link.href,
    label: copy.nav[link.key],
  }));

  const solidBar = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "pixel-header fixed inset-x-0 top-0 z-40",
        solidBar
          ? "border-b-2 border-foreground bg-background"
          : "border-b-2 border-transparent bg-transparent",
      )}
    >
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <a
          href="#topo"
          className="font-display pixel-link text-[10px] uppercase text-foreground"
          onClick={(event) => {
            setMenuOpen(false);
            const hero = document.getElementById("topo");
            if (!hero) return;
            event.preventDefault();
            hero.scrollIntoView();
            if (window.location.hash !== "#topo") {
              window.history.pushState(null, "", "#topo");
            }
          }}
        >
          {copy.hero.name}
        </a>
        <nav aria-label="Seções" className="hidden items-center gap-6 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display pixel-link pixel-nav text-[10px] uppercase text-muted-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="pixel-menu-btn flex sm:hidden"
          aria-label={menuOpen ? copy.nav.close : copy.nav.open}
          aria-expanded={menuOpen}
          aria-controls="pixel-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="pixel-menu"
        aria-label="Seções"
        aria-hidden={!menuOpen}
        {...(!menuOpen ? { inert: true } : {})}
        data-open={menuOpen ? "" : undefined}
        className="pixel-menu-panel flex sm:hidden"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-display pixel-link pixel-nav py-4 text-xs uppercase text-foreground"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
