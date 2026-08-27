# i18n via toggle global (não rotas por idioma)

O Portfólio é bilíngue (Idioma principal: Português; Idioma secundário: Inglês). Decidimos expor a troca por **toggle global de i18n** (mesmo URL, dicionários/mensagens no cliente/servidor), em vez de rotas separadas (`/en`, …).

**Por quê:** one-page com pouco conteúdo e um único fluxo de scroll; rotas por idioma duplicariam superfície sem ganho claro para o Visitante na v1. Toggle mantém bookmark/share simples e encaixa no App Router com bibliotecas tipo `next-intl` (ou dicionários manuais).

**Alternativa rejeitada:** locales em path (`/` vs `/en`) — melhor para SEO multi-página e deep links por idioma; vale revisitar se o Portfólio ganhar muitas rotas ou blog.

**Status:** accepted
