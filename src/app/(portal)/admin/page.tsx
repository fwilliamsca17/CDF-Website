import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { shortDate } from "@/lib/portal/format";

export const metadata: Metadata = {
  title: "Admin — CDF Investor Group",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const [
    { count: pendingApplicants },
    { count: openListings },
    { count: saleReady },
    { count: activeAllocations },
    { data: lastBatch },
    { count: sentAlerts },
  ] = await Promise.all([
    supabase.from("access_requests").select("id", { count: "exact", head: true }).is("handled_at", null),
    supabase.from("listings").select("id", { count: "exact", head: true }).in("status", ["available", "partially_placed"]),
    supabase
      .from("loan_sale_readiness")
      .select("listing_id", { count: "exact", head: true })
      .eq("status", "ready_to_offer"),
    supabase
      .from("allocation_requests")
      .select("id", { count: "exact", head: true })
      .in("status", ["new", "called", "qualified", "docs_sent", "committed", "funds_received", "assigned"]),
    supabase
      .from("import_batches")
      .select("uploaded_at, file_name")
      .eq("status", "committed")
      .order("uploaded_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase.from("sent_alerts").select("id", { count: "exact", head: true }),
  ]);

  const Card = ({
    href,
    title,
    metric,
    sub,
  }: {
    href: string;
    title: string;
    metric: string;
    sub?: string;
  }) => (
    <Link
      href={href}
      className="block bg-ink-900 border border-champagne-700/30 rounded-lg p-6 hover:border-champagne-400"
    >
      <p className="text-base text-ivory/70">{title}</p>
      <p
        className="text-4xl font-heading text-champagne-300 mt-1"
        style={{ fontFeatureSettings: '"tnum"' }}
      >
        {metric}
      </p>
      {sub && <p className="text-sm text-ivory/60 mt-1">{sub}</p>}
    </Link>
  );

  return (
    <main className="container-cdf py-12 space-y-8">
      <h1 className="text-heading-lg font-heading">Operator dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card
          href="/admin/applicants"
          title="Pending applicants"
          metric={String(pendingApplicants ?? 0)}
          sub="Awaiting your review"
        />
        <Card
          href="/admin/listings"
          title="Open listings"
          metric={String(openListings ?? 0)}
          sub="Available + partially placed"
        />
        <Card
          href="/admin/sale-readiness"
          title="Sale-ready loans"
          metric={String(saleReady ?? 0)}
          sub="Ready to offer"
        />
        <Card
          href="/admin/allocations"
          title="Active allocations"
          metric={String(activeAllocations ?? 0)}
          sub="Request through assignment"
        />
        <Card
          href="/admin/import"
          title="Last TMO import"
          metric={lastBatch?.uploaded_at ? shortDate(lastBatch.uploaded_at) : "—"}
          sub={lastBatch?.file_name ?? "No imports yet"}
        />
        <Card
          href="/admin/alerts"
          title="Alerts sent"
          metric={String(sentAlerts ?? 0)}
          sub="Lifetime"
        />
      </div>

      <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6">
        <h2 className="text-heading font-heading mb-4">Operations</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            ["/admin/listings/new", "Paste new listing"],
            ["/admin/sale-readiness", "Loan sale prep"],
            ["/admin/allocations", "Allocation pipeline"],
            ["/admin/linking", "TMO linking"],
            ["/admin/documents", "Documents"],
            ["/admin/alerts", "Alert log"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="rounded border border-champagne-700/40 px-4 py-3 text-base text-champagne-300 hover:bg-white/5"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
