"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  FileText,
  Users,
  Zap,
  TrendingUp,
  Handshake,
  Building2,
  DollarSign,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

const PIPELINE_SCENARIOS = [
  {
    title: "Declined Conventional Applications",
    description:
      "Your borrower has a strong asset position but the DTI, credit history, or documentation doesn't meet conventional guidelines. Don't lose the client — send them to us. We underwrite the property and deal structure, not the tax return.",
    icon: Shield,
    tag: "Save the Deal",
  },
  {
    title: "Self-Employed & Bank Statement",
    description:
      "Business owners with strong cash flow but tax returns that show minimal income. We offer bank statement programs and simplified underwriting — no tax returns required. Your client gets funded, you preserve the relationship for their next conventional deal.",
    icon: FileText,
    tag: "No Tax Returns",
  },
  {
    title: "Credit Challenges",
    description:
      "Recent bankruptcy, foreclosure, short sale, or credit events that disqualify your borrower from conventional programs. If the property supports the loan and the exit strategy is sound, we fund. No minimum credit score.",
    icon: TrendingUp,
    tag: "No Credit Minimum",
  },
  {
    title: "Time-Sensitive Closings",
    description:
      "Your borrower needs to close in 7–10 days and the conventional lender needs 30–45. Whether it's a competitive offer, a 1031 deadline, or a foreclosure sale date, we match the timeline. Complete applications fund in as few as 7 days.",
    icon: Zap,
    tag: "7-Day Close",
  },
  {
    title: "Fix & Flip Investors",
    description:
      "Your investor clients need short-term acquisition and rehab capital with structured draws. Fix & flip is our core competency — up to 75% ARV, rates from 9.99%, with fast draws and no prepayment penalties.",
    icon: Building2,
    tag: "Core Program",
  },
  {
    title: "Bridge to Conventional",
    description:
      "Client needs time to stabilize — season a property, build credit, complete renovations, or establish income history. We provide 6–24 month bridge financing so you can place them conventionally when they're ready.",
    icon: ArrowRight,
    tag: "Refi Ready",
  },
];

const PARTNERSHIP_BENEFITS = [
  {
    title: "We're Your Partner, Not Your Competitor",
    description:
      "CDF is a bridge and short-term lender. Your client's exit strategy is typically a conventional refinance — back to you. We're a pipeline tool that helps you close more total transactions, not fewer.",
  },
  {
    title: "Fast, Reliable Answers",
    description:
      "Call Francisco with a scenario. You'll get a verbal response the same day — can we do this deal, at what terms, and how fast. No 3-week underwriting just to find out.",
  },
  {
    title: "Your Client, Your Relationship",
    description:
      "We don't market to your referrals, we don't solicit them for future loans, and we don't try to convert them to other products. When the bridge loan matures, your client comes back to you.",
  },
  {
    title: "Co-Branded Communication",
    description:
      "We keep you in the loop at every stage — application, appraisal, approval, docs, funding. You stay informed so you can manage your client's expectations and plan the conventional refi.",
  },
  {
    title: "No Minimum Volume",
    description:
      "Whether you send us one deal a year or one a week, you get the same direct access and service quality. No tiers, no volume requirements, no hoops.",
  },
  {
    title: "Clean, Documented Closings",
    description:
      "Licensed escrow, title insurance, independent appraisals, proper documentation on every transaction. We close deals that hold up to regulatory scrutiny — because our DRE and NMLS licenses depend on it.",
  },
];

export default function MortgagePage() {
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
              For Mortgage Professionals
            </p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Don&apos;t Lose the Deal.{" "}
              <span className="text-champagne-gradient">
                Send Us What Your Lender Can&apos;t Close.
              </span>
            </h1>
            <p className="text-xl text-ivory/70 leading-relaxed mb-4">
              Self-employed borrowers, credit challenges, tight timelines, fix
              &amp; flip investors — when your conventional lender declines or
              can&apos;t hit the deadline, we fund in as few as 7 days. Your
              client stays in your pipeline for the conventional refi.
            </p>
            <p className="text-ivory/50 leading-relaxed mb-8">
              We&apos;re a direct private lender. No committees. No overlays.
              Asset-based underwriting that says yes when the property and exit
              strategy support the deal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`}
                className="btn-champagne"
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link href="/contact" className="btn-ghost-light">
                Submit a Scenario
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pipeline Scenarios */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Pipeline Solutions"
            title="Deals We Fund That Your Lender Can&apos;t"
            subtitle="These are the scenarios mortgage brokers and loan officers send us every week — and we close them."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PIPELINE_SCENARIOS.map((scenario, i) => (
              <FadeIn key={scenario.title} delay={i * 60}>
                <div className="bg-light rounded-xl p-6 h-full border border-cdf/5 relative">
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-champagne-600 bg-champagne-500/10 px-2.5 py-1 rounded-full">
                    {scenario.tag}
                  </span>
                  <scenario.icon className="w-8 h-8 text-champagne-600 mb-4" />
                  <h3 className="font-heading text-lg font-bold text-cdf mb-3">
                    {scenario.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Parameters Quick-Reference */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Quick Reference"
            title="What We Fund"
            subtitle="Overview of programs your clients may qualify for."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { label: "Loan Range", value: "$50K – $5M" },
              { label: "Rates From", value: "8.50%" },
              { label: "Max LTV", value: "75% ARV" },
              { label: "Close In", value: "7 Days" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 60}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                  <p className="text-champagne-300 text-xs font-bold uppercase tracking-wider mb-1">
                    {stat.label}
                  </p>
                  <p className="font-heading text-3xl font-bold text-white">
                    {stat.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/borrowers"
              className="text-champagne-300 hover:text-champagne-200 text-sm font-medium transition-colors inline-flex items-center gap-1.5"
            >
              See All Loan Programs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Partnership"
            title="How the Relationship Works"
            subtitle="We exist to complement your business — not compete with it."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {PARTNERSHIP_BENEFITS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <div className="flex gap-4 items-start">
                  <CheckCircle className="w-5 h-5 text-champagne-600 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-heading text-base font-bold text-cdf mb-1">
                      {item.title}
                    </h3>
                    <p className="text-body text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
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
              Submit a Scenario — Same-Day Response
            </h2>
            <p className="text-lg text-ivory/70 max-w-2xl mx-auto mb-8">
              Call Francisco with your borrower&apos;s situation. You&apos;ll
              get a verbal answer the same day — can we fund it, at what terms,
              and how fast.
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
                Submit a Deal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
