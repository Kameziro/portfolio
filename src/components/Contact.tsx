"use client";

import { useState, type FormEvent } from "react";
import FadeContent from "@/components/FadeContent";
import Magnet from "@/components/Magnet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { PortfolioCopy } from "@/content/pt";

type Props = { copy: PortfolioCopy };

const underlineField =
  "h-12 rounded-none !border-0 !border-b-2 !border-foreground/55 bg-transparent !px-0 shadow-none outline-none !ring-0 focus-visible:!border-primary focus-visible:!ring-0 dark:!bg-transparent dark:focus-visible:!ring-0";

export function Contact({ copy }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const softLinks = [
    { href: `mailto:${copy.contact.email}`, label: copy.contact.email, external: false },
    {
      href: copy.contact.linkedin,
      label: copy.contact.linkedinLabel,
      external: true,
    },
    {
      href: copy.contact.pdfHref,
      label: copy.contact.pdfLabel,
      external: false,
      download: true,
    },
  ];

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="mx-auto max-w-6xl border-t border-border px-6 py-28 md:px-10 md:py-36"
    >
      <div className="grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-20">
        <FadeContent duration={850}>
          <p className="text-[0.7rem] uppercase tracking-[0.24em] text-primary">
            {copy.contact.title}
          </p>
          <h2
            id="contato-title"
            className="mt-5 max-w-md font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl"
          >
            {copy.contact.lead}
          </h2>

          <dl className="mt-12 space-y-0 border-t border-border">
            {softLinks.map((link) => (
              <div
                key={link.href}
                className="flex items-baseline justify-between gap-6 border-b border-border py-5"
              >
                <dt className="text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  {link.download
                    ? "CV"
                    : link.href.startsWith("mailto:")
                      ? "E-mail"
                      : "Social"}
                </dt>
                <dd className="text-right">
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    {...(link.download ? { download: true } : {})}
                    className="text-sm text-foreground transition-colors hover:text-primary md:text-base"
                  >
                    {link.label}
                    <span aria-hidden className="ml-1 inline-block text-muted-foreground">
                      ↗
                    </span>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </FadeContent>

        <FadeContent duration={900} delay={80}>
          <p className="mb-8 text-sm text-muted-foreground">{copy.contact.form.note}</p>
          <form onSubmit={onSubmit} className="space-y-8" noValidate>
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="font-display text-base font-normal text-foreground"
              >
                {copy.contact.form.name}
              </Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                className={cn(underlineField)}
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="font-display text-base font-normal text-foreground"
              >
                {copy.contact.form.email}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className={cn(underlineField)}
              />
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="message"
                className="font-display text-base font-normal text-foreground"
              >
                {copy.contact.form.message}
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                className={cn(
                  underlineField,
                  "min-h-28 resize-y py-3 focus-visible:ring-0",
                )}
              />
            </div>
            <Magnet padding={36} magnetStrength={2.5}>
              <Button
                type="submit"
                size="lg"
                className="rounded-none px-8 text-[0.8rem] uppercase tracking-[0.14em]"
              >
                {copy.contact.form.submit}
              </Button>
            </Magnet>
            {submitted ? (
              <p className="text-sm text-muted-foreground" role="status">
                Formulário só UI por enquanto — use e-mail ou LinkedIn para falar comigo.
              </p>
            ) : null}
          </form>
        </FadeContent>
      </div>
    </section>
  );
}
