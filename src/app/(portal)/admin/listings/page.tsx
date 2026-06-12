import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import {
  lienPositionLabel,
  listingStatusLabel,
  money,
  pct,
  shortDate,
} from "@/lib/portal/format";
import {
  cloneListing,
  markFunded,
  publishListing,
  toggleRateIncrease,
} from "./actions";

export const metadata: Metadata = {
  title: "Listings — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminListingsPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const { data: listings } = await supabase
    .from("listings")
    .select(
      "id, amount, remaining_amount, yield_pct, lien_position, property_type, city, state, status, compliance_approved, rate_increase, published_at, created_at",
    )
    .order("created_at", { ascending: false });

  return (
    <main className="container-cdf py-12 space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-heading">Listings</h1>
          <p className="text-base text-ivory/70">
            Publish requires compliance sign-off. Alerts are sent only on first publish and rate-increase flips.
          </p>
        </div>
        <Link
          href="/admin/listings/new"
          className="rounded bg-champagne-500 px-5 py-3 text-base font-semibold text-ink-900"
        >
          New listing
        </Link>
      </header>

      <div className="overflow-x-auto bg-ink-900 border border-champagne-700/30 rounded-lg">
        <table className="w-full min-w-[980px] text-base">
          <thead className="text-left text-ivory/60 border-b border-champagne-700/20">
            <tr>
              <th scope="col" className="p-3">Listing</th>
              <th scope="col" className="p-3 text-right">Amount</th>
              <th scope="col" className="p-3 text-right">Yield</th>
              <th scope="col" className="p-3">Status</th>
              <th scope="col" className="p-3">Published</th>
              <th scope="col" className="p-3">Controls</th>
            </tr>
          </thead>
          <tbody>
            {(listings ?? []).map((l) => (
              <tr key={l.id} className="border-b border-champagne-700/10 align-top">
                <th scope="row" className="p-3 text-left font-normal">
                  <Link href={`/admin/listings/${l.id}/edit`} className="font-semibold text-champagne-300 underline">
                    {lienPositionLabel(l.lien_position)} TD - {l.property_type}
                  </Link>
                  <span className="block text-sm text-ivory/60">
                    {l.city}, {l.state}
                  </span>
                </th>
                <td className="p-3 text-right tabular-nums">{money(l.amount)}</td>
                <td className="p-3 text-right tabular-nums">{pct(l.yield_pct)}</td>
                <td className="p-3">
                  {listingStatusLabel(l.status)}
                  {!l.compliance_approved && (
                    <span className="block text-sm text-amber-200">Compliance not signed</span>
                  )}
                  {l.rate_increase && (
                    <span className="block text-sm text-champagne-300">Rate increase</span>
                  )}
                </td>
                <td className="p-3">{l.published_at ? shortDate(l.published_at) : "Not published"}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    <form action={publishListing}>
                      <input type="hidden" name="listing_id" value={l.id} />
                      <button className="rounded bg-champagne-500 px-3 py-2 text-sm font-semibold text-ink-900">
                        Publish
                      </button>
                    </form>
                    <form action={toggleRateIncrease}>
                      <input type="hidden" name="listing_id" value={l.id} />
                      <input type="hidden" name="next" value={l.rate_increase ? "false" : "true"} />
                      <button className="rounded border border-champagne-700/40 px-3 py-2 text-sm">
                        {l.rate_increase ? "Clear rate flag" : "Rate increase"}
                      </button>
                    </form>
                    <form action={markFunded}>
                      <input type="hidden" name="listing_id" value={l.id} />
                      <button className="rounded border border-champagne-700/40 px-3 py-2 text-sm">
                        Mark funded
                      </button>
                    </form>
                    <form action={cloneListing}>
                      <input type="hidden" name="listing_id" value={l.id} />
                      <button className="rounded border border-champagne-700/40 px-3 py-2 text-sm">
                        Clone
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
