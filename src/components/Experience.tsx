"use client";

import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Experience({ copy }: Props) {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-title"
      className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-10 md:py-36"
    >
      <FadeContent duration={800}>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-primary">
          {copy.experience.title}
        </p>
        <h2
          id="experiencia-title"
          className="mt-5 font-display text-3xl tracking-tight text-foreground md:text-4xl"
        >
          Trajetória
        </h2>
      </FadeContent>

      <ol className="mt-16 list-none space-y-0 border-t border-border p-0">
        {copy.experience.roles.map((role, index) => (
          <li
            key={`${role.title}-${role.period}`}
            className="border-b border-border"
          >
            <FadeContent duration={850} delay={index * 70}>
              <div className="grid gap-4 py-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:gap-12 md:py-12">
                <div>
                  <h3 className="font-display text-2xl tracking-tight text-foreground md:text-3xl">
                    {role.title}
                  </h3>
                  <p className="mt-2 text-sm text-primary">{role.org}</p>
                </div>
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {role.period}
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {role.summary}
                  </p>
                </div>
              </div>
            </FadeContent>
          </li>
        ))}
      </ol>

      <FadeContent duration={800} className="mt-16 max-w-3xl">
        <h3 className="text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
          {copy.experience.education.title}
        </h3>
        <ul className="mt-8 list-none space-y-0 border-t border-border p-0">
          {copy.experience.education.items.map((item) => (
            <li key={item.title} className="border-b border-border py-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <p className="font-medium text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.org}</p>
                </div>
                <p className="shrink-0 text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {item.period}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </FadeContent>
    </section>
  );
}
