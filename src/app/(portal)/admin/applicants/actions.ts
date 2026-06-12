"use server";
import { revalidatePath } from "next/cache";
import {
  createSupabaseServerClient,
  createSupabaseServiceClient,
} from "@/lib/supabase/server";

async function ensureAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthenticated");
  const { data: row } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!row) throw new Error("Forbidden");
  return user;
}

export async function handleApplicant(formData: FormData) {
  await ensureAdmin();
  const service = createSupabaseServiceClient();

  const decision = String(formData.get("decision") ?? "");
  const request_id = formData.get("request_id");
  const user_id = formData.get("user_id");

  if (request_id) {
    if (decision === "dismiss") {
      await service
        .from("access_requests")
        .update({ handled_at: new Date().toISOString() })
        .eq("id", String(request_id));
    } else if (decision === "invite") {
      const { data: req } = await service
        .from("access_requests")
        .select("*")
        .eq("id", String(request_id))
        .single();
      if (req) {
        // Create the auth user (will trigger profile row).
        const { data: created } = await service.auth.admin.createUser({
          email: req.email,
          email_confirm: true,
        });
        if (created?.user) {
          await service
            .from("profiles")
            .update({
              full_name: req.full_name,
              phone: req.phone,
              role: "investor",
              approval_status: "pending",
            })
            .eq("user_id", created.user.id);
        }
        await service
          .from("access_requests")
          .update({ handled_at: new Date().toISOString() })
          .eq("id", String(request_id));
      }
    }
  }

  if (user_id) {
    const next = decision === "approve" ? "approved" : "rejected";
    await service
      .from("profiles")
      .update({ approval_status: next })
      .eq("user_id", String(user_id));
  }

  revalidatePath("/admin/applicants");
  revalidatePath("/admin");
}
