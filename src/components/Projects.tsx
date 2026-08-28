"use client";

import Image from "next/image";
import ScrollEmerge from "@/components/originkit/ui/scroll-emerge";
import TextEmerge from "@/components/originkit/ui/text-emerge";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Projects({ copy }: Props) {
  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
    >
      <ScrollEmerge revealLine>
        <div className="flex flex-col items-center text-center">
          <p className="pixel-kicker" style={{ color: "var(--freshman-mark)" }}>
            LV. {String(copy.projects.items.length).padStart(2, "0")}
          </p>
          <TextEmerge
            id="projetos-title"
            text={copy.projects.title}
            as="h2"
            className="font-display mt-3 text-[10px] text-foreground sm:text-xs"
            staggerFrom="center"
          />
        </div>
      </ScrollEmerge>

      <ul className="mt-16 list-none space-y-0 border-t-2 border-foreground/40 p-0">
        {copy.projects.items.map((project, index) => (
          <li key={project.name} className="border-b-2 border-foreground/40">
            <ScrollEmerge delay={index * 0.05} variant="item">
              <article className="grid items-start gap-6 py-12 md:grid-cols-[4.5rem_minmax(7.5rem,11rem)_minmax(0,1fr)] md:gap-8 lg:grid-cols-[4.5rem_minmax(9rem,13rem)_minmax(0,1fr)_minmax(0,12rem)] lg:gap-10">
                <p className="font-mono text-lg tracking-wide text-muted-foreground">
                  #{String(index + 1).padStart(2, "0")}
                </p>

                <div className="pixel-frame relative aspect-square w-full max-w-[13rem] overflow-hidden bg-[#0a0814]">
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
                    <h3 className="font-display text-[8px] uppercase text-pixel-gold sm:text-[10px]">
                      {project.name}
                    </h3>
                    <span className="pixel-title text-xl text-foreground md:text-2xl">
                      {project.line}
                    </span>
                  </div>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.summary}
                  </p>
                  <p className="mt-4 font-mono text-base text-muted-foreground lg:hidden">
                    {project.stack}
                  </p>
                </div>

                <p className="hidden font-mono text-base text-muted-foreground lg:block lg:pt-1 lg:text-right">
                  {project.stack}
                </p>
              </article>
            </ScrollEmerge>
          </li>
        ))}
      </ul>
    </section>
  );
}
