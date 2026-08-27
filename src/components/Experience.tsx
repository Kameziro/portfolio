"use client";

import FadeContent from "@/components/FadeContent";
import { Separator } from "@/components/ui/separator";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Experience({ copy }: Props) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="mx-auto max-w-5xl border-t border-border px-6 py-24 md:px-10 md:py-28"
    >
      <FadeContent duration={800}>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          {copy.experience.title}
        </p>
        <h2
          id="experiencia-title"
          className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-4xl"
        >
          Trajetória
        </h2>
      </FadeContent>

      <ol className="mt-12 list-none space-y-10 p-0">
        {copy.experience.roles.map((role, index) => (
          <li key={`${role.title}-${role.period}`}>
            <FadeContent duration={850} delay={index * 70}>
              <div className="max-w-2xl">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    {role.title}
                  </h3>
                  <p className="shrink-0 text-sm text-muted-foreground">{role.period}</p>
                </div>
                <p className="mt-1 text-sm text-primary">{role.org}</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                  {role.summary}
                </p>
              </div>
            </FadeContent>
          </li>
        ))}
      </ol>

      <Separator className="mt-16 bg-border" />

      <FadeContent duration={800} className="mt-10 max-w-2xl">
        <h3 className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {copy.experience.education.title}
        </h3>
        <ul className="mt-6 list-none space-y-5 p-0">
          {copy.experience.education.items.map((item) => (
            <li key={item.title}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="shrink-0 text-sm text-muted-foreground">{item.period}</p>
              </div>
              <p className="text-sm text-muted-foreground">{item.org}</p>
            </li>
          ))}
        </ul>
      </FadeContent>
    </section>
  );
}
