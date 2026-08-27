"use client";

import ClickSpark from "@/components/ClickSpark";
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
    <ClickSpark sparkColor="#d4a017" sparkCount={10} sparkRadius={18} duration={450}>
      <div className="relative min-h-screen bg-background">
        <SiteHeader copy={copy} />
        <main className="relative">
          <Hero copy={copy} />
          <About copy={copy} />
          <Projects copy={copy} />
          <Experience copy={copy} />
          <Contact copy={copy} />
        </main>
        <footer className="border-t border-border px-6 py-10 text-center text-sm text-muted-foreground md:px-10">
          <p>{copy.footer.legal}</p>
        </footer>
      </div>
    </ClickSpark>
  );
}
