/**
 * Project catalog — used by the home page featured grid,
 * the /projects index, the resume, and the per-project route metadata.
 *
 * Every figure here was checked against the project's live surface or
 * its own repo on the date in `lastUpdatedISO`. When a number moves,
 * change it here and on the project page together — the two are read
 * side by side by the same visitor.
 *
 * Order is the order a visitor meets them: live products first, then
 * work in progress, then research and infrastructure.
 */

export type ProjectTheme =
  | "stocksaathi"
  | "spendincheck"
  | "bolhisaab"
  | "maglock"
  | "sovereign-alpha"
  | "lamecraft";

export type ProjectStatus = "live" | "rebuilding" | "research" | "self-hosted";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  theme: ProjectTheme;
  status: ProjectStatus;
  statusLabel: string;
  liveUrl?: string;
  /**
   * Public source. Absent when the code is private or not yet
   * published — never point this at an empty or private repo, since a
   * visitor clicking through to a 404 or a README-only repo reads as
   * nothing having been built.
   */
  repoUrl?: string;
  /** Shown in place of a source link when repoUrl is absent. */
  sourceNote?: string;
  primaryColor: string;
  year: number;
  /** ISO date work began (YYYY-MM-DD). Feeds publishedTime + JSON-LD. */
  startedISO: string;
  stack: readonly string[];
  /**
   * ISO date — last meaningful update to this project page or its case
   * study. Sitemap uses it for lastModified. Optional; falls back to
   * siteConfig.lastReviewedISO when absent.
   */
  lastUpdatedISO?: string;
};

