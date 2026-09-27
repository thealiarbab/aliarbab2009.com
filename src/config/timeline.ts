/**
 * Journey timeline — surfaced in /about § Journey.
 *
 * Each entry is a meaningful inflection point: when something started,
 * a milestone reached, a project shipped, a project shelved.
 *
 * Edit-flow: add entries to the TIMELINE array below, push. /about
 * renders on next deploy. Sorted descending by date at render time —
 * source order can be anything but newest-first reads cleanest.
 *
 * Every date is sourced — a first commit, a file timestamp, a deploy —
 * not remembered. When adding one, cite where the date came from in
 * your commit message.
 *
 * Privacy: no school name, no city, no specific clubs that identify
 * the institution. "Built first Arduino project" → fine.
 * "Built Arduino project for [school name] club" → BLOCKED.
 */

export type TimelineEntry = {
  /** ISO date (YYYY-MM or YYYY-MM-DD). Sorted descending — newest first. */
  date: string;
  /** Short noun-phrase title (under 60 chars). */
  title: string;
  /** 1-2 sentence note. ~40-100 words. Concrete > abstract. */
  note: string;
  /** Optional category for visual grouping. */
  kind?: "build" | "milestone" | "learn" | "shelve";
};

export const TIMELINE: readonly TimelineEntry[] = [
  {
    date: "2026-09",
    title: "StockSaathi passes 170 accounts",
    note: "No ads and no marketing — 52 sign-ups in August and 84 more in September, almost all by word of mouth. 100 people have traded, set a limit order or talked to the coach; 79 were active in the last 30 days.",
    kind: "milestone",
  },
  {
    date: "2026-09-13",
    title: "Red-teamed StockSaathi's money path",
    note: "Moved order matching off the user's browser and onto the server, stopped trusting any client-supplied price, and locked every money table against direct writes. 24 attack probes afterwards, none got through. Fixed 46 coach defects the same week, most found by reading real conversations.",
    kind: "learn",
  },
  {
    date: "2026-09-08",
    title: "SpendInCheck: practical file to product",
    note: "Built my Class XII Computer Science practical as a real finance tracker in Python and SQL, submitted it, then rebuilt it into a React app on a Flask and Postgres API — live at spendincheck.com, priced by StockSaathi.",
    kind: "build",
  },
  {
    date: "2026-09",
    title: "BolHisaab redesign and Kotlin rewrite begins",
    note: "The web prototype proved the voice pipeline. The next version is a full redesign, rewritten natively in Kotlin, so it runs like an app a shopkeeper would actually keep on their phone.",
    kind: "build",
  },
  {
    date: "2026-07-24",
    title: "StockSaathi on Android, in Kotlin",
    note: "Ported the core of StockSaathi to Jetpack Compose over two long sittings — portfolio, markets, all nine bias detectors, crash replay, limit orders, news and mutual funds — up to version 0.5.0 with a signed release build.",
    kind: "build",
  },
  {
    date: "2026-04-28",
    title: "Started Sovereign Alpha",
    note: "Designed and built the harness for a fully local market simulation — temporal firewall, reproducible runs, a Polars backtest engine and six analyst personas — ahead of the hardware it needs for full-scale runs.",
    kind: "build",
  },
  {
    date: "2026-04",
    title: "2nd nationally at the Masters' Union AI Buildathon",
    note: "The organisers set the problem on the day, so StockSaathi was built from scratch in a 36-hour national buildathon while a teammate pitched it. It placed second — and instead of stopping there, it went live and kept growing.",
    kind: "milestone",
  },
  {
    date: "2026-04-17",
    title: "Built BolHisaab's voice pipeline",
    note: "A voice-first Hindi and Hinglish ledger: speech to text, Llama for intent, one database round trip per entry, spoken confirmation back. Shaped by interviews with local shopkeepers about how they really keep their books.",
    kind: "build",
  },
  {
    date: "2026-04-14",
    title: "MagLock Protocol's first working build",
    note: "Two ESP32 relays on fail-secure magnetic locks, an ESP32-CAM streaming the door, and a Flutter app — plus Maggy, a voice assistant that can lock, unlock and remember. No vendor cloud anywhere.",
    kind: "build",
  },
  {
    date: "2026-02",
    title: "Put my own server on the internet",
    note: "Set up LameCRAFT: a home machine serving my sites through a Cloudflare tunnel, a Python control panel to run it, and the Command Nexus design system that later became MagLock's look.",
    kind: "build",
  },
  {
    date: "2025-12",
    title: "1st place, Inter-House Math Quiz",
    note: "Took first place in the inter-house mathematics quiz, December 2025.",
    kind: "milestone",
  },
  {
    date: "2025-12",
    title: "Built a bionic hand exoskeleton prototype",
    note: "A biomimetic bionic hand and hand-exoskeleton prototype, built as a robotics group project; the hand was shown at a science exhibition.",
    kind: "build",
  },
];
