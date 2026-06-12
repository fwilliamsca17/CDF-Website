"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Shield,
  TrendingUp,
  PiggyBank,
  Landmark,
  DollarSign,
  Briefcase,
  Eye,
  Banknote,
  FileText,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

const INVESTOR_STRATEGIES = [
  {
    title: "SDIRA Trust Deed Placements",
    description:
      "Your clients' self-directed IRAs can earn 8.95–10.95% annual yields secured by California real estate. Each investment is individually selected — no blind pools, no fund manager risk. Interest grows tax-deferred (traditional) or tax-free (Roth).",
    icon: PiggyBank,
    yield: "8.95–10.95%",
  },
  {
    title: "Solo 401(k) Deployment",
    description:
      "Self-employed clients with Solo 401(k) plans can invest in whole-note first trust deeds. Higher contribution limits than IRAs, plus potential for Roth conversion strategies on real estate-backed yields. We coordinate directly with plan administrators.",
    icon: Landmark,
    yield: "First Position",
  },
  {
    title: "Entity-Structured Investments",
    description:
      "LLCs, family trusts, and S-corps can hold trust deed investments. We record the deed in whatever entity structure your client prefers. Flexible for estate planning, asset protection, and multi-generational wealth transfer strategies.",
    icon: Briefcase,
    yield: "Flexible Structure",
  },
];

const LENDING_STRATEGIES = [
  {
    title: "1031 Exchange Bridge Financing",
    description:
      "Your client identified a replacement property but needs to close before their conventional financing is ready. We bridge the gap in 7 days, keeping the exchange timeline intact and avoiding a failed exchange.",
    icon: ArrowRight,
    tag: "Time-Critical",
  },
  {
    title: "Self-Employed Client Solutions",
    description:
      "Conventional lenders require 2 years of tax returns your client doesn't want to produce — or the returns don't show enough income despite strong cash flow. We underwrite the asset, not the tax return. Bank statement programs available.",
    icon: FileText,
    tag: "No Tax Returns",
  },
  {
    title: "Cash-Out for Business Capital",
    description:
      "Your client has equity in investment properties they need to access for business purposes. Banks take 45–60 days and require full documentation. We provide cash-out refinancing in as few as 7 days on business-purpose loans.",
    icon: DollarSign,
    tag: "Fast Capital",
  },
];

const CPA_VALUE = [
  {
    icon: Eye,
    title: "Full Transparency on Every Deal",
    description:
      "Your client sees the property, the appraisal, the borrower profile, the LTV, the rate, and the term before committing a dollar. No black-box fund allocations.",
  },
  {
    icon: Shield,
    title: "Conservative Underwriting",
    description:
      "60–75% LTV ratios on every trust deed investment. First position only — never subordinate. Independent appraisals and title insurance on every transaction.",
  },
  {
    icon: TrendingUp,
    title: "Predictable, Documented Returns",
    description:
      "Monthly interest payments at stated rates. No performance fee haircuts, no NAV adjustments. Clean 1099 reporting for your client's tax filings.",
  },
  {
    icon: Banknote,
    title: "No Fund Fees or Lock-ups",
    description:
      "Zero management fees, zero performance fees, zero redemption gates. Your client's return is the stated interest rate. Capital returns at loan maturity — no waiting for a fund window.",
  },
];

export default function CPAsPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-atmosphere pt-32 pb-20 relative overflow-hidden">
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="hero-grain absolute inset-0 pointer-events-none opacity-[0.03]" />
        <div className="hero-vignette absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="eyebrow !text-champagne-300 mb-3">
              For CPAs & Tax Advisors
            </p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Tax-Advantaged Real Estate{" "}
              <span className="text-champagne-gradient">
                Your Clients Can&apos;t Get From a Fund
              </span>
            </h1>
            <p className="text-xl text-ivory/70 leading-relaxed mb-4">
              Your high-net-worth clients want real estate exposure without
              management headaches. Trust deed investments deliver 8.95–10.95%
              yields, monthly income, and tangible California property security —
              through SDIRAs, Solo 401(k)s, and entity structures you already
              advise on.
            </p>
            <p className="text-ivory/50 leading-relaxed mb-8">
              Plus: when your business-owner clients can&apos;t get conventional
              financing, we fund them in 7 days — no tax returns required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="btn-champagne"
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link href="/investors" className="btn-ghost-light">
                Trust Deed Investment Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investment Strategies */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="For Your Investor Clients"
            title="Tax-Advantaged Trust Deed Strategies"
            subtitle="Help your clients deploy capital into individually selected, first-position trust deeds secured by California real estate."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {INVESTOR_STRATEGIES.map((strategy, i) => (
              <FadeIn key={strategy.title} delay={i * 80}>
                <div className="bg-light rounded-xl p-8 h-full border border-cdf/5">
                  <div className="flex items-center justify-between mb-4">
                    <strategy.icon className="w-8 h-8 text-champagne-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-champagne-600 bg-champagne-500/10 px-3 py-1 rounded-full">
                      {strategy.yield}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-cdf mb-3">
                    {strategy.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lending Strategies */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="For Your Borrower Clients"
            title="Financing When Conventional Lenders Can&apos;t Help"
            subtitle="When your clients need capital fast — or can't qualify conventionally — here's how we solve it."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {LENDING_STRATEGIES.map((strategy, i) => (
              <FadeIn key={strategy.title} delay={i * 80}>
                <div className="bg-white rounded-xl p-8 h-full border border-cdf/5 relative">
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-champagne-600 bg-champagne-500/10 px-2.5 py-1 rounded-full">
                    {strategy.tag}
                  </span>
                  <strategy.icon className="w-8 h-8 text-champagne-600 mb-4" />
                  <h3 className="font-heading text-lg font-bold text-cdf mb-3">
                    {strategy.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {strategy.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why CPAs Trust CDF */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="The CDF Difference"
            title="Why CPAs Recommend Capital Direct Funding"
            subtitle="Your clients trust your judgment. Here's why trust deed investments through CDF hold up under scrutiny."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {CPA_VALUE.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full">
                  <item.icon className="w-8 h-8 text-champagne-400 mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-atmosphere section-padding-y relative overflow-hidden">
        <div className="hairline-champagne absolute inset-x-0 top-0 h-px" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #C9A86A 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="hero-glow pointer-events-none absolute left-1/2 top-0 h-[40vw] w-[70vw] -translate-x-1/2 opacity-60" />

        <div className="relative z-10 max-container section-padding text-center">
          <FadeIn>
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-white heading-underline-center mb-6">
              Explore a Strategy for Your Clients
            </h2>
            <p className="text-lg text-ivory/70 max-w-2xl mx-auto mb-8">
              Whether your client wants to invest in trust deeds through a
              tax-advantaged account or needs fast capital for a business-purpose
              real estate transaction — one call tells you everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="btn-champagne"
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link href="/contact" className="btn-ghost-light">
                Send a Referral
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
