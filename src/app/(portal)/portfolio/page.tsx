import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireApprovedInvestor } from "@/lib/supabase/server";
import {
  money,
  pct,
  shortDate,
  accountTypeLabel,
  custodianLabel,
} from "@/lib/portal/format";
import {
  SERVICING_FOOTER,
  FRESHNESS_NAG_DAYS,
} from "@/lib/portal/constants";

export const metadata: Metadata = {
  title: "My Portfolio — CDF Investor Group",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

interface Position {
  id: string;
  account_id: string;
  loan_ref: string;
  ownership_pct: number | null;
  invested_principal: number;
  current_balance: number;
  rate_pct: number;
  status: string | null;
}
interface Tx {
  id: string;
  account_id: string;
  loan_ref: string;
  tx_date: string;
  tx_type: string;
  amount: number;
}
interface Account {
  id: string;
  account_type: string;
  custodian: string;
  vesting_string: string;
}

function ytdSum(tx: Tx[], year: number, accountId: string) {
  return tx
    .filter((t) => t.account_id === accountId && new Date(t.tx_date).getFullYear() === year)
    .reduce((a, b) => a + Number(b.amount), 0);
}
function lifetimeSum(tx: Tx[], accountId: string) {
  return tx
    .filter((t) => t.account_id === accountId)
    .reduce((a, b) => a + Number(b.amount), 0);
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string }>;
}) {
  const guard = await requireApprovedInvestor();
  if ("redirectTo" in guard) redirect(guard.redirectTo);
  const { supabase } = guard;
  const sp = await searchParams;

  const [{ data: accounts }, { data: positions }, { data: transactions }, { data: lastBatch }] = await Promise.all([
    supabase
      .from("investor_accounts")
      .select("id, account_type, custodian, vesting_string")
      .order("created_at", { ascending: true }),
    supabase
      .from("investor_positions")
      .select(
        "id, account_id, loan_ref, ownership_pct, invested_principal, current_balance, rate_pct, status"
      ),
    supabase
      .from("investor_transactions")
      .select("id, account_id, loan_ref, tx_date, tx_type, amount")
      .order("tx_date", { ascending: false }),
    supabase
      .from("import_batches")
      .select("uploaded_at")
      .eq("status", "committed")
      .order("uploaded_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const acctList = (accounts ?? []) as Account[];
  const posList = (positions ?? []) as Position[];
  const txList = (transactions ?? []) as Tx[];

  const allYears = Array.from(
    new Set(txList.map((t) => new Date(t.tx_date).getFullYear()))
  ).sort((a, b) => b - a);
  const thisYear = new Date().getFullYear();
  const selectedYear = sp.year ? Number(sp.year) : thisYear;
  const yearFilteredTx = txList.filter(
    (t) => new Date(t.tx_date).getFullYear() === selectedYear
  );

  const lastImportDate = lastBatch?.uploaded_at ? new Date(lastBatch.uploaded_at) : null;
  const importIsStale =
    !lastImportDate ||
    Date.now() - lastImportDate.getTime() > FRESHNESS_NAG_DAYS * 86400000;

  return (
    <main className="container-cdf py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="text-heading-lg font-heading">My Portfolio</h1>
        <p className="text-sm text-ivory/70">
          As of{" "}
          {lastImportDate ? shortDate(lastImportDate) : "—"} per CDF
          servicing records. {SERVICING_FOOTER}
        </p>
        {importIsStale && (
          <p
            role="status"
            className="text-sm bg-amber-500/15 border border-amber-400/40 text-amber-100 rounded p-3"
          >
            Servicing data has not been refreshed in over {FRESHNESS_NAG_DAYS}{" "}
            days. Numbers may not reflect the latest payments. Your
            mailed statement remains the official record.
          </p>
        )}
      </header>

      {!acctList.length && (
        <p className="text-lg p-8 bg-ink-900 border border-champagne-700/30 rounded-lg">
          No accounts linked yet. We&rsquo;ll link your TMO account once
          your first investment closes.
        </p>
      )}

      {acctList.map((acct) => {
        const positionsForAcct = posList.filter((p) => p.account_id === acct.id);
        return (
          <section
            key={acct.id}
            className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-4"
          >
            <header>
              <h2 className="text-heading font-heading">
                {accountTypeLabel(acct.account_type)} — {custodianLabel(acct.custodian)}
              </h2>
              <p className="text-sm text-ivory/60">{acct.vesting_string}</p>
            </header>

            <dl className="grid sm:grid-cols-3 gap-4 text-base">
              <div>
                <dt className="text-ivory/60">Principal outstanding</dt>
                <dd
                  className="text-2xl font-heading text-champagne-300"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {money(
                    positionsForAcct.reduce(
                      (a, p) => a + Number(p.current_balance),
                      0
                    )
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-ivory/60">Interest received (lifetime)</dt>
                <dd
                  className="text-2xl font-heading"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {money(lifetimeSum(txList, acct.id))}
                </dd>
              </div>
              <div>
                <dt className="text-ivory/60">Interest received ({thisYear} YTD)</dt>
                <dd
                  className="text-2xl font-heading"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {money(ytdSum(txList, thisYear, acct.id))}
                </dd>
              </div>
            </dl>

            {positionsForAcct.length > 0 && (
              <table className="w-full text-base">
                <caption className="text-left text-sm text-ivory/60 mb-2">
                  Positions held in this account
                </caption>
                <thead className="text-left text-ivory/60 border-b border-champagne-700/20">
                  <tr>
                    <th scope="col" className="py-2">Loan</th>
                    <th scope="col" className="py-2 text-right">Ownership</th>
                    <th scope="col" className="py-2 text-right">Invested</th>
                    <th scope="col" className="py-2 text-right">Balance</th>
                    <th scope="col" className="py-2 text-right">Rate</th>
                    <th scope="col" className="py-2">Status</th>
                  </tr>
                </thead>
                <tbody style={{ fontFeatureSettings: '"tnum"' }}>
                  {positionsForAcct.map((p) => (
                    <tr key={p.id} className="border-b border-champagne-700/10">
                      <th scope="row" className="py-2 font-normal">{p.loan_ref}</th>
                      <td className="py-2 text-right">{pct(p.ownership_pct, 2)}</td>
                      <td className="py-2 text-right">{money(p.invested_principal)}</td>
                      <td className="py-2 text-right">{money(p.current_balance)}</td>
                      <td className="py-2 text-right">{pct(p.rate_pct)}</td>
                      <td className="py-2">{p.status ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        );
      })}

      <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6">
        <header className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-heading font-heading">Payment history</h2>
          {allYears.length > 1 && (
            <form className="text-sm">
              <label className="mr-2">Year:</label>
              <select
                name="year"
                defaultValue={String(selectedYear)}
                className="bg-ink-950 border border-champagne-700/40 rounded px-2 py-1"
              >
                {allYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="ml-2 underline text-champagne-300"
              >
                Filter
              </button>
            </form>
          )}
        </header>
        {yearFilteredTx.length === 0 ? (
          <p className="text-base text-ivory/70">
            No transactions for {selectedYear}.
          </p>
        ) : (
          <table className="w-full text-base">
            <thead className="text-left text-ivory/60 border-b border-champagne-700/20">
              <tr>
                <th scope="col" className="py-2">Date</th>
                <th scope="col" className="py-2">Loan</th>
                <th scope="col" className="py-2">Type</th>
                <th scope="col" className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody style={{ fontFeatureSettings: '"tnum"' }}>
              {yearFilteredTx.map((t) => (
                <tr key={t.id} className="border-b border-champagne-700/10">
                  <td className="py-2">{shortDate(t.tx_date)}</td>
                  <td className="py-2">{t.loan_ref}</td>
                  <td className="py-2">{t.tx_type}</td>
                  <td className="py-2 text-right">{money(t.amount, { cents: true })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <p className="text-xs text-ivory/50 mt-8">{SERVICING_FOOTER}</p>
    </main>
  );
}
