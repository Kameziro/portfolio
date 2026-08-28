"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PortfolioCopy } from "@/content/pt";
import { cn } from "@/lib/utils";

type Props = { copy: PortfolioCopy };

export function SiteHeader({ copy }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#sobre", label: copy.nav.about },
    { href: "#projetos", label: copy.nav.projects },
    { href: "#experiencia", label: copy.nav.experience },
    { href: "#contato", label: copy.nav.contact },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-200 ease-out",
        scrolled
          ? "border-b-2 border-foreground bg-background"
          : "border-b-2 border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
        <Link
          href="#topo"
          className="font-display pixel-link text-[10px] uppercase text-foreground"
        >
          {copy.hero.name}
        </Link>
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
      </div>
    </header>
  );
}
