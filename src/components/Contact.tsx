import { CopyEmailButton } from "@/components/CopyEmailButton";
import { PixelArrow } from "@/components/PixelArrow";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Contact({ copy }: Props) {
  const { contact } = copy;

  return (
    <section
      aria-labelledby="fale-title"
      className="contact-hatch border-t-2 border-foreground"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
        <div id="fale" className="pixel-anchor pixel-reveal">
          <span className="pixel-rule mb-8 block" aria-hidden />
          <p className="pixel-kicker">{contact.kicker}</p>
          <h2
            id="fale-title"
            className="pixel-title mt-5 max-w-3xl text-3xl text-foreground md:text-5xl"
          >
            {contact.headline}
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="pixel-link contact-email mt-6 block font-mono text-pixel-accent"
          >
            {contact.email}
          </a>
        </div>

        <div className="pixel-reveal mt-12 flex flex-wrap items-center gap-4">
          <CopyEmailButton
            email={contact.email}
            label={contact.copyLabel}
            copiedLabel={contact.copiedLabel}
          />
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn"
          >
            {contact.linkedinLabel}
            <PixelArrow dir="up-right" className="ml-3 inline-block align-[-1px] text-sm" />
          </a>
          <a
            href={contact.pdfHref}
            download
            className="pixel-btn"
          >
            {contact.pdfLabel}
            <PixelArrow dir="down" className="ml-3 inline-block align-[-1px] text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ copy }: Props) {
  return (
    <footer className="border-t-2 border-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y-2 divide-foreground/40 border-x-2 border-foreground/40 sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0">
        <p className="pixel-title px-6 py-5 text-sm text-foreground">
          {copy.footer.legal}
        </p>
        <p className="px-6 py-5 font-mono text-lg text-pixel-accent sm:text-center">
          © {copy.footer.year}
        </p>
        <a
          href="#topo"
          className="pixel-link inline-flex items-center gap-3 px-6 py-5 font-display text-[10px] uppercase text-foreground sm:justify-end"
        >
          {copy.footer.backToTop}
          <PixelArrow dir="down" className="rotate-180 text-xs text-pixel-accent" />
        </a>
      </div>
    </footer>
  );
}
