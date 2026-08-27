"use client";

import dynamic from "next/dynamic";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import BlurText from "@/components/BlurText";
import Magnet from "@/components/Magnet";
import type { PortfolioCopy } from "@/content/pt";

const Silk = dynamic(() => import("@/components/Silk"), {
  ssr: false,
  loading: () => null,
});

type Props = { copy: PortfolioCopy };

/** Freshman-style split: first name sans, last name display serif */
function BrandMark({ name }: { name: string }) {
  const [first, ...rest] = name.split(" ");
  const last = rest.join(" ");

  return (
    <div>
      <h1 className="sr-only">{name}</h1>
      <div aria-hidden className="flex flex-col gap-1 sm:gap-2">
        <BlurText
          text={first}
          delay={45}
          animateBy="letters"
          direction="top"
          className="font-sans text-5xl font-semibold uppercase leading-[0.92] tracking-[-0.04em] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
        />
        {last ? (
          <BlurText
            text={last}
            delay={55}
            animateBy="letters"
            direction="top"
            className="font-display text-5xl font-normal italic leading-[0.92] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          />
        ) : null}
      </div>
    </div>
  );
}

export function Hero({ copy }: Props) {
  return (
    <section id="topo" aria-label="Hero" className="relative isolate min-h-[100svh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-65">
          <Silk
            speed={3.2}
            scale={1.1}
            color="#3a2e12"
            noiseIntensity={1.15}
            rotation={0.08}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/10 to-background" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 md:px-10 md:pb-28">
        <div className="max-w-4xl">
          <BrandMark name={copy.hero.name} />
        </div>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.hero.lead}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Magnet padding={40} magnetStrength={3}>
            <a
              href="#projetos"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-none px-6 text-[0.8rem] uppercase tracking-[0.14em]",
              )}
            >
              Ver projetos
            </a>
          </Magnet>
          <Magnet padding={40} magnetStrength={3}>
            <a
              href="#contato"
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "rounded-none px-2 text-[0.8rem] uppercase tracking-[0.14em] text-foreground underline-offset-8 hover:underline",
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
