"use client";

import { motion } from "motion/react";
import FocusReveal from "@/components/originkit/ui/focus-reveal";
import TextEmerge from "@/components/originkit/ui/text-emerge";
import { HeroAmbient } from "@/components/HeroAmbient";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

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
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center md:px-10">
        <TextEmerge
          text={copy.hero.role}
          as="p"
          className="pixel-kicker"
          staggerFrom="center"
          play="enter"
          transition={{ duration: 0.28, staggerChildren: 0.04 }}
        />

        <div className="mt-8 w-full max-w-5xl">
          <FocusReveal
            text={copy.hero.name.toUpperCase()}
            as="h1"
            staggerFrom="center"
            className="pixel-title text-center text-4xl text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
            transition={{
              duration: 0.28,
              delay: 0.06,
              staggerChildren: 0.03,
              ease: "easeOut",
            }}
          />
        </div>

        <TextEmerge
          text={copy.hero.lead}
          as="p"
          className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl"
          staggerFrom="start"
          play="enter"
          transition={{ duration: 0.28, delay: 0.22, staggerChildren: 0.04 }}
        />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, transform: "translateY(8px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{
            type: "tween",
            duration: 0.2,
            delay: 0.55,
            ease: EASE_OUT,
          }}
        >
          <a href="#projetos" className="pixel-btn pixel-caret">
            Ver projetos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
