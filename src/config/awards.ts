/**
 * Awards & recognition — surfaced in /about § Awards.
 *
 * Privacy hard-rule: avoid awards whose name identifies the
 * institution Ali attended (any prize whose title contains that
 * institution's name is disqualifying). Generic / regional / national
 * / international awards are fine.
 *
 * Each award gets a stable id, a year, an issuing org (kept generic
 * when possible), an optional `pending: true` flag for awards
 * awaiting confirmation/score-release, and a 1-line blurb.
 *
 * Test scores and score-derived awards (AP Scholar etc.) are kept off
 * the site by Ali's choice — don't add them back.
 */

export type APScore = 1 | 2 | 3 | 4 | 5;

export type Award = {
  id: string;
  title: string;
  org: string;
  year: number;
  /** True if award is anticipated but not yet confirmed. */
  pending?: boolean;
  /** Optional 1-line context (~15-25 words). */
  blurb?: string;
};

export const AWARDS: readonly Award[] = [
  {
    id: "ai-buildathon-2026",
    title: "2nd place nationally — AI Buildathon",
    org: "Masters' Union",
    year: 2026,
    blurb:
      "The brief was set on the day, so StockSaathi was built from scratch in 36 hours; a teammate pitched it to the panel.",
  },
  {
    id: "inter-house-math-quiz-2025",
    title: "Inter-House Math Quiz — 1st place",
    org: "Inter-house competition",
    year: 2025,
    blurb: "Won the inter-house mathematics quiz in December 2025.",
  },
];
