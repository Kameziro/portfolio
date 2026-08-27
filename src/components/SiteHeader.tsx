"use client";

import Link from "next/link";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function SiteHeader({ copy }: Props) {
  const links = [
    { href: "#sobre", label: copy.nav.about },
    { href: "#projetos", label: copy.nav.projects },
    { href: "#experiencia", label: copy.nav.experience },
    { href: "#contato", label: copy.nav.contact },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 md:px-10">
        <Link
          href="#topo"
          className="font-display text-base tracking-tight text-foreground transition-opacity hover:opacity-80 md:text-lg"
        >
          {copy.hero.name}
        </Link>
        <nav
          aria-label="Seções"
          className="hidden items-center gap-8 sm:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8rem] uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
