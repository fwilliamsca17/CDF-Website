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
import { saveSaleReadiness } from "./actions";

export const metadata: Metadata = {
  title: "Loan Sale Readiness — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type ListingRow = {
  id: string;
  amount: number | string;
  remaining_amount: number | string | null;
  net_investor_rate_pct: number | string | null;
  servicing_spread_pct: number | string | null;
  borrower_note_rate_pct: number | string | null;
  funding_structure: string | null;
  fund_retained_amount: number | string | null;
  lien_position: number;
  property_type: string;
  city: string;
  state: string;
  status: string;
  compliance_approved: boolean;
  assignment_status: string | null;
  funds_status: string | null;
  updated_at: string | null;
};

type ReadinessRow = {
  listing_id: string;
  tmo_loan_ref: string | null;
  whole_loan_principal: number | string | null;
  fund_owned_principal: number | string | null;
  fund_owned_pct: number | string | null;
  target_sale_principal: number | string | null;
  fund_retained_principal: number | string | null;
  note_rate_pct: number | string | null;
  net_investor_rate_pct: number | string | null;
  servicing_spread_pct: number | string | null;
  tmo_rate_modifier_pct: number | string | null;
  status: string;
  next_action: string | null;
  blocker_notes: string | null;
  source_file_reviewed: boolean;
  pricing_approved: boolean;
  investor_packet_ready: boolean;
  documents_scrubbed: boolean;
  counsel_reviewed: boolean;
  lender_account_ready: boolean;
  tmo_funding_lender_added: boolean;
  tmo_lender_rate_verified: boolean;
  principal_to_lender_verified: boolean;
  rounding_adjustment_confirmed: boolean;
  disbursement_verified: boolean;
  funds_received: boolean;
  assignment_sent: boolean;
  assignment_signed: boolean;
  assignment_recorded: boolean;
  assignment_boarded: boolean;
  updated_at: string | null;
};

const CHECKLIST = [
  ["source_file_reviewed", "TMO source file reviewed"],
  ["pricing_approved", "Note rate, net rate, and spread approved"],
  ["investor_packet_ready", "Investor packet ready"],
  ["documents_scrubbed", "Documents scrubbed for investor visibility"],
  ["counsel_reviewed", "Counsel/compliance reviewed"],
  ["lender_account_ready", "Investor lender account ready in TMO"],
  ["tmo_funding_lender_added", "Funding Lender added in TMO"],
  ["tmo_lender_rate_verified", "Lender Rate equals Note Rate minus spread"],
  ["principal_to_lender_verified", "Principal-to-Lender amount verified"],
  ["rounding_adjustment_confirmed", "Rounding adjustment owner confirmed"],
  ["disbursement_verified", "Disbursement setup verified"],
  ["funds_received", "Funds received"],
  ["assignment_sent", "Assignment package sent"],
  ["assignment_signed", "Assignment package signed"],
  ["assignment_recorded", "Assignment recorded"],
  ["assignment_boarded", "Investor boarded in servicing records"],
] as const;

const STATUS_OPTIONS = [
  ["not_started", "Not started"],
  ["needs_review", "Needs review"],
  ["ready_to_offer", "Ready to offer"],
  ["blocked", "Blocked"],
  ["boarded", "Boarded"],
] as const;

function numberValue(value: number | string | null | undefined) {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "string" ? Number(value) : value;
  return Number.isFinite(n) ? n : null;
}

function inputValue(value: number | string | null | undefined) {
  if (value === null || value === undefined) return "";
  return String(value);
}

function defaultReadiness(listing: ListingRow): Partial<ReadinessRow> {
  const note = listing.borrower_note_rate_pct;
  const net = listing.net_investor_rate_pct;
  return {
    target_sale_principal: listing.remaining_amount ?? listing.amount,
    fund_retained_principal: listing.fund_retained_amount,
    note_rate_pct: note,
    net_investor_rate_pct: net,
    servicing_spread_pct: listing.servicing_spread_pct ?? 1,
    tmo_rate_modifier_pct: -1,
    status: listing.status === "funded" ? "boarded" : "needs_review",
    next_action: "Complete sale packet and TMO Funding Lender setup.",
  };
}

function checklistProgress(row: Partial<ReadinessRow>) {
  const done = CHECKLIST.filter(([field]) => Boolean(row[field])).length;
  return { done, total: CHECKLIST.length };
}

function readinessLabel(status: string | null | undefined) {
  return STATUS_OPTIONS.find(([value]) => value === status)?.[1] ?? "Needs review";
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
      return "Unknown";
  }
}

function estimatedAnnualSpread(row: Partial<ReadinessRow>) {
  const target = numberValue(row.target_sale_principal);
  const spread = numberValue(row.servicing_spread_pct);
  if (target === null || spread === null) return null;
  return target * (spread / 100);
}

