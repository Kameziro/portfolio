## Parent

#1 — Spec: Portfólio v1 — Cleber Neto

## What to build

O Visitante troca Idioma principal (Português) ↔ Idioma secundário (Inglês) com um toggle global na mesma URL (ADR 0001 — sem rotas `/en`). Toda a copy visível da one-page atualiza; voltar para PT restaura o Idioma principal.

## Acceptance criteria

- [ ] Default load em Português
- [ ] Toggle para Inglês atualiza hero, about, Projetos, Experiência, Contato e chrome
- [ ] Toggle de volta para Português restaura o conteúdo PT
- [ ] Sem locale em path (`/en` não é o mecanismo)
- [ ] Respeita `docs/adr/0001-i18n-toggle-global.md`

## Blocked by

- #2 — T1: Scaffold + Portfólio one-page em PT
