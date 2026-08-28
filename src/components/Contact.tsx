"use client";

import { useState, type FormEvent } from "react";
import ScrollEmerge from "@/components/originkit/ui/scroll-emerge";
import TextEmerge from "@/components/originkit/ui/text-emerge";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

export function Contact({ copy }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="mx-auto max-w-6xl border-t-2 border-foreground/40 px-6 py-28 md:px-10 md:py-36"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <ScrollEmerge revealLine>
          <h2 id="contato-title" className="sf-label">
            {copy.contact.title}
          </h2>
          <TextEmerge
            text={copy.contact.lead}
            as="p"
            className="pixel-title mt-4 max-w-sm text-xl text-foreground md:text-2xl"
            transition={{ duration: 0.28, staggerChildren: 0.04 }}
          />

          <form onSubmit={onSubmit} className="mt-12 space-y-0" noValidate>
            <p className="mb-8 text-base text-muted-foreground">
              {copy.contact.form.note}
            </p>

            <label className="block border-b-2 border-foreground/40 py-3">
              <span className="sf-label">{copy.contact.form.name}*</span>
              <input
                name="name"
                autoComplete="name"
                className="sf-field mt-1 border-0"
                aria-label={copy.contact.form.name}
              />
            </label>
            <label className="block border-b-2 border-foreground/40 py-3">
              <span className="sf-label">{copy.contact.form.email}*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="sf-field mt-1 border-0"
                aria-label={copy.contact.form.email}
              />
            </label>
            <label className="block border-b-2 border-foreground/40 py-3">
              <span className="sf-label">{copy.contact.form.message}*</span>
              <textarea
                name="message"
                rows={3}
                className="sf-field mt-1 min-h-24 resize-y border-0"
                aria-label={copy.contact.form.message}
              />
            </label>

            <button type="submit" className="pixel-btn mt-8">
              {copy.contact.form.submit}
            </button>

            {submitted ? (
              <p
                className="mt-4 font-display text-[8px] leading-relaxed text-muted-foreground"
                role="status"
              >
                Formulário só UI — use e-mail ou LinkedIn.
              </p>
            ) : null}
          </form>
        </ScrollEmerge>

        <ScrollEmerge delay={0.08} variant="item">
          <h3 className="sf-label">Links</h3>
          <ul className="pixel-frame mt-8 list-none space-y-0 bg-card p-0">
            <li className="border-b-2 border-foreground/40">
              <a
                href={`mailto:${copy.contact.email}`}
                className="pixel-link flex items-center justify-between px-4 py-4 text-foreground"
              >
                <span className="font-display text-[8px] uppercase">E-mail</span>
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
                <span className="font-display text-[8px] text-pixel-gold" aria-hidden>
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
                <span className="font-display text-[8px] text-pixel-gold" aria-hidden>
                  v
                </span>
              </a>
            </li>
          </ul>
        </ScrollEmerge>
      </div>
    </section>
  );
}
