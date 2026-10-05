import Image from "next/image";
import { PixelArrow } from "@/components/PixelArrow";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

function ProjectArt({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const className = "object-contain p-10 md:p-14";
  if (src.endsWith(".svg")) {
    return (
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 92vw, 44vw"
      className={className}
      priority={priority}
    />
  );
}

export function Projects({ copy }: Props) {
  return (
    <section
      aria-labelledby="projetos-title"
      className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36"
    >
      <div
        id="projetos"
        className="pixel-anchor pixel-reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <span className="pixel-rule mb-8 block" aria-hidden />
          <p className="pixel-kicker pixel-kicker-alert">
            LV. {String(copy.projects.items.length).padStart(2, "0")}
          </p>
          <h2
            id="projetos-title"
            className="pixel-title mt-3 text-3xl text-foreground md:text-5xl"
          >
            {copy.projects.title}
          </h2>
        </div>
        <p className="font-mono text-xl text-muted-foreground md:max-w-xs md:text-right">
          {copy.projects.caption}
        </p>
      </div>

      <ul className="mt-12 grid list-none grid-cols-1 divide-y-2 divide-foreground border-2 border-foreground p-0 md:grid-cols-2 md:divide-x-2 md:divide-y-0">
        {copy.projects.items.map((project, index) => {
          const href = "href" in project ? project.href : undefined;
          const number = String(index + 1).padStart(2, "0");

          return (
            <li key={project.name} className="project-cell">
              <article className="pixel-reveal-item relative flex h-full flex-col">
                <div className="flex items-center justify-between border-b-2 border-foreground/40 px-5 py-3 font-mono text-lg">
                  <span className="text-pixel-accent">{number}</span>
                  <span className="text-muted-foreground">{project.line}</span>
                </div>

                <div className="project-art relative aspect-[16/10] w-full overflow-hidden">
                  <ProjectArt
                    src={project.logo}
                    alt={href ? "" : project.logoAlt}
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-1 flex-col border-t-2 border-foreground/40 px-5 pb-6 pt-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="pixel-title text-3xl text-foreground sm:text-4xl">
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="pixel-link project-link text-inherit"
                          aria-label={`${project.name} (abre em nova aba)`}
                        >
                          {project.name}
                        </a>
                      ) : (
                        project.name
                      )}
                    </h3>
                    {href ? (
                      <PixelArrow
                        dir="up-right"
                        className="project-arrow mt-1 shrink-0 text-2xl text-pixel-accent"
                      />
                    ) : (
                      <span className="mt-1 shrink-0 font-mono text-base text-muted-foreground">
                        {copy.projects.privateLabel}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                    {project.summary}
                  </p>

                  <ul className="mt-auto flex list-none flex-wrap gap-2 p-0 pt-6">
                    {project.stack.split(" · ").map((tech) => (
                      <li
                        key={tech}
                        className="border-2 border-foreground/40 px-2 py-0.5 font-mono text-base text-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
