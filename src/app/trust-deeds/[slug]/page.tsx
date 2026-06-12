import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeDollarSign,
  CalendarClock,
  FileText,
  LockKeyhole,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { money, pct } from "@/lib/portal/format";
import {
  getTrustDeedExample,
  TRUST_DEED_EXAMPLES,
} from "@/lib/trust-deed-examples";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TRUST_DEED_EXAMPLES.map((loan) => ({ slug: loan.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loan = getTrustDeedExample(slug);
  if (!loan) return {};
  return {
    title: `${loan.title} - ${pct(loan.netInvestorRatePct)} Net Investor Rate`,
    description: `Sample trust deed loan listing for ${loan.city}, ${loan.state}, showing net investor rate, LTV, term, assignment process, and servicing spread disclosure.`,
  };
}

function Term({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-cdf/10 bg-white p-4">
      <dt className="text-sm text-body/55">{label}</dt>
      <dd className="mt-1 font-heading text-lg font-bold text-cdf">{value}</dd>
    </div>
  );
}

export default async function TrustDeedListingDetail({ params }: PageProps) {
  const { slug } = await params;
  const loan = getTrustDeedExample(slug);
  if (!loan) notFound();

  return (
    <div className="bg-light text-body">
      <section className="bg-ink-950 text-ivory pt-32 pb-14">
        <div className="max-container section-padding">
          <Link
            href="/trust-deeds"
            className="inline-flex items-center gap-2 text-sm font-semibold text-champagne-300 hover:text-champagne-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to available trust deeds
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="eyebrow !text-champagne-300 mb-4">
                Sample loan listing
              </p>
              <h1 className="font-heading text-display md:text-display-lg font-bold text-white">
                {loan.lienPosition} Trust Deed | {loan.city}, {loan.state}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ivory/75">
                {loan.investorSummary}
              </p>
            </div>

            <div className="rounded-lg border border-champagne-500/30 bg-white/[0.06] p-6">
              <div className="text-display-lg font-heading font-bold text-champagne-300">
                {pct(loan.netInvestorRatePct)}
              </div>
              <p className="text-sm uppercase tracking-[0.14em] text-ivory/60">
                Net investor rate
              </p>
              <div className="mt-5 rounded-md bg-champagne-300/15 p-4 text-sm leading-relaxed text-ivory/78">
                CDF services the loan and retains a {pct(loan.servicingSpreadPct)}
                {" "}servicing spread. The displayed rate is net to investors
                before investor-specific taxes, custody fees, or advisory costs.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-container section-padding">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Term label="Loan amount" value={money(loan.loanAmount)} />
            <Term label="Available investment" value={money(loan.availableInvestment)} />
            <Term label="Minimum investment" value={money(loan.minimumInvestment)} />
            <Term label="Loan-to-value" value={pct(loan.ltvPct, 0)} />
            <Term label="Lien position" value={`${loan.lienPosition} deed of trust`} />
            <Term label="Term" value={`${loan.termMonths} months`} />
            <Term label="Payments" value={loan.paymentType} />
            <Term label="Funding structure" value={loan.fundingStructure} />
          </dl>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-container section-padding">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            <article className="rounded-lg bg-white border border-cdf/10 p-7">
              <div className="flex items-center gap-3 text-cdf">
                <ShieldCheck className="h-6 w-6 text-champagne-700" />
                <h2 className="font-heading text-heading font-bold">
                  Loan summary
                </h2>
              </div>
              <div className="mt-6 space-y-6 text-base leading-relaxed text-body/78">
                <p>{loan.collateralSummary}</p>
                <div>
                  <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                    Use of funds
                  </h3>
                  <p>{loan.useOfFunds}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                    Borrower exit strategy
                  </h3>
                  <p>{loan.exitStrategy}</p>
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                    Investor economics
                  </h3>
                  <p>
                    The investor-facing rate is {pct(loan.netInvestorRatePct)}
                    {" "}net. CDF tracks borrower note economics and retains a
                    disclosed {pct(loan.servicingSpreadPct)} servicing spread
                    for payment collection, statements, document management, and
                    loan administration.
                  </p>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-lg bg-white border border-cdf/10 p-6">
                <div className="flex items-center gap-3 text-cdf">
                  <MapPin className="h-5 w-5 text-champagne-700" />
                  <h2 className="font-heading text-lg font-bold">Collateral</h2>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  {[
                    ["Property type", loan.propertyType],
                    ["Location", `${loan.city}, ${loan.state}`],
                    ["Occupancy", loan.occupancy],
                    ["Prepay", loan.prepay],
                    ["Status", loan.status],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 border-b border-cdf/10 pb-3 last:border-b-0 last:pb-0">
                      <dt className="text-body/55">{label}</dt>
                      <dd className="text-right font-semibold text-cdf">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="rounded-lg bg-white border border-cdf/10 p-6">
                <div className="flex items-center gap-3 text-cdf">
                  <CalendarClock className="h-5 w-5 text-champagne-700" />
                  <h2 className="font-heading text-lg font-bold">Process status</h2>
                </div>
                <dl className="mt-5 space-y-3 text-sm">
                  {loan.timeline.map((item) => (
                    <div key={item.label} className="flex justify-between gap-4 border-b border-cdf/10 pb-3 last:border-b-0 last:pb-0">
                      <dt className="text-body/55">{item.label}</dt>
                      <dd className="text-right font-semibold text-cdf">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-container section-padding">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-lg border border-cdf/10 bg-light p-7">
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-6 w-6 text-champagne-700" />
                <h2 className="font-heading text-heading font-bold text-cdf">
                  Gated after approval
                </h2>
              </div>
              <ul className="mt-5 grid gap-3 text-body/78">
                {loan.gatedDetails.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-champagne-600 shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-cdf/10 bg-light p-7">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-champagne-700" />
                <h2 className="font-heading text-heading font-bold text-cdf">
                  Document package
                </h2>
              </div>
              <ul className="mt-5 grid gap-3 text-body/78">
                {loan.documents.map((doc) => (
                  <li key={doc} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-cdf shrink-0" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-cdf p-7 text-white">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h2 className="font-heading text-heading font-bold">
                  Interested in this structure?
                </h2>
                <p className="mt-2 text-white/75">
                  This sample page shows the intended listing format. Real
                  opportunities require CDF review, investor approval, and
                  final loan documents before funding.
                </p>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-champagne-400 px-5 py-3 font-bold text-ink-950 hover:bg-champagne-300"
              >
                <BadgeDollarSign className="h-5 w-5" />
                Call {SITE_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-10">
        <div className="max-container section-padding text-sm leading-relaxed text-body/60">
          <p>
            Synthetic example only. Trust deed investments involve risk and are
            not insured. Capital Direct Funding, Inc. DRE #
            {SITE_CONFIG.dreLicense}; NMLS #{SITE_CONFIG.nmls}.
          </p>
        </div>
      </section>
    </div>
  );
}
