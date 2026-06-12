import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { shortDate } from "@/lib/portal/format";
import { handleApplicant } from "./actions";

export const metadata: Metadata = {
  title: "Applicants — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function ApplicantsPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo);
  const { supabase } = guard;

  const { data: requests } = await supabase
    .from("access_requests")
    .select("*")
    .is("handled_at", null)
    .order("created_at", { ascending: true });

  const { data: pendingProfiles } = await supabase
    .from("profiles")
    .select("user_id, full_name, email, phone, role, created_at")
    .eq("approval_status", "pending");

  return (
    <main className="container-cdf py-12 space-y-12">
      <section>
        <h1 className="text-heading-lg font-heading mb-6">Pending access requests</h1>
        {!requests?.length && (
          <p className="text-base p-6 bg-ink-900 border border-champagne-700/30 rounded-lg">
            No new requests.
          </p>
        )}
        <ul className="space-y-4">
          {requests?.map((r) => (
            <li
              key={r.id}
              className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6"
            >
              <div className="flex justify-between flex-wrap gap-2 mb-2">
                <div>
                  <p className="text-lg font-semibold">{r.full_name}</p>
                  <p className="text-base text-ivory/70">
                    {r.email} {r.phone ? `· ${r.phone}` : ""}
                  </p>
                </div>
                <p className="text-sm text-ivory/60">
                  Requested {shortDate(r.created_at)} · {r.how_they_invest ?? "—"}
                </p>
              </div>
              {r.message && <p className="text-base mt-2 italic">{r.message}</p>}
              <form action={handleApplicant} className="mt-4 flex flex-wrap gap-3">
                <input type="hidden" name="request_id" value={r.id} />
                <button
                  type="submit"
                  name="decision"
                  value="invite"
                  className="text-base bg-champagne-500 text-ink-900 font-semibold px-4 py-2 rounded hover:bg-champagne-400"
                >
                  Invite (create account)
                </button>
                <button
                  type="submit"
                  name="decision"
                  value="dismiss"
                  className="text-base border border-champagne-700/40 text-ivory px-4 py-2 rounded hover:bg-white/5"
                >
                  Dismiss
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-heading font-heading mb-4">Pending invited accounts</h2>
        {!pendingProfiles?.length && (
          <p className="text-base p-6 bg-ink-900 border border-champagne-700/30 rounded-lg">
            No invited accounts waiting for approval.
          </p>
        )}
        <ul className="space-y-3">
          {pendingProfiles?.map((p) => (
            <li
              key={p.user_id}
              className="bg-ink-900 border border-champagne-700/30 rounded-lg p-4 flex flex-wrap items-center justify-between gap-3"
            >
              <div>
                <p className="text-base font-semibold">{p.full_name ?? p.email}</p>
                <p className="text-sm text-ivory/60">
                  {p.email} · role: {p.role}
                </p>
              </div>
              <form action={handleApplicant} className="flex gap-2">
                <input type="hidden" name="user_id" value={p.user_id} />
                <button
                  type="submit"
                  name="decision"
                  value="approve"
                  className="text-sm bg-champagne-500 text-ink-900 font-semibold px-3 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  type="submit"
                  name="decision"
                  value="reject"
                  className="text-sm border border-champagne-700/40 px-3 py-2 rounded"
                >
                  Reject
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
