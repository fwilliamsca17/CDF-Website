import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Building2,
  FileSignature,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import AccessRequestForm from "./AccessRequestForm";
import { SITE_CONFIG } from "@/lib/constants";
import { money, pct } from "@/lib/portal/format";
import { TRUST_DEED_EXAMPLES } from "@/lib/trust-deed-examples";

export const metadata: Metadata = {
  title: "Available Trust Deed Investments",
  description:
    "Sample available trust deed investment listings from Capital Direct Funding, including net investor rate, lien position, LTV, assignment process, and servicing spread disclosure.",
};

const PROCESS_STEPS = [
  {
    title: "Review a loan listing",
    body: "Each opportunity is presented as a loan-level listing with the property type, lien position, LTV, term, available amount, and net investor rate.",
    icon: Building2,
  },
  {
    title: "Confirm fit with CDF",
    body: "A principal walks through the collateral, borrower purpose, assignment structure, and documents before any investor commits.",
    icon: ShieldCheck,
  },
  {
    title: "Fund through escrow",
    body: "Investors fund the selected interest through the closing or assignment process. Vesting can be personal, trust, entity, IRA, or Solo 401(k).",
    icon: FileSignature,
  },
  {
    title: "Receive servicing updates",
    body: "CDF services the loan, collects borrower payments, retains the disclosed servicing spread, and posts investor statements and documents.",
    icon: BadgeDollarSign,
  },
];

