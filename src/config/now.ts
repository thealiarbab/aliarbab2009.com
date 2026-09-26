/**
 * "Now" — what Ali is actively working on, shown on the home NowBar.
 *
 * Three items at most; each links to the project it's about. Update
 * NOW_ASOF whenever this list changes so the strip never presents a
 * stale month as the present (it renders as a <time> tooltip).
 */

export type NowItem = {
  /** Verb-ish lead-in, rendered as a small uppercase label. */
  label: string;
  text: string;
  href: string;
};

export const NOW_ASOF = "2026-09-26";

export const NOW_ITEMS: readonly NowItem[] = [
  { label: "Growing", text: "StockSaathi · 170 accounts", href: "/projects/stocksaathi" },
  { label: "Rewriting", text: "BolHisaab in Kotlin", href: "/projects/bolhisaab" },
  { label: "Rebuilding", text: "MagLock from scratch", href: "/projects/maglock" },
];
