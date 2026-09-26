# CLAUDE.md — conventions for `aliarbab2009.com`

Context for future Claude sessions working in this repo.

## Project overview

Personal portfolio at `aliarbab2009.com`. Six project worlds (StockSaathi, SpendInCheck, BolHisaab, MagLock Protocol, Sovereign Alpha, LameCRAFT) composed into one site, plus `/lab` for hardware that exists only as a design. Ali Arbab is a Class XII student building this to share with college admissions officers, recruiters, and collaborators.

The original plan file no longer exists; this file is the architecture record. GitHub handle is `thealiarbab` (the old `Ali-Arbab` URL 404s).

## Hard rules (non-negotiable)

### Privacy + no-doxxing

**No city, school, phone, timezone, raw Gmail, or any specific college name may appear on the deployed site.** The site is college-agnostic — shareable with any admissions officer without naming a target institution. `/about` is the admissions-ready long-version page (NOT `/mit` or anything similar).

Before merging content changes, mentally grep for: city names, MIT/Harvard/Stanford/any college, "EA"/"early action"/"regular action", "admissions committee", timezone strings, phone numbers, `foxman1544...@gmail.com`. The CI script `scripts/privacy-audit.mjs` enforces this by failing the build on any hit.

Internal/private dates (application freeze dates, etc.) live in `PRIVATE_CALENDAR.md` which is gitignored. Never commit.

Never link to or name the host of anything served from Ali's home server (LameCRAFT, MagLock's remote access) — describe those projects without giving an address. Test scores (AP etc.) are private by Ali's choice — list exams sat, never scores.

### Truth rule

Every number and claim on the site must trace to a source: the project's live surface, its repo (commits, `STATUS.md`, bugfix records), or something Ali said. Project READMEs are *not* reliable — StockSaathi's still describes a failover that was never switched on. When a figure changes, update `src/config/projects.ts` and the project page together, with an absolute "as of" date. Mark designs as designs (`/lab` "In design") and rebuilds as rebuilds. Never publish security specifics of a live installation (endpoints, auth state, hostnames) — MagLock guards a real door.

### Live countdowns, zero external input

All countdowns must be purely client-local. ISO dates baked into `src/config/milestones.ts`. `src/lib/time.ts#timeUntil()` is a pure function. `<LiveCountdown>` is a client component that ticks from `new Date()` via `setInterval(1000)` — no API calls, ever. Works offline after first paint. In written docs, use absolute dates only (never "+N days" snapshots).

### Site aesthetic — brutalist dark (with light toggle)

The site default is **Swiss/brutalist**: 12-col mono-grid, hairline off-white borders on near-black, Space Grotesk + JetBrains Mono, single bright cobalt accent `#6b82ff`, zero radius. Light mode flips to cream `#f4f4f0` with black hairlines and pure cobalt `#0033ff`.

The mode is controlled by `data-theme="dark"` / `data-theme="light"` on `<html>`, set by `<ThemeScript>` (inline, pre-paint) and flipped by `<ThemeToggle>` in the nav. User preference persists to `localStorage.theme`; first-visit defaults respect `prefers-color-scheme` and fall back to dark.

Tokens live in `src/app/globals.css` as a root `@theme` block (dark) plus `:root[data-theme="light"]` override.

`<ThemeToggle>` is a **pure-DOM server component (v3)** — no `"use client"`, no `useState`, no `useEffect`. It renders a static `<button>` followed by `<ThemeToggleScript>`, an async server component that emits an inline `<script nonce={...}>` (CSP-compliant) which binds the click handler via `document.currentScript.previousElementSibling` at HTML parse time. This means the toggle is interactive from first paint with zero hydration window — earlier React-driven implementations had a 50-300ms cold-load window where the button was painted but not interactive, causing first clicks to silently no-op. Both SVG icons render always; CSS picks the visible one via `:root[data-theme]` so first paint is always correct. The script also dispatches a `themechange` CustomEvent + listens for `storage` events so palette-driven flips and cross-tab flips both keep the aria-label fresh. Do NOT re-introduce React state to `<ThemeToggle>` — the hydration race it creates is exactly why this rewrite exists.

### Per-project theming

Project detail pages (`/projects/<slug>`) each wrap their `<main>` in a `.theme-<slug>` class that overrides the brutalist tokens. Six project worlds live in `src/app/globals.css`: `.theme-stocksaathi` (teal on deep-black), `.theme-spendincheck` (brass ledger), `.theme-bolhisaab` (indigo on cream — light-first, so its override is for dark), `.theme-maglock` (neon green on pure black), `.theme-sovereign-alpha` (amber terminal) and `.theme-lamecraft` (Command Nexus cyan). A test fails if a project lacks either mode. Shell (nav, footer) stays on the site-default brutalist tokens, so visitors feel "inside Ali's site but now in a project's world."