export default function TrustDeedsPage() {
  return (
    <div className="bg-white text-body">
      <section className="relative overflow-hidden bg-ink-950 text-ivory pt-32 pb-20">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-navy-950/95 to-ink-900" />
        <div className="relative max-container section-padding">
          <div className="max-w-4xl">
            <p className="eyebrow !text-champagne-300 mb-4">
              Available trust deed investments
            </p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Loan listings with the net investor rate up front.
            </h1>
            <p className="text-xl leading-relaxed text-ivory/78 max-w-3xl">
              Review trust deed opportunities like a loan file: collateral,
              lien position, LTV, term, available investment, assignment
              structure, and monthly servicing. The rate shown is net to the
              investor; CDF discloses its 1% servicing spread separately.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="#available"
                className="btn-champagne rounded-lg"
              >
                View sample listings
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/trust-deeds/servicing-example"
                className="btn-ghost-light rounded-lg"
              >
                See servicing view
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[
              ["Net rate shown", "Investor-facing"],
              ["1% spread", "CDF servicing fee"],
              ["Loan-level detail", "No blind pool"],
              ["Docs gated", "Approved investors"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
              >
                <div className="text-heading font-heading text-champagne-300">
                  {value}
                </div>
                <div className="text-sm text-ivory/65 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="available" className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
            <div>
              <p className="eyebrow mb-3">Sample current opportunities</p>
              <h2 className="font-heading text-heading-xl font-bold text-cdf">
                Available trust deed loan listings
              </h2>
            </div>
            <p className="max-w-xl text-body/75">
              These are synthetic examples for page review. Real listings should
              be published only after compliance review and investor suitability
              screening.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {TRUST_DEED_EXAMPLES.map((loan) => (
              <article
                key={loan.slug}
                className="rounded-lg border border-cdf/10 bg-white shadow-sm overflow-hidden"
              >
                <div className="bg-cdf text-white p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-white/70">
                        {loan.lienPosition} Trust Deed
                      </p>
                      <h3 className="font-heading text-heading-sm font-bold mt-1">
                        {loan.city}, {loan.state}
                      </h3>
                    </div>
                    <span className="rounded-full bg-champagne-400 px-3 py-1 text-xs font-bold text-ink-950">
                      {loan.status}
                    </span>
                  </div>
                  <div className="mt-6">
                    <div className="text-display font-heading font-bold text-champagne-300">
                      {pct(loan.netInvestorRatePct)}
                    </div>
                    <p className="text-sm text-white/70">
                      Net annualized investor rate
                    </p>
                  </div>
                </div>

                <div className="p-5">
                  <dl className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <dt className="text-body/55">Loan amount</dt>
                      <dd className="font-semibold text-cdf">
                        {money(loan.loanAmount)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-body/55">Available</dt>
                      <dd className="font-semibold text-cdf">
                        {money(loan.availableInvestment)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-body/55">LTV</dt>
                      <dd className="font-semibold text-cdf">
                        {pct(loan.ltvPct, 0)}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-body/55">Term</dt>
                      <dd className="font-semibold text-cdf">
                        {loan.termMonths} months
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-body/55">Structure</dt>
                      <dd className="font-semibold text-cdf">
                        {loan.fundingStructure}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-5 text-sm leading-relaxed text-body/75">
                    {loan.collateralSummary}
                  </p>

                  <div className="mt-5 rounded-md bg-champagne-200/45 p-4 text-sm text-cdf">
                    Rate shown is net to investors. CDF receives a{" "}
                    {pct(loan.servicingSpreadPct)} servicing spread from
                    interest collected on the loan.
                  </div>

                  <Link
                    href={`/trust-deeds/${loan.slug}`}
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-cdf hover:text-cdf-600"
                  >
                    View loan listing example
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">How the economics are shown</p>
              <h2 className="font-heading text-heading-xl font-bold text-cdf heading-underline mb-6">
                Investors see the net rate. CDF tracks servicing internally.
              </h2>
              <p className="text-lg leading-relaxed text-body/80">
                The investor page should not force people to calculate a gross
                borrower rate minus fees. Each listing leads with the net
                investor rate and includes a clear servicing-spread disclosure.
                Internally, CDF can still track borrower note rate, retained
                fund interest, assignments, and servicing income.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Investor-facing", "Net investor rate, loan amount, available investment, LTV, lien position, term, payment frequency."],
                ["Admin/internal", "Borrower note rate, 1% servicing spread, fund retained interest, assignment status, servicing ledger."],
                ["Gated after approval", "Exact address, borrower package, title, appraisal, note, deed of trust, assignment documents."],
                ["Servicing after funding", "Payment history, current balance, investor documents, tax/custodian reporting support."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-cdf/10 bg-light p-5">
                  <h3 className="font-heading text-lg font-bold text-cdf">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body/75">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding-y bg-ink-950 text-ivory">
        <div className="max-container section-padding">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow !text-champagne-300 mb-3">Loan assignment process</p>
            <h2 className="font-heading text-heading-xl font-bold text-white">
              From origination to assigned trust deed interest.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-lg border border-white/10 bg-white/[0.06] p-5"
                >
                  <Icon className="h-8 w-8 text-champagne-300 mb-5" />
                  <h3 className="font-heading text-lg font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory/72">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="rounded-lg bg-white border border-cdf/10 p-7">
              <div className="flex items-start gap-4">
                <LockKeyhole className="h-7 w-7 text-champagne-700 shrink-0" />
                <div>
                  <h2 className="font-heading text-heading font-bold text-cdf">
                    Full files stay gated.
                  </h2>
                  <p className="mt-3 text-body/75 leading-relaxed">
                    Public pages can show sample or approved teaser terms.
                    Approved investors see full loan packages after CDF review:
                    documents, exact collateral detail, assignment materials,
                    and ongoing servicing history.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/trust-deeds/how-it-works"
                      className="rounded-md bg-cdf px-5 py-3 font-semibold text-white hover:bg-cdf-800"
                    >
                      How trust deeds work
                    </Link>
                    <Link
                      href="/trust-deeds/servicing-example"
                      className="rounded-md border border-cdf/20 px-5 py-3 font-semibold text-cdf hover:bg-cdf/5"
                    >
                      Sample portfolio view
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <AccessRequestForm />
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="max-container section-padding text-sm leading-relaxed text-body/60">
          <p>
            Sample page for review only. Trust deed investments involve risk,
            are not bank deposits, are not FDIC insured, and may lose value.
            Capital Direct Funding, Inc. DRE #{SITE_CONFIG.dreLicense}; NMLS #
            {SITE_CONFIG.nmls}. Consult your legal and tax advisors before
            investing.
          </p>
        </div>
      </section>
    </div>
  );
}
