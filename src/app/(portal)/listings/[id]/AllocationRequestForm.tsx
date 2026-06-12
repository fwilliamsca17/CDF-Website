"use client";

import { useActionState } from "react";
import {
  AllocationRequestState,
  submitAllocationRequest,
} from "./actions";
import { accountTypeLabel, custodianLabel, money } from "@/lib/portal/format";

type Account = {
  id: string;
  account_type: string;
  custodian: string;
  vesting_string: string;
};

type ExistingRequest = {
  id: string;
  account_id: string | null;
  requested_amount: number;
  approved_amount: number | null;
  status: string;
};

const initialState: AllocationRequestState = { ok: false, msg: null };

function statusLabel(status: string) {
  return status
    .split("_")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export default function AllocationRequestForm({
  listingId,
  accounts,
  existingRequests,
  minInvestment,
  remainingAmount,
}: {
  listingId: string;
  accounts: Account[];
  existingRequests: ExistingRequest[];
  minInvestment: number | null;
  remainingAmount: number | null;
}) {
  const [state, formAction] = useActionState(submitAllocationRequest, initialState);
  const defaultAmount = minInvestment ?? remainingAmount ?? "";
  const inputClass =
    "w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base text-ivory focus:outline-none focus:ring-2 focus:ring-champagne-400";

  return (
    <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-8 mb-8 space-y-6">
      <header>
        <h2 className="text-heading font-heading mb-2">Request allocation</h2>
        <p className="text-base text-ivory/75">
          Submit the amount you want reviewed. This starts a CDF principal review
          and is not an investment commitment.
        </p>
      </header>

      {existingRequests.length > 0 && (
        <div className="rounded border border-champagne-700/30 bg-ink-950 p-4">
          <p className="text-sm uppercase tracking-widest text-champagne-300 mb-2">
            Existing requests
          </p>
          <ul className="space-y-2 text-base">
            {existingRequests.map((request) => (
              <li key={request.id} className="flex flex-wrap justify-between gap-3">
                <span>{statusLabel(request.status)}</span>
                <span className="tabular-nums">
                  Requested {money(request.requested_amount)}
                  {request.approved_amount
                    ? ` / approved ${money(request.approved_amount)}`
                    : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="listing_id" value={listingId} />

        <label className="block">
          <span className="block text-base mb-2">Account / vesting</span>
          <select name="account_id" className={inputClass} defaultValue={accounts[0]?.id ?? ""}>
            {!accounts.length && <option value="">Set up account with CDF</option>}
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {accountTypeLabel(account.account_type)} - {custodianLabel(account.custodian)} -{" "}
                {account.vesting_string}
              </option>
            ))}
          </select>
        </label>

        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="block text-base mb-2">Requested amount</span>
            <input
              name="requested_amount"
              required
              inputMode="decimal"
              defaultValue={defaultAmount}
              className={inputClass}
            />
          </label>
          <div className="rounded border border-champagne-700/20 bg-ink-950 p-4 text-sm text-ivory/70">
            {minInvestment ? <p>Minimum: {money(minInvestment)}</p> : null}
            {remainingAmount ? <p>Remaining: {money(remainingAmount)}</p> : null}
          </div>
        </div>

        <label className="block">
          <span className="block text-base mb-2">Notes for CDF</span>
          <textarea
            name="investor_notes"
            rows={3}
            className={inputClass}
            placeholder="Entity, IRA/Solo 401(k), timing, questions, or preferred call time."
          />
        </label>

        {state.msg && (
          <p
            role={state.ok ? "status" : "alert"}
            className={`rounded border p-3 text-sm ${
              state.ok
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-100"
                : "border-red-400/40 bg-red-500/10 text-red-100"
            }`}
          >
            {state.msg}
          </p>
        )}

        <button
          type="submit"
          className="rounded bg-champagne-500 px-5 py-3 text-base font-semibold text-ink-900"
        >
          Submit allocation request
        </button>
      </form>
    </section>
  );
}
