"use client";

import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SiteHeader } from "@/components/SiteHeader";
import { pt } from "@/content/pt";

export default function Home() {
  const copy = pt;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SiteHeader copy={copy} />
      <main className="relative">
        <Hero copy={copy} />
        <About copy={copy} />
        <Projects copy={copy} />
        <Experience copy={copy} />
        <Contact copy={copy} />
      </main>
      <footer className="border-t border-foreground/15 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-display text-foreground">{copy.footer.legal}</p>
          <p className="font-mono text-[0.65rem]">© {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}
