import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_URL,
  SITE_CONFIG,
  PROCESS_STEPS,
  TESTIMONIALS,
} from "@/lib/constants";
import { LOAN_TERMS, formatAmount } from "@/lib/loan-terms";
import { PageSeo, StatePageSchema, LoanProductsSchema } from "@/components/JsonLd";

const DESCRIPTION =
  "Capital Direct Funding is a direct private money lender for California real estate — 8 loan programs from 9.50%, $50K to $5M, closings in as few as 7 days. Family-run since 2009, $200M+ funded. DRE# 01885595 | NMLS# 1159831.";

export const metadata: Metadata = {
  title: "Private Money Lender California — Direct Hard Money, 7-Day Closings",
  description: DESCRIPTION,
  keywords: [
    "private money lenders California",
    "private money lenders CA",
    "private money lender California",
    "hard money lender California",
    "California private money loans",
    "direct private lender California",
    "California bridge loan lender",
    "asset based lender California",
    "business purpose loans California",
    "trust deed lender California",
  ],
  alternates: { canonical: `${SITE_URL}/private-money-lender-california` },
};

/*
 * Statewide hub — sits above the county pages (which sit above the city
 * pages) in the location hierarchy. Built to the content bar set by the
 * pages ranking for "private money lenders california" (program cards,
 * on-page rate table, geo link hub, license-adjacent rate claims, FAQ),
 * plus what none of them have: per-program rates and extractable answers.
 * HARD RULE unchanged: no invented statistics, no fabricated deals —
 * every number traces to loan-terms.ts or verified CDF facts.
 */

const STATE_FAQS = [
  {
    question: "What do private money lenders charge in California?",
    answer:
      "Capital Direct Funding's rates start at 9.50% and vary by program and risk profile: Fix & Flip, Bridge, Cash-Out Refinance, and Self-Employed loans from 9.99%; Ground-Up Construction and Probate & Estate from 10.99%; Foreclosure & Bankruptcy Recovery from 11.99%; ADU Construction 9.5%–11%. Origination costs are quoted per deal in a written term sheet before you commit.",
  },
  {
    question: "How fast can a private money loan close in California?",
    answer:
      "As fast as 7 business days from a completed application. Underwriting, document preparation, and funding all happen in one West Covina office, so there is no committee review cycle between your application and a decision.",
  },
  {
    question: "Where in California do you lend?",
    answer:
      "Statewide, with our deepest concentration in Southern California — Los Angeles, Orange, San Diego, Riverside, and San Bernardino counties, where most of our $200M+ has been deployed since 2009.",
  },
  {
    question: "Are these consumer home loans?",
    answer:
      "No. Our loans are business-purpose loans secured by California real estate — investment property, commercial buildings, and business-purpose transactions. If your scenario is consumer-purpose, we will tell you on the first call and point you toward the right kind of lender.",
  },
  {
    question: "What loan amounts and leverage do you offer?",
    answer:
      "$50,000 to $5,000,000 secured by a first trust deed, typically at or below 70% loan-to-value — up to 75% of ARV on fix & flip and 75–85% loan-to-cost on ADU construction. Conservative leverage is why our investors fund deals quickly and why approvals hold up through closing.",
  },
  {
    question: "What is the difference between private money and hard money?",
    answer:
      "In California practice they describe the same thing: an asset-based loan funded by private capital rather than a bank, secured by real estate, and underwritten primarily on the property and the plan. 'Private money' emphasizes the capital source; 'hard money' emphasizes the hard asset. Capital Direct Funding is a direct lender either way — we lend our own and our investors' capital rather than brokering your file to someone else.",
  },
  {
    question: "How do you qualify borrowers without tax returns?",
    answer:
      "We underwrite the asset: purchase price or value, protective equity, the renovation or exit plan, and your track record. No tax returns are required and there are no minimum-credit cutoffs — the property and the deal structure carry the file.",
  },
  {
    question: "Are you licensed in California?",
    answer:
      "Yes. Loans are made or arranged through a California Department of Real Estate broker license — DRE# 01885595 — and we carry NMLS# 1159831. We have operated from West Covina, in Los Angeles County, since Frank Williams founded the company in 2009.",
  },
  {
    question: "What property types do you lend on?",
    answer:
      "Non-owner-occupied residential (1–4 units), small multifamily, commercial, mixed-use, and construction projects including ADUs — all as business-purpose loans secured by California real estate in first trust deed position.",
  },
  {
    question: "Do you offer private money ADU loans in Los Angeles?",
    answer:
      "Yes. Capital Direct Funding is a direct hard-money lender for ADU construction in Los Angeles and Orange County: 75–85% loan-to-cost, 9.5–11%, $60,000–$300,000 per unit, 12–18 months, milestone draws. Full program: /adu-loans.",
  },
  {
    question: "Do you work with mortgage brokers and referral partners?",
    answer:
      "Yes — brokers, attorneys, CPAs, and real estate agents refer clients to us regularly, and we protect those relationships. See our professionals pages or call (626) 796-1680 to discuss a scenario.",
  },
];

