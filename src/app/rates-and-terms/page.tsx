import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, SITE_CONFIG } from "@/lib/constants";
import { LOAN_TERMS, formatAmount } from "@/lib/loan-terms";
import { PageSeo, LoanProductsSchema } from "@/components/JsonLd";

const DESCRIPTION =
  "Current private money loan rates and terms from Capital Direct Funding: eight programs from 9.50%, $50K–$5M, 6–36 month terms, LTV to 75% ARV, closings in as few as 7 days. DRE# 01885595 | NMLS# 1159831.";

export const metadata: Metadata = {
  title: "Rates & Terms — All Eight Loan Programs at a Glance",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/rates-and-terms` },
};

/*
 * One page, one table, every program's numbers. This exists for answer
 * engines and comparison shoppers alike: AI answers quote lenders whose
 * terms are liftable from a single structured surface, and this is ours.
 * Numbers come from LOAN_TERMS — edit there, never inline here.
 */
export default function RatesAndTermsPage() {
  return (
    <>
      <PageSeo
        title="Rates & Terms | Capital Direct Funding"
        description={DESCRIPTION}
        path="/rates-and-terms"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Rates & Terms", path: "/rates-and-terms" },
        ]}
        speakable={["h1", ".rates-summary"]}
      />
      <LoanProductsSchema />

      <section className="hero-atmosphere relative overflow-hidden pb-16 pt-32">
        <div className="relative z-10 max-container section-padding">
          <p className="eyebrow text-champagne-300 mb-4">Rates &amp; Terms</p>
          <h1 className="font-heading text-[2.4rem] leading-[1.06] md:text-display-lg font-bold text-white mb-6 max-w-3xl">
            Every Program. Every Number. One Page.
          </h1>
          <p className="rates-summary text-ivory/70 leading-relaxed max-w-2xl">
            Capital Direct Funding writes business-purpose loans secured by
            California real estate — $50,000 to $5,000,000, rates from 9.50%,
            terms of 6 to 36 months, closing in as few as 7 business days.
            The full grid is below; every number links to its program page.
          </p>
        </div>
      </section>

      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="overflow-x-auto rounded-xl border border-cdf/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="bg-light">
                  <th scope="col" className="px-5 py-4 font-heading font-bold text-cdf">Program</th>
                  <th scope="col" className="px-5 py-4 font-heading font-bold text-cdf">Rates</th>
                  <th scope="col" className="px-5 py-4 font-heading font-bold text-cdf">Max Leverage</th>
                  <th scope="col" className="px-5 py-4 font-heading font-bold text-cdf">Term</th>
                  <th scope="col" className="px-5 py-4 font-heading font-bold text-cdf">Loan Amount</th>
                </tr>
              </thead>
              <tbody>
                {LOAN_TERMS.map((t) => (
                  <tr key={t.slug} className="border-t border-cdf/5">
                    <th scope="row" className="px-5 py-4 font-medium">
                      <Link href={t.href} className="text-cdf hover:text-champagne-600 transition-colors">
                        {t.name}
                      </Link>
                    </th>
                    <td className="px-5 py-4">
                      {t.rateTo ? `${t.rateFrom}%–${t.rateTo}%` : `From ${t.rateFrom}%`}
                    </td>
                    <td className="px-5 py-4">{t.ltvDisplay}</td>
                    <td className="px-5 py-4">
                      {t.termMinMonths}–{t.termMaxMonths} months
                    </td>
                    <td className="px-5 py-4">
                      {formatAmount(t.amountMin)}–{formatAmount(t.amountMax)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            <div>
              <h2 className="font-heading text-heading-lg font-bold text-cdf mb-4">
                What Every Loan Has in Common
              </h2>
              <ul className="space-y-2.5 text-body leading-relaxed list-disc pl-5">
                <li>First trust deed position on California real estate</li>
                <li>Business-purpose lending only — investment property, commercial, and business-purpose transactions</li>
                <li>No tax returns required; asset-based underwriting</li>
                <li>Closings in as few as 7 business days</li>
                <li>Direct lender — decisions from the people funding the loan</li>
                <li>24-hour response on every inquiry</li>
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-heading-lg font-bold text-cdf mb-4">
                For Accredited Investors
              </h2>
              <p className="text-body leading-relaxed mb-4">
                On the other side of these loans: whole-note, first trust deed
                investments yielding 8.95%–10.95%, paid as monthly interest,
                with no fund fees and no lock-ups.
              </p>
              <Link href="/investors" className="text-champagne-600 font-semibold hover:text-champagne-700 transition-colors">
                Trust deed investing with CDF →
              </Link>
            </div>
          </div>

          <p className="mt-10 text-sm text-body/70 leading-relaxed max-w-4xl">
            Rates and terms shown are starting points and ranges as of the date
            on this page; final pricing depends on property, leverage, exit
            strategy, and overall risk profile, and is confirmed in a written
            term sheet. All loans are business-purpose, secured by a first
            trust deed, and subject to underwriting. Capital Direct Funding,
            Inc. — DRE# {SITE_CONFIG.dreLicense} | NMLS# {SITE_CONFIG.nmls}.
            Call {SITE_CONFIG.phone} for a same-day quote.
          </p>
        </div>
      </section>
    </>
  );
}
