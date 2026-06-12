import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { shortDate } from "@/lib/portal/format";
import { syntheticTmoTemplateCsv, SyntheticTmoValidation } from "@/lib/portal/synthetic-tmo";
import {
  commitSyntheticImport,
  rollbackSyntheticImport,
  validateSyntheticImport,
} from "./actions";

export const metadata: Metadata = {
  title: "TMO Import — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function ImportPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const { data: batches } = await supabase
    .from("import_batches")
    .select("id, file_name, uploaded_at, row_counts, validation, status")
    .order("uploaded_at", { ascending: false })
    .limit(8);

  return (
    <main className="container-cdf py-12 space-y-8">
      <header>
        <h1 className="text-heading-lg font-heading">Synthetic TMO import</h1>
        <p className="text-base text-ivory/70">
          Phase 0 accepts only the generated CSV shape below. Real TMO exports wait for a redacted sample.
        </p>
      </header>

      <section className="grid lg:grid-cols-2 gap-6">
        <form
          action={validateSyntheticImport}
          className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-heading font-heading">Validate CSV</h2>
          <input
            type="file"
            name="file"
            accept=".csv,text/csv"
            required
            className="block w-full text-base file:mr-4 file:rounded file:border-0 file:bg-champagne-500 file:px-4 file:py-3 file:font-semibold file:text-ink-900"
          />
          <button className="rounded bg-champagne-500 px-5 py-3 text-base font-semibold text-ink-900">
            Upload and validate
          </button>
        </form>

        <section className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6">
          <h2 className="text-heading font-heading mb-3">Synthetic format</h2>
          <pre className="max-h-72 overflow-auto rounded bg-ink-950 p-4 text-xs text-ivory/80">
            {syntheticTmoTemplateCsv()}
          </pre>
        </section>
      </section>

      <section className="space-y-4">
        <h2 className="text-heading font-heading">Batches</h2>
        {!batches?.length && (
          <p className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 text-base">
            No import batches yet.
          </p>
        )}
        {batches?.map((b) => {
          const validation = b.validation as SyntheticTmoValidation | null;
          return (
            <article key={b.id} className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-4">
              <header className="flex flex-wrap justify-between gap-4">
                <div>
                  <h3 className="text-heading-sm font-heading">{b.file_name}</h3>
                  <p className="text-sm text-ivory/60">
                    {shortDate(b.uploaded_at)} - {b.status}
                  </p>
                </div>
                <dl className="flex flex-wrap gap-4 text-sm text-ivory/70">
                  {Object.entries((b.row_counts ?? {}) as Record<string, number>).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-ivory/50">{k}</dt>
                      <dd className="tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </header>

              {!!validation?.errors.length && (
                <div className="rounded border border-red-400/40 bg-red-500/10 p-4">
                  <p className="font-semibold text-red-200">Blocked</p>
                  <ul className="mt-2 list-disc pl-5 text-sm text-red-100">
                    {validation.errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!!validation?.warnings.length && (
                <ul className="list-disc pl-5 text-sm text-amber-100">
                  {validation.warnings.map((warning) => (
                    <li key={warning}>{warning}</li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3">
                {b.status === "validated" && !validation?.errors.length && (
                  <form action={commitSyntheticImport}>
                    <input type="hidden" name="batch_id" value={b.id} />
                    <button className="rounded bg-champagne-500 px-4 py-3 text-base font-semibold text-ink-900">
                      Commit batch
                    </button>
                  </form>
                )}
                {b.status !== "rolled_back" && (
                  <form action={rollbackSyntheticImport}>
                    <input type="hidden" name="batch_id" value={b.id} />
                    <button className="rounded border border-champagne-700/40 px-4 py-3 text-base">
                      Roll back
                    </button>
                  </form>
                )}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
