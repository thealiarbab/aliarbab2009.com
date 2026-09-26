/**
 * StockSaathi sign-ups by month — a single-series bar chart.
 *
 * One series, so one hue (the world's primary) and no legend box: the
 * heading names it. Bars get a 4px rounded top anchored to the baseline
 * and a 2px gap. September is still in progress, so it's drawn as an
 * outline with a "so far" label rather than a solid bar that would read
 * as a finished month. Hover shows the exact count (native <title>), and
 * a visually-hidden table carries the same numbers for screen readers.
 *
 * Numbers are Ali's own export from the StockSaathi database, 2026-09-26.
 */

const MONTHS: ReadonlyArray<{ month: string; label: string; count: number; partial?: boolean }> = [
  { month: "2026-04", label: "Apr", count: 19 },
  { month: "2026-05", label: "May", count: 2 },
  { month: "2026-06", label: "Jun", count: 9 },
  { month: "2026-07", label: "Jul", count: 4 },
  { month: "2026-08", label: "Aug", count: 52 },
  { month: "2026-09", label: "Sep", count: 84, partial: true },
];

const W = 480;
const H = 180;
const PAD_TOP = 22;
const PAD_BOTTOM = 22;
const GAP = 2;

export function StockSaathiSignups() {
  const max = Math.max(...MONTHS.map((m) => m.count));
  const plotH = H - PAD_TOP - PAD_BOTTOM;
  const slot = W / MONTHS.length;
  const barW = slot - GAP * 2 - 18;

  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="text-sm font-semibold text-[var(--color-fg)]">
        New accounts by month, 2026
      </figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="New StockSaathi accounts by month in 2026: April 19, May 2, June 9, July 4, August 52, September 84 so far."
        className="h-auto w-full max-w-xl"
      >
        {/* baseline */}
        <line
          x1="0"
          x2={W}
          y1={H - PAD_BOTTOM}
          y2={H - PAD_BOTTOM}
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        {MONTHS.map((m, i) => {
          const h = Math.max(2, (m.count / max) * plotH);
          const x = i * slot + (slot - barW) / 2;
          const y = H - PAD_BOTTOM - h;
          const r = Math.min(4, h / 2);
          // Rounded top corners only, square at the baseline.
          const d = `M${x},${H - PAD_BOTTOM} V${y + r} Q${x},${y} ${x + r},${y} H${x + barW - r} Q${x + barW},${y} ${x + barW},${y + r} V${H - PAD_BOTTOM} Z`;
          return (
            <g key={m.month} className="group">
              <title>
                {m.label} 2026: {m.count} new accounts{m.partial ? " (month in progress)" : ""}
              </title>
              {/* oversized invisible hit target */}
              <rect
                x={i * slot}
                y={PAD_TOP - 10}
                width={slot}
                height={plotH + 10}
                fill="transparent"
              />
              <path
                d={d}
                fill={m.partial ? "transparent" : "var(--color-primary)"}
                stroke={m.partial ? "var(--color-primary)" : "none"}
                strokeWidth={m.partial ? 2 : 0}
                strokeDasharray={m.partial ? "4 3" : undefined}
                className="transition-opacity group-hover:opacity-80"
              />
              {(m.count === max || m.label === "Aug") && (
                <text
                  x={x + barW / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className="fill-[var(--color-fg)] font-mono text-[11px]"
                >
                  {m.count}
                  {m.partial ? " so far" : ""}
                </text>
              )}
              <text
                x={x + barW / 2}
                y={H - 6}
                textAnchor="middle"
                className="fill-[var(--color-muted)] font-mono text-[10px]"
              >
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption>New StockSaathi accounts by month, 2026</caption>
        <thead>
          <tr>
            <th scope="col">Month</th>
            <th scope="col">New accounts</th>
          </tr>
        </thead>
        <tbody>
          {MONTHS.map((m) => (
            <tr key={m.month}>
              <th scope="row">{m.label} 2026</th>
              <td>
                {m.count}
                {m.partial ? " (in progress)" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-[var(--color-muted)]">
        September counted to the 26th. No paid acquisition in any month.
      </p>
    </figure>
  );
}
