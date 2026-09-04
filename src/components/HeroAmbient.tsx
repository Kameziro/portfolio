/**
 * Hero ambient — CRT starfield + dither, no blur orbs.
 */
export function HeroAmbient() {
  return (
    <div className="hero-ambient" aria-hidden>
      <div className="hero-ambient__stars" />
      <div className="hero-ambient__dither" />
      <div className="hero-ambient__scan" />
      <div className="hero-ambient__vignette" />
    </div>
  );
}
