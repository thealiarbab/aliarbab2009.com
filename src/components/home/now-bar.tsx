import Link from "next/link";

import { NOW_ASOF, NOW_ITEMS } from "@/config/now";

/**
 * <NowBar /> — momentum strip below the home masthead.
 *
 * Surfaces Ali's school year and the NOW_ITEMS list (src/config/now.ts)
 * of what he's building. The earlier "Next AP" countdown chip was
 * retired on 2026-09-27: AP exams are no longer published on the site.
 *
 * A "Last commit <relative time>" chip fed by a cached /api/github route
 * was considered and skipped to keep the bar zero-network, so the whole
 * component works offline.
 *
 * Server component with no client-side state.
 */

const SCHOOL_YEAR_LABEL = "Class XII · final year";

export function NowBar() {
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
