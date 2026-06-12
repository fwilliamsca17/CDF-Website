import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { requireApprovedInvestor } from "@/lib/supabase/server";
import {
  money,
  pct,
  lienPositionLabel,
  listingStatusLabel,
} from "@/lib/portal/format";
import { DRE_LICENSE_LINE } from "@/lib/portal/constants";
import AllocationRequestForm from "./AllocationRequestForm";

export const metadata: Metadata = {
  title: "Listing — CDF Investor Group",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function ListingDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const guard = await requireApprovedInvestor();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase, user } = guard;
  const { id } = await params;

  const [{ data: l }, { data: priv }, { data: accounts }, { data: requests }] = await Promise.all([
    supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .eq("compliance_approved", true)
      .not("published_at", "is", null)
      .in("status", ["available", "partially_placed"])
      .maybeSingle(),
    supabase
      .from("listing_private")
      .select("address, appraised_value, purpose, borrower_notes")
      .eq("listing_id", id)
      .maybeSingle(),
    supabase
      .from("investor_accounts")
      .select("id, account_type, custodian, vesting_string")
      .order("created_at", { ascending: true }),
    supabase
      .from("allocation_requests")
      .select("id, account_id, requested_amount, approved_amount, status")
      .eq("listing_id", id)
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false }),
  ]);

  if (!l) notFound();
  const netRate = l.net_investor_rate_pct ?? l.yield_pct;

  return (
    <main className="container-cdf py-12 max-w-4xl">
      <Link href="/listings" className="text-sm text-champagne-300 underline">
        ← All listings
      </Link>

      <header className="my-6 flex items-baseline justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-display-lg font-heading text-champagne-300 mb-1"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {pct(netRate)}
          </h1>
          <p className="text-xl">
            Net investor rate · {lienPositionLabel(l.lien_position)} Trust Deed ·{" "}
            {l.property_type} · {l.city}, {l.state}
          </p>
          <p className="mt-2 text-base text-ivory/70">
            CDF services the loan and retains a disclosed {pct(l.servicing_spread_pct)}
            {" "}servicing spread from interest collected on the loan.
          </p>
        </div>
        <div className="text-right space-y-1">
          {l.rate_increase && (
            <p className="text-sm uppercase tracking-widest bg-champagne-500 text-ink-900 rounded px-3 py-1 inline-block">
              Rate increase
            </p>
          )}
          <p className="text-sm">Status: {listingStatusLabel(l.status)}</p>
        </div>
      </header>

      <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-8 mb-8">
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-lg">
          <dt className="text-ivory/60">Loan amount</dt>
          <dd style={{ fontFeatureSettings: '"tnum"' }}>{money(l.amount)}</dd>
          <dt className="text-ivory/60">Remaining</dt>
          <dd style={{ fontFeatureSettings: '"tnum"' }}>{money(l.remaining_amount)}</dd>
          <dt className="text-ivory/60">Minimum review amount</dt>
          <dd style={{ fontFeatureSettings: '"tnum"' }}>{money(l.min_investment)}</dd>
          <dt className="text-ivory/60">LTV / CLTV</dt>
          <dd style={{ fontFeatureSettings: '"tnum"' }}>
            {pct(l.ltv_pct)} / {pct(l.cltv_pct)}
          </dd>
          <dt className="text-ivory/60">Term</dt>
          <dd>
            {l.term_months ? `${l.term_months} months` : "—"} · {l.amortization ?? "—"}
          </dd>
          <dt className="text-ivory/60">Prepay</dt>
          <dd>{l.prepay_months ? `${l.prepay_months} months` : "None"}</dd>
          <dt className="text-ivory/60">Occupancy</dt>
          <dd>{l.occupancy ?? "—"}</dd>
          <dt className="text-ivory/60">Funding structure</dt>
          <dd>{fundingStructureLabel(l.funding_structure)}</dd>
          <dt className="text-ivory/60">Assignment status</dt>
          <dd>{workflowLabel(l.assignment_status)}</dd>
          <dt className="text-ivory/60">Funds status</dt>
          <dd>{workflowLabel(l.funds_status)}</dd>
        </dl>
        {l.assignment_process_notes && (
          <p className="mt-6 text-base text-ivory/75">{l.assignment_process_notes}</p>
        )}
      </section>

      {priv && (
        <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-8 mb-8">
          <h2 className="text-heading font-heading mb-4">Property &amp; purpose</h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-lg">
            <dt className="text-ivory/60">Address</dt>
            <dd>{priv.address}</dd>
            <dt className="text-ivory/60">Appraised value</dt>
            <dd style={{ fontFeatureSettings: '"tnum"' }}>
              {money(priv.appraised_value)}
            </dd>
            <dt className="text-ivory/60">Purpose</dt>
            <dd className="sm:col-span-1">{priv.purpose ?? "—"}</dd>
          </dl>
          {priv.borrower_notes && (
            <p className="mt-4 text-base text-ivory/80">{priv.borrower_notes}</p>
          )}
        </section>
      )}

      <AllocationRequestForm
        listingId={l.id}
        accounts={(accounts ?? []).map((account) => ({
          id: account.id,
          account_type: account.account_type,
          custodian: account.custodian,
          vesting_string: account.vesting_string,
        }))}
        existingRequests={(requests ?? []).map((request) => ({
          id: request.id,
          account_id: request.account_id,
          requested_amount: Number(request.requested_amount),
          approved_amount:
            request.approved_amount === null ? null : Number(request.approved_amount),
          status: request.status,
        }))}
        minInvestment={l.min_investment === null ? null : Number(l.min_investment)}
        remainingAmount={l.remaining_amount === null ? null : Number(l.remaining_amount)}
      />

      <p className="text-sm text-ivory/60 print:hidden">
        Every allocation request goes through a personal conversation first.
        Account vesting shown above is for review only.
      </p>

      <footer className="pt-12 border-t border-champagne-700/20 text-xs text-ivory/60 mt-12">
        {DRE_LICENSE_LINE}
      </footer>
    </main>
  );
}

function workflowLabel(value: string | null | undefined) {
  if (!value) return "—";
  return value
    .split("_")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function fundingStructureLabel(value: string | null | undefined) {
  switch (value) {
    case "direct_funded":
      return "Direct-funded";
    case "originated_assignment":
      return "Originated / assignment";
    case "fund_retained_interest":
      return "Fund retained interest";
    default:
      return "—";
  }
}
