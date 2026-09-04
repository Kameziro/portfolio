import Image from "next/image";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Projects({ copy }: Props) {
  return (
    <section
      aria-labelledby="projetos-title"
      className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
    >
      <div
        id="projetos"
        className="pixel-anchor pixel-reveal flex flex-col items-center text-center"
      >
        <span className="pixel-rule mb-8 block" aria-hidden />
        <p className="pixel-kicker pixel-kicker-alert">
          LV. {String(copy.projects.items.length).padStart(2, "0")}
        </p>
        <h2
          id="projetos-title"
          className="pixel-title mt-3 text-xl text-foreground md:text-2xl"
        >
          {copy.projects.title}
        </h2>
      </div>

      <ul className="mt-16 grid list-none grid-cols-1 gap-12 p-0 md:grid-cols-2 md:gap-8 lg:gap-12">
        {copy.projects.items.map((project, index) => (
          <li key={project.name}>
            <article className="pixel-stage pixel-reveal-item">
              <div className="pixel-frame pixel-stage-art relative aspect-[5/4] w-full overflow-hidden bg-card">
                <Image
                  src={project.logo}
                  alt={project.logoAlt}
                  fill
                  sizes="(max-width: 768px) 92vw, 44vw"
                  className="object-contain p-8 md:p-10"
                  priority={index === 0}
                />
              </div>

              <p className="mt-6 font-mono text-lg tracking-wide text-pixel-cyan">
                #{String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="pixel-title mt-3 text-3xl text-foreground sm:text-4xl lg:text-5xl">
                {project.name}
              </h3>
              <p className="pixel-kicker mt-4">{project.line}</p>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.summary}
              </p>
              <p className="mt-4 font-mono text-base text-muted-foreground">
                {project.stack}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
