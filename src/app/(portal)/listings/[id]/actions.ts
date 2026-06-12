"use server";

import { revalidatePath } from "next/cache";
import { requireApprovedInvestor } from "@/lib/supabase/server";

export type AllocationRequestState = {
  ok: boolean;
  msg: string | null;
};

const OPEN_ALLOCATION_STATUSES = [
  "new",
  "called",
  "qualified",
  "docs_sent",
  "committed",
  "funds_received",
  "assigned",
];

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function amount(value: FormDataEntryValue | null) {
  const raw = text(value).replace(/[$,]/g, "");
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export async function submitAllocationRequest(
  _prevState: AllocationRequestState,
  formData: FormData,
): Promise<AllocationRequestState> {
  const guard = await requireApprovedInvestor();
  if ("redirectTo" in guard) {
    return { ok: false, msg: "Please sign in with an approved investor account." };
  }

  const { supabase, user } = guard;
  const listingId = text(formData.get("listing_id"));
  const accountId = text(formData.get("account_id")) || null;
  const requestedAmount = amount(formData.get("requested_amount"));
  const investorNotes = text(formData.get("investor_notes")) || null;

  if (!listingId || !requestedAmount || requestedAmount <= 0) {
    return { ok: false, msg: "Enter a requested allocation amount." };
  }

  const { data: listing } = await supabase
    .from("listings")
    .select("id, remaining_amount, min_investment, compliance_approved, published_at, status")
    .eq("id", listingId)
    .maybeSingle();

  if (
    !listing ||
    !listing.compliance_approved ||
    !listing.published_at ||
    !["available", "partially_placed"].includes(listing.status)
  ) {
    return { ok: false, msg: "That listing is not currently accepting allocation requests." };
  }

  if (listing.min_investment && requestedAmount < Number(listing.min_investment)) {
    return {
      ok: false,
      msg: `Requested amount must be at least $${Number(listing.min_investment).toLocaleString()}.`,
    };
  }

  if (listing.remaining_amount && requestedAmount > Number(listing.remaining_amount)) {
    return {
      ok: false,
      msg: `Requested amount cannot exceed the remaining $${Number(listing.remaining_amount).toLocaleString()}.`,
    };
  }

  if (accountId) {
    const { data: account } = await supabase
      .from("investor_accounts")
      .select("id")
      .eq("id", accountId)
      .maybeSingle();
    if (!account) {
      return { ok: false, msg: "Select one of your linked investor accounts." };
    }
  }

  let existingQuery = supabase
    .from("allocation_requests")
    .select("id, status")
    .eq("listing_id", listingId)
    .eq("profile_id", user.id)
    .in("status", OPEN_ALLOCATION_STATUSES)
    .limit(1);

  existingQuery = accountId
    ? existingQuery.eq("account_id", accountId)
    : existingQuery.is("account_id", null);

  const { data: existing } = await existingQuery.maybeSingle();

  if (existing) {
    return {
      ok: true,
      msg: "We already have an open allocation request for this listing and account.",
    };
  } else {
    const { error } = await supabase.from("allocation_requests").insert({
      listing_id: listingId,
      profile_id: user.id,
      account_id: accountId,
      requested_amount: requestedAmount,
      investor_notes: investorNotes,
      source: "listing_detail",
      status: "new",
    });
    if (error) return { ok: false, msg: error.message };
  }

  revalidatePath(`/listings/${listingId}`);
  revalidatePath("/admin/allocations");
  revalidatePath("/admin");

  return {
    ok: true,
    msg: "Allocation request received. A CDF principal will review it before anything becomes binding.",
  };
}
