export const pt = {
  meta: {
    title: "Cleber Neto — Engenheiro de Software",
    description:
      "Portfólio de Cleber Neto: engenheiro de software júnior, full stack mobile e web.",
  },
  nav: {
    about: "Sobre",
    projects: "Projetos",
    experience: "Experiência",
    open: "Abrir seções",
    close: "Fechar seções",
  },
  hero: {
    name: "Cleber Neto",
    role: "Engenheiro de Software Júnior · Full Stack Mobile e Web",
    lead: "Produtos mobile e web que funcionam de verdade — offline, em campo e em escala governamental.",
    cta: "Ver projetos",
  },
  about: {
    title: "Sobre",
    fullName: "Cleber Alves de Oliveira Neto",
    body: [
      "Sou engenheiro de software com mais de um ano de experiência em mobile e web, em projetos corporativos e governamentais que alcançam milhares de pessoas.",
      "Trabalho com React Native, Java, Swift e arquiteturas modernas (offline-first, MVC/MVVM). Sou bilíngue — português nativo e inglês avançado — e gosto de times ágeis com entregas incrementais.",
    ],
  },
  projects: {
    title: "Projetos",
    items: [
      {
        name: "AOR",
        line: "Offline-first",
        summary:
          "App em React Native com arquitetura offline-first para entrevistas de agentes de orientação rural em áreas remotas.",
        stack: "React Native · JavaScript · Offline-first",
        logo: "/projects/aor.png",
        logoAlt: "Logo AOR",
      },
      {
        name: "MSQualifica",
        line: "Mercado de trabalho",
        summary:
          "Sistema web para o Governo do Mato Grosso do Sul, conectando cidadãos a oportunidades no mercado de trabalho.",
        stack: "Next.js · Node.js · Java · Quarkus · SQL Server",
        logo: "/projects/msqualifica.png",
        logoAlt: "Logo MS Qualifica Digital",
      },
    ],
  },
  experience: {
    title: "Experiência",
    heading: "Trajetória",
    roles: [
      {
        title: "Engenheiro de Software Júnior",
        org: "SENAI — IST Eficiência Operacional",
        period: "jul/2025 — Presente",
        summary:
          "Mobile offline-first (AOR), sistemas web React/Node integrados a backend Java, e suporte a apps Flutter/Java em time Scrum.",
      },
      {
        title: "Estagiário de Desenvolvimento de Software",
        org: "SENAI — IST Eficiência Operacional",
        period: "mar/2025 — jun/2025",
        summary:
          "MSQualifica (Next.js/Node/Java Quarkus), APIs REST com SQL Server e apps React Native com Expo.",
      },
    ],
    education: {
      title: "Formação",
      items: [
        {
          title: "Bacharelado em Ciências da Computação",
          org: "UNIDERP — Anhanguera",
          period: "2021 — 2025",
        },
        {
          title: "Formação Completa de Swift · Flutter · Java/Spring · Quarkus",
          org: "Alura e cursos online",
          period: "2024",
        },
      ],
    },
  },
  contact: {
    email: "cleber.neto2003@gmail.com",
    emailLabel: "E-mail",
    linkedin: "https://www.linkedin.com/in/cleber-neto-dev/",
    linkedinLabel: "LinkedIn",
    pdfHref: "/curriculo-cleber-neto.pdf",
    pdfLabel: "Baixar CV (PDF)",
  },
  footer: {
    legal: "Cleber Alves de Oliveira Neto",
    year: "2026",
  },
} as const;

export type PortfolioCopy = typeof pt;
