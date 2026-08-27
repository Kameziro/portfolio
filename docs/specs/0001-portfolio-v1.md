# Spec: Portfólio v1 — Cleber Neto

## Problem Statement

Cleber Neto precisa de um Portfólio na web que apresente quem ele é — engenheiro de software júnior, full stack mobile e web — de forma memorável e bilíngue. Hoje o material existe sobretudo como PDF de currículo; recrutadores e hiring managers (Brasil e mercado internacional) não têm um lugar vivo, editorial e escaneável para entender trajetória, Projetos e Contato sem depender só do LinkedIn ou do PDF.

## Solution

Um Portfólio one-page em Next.js (App Router), visual editorial escuro, Idioma principal Português e Idioma secundário Inglês via toggle global. O Visitante encontra Hero (marca Cleber Neto), About em 1ª pessoa, Projetos breves (AOR e MSQualifica), Experiência condensada, e Contato suave (formulário só UI na v1, LinkedIn, e-mail, download do PDF). Sem foto: tipografia e atmosfera. Motion sutil. O trabalho do site é compreensão da marca pessoal, não conversão agressiva.

## User Stories

1. As a Visitante, I want the Portfólio to load in Português by default, so that the Idioma principal matches Cleber’s primary audience.
2. As a Visitante, I want a clear language toggle, so that I can switch the whole page between Português and Inglês without changing the URL path.
3. As a Visitante, I want my language choice to update all visible copy (hero, about, Projetos, Experiência, Contato, chrome), so that I am not left in a mixed-language page.
4. As a Visitante, I want to switch back to Português after viewing Inglês, so that the toggle is reversible in the same session.
5. As a Visitante, I want to land on a single scrolling page, so that I can understand Cleber without hunting through multiple routes.
6. As a Visitante, I want the first viewport to lead with the brand name Cleber Neto, so that identity is the hero-level signal.
7. As a Visitante, I want a short supporting line under the name (role / positioning), so that I immediately know what Cleber does.
8. As a Visitante, I want the hero to feel editorial and dark (strong type, atmosphere, no stock portrait), so that the Portfólio feels crafted rather than template-like.
9. As a Visitante, I want subtle motion only, so that the page feels alive without slowing a quick recruiter scan.
10. As a Visitante, I want an About section in first person, so that I hear Cleber’s voice and story.
11. As a Visitante, I want the full legal name available in About (and footer), so that formal identity is clear even though the hero uses Cleber Neto.
12. As a Visitante, I want About to reflect bilingual capability and junior full-stack mobile/web focus, so that positioning matches the CV.
13. As a Visitante, I want a Projetos section after About, so that proof follows identity.
14. As a Visitante, I want the AOR Projeto as a short block (title, 1–2 sentences, stack), so that I grasp the offline-first React Native work quickly.
15. As a Visitante, I want the MSQualifica Projeto as a short block (title, 1–2 sentences, stack), so that I grasp the Next.js / Node / Java (Quarkus) government-facing work quickly.
16. As a Visitante, I do not want Cinetopia in v1 Projetos, so that the first release stays focused on professional work.
17. As a Visitante, I do not want long case-study pages in v1, so that depth does not block shipping the one-page story.
18. As a Visitante, I want an Experiência section with condensed roles (title, period, 1–2 lines each), so that I can scan career history without reading the full PDF on-page.
19. As a Visitante, I want condensed education / courses in Experiência, so that formation is visible without dumping every certificate line-for-line.
20. As a Visitante, I want Experiência tone to stay curricular/neutral (not first-person narrative), so that it reads like a CV section.
21. As a Visitante, I want a Contato section at the end, so that I know how to reach Cleber after understanding him.
22. As a Visitante, I want a simple contact form UI (name, email, message or equivalent), so that the Contato path is obvious.
23. As a Visitante, I want the form in v1 to not claim real delivery (no fake “sent!” that implies email backend), so that I am not misled.
24. As a Visitante, I want a LinkedIn link in Contato, so that I can continue on Cleber’s professional profile.
25. As a Visitante, I want a mailto (or visible email) to cleber.neto2003@gmail.com, so that I can write directly.
26. As a Visitante, I want to download the CV PDF, so that I can keep or forward the full curriculum.
27. As a Visitante, I want section order Hero → About → Projetos → Experiência → Contato, so that the narrative matches the agreed information architecture.
28. As a Visitante on mobile, I want the one-page layout to remain readable and usable, so that I can review Cleber on a phone.
29. As a Visitante, I want accessible language controls and links (keyboard / semantics), so that Contato and i18n are usable without a pointer-only UI.
30. As Cleber, I want content sourced from the agreed CV facts, so that the Portfólio stays truthful to experience at SENAI and listed skills.
31. As Cleber, I want the site’s job to remain “understand who I am,” so that copy and Contato stay soft rather than “hire me now” hard-sell.
32. As a future agent/developer, I want tests at the Portfólio document seam (`/`), so that regressions in language, sections, Projetos, and Contato are caught from the Visitante’s point of view.
33. As a future agent/developer, I want ADR 0001 respected (global i18n toggle, not locale path routes), so that implementation does not silently reintroduce `/en` routing.
34. As a Visitante, I want metadata (title/description) that names Cleber Neto / Portfólio appropriately in both languages where practical, so that browser tabs and shares read clearly.
35. As Cleber, I want the stack to be Next.js App Router + TypeScript + Tailwind, so that the greenfield app matches the agreed implementation baseline.

