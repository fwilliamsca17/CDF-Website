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
  Scale,
  Handshake,
  Zap,
  Lock,
  Users,
  Award,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

const CLIENT_SCENARIOS = [
  {
    title: "Probate & Estate Distributions",
    description:
      "Heirs need to access equity in estate properties before or after court confirmation. Whether it's funding buyouts between beneficiaries, paying estate debts, or preserving property value during probate, we close within the court's timeline — not against it.",
    icon: Scale,
    tag: "Most Common",
  },
  {
    title: "Post-Bankruptcy Financing",
    description:
      "Your client has emerged from bankruptcy but every conventional lender has declined them. We underwrite the asset, not the credit history. If the property and deal structure are sound, we fund — often within 7 days of completed application.",
    icon: Shield,
    tag: "No Credit Minimum",
  },
  {
    title: "Divorce & Property Buyouts",
    description:
      "One spouse needs to buy out the other's interest in the marital home or investment property. Conventional financing can take 45–60 days. We close in 7, keeping your settlement timeline intact and both parties moving forward.",
    icon: Users,
    tag: "7-Day Close",
  },
  {
    title: "Foreclosure Intervention",
    description:
      "Your client is days from losing their property. Banks won't touch it. We provide emergency funding to pay off the delinquent balance, stop the sale, and give your client time to refinance conventionally or sell on their own terms.",
    icon: Zap,
    tag: "Emergency",
  },
  {
    title: "Litigation Bridge Financing",
    description:
      "During real estate disputes, your client may need capital to maintain the property, fund legal costs, or execute a court-ordered transaction. We provide bridge financing that works within the constraints of active litigation.",
    icon: FileText,
    tag: "Flexible Terms",
  },
  {
    title: "Trust & Estate Property Sales",
    description:
      "Trust sales, conservatorship dispositions, and estate liquidations all have unique timing requirements. We understand court confirmation processes, overbid procedures, and the documentation your clients need to satisfy the court.",
    icon: Lock,
    tag: "Court-Experienced",
  },
];

const ATTORNEY_VALUE = [
  {
    title: "We Understand Court Timelines",
    description:
      "Probate confirmations, bankruptcy discharge schedules, settlement deadlines — we've structured hundreds of loans around court-mandated timelines. We know when to push and when to wait.",
  },
  {
    title: "Your Client Stays Your Client",
    description:
      "We never solicit your referrals for future business. Your client relationship is sacred. We serve them for this transaction and return them to you.",
  },
  {
    title: "Documentation You Can Rely On",
    description:
      "Every loan is documented through licensed escrow with title insurance, independent appraisals, and clean chain of title. Your client's interests are properly secured.",
  },
  {
    title: "Direct Communication With Decision-Makers",
    description:
      "You speak with Francisco or Frank — the people who approve the loan. No call centers, no runaround. When you need a status update or a creative solution, you get one immediately.",
  },
  {
    title: "Experience With Complex Structures",
    description:
      "Cross-collateralization, entity transfers, trust-to-individual conveyances, multiple-lien scenarios — we've structured them all. We work with your legal framework, not around it.",
  },
  {
    title: "15 Years of Attorney Partnerships",
    description:
      "Estate attorneys, family law practitioners, bankruptcy specialists, and real estate litigators across California refer to us because we perform. Over $200M deployed. 500+ funded transactions.",
  },
];

export default function AttorneysPage() {
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
            <p className="eyebrow !text-champagne-300 mb-3">For Attorneys</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Your Client Needs Capital.{" "}
              <span className="text-champagne-gradient">
                The Bank Said No.
              </span>
            </h1>
            <p className="text-xl text-ivory/70 leading-relaxed mb-4">
              Probate distributions, post-bankruptcy fresh starts, divorce
              buyouts, foreclosure rescues — when your client&apos;s real estate
              situation requires capital that banks won&apos;t provide, we close
              in as few as 7 days.
            </p>
            <p className="text-ivory/50 leading-relaxed mb-8">
              Capital Direct Funding is a direct private lender — not a broker.
              We lend our own and our investors&apos; capital, so there are no
              committees to wait for and no underwriters to convince.
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

      {/* Client Scenarios */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Client Scenarios"
            title="Situations Where Your Clients Need Us"
            subtitle="These are the real estate financing challenges we solve every week for attorneys across California."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_SCENARIOS.map((scenario, i) => (
              <FadeIn key={scenario.title} delay={i * 60}>
                <div className="bg-light rounded-xl p-6 h-full border border-cdf/5 relative">
                  {scenario.tag && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-champagne-600 bg-champagne-500/10 px-2.5 py-1 rounded-full">
                      {scenario.tag}
                    </span>
                  )}
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

      {/* How We Work With Attorneys */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Referral Process"
            title="How We Work With Attorneys"
            subtitle="You focus on the legal strategy. We handle the capital."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Tell Us the Situation",
                description:
                  "Call Francisco directly or email us a summary of your client's real estate financing need. Within 24 hours you'll have preliminary terms — often the same day.",
              },
              {
                step: "02",
                title: "We Underwrite & Close",
                description:
                  "CDF orders the appraisal, runs title, coordinates with escrow, and structures the loan to work within your legal framework. You're copied on every milestone.",
              },
              {
                step: "03",
                title: "Client Gets Funded",
                description:
                  "Loan closes in as few as 7 days. Deed is recorded. Your client has the capital they need, your case moves forward, and you've delivered a result.",
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

      {/* Why Attorneys Choose CDF */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Why CDF"
            title="Why Attorneys Refer to Capital Direct Funding"
            subtitle="Your reputation is at stake with every referral. Here's why estate attorneys, bankruptcy specialists, and family law practitioners across California trust us."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ATTORNEY_VALUE.map((item, i) => (
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
              Discuss a Client Scenario
            </h2>
            <p className="text-lg text-ivory/70 max-w-2xl mx-auto mb-8">
              Confidential. No obligation. Call Francisco directly to discuss
              how we can help your client — and whether private funding is the
              right fit for their situation.
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