const SERVICE_AREAS: {
  county: string;
  href: string;
  cities?: { label: string; href: string }[];
}[] = [
  {
    county: "Los Angeles County",
    href: "/hard-money-lender-los-angeles",
    cities: [
      { label: "West Covina (HQ)", href: "/hard-money-lender-west-covina" },
      { label: "Covina", href: "/hard-money-lender-covina" },
      { label: "Pasadena", href: "/hard-money-lender-pasadena" },
      { label: "Glendale", href: "/hard-money-lender-glendale" },
      { label: "Long Beach", href: "/hard-money-lender-long-beach" },
      { label: "Pomona", href: "/hard-money-lender-pomona" },
      { label: "El Monte", href: "/hard-money-lender-el-monte" },
    ],
  },
  { county: "Orange County", href: "/hard-money-lender-orange-county" },
  { county: "San Diego County", href: "/hard-money-lender-san-diego" },
  { county: "Riverside County", href: "/hard-money-lender-riverside" },
  { county: "San Bernardino County", href: "/hard-money-lender-san-bernardino" },
];

const STATS = [
  { value: "$200M+", label: "Deployed Since 2009" },
  { value: "500+", label: "California Loans Funded" },
  { value: "7 Days", label: "Fastest Standard Close" },
  { value: "8", label: "Loan Programs" },
];

