"use client";

import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Projects({ copy }: Props) {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-10 md:py-36"
    >
      <FadeContent duration={800} threshold={0.15}>
        <p className="text-[0.7rem] uppercase tracking-[0.24em] text-primary">
          {copy.projects.title}
        </p>
        <h2
          id="projetos-title"
          className="mt-5 font-display text-3xl tracking-tight text-foreground md:text-4xl"
        >
          Trabalho em destaque
        </h2>
      </FadeContent>

      <ul className="mt-16 list-none space-y-0 border-t border-dashed border-border p-0">
        {copy.projects.items.map((project, index) => (
          <li
            key={project.name}
            className="border-b border-dashed border-border"
          >
            <FadeContent duration={900} delay={index * 80} threshold={0.2}>
              <article className="group grid gap-6 py-10 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,14rem)] md:gap-10 md:py-12">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors group-hover:text-primary">
                  #{String(index + 1).padStart(2, "0")}
                </p>
                <div>
                  <h3 className="font-display text-3xl tracking-tight text-foreground transition-colors group-hover:text-primary md:text-4xl">
                    {project.name}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.summary}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground md:pt-2 md:text-right">
                  {project.stack}
                </p>
              </article>
            </FadeContent>
          </li>
        ))}
      </ul>
    </section>
  );
}
