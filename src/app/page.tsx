import { About } from "@/components/About";
import { ContactLinks } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { RevealObserver } from "@/components/RevealObserver";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteHeader } from "@/components/SiteHeader";
import { pt } from "@/content/pt";

export default function Home() {
  const copy = pt;

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <RevealObserver />
      <SiteHeader copy={copy} />
      <main className="relative">
        <Hero copy={copy} />
        <About copy={copy} />
        <Projects copy={copy} />
        <Experience copy={copy} />
      </main>
      <footer className="border-t-2 border-foreground px-6 py-8 md:px-10">
        <div className="mx-auto max-w-6xl">
          <ContactLinks copy={copy} />
          <div className="mt-8 flex items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="pixel-title text-sm text-foreground">{copy.footer.legal}</p>
            <p className="font-mono text-lg text-pixel-cyan">© {copy.footer.year}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
