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
- No secrets required for local Portfólio v1 (Contato form is UI-only)
