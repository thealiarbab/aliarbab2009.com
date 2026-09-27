/**
 * Activities & leadership — surfaced in /about § Activities.
 *
 * Privacy hard-rule: NO school name, NO specific club name that
 * identifies the institution, NO city, NO peer/teacher names. Roles
 * describe the FUNCTION (what was actually done) not the
 * INSTITUTION (where it happened).
 *
 *   ✅ "Editor — student literary magazine, 2024-26"
 *   ❌ "Editor — The [REDACTED] Quill, [REDACTED city]"
 *
 * Categories group the table visually. Order within a category is
 * descending by `from` (newest first).
 *
 * Every entry is real and sourced from Ali — no placeholders. The
 * three seed entries that used to live here (peer tutoring, an AP
 * study group, beginner Python workshops) were invented examples and
 * were removed on 2026-09-26; never reintroduce filler to make a
 * category look full. An empty category simply doesn't render.
 */

export type ActivityCategory = "tech" | "leadership" | "academic" | "community";

export type Activity = {
  /** Stable id (used as React key + for /about deep-links). */
  id: string;
  /** ~40-char role/title. Function, not institution. */
  role: string;
  /** Category bucket. */
  category: ActivityCategory;
  /** "YYYY" or "YYYY-MM" — start. Required. */
  from: string;
  /** "YYYY" or "YYYY-MM" — end. Optional (ongoing). */
  to?: string;
  /** 1-2 sentence concrete blurb (~25-50 words). */
  blurb: string;
};

export const ACTIVITIES: readonly Activity[] = [
  // ── tech ─────────────────────────────────────────────────────────
  {
    id: "stocksaathi-build",
    role: "Founder + sole developer — StockSaathi",
    category: "tech",
    from: "2026-04",
    blurb:
      "Built and run a live paper-trading simulator for Indian teenagers: real NSE and BSE prices, nine behavioural-bias detectors and an AI coach that never gives tips. 170 accounts so far, all by word of mouth.",
  },
  {
    id: "spendincheck-build",
    role: "Builder — SpendInCheck",
    category: "tech",
    from: "2026-09",
    blurb:
      "Turned my Class XII Computer Science practical into a live personal-finance product: a React client over a Flask and Postgres API, with holdings priced live from StockSaathi.",
  },
  {
    id: "bolhisaab-build",
    role: "Founder + sole developer — BolHisaab",
    category: "tech",
    from: "2026-04",
    blurb:
      "Voice-first Hindi and Hinglish ledger for shopkeepers. The web prototype is complete; the app is now being redesigned and rewritten natively in Kotlin.",
  },
  {
    id: "maglock-build",
    role: "Builder — MagLock Protocol smart lock",
    category: "tech",
    from: "2026-04",
    blurb:
      "Two-door ESP32 smart lock with an ESP32-CAM and a Flutter app, reachable from outside only through a tunnel I control. Being rebuilt from the ground up.",
  },
  {
    id: "sovereign-alpha-research",
    role: "Independent research — Sovereign Alpha",
    category: "tech",
    from: "2026-04",
    blurb:
      "Designing and building a fully local, reproducible market simulation to test whether a language model reading history can find real, friction-adjusted alpha.",
  },
  {
    id: "lamecraft-infra",
    role: "Self-hosting — LameCRAFT home server",
    category: "tech",
    from: "2026-02",
    blurb:
      "Run my own server for my sites and tools behind a Cloudflare tunnel, with a Python control panel and the Command Nexus design system my other projects borrow.",
  },

  // ── leadership ────────────────────────────────────────────────────
  {
    id: "buildathon-product-lead",
    role: "Builder — national AI buildathon team",
    category: "leadership",
    from: "2026-04",
    to: "2026-04",
    blurb:
      "Built StockSaathi end to end during a 36-hour national buildathon while a teammate pitched it to the panel. It placed second nationally.",
  },
  {
    id: "stocksaathi-ambassador",
    role: "Growth — StockSaathi brand ambassador",
    category: "leadership",
    from: "2026",
    blurb:
      "Brought on Devansh as StockSaathi's student brand ambassador, to spread it among teenagers without paid advertising.",
  },

  // ── academic ─────────────────────────────────────────────────────
  {
    id: "robotics-bionic-hand",
    role: "Robotics — bionic hand exoskeleton",
    category: "academic",
    from: "2025-12",
    blurb:
      "Built a biomimetic bionic hand and hand-exoskeleton prototype as part of a robotics group project; the hand was shown at a science exhibition.",
  },

  // ── community ────────────────────────────────────────────────────
  {
    id: "bolhisaab-field-research",
    role: "Field research — local shopkeepers",
    category: "community",
    from: "2026-04",
    blurb:
      "Interviewed shopkeepers about how they actually keep their books before designing BolHisaab — credit, cash, customers named in Hindi, and a paper notebook.",
  },
  {
    id: "peer-programming-mentor",
    role: "Peer programming mentor",
    category: "community",
    from: "2024",
    blurb: "Mentoring a younger neighbour in Class X as they learn to program.",
  },
];

export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  tech: "Tech",
  leadership: "Leadership",
  academic: "Academic",
  community: "Community",
};
