import { About } from "@/components/About";
import { BootScreen } from "@/components/BootScreen";
import { Contact, SiteFooter } from "@/components/Contact";
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
      <BootScreen copy={copy} />
      <ScrollProgress />
      <RevealObserver />
      <SiteHeader copy={copy} />
      <main className="relative">
        <Hero copy={copy} />
        <About copy={copy} />
        <Projects copy={copy} />
        <Experience copy={copy} />
        <Contact copy={copy} />
      </main>
      <SiteFooter copy={copy} />
    </div>
  );
}
