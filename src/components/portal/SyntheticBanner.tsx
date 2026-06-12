/**
 * Unmissable Phase 0 banner. Renders on every authenticated portal page.
 * If you ever see this in production, something is wrong.
 */
export default function SyntheticBanner() {
  if (process.env.NEXT_PUBLIC_PHASE_0 !== "1") return null;
  return (
    <div
      role="status"
      className="bg-amber-500/95 text-ink-950 text-center py-2 text-base font-semibold tracking-wide print:hidden"
      style={{ fontFeatureSettings: '"tnum"' }}
    >
      SANDBOX — synthetic data only. No real investor or borrower information lives here yet.
    </div>
  );
}
