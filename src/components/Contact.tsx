"use client";

import { useState, type FormEvent } from "react";
import FadeContent from "@/components/FadeContent";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

/**
 * Mobbin → Studio Freight Inquire
 * https://mobbin.com/sites/sections/4496ab63-aada-4e07-933b-c32a13e535b5
 * Black canvas, white serif, underline fields, text Submit, Links column.
 */
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
      className="mx-auto max-w-6xl border-t border-foreground/15 px-6 py-28 md:px-10 md:py-36"
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
        <FadeContent duration={850}>
          <h2 id="contato-title" className="sf-label text-lg">
            {copy.contact.title}
          </h2>
          <p className="mt-4 max-w-sm font-display text-xl leading-snug text-foreground md:text-2xl">
            {copy.contact.lead}
          </p>

          <form onSubmit={onSubmit} className="mt-12 space-y-0" noValidate>
            <p className="mb-8 text-sm text-muted-foreground">{copy.contact.form.note}</p>

            <label className="block border-b border-foreground/40 py-3">
              <span className="sf-label">{copy.contact.form.name}*</span>
              <input
                name="name"
                autoComplete="name"
                className="sf-field mt-1 border-0"
                aria-label={copy.contact.form.name}
              />
            </label>
            <label className="block border-b border-foreground/40 py-3">
              <span className="sf-label">{copy.contact.form.email}*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                className="sf-field mt-1 border-0"
                aria-label={copy.contact.form.email}
              />
            </label>
            <label className="block border-b border-foreground/40 py-3">
              <span className="sf-label">{copy.contact.form.message}*</span>
              <textarea
                name="message"
                rows={3}
                className="sf-field mt-1 min-h-24 resize-y border-0"
                aria-label={copy.contact.form.message}
              />
            </label>

            <button
              type="submit"
              className="mt-8 font-display text-base text-foreground underline-offset-4 transition-opacity hover:underline"
            >
              {copy.contact.form.submit}
            </button>

            {submitted ? (
              <p className="mt-4 font-display text-sm text-muted-foreground" role="status">
                Formulário só UI — use e-mail ou LinkedIn.
              </p>
            ) : null}
          </form>
        </FadeContent>

        <FadeContent duration={900} delay={80}>
          <h3 className="sf-label text-lg">Links</h3>
          <ul className="mt-8 list-none space-y-0 border-t border-foreground/25 p-0">
            <li className="border-b border-foreground/25">
              <a
                href={`mailto:${copy.contact.email}`}
                className="flex items-center justify-between py-4 font-display text-base text-foreground transition-opacity hover:opacity-70"
              >
                <span>E-mail</span>
                <span className="text-sm text-muted-foreground">{copy.contact.email}</span>
              </a>
            </li>
            <li className="border-b border-foreground/25">
              <a
                href={copy.contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between py-4 font-display text-base text-foreground transition-opacity hover:opacity-70"
              >
                <span>{copy.contact.linkedinLabel}</span>
                <span aria-hidden>↗</span>
              </a>
            </li>
            <li className="border-b border-foreground/25">
              <a
                href={copy.contact.pdfHref}
                download
                className="flex items-center justify-between py-4 font-display text-base text-foreground transition-opacity hover:opacity-70"
              >
                <span>{copy.contact.pdfLabel}</span>
                <span aria-hidden>↓</span>
              </a>
            </li>
          </ul>
        </FadeContent>
      </div>
    </section>
  );
}
