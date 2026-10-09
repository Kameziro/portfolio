"use client";

import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import { buildMatrix } from "@/lib/pixel-matrix";

type Props = { name: string };

// Physics, in cell units unless noted. Tuned so pixels feel springy, not floaty.
const SPRING = 0.14;
const DAMPING = 0.76;
const PUSH = 1.8;
const REACH_CELLS = 3.6;
const REACH_MIN_PX = 52;
const HEAT_DECAY = 0.93;
const RIPPLE_SPEED = 26;
const RIPPLE_LIFE = 1.1;
const RIPPLE_BAND = 1.3;
const RIPPLE_KICK = 0.9;
const REVEAL_SWEEP = 520;
const REVEAL_JITTER = 180;
const REVEAL_FLASH = 260;
const BLINK_MS = 525;
// Keep in sync with the boot hold on .pixel-enter in globals.css.
const BOOT_HOLD = 1150;
const DOT = 0.82;

type Rgb = [number, number, number];

function readColor(styles: CSSStyleDeclaration, name: string): Rgb {
  const hex = styles.getPropertyValue(name).trim().replace("#", "");
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, "$&$&") : hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function mix(a: Rgb, b: Rgb, t: number) {
  const k = Math.min(1, Math.max(0, t));
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",")})`;
}

/**
 * The hero name as a Game Boy LCD: every glyph pixel is a cell the Visitante
 * can push around with the cursor (or finger) and knock with a click ripple.
 * The server renders a static SVG of the same matrix; the canvas takes over
 * once it has painted. Decorative: the accessible name lives in the <h1>.
 */
export function HeroMatrix({ name }: Props) {
  const matrix = useMemo(() => buildMatrix(name), [name]);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const { cols, rows } = matrix;
    const total = cols * rows;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 0 = ghost, 1 = lit, -1 = cursor (lit only while blinking on).
    const kind = new Int8Array(total);
    const word = new Int8Array(total);
    const revealAt = new Float32Array(total);
    const ox = new Float32Array(total);
    const oy = new Float32Array(total);
    const vx = new Float32Array(total);
    const vy = new Float32Array(total);
    const heat = new Float32Array(total);

    for (const c of matrix.lit) {
      const i = c.y * cols + c.x;
      kind[i] = 1;
      word[i] = c.word;
    }
    for (const c of matrix.cursor) {
      const i = c.y * cols + c.x;
      kind[i] = -1;
      word[i] = c.word;
    }

    const boot = document.getElementById("boot");
    const booting = boot && !boot.hasAttribute("data-skip");
    const start = performance.now() + (booting ? BOOT_HOLD : 0);
    for (let i = 0; i < total; i++) {
      revealAt[i] = reduce
        ? 0
        : start + ((i % cols) / cols) * REVEAL_SWEEP + Math.random() * REVEAL_JITTER;
    }
    const revealEnd = start + REVEAL_SWEEP + REVEAL_JITTER + REVEAL_FLASH;

    const styles = getComputedStyle(document.documentElement);
    const ink = readColor(styles, "--foreground");
    const inkAlt = readColor(styles, "--pixel-accent");
    const hot = readColor(styles, "--pixel-cta");
    const hotAlt = readColor(styles, "--pixel-highlight");
    const ghost = `rgb(${ink.join(",")})`;

    let cell = 0;
    let dpr = 1;
    let frame = 0;
    let blinkOn = true;
    let visible = true;
    const pointer = { x: 0, y: 0, active: false };
    const ripples: { x: number; y: number; t: number }[] = [];

    function step(now: number) {
      const reach = Math.max(REACH_CELLS, REACH_MIN_PX / cell);
      let moving = false;

      for (let i = 0; i < total; i++) {
        const cx = (i % cols) + 0.5;
        const cy = Math.floor(i / cols) + 0.5;
        const isLit = kind[i] !== 0;
        let tx = 0;
        let ty = 0;

        if (pointer.active) {
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d < reach) {
            const f = (1 - d / reach) ** 2;
            heat[i] = Math.max(heat[i], f);
            if (isLit) {
              tx = (dx / d) * f * PUSH;
              ty = (dy / d) * f * PUSH;
            }
          }
        }

        for (const r of ripples) {
          const age = (now - r.t) / 1000;
          const dx = cx - r.x;
          const dy = cy - r.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          const band = Math.abs(d - age * RIPPLE_SPEED);
          if (band < RIPPLE_BAND) {
            const f = (1 - band / RIPPLE_BAND) * (1 - age / RIPPLE_LIFE);
            heat[i] = Math.max(heat[i], f * 0.8);
            if (isLit) {
              vx[i] += (dx / d) * f * RIPPLE_KICK;
              vy[i] += (dy / d) * f * RIPPLE_KICK;
            }
          }
        }

        vx[i] = (vx[i] + (tx - ox[i]) * SPRING) * DAMPING;
        vy[i] = (vy[i] + (ty - oy[i]) * SPRING) * DAMPING;
        ox[i] += vx[i];
        oy[i] += vy[i];
        heat[i] *= HEAT_DECAY;

        if (
          Math.abs(vx[i]) + Math.abs(vy[i]) > 0.002 ||
          Math.abs(ox[i]) + Math.abs(oy[i]) > 0.002 ||
          heat[i] > 0.01
        ) {
          moving = true;
        }
      }

      for (let r = ripples.length - 1; r >= 0; r--) {
        if ((now - ripples[r].t) / 1000 > RIPPLE_LIFE) ripples.splice(r, 1);
      }

      return moving || pointer.active || ripples.length > 0 || now < revealEnd;
    }

    function draw(now: number) {
      const size = cell * DOT;
      const inset = (cell - size) / 2;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, cols * cell, rows * cell);

      for (let i = 0; i < total; i++) {
        const x = ((i % cols) + ox[i]) * cell + inset;
        const y = (Math.floor(i / cols) + oy[i]) * cell + inset;
        const on =
          now >= revealAt[i] && (kind[i] > 0 || (kind[i] === -1 && blinkOn));

        if (!on) {
          ctx!.globalAlpha = 0.07 + heat[i] * 0.3;
          ctx!.fillStyle = ghost;
        } else {
          const flash = 1 - (now - revealAt[i]) / REVEAL_FLASH;
          const alt = word[i] > 0;
          ctx!.globalAlpha = 1;
          ctx!.fillStyle = mix(
            alt ? inkAlt : ink,
            alt ? hotAlt : hot,
            Math.max(heat[i] * 1.4, flash),
          );
        }
        ctx!.fillRect(x, y, size, size);
      }
      ctx!.globalAlpha = 1;
    }

    function tick(now: number) {
      frame = 0;
      const keepGoing = reduce ? false : step(now);
      draw(now);
      if (keepGoing && visible) frame = requestAnimationFrame(tick);
    }

    function wake() {
      if (!frame) frame = requestAnimationFrame(tick);
    }

    function resize() {
      const width = wrap!.clientWidth;
      if (!width) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = width / cols;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(cell * rows * dpr);
      draw(performance.now());
      wrap!.setAttribute("data-ready", "");
      wake();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(wrap);

    const blink = window.setInterval(() => {
      if (!visible || reduce) return;
      blinkOn = !blinkOn;
      wake();
    }, BLINK_MS);

    if (reduce) {
      return () => {
        ro.disconnect();
        io.disconnect();
        window.clearInterval(blink);
      };
    }

    const zone = wrap.closest("section") ?? wrap;

    const toCells = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) / cell,
        y: (event.clientY - rect.top) / cell,
      };
    };

    const onMove = (event: PointerEvent) => {
      const p = toCells(event);
      pointer.x = p.x;
      pointer.y = p.y;
      pointer.active = true;
      wake();
    };

    const onLeave = () => {
      pointer.active = false;
    };

    const onDown = (event: PointerEvent) => {
      if ((event.target as Element).closest("a, button")) return;
      const p = toCells(event);
      ripples.push({ ...p, t: performance.now() });
      onMove(event);
    };

    zone.addEventListener("pointermove", onMove as EventListener);
    zone.addEventListener("pointerdown", onDown as EventListener);
    zone.addEventListener("pointerleave", onLeave);
    zone.addEventListener("pointercancel", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      window.clearInterval(blink);
      zone.removeEventListener("pointermove", onMove as EventListener);
      zone.removeEventListener("pointerdown", onDown as EventListener);
      zone.removeEventListener("pointerleave", onLeave);
      zone.removeEventListener("pointercancel", onLeave);
    };
  }, [matrix]);

  const { cols, rows } = matrix;

  return (
    <span
      ref={wrapRef}
      aria-hidden
      className="hero-matrix"
      style={{ aspectRatio: `${cols} / ${rows}`, "--cols": cols, "--rows": rows } as CSSProperties}
    >
      <svg
        className="hero-matrix__fallback"
        viewBox={`0 0 ${cols} ${rows}`}
        shapeRendering="crispEdges"
      >
        <defs>
          <pattern id="hero-ghost" width="1" height="1" patternUnits="userSpaceOnUse">
            <rect x={(1 - DOT) / 2} y={(1 - DOT) / 2} width={DOT} height={DOT} />
          </pattern>
        </defs>
        <rect width={cols} height={rows} fill="url(#hero-ghost)" className="hero-matrix__ghost" />
        {matrix.lit.map((c) => (
          <rect
            key={`${c.x}-${c.y}`}
            x={c.x + (1 - DOT) / 2}
            y={c.y + (1 - DOT) / 2}
            width={DOT}
            height={DOT}
            className={c.word > 0 ? "hero-matrix__alt" : "hero-matrix__ink"}
          />
        ))}
        <g className="hero-matrix__cursor">
          {matrix.cursor.map((c) => (
            <rect
              key={`${c.x}-${c.y}`}
              x={c.x + (1 - DOT) / 2}
              y={c.y + (1 - DOT) / 2}
              width={DOT}
              height={DOT}
            />
          ))}
        </g>
      </svg>
      <canvas ref={canvasRef} className="hero-matrix__canvas" />
    </span>
  );
}
