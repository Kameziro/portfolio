import { HeroAmbient } from "@/components/HeroAmbient";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Hero({ copy }: Props) {
  const [first, ...rest] = copy.hero.name.split(" ");

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
          <h1 className="text-center text-foreground">
            <span className="pixel-title pixel-chroma pixel-enter pixel-enter-d1 block text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              {first}
            </span>{" "}
            <span className="hero-name-alt pixel-enter pixel-enter-d2 block text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem]">
              {rest.join(" ")}
            </span>
          </h1>
        </div>

        <p className="pixel-enter pixel-enter-d2 mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
          {copy.hero.lead}
        </p>

        <a href="#projetos" className="pixel-btn pixel-btn-fill pixel-caret hero-cta">
          {copy.hero.cta}
        </a>
      </div>
    </section>
  );
}
