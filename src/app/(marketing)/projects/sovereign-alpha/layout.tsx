/**
 * Sovereign Alpha project layout — an amber-on-black terminal world,
 * mono display type, zero radius. The project has no product UI of its
 * own yet, so the palette nods to the market terminals it's modelled on.
 */
export default function SovereignAlphaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-sovereign-alpha flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-fg)]">
      {children}
    </div>
  );
}
