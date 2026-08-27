"use client";

import dynamic from "next/dynamic";
import BlurText from "@/components/BlurText";
import type { PortfolioCopy } from "@/content/pt";

const Silk = dynamic(() => import("@/components/Silk"), {
  ssr: false,
  loading: () => null,
});

type Props = { copy: PortfolioCopy };

/**
 * Mobbin refs:
 * - Unseen Studio hero: full-bleed dark, brand as dominant centered signal
 * - Craft Agency hero: atmospheric glow + large serif identity + short lead
 * https://mobbin.com/sites/sections/975a7e67-2632-40cb-ab2b-4a9b1a2fc84f
 * https://mobbin.com/sites/sections/cbde3ed5-2c73-47ee-91a4-6b33cb7efa0e
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
        <div className="absolute inset-0 opacity-55">
          <Silk
            speed={2.8}
            scale={1.05}
            color="#2a2418"
            noiseIntensity={1.3}
            rotation={0.05}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center md:px-10">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
          {copy.hero.role}
        </p>

        <div className="mt-8 w-full max-w-5xl">
          <h1 className="sr-only">{copy.hero.name}</h1>
          <BlurText
            text={copy.hero.name.toUpperCase()}
            delay={40}
            animateBy="letters"
            direction="top"
            className="justify-center font-sans text-5xl font-semibold uppercase leading-[0.9] tracking-[-0.03em] text-foreground sm:text-6xl md:text-7xl lg:text-[6.5rem]"
          />
        </div>

        <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          {copy.hero.lead}
        </p>

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
