# aliarbab2009.com

Personal portfolio at `aliarbab2009.com`. Six project worlds — StockSaathi, SpendInCheck, BolHisaab, MagLock Protocol, Sovereign Alpha and LameCRAFT — each with its own theme, plus `/lab` for hardware still on paper.

## Stack

- Next.js 15 (App Router, RSC) on React 19
- TypeScript strict
- Tailwind CSS v4 + CSS custom properties for per-project theming
- Sentry (privacy-first config — no replays, query strings scrubbed)
- Resend for the contact form
- Vitest 4 for unit tests
- Native `<dialog>` element for the ⌘K command palette (no Radix/floating-ui dependency)
- View Transitions API for cross-document fades
- Self-hosted fonts (Space Grotesk + JetBrains Mono via `next/font/local`)
- Case studies as typed TSX: three bespoke interactive pages, and a shared `<CaseStudy>` template for the rest
- `next/og` share images per route (fonts are TTF — Satori can't read WOFF2)
- Deployed to Vercel

## Quickstart

```bash
pnpm install
cp .env.example .env.local   # fill in Resend key, etc.
pnpm dev                     # → http://localhost:3000
```

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run built server |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm format` | Apply Prettier across `src` + `scripts` |
| `pnpm format:check` | Read-only Prettier check (CI-enforced) |
| `pnpm test` | Vitest run-once |
| `pnpm test:watch` | Vitest watch mode |
| `pnpm privacy-audit` | Grep built output + public assets for forbidden tokens |

CI runs typecheck → lint → format:check → test → build → privacy-audit on every push and PR. All five gates must pass.

## Architecture

See `CLAUDE.md` for conventions.

Key directories:

- `src/app` — routes (App Router; `(marketing)` route group)
- `src/components/{ui,shell,home,project,about,resume,seo,decoration,icons}` — UI
- `src/lib` — pure utilities (`time.ts` for countdowns, `safe-json.ts` for XSS-escaped JSON-LD, `seo.ts` for metadata, `utils.ts` for `cn()`, etc.)
- `src/config` — typed content (`site`, `projects`, `now`, `lab`, `milestones`, `timeline`, `activities`, `awards`, `resume`, `why-i-built`)
- `scripts/privacy-audit.mjs` — CI gate, three-tier severity (HIGH/MEDIUM/LOW)
- `_repos/` (gitignored) — read-only clones of StockSaathi and BolHisaab for reference
- `maglock_protocol/` (gitignored) — local MagLock source files

## Live-countdown architecture

All countdowns on the site (NowBar, /about academic snapshot, anywhere `<LiveCountdown>` lands) tick purely from `new Date()` against ISO strings baked into `src/config/milestones.ts` at build time. Zero fetches. Zero server round-trips. Works offline after first paint. Tested in `src/lib/time.test.ts` with 17 cases covering pure-math correctness, past-flip, decomposition, and offset-naive ISO local-time semantics.

The milestone type still supports an optional `score`, but scores are deliberately not published on the site.

## Privacy

The deployed site publishes only: Ali Arbab (name), the `thealiarbab` GitHub and X handles, Class XII status, the projects, the lab designs, the APs sat (never scores), and the HTML resume.

It does **not** publish: city, school, phone, timezone, raw Gmail, any specific college name, any application deadline, any decision date. The `privacy-audit` script enforces this on every build by grepping `.next/server`, `.next/static`, and `public/` for a forbidden-token list (with three severity tiers — HIGH always fails, MEDIUM fails under `STRICT_PRIVACY=1`, LOW reports only).

Internal deadlines live in `PRIVATE_CALENDAR.md` which is gitignored. Never commit.

## Deploy

Every push to `main` auto-deploys to Vercel. Preview deploys on every PR. DNS points `aliarbab2009.com` apex + `www` to Vercel via A + CNAME records. HSTS, COOP, CORP, Permissions-Policy, and a strict CSP (Edge-runtime middleware with per-request nonces) are set in `next.config.ts` headers + `src/middleware.ts`.
