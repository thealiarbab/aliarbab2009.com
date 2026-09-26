/**
 * SpendInCheck project layout — the "brass ledger" world: warm
 * near-black, brass accent, zero radius. Sourced from SpendInCheck's
 * own tokens (G:/FinTrack/web/src/styles/tokens.css). Shell stays on
 * the site-default brutalist tokens above this layout.
 */
export default function SpendInCheckLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-spendincheck flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      {children}
    </div>
  );
}
