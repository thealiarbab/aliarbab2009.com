/**
 * LameCRAFT project layout — the Command Nexus world, sourced from its
 * own spec (LAMECRAFT_PALETTE.json): #030306 void, square 1px borders,
 * Courier New as the only face. Cyan leads here so the tile doesn't
 * read as a copy of MagLock, which uses the same palette led by green.
 */
export default function LameCraftLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-lamecraft flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      {children}
    </div>
  );
}