export default function CaliforniaStatePage() {
  return (
    <>
      <PageSeo
        title="Private Money Lender California | Capital Direct Funding"
        description={DESCRIPTION}
        path="/private-money-lender-california"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Private Money Lender California", path: "/private-money-lender-california" },
        ]}
        speakable={["h1", ".state-summary"]}
      />
      <StatePageSchema
        path="/private-money-lender-california"
        description={DESCRIPTION}
        faqs={STATE_FAQS}
      />
      <LoanProductsSchema />

      {/* Hero */}
      <section className="hero-atmosphere relative overflow-hidden pb-16 pt-32">
        <div className="relative z-10 max-container section-padding">
          <p className="eyebrow text-champagne-300 mb-4">
            Private Money Lender — California
          </p>
          <h1 className="font-heading text-[2.4rem] leading-[1.06] md:text-display-lg font-bold text-white mb-6 max-w-3xl">
            California Private Money Lending, Direct From the Source.
          </h1>
          <p className="state-summary text-ivory/70 leading-relaxed max-w-2xl mb-8">
            Capital Direct Funding lends its own and its investors&apos; capital
            on California real estate — no loan committee, no brokering your
            file across town. Eight business-purpose programs from 9.50%,
            $50,000 to $5,000,000, secured by first trust deeds and closing in
            as few as 7 business days.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`}
              className="inline-flex items-center rounded-lg bg-champagne-500 px-6 py-3 font-semibold text-cdf hover:bg-champagne-400 transition-colors"
            >
              Call {SITE_CONFIG.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Get Preliminary Terms
            </Link>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-cdf">
        <div className="max-container section-padding py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold text-champagne-300">
                {s.value}
              </p>
              <p className="text-ivory/60 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Definition / intro */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">What Private Money Is</p>
            <h2 className="font-heading text-heading-xl font-bold text-cdf mb-6">
              Asset-Based Lending, Built for California Timelines
            </h2>
            <p className="text-body leading-relaxed mb-4">
              A California private money loan — the industry uses &quot;hard
              money&quot; interchangeably — is short-term financing secured by
              real estate and underwritten on the asset rather than the
              borrower&apos;s tax returns. Banks underwrite the borrower and
              take 45 to 60 days; private lenders underwrite the property, the
              equity, and the plan, and close in days. That difference is the
              entire product: in competitive California markets, the buyer who
              can actually close wins the deal, and the owner facing a deadline
              keeps the property.
            </p>
            <p className="text-body leading-relaxed mb-4">
              What separates lenders inside this industry is where the money
              comes from. Many &quot;lenders&quot; are brokers who shop your
              file until someone bites — every handoff adding days and points.
              Capital Direct Funding is a direct lender: we deploy our own
              capital and our accredited investors&apos; capital, loans are
              made or arranged through our California DRE broker license
              (#{SITE_CONFIG.dreLicense}), and the person who quotes your deal
              is the person who funds it. We&apos;ve run this model from one
              office in West Covina since 2009 — over $200M across 500+
              California transactions, through every kind of market.
            </p>
            <p className="text-body leading-relaxed">
              Every loan is business-purpose, secured by a first trust deed at
              conservative leverage — typically 70% loan-to-value or below.
              Conservative leverage is not a limitation; it is why our
              approvals hold up through closing instead of getting
              &quot;re-traded&quot; the week of funding.
            </p>
          </div>
        </div>
      </section>

      {/* Rate table — the transparency play no ranking competitor matches */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <p className="eyebrow mb-3">California Rates &amp; Terms</p>
          <h2 className="font-heading text-heading-xl font-bold text-cdf mb-3">
            Published Numbers, Program by Program
          </h2>
          <p className="text-body leading-relaxed mb-8 max-w-3xl">
            Most California private lenders publish a vague blended range or no
            numbers at all. Here is every program we offer, with its actual
            starting rate, leverage, term, and size — the same numbers on our{" "}
            <Link href="/rates-and-terms" className="text-champagne-600 font-semibold hover:text-champagne-700">
              rates and terms page
            </Link>
            .
          </p>
          <div className="overflow-x-auto rounded-xl border border-cdf/10 bg-white">
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
                    <td className="px-5 py-4">{t.termMinMonths}–{t.termMaxMonths} months</td>
                    <td className="px-5 py-4">{formatAmount(t.amountMin)}–{formatAmount(t.amountMax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-body/70 max-w-3xl">
            Rates are starting points as of the date on this page and depend on
            property, leverage, and exit; final pricing comes in a written term
            sheet. All loans business-purpose, first trust deed, subject to
            underwriting. DRE# {SITE_CONFIG.dreLicense} | NMLS# {SITE_CONFIG.nmls}.
          </p>
        </div>
      </section>

      {/* Service-area hub — the three-tier network no competitor has */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <p className="eyebrow mb-3">Where We Lend</p>
          <h2 className="font-heading text-heading-xl font-bold text-cdf mb-3">
            Statewide Lending, Southern California Depth
          </h2>
          <p className="text-body leading-relaxed mb-8 max-w-3xl">
            We lend on real estate throughout California. Our deepest market
            knowledge is Southern California — the five counties below hold
            most of the $200M+ we&apos;ve deployed, and the San Gabriel Valley
            cities around our West Covina headquarters are streets we drive
            every day.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS.map((area) => (
              <div key={area.href} className="rounded-xl border border-cdf/10 p-6">
                <Link
                  href={area.href}
                  className="font-heading font-bold text-cdf hover:text-champagne-600 transition-colors"
                >
                  {area.county} →
                </Link>
                {area.cities && (
                  <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                    {area.cities.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="text-sm text-body/80 hover:text-champagne-600 transition-colors"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="rounded-xl border border-dashed border-cdf/15 p-6">
              <p className="font-heading font-bold text-cdf">Elsewhere in California</p>
              <p className="mt-2 text-sm text-body/80 leading-relaxed">
                Northern California, the Central Valley, and the Central Coast —
                if it&apos;s California real estate with a sound deal behind it,
                call us. <a href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`} className="text-champagne-600 font-semibold">{SITE_CONFIG.phone}</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why CDF — family-run E-E-A-T block */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Why Borrowers Choose CDF</p>
            <h2 className="font-heading text-heading-xl font-bold text-cdf mb-6">
              A Family-Run Direct Lender, Not a Loan Factory
            </h2>
            <p className="text-body leading-relaxed mb-4">
              Frank Williams founded Capital Direct Funding in 2009, in the
              teeth of the credit crisis, on a simple premise: California real
              estate deals fail on speed and certainty more often than on
              price. Seventeen years later the company is still family-run from
              the same city, and the model hasn&apos;t changed — direct
              capital, one office, decisions made by the people who answer the
              phone.
            </p>
            <p className="text-body leading-relaxed mb-6">
              That structure shows up in the loans. Complex situations that
              stall at committee-run shops — probate purchases on court
              timelines, foreclosure payoffs with a trustee sale date set,
              construction draws that can&apos;t wait two weeks, self-employed
              borrowers whose returns understate real cash flow — are our core
              business, not exceptions to it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/team" className="text-champagne-600 font-semibold hover:text-champagne-700 transition-colors">
                Meet the team →
              </Link>
              <Link href="/loan-process" className="text-champagne-600 font-semibold hover:text-champagne-700 transition-colors">
                How the 7-day close works →
              </Link>
            </div>
          </div>

          {/* Process strip */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS_STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-xl p-5 border border-cdf/5">
                <p className="font-heading text-champagne-600 font-bold text-sm mb-1">
                  Step {s.step}
                </p>
                <p className="font-heading font-bold text-cdf mb-2">{s.title}</p>
                <p className="text-sm text-body/80 leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <p className="eyebrow mb-3">Borrower Outcomes</p>
          <h2 className="font-heading text-heading-xl font-bold text-cdf mb-8">
            What Working With a Direct Lender Feels Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <figure key={t.quote.slice(0, 32)} className="rounded-xl bg-light p-6">
                <blockquote className="text-body leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="text-sm">
                  <span className="font-semibold text-cdf">{t.author}</span>
                  <span className="text-body/60"> — {t.location}</span>
                  <span className="block text-champagne-600 font-semibold mt-1">
                    {t.result}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Investor cross-audience */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow text-champagne-300 mb-3">The Other Side of the Loan</p>
            <h2 className="font-heading text-heading-xl font-bold text-white mb-4">
              Invest in California First Trust Deeds
            </h2>
            <p className="text-ivory/70 leading-relaxed mb-6">
              Every loan on this page is funded by capital like yours.
              Accredited investors earn 8.95%–10.95% in whole-note, first trust
              deed positions secured by California real estate — monthly
              interest, no fund fees, no lock-ups, and you select every deal
              individually.
            </p>
            <Link
              href="/investors"
              className="inline-flex items-center rounded-lg bg-champagne-500 px-6 py-3 font-semibold text-cdf hover:bg-champagne-400 transition-colors"
            >
              How Trust Deed Investing Works
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <p className="eyebrow mb-3">California Private Money FAQs</p>
          <h2 className="font-heading text-heading-xl font-bold text-cdf mb-8">
            Straight Answers, With Numbers
          </h2>
          <div className="max-w-3xl space-y-8">
            {STATE_FAQS.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-heading font-bold text-cdf mb-2">{faq.question}</h3>
                <p className="faq-answer text-body leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding text-center">
          <h2 className="font-heading text-heading-xl font-bold text-cdf mb-4">
            Have a California Deal? Get an Answer Today.
          </h2>
          <p className="text-body leading-relaxed mb-8 max-w-2xl mx-auto">
            One conversation is usually enough to know whether your scenario
            fits — and if it does, terms follow in writing within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${SITE_CONFIG.phone.replace(/[^0-9]/g, "")}`}
              className="inline-flex items-center rounded-lg bg-cdf px-6 py-3 font-semibold text-white hover:bg-cdf/90 transition-colors"
            >
              Call {SITE_CONFIG.phone}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-cdf/20 px-6 py-3 font-semibold text-cdf hover:bg-white transition-colors"
            >
              Start Online
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
