"use client";

import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function About({ copy }: Props) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-10 md:py-36"
    >
      <FadeContent blur duration={900} threshold={0.2}>
        <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-16">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.24em] text-primary">
              {copy.about.title}
            </p>
            <h2
              id="sobre-title"
              className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl"
            >
              {copy.about.fullName}
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </FadeContent>
    </section>
  );
}
