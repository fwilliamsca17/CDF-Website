import { Metadata } from "next";
import { DRE_LICENSE_LINE } from "@/lib/portal/constants";
import {
  OriginationDiagram,
  DOTDiagram,
  AssignmentDiagram,
  FractionalizationDiagram,
  LifeOfLoanDiagram,
  SDIRADiagram,
} from "./diagrams";

export const metadata: Metadata = {
  title: "How trust deed investing works — CDF Investor Group",
  description:
    "Educational walkthrough of trust deed origination, deed of trust, loan assignment, fractionalization, life-of-loan, and self-directed retirement investing.",
};

type Step = {
  title: string;
  body: string;
  diagram: React.ReactNode;
};

const STEPS: Step[] = [
  {
    title: "1. New loan origination",
    body: "A borrower applies for a real-estate-secured loan. We underwrite the property's equity first — appraisal, title, and a clean lien stack matter more than borrower credit. Funds move through escrow; the deed of trust is recorded; the loan funds.",
    diagram: <OriginationDiagram />,
  },
  {
    title: "2. How your investment is secured",
    body: "The deed of trust is recorded against the property. Lien position (1st, 2nd, sometimes 3rd) determines payoff order. We sit at conservative loan-to-value ratios so equity is the cushion — not borrower promises.",
    diagram: <DOTDiagram />,
  },
  {
    title: "3. Loan assignment to investors",
    body: "When you fund a loan, the note and deed of trust are assigned — and that assignment is recorded — in the name you choose to vest (yourself, a trust, a self-directed retirement custodian).",
    diagram: <AssignmentDiagram />,
  },
  {
    title: "4. Fractionalization",
    body: "A single loan can be held by more than one investor. The recorded interests reflect each investor's percentage. Payments are split accordingly. California's multi-lender framework governs the structure.",
    diagram: <FractionalizationDiagram />,
  },
  {
    title: "5. Life of the loan",
    body: "Most loans pay interest monthly and balloon at maturity. If a borrower defaults, the trustee can begin a non-judicial foreclosure — Notice of Default, Notice of Sale, trustee's sale — and recover principal from the property. We walk you through it openly because the worst time to learn the process is during one.",
    diagram: <LifeOfLoanDiagram />,
  },
  {
    title: "6. Investing through self-directed retirement accounts",
    body: "You can hold trust deed investments inside a self-directed IRA or Solo 401(k). We work with Forge Trust Co., Provident Trust Group, and The Entrust Group — and any other self-directed custodian. The custodian holds the note 'FBO' you; payments return to your retirement account tax-advantaged. Consult your CPA on tax treatment.",
    diagram: <SDIRADiagram />,
  },
];

export default function HowItWorksPage() {
  return (
    <main className="bg-ink-950 text-ivory">
      <section className="container-cdf py-20">
        <p className="eyebrow mb-4">Educational guide</p>
        <h1 className="text-display font-heading mb-6 max-w-3xl">
          How trust deed investing works
        </h1>
        <p className="max-w-2xl text-lg text-ivory/85 mb-16">
          A plain-language walkthrough from loan origination to payoff
          (and what happens if it doesn&rsquo;t). This is educational
          information, not investment advice — every opportunity has its
          own terms and risks.
        </p>

        <div className="space-y-section">
          {STEPS.map((s) => (
            <article
              key={s.title}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-4">
                <h2 className="text-heading-lg font-heading">{s.title}</h2>
                <p className="text-lg leading-relaxed text-ivory/85">{s.body}</p>
              </div>
              <div className="bg-ink-900 border border-champagne-700/30 rounded-lg p-6">
                {s.diagram}
              </div>
            </article>
          ))}
        </div>

        <section className="mt-section pt-12 border-t border-champagne-700/30">
          <h2 className="text-heading-lg font-heading mb-6">Glossary</h2>
          <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-base">
            <div>
              <dt className="font-semibold text-champagne-300">LTV</dt>
              <dd>Loan-to-Value — loan amount divided by appraised property value.</dd>
            </div>
            <div>
              <dt className="font-semibold text-champagne-300">CLTV</dt>
              <dd>Combined Loan-to-Value — all loans combined divided by value.</dd>
            </div>
            <div>
              <dt className="font-semibold text-champagne-300">Lien position</dt>
              <dd>The recorded order of who gets paid first from the property — 1st, 2nd, 3rd.</dd>
            </div>
            <div>
              <dt className="font-semibold text-champagne-300">I/O</dt>
              <dd>Interest-Only — monthly payments cover interest; principal due at payoff.</dd>
            </div>
            <div>
              <dt className="font-semibold text-champagne-300">FBO</dt>
              <dd>&ldquo;For the Benefit Of&rdquo; — how custodians vest a retirement-account investment.</dd>
            </div>
            <div>
              <dt className="font-semibold text-champagne-300">NOD</dt>
              <dd>Notice of Default — first formal step in California non-judicial foreclosure.</dd>
            </div>
          </dl>
        </section>
      </section>
      <footer className="border-t border-champagne-700/20 py-8">
        <div className="container-cdf text-sm text-ivory/60 space-y-2">
          <p>{DRE_LICENSE_LINE}</p>
          <p>
            Past performance is not a guarantee of future results. Trust
            deed investments are not insured. Talk to your tax and legal
            advisors before investing.
          </p>
        </div>
      </footer>
    </main>
  );
}
