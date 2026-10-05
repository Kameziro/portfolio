import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

type Row = {
  title: string;
  org: string;
  period: string;
  summary?: string;
};

const GROUP_GRID = "md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]";
const ROW_GRID = "md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.75fr)]";

function ExperienceGroup({
  label,
  rows,
  periodClass,
}: {
  label: string;
  rows: readonly Row[];
  periodClass: string;
}) {
  return (
    <div
      className={`pixel-reveal-item grid gap-6 border-b-2 border-foreground py-10 md:gap-8 ${GROUP_GRID}`}
    >
      <h3 className="pixel-title text-2xl text-foreground md:text-3xl">{label}</h3>
      <ol className="list-none p-0">
        {rows.map((row) => (
          <li
            key={`${row.title}-${row.period}`}
            className={`grid gap-2 border-t-2 border-foreground/20 py-5 first:border-t-0 first:pt-0 last:pb-0 md:gap-8 ${ROW_GRID}`}
          >
            <div>
              <p className="pixel-title text-lg text-foreground">{row.title}</p>
              {row.summary ? (
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {row.summary}
                </p>
              ) : null}
            </div>
            <p className="text-base text-muted-foreground">{row.org}</p>
            <p className={`font-mono text-lg md:text-right ${periodClass}`}>
              {row.period}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Experience({ copy }: Props) {
  const { experience } = copy;

  return (
    <section
      aria-labelledby="experiencia-title"
      className="mx-auto max-w-6xl border-t-2 border-foreground/40 px-6 py-28 md:px-10 md:py-36"
    >
      <div id="experiencia" className="pixel-anchor pixel-reveal">
        <span className="pixel-rule mb-8 block" aria-hidden />
        <p className="pixel-kicker">{experience.title}</p>
        <h2
          id="experiencia-title"
          className="pixel-title mt-5 text-3xl text-foreground md:text-5xl"
        >
          {experience.heading}
        </h2>
      </div>

      <div
        aria-hidden
        className={`mt-16 hidden border-b-2 border-foreground pb-3 font-mono text-lg uppercase text-muted-foreground md:grid md:gap-8 ${GROUP_GRID}`}
      >
        <span />
        <div className={`grid gap-8 ${ROW_GRID}`}>
          <span>{experience.columns.role}</span>
          <span>{experience.columns.org}</span>
          <span className="text-right">{experience.columns.period}</span>
        </div>
      </div>

      <div className="mt-10 border-t-2 border-foreground md:mt-0 md:border-t-0">
        <ExperienceGroup
          label={experience.rolesLabel}
          rows={experience.roles}
          periodClass="text-pixel-accent"
        />
        <ExperienceGroup
          label={experience.education.title}
          rows={experience.education.items}
          periodClass="text-foreground"
        />
      </div>
    </section>
  );
}
