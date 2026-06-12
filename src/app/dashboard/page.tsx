import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Dashboard router — sends every authenticated user to the right place
 * based on role + approval status. Single landing point post-login so
 * we never have to update three places when destinations change.
 */
export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("approval_status, role")
    .eq("user_id", user.id)
    .single();

  if (!profile || profile.approval_status === "pending") {
    redirect("/dashboard/pending");
  }
  if (profile.approval_status === "rejected") {
    redirect("/dashboard/declined");
  }

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();
  if (admin) redirect("/admin");

  if (profile.role === "investor" || profile.role === "both") {
    redirect("/listings");
  }
  if (profile.role === "borrower") {
    redirect("/loans");
  }
  redirect("/dashboard/pending");
}
