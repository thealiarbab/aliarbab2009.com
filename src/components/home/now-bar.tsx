import Link from "next/link";

import { getNextMilestone } from "@/config/milestones";
import { NOW_ASOF, NOW_ITEMS } from "@/config/now";
import { LiveCountdown } from "@/components/shell/live-countdown";

/**
 * <NowBar /> — momentum strip below the home masthead.
 *
 * Surfaces Ali's school year, the next public academic milestone, and
 * the NOW_ITEMS list (src/config/now.ts) of what he's building. Earlier:
 * v0 surfaced two facts: Ali's school year + the next public academic
 * milestone (always an AP exam in 2026). When all four exams are in
 * the past, the right-hand chip flips to "✓ APs done" automatically —
 * `getNextMilestone()` returns null at that point.
 *
 * v1 will add a "Last commit <relative time>" chip fed by a cached
 * /api/github route. Skipped for now to keep the bar zero-network on
 * first render — the live countdown already ticks purely client-side
 * from new Date(), so this entire component works offline.
 *
 * Server component — composes a client <LiveCountdown /> for the
 * timer piece. No client-side state of its own.
 */

const SCHOOL_YEAR_LABEL = "Class XII · final year";

export function NowBar() {
  const next = getNextMilestone();

  return (
    <aside
      aria-label="Current status"
      className="mb-16 grid grid-cols-12 gap-4 border-b-2 border-[var(--color-border)] pb-3"
    >
      <div className="col-span-12 flex flex-col gap-1 md:col-span-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-muted)] uppercase">
          Now
        </p>
        <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--color-primary)] uppercase">
          Live
        </p>
      </div>

      <div className="col-span-12 flex flex-wrap items-baseline gap-x-6 gap-y-2 md:col-span-10">
        <span className="font-mono text-sm font-medium">{SCHOOL_YEAR_LABEL}</span>

        <span aria-hidden className="font-mono text-xs text-[var(--color-muted)]">
          ·
        </span>

        {next ? (
          <span className="flex flex-wrap items-baseline gap-2">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              Next AP
            </span>
            <span className="font-mono text-sm font-medium">{next.label}</span>
            <span aria-hidden className="font-mono text-xs text-[var(--color-muted)]">
              in
            </span>
            <LiveCountdown
              iso={next.at}
              seconds={false}
              className="font-mono text-sm font-medium text-[var(--color-primary)]"
            />
          </span>
        ) : (
          <span className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
              APs
            </span>
            <span className="font-mono text-sm font-medium text-[var(--color-primary)]">
              ✓ all four sat
            </span>
          </span>
        )}

        {NOW_ITEMS.map((item) => (
          <span key={item.href} className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span aria-hidden className="font-mono text-xs text-[var(--color-muted)]">
              ·
            </span>
            <span className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] tracking-[0.25em] text-[var(--color-muted)] uppercase">
                {item.label}
              </span>
              <Link
                href={item.href}
                className="font-mono text-sm font-medium underline-offset-4 hover:text-[var(--color-primary)] hover:underline"
              >
                {item.text}
              </Link>
            </span>
          </span>
        ))}
        <time
          dateTime={NOW_ASOF}
          className="font-mono text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase"
        >
          as of {NOW_ASOF}
        </time>
      </div>
    </aside>
  );
}
