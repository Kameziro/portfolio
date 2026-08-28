"use client";

import FocusReveal from "@/components/originkit/ui/focus-reveal";
import TextEmerge from "@/components/originkit/ui/text-emerge";
import { HeroAmbient } from "@/components/HeroAmbient";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

/**
 * Mobbin hero + Origin Kit Focus Reveal / Text Emerge + CSS ambient mesh
 */
export function Hero({ copy }: Props) {
  return (
    <section
      id="topo"
      aria-label="Hero"
      className="noise-overlay relative isolate min-h-[100svh]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <HeroAmbient />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/15 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center md:px-10">
        <TextEmerge
          text={copy.hero.role}
          as="p"
          className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground"
          staggerFrom="center"
          transition={{ duration: 0.4, staggerChildren: 0.04 }}
        />

        <div className="mt-8 w-full max-w-5xl">
          <FocusReveal
            text={copy.hero.name.toUpperCase()}
            as="h1"
            blur={16}
            staggerFrom="center"
            className="text-center font-sans text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[6.5rem]"
            transition={{
              duration: 0.35,
              delay: 0.08,
              staggerChildren: 0.03,
              ease: "easeOut",
            }}
          />
        </div>

        <TextEmerge
          text={copy.hero.lead}
          as="p"
          className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          staggerFrom="start"
          transition={{ duration: 0.45, delay: 0.35, staggerChildren: 0.05 }}
        />

        <a
          href="#projetos"
          className="mt-10 text-[0.7rem] uppercase tracking-[0.22em] text-foreground underline decoration-foreground/50 underline-offset-8 transition-colors hover:decoration-foreground"
        >
          Ver projetos
        </a>
      </div>
    </section>
  );
}
