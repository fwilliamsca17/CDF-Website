"use server";

import { revalidatePath } from "next/cache";
import {
  asNullableNumber,
  asNullableString,
  asString,
  checked,
  requireAdminAction,
} from "../admin-utils";

const STATUSES = [
  "not_started",
  "needs_review",
  "ready_to_offer",
  "blocked",
  "boarded",
] as const;

const CHECKBOX_FIELDS = [
  "source_file_reviewed",
  "pricing_approved",
  "investor_packet_ready",
  "documents_scrubbed",
  "counsel_reviewed",
  "lender_account_ready",
  "tmo_funding_lender_added",
  "tmo_lender_rate_verified",
  "principal_to_lender_verified",
  "rounding_adjustment_confirmed",
  "disbursement_verified",
  "funds_received",
  "assignment_sent",
  "assignment_signed",
  "assignment_recorded",
  "assignment_boarded",
] as const;

type CheckboxField = (typeof CHECKBOX_FIELDS)[number];

export async function saveSaleReadiness(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const listingId = asString(formData.get("listing_id"));
  if (!listingId) throw new Error("listing_id required");

  const status = asString(formData.get("status")) || "needs_review";
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) {
    throw new Error("Invalid readiness status");
  }

  const noteRatePct = asNullableNumber(formData.get("note_rate_pct"), "Note rate");
  const netInvestorRatePct = asNullableNumber(
    formData.get("net_investor_rate_pct"),
    "Net investor rate",
  );
  const servicingSpreadPct =
    asNullableNumber(formData.get("servicing_spread_pct"), "Servicing spread") ?? 1;
  const targetSalePrincipal = asNullableNumber(
    formData.get("target_sale_principal"),
    "Target sale principal",
  );
  const fundRetainedPrincipal = asNullableNumber(
    formData.get("fund_retained_principal"),
    "Fund retained principal",
  );

  if (noteRatePct !== null && noteRatePct <= 0) throw new Error("Note rate must be positive");
  if (netInvestorRatePct !== null && netInvestorRatePct <= 0) {
    throw new Error("Net investor rate must be positive");
  }
  if (servicingSpreadPct < 0) throw new Error("Servicing spread cannot be negative");
  if (targetSalePrincipal !== null && targetSalePrincipal < 0) {
    throw new Error("Target sale principal cannot be negative");
  }
  if (fundRetainedPrincipal !== null && fundRetainedPrincipal < 0) {
    throw new Error("Fund retained principal cannot be negative");
  }

  const checkboxValues = CHECKBOX_FIELDS.reduce(
    (acc, field) => ({ ...acc, [field]: checked(formData.get(field)) }),
    {} as Record<CheckboxField, boolean>,
  );

  const payload = {
    listing_id: listingId,
    tmo_loan_ref: asNullableString(formData.get("tmo_loan_ref")),
    whole_loan_principal: asNullableNumber(
      formData.get("whole_loan_principal"),
      "Whole loan principal",
    ),
    fund_owned_principal: asNullableNumber(
      formData.get("fund_owned_principal"),
      "Fund owned principal",
    ),
    fund_owned_pct: asNullableNumber(formData.get("fund_owned_pct"), "Fund owned percent"),
    target_sale_principal: targetSalePrincipal,
    fund_retained_principal: fundRetainedPrincipal,
    note_rate_pct: noteRatePct,
    net_investor_rate_pct: netInvestorRatePct,
    servicing_spread_pct: servicingSpreadPct,
    tmo_rate_modifier_pct:
      asNullableNumber(formData.get("tmo_rate_modifier_pct"), "TMO rate modifier") ?? -1,
    status,
    next_action: asNullableString(formData.get("next_action")),
    blocker_notes: asNullableString(formData.get("blocker_notes")),
    ...checkboxValues,
  };

  const { error } = await supabase
    .from("loan_sale_readiness")
    .upsert(payload, { onConflict: "listing_id" });
  if (error) throw new Error(error.message);

  const listingUpdate: Record<string, number | null> = {
    borrower_note_rate_pct: noteRatePct,
    net_investor_rate_pct: netInvestorRatePct,
    servicing_spread_pct: servicingSpreadPct,
    fund_retained_amount: fundRetainedPrincipal,
  };
  if (targetSalePrincipal !== null) {
    listingUpdate.amount = targetSalePrincipal;
    listingUpdate.remaining_amount = targetSalePrincipal;
  }

  const { error: listingError } = await supabase
    .from("listings")
    .update(listingUpdate)
    .eq("id", listingId);
  if (listingError) throw new Error(listingError.message);

  revalidatePath("/admin/sale-readiness");
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
}
