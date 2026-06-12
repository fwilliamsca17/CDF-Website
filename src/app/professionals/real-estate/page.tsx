"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Building2,
  Users,
  Zap,
  TrendingUp,
  Handshake,
  DollarSign,
  Hammer,
  Award,
  Eye,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

const DEAL_SCENARIOS = [
  {
    title: "Buyer Financing Fell Through",
    description:
      "Your buyer was pre-approved, the conventional loan fell apart, and the seller is about to walk. We can step in and close in 7 days — saving your deal, your commission, and your client's earnest money.",
    icon: Zap,
    tag: "Deal Saver",
  },
  {
    title: "Fix & Flip Investor Clients",
    description:
      "Your investor clients need fast acquisition capital with rehab draws. Up to 75% ARV, rates from 9.99%, structured draw schedules, no prepayment penalty. We're the capital behind many of California's most active flippers.",
    icon: Hammer,
    tag: "Core Program",
  },
  {
    title: "Probate & Estate Listings",
    description:
      "You have the listing but the heirs need capital — to buy out co-beneficiaries, pay estate debts, or fund improvements before sale. We understand court-confirmation timelines and close within them.",
    icon: Shield,
    tag: "Estate Expertise",
  },
  {
    title: "Seller Needs a Bridge Loan",
    description:
      "Your seller found their next home but hasn't sold the current one. Rather than lose the purchase, we provide bridge financing against the departing property — your seller buys first, sells on their own timeline.",
    icon: ArrowRight,
    tag: "Bridge",
  },
  {
    title: "ADU & Construction Opportunities",
    description:
      "Homeowners and investors building ADUs or doing ground-up construction need capital. We fund ADUs at 75–85% LTC with milestone-based draws. Your clients add value, you potentially list the finished product.",
    icon: Building2,
    tag: "ADU",
  },
  {
    title: "Cash-Out Before Listing",
    description:
      "Your seller needs renovation capital to maximize list price. We provide fast cash-out refinancing so they can improve the property before going to market. Better property, higher price, bigger commission.",
    icon: DollarSign,
    tag: "Pre-List",
  },
];

const AGENT_VALUE = [
  {
    icon: Clock,
    title: "7-Day Closings — We Mean It",
    description:
      "Not 7 days to maybe underwrite. Seven days from completed application to funded deal. We've done it hundreds of times. Your listing stays active, your buyer doesn't walk, your transaction closes.",
  },
  {
    icon: Handshake,
    title: "Your Client Stays Yours",
    description:
      "We never prospect your clients. We don't market to them after the deal closes. We don't try to sell them other products. Your relationship is protected — period.",
  },
  {
    icon: Eye,
    title: "You Stay in the Loop",
    description:
      "Application received, appraisal ordered, approval issued, docs out, funded. You get updates at every milestone so you can manage your transaction timeline and keep all parties informed.",
  },
  {
    icon: Award,
    title: "$200M+ Funded — 15-Year Track Record",
    description:
      "Over 500 funded transactions across California. When you refer a client to CDF, you're referring them to a 15-year-old direct lender with a track record, not a startup that might not perform.",
  },
  {
    icon: Users,
    title: "Direct Access to Decision-Makers",
    description:
      "You call Francisco or Frank — the people who approve the loan. No voicemail trees, no processing departments. When you need a fast answer on whether we can do a deal, you get one.",
  },
  {
    icon: TrendingUp,
    title: "More Closings, More Commissions",
    description:
      "Every deal we save that would have fallen apart is a commission you keep. Every investor client we fund is a property they buy — through you. Private lending expands your closable transaction volume.",
  },
];

export default function RealEstatePage() {
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
              For Real Estate Agents
            </p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Close More Deals.{" "}
              <span className="text-champagne-gradient">
                We Fund in 7 Days What Banks Take 45.
              </span>
            </h1>
            <p className="text-xl text-ivory/70 leading-relaxed mb-4">
              When your buyer&apos;s financing falls through, your investor
              needs fast capital, or your listing requires creative funding —
              Capital Direct Funding closes in as few as 7 days. Your deal
              survives. Your commission is protected.
            </p>
            <p className="text-ivory/50 leading-relaxed mb-8">
              Direct private lender. $200M+ deployed. 500+ funded transactions
              across California. No committees — one call gets you an answer.
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
                Refer a Client
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deal Scenarios */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Deal Scenarios"
            title="Transactions We Help You Close"
            subtitle="These are the situations real estate agents across California call us for every week."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEAL_SCENARIOS.map((scenario, i) => (
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

      {/* How It Works for Agents */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Simple Process"
            title="How We Work With Real Estate Agents"
            subtitle="You bring the deal. We bring the capital. Three steps."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Call or Text the Scenario",
                description:
                  "Tell us the situation — property type, approximate value, what the client needs, and when they need it. We give you a verbal answer the same day, often within hours.",
              },
              {
                step: "02",
                title: "We Underwrite & Coordinate",
                description:
                  "CDF orders the appraisal, runs title, coordinates with your escrow, and structures the loan. You get copied on milestones. Your client gets white-glove service that reflects well on you.",
              },
              {
                step: "03",
                title: "Deal Closes — Commission Preserved",
                description:
                  "Loan funds in as few as 7 days. Your transaction closes. Your client is grateful. Your commission is protected. And you have a funding partner you can call next time.",
              },
            ].map((step, i) => (
              <FadeIn key={step.step} delay={i * 100}>
                <div className="text-center">
                  <span className="font-heading text-5xl font-bold text-champagne-400/20">
                    {step.step}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-white mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Agents Choose CDF */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="The CDF Advantage"
            title="Why Real Estate Agents Partner With Us"
            subtitle="Every deal we fund is a closing you get credit for. Here's why agents across California keep our number on speed dial."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AGENT_VALUE.map((item, i) => (
              <FadeIn key={item.title} delay={i * 60}>
                <div className="bg-white rounded-xl p-6 h-full border border-cdf/5">
                  <item.icon className="w-8 h-8 text-champagne-600 mb-4" />
                  <h3 className="font-heading text-base font-bold text-cdf mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
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
              Have a Deal That Needs Fast Funding?
            </h2>
            <p className="text-lg text-ivory/70 max-w-2xl mx-auto mb-8">
              Call Francisco. Describe the scenario. Get an answer today — not
              next week. If we can do it, you&apos;ll have terms within 24
              hours.
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
                Refer a Client
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