export const PROJECTS: readonly Project[] = [
  {
    slug: "stocksaathi",
    name: "StockSaathi",
    tagline:
      "An AI-coached paper-trading simulator that teaches Indian teenagers how markets — and their own reactions to them — actually work",
    description:
      "A virtual ₹1,00,000 portfolio priced off real NSE and BSE quotes: 4,313 equities, 351 ETFs and 14,155 mutual funds. Nine behavioural-bias detectors run on every trade, and an AI coach explains what just happened in the user's own numbers without ever giving a tip. Crash Replay re-runs nine real Indian market crises day by day. Placed 2nd nationally at the Masters' Union AI Buildathon; 170 accounts since, all by word of mouth.",
    theme: "stocksaathi",
    status: "live",
    statusLabel: "Live in production",
    liveUrl: "https://stocksaathi.co.in",
    repoUrl: "https://github.com/thealiarbab/StockSaathi",
    primaryColor: "#00B386",
    year: 2026,
    startedISO: "2026-04-17",
    lastUpdatedISO: "2026-09-26",
    stack: [
      "Vanilla ES modules, no build step",
      "Python on Vercel (one ASGI entrypoint)",
      "Supabase Postgres + RLS + RPCs",
      "Gemini 3 Flash / 3.1 Pro on Vertex AI",
      "GitHub Actions data + order jobs",
      "Yahoo + Tickertape + AMFI feeds",
      "Service Worker PWA",
      "Kotlin + Jetpack Compose (Android port)",
    ],
  },
  {
    slug: "spendincheck",
    name: "SpendInCheck",
    tagline:
      "A personal finance tracker that tells you whether you're on budget, not just what you spent",
    description:
      "Started as my Class XII Computer Science practical — Python, raw parameterised SQL, one operations module shared by a console app and a web app — then rebuilt into a product: a React + TypeScript client over a Flask JSON API on Postgres. Budgets against actuals, a ledger with accounts, transfers and recurring rules, and a portfolio priced live from StockSaathi's public API. Open demo, no sign-up.",
    theme: "spendincheck",
    status: "live",
    statusLabel: "Live — open demo",
    liveUrl: "https://spendincheck.com",
    repoUrl: "https://github.com/thealiarbab/SpendInCheck",
    primaryColor: "#C9922F",
    year: 2026,
    startedISO: "2026-09-08",
    lastUpdatedISO: "2026-09-26",
    stack: [
      "React 19 + TypeScript + Vite",
      "TanStack Query + React Router",
      "Flask JSON API",
      "PostgreSQL (Supabase), raw SQL",
      "psycopg2 connection pool",
      "pytest against a real database",
      "StockSaathi public API for prices",
    ],
  },
  {
    slug: "bolhisaab",
    name: "BolHisaab",
    tagline:
      "A voice-first Hindi and Hinglish khaata for the 63M shopkeepers still running paper books",
    description:
      "Tap the mic, say “Ram ne paanch sau udhaar liya,” and the ledger entry writes itself — confirmed back in a natural Indian voice, with one-tap Undo. Llama 3.1 8B parses intent in about 200ms, Sarvam Saarika transcribes Indian voices natively, and one Postgres function inserts the row and returns the new balance in a single round trip. Shaped by interviews with local shopkeepers. The web prototype is complete; the app is now being redesigned and rewritten natively in Kotlin.",
    theme: "bolhisaab",
    status: "rebuilding",
    statusLabel: "Redesign + Kotlin rewrite",
    sourceNote: "Source private until the rewrite ships",
    primaryColor: "#4F46E5",
    year: 2026,
    startedISO: "2026-04-17",
    lastUpdatedISO: "2026-09-26",
    stack: [
      "Next.js 16 + React 19",
      "TypeScript strict",
      "Tailwind CSS v4",
      "Supabase + anonymous auth + RLS",
      "Llama 3.1 8B (Groq) primary",
      "Llama 3.3 70B fallback",
      "Sarvam Saarika v2 STT",
      "Sarvam Bulbul v2 TTS",
      "Whisper-large-v3-turbo fallback",
      "Kotlin (rewrite in progress)",
    ],
  },
  {
    slug: "maglock",
    name: "MagLock Protocol",
    tagline:
      "A two-door ESP32 + Flutter smart lock that runs on the home network, with remote access only through a private tunnel",
    description:
      "ESP32 firmware drives two fail-secure magnetic-lock relays; an ESP32-CAM streams MJPEG from the door; a Flutter app ties them together. No vendor cloud and no account to cancel — the lock lives on the home network, and the only way in from outside is a Cloudflare tunnel the owner controls. Maggy, an optional voice assistant with persistent memory, can lock, unlock and set the auto-lock timer on request. Now being rebuilt from the ground up.",
    theme: "maglock",
    status: "rebuilding",
    statusLabel: "Being rebuilt from scratch",
    sourceNote: "Source publishes with the rebuild",
    primaryColor: "#00FF9D",
    year: 2026,
    startedISO: "2026-04-14",
    lastUpdatedISO: "2026-09-26",
    stack: [
      "ESP32 (Arduino, ArduinoJson)",
      "ESP32-CAM (hardware JPEG, MJPEG)",
      "Flutter (Dart 3, Material 3)",
      "Provider state",
      "Cloudflare Tunnel (remote access)",
      "speech_to_text + flutter_tts",
      "Grok-3 (Maggy's reasoning)",
      "Inno Setup Windows installer",
    ],
  },
  {
    slug: "sovereign-alpha",
    name: "Sovereign Alpha",
    tagline:
      "A deterministic, fully local simulation of 2015–2025 markets for testing whether an LLM reading history can find real alpha",
    description:
      "Three modules in one closed loop: an LLM reads a decade of filings, Fed statements and news under versioned analyst personas and writes an Alpha Ledger; a Polars backtest engine trades on it with slippage, commissions and partial fills; an Unreal Engine 5 city visualises the result live. The rule that everything else serves is the temporal firewall — no simulated moment may see a row from its own future. The harness is built and tested on synthetic data; full-scale runs wait on hardware.",
    theme: "sovereign-alpha",
    status: "research",
    statusLabel: "Research — built ahead of hardware",
    repoUrl: "https://github.com/thealiarbab/sovereign-alpha",
    primaryColor: "#FFB000",
    year: 2026,
    startedISO: "2026-04-28",
    lastUpdatedISO: "2026-09-26",
    stack: [
      "Python 3.12 + uv",
      "Polars (as_of_join only)",
      "Pydantic + Pandera contracts",
      "Hypothesis property tests",
      "ZeroMQ + MessagePack bridge",
      "Unreal Engine 5 (twin, planned)",
      "DeepSeek-R1 32B (planned)",
    ],
  },
  {
    slug: "lamecraft",
    name: "LameCRAFT",
    tagline:
      "A self-hosted home server, the control panel that runs it, and the design system everything else borrows",
    description:
      "A home machine serving my own sites to the internet through a Cloudflare tunnel — FastAPI on uvicorn, no port forwarding, no hosting bill. A Python control panel, packaged as a Windows executable, watches its processes and network. And the Command Nexus design system: one JSON spec of colours, type and motion rules that MagLock's app and my study pages are both built from. Private by design, so there is no public link.",
    theme: "lamecraft",
    status: "self-hosted",
    statusLabel: "Self-hosted — private by design",
    sourceNote: "Private infrastructure — no public link",
    primaryColor: "#00D4FF",
    year: 2026,
    startedISO: "2026-02-18",
    lastUpdatedISO: "2026-09-26",
    stack: [
      "FastAPI + uvicorn",
      "Cloudflare Tunnel",
      "Python control panel (psutil)",
      "PyInstaller Windows build",
      "Command Nexus design system (JSON spec)",
      "Standalone HTML + KaTeX pages",
    ],
  },
] as const;

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
