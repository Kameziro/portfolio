import { pt } from "@/content/pt";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";

export default function Home() {
  const copy = pt;

  return (
    <div className="atmosphere min-h-screen">
      <SiteHeader copy={copy} />
      <main>
        <Hero copy={copy} />
        <About copy={copy} />
        <Projects copy={copy} />
        <Experience copy={copy} />
        <Contact copy={copy} />
      </main>
      <footer className="border-t border-line px-6 py-10 text-center text-sm text-fg-muted md:px-10">
        <p>{copy.footer.legal}</p>
      </footer>
    </div>
  );
}
