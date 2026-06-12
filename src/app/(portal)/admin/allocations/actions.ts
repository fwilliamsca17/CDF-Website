"use server";

import { revalidatePath } from "next/cache";
import {
  asNullableNumber,
  asNullableString,
  asString,
  requireAdminAction,
} from "../admin-utils";

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

export async function updateAllocationRequest(formData: FormData) {
  const { supabase } = await requireAdminAction();
  const id = asString(formData.get("allocation_id"));
  const status = asString(formData.get("status"));
  if (!id) throw new Error("allocation_id required");
  if (!STATUSES.includes(status)) throw new Error("Invalid allocation status");

  const approvedAmount = asNullableNumber(formData.get("approved_amount"), "Approved amount");
  if (approvedAmount !== null && approvedAmount < 0) {
    throw new Error("Approved amount cannot be negative");
  }

  const dueAt = asNullableString(formData.get("due_at"));
  const { error } = await supabase
    .from("allocation_requests")
    .update({
      status,
      approved_amount: approvedAmount,
      next_action: asNullableString(formData.get("next_action")),
      due_at: dueAt,
      admin_notes: asNullableString(formData.get("admin_notes")),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/allocations");
  revalidatePath("/admin");
}
