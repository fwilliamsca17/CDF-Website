"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSupabaseServiceClient,
} from "@/lib/supabase/server";
import { DRE_LICENSE_LINE, CDF_PHONE } from "@/lib/portal/constants";
import { lienPositionLabel, money, pct } from "@/lib/portal/format";
import {
  asNullableNumber,
  asNullableString,
  asNumber,
  asString,
  checked,
  requireAdminAction,
} from "../admin-utils";

type ListingForAlert = {
  id: string;
  amount: number | string;
  remaining_amount: number | string | null;
  yield_pct: number | string;
  lien_position: number;
  property_type: string;
  city: string;
  state: string;
  ltv_pct: number | string | null;
  cltv_pct: number | string | null;
  term_months: number | null;
  amortization: string | null;
  prepay_months: number | null;
  occupancy: string | null;
  status: string;
  rate_increase: boolean;
};

function listingPayload(formData: FormData) {
  const status = asString(formData.get("status")) || "available";
  if (!["available", "partially_placed", "pending", "funded"].includes(status)) {
    throw new Error("Invalid listing status");
  }

  const state = asString(formData.get("state")).toUpperCase();
  if (!/^[A-Z]{2}$/.test(state)) throw new Error("State must be two letters");

  return {
    listing: {
      amount: asNumber(formData.get("amount"), "Loan amount"),
      remaining_amount: asNullableNumber(formData.get("remaining_amount"), "Remaining amount"),
      yield_pct: asNumber(formData.get("yield_pct"), "Yield"),
      lien_position: asNumber(formData.get("lien_position"), "Lien position"),
      property_type: asString(formData.get("property_type")),
      city: asString(formData.get("city")),
      state,
      ltv_pct: asNullableNumber(formData.get("ltv_pct"), "LTV"),
      cltv_pct: asNullableNumber(formData.get("cltv_pct"), "CLTV"),
      term_months: asNullableNumber(formData.get("term_months"), "Term"),
      amortization: asNullableString(formData.get("amortization")),
      prepay_months: asNullableNumber(formData.get("prepay_months"), "Prepay"),
      occupancy: asNullableString(formData.get("occupancy")),
      status,
      rate_increase: checked(formData.get("rate_increase")),
      compliance_approved: checked(formData.get("compliance_approved")),
    },
    privateRow: {
      address: asString(formData.get("address")),
      appraised_value: asNullableNumber(formData.get("appraised_value"), "Appraised value"),
      purpose: asNullableString(formData.get("purpose")),
      borrower_notes: asNullableString(formData.get("borrower_notes")),
    },
  };
}

function validateListingInputs(payload: ReturnType<typeof listingPayload>) {
  const l = payload.listing;
  const p = payload.privateRow;
  if (!l.property_type) throw new Error("Property type is required");
  if (!l.city) throw new Error("City is required");
  if (!p.address) throw new Error("Address is required");
  if (l.lien_position < 1 || l.lien_position > 3) {
    throw new Error("Lien position must be 1, 2, or 3");
  }
  if (l.amount <= 0 || l.yield_pct <= 0) {
    throw new Error("Loan amount and yield must be positive");
  }
  if (l.remaining_amount !== null && l.remaining_amount < 0) {
    throw new Error("Remaining amount cannot be negative");
  }
}

