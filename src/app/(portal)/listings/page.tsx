import Link from "next/link";
import { Metadata } from "next";
import { requireApprovedInvestor } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  money,
  pct,
  lienPositionLabel,
  listingStatusLabel,
} from "@/lib/portal/format";
import { DRE_LICENSE_LINE } from "@/lib/portal/constants";

export const metadata: Metadata = {
  title: "Listings — CDF Investor Group",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const guard = await requireApprovedInvestor();
  if ("redirectTo" in guard) redirect(guard.redirectTo);
  const { supabase } = guard;

  const { data: listings } = await supabase
    .from("listings")
    .select(
      "id, amount, remaining_amount, yield_pct, lien_position, property_type, city, state, ltv_pct, cltv_pct, status, rate_increase, published_at"
    )
    .eq("compliance_approved", true)
    .order("published_at", { ascending: false });

  return (
    <main className="container-cdf py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-heading-lg font-heading">Current opportunities</h1>
        <p className="text-base text-ivory/80">
          Member listings. Past investments and funded loans are
          shown for context.
        </p>
      </header>

      {!listings?.length && (
        <p className="text-lg p-8 bg-ink-900 border border-champagne-700/30 rounded-lg">
          No listings published yet. We&rsquo;ll email you the moment a
          new opportunity goes live.
        </p>
      )}

      <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {listings?.map((l) => (
          <li key={l.id}>
            <Link
              href={`/listings/${l.id}`}
              className="block bg-ink-900 border border-champagne-700/30 rounded-lg p-6 hover:border-champagne-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-champagne-400"
            >
              <div className="flex items-baseline justify-between mb-2">
                <span
                  className="text-3xl font-heading text-champagne-300"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {pct(l.yield_pct)}
                </span>
                {l.rate_increase && (
                  <span className="text-xs uppercase tracking-widest bg-champagne-500 text-ink-900 rounded px-2 py-1">
                    Rate increase
                  </span>
                )}
              </div>
              <p className="text-lg font-semibold mb-1">
                {lienPositionLabel(l.lien_position)} TD · {l.property_type}
              </p>
              <p className="text-base text-ivory/80 mb-4">
                {l.city}, {l.state}
              </p>
              <dl className="grid grid-cols-2 gap-y-2 text-base">
                <dt className="text-ivory/60">Amount</dt>
                <dd
                  className="text-right"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {money(l.amount)}
                </dd>
                {l.remaining_amount !== null && l.remaining_amount !== l.amount && (
                  <>
                    <dt className="text-ivory/60">Remaining</dt>
                    <dd
                      className="text-right"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {money(l.remaining_amount)}
                    </dd>
                  </>
                )}
                <dt className="text-ivory/60">LTV</dt>
                <dd
                  className="text-right"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {pct(l.ltv_pct)}
                </dd>
                {l.cltv_pct !== l.ltv_pct && (
                  <>
                    <dt className="text-ivory/60">CLTV</dt>
                    <dd
                      className="text-right"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {pct(l.cltv_pct)}
                    </dd>
                  </>
                )}
                <dt className="text-ivory/60">Status</dt>
                <dd className="text-right">{listingStatusLabel(l.status)}</dd>
              </dl>
            </Link>
          </li>
        ))}
      </ul>

      <footer className="pt-12 border-t border-champagne-700/20 text-xs text-ivory/60">
        {DRE_LICENSE_LINE}
      </footer>
    </main>
  );
}