export default async function SaleReadinessPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const [{ data: listingsRaw }, { data: readinessRaw }] = await Promise.all([
    supabase
      .from("listings")
      .select(
        "id, amount, remaining_amount, net_investor_rate_pct, servicing_spread_pct, borrower_note_rate_pct, funding_structure, fund_retained_amount, lien_position, property_type, city, state, status, compliance_approved, assignment_status, funds_status, updated_at",
      )
      .order("created_at", { ascending: false }),
    supabase.from("loan_sale_readiness").select("*"),
  ]);

  const listings = (listingsRaw ?? []) as ListingRow[];
  const readiness = new Map(
    ((readinessRaw ?? []) as ReadinessRow[]).map((row) => [row.listing_id, row]),
  );
  const rows = listings.map((listing) => ({
    listing,
    readiness: readiness.get(listing.id) ?? defaultReadiness(listing),
  }));

  const readyCount = rows.filter((row) => row.readiness.status === "ready_to_offer").length;
  const blockedCount = rows.filter((row) => row.readiness.status === "blocked").length;
  const targetSaleTotal = rows.reduce(
    (sum, row) => sum + (numberValue(row.readiness.target_sale_principal) ?? 0),
    0,
  );
  const annualSpreadTotal = rows.reduce(
    (sum, row) => sum + (estimatedAnnualSpread(row.readiness) ?? 0),
    0,
  );

  return (
    <main className="container-cdf py-12 space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-heading">Loan sale readiness</h1>
          <p className="text-base text-ivory/70">
            Prepare fund-owned loan positions for private note investors at a
            disclosed net investor rate and servicing spread.
          </p>
        </div>
        <Link href="/admin/listings" className="text-champagne-300 underline">
          Back to listings
        </Link>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Loans tracked" value={String(rows.length)} />
        <Metric label="Ready to offer" value={String(readyCount)} />
        <Metric label="Blocked" value={String(blockedCount)} />
        <Metric label="Target sale amount" value={money(targetSaleTotal)} />
        <Metric label="Estimated annual spread" value={money(annualSpreadTotal)} />
      </section>

      <section className="rounded-lg border border-champagne-700/30 bg-ink-900 p-6">
        <h2 className="text-heading font-heading">Sequence</h2>
        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          {[
            "Lock economics",
            "Build investor packet",
            "Create TMO Funding Lender",
            "Collect funds and assignment",
            "Board servicing records",
          ].map((step, index) => (
            <div
              key={step}
              className="rounded border border-champagne-700/25 bg-ink-950 p-4"
            >
              <p className="text-sm uppercase tracking-widest text-champagne-300">
                Step {index + 1}
              </p>
              <p className="mt-1 text-base">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-5">
        {rows.map(({ listing, readiness: current }) => {
          const progress = checklistProgress(current);
          const noteRate = numberValue(current.note_rate_pct);
          const netRate = numberValue(current.net_investor_rate_pct);
          const spread = numberValue(current.servicing_spread_pct);
          const computedSpread =
            noteRate !== null && netRate !== null ? noteRate - netRate : spread;

          return (
            <section
              key={listing.id}
              className="rounded-lg border border-champagne-700/30 bg-ink-900 p-6"
            >
              <header className="grid gap-5 lg:grid-cols-[1.1fr_1fr_1fr]">
                <div>
                  <p className="text-sm uppercase tracking-widest text-champagne-300">
                    {readinessLabel(current.status)}
                  </p>
                  <h2 className="text-heading-sm font-heading">
                    {lienPositionLabel(listing.lien_position)} TD -{" "}
                    {listing.property_type} - {listing.city}, {listing.state}
                  </h2>
                  <p className="text-sm text-ivory/60">
                    {fundingStructureLabel(listing.funding_structure)} -{" "}
                    {listingStatusLabel(listing.status)} - Updated{" "}
                    {shortDate(current.updated_at ?? listing.updated_at)}
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-3 text-base">
                  <div>
                    <dt className="text-ivory/55">Target sale</dt>
                    <dd className="text-xl font-heading tabular-nums">
                      {money(current.target_sale_principal)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ivory/55">Fund owned</dt>
                    <dd className="text-xl font-heading tabular-nums">
                      {money(current.fund_owned_principal)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ivory/55">Net / note</dt>
                    <dd className="tabular-nums">
                      {pct(netRate)} / {pct(noteRate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ivory/55">Spread</dt>
                    <dd className="tabular-nums">{pct(computedSpread)}</dd>
                  </div>
                </dl>
                <div className="rounded border border-champagne-700/25 bg-ink-950 p-4">
                  <p className="text-sm text-ivory/55">Checklist</p>
                  <p className="text-2xl font-heading text-champagne-300">
                    {progress.done}/{progress.total}
                  </p>
                  <p className="mt-2 text-sm text-ivory/65">
                    Estimated annual spread: {money(estimatedAnnualSpread(current))}
                  </p>
                  {!listing.compliance_approved && (
                    <p className="mt-2 text-sm text-amber-200">
                      Compliance sign-off still required before publishing.
                    </p>
                  )}
                </div>
              </header>

              {(current.next_action || current.blocker_notes) && (
                <div className="mt-5 grid gap-3 lg:grid-cols-2">
                  {current.next_action && (
                    <p className="rounded border border-champagne-700/25 bg-ink-950 p-4 text-base">
                      <span className="block text-sm uppercase tracking-widest text-ivory/50">
                        Next action
                      </span>
                      {current.next_action}
                    </p>
                  )}
                  {current.blocker_notes && (
                    <p className="rounded border border-amber-400/35 bg-amber-500/10 p-4 text-base text-amber-100">
                      <span className="block text-sm uppercase tracking-widest text-amber-200">
                        Blocker
                      </span>
                      {current.blocker_notes}
                    </p>
                  )}
                </div>
              )}

              <details className="mt-5 rounded border border-champagne-700/25 bg-ink-950 p-4">
                <summary className="cursor-pointer text-base text-champagne-300">
                  Update sale-readiness fields
                </summary>
                <form action={saveSaleReadiness} className="mt-5 space-y-5">
                  <input type="hidden" name="listing_id" value={listing.id} />
                  <div className="grid gap-4 md:grid-cols-4">
                    <Field label="TMO loan ref" name="tmo_loan_ref" value={current.tmo_loan_ref} />
                    <Field
                      label="Whole loan principal"
                      name="whole_loan_principal"
                      value={current.whole_loan_principal}
                    />
                    <Field
                      label="Fund owned principal"
                      name="fund_owned_principal"
                      value={current.fund_owned_principal}
                    />
                    <Field
                      label="Fund owned %"
                      name="fund_owned_pct"
                      value={current.fund_owned_pct}
                    />
                    <Field
                      label="Target sale principal"
                      name="target_sale_principal"
                      value={current.target_sale_principal}
                    />
                    <Field
                      label="Fund retained principal"
                      name="fund_retained_principal"
                      value={current.fund_retained_principal}
                    />
                    <Field label="Note rate %" name="note_rate_pct" value={current.note_rate_pct} />
                    <Field
                      label="Net investor rate %"
                      name="net_investor_rate_pct"
                      value={current.net_investor_rate_pct}
                    />
                    <Field
                      label="Servicing spread %"
                      name="servicing_spread_pct"
                      value={current.servicing_spread_pct ?? 1}
                    />
                    <Field
                      label="TMO rate modifier %"
                      name="tmo_rate_modifier_pct"
                      value={current.tmo_rate_modifier_pct ?? -1}
                    />
                    <label>
                      <span className="mb-2 block text-base">Status</span>
                      <select
                        name="status"
                        defaultValue={current.status ?? "needs_review"}
                        className={inputClass}
                      >
                        {STATUS_OPTIONS.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <label>
                      <span className="mb-2 block text-base">Next action</span>
                      <textarea
                        name="next_action"
                        rows={3}
                        defaultValue={current.next_action ?? ""}
                        className={inputClass}
                      />
                    </label>
                    <label>
                      <span className="mb-2 block text-base">Blocker notes</span>
                      <textarea
                        name="blocker_notes"
                        rows={3}
                        defaultValue={current.blocker_notes ?? ""}
                        className={inputClass}
                      />
                    </label>
                  </div>

                  <fieldset>
                    <legend className="mb-3 text-base text-ivory/75">
                      TMO and assignment checklist
                    </legend>
                    <div className="grid gap-2 md:grid-cols-2">
                      {CHECKLIST.map(([field, label]) => (
                        <label
                          key={field}
                          className="flex min-h-12 items-center gap-3 rounded border border-champagne-700/20 bg-ink-900 px-3 py-2 text-base"
                        >
                          <input
                            type="checkbox"
                            name={field}
                            defaultChecked={Boolean(current[field])}
                            className="h-5 w-5"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="rounded bg-champagne-500 px-5 py-3 text-base font-semibold text-ink-900"
                  >
                    Save readiness
                  </button>
                </form>
              </details>
            </section>
          );
        })}
      </div>
    </main>
  );
}

const inputClass =
  "w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base text-ivory focus:outline-none focus:ring-2 focus:ring-champagne-400";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-champagne-700/30 bg-ink-900 p-5">
      <p className="text-sm uppercase tracking-widest text-ivory/55">{label}</p>
      <p className="mt-2 text-3xl font-heading text-champagne-300 tabular-nums">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  name,
  value,
}: {
  label: string;
  name: string;
  value: number | string | null | undefined;
}) {
  return (
    <label>
      <span className="mb-2 block text-base">{label}</span>
      <input name={name} defaultValue={inputValue(value)} className={inputClass} />
    </label>
  );
}
