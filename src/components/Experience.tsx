import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Experience({ copy }: Props) {
  return (
    <section
      aria-labelledby="experiencia-title"
      className="mx-auto max-w-6xl border-t-2 border-foreground/40 px-6 py-28 md:px-10 md:py-36"
    >
      <div id="experiencia" className="pixel-anchor pixel-reveal">
        <span className="pixel-rule mb-8 block" aria-hidden />
        <p className="pixel-kicker">{copy.experience.title}</p>
        <h2
          id="experiencia-title"
          className="pixel-title mt-5 text-xl text-foreground md:text-2xl"
        >
          {copy.experience.heading}
        </h2>
      </div>

      <ol className="mt-16 list-none space-y-0 border-t-2 border-foreground/40 p-0">
        {copy.experience.roles.map((role) => (
          <li
            key={`${role.title}-${role.period}`}
            className="border-b-2 border-foreground/40"
          >
            <div className="pixel-reveal-item grid gap-4 py-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12 md:py-12">
              <div>
                <h3 className="pixel-title text-xl text-foreground md:text-2xl">
                  {role.title}
                </h3>
                <p className="pixel-kicker mt-3">{role.org}</p>
              </div>
              <div>
                <p className="font-mono text-lg text-pixel-cyan">{role.period}</p>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
                  {role.summary}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="pixel-reveal mt-16">
        <h3 className="font-display text-[8px] uppercase text-foreground sm:text-[10px]">
          {copy.experience.education.title}
        </h3>
        <ul className="mt-8 list-none space-y-0 border-t-2 border-foreground/40 p-0">
          {copy.experience.education.items.map((item) => (
            <li
              key={item.title}
              className="border-b-2 border-foreground/40 py-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div>
                  <p className="pixel-title text-lg text-foreground">{item.title}</p>
                  <p className="mt-1 text-base text-muted-foreground">{item.org}</p>
                </div>
                <p className="shrink-0 font-mono text-lg text-pixel-magenta">
                  {item.period}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
