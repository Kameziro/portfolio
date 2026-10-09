import { HeroMatrix } from "@/components/HeroMatrix";
import { PressStart } from "@/components/PressStart";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Hero({ copy }: Props) {
  const { hero } = copy;

  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="hero relative isolate touch-pan-y"
    >
      <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6 pb-12 pt-24 md:px-10">
        <p className="pixel-kicker pixel-enter">{hero.role}</p>

        <div className="mt-6 grid gap-10 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end lg:gap-14">
          <div>
            <h1 id="hero-title">
              <span className="sr-only">{hero.name}</span>
              <HeroMatrix name={hero.name} />
            </h1>
            <p aria-hidden className="hero-hint pixel-enter pixel-enter-d2 mt-4 font-mono text-lg text-muted-foreground">
              <span className="hero-hint__fine">{hero.hint}</span>
              <span className="hero-hint__coarse">{hero.hintTouch}</span>
            </p>
          </div>

          <div className="pixel-enter pixel-enter-d2 lg:pb-10">
            <p className="text-lg leading-relaxed text-foreground md:text-xl">
              {hero.lead}
            </p>
            <dl className="mt-8 border-t-2 border-foreground/40">
              {hero.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-foreground/25 py-2.5"
                >
                  <dt className="font-display text-[9px] uppercase leading-6 text-pixel-accent">
                    {fact.label}
                  </dt>
                  <dd className="font-mono text-lg leading-6 text-muted-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <PressStart href="#projetos" label={hero.cta} keyLabel={hero.ctaKey} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
