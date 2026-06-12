"use server";

import { revalidatePath } from "next/cache";
import { asNullableString, asString, requireAdminAction } from "../admin-utils";

export async function updateInvestorLink(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const accountId = asString(formData.get("account_id"));
  if (!accountId) throw new Error("account_id required");
  const { error } = await supabase
    .from("investor_accounts")
    .update({
      tmo_investor_ref: asNullableString(formData.get("tmo_investor_ref")),
    })
    .eq("id", accountId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/linking");
}

export async function updateBorrowerLink(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const userId = asString(formData.get("user_id"));
  if (!userId) throw new Error("user_id required");
  const { error } = await supabase
    .from("profiles")
    .update({
      tmo_borrower_ref: asNullableString(formData.get("tmo_borrower_ref")),
    })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/linking");
}

export async function createInvestorAccount(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const profileId = asString(formData.get("profile_id"));
  const accountType = asString(formData.get("account_type")) || "individual";
  const custodian = asString(formData.get("custodian")) || "none";
  const vesting = asString(formData.get("vesting_string"));
  if (!profileId || !vesting) throw new Error("Profile and vesting are required");

  const { error } = await supabase.from("investor_accounts").insert({
    profile_id: profileId,
    account_type: accountType,
    custodian,
    custodian_account_no: asNullableString(formData.get("custodian_account_no")),
    vesting_string: vesting,
    tmo_investor_ref: asNullableString(formData.get("tmo_investor_ref")),
  });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/linking");
}
