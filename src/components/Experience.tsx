"use client";

import ScrollEmerge from "@/components/originkit/ui/scroll-emerge";
import TextEmerge from "@/components/originkit/ui/text-emerge";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Experience({ copy }: Props) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="mx-auto max-w-6xl border-t-2 border-foreground/40 px-6 py-28 md:px-10 md:py-36"
    >
      <ScrollEmerge revealLine>
        <p className="pixel-kicker">{copy.experience.title}</p>
        <TextEmerge
          id="experiencia-title"
          text="Trajetória"
          as="h2"
          className="font-display mt-5 text-[10px] text-foreground sm:text-xs md:text-sm"
        />
      </ScrollEmerge>

      <ol className="mt-16 list-none space-y-0 border-t-2 border-foreground/40 p-0">
        {copy.experience.roles.map((role, index) => (
          <li
            key={`${role.title}-${role.period}`}
            className="border-b-2 border-foreground/40"
          >
            <ScrollEmerge delay={index * 0.05} variant="item">
              <div className="grid gap-4 py-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12 md:py-12">
                <div>
                  <h3 className="pixel-title text-xl text-foreground md:text-2xl">
                    {role.title}
                  </h3>
                  <p className="pixel-kicker mt-3">{role.org}</p>
                </div>
                <div>
                  <p className="font-mono text-lg text-pixel-gold">
                    {role.period}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {role.summary}
                  </p>
                </div>
              </div>
            </ScrollEmerge>
          </li>
        ))}
      </ol>

      <ScrollEmerge className="mt-16">
        <h3 className="font-display text-[8px] uppercase text-foreground sm:text-[10px]">
          {copy.experience.education.title}
        </h3>
        <ul className="mt-8 list-none space-y-0 border-t-2 border-foreground/40 p-0">
          {copy.experience.education.items.map((item) => (
            <li
              key={item.title}
              className="border-b-2 border-foreground/40 py-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <p className="pixel-title text-lg text-foreground">{item.title}</p>
                  <p className="mt-1 text-base text-muted-foreground">{item.org}</p>
                </div>
                <p className="shrink-0 font-mono text-lg text-pixel-gold">
                  {item.period}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollEmerge>
    </section>
  );
}
