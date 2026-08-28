"use client";

/**
 * Hero ambient — slow satin-like mesh (CSS only).
 * Replaces Silk/Three.js; swap for originkit satin-flow when quota resets.
 */
export function HeroAmbient() {
  return (
    <div className="hero-ambient" aria-hidden>
      <div className="hero-ambient__base" />
      <div className="hero-ambient__orb hero-ambient__orb--amber" />
      <div className="hero-ambient__orb hero-ambient__orb--olive" />
      <div className="hero-ambient__orb hero-ambient__orb--warm" />
      <div className="hero-ambient__sheen" />
      <div className="hero-ambient__vignette" />
    </div>
  );
}
