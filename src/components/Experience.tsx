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
      className="mx-auto max-w-6xl border-t border-foreground/15 px-6 py-28 md:px-10 md:py-36"
    >
      <ScrollEmerge>
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
          {copy.experience.title}
        </p>
        <TextEmerge
          id="experiencia-title"
          text="Trajetória"
          as="h2"
          className="mt-5 font-display text-3xl tracking-tight text-foreground md:text-4xl"
        />
      </ScrollEmerge>

      <ol className="mt-16 list-none space-y-0 border-t border-dotted border-foreground/25 p-0">
        {copy.experience.roles.map((role, index) => (
          <li
            key={`${role.title}-${role.period}`}
            className="border-b border-dotted border-foreground/25"
          >
            <ScrollEmerge delay={index * 0.07}>
              <div className="grid gap-4 py-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12 md:py-12">
                <div>
                  <h3 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.12em] text-muted-foreground">
                    {role.org}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[0.7rem] text-muted-foreground">
                    {role.period}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {role.summary}
                  </p>
                </div>
              </div>
            </ScrollEmerge>
          </li>
        ))}
      </ol>

      <ScrollEmerge className="mt-16">
        <h3 className="font-display text-lg text-foreground">
          {copy.experience.education.title}
        </h3>
        <ul className="mt-8 list-none space-y-0 border-t border-dotted border-foreground/25 p-0">
          {copy.experience.education.items.map((item) => (
            <li
              key={item.title}
              className="border-b border-dotted border-foreground/25 py-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <p className="font-display text-lg text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                </div>
                <p className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
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
