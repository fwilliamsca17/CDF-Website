import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { accountTypeLabel, custodianLabel, shortDate } from "@/lib/portal/format";
import {
  createInvestorAccount,
  updateBorrowerLink,
  updateInvestorLink,
} from "./actions";

export const metadata: Metadata = {
  title: "TMO Linking — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function LinkingPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const [{ data: profiles }, { data: accounts }] = await Promise.all([
    supabase
      .from("profiles")
      .select("user_id, full_name, email, role, tmo_borrower_ref, created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("investor_accounts")
      .select("id, profile_id, account_type, custodian, custodian_account_no, vesting_string, tmo_investor_ref, profiles(full_name, email)")
      .order("created_at", { ascending: true }),
  ]);

  const investorProfiles = (profiles ?? []).filter((p) => p.role === "investor" || p.role === "both");
  const borrowerProfiles = (profiles ?? []).filter((p) => p.role === "borrower" || p.role === "both");

  return (
    <main className="container-cdf py-12 space-y-10">
      <header>
        <h1 className="text-heading-lg font-heading">Manual TMO linking</h1>
        <p className="text-base text-ivory/70">
          Match by confirmed record, then paste the TMO reference. Do not infer by email.
        </p>
      </header>

      <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-4">
        <h2 className="text-heading font-heading">Add investor account</h2>
        <form action={createInvestorAccount} className="grid md:grid-cols-3 gap-4">
          <label>
            <span className="block text-base mb-2">Profile</span>
            <select name="profile_id" required className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base">
              <option value="">Select investor</option>
              {investorProfiles.map((p) => (
                <option key={p.user_id} value={p.user_id}>
                  {p.full_name ?? p.email}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Account type</span>
            <select name="account_type" className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base">
              <option value="individual">Individual</option>
              <option value="joint">Joint</option>
              <option value="trust">Trust</option>
              <option value="entity">Entity</option>
              <option value="sdira">SDIRA</option>
              <option value="solo_401k">Solo 401(k)</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Custodian</span>
            <select name="custodian" className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base">
              <option value="none">None</option>
              <option value="forge_trust">Forge Trust</option>
              <option value="provident_trust_group">Provident Trust Group</option>
              <option value="entrust_group">The Entrust Group</option>
              <option value="other_self_directed">Other self-directed</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Custodian account no.</span>
            <input name="custodian_account_no" className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base" />
          </label>
          <label>
            <span className="block text-base mb-2">TMO investor ref</span>
            <input name="tmo_investor_ref" className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base" />
          </label>
          <label className="md:col-span-3">
            <span className="block text-base mb-2">Exact vesting string</span>
            <input name="vesting_string" required className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base" />
          </label>
          <button className="rounded bg-champagne-500 px-5 py-3 text-base font-semibold text-ink-900 md:w-fit">
            Add account
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <h2 className="text-heading font-heading">Investor account links</h2>
        <div className="overflow-x-auto bg-ink-900 border border-champagne-700/30 rounded-lg">
          <table className="w-full min-w-[840px] text-base">
            <thead className="text-left text-ivory/60 border-b border-champagne-700/20">
              <tr>
                <th scope="col" className="p-3">Investor</th>
                <th scope="col" className="p-3">Account</th>
                <th scope="col" className="p-3">Vesting</th>
                <th scope="col" className="p-3">TMO ref</th>
              </tr>
            </thead>
            <tbody>
              {(accounts ?? []).map((a) => {
                const profile = a.profiles as { full_name?: string | null; email?: string | null } | null;
                return (
                  <tr key={a.id} className="border-b border-champagne-700/10">
                    <td className="p-3">{profile?.full_name ?? profile?.email ?? a.profile_id}</td>
                    <td className="p-3">
                      {accountTypeLabel(a.account_type)} - {custodianLabel(a.custodian)}
                    </td>
                    <td className="p-3">{a.vesting_string}</td>
                    <td className="p-3">
                      <form action={updateInvestorLink} className="flex gap-2">
                        <input type="hidden" name="account_id" value={a.id} />
                        <input
                          name="tmo_investor_ref"
                          defaultValue={a.tmo_investor_ref ?? ""}
                          className="min-h-11 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base"
                        />
                        <button className="rounded border border-champagne-700/40 px-3 py-2 text-sm">
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-heading font-heading">Borrower links</h2>
        <div className="overflow-x-auto bg-ink-900 border border-champagne-700/30 rounded-lg">
          <table className="w-full min-w-[740px] text-base">
            <thead className="text-left text-ivory/60 border-b border-champagne-700/20">
              <tr>
                <th scope="col" className="p-3">Borrower</th>
                <th scope="col" className="p-3">Created</th>
                <th scope="col" className="p-3">TMO borrower ref</th>
              </tr>
            </thead>
            <tbody>
              {borrowerProfiles.map((p) => (
                <tr key={p.user_id} className="border-b border-champagne-700/10">
                  <td className="p-3">
                    {p.full_name ?? p.email}
                    <span className="block text-sm text-ivory/50">{p.email}</span>
                  </td>
                  <td className="p-3">{shortDate(p.created_at)}</td>
                  <td className="p-3">
                    <form action={updateBorrowerLink} className="flex gap-2">
                      <input type="hidden" name="user_id" value={p.user_id} />
                      <input
                        name="tmo_borrower_ref"
                        defaultValue={p.tmo_borrower_ref ?? ""}
                        className="min-h-11 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base"
                      />
                      <button className="rounded border border-champagne-700/40 px-3 py-2 text-sm">
                        Save
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
