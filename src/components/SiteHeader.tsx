"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PortfolioCopy } from "@/content/pt";
import { cn } from "@/lib/utils";

type Props = { copy: PortfolioCopy };

/** Unseen Studio header — fixed, blurs on scroll */
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
        "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-500 ease-out",
        scrolled
          ? "border-b border-foreground/10 bg-background/75 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Link
          href="#topo"
          className="font-display text-base lowercase tracking-tight text-foreground md:text-lg"
        >
          {copy.hero.name.toLowerCase()}
        </Link>
        <nav aria-label="Seções" className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.75rem] text-foreground/75 transition-colors duration-300 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
