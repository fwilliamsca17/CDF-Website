import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import {
  accountTypeLabel,
  custodianLabel,
  lienPositionLabel,
  listingStatusLabel,
  money,
  pct,
  shortDate,
} from "@/lib/portal/format";
import { updateAllocationRequest } from "./actions";

export const metadata: Metadata = {
  title: "Allocation Pipeline — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type AllocationRequest = {
  id: string;
  listing_id: string;
  profile_id: string;
  account_id: string | null;
  requested_amount: number;
  approved_amount: number | null;
  status: string;
  source: string;
  next_action: string | null;
  due_at: string | null;
  investor_notes: string | null;
  admin_notes: string | null;
  created_at: string;
};

type ListingRow = {
  id: string;
  amount: number;
  remaining_amount: number | null;
  yield_pct: number;
  net_investor_rate_pct: number | null;
  servicing_spread_pct: number | null;
  lien_position: number;
  property_type: string;
  city: string;
  state: string;
  status: string;
};

type ProfileRow = {
  user_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

type AccountRow = {
  id: string;
  account_type: string;
  custodian: string;
  vesting_string: string;
};

const STATUSES = [
  "new",
  "called",
  "qualified",
  "docs_sent",
  "committed",
  "funds_received",
  "assigned",
  "boarded",
  "declined",
  "lost",
];

export default async function AdminAllocationsPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const { data: allocationsRaw } = await supabase
    .from("allocation_requests")
    .select(
      "id, listing_id, profile_id, account_id, requested_amount, approved_amount, status, source, next_action, due_at, investor_notes, admin_notes, created_at",
    )
    .order("created_at", { ascending: false });

  const allocations = (allocationsRaw ?? []) as AllocationRequest[];
  const listingIds = unique(allocations.map((row) => row.listing_id));
  const profileIds = unique(allocations.map((row) => row.profile_id));
  const accountIds = unique(
    allocations.map((row) => row.account_id).filter(Boolean) as string[],
  );

  const [{ data: listingsRaw }, { data: profilesRaw }, { data: accountsRaw }] =
    await Promise.all([
      listingIds.length
        ? supabase
            .from("listings")
            .select(
              "id, amount, remaining_amount, yield_pct, net_investor_rate_pct, servicing_spread_pct, lien_position, property_type, city, state, status",
            )
            .in("id", listingIds)
        : Promise.resolve({ data: [] }),
      profileIds.length
        ? supabase
            .from("profiles")
            .select("user_id, full_name, email, phone")
            .in("user_id", profileIds)
        : Promise.resolve({ data: [] }),
      accountIds.length
        ? supabase
            .from("investor_accounts")
            .select("id, account_type, custodian, vesting_string")
            .in("id", accountIds)
        : Promise.resolve({ data: [] }),
    ]);

  const listings = new Map(
    ((listingsRaw ?? []) as ListingRow[]).map((row) => [row.id, row]),
  );
  const profiles = new Map(
    ((profilesRaw ?? []) as ProfileRow[]).map((row) => [row.user_id, row]),
  );
  const accounts = new Map(
    ((accountsRaw ?? []) as AccountRow[]).map((row) => [row.id, row]),
  );

  const activeStatuses = new Set([
    "new",
    "called",
    "qualified",
    "docs_sent",
    "committed",
    "funds_received",
    "assigned",
  ]);
  const activeRequests = allocations.filter((row) => activeStatuses.has(row.status));
  const activeRequested = activeRequests.reduce(
    (sum, row) => sum + Number(row.requested_amount),
    0,
  );
  const activeApproved = activeRequests.reduce(
    (sum, row) => sum + Number(row.approved_amount ?? 0),
    0,
  );

  return (
    <main className="container-cdf py-12 space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-heading-lg font-heading">Allocation pipeline</h1>
          <p className="text-base text-ivory/70">
            Track investor interest from request through commitment, funds,
            assignment, and servicing boarding.
          </p>
        </div>
        <Link href="/admin/listings" className="text-champagne-300 underline">
          Back to listings
        </Link>
      </header>

      <section className="grid sm:grid-cols-3 gap-4">
        <Metric label="Active requests" value={String(activeRequests.length)} />
        <Metric label="Requested dollars" value={money(activeRequested)} />
        <Metric label="Approved dollars" value={money(activeApproved)} />
      </section>

      {!allocations.length && (
        <p className="rounded-lg border border-champagne-700/30 bg-ink-900 p-8 text-lg">
          No allocation requests yet.
        </p>
      )}

      <div className="space-y-4">
        {allocations.map((request) => {
          const listing = listings.get(request.listing_id);
          const profile = profiles.get(request.profile_id);
          const account = request.account_id ? accounts.get(request.account_id) : null;

          return (
            <section
              key={request.id}
              className="rounded-lg border border-champagne-700/30 bg-ink-900 p-6 space-y-5"
            >
              <header className="grid gap-4 lg:grid-cols-[1.25fr_1fr_1fr]">
                <div>
                  <p className="text-sm uppercase tracking-widest text-champagne-300">
                    {statusLabel(request.status)}
                  </p>
                  <h2 className="text-heading-sm font-heading">
                    {profile?.full_name ?? "Unknown investor"}
                  </h2>
                  <p className="text-sm text-ivory/65">
                    {profile?.email ?? "No email"} {profile?.phone ? `· ${profile.phone}` : ""}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-ivory/55">Listing</p>
                  {listing ? (
                    <>
                      <Link
                        href={`/admin/listings/${listing.id}/edit`}
                        className="text-base text-champagne-300 underline"
                      >
                        {lienPositionLabel(listing.lien_position)} TD ·{" "}
                        {listing.property_type} · {listing.city}, {listing.state}
                      </Link>
                      <p className="text-sm text-ivory/65">
                        {pct(listing.net_investor_rate_pct ?? listing.yield_pct)} net ·{" "}
                        {pct(listing.servicing_spread_pct ?? 1)} spread ·{" "}
                        {listingStatusLabel(listing.status)}
                      </p>
                    </>
                  ) : (
                    <p className="text-base text-ivory/65">Listing missing</p>
                  )}
                </div>
                <dl className="grid grid-cols-2 gap-3 text-base">
                  <div>
                    <dt className="text-ivory/55">Requested</dt>
                    <dd className="text-xl font-heading tabular-nums">
                      {money(request.requested_amount)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ivory/55">Approved</dt>
                    <dd className="text-xl font-heading tabular-nums">
                      {money(request.approved_amount)}
                    </dd>
                  </div>
                </dl>
              </header>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded border border-champagne-700/20 bg-ink-950 p-4 text-base">
                  <p className="text-sm uppercase tracking-widest text-ivory/50 mb-2">
                    Account / notes
                  </p>
                  <p>
                    {account
                      ? `${accountTypeLabel(account.account_type)} - ${custodianLabel(
                          account.custodian,
                        )}`
                      : "Account setup needed"}
                  </p>
                  {account && (
                    <p className="text-sm text-ivory/65 mt-1">{account.vesting_string}</p>
                  )}
                  {request.investor_notes && (
                    <p className="mt-3 text-sm text-ivory/75">{request.investor_notes}</p>
                  )}
                  <p className="mt-3 text-xs text-ivory/50">
                    Source: {request.source} · Created {shortDate(request.created_at)}
                  </p>
                </div>

                <form action={updateAllocationRequest} className="grid gap-3 sm:grid-cols-2">
                  <input type="hidden" name="allocation_id" value={request.id} />
                  <label>
                    <span className="block text-sm text-ivory/60 mb-1">Status</span>
                    <select
                      name="status"
                      defaultValue={request.status}
                      className={inputClass}
                    >
                      {STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {statusLabel(status)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="block text-sm text-ivory/60 mb-1">Approved amount</span>
                    <input
                      name="approved_amount"
                      defaultValue={request.approved_amount ?? ""}
                      className={inputClass}
                      inputMode="decimal"
                    />
                  </label>
                  <label>
                    <span className="block text-sm text-ivory/60 mb-1">Due date</span>
                    <input
                      type="date"
                      name="due_at"
                      defaultValue={request.due_at ?? ""}
                      className={inputClass}
                    />
                  </label>
                  <label>
                    <span className="block text-sm text-ivory/60 mb-1">Next action</span>
                    <input
                      name="next_action"
                      defaultValue={request.next_action ?? ""}
                      className={inputClass}
                    />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="block text-sm text-ivory/60 mb-1">Admin notes</span>
                    <textarea
                      name="admin_notes"
                      rows={3}
                      defaultValue={request.admin_notes ?? ""}
                      className={inputClass}
                    />
                  </label>
                  <button
                    type="submit"
                    className="sm:col-span-2 rounded bg-champagne-500 px-4 py-3 text-base font-semibold text-ink-900"
                  >
                    Update request
                  </button>
                </form>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

function unique(values: string[]) {
  return Array.from(new Set(values));
}

function statusLabel(status: string) {
  return status
    .split("_")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-champagne-700/30 bg-ink-900 p-5">
      <p className="text-sm text-ivory/60">{label}</p>
      <p className="mt-1 text-3xl font-heading text-champagne-300 tabular-nums">
        {value}
      </p>
    </div>
  );
}

const inputClass =
  "w-full min-h-11 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base text-ivory focus:outline-none focus:ring-2 focus:ring-champagne-400";
