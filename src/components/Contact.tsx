import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function ContactLinks({ copy }: Props) {
  return (
    <ul className="pixel-frame list-none space-y-0 bg-card p-0">
      <li className="border-b-2 border-foreground/40">
        <a
          href={`mailto:${copy.contact.email}`}
          className="pixel-link flex items-center justify-between px-4 py-4 text-foreground"
        >
          <span className="font-display text-[8px] uppercase">
            {copy.contact.emailLabel}
          </span>
          <span className="font-mono text-base text-muted-foreground">
            {copy.contact.email}
          </span>
        </a>
      </li>
      <li className="border-b-2 border-foreground/40">
        <a
          href={copy.contact.linkedin}
          target="_blank"
          rel="noreferrer"
          className="pixel-link flex items-center justify-between px-4 py-4 text-foreground"
        >
          <span className="font-display text-[8px] uppercase">
            {copy.contact.linkedinLabel}
          </span>
          <span className="font-display text-[8px] text-pixel-cyan" aria-hidden>
            {">"}
          </span>
        </a>
      </li>
      <li>
        <a
          href={copy.contact.pdfHref}
          download
          className="pixel-link flex items-center justify-between px-4 py-4 text-foreground"
        >
          <span className="font-display text-[8px] uppercase">
            {copy.contact.pdfLabel}
          </span>
          <span className="font-display text-[8px] text-pixel-cyan" aria-hidden>
            v
          </span>
        </a>
      </li>
    </ul>
  );
}
