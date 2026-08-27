"use client";

import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function About({ copy }: Props) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="mx-auto max-w-5xl border-t border-border px-6 py-24 md:px-10 md:py-28"
    >
      <FadeContent blur duration={900} threshold={0.2}>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">{copy.about.title}</p>
        <h2
          id="sobre-title"
          className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-4xl"
        >
          {copy.about.fullName}
        </h2>
        <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </FadeContent>
    </section>
  );
}
