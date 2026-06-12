import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireBorrower } from "@/lib/supabase/server";
import { money, pct, shortDate } from "@/lib/portal/format";
import {
  SERVICING_FOOTER,
  PAYOFF_DISCLAIMER,
  FRESHNESS_NAG_DAYS,
} from "@/lib/portal/constants";

export const metadata: Metadata = {
  title: "My Loans — CDF",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

interface Loan {
  id: string;
  loan_ref: string;
  property_address: string;
  original_amount: number;
  current_principal: number;
  rate_pct: number;
  payment_amount: number | null;
  next_due_date: string | null;
  maturity_date: string | null;
  status: string | null;
}
interface BorrowerTx {
  id: string;
  loan_id: string;
  tx_date: string;
  tx_type: string;
  amount: number;
  applied_interest: number | null;
  applied_principal: number | null;
  applied_fees: number | null;
}
interface Doc {
  id: string;
  loan_ref: string;
  title: string;
  description: string | null;
  visibility: string;
}

export default async function LoansPage() {
  const guard = await requireBorrower();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const [{ data: loans }, { data: txs }, { data: docs }, { data: lastBatch }] = await Promise.all([
    supabase
      .from("borrower_loans")
      .select(
        "id, loan_ref, property_address, original_amount, current_principal, rate_pct, payment_amount, next_due_date, maturity_date, status"
      )
      .order("loan_ref"),
    supabase
      .from("borrower_transactions")
      .select(
        "id, loan_id, tx_date, tx_type, amount, applied_interest, applied_principal, applied_fees"
      )
      .order("tx_date", { ascending: false }),
    supabase.from("loan_documents").select("id, loan_ref, title, description, visibility"),
    supabase
      .from("import_batches")
      .select("uploaded_at")
      .eq("status", "committed")
      .order("uploaded_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const loanList = (loans ?? []) as Loan[];
  const txList = (txs ?? []) as BorrowerTx[];
  const docList = (docs ?? []) as Doc[];

  const lastImportDate = lastBatch?.uploaded_at ? new Date(lastBatch.uploaded_at) : null;
  const stale =
    !lastImportDate ||
    Date.now() - lastImportDate.getTime() > FRESHNESS_NAG_DAYS * 86400000;

  return (
    <main className="container-cdf py-12 space-y-10">
      <header className="space-y-2">
        <h1 className="text-heading-lg font-heading">My Loans</h1>
        <p className="text-sm text-ivory/70">
          As of {lastImportDate ? shortDate(lastImportDate) : "—"} per CDF servicing records.{" "}
          {SERVICING_FOOTER}
        </p>
        {stale && (
          <p
            role="status"
            className="text-sm bg-amber-500/15 border border-amber-400/40 text-amber-100 rounded p-3"
          >
            Servicing data has not been refreshed in over {FRESHNESS_NAG_DAYS}{" "}
            days. Your mailed statement remains the official record.
          </p>
        )}
      </header>

      {!loanList.length && (
        <p className="text-lg p-8 bg-ink-900 border border-champagne-700/30 rounded-lg">
          No loans linked to your account yet.
        </p>
      )}

      {loanList.map((l) => {
        const loanTx = txList.filter((t) => t.loan_id === l.id);
        const loanDocs = docList.filter(
          (d) => d.loan_ref === l.loan_ref && (d.visibility === "borrower" || d.visibility === "both")
        );
        return (
          <section
            key={l.id}
            className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-6"
          >
            <header className="space-y-1">
              <h2 className="text-heading font-heading">
                Loan {l.loan_ref}
              </h2>
              <p className="text-base text-ivory/80">{l.property_address}</p>
            </header>

            <dl className="grid sm:grid-cols-3 gap-4 text-base">
              <div>
                <dt className="text-ivory/60">Current balance</dt>
                <dd
                  className="text-2xl font-heading text-champagne-300"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {money(l.current_principal)}
                </dd>
                <p className="text-xs text-ivory/50 mt-1">{PAYOFF_DISCLAIMER}</p>
              </div>
              <div>
                <dt className="text-ivory/60">Next payment due</dt>
                <dd className="text-xl font-heading">
                  {shortDate(l.next_due_date)}
                  {l.payment_amount && (
                    <span
                      className="block text-base text-ivory/70"
                      style={{ fontFeatureSettings: '"tnum"' }}
                    >
                      {money(l.payment_amount, { cents: true })}
                    </span>
                  )}
                </dd>
              </div>
              <div>
                <dt className="text-ivory/60">Rate / status</dt>
                <dd
                  className="text-xl font-heading"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  {pct(l.rate_pct)}
                </dd>
                <p className="text-sm text-ivory/70">{l.status ?? "—"}</p>
              </div>
            </dl>

            {loanTx.length > 0 && (
              <div>
                <h3 className="text-heading-sm font-heading mb-2">Payment history</h3>
                <table className="w-full text-base">
                  <thead className="text-left text-ivory/60 border-b border-champagne-700/20">
                    <tr>
                      <th scope="col" className="py-2">Date</th>
                      <th scope="col" className="py-2">Type</th>
                      <th scope="col" className="py-2 text-right">Amount</th>
                      <th scope="col" className="py-2 text-right">Interest</th>
                      <th scope="col" className="py-2 text-right">Principal</th>
                      <th scope="col" className="py-2 text-right">Fees</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontFeatureSettings: '"tnum"' }}>
                    {loanTx.slice(0, 24).map((t) => (
                      <tr key={t.id} className="border-b border-champagne-700/10">
                        <td className="py-2">{shortDate(t.tx_date)}</td>
                        <td className="py-2">{t.tx_type}</td>
                        <td className="py-2 text-right">{money(t.amount, { cents: true })}</td>
                        <td className="py-2 text-right">{money(t.applied_interest, { cents: true })}</td>
                        <td className="py-2 text-right">{money(t.applied_principal, { cents: true })}</td>
                        <td className="py-2 text-right">{money(t.applied_fees, { cents: true })}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {loanDocs.length > 0 && (
              <div>
                <h3 className="text-heading-sm font-heading mb-2">Documents</h3>
                <ul className="space-y-1 text-base">
                  {loanDocs.map((d) => (
                    <li key={d.id}>
                      <a
                        href={`/api/documents/${d.id}`}
                        className="text-champagne-300 underline"
                      >
                        {d.title}
                      </a>
                      {d.description && (
                        <span className="text-ivory/60"> — {d.description}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
