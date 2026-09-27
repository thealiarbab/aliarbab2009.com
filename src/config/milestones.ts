/**
 * Public academic milestones — single source of truth.
 *
 * These ISO strings are baked into the JavaScript bundle at build time.
 * The <LiveCountdown> component reads them and ticks purely from
 * new Date() on a client-side setInterval. No API calls, ever.
 *
 * Adding or moving a date here cascades to every countdown on the site
 * on the next deploy.
 *
 * HARD RULE: only neutral academic milestones appear here. No
 * application deadlines, no college-specific dates, no decision dates,
 * and no AP exams (Ali's choice, 2026-09-27). Private deadlines live in
 * PRIVATE_CALENDAR.md (gitignored).
 *
 * The list is currently empty: nothing on the site counts down. Entries
 * use offset-naive ISO strings so the browser renders them as local
 * time, e.g.
 *
 *     { id: "example", label: "Example milestone",
 *       at: "2027-02-15T10:00:00", subLabel: "Morning" }
 */

export type Milestone = {
  id: string;
  label: string;
  at: string; // ISO string, offset-naive — browser renders as local time
  subLabel?: string;
};

export const MILESTONES: readonly Milestone[] = [];

/**
 * Find the next upcoming milestone. If none are in the future,
 * returns null. `list` defaults to MILESTONES; tests pass their own.
 */
export function getNextMilestone(
  now: Date = new Date(),
  list: readonly Milestone[] = MILESTONES,
): Milestone | null {
  const future = list.filter((m) => new Date(m.at).getTime() > now.getTime());
  if (future.length === 0) return null;
  return future.reduce((soonest, m) =>
    new Date(m.at).getTime() < new Date(soonest.at).getTime() ? m : soonest,
  );
}
