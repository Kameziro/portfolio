import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function About({ copy }: Props) {
  return (
    <section
      aria-labelledby="sobre-title"
      className="mx-auto max-w-6xl border-t-2 border-foreground/40 px-6 py-28 md:px-10 md:py-36"
    >
      <div id="sobre" className="pixel-anchor pixel-reveal">
        <span className="pixel-rule mb-8 block" aria-hidden />
        <p className="pixel-kicker">{copy.about.title}</p>
        <h2
          id="sobre-title"
          className="pixel-title mt-5 max-w-2xl text-2xl text-foreground md:text-4xl"
        >
          {copy.about.fullName}
        </h2>
        <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {copy.about.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
