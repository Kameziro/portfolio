import { HeroAmbient } from "@/components/HeroAmbient";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Hero({ copy }: Props) {
  return (
    <section
      id="topo"
      aria-label="Hero"
      className="noise-overlay relative isolate min-h-[100svh]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <HeroAmbient />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col items-center justify-center px-6 text-center md:px-10">
        <p className="pixel-kicker pixel-enter">{copy.hero.role}</p>

        <div className="mt-8 w-full max-w-5xl">
          <h1 className="pixel-title pixel-chroma pixel-enter pixel-enter-d1 text-center text-4xl text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {copy.hero.name}
          </h1>
        </div>

        <p className="pixel-enter pixel-enter-d2 mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
          {copy.hero.lead}
        </p>

        <a href="#projetos" className="pixel-btn pixel-btn-fill pixel-caret hero-cta">
          {copy.hero.cta}
        </a>
      </div>
    </section>
  );
}