## Implementation Decisions

- Greenfield Next.js App Router application with TypeScript and Tailwind CSS.
- Single route experience: one-page Portfólio at `/` (plus whatever Next needs for assets/static PDF).
- i18n via global toggle with in-memory/message dictionaries (or equivalent such as next-intl without locale-prefixed routes), per ADR 0001; default locale Português.
- Content module(s) holding structured copy for both languages: hero, about, Projetos (AOR, MSQualifica), Experiência entries, Contato labels — no CMS in v1.
- Visual system: dark editorial tokens (background atmosphere, expressive typography via next/font or equivalent, single accent — prefer amber or olive; avoid generic purple glow / AI-template look); no portrait image.
- Motion: subtle enter/hover only (CSS and/or a light motion library); no cinematic scroll takeover.
- Contato form: client UI only; no API route for mail in v1; do not imply successful email send.
- Soft Contato affordances: LinkedIn (`https://www.linkedin.com/in/cleber-neto-dev`), email, PDF under `public/` (curriculum file from the provided CV).
- PDF: ship the CV file as a static downloadable asset; keep filename stable for the download link.
- Testing seam: end-to-end against the running app’s `/` document (e.g. Playwright); one primary seam, no extra unit seams required for v1 i18n or form.
- Domain vocabulary from `CONTEXT.md` used in copy keys and spec/tickets language (Portfólio, Visitante, Cleber Neto, Projeto, Experiência, Contato, Idioma principal/secundário).
- Environment/dev: standard `npm`/`pnpm` Next scripts; later Cloud Agent `install`/`terminals` can wrap install + `next dev` once the app exists.

## Testing Decisions

- Good tests assert external behavior visible to the Visitante (rendered text, presence of sections, toggle effect, links, form fields), not internal React state or file structure.
- Primary module under test: the Portfólio page document at `/`.
- Cover at least: default PT content; toggle to EN updates chrome + main sections; section order/landmarks; AOR and MSQualifica blocks present; Cinetopia absent; Contato form fields present without network mail assertion; LinkedIn, mailto, and PDF link hrefs; no portrait/avatar image required for pass.
- Prior art: none in-repo (greenfield); introduce a minimal e2e setup alongside the app rather than a separate test-only package.
- Prefer fewer, slower e2e checks over a large shallow component suite for v1.

## Out of Scope

- Cinetopia as a Projeto
- Long case-study routes or multi-page project details
- Real email/backend delivery for Contato (Resend, Formspree, etc.)
- Portrait/photo assets
- Locale-prefixed routing (`/en`, …)
- CMS, blog, auth, analytics product suite
- Aggressive conversion CTAs (“Hire me” primary buttons as the page job)
- Full PDF text mirrored 1:1 as the Experiência section
- Mobile app / React Native shell of this Portfólio

## Further Notes

- Source of truth for biographical facts: `curriculo-cleber-alves-de-oliveira-neto.pdf` (uploaded) + grilling decisions in this thread; glossary in `CONTEXT.md`; i18n shape in `docs/adr/0001-i18n-toggle-global.md`.
- Design references: Mobbin (authenticated on the user’s Cursor) for portfolio patterns during implementation/prototype; Lazyweb MCP was not available in the Cloud Agent session.
- Recommended accent: single warm amber or olive on dark editorial — confirm at implement time if needed.
- Next workflow step after this spec: `/to-tickets` to slice tracer-bullet tickets, then `/implement` per ticket (or `/implement` on the whole spec if treated as one session).
