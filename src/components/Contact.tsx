"use client";

import { useState, type FormEvent } from "react";
import { FileText, Mail } from "lucide-react";
import FadeContent from "@/components/FadeContent";
import Magnet from "@/components/Magnet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
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
      className="mx-auto max-w-5xl border-t border-border px-6 py-24 md:px-10 md:py-28"
    >
      <FadeContent duration={850}>
        <p className="text-sm uppercase tracking-[0.2em] text-primary">{copy.contact.title}</p>
        <h2
          id="contato-title"
          className="mt-4 max-w-xl font-display text-3xl tracking-tight text-foreground md:text-4xl"
        >
          {copy.contact.lead}
        </h2>

        <div className="mt-8 flex flex-wrap gap-2">
          <a
            href={`mailto:${copy.contact.email}`}
            className={cn(buttonVariants({ variant: "link" }), "px-0 text-foreground")}
          >
            <Mail />
            {copy.contact.email}
          </a>
          <a
            href={copy.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "link" }), "px-0 text-foreground")}
          >
            {copy.contact.linkedinLabel}
          </a>
          <a
            href={copy.contact.pdfHref}
            download
            className={cn(buttonVariants({ variant: "link" }), "px-0 text-foreground")}
          >
            <FileText />
            {copy.contact.pdfLabel}
          </a>
        </div>
      </FadeContent>

      <FadeContent duration={900} delay={80} className="mt-12 max-w-xl">
        <p className="mb-6 text-sm text-muted-foreground">{copy.contact.form.note}</p>
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="name">{copy.contact.form.name}</Label>
            <Input id="name" name="name" autoComplete="name" className="h-11 rounded-sm" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{copy.contact.form.email}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="h-11 rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{copy.contact.form.message}</Label>
            <Textarea id="message" name="message" rows={4} className="rounded-sm" />
          </div>
          <Magnet padding={36} magnetStrength={2.5}>
            <Button type="submit" variant="outline" size="lg" className="rounded-sm px-5">
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
    </section>
  );
}
