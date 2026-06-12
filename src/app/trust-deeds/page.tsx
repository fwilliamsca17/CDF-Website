import { Metadata } from "next";
import Link from "next/link";
import AccessRequestForm from "./AccessRequestForm";
import { DRE_LICENSE_LINE } from "@/lib/portal/constants";

export const metadata: Metadata = {
  title: "Trust Deed Investing — CDF Investor Group (private membership)",
  description:
    "An educational overview of CDF's private trust deed investment program. Membership is by invitation; request access to learn more.",
};

export default function TrustDeedsPage() {
  return (
    <main className="bg-ink-950 text-ivory">
      <section className="container-cdf py-24">
        <p className="eyebrow mb-4">Private investor group</p>
        <h1 className="text-display font-heading mb-6 max-w-3xl">
          Trust deed investing with CDF
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-ivory/85 mb-8">
          A private membership group for investors who hold individual
          trust deed investments — secured by California (and select
          national) real estate. We work with investors investing
          personally, through self-directed IRAs (Forge Trust, Provident
          Trust Group, The Entrust Group), and through Solo 401(k)
          accounts.
        </p>
        <p className="max-w-2xl text-base text-ivory/80 mb-12">
          This page is informational. Specific opportunities are shown
          only to members after a personal review. To learn more or
          request access, complete the short form below.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-heading-lg font-heading">What members see</h2>
            <ul className="space-y-3 text-lg">
              <li>• Current opportunities with full terms</li>
              <li>• Portfolio of your positions across personal &amp; retirement accounts</li>
              <li>• Payment history and year-to-date interest</li>
              <li>• Loan documents per investment</li>
              <li>• New listing alerts by email</li>
            </ul>
            <Link
              href="/trust-deeds/how-it-works"
              className="inline-block mt-4 text-base text-champagne-300 underline"
            >
              How trust deed investing works →
            </Link>
          </div>

          <AccessRequestForm />
        </div>
      </section>

      <footer className="border-t border-champagne-700/20 py-8">
        <div className="container-cdf text-sm text-ivory/60">
          {DRE_LICENSE_LINE}
        </div>
      </footer>
    </main>
  );
}