Do not introduce separate `<Button>` variants like `<StockSaathiButton>` — the single `<Button>` auto-themes because its `bg-primary` reads from `--color-primary` which is overridden by the project theme class.

## Conventions

### Folder layout

- `src/app` — routes (App Router, route groups `(marketing)` + `(dev)`)
- `src/components/ui` — primitives (Button, Badge, Card, Dialog, Tabs, Tooltip)
- `src/components/shell` — Nav, Footer, CommandPalette, LiveCountdown
- `src/components/home` — HomeHero, AuroraOrb, FeaturedProjects, NowBar
- `src/components/project` — ProjectHero, StatsStrip, ArchitectureDiagram, LiveDemoEmbed
- `src/components/about` — AboutHeroLetter, WhyThisProjectBlock
- `src/components/decoration` — ParticleField, NoiseOverlay, GradientMesh
- `src/components/icons` — custom SVG marks
- `src/lib` — utilities (`cn`, `time`, `github`, `seo`, etc.)
- `src/config` — `site.ts`, `projects.ts`, `milestones.ts`
- `public/{fonts,textures,projects,resume,og,social}`
- `scripts` — `optimize-media.mjs`, `scrub-metadata.mjs`, `privacy-audit.mjs`, `clone-reference-repos.sh`
- `_repos/` (gitignored) — reference clones of StockSaathi + BolHisaab
- `_archive/` (tracked) — dormant code kept for reference (archived aesthetic variants). Never import from here.
- `maglock_protocol/` (gitignored) — local MagLock source

### Styling

- Tailwind v4 utility classes. Read tokens from CSS custom properties defined in `@theme` block.
- Prefer `cn()` helper (tailwind-merge wrapper) when composing class strings with conditionals.
- Use `class-variance-authority` for component variants (see `src/components/ui/button.tsx`).

### Data flow

- Server Components by default. Mark client components with `"use client"` only when they need state, effects, or browser APIs.
- `<LiveCountdown>` is client (needs `setInterval`). `<NowBar>` wraps client pieces in a server shell.
- Case studies are TSX. StockSaathi, BolHisaab and MagLock are bespoke pages with interactive demos; SpendInCheck, Sovereign Alpha and LameCRAFT use the shared `<CaseStudy>` in `src/components/project/case-study.tsx`, which reads only `--color-*` tokens.
- Project metadata lives in `src/config/projects.ts`. `repoUrl` is optional — never point it at a private or empty repo; set `sourceNote` instead.

### Adding a new project

1. Add an entry to `src/config/projects.ts` (with `startedISO`, `lastUpdatedISO`, and `repoUrl` or `sourceNote`).
2. Add `.theme-<slug>` plus its opposite-mode override to `src/app/globals.css`.
3. Create `src/app/(marketing)/projects/<slug>/{layout.tsx, page.tsx, opengraph-image.tsx}` — the OG image can call `renderProjectOg()` from `src/lib/og-project.tsx`.
4. Add a `why-i-built` entry (the test requires one per project) and a JSON-LD case in `src/lib/json-ld.ts`.
5. Run `pnpm build && pnpm privacy-audit` locally before pushing.

## Gotchas

- `maglock_protocol/` exists as a gitignored sibling folder. Never import from it; reference only.
- `_repos/StockSaathi/` and `_repos/BolHisaab/` are likewise gitignored reference clones. Read them; don't depend on them at build time.
- Tailwind v4 has no `tailwind.config.ts` by default — tokens live in `@theme` directive inside `src/app/globals.css`. If we ever add a plugin, we can re-introduce a config file for plugins only.
- Fonts: only `Space_Grotesk` + `JetBrains_Mono` are loaded (via `next/font/google`). The earlier Fraunces / Instrument Serif / Orbitron / Rajdhani / Inter imports were dropped when brutalist was promoted — the archived variants in `_archive/` still reference them in CSS comments but the actual `next/font/google` calls are gone.
- `<LiveCountdown>` powers the NowBar and the /about academic list; past dates flip to ✓ on their own.
- **Share images.** Never pass `ogImage` to `buildMetadata` on a route that has (or inherits) an `opengraph-image.tsx` — a page-level image overrides the generated one. Segments without their own file (`/`, `/projects`, `/lab`) pass `ogImage: "/opengraph-image"`. The OG fonts must be TTF (`public/fonts/*.ttf`): Satori throws on WOFF2 and silently serves a 0-byte PNG. The TTFs are subsets — OG text may use Latin, `•` and `·`, but not `₹`, `●`, `◆` or arrows.
- **Pre-commit hook** runs lint-staged, `tsc` and the whole Vitest suite (~4 minutes). Run `prettier --check` and `eslint` on changed files first so a formatting miss doesn't cost a full cycle.
- The privacy pattern list is `scripts/.privacy-patterns.local.mjs` (gitignored); CI reads it from the `PRIVACY_PATTERNS_BASE64` secret, which must be refreshed whenever the local file changes.