function alertBody(listing: ListingForAlert) {
  const terms = [
    ["Loan amount", money(listing.amount)],
    ["Remaining amount", money(listing.remaining_amount)],
    ["Yield", pct(listing.yield_pct)],
    ["Lien position", lienPositionLabel(listing.lien_position)],
    ["Property type", listing.property_type],
    ["Location", `${listing.city}, ${listing.state}`],
    ["LTV", pct(listing.ltv_pct)],
    ["CLTV", pct(listing.cltv_pct)],
    ["Term", listing.term_months ? `${listing.term_months} months` : "-"],
    ["Amortization", listing.amortization ?? "-"],
    ["Prepay", listing.prepay_months ? `${listing.prepay_months} months` : "None"],
    ["Occupancy", listing.occupancy ?? "-"],
  ];

  const rows = terms
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0">${label}</th><td style="padding:6px 0">${value}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5">
      <p><strong>SANDBOX - synthetic data only.</strong></p>
      <p>A CDF trust deed listing is available for member review.</p>
      <table style="border-collapse:collapse">${rows}</table>
      <p>Call ${CDF_PHONE} to discuss the opportunity before making any decision.</p>
      <p style="font-size:12px;color:#4b5563">${DRE_LICENSE_LINE}</p>
    </div>
  `;
}

async function sendListingAlerts(listingId: string, reason: "published" | "rate_increase") {
  const service = createSupabaseServiceClient();
  const [{ data: listing }, { data: recipients }] = await Promise.all([
    service.from("listings").select("*").eq("id", listingId).single(),
    service
      .from("profiles")
      .select("user_id, email, full_name")
      .eq("approval_status", "approved")
      .eq("email_alerts", true)
      .in("role", ["investor", "both"]),
  ]);

  if (!listing || !recipients?.length) return;

  const subject =
    reason === "rate_increase"
      ? `SYNTHETIC rate increase: ${pct(listing.yield_pct)} ${listing.city}, ${listing.state}`
      : `SYNTHETIC new CDF listing: ${pct(listing.yield_pct)} ${listing.city}, ${listing.state}`;
  const body_html = alertBody(listing as ListingForAlert);
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? "CDF Investor Group <listings@capital-df.com>";

  for (const r of recipients) {
    let delivery_status = "skipped_no_resend_key";
    if (apiKey && r.email) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to: [r.email],
            subject,
            html: body_html,
          }),
        });
        delivery_status = res.ok ? "sent" : "failed";
      } catch {
        delivery_status = "failed";
      }
    }

    await service.from("sent_alerts").insert({
      listing_id: listingId,
      recipient_id: r.user_id,
      recipient_email: r.email,
      subject,
      body_html,
      delivery_status,
    });
  }
}

export async function saveListing(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const payload = listingPayload(formData);
  validateListingInputs(payload);

  const id = asNullableString(formData.get("listing_id"));
  let listingId = id;

  if (id) {
    const { error } = await supabase.from("listings").update(payload.listing).eq("id", id);
    if (error) throw new Error(error.message);
    const { error: privateError } = await supabase
      .from("listing_private")
      .upsert({ listing_id: id, ...payload.privateRow });
    if (privateError) throw new Error(privateError.message);
  } else {
    const { data, error } = await supabase
      .from("listings")
      .insert(payload.listing)
      .select("id")
      .single();
    if (error || !data) throw new Error(error?.message ?? "Listing insert failed");
    listingId = data.id;
    const { error: privateError } = await supabase
      .from("listing_private")
      .insert({ listing_id: listingId, ...payload.privateRow });
    if (privateError) throw new Error(privateError.message);
  }

  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  redirect(`/admin/listings/${listingId}/edit`);
}

export async function publishListing(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const id = asString(formData.get("listing_id"));
  if (!id) throw new Error("listing_id required");

  const { data: listing } = await supabase
    .from("listings")
    .select("id, compliance_approved, published_at")
    .eq("id", id)
    .single();
  if (!listing?.compliance_approved) {
    throw new Error("Compliance sign-off is required before publish");
  }

  const firstPublish = !listing.published_at;
  const { error } = await supabase
    .from("listings")
    .update({ published_at: listing.published_at ?? new Date().toISOString(), status: "available" })
    .eq("id", id);
  if (error) throw new Error(error.message);
  if (firstPublish) await sendListingAlerts(id, "published");

  revalidatePath("/admin/listings");
  revalidatePath("/admin/alerts");
  revalidatePath("/listings");
}

export async function toggleRateIncrease(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const id = asString(formData.get("listing_id"));
  const next = checked(formData.get("next"));
  if (!id) throw new Error("listing_id required");
  const { error } = await supabase.from("listings").update({ rate_increase: next }).eq("id", id);
  if (error) throw new Error(error.message);
  if (next) await sendListingAlerts(id, "rate_increase");
  revalidatePath("/admin/listings");
  revalidatePath("/admin/alerts");
  revalidatePath("/listings");
}

export async function markFunded(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const id = asString(formData.get("listing_id"));
  if (!id) throw new Error("listing_id required");
  const { error } = await supabase
    .from("listings")
    .update({ status: "funded", remaining_amount: 0 })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
}

export async function cloneListing(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const id = asString(formData.get("listing_id"));
  if (!id) throw new Error("listing_id required");

  const [{ data: listing }, { data: privateRow }] = await Promise.all([
    supabase.from("listings").select("*").eq("id", id).single(),
    supabase.from("listing_private").select("*").eq("listing_id", id).maybeSingle(),
  ]);
  if (!listing) throw new Error("Listing not found");

  const copy = { ...listing };
  delete copy.id;
  delete copy.created_at;
  delete copy.updated_at;
  delete copy.published_at;
  const { data: cloned, error } = await supabase
    .from("listings")
    .insert({
      ...copy,
      status: "available",
      published_at: null,
      compliance_approved: false,
      rate_increase: false,
    })
    .select("id")
    .single();
  if (error || !cloned) throw new Error(error?.message ?? "Clone failed");

  if (privateRow) {
    const privateCopy = { ...privateRow };
    delete privateCopy.listing_id;
    delete privateCopy.created_at;
    delete privateCopy.updated_at;
    await supabase.from("listing_private").insert({
      ...privateCopy,
      listing_id: cloned.id,
      borrower_notes: privateCopy.borrower_notes
        ? `${privateCopy.borrower_notes} (cloned - verify before publishing)`
        : "Cloned listing - verify all fields before publishing.",
    });
  }

  revalidatePath("/admin/listings");
  redirect(`/admin/listings/${cloned.id}/edit`);
}
