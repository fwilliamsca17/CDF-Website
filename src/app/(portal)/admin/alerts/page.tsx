import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { pct, shortDate } from "@/lib/portal/format";

export const metadata: Metadata = {
  title: "Sent Alerts — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AlertsPage({
  searchParams,
}: {
  searchParams: Promise<{ listing?: string }>;
}) {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;
  const sp = await searchParams;

  let query = supabase
    .from("sent_alerts")
    .select("id, listing_id, recipient_email, subject, body_html, sent_at, delivery_status")
    .order("sent_at", { ascending: false })
    .limit(100);

  if (sp.listing) query = query.eq("listing_id", sp.listing);
  const { data: alerts } = await query;
  const { data: listings } = await supabase
    .from("listings")
    .select("id, city, state, property_type, yield_pct, net_investor_rate_pct, servicing_spread_pct")
    .order("created_at", { ascending: false });

  return (
    <main className="container-cdf py-12 space-y-8">
      <header>
        <h1 className="text-heading-lg font-heading">Sent alerts</h1>
        <p className="text-base text-ivory/70">
          Immutable per-recipient copies. Phase 0 rows may show `skipped_no_resend_key`.
        </p>
      </header>

      <form className="bg-ink-900 border border-champagne-700/30 rounded-lg p-4 flex flex-wrap gap-3 items-end">
        <label>
          <span className="block text-base mb-2">Listing</span>
          <select name="listing" defaultValue={sp.listing ?? ""} className="min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base">
            <option value="">All listings</option>
            {(listings ?? []).map((l) => (
              <option key={l.id} value={l.id}>
                {l.property_type} - {l.city}, {l.state} -{" "}
                {pct(l.net_investor_rate_pct ?? l.yield_pct)} net /{" "}
                {pct(l.servicing_spread_pct ?? 1)} spread
              </option>
            ))}
          </select>
        </label>
        <button className="rounded bg-champagne-500 px-4 py-3 text-base font-semibold text-ink-900">
          Filter
        </button>
      </form>

      <section className="space-y-3">
        {!alerts?.length && (
          <p className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 text-base">
            No alert rows yet.
          </p>
        )}
        {alerts?.map((alert) => (
          <article key={alert.id} className="bg-ink-900 border border-champagne-700/30 rounded-lg p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h2 className="text-heading-sm font-heading">{alert.subject}</h2>
                <p className="text-sm text-ivory/60">{alert.recipient_email}</p>
              </div>
              <p className="text-sm text-ivory/60">
                {shortDate(alert.sent_at)} - {alert.delivery_status ?? "unknown"}
              </p>
            </div>
            <details className="mt-4">
              <summary className="cursor-pointer text-champagne-300 underline">View rendered HTML copy</summary>
              <iframe
                title={`Alert body ${alert.id}`}
                sandbox=""
                srcDoc={alert.body_html}
                className="mt-3 h-80 w-full rounded border border-champagne-700/30 bg-white"
              />
            </details>
          </article>
        ))}
      </section>
    </main>
  );
}
