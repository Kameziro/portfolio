"use client";

import Image from "next/image";
import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

/**
 * Mobbin → Freshman Works list
 * https://mobbin.com/sites/sections/7715758c-5482-4a9a-9aed-f8e0bf60d30e
 * Numbered rows + project visual (logo) + sans brand / serif line.
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
              <article className="grid items-start gap-6 py-12 md:grid-cols-[4.5rem_minmax(7.5rem,11rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[4.5rem_minmax(9rem,13rem)_minmax(0,1fr)_minmax(0,12rem)] lg:gap-10">
                <p className="font-mono text-[0.7rem] tracking-wide text-muted-foreground">
                  # {String(index + 1).padStart(2, "0")}
                </p>

                <div className="relative aspect-square w-full max-w-[13rem] overflow-hidden bg-[#0a0a0a] ring-1 ring-foreground/10">
                  <Image
                    src={project.logo}
                    alt={project.logoAlt}
                    fill
                    sizes="(max-width: 768px) 40vw, 208px"
                    className="object-contain p-3"
                    priority={index === 0}
                  />
                </div>

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
                  <p className="mt-4 font-display text-sm italic text-muted-foreground lg:hidden">
                    {project.stack}
                  </p>
                </div>

                <p className="hidden font-display text-sm italic text-muted-foreground lg:block lg:pt-1 lg:text-right">
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
