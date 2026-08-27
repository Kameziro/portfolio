## Parent

#1 — Spec: Portfólio v1 — Cleber Neto

## What to build

O Visitante encontra Contato completo: formulário só UI (sem fingir envio de e-mail), LinkedIn, mailto e download do PDF do CV. Suite e2e (Playwright) na seam do documento `/` cobre idioma, seções, Projetos, Contato e links.

## Acceptance criteria

- [ ] Formulário de Contato com campos óbvios; sem mensagem que implique e-mail enviado de verdade
- [ ] Link LinkedIn para https://www.linkedin.com/in/cleber-neto-dev
- [ ] mailto (ou e-mail visível) para cleber.neto2003@gmail.com
- [ ] PDF do CV baixável a partir de asset estático
- [ ] Playwright (ou equivalente) testa `/`: PT default, toggle EN, seções, AOR/MSQualifica, ausência de Cinetopia, Contato e hrefs
- [ ] Testes afirmam comportamento externo do Visitante, não detalhes de implementação

## Blocked by

- #3 — T2: Toggle i18n PT ↔ EN
