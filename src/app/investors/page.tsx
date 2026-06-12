"use client";

import { motion } from "framer-motion";
import { iconMap } from "@/lib/icons";
import {
  CheckCircle,
  Phone,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const INVESTMENT_LIFECYCLE = [
  {
    step: 1,
    title: "Introduction Call",
    description:
      "Speak directly with Francisco or Frank about your investment goals, risk tolerance, and preferred deal types. We learn what you're looking for so we only present relevant opportunities.",
    icon: "Phone",
  },
  {
    step: 2,
    title: "Review Deal Details",
    description:
      "When a loan matches your criteria, we present the full package: property address, photos, independent appraisal, borrower profile, loan-to-value ratio, interest rate, term, and exit strategy.",
    icon: "Search",
  },
  {
    step: 3,
    title: "Select & Fund Through Escrow",
    description:
      "You choose which deals to invest in — every decision is yours. Capital is disbursed through a licensed escrow company with title insurance on every transaction.",
    icon: "ClipboardList",
  },
  {
    step: 4,
    title: "Deed Recorded in Your Name",
    description:
      "A first trust deed is recorded at the county recorder's office in your name (or your entity, trust, or custodian). You hold the senior lien position on the property — the same security a bank holds.",
    icon: "FileText",
  },
  {
    step: 5,
    title: "Earn Monthly Interest",
    description:
      "Receive monthly interest payments for the life of the loan. CDF handles all servicing — payment collection, escrow management, and reporting. You receive a check or wire each month.",
    icon: "TrendingUp",
  },
  {
    step: 6,
    title: "Principal Returned at Payoff",
    description:
      "When the borrower refinances or sells the property, your full principal is returned through escrow. Many investors roll proceeds directly into the next available opportunity.",
    icon: "RefreshCw",
  },
];

const INVESTMENT_PARAMETERS = [
  { label: "Loan-to-Value", value: "60–75%", note: "Conservative ratios on every deal" },
  { label: "Yields", value: "8.95–10.95%", note: "Annual interest, paid monthly" },
  { label: "Loan Terms", value: "6–24 months", note: "Short duration, capital recycles" },
  { label: "Lien Position", value: "First Trust Deed", note: "Senior position only — never subordinate" },
  { label: "Property Types", value: "Residential · Commercial · Multi-Family", note: "California real property" },
  { label: "Minimum Investment", value: "Whole Note", note: "You fund the entire loan — no fractional pools" },
];

const ACCOUNT_TYPES = [
  {
    title: "Personal or Joint",
    description: "Invest as an individual or with a spouse/partner. Interest income reported on your personal return.",
    icon: "Users",
  },
  {
    title: "Self-Directed IRA",
    description:
      "Use your existing IRA through a self-directed custodian like Forge Trust, Provident Trust Group, or The Entrust Group. Interest grows tax-deferred or tax-free (Roth).",
    icon: "PiggyBank",
  },
  {
    title: "Solo 401(k)",
    description:
      "Self-employed investors can deploy Solo 401(k) funds into trust deeds. We coordinate directly with your plan administrator for funding and payoff.",
    icon: "Landmark",
  },
  {
    title: "Trust or Entity",
    description:
      "Invest through your living trust, family trust, LLC, or corporation. The deed is recorded in the entity name exactly as you direct.",
    icon: "Briefcase",
  },
];

const WHY_DIRECT = [
  {
    title: "You Choose Every Deal",
    description: "No blind pools. You review every loan opportunity and decide which to fund. Full transparency on borrower, property, and terms before you commit a dollar.",
    icon: "Eye",
  },
  {
    title: "You Own the Note Directly",
    description: "Your name (or entity) is on the recorded deed of trust. You hold the actual security instrument — not a fund share, not a participation certificate.",
    icon: "FileText",
  },
  {
    title: "First Position Only",
    description: "Every investment is a first trust deed — the senior lien on the property. In a default scenario, first position is paid before all junior lienholders.",
    icon: "Shield",
  },
  {
    title: "No Fund Fees or Lock-ups",
    description: "No management fees, no performance fees, no redemption gates. Your returns are the stated interest rate on the note. Capital returns at maturity — no waiting for a fund window.",
    icon: "DollarSign",
  },
  {
    title: "Personally Underwritten",
    description: "Francisco and Frank personally review every loan. Independent appraisals, title searches, borrower vetting, and escrow-managed disbursements on every transaction.",
    icon: "Handshake",
  },
  {
    title: "California Real Estate Security",
    description: "All loans are secured by California real property — one of the most liquid and valuable real estate markets in the world. Tangible asset backing every dollar you invest.",
    icon: "Building2",
  },
];

const RISK_MITIGANTS = [
  "Conservative LTV ratios (typically 60–75%)",
  "First trust deed position on all loans",
  "Independent appraisals on every property",
  "Title insurance on all transactions",
  "Borrower personal guarantees",
  "Escrow-managed disbursements",
  "Monthly reporting and transparency",
  "California real estate — liquid and valuable",
];

export default function InvestorsPage() {
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
              Direct Trust Deed Investment
            </p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Invest Directly in{" "}
              <span className="text-champagne-gradient">
                California Real Estate
              </span>
            </h1>
            <p className="text-xl text-ivory/70 leading-relaxed mb-4">
              Whole-note, first trust deed positions — you select the deal, you
              own the note, you hold the recorded lien. No blind pools, no fund
              fees, no lock-ups.
            </p>
            <p className="text-ivory/50 leading-relaxed mb-8">
              CDF originates, underwrites, and services the loans. You invest in
              the ones that match your goals and earn monthly interest secured by
              tangible California property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="btn-champagne"
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <a href="#how-it-works" className="btn-ghost-light">
                See How It Works
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Is Trust Deed Investing */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="eyebrow mb-3">Understanding the Investment</p>
              <h2 className="font-heading text-heading-xl font-bold text-cdf heading-underline mb-6">
                What Is Trust Deed Investing?
              </h2>
              <p className="text-body text-lg leading-relaxed mb-4">
                A trust deed investment is a loan you make to a real estate
                borrower, secured by a recorded lien on their property. It&apos;s
                the same instrument a bank uses when it issues a mortgage — except
                you&apos;re the bank.
              </p>
              <p className="text-body leading-relaxed mb-4">
                When a borrower needs capital — to purchase, renovate, bridge to
                permanent financing, or access equity during a special
                circumstance — CDF originates and underwrites the loan, then
                presents it to investors like you. If you fund the deal, a first
                trust deed is recorded in your name at the county recorder&apos;s
                office, giving you the senior secured position on the property.
              </p>
              <p className="text-body leading-relaxed">
                You earn monthly interest for the life of the loan. When the
                borrower pays off (typically by refinancing or selling), your
                principal is returned through escrow. The entire process is
                transparent, individually selected, and backed by a tangible
                California real estate asset.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="bg-light rounded-2xl p-8 border border-cdf/5">
                <h3 className="font-heading text-lg font-bold text-cdf mb-6">
                  How It Differs From Other Real Estate Investments
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      vs: "vs. REITs",
                      diff: "You own the actual note, not a publicly traded share. No market volatility, no correlation to stock indices.",
                    },
                    {
                      vs: "vs. Real Estate Funds",
                      diff: "No blind pools, no management fees, no lock-up periods. You review and select every deal individually.",
                    },
                    {
                      vs: "vs. Crowdfunding Platforms",
                      diff: "Direct relationship with the originator. No platform intermediary, no fractional participation. You hold the whole note.",
                    },
                    {
                      vs: "vs. Direct Property Ownership",
                      diff: "No tenants, no maintenance, no property management. Passive monthly income without the operational burden.",
                    },
                  ].map((item) => (
                    <div key={item.vs} className="flex gap-3">
                      <ArrowRight className="w-4 h-4 text-champagne-600 mt-1.5 shrink-0" />
                      <div>
                        <p className="font-heading text-sm font-bold text-cdf">
                          {item.vs}
                        </p>
                        <p className="text-body text-sm leading-relaxed">
                          {item.diff}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Investment Process — 6-step lifecycle */}
      <section
        id="how-it-works"
        className="section-padding-y bg-light scroll-mt-28"
      >
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="The Investment Process"
            title="How You Invest With CDF"
            subtitle="From your first call to monthly interest checks — here's exactly how a direct trust deed investment works, step by step."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INVESTMENT_LIFECYCLE.map((step, i) => {
              const IconComponent = iconMap[step.icon];
              return (
                <FadeIn key={step.step} delay={i * 80}>
                  <div className="bg-white rounded-xl p-6 h-full border border-cdf/5 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-champagne-500/10 flex items-center justify-center shrink-0">
                        {IconComponent && (
                          <IconComponent className="w-5 h-5 text-champagne-600" />
                        )}
                      </div>
                      <span className="font-heading text-3xl font-bold text-cdf/10">
                        0{step.step}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Parameters */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Investment Parameters"
            title="What to Expect"
            subtitle="Every loan is individually underwritten and presented with full details. Here are the general parameters across our portfolio."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {INVESTMENT_PARAMETERS.map((param, i) => (
              <FadeIn key={param.label} delay={i * 60}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full">
                  <p className="text-champagne-300 text-xs font-bold uppercase tracking-wider mb-1">
                    {param.label}
                  </p>
                  <p className="font-heading text-2xl font-bold text-white mb-2">
                    {param.value}
                  </p>
                  <p className="text-white/50 text-sm">{param.note}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Direct Investment */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="The CDF Advantage"
            title="Why Direct Investment"
            subtitle="Trust deed investing through CDF gives you what funds, platforms, and pooled vehicles can't: direct ownership, full transparency, and individual deal selection."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_DIRECT.map((item, i) => {
              const IconComponent = iconMap[item.icon];
              return (
                <FadeIn key={item.title} delay={i * 80}>
                  <div className="bg-light rounded-xl p-6 card-hover h-full">
                    <div className="w-10 h-10 rounded-lg bg-champagne-500/10 flex items-center justify-center mb-4">
                      {IconComponent && (
                        <IconComponent className="w-5 h-5 text-champagne-600" />
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                      {item.title}
                    </h3>
                    <p className="text-body text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Account Types */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Flexible Account Structures"
            title="Invest With the Right Account"
            subtitle="Trust deed investments work with multiple account types. We coordinate directly with your custodian or plan administrator."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ACCOUNT_TYPES.map((acct, i) => {
              const IconComponent = iconMap[acct.icon];
              return (
                <FadeIn key={acct.title} delay={i * 80}>
                  <div className="bg-white rounded-xl p-6 border border-cdf/5 h-full text-center">
                    <div className="w-12 h-12 rounded-full bg-champagne-500/10 flex items-center justify-center mx-auto mb-4">
                      {IconComponent && (
                        <IconComponent className="w-6 h-6 text-champagne-600" />
                      )}
                    </div>
                    <h3 className="font-heading text-base font-bold text-cdf mb-2">
                      {acct.title}
                    </h3>
                    <p className="text-body text-sm leading-relaxed">
                      {acct.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Risk Mitigation */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="eyebrow !text-champagne-300 mb-3">
                Risk Mitigation
              </p>
              <h2 className="font-heading text-heading-xl font-bold text-white heading-underline mb-6">
                Protecting Your Investment
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-4">
                Capital preservation is our first priority. Every loan is
                personally reviewed by Francisco and Frank with multiple layers
                of protection built into every transaction.
              </p>
              <p className="text-white/60 leading-relaxed">
                We underwrite conservatively because our reputation depends on
                investor outcomes. Over 15 years and $200M+ in capital deployed,
                our track record reflects that discipline.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <ul className="space-y-3">
                  {RISK_MITIGANTS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-white/80 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-champagne-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Get Started — phone-first CTA */}
      <section
        id="get-started"
        className="section-padding-y bg-white scroll-mt-28"
      >
        <div className="max-container section-padding text-center">
          <FadeIn>
            <p className="eyebrow mb-3">Get Started</p>
            <h2 className="font-heading text-heading-xl font-bold text-cdf heading-underline-center mb-6">
              Ready to Invest?
            </h2>
            <p className="text-body text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              The best way to get started is a conversation. Call Francisco or
              Frank directly — we&apos;ll walk you through our current
              inventory, answer your questions, and discuss which opportunities
              match your investment goals.
            </p>
            <p className="text-body/60 text-sm mb-8">
              Trust deed investments through Capital Direct Funding are
              available to accredited investors. All investments involve risk.
              Past performance is not indicative of future results. This is not
              an offer to sell securities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="btn-champagne"
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Button href="/contact" variant="cdf" showArrow>
                Send a Message
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
