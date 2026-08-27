"use client";

import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function About({ copy }: Props) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="mx-auto max-w-6xl border-t border-foreground/15 px-6 py-28 md:px-10 md:py-36"
    >
      <FadeContent blur duration={900} threshold={0.2}>
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
          {copy.about.title}
        </p>
        <h2
          id="sobre-title"
          className="mt-5 max-w-2xl font-display text-3xl leading-tight tracking-tight text-foreground md:text-5xl"
        >
          {copy.about.fullName}
        </h2>
        <div className="mt-10 max-w-2xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {copy.about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </FadeContent>
    </section>
  );
}
