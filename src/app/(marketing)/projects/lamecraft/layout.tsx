/**
 * LameCRAFT project layout — the Command Nexus world, sourced from its
 * own spec (LAMECRAFT_PALETTE.json): #030306 void, square 1px borders,
 * Courier New as the only face, spring green #00ff9d leading as the spec's
 * aesthetic rule requires, a faint grid, ◈ section heads and hard-invert
 * hovers (see .theme-lamecraft in globals.css).
 */
export default function LameCraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-lamecraft flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      {children}
    </div>
  );
}
