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
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3 md:px-10">
        <Link
          href="#topo"
          className="font-display text-lg tracking-tight text-foreground transition-colors hover:text-primary"
        >
          {copy.hero.name}
        </Link>
        <nav aria-label="Seções" className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
