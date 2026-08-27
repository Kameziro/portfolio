"use client";

import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

/**
 * Mobbin → Freshman Works list
 * https://mobbin.com/sites/sections/7715758c-5482-4a9a-9aed-f8e0bf60d30e
 * Numbered rows, dotted separators, sans brand + serif title, category tag.
 */
export function Projects({ copy }: Props) {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
    >
      <FadeContent duration={800} threshold={0.15}>
        <div className="flex flex-col items-center text-center">
          <p
            className="text-[0.7rem] font-medium"
            style={{ color: "var(--freshman-mark)" }}
          >
            ({copy.projects.items.length})
          </p>
          <h2
            id="projetos-title"
            className="mt-2 font-display text-2xl tracking-tight text-foreground md:text-3xl"
          >
            {copy.projects.title}
          </h2>
        </div>
      </FadeContent>

      <ul className="mt-16 list-none space-y-0 border-t border-dashed border-foreground/35 p-0">
        {copy.projects.items.map((project, index) => (
            <li
              key={project.name}
              className="border-b border-dashed border-foreground/35"
            >
              <FadeContent duration={900} delay={index * 80} threshold={0.2}>
                <article className="grid gap-6 py-12 md:grid-cols-[5rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[5rem_minmax(0,1.2fr)_minmax(0,0.9fr)]">
                  <p className="font-mono text-[0.7rem] tracking-wide text-muted-foreground">
                    # {String(index + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground">
                        {project.name}
                      </h3>
                      <span className="font-display text-2xl italic tracking-tight text-foreground md:text-3xl">
                        {project.line}
                      </span>
                    </div>
                    <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.summary}
                    </p>
                  </div>

                  <p className="font-display text-sm italic text-muted-foreground md:text-right lg:pt-1">
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
