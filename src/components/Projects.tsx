"use client";

import FadeContent from "@/components/FadeContent";
import { Separator } from "@/components/ui/separator";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Projects({ copy }: Props) {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="mx-auto max-w-5xl border-t border-border px-6 py-24 md:px-10 md:py-28"
    >
      <FadeContent duration={800} threshold={0.15}>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">{copy.projects.title}</p>
        <h2
          id="projetos-title"
          className="mt-4 font-display text-3xl tracking-tight text-foreground md:text-4xl"
        >
          Trabalho em destaque
        </h2>
      </FadeContent>

      <ul className="mt-12 list-none space-y-0 p-0">
        {copy.projects.items.map((project, index) => (
          <li key={project.name}>
            {index > 0 ? <Separator className="bg-border" /> : null}
            <FadeContent duration={900} delay={index * 80} threshold={0.2}>
              <div className="group py-8 first:pt-0">
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
                  <h3 className="font-display text-2xl text-foreground transition-colors group-hover:text-primary md:text-3xl">
                    {project.name}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground md:text-right">
                    {project.stack}
                  </p>
                </div>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {project.summary}
                </p>
              </div>
            </FadeContent>
          </li>
        ))}
      </ul>
    </section>
  );
}
