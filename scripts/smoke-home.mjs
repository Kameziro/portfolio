#!/usr/bin/env node
/**
 * Smoke test at the Portfólio document seam (`/`).
 * Expects a running server (default http://localhost:3000).
 */
const base = process.env.PORTFOLIO_URL || "http://localhost:3000";

async function main() {
  const res = await fetch(base);
  if (!res.ok) {
    throw new Error(`GET / failed: ${res.status}`);
  }
  const html = await res.text();

  const mustInclude = [
    "Cleber Neto",
    "Cleber Alves de Oliveira Neto",
    "AOR",
    "MSQualifica",
    "Sobre",
    "Projetos",
    "Experiência",
    "curriculo-cleber-neto.pdf",
    "cleber.neto2003@gmail.com",
    "linkedin.com/in/cleber-neto-dev",
  ];
  const mustNotInclude = ["Cinetopia", "Contato"];

  const missing = mustInclude.filter((s) => !html.includes(s));
  const leaked = mustNotInclude.filter((s) => html.includes(s));

  if (missing.length || leaked.length) {
    console.error("Smoke failed");
    if (missing.length) console.error("Missing:", missing);
    if (leaked.length) console.error("Must not include:", leaked);
    process.exit(1);
  }

  // Rough section order check
  const positions = ["topo", "sobre", "projetos", "experiencia"].map(
    (id) => html.indexOf(`id="${id}"`),
  );
  for (let i = 1; i < positions.length; i++) {
    if (positions[i] < 0 || positions[i] < positions[i - 1]) {
      throw new Error(`Section order invalid around index ${i}`);
    }
  }

  console.log("Smoke OK — Portfólio document seam at", base);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
