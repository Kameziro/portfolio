# portfolio

## Agent skills

### Issue tracker

Issues live in this repo's GitHub Issues (`gh` when available, or the GitHub website). See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Cursor Cloud specific instructions

- Install: `npm ci`
- Dev server: `npm run dev -- --hostname 0.0.0.0 --port 3000` (also configured in `.cursor/environment.json` terminals)
- Production smoke against a running server: `npm run build && npm run start`, then `npm run smoke`
- App URL: `http://localhost:3000`
- Portfólio v1 runs without secrets (Contato form is UI-only)
- Optional secret `ORIGINKIT_API_KEY`: needed only to fetch/add Origin Kit components via `npx originkit@latest add <name>` (UI weekly quota + section daily quota apply). Not required to build or run the site.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
