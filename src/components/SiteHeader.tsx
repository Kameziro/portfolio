"use client";

import Link from "next/link";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

/** Mobbin → Unseen Studio header: serif wordmark left, sparse nav right */
export function SiteHeader({ copy }: Props) {
  const links = [
    { href: "#sobre", label: copy.nav.about },
    { href: "#projetos", label: copy.nav.projects },
    { href: "#experiencia", label: copy.nav.experience },
    { href: "#contato", label: copy.nav.contact },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
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
              className="text-[0.75rem] text-foreground/80 transition-opacity hover:opacity-100"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
