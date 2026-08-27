"use client";

import dynamic from "next/dynamic";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import Magnet from "@/components/Magnet";
import type { PortfolioCopy } from "@/content/pt";

const Silk = dynamic(() => import("@/components/Silk"), {
  ssr: false,
  loading: () => null,
});

type Props = { copy: PortfolioCopy };

export function Hero({ copy }: Props) {
  return (
    <section
      id="topo"
      aria-label="Hero"
      className="relative mx-auto flex min-h-[88vh] max-w-5xl flex-col justify-end overflow-hidden px-6 pb-24 pt-28 md:px-10 md:pb-32"
    >
      <div className="silk-stage absolute inset-x-[-10%] top-[-10%] h-[70%] md:inset-x-0">
        <Silk
          speed={3.2}
          scale={1.05}
          color="#3a2e12"
          noiseIntensity={1.1}
          rotation={0.08}
        />
      </div>

      <div className="relative z-10">
        <ShinyText
          text="PORTFÓLIO"
          speed={2.4}
          color="#a39e91"
          shineColor="#d4a017"
          className="text-sm font-medium uppercase tracking-[0.22em]"
        />

        <div className="mt-5 max-w-4xl">
          <BlurText
            text={copy.hero.name}
            delay={60}
            animateBy="letters"
            direction="top"
            className="font-display text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          />
        </div>

        <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
          {copy.hero.role}
        </p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/90 md:text-lg">
          {copy.hero.lead}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Magnet padding={40} magnetStrength={3}>
            <a
              href="#projetos"
              className={cn(buttonVariants({ size: "lg" }), "rounded-sm px-5")}
            >
              Ver projetos
            </a>
          </Magnet>
          <Magnet padding={40} magnetStrength={3}>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "rounded-sm px-5",
              )}
            >
              Contato
            </a>
          </Magnet>
        </div>
      </div>
    </section>
  );
}
