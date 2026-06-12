import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import PortalHeader from "@/components/portal/PortalHeader";
import SyntheticBanner from "@/components/portal/SyntheticBanner";

export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const [{ data: profile }, { data: admin }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, role, approval_status")
      .eq("user_id", user.id)
      .single(),
    supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle(),
  ]);

  if (!profile || profile.approval_status !== "approved") {
    redirect("/dashboard");
  }

  const role: "investor" | "borrower" | "both" | "admin" = admin
    ? "admin"
    : (profile.role as "investor" | "borrower" | "both");

  return (
    <div className="min-h-screen bg-ink-950 text-ivory">
      <SyntheticBanner />
      <PortalHeader role={role} fullName={profile.full_name} />
      <div>{children}</div>
    </div>
  );
}
