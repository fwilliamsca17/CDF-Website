import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/server";
import { shortDate } from "@/lib/portal/format";
import { uploadLoanDocument } from "./actions";

export const metadata: Metadata = {
  title: "Documents — CDF Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function DocumentsPage() {
  const guard = await requireAdmin();
  if ("redirectTo" in guard) redirect(guard.redirectTo ?? "/login");
  const { supabase } = guard;

  const [{ data: loans }, { data: docs }] = await Promise.all([
    supabase.from("borrower_loans").select("loan_ref, property_address").order("loan_ref"),
    supabase
      .from("loan_documents")
      .select("id, loan_ref, title, description, visibility, uploaded_at, storage_path")
      .order("uploaded_at", { ascending: false }),
  ]);

  return (
    <main className="container-cdf py-12 space-y-8">
      <header>
        <h1 className="text-heading-lg font-heading">Loan documents</h1>
        <p className="text-base text-ivory/70">
          Upload into the private `loan-docs` bucket. Images are rewritten server-side before storage.
        </p>
      </header>

      <form action={uploadLoanDocument} className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <label>
            <span className="block text-base mb-2">Loan</span>
            <select name="loan_ref" required className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base">
              <option value="">Select loan</option>
              {(loans ?? []).map((l) => (
                <option key={l.loan_ref} value={l.loan_ref}>
                  {l.loan_ref} - {l.property_address}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">Visibility</span>
            <select name="visibility" required className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base">
              <option value="">Select</option>
              <option value="borrower">Borrower only</option>
              <option value="investor">Investor only</option>
              <option value="both">Borrower and investor</option>
            </select>
          </label>
          <label>
            <span className="block text-base mb-2">File</span>
            <input
              type="file"
              name="file"
              required
              accept="application/pdf,image/jpeg,image/png,image/webp"
              className="block w-full text-base file:mr-4 file:rounded file:border-0 file:bg-champagne-500 file:px-4 file:py-3 file:font-semibold file:text-ink-900"
            />
          </label>
          <label>
            <span className="block text-base mb-2">Title</span>
            <input name="title" required className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base" />
          </label>
          <label className="md:col-span-2">
            <span className="block text-base mb-2">Description</span>
            <input name="description" className="w-full min-h-12 rounded border border-champagne-700/40 bg-ink-950 px-3 py-2 text-base" />
          </label>
        </div>
        <button className="rounded bg-champagne-500 px-5 py-3 text-base font-semibold text-ink-900">
          Upload document
        </button>
      </form>

      <section className="overflow-x-auto bg-ink-900 border border-champagne-700/30 rounded-lg">
        <table className="w-full min-w-[780px] text-base">
          <thead className="text-left text-ivory/60 border-b border-champagne-700/20">
            <tr>
              <th scope="col" className="p-3">Loan</th>
              <th scope="col" className="p-3">Title</th>
              <th scope="col" className="p-3">Visibility</th>
              <th scope="col" className="p-3">Uploaded</th>
              <th scope="col" className="p-3">Path</th>
            </tr>
          </thead>
          <tbody>
            {(docs ?? []).map((doc) => (
              <tr key={doc.id} className="border-b border-champagne-700/10">
                <td className="p-3">{doc.loan_ref}</td>
                <td className="p-3">
                  <a href={`/api/documents/${doc.id}`} className="text-champagne-300 underline">
                    {doc.title}
                  </a>
                  {doc.description && <span className="block text-sm text-ivory/60">{doc.description}</span>}
                </td>
                <td className="p-3">{doc.visibility}</td>
                <td className="p-3">{shortDate(doc.uploaded_at)}</td>
                <td className="p-3 text-sm text-ivory/50">{doc.storage_path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
