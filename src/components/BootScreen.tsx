import type { CSSProperties } from "react";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

// Keep in sync with steps(16) on .boot__pct in globals.css.
const BLOCKS = 16;

const STORAGE_KEY = "pixel-boot";

// Runs while the HTML is parsed: skip the intro on repeat visits in the same
// session or when the Visitante lands on a section anchor.
const SKIP_SCRIPT = `(function(){var b=document.getElementById("boot");if(!b)return;try{if(location.hash||sessionStorage.getItem("${STORAGE_KEY}")){b.setAttribute("data-skip","");return}sessionStorage.setItem("${STORAGE_KEY}","1")}catch(e){}})()`;

/**
 * CRT boot intro (~1.2s), pure CSS so it also plays and ends without JS.
 * Decorative only: hidden from assistive tech and never blocks clicks.
 */
export function BootScreen({ copy }: Props) {
  return (
    <>
      <div id="boot" className="boot" aria-hidden suppressHydrationWarning>
        <div className="boot__screen">
          <p className="font-display text-[10px] uppercase text-pixel-accent sm:text-xs">
            {copy.hero.boot.label}
          </p>
          <p className="pixel-title pixel-chroma mt-4 text-3xl text-foreground sm:text-5xl">
            {copy.hero.name}
          </p>
          <p className="mt-3 font-mono text-lg text-muted-foreground">
            {copy.hero.boot.build}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <div className="boot__bar flex-1">
              {Array.from({ length: BLOCKS }, (_, i) => (
                <span key={i} style={{ "--i": i } as CSSProperties} />
              ))}
            </div>
            <span className="boot__pct font-mono text-xl text-foreground" />
          </div>
          <p className="mt-10 font-mono text-base text-muted-foreground">
            {copy.hero.boot.legal}
          </p>
        </div>
      </div>
      <script
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: SKIP_SCRIPT }}
      />
    </>
  );
}
