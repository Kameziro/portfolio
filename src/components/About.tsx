"use client";

import ScrollEmerge from "@/components/originkit/ui/scroll-emerge";
import TextEmerge from "@/components/originkit/ui/text-emerge";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function About({ copy }: Props) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="mx-auto max-w-6xl border-t-2 border-foreground/40 px-6 py-28 md:px-10 md:py-36"
    >
      <ScrollEmerge revealLine>
        <p className="pixel-kicker">{copy.about.title}</p>
        <TextEmerge
          id="sobre-title"
          text={copy.about.fullName}
          as="h2"
          className="pixel-title mt-5 max-w-2xl text-2xl text-foreground md:text-4xl"
          staggerFrom="start"
        />
        <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {copy.about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </ScrollEmerge>
    </section>
  );
}
