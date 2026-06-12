"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scale,
  Banknote,
  Landmark,
  Building2,
  Phone,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Handshake,
  Users,
  Award,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

const PROFESSIONS = [
  {
    title: "Attorneys",
    href: "/professionals/attorneys",
    icon: Scale,
    description:
      "Probate, estate, bankruptcy, divorce, and real estate litigation. When your client needs capital and the bank says no, we close in days — not months.",
    scenarios: [
      "Probate distributions requiring property equity access",
      "Post-bankruptcy financing for fresh-start clients",
      "Divorce buyout loans for property division",
      "Foreclosure intervention with 7-day emergency funding",
    ],
  },
  {
    title: "CPAs & Tax Advisors",
    href: "/professionals/cpas",
    icon: Banknote,
    description:
      "Tax-advantaged real estate strategies your high-net-worth clients can't get from a fund. Trust deed investments through SDIRAs, Solo 401(k)s, and entity structures.",
    scenarios: [
      "SDIRA / Solo 401(k) trust deed placements at 8.95–10.95%",
      "1031 exchange bridge financing within tight deadlines",
      "Self-employed clients declined by conventional lenders",
      "Entity structuring for real estate investment portfolios",
    ],
  },
  {
    title: "Mortgage Professionals",
    href: "/professionals/mortgage",
    icon: Landmark,
    description:
      "Don't lose the deal — send us what your lender can't close. Non-QM, credit challenges, self-employment, and time-sensitive scenarios we fund in 7 days.",
    scenarios: [
      "Declined conventional applications with strong asset positions",
      "Self-employed borrowers who can't meet doc requirements",
      "Credit challenges that disqualify from traditional programs",
      "Time-critical closings the bank can't meet",
    ],
  },
  {
    title: "Real Estate Agents",
    href: "/professionals/real-estate",
    icon: Building2,
    description:
      "Close more deals. When your buyer's financing falls through or your investor client needs fast capital, we fund in 7 days and protect your commission.",
    scenarios: [
      "Buyer financing fell through — fast backup lending",
      "Fix & flip investors who need same-week capital",
      "Probate and estate listings needing funded buyers",
      "Sellers needing bridge loans to purchase their next home",
    ],
  },
];

const TRUST_SIGNALS = [
  {
    icon: Clock,
    title: "7-Day Closings",
    description: "We close in as few as 7 business days. Your clients don't wait — and neither do you.",
  },
  {
    icon: Shield,
    title: "$200M+ Deployed",
    description: "Over 500 funded transactions across California. A 15-year track record your reputation can rely on.",
  },
  {
    icon: Handshake,
    title: "Protected Relationships",
    description: "Your client is your client. We never solicit your referrals directly. Your relationship stays intact.",
  },
  {
    icon: Award,
    title: "Direct Decision-Makers",
    description: "No committees, no layers. Francisco and Frank personally review every deal. One call gets answers.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "You get a direct line to our team. Status updates, draw schedules, payoff timelines — proactive communication throughout.",
  },
  {
    icon: CheckCircle,
    title: "Transparent Terms",
    description: "No hidden fees, no surprise conditions. Your client sees every cost before they sign. You never have to explain away unexpected charges.",
  },
];

export default function ProfessionalsPage() {
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
              Referral Partners
            </p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Your Clients Deserve a{" "}
              <span className="text-champagne-gradient">
                Funding Partner Who Delivers
              </span>
            </h1>
            <p className="text-xl text-ivory/70 leading-relaxed mb-4">
              When your clients face complex real estate situations — probate,
              bankruptcy, time-sensitive closings, or unconventional
              circumstances — Capital Direct Funding closes in days, not months.
            </p>
            <p className="text-ivory/50 leading-relaxed mb-8">
              We work alongside attorneys, CPAs, mortgage professionals, and
              real estate agents who need a direct lender they can trust with
              their most important client relationships.
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
                Start a Referral Partnership
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profession Cards */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Choose Your Practice Area"
            title="How We Serve Your Profession"
            subtitle="Select your practice area for scenarios, solutions, and the referral process tailored to how you work."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROFESSIONS.map((prof, i) => (
              <FadeIn key={prof.href} delay={i * 80}>
                <Link
                  href={prof.href}
                  className="group block bg-light rounded-2xl p-8 border border-cdf/5 hover:border-champagne-500/20 transition-all duration-300 h-full hover:shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-champagne-500/10 flex items-center justify-center shrink-0 group-hover:bg-champagne-500/20 transition-colors">
                      <prof.icon className="w-6 h-6 text-champagne-600" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-cdf group-hover:text-champagne-700 transition-colors">
                      {prof.title}
                    </h3>
                  </div>
                  <p className="text-body leading-relaxed mb-5">
                    {prof.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {prof.scenarios.map((s) => (
                      <div key={s} className="flex gap-2.5 items-start">
                        <CheckCircle className="w-4 h-4 text-champagne-600 mt-0.5 shrink-0" />
                        <span className="text-sm text-body">{s}</span>
                      </div>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-champagne-600 group-hover:text-champagne-700 transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Professionals Trust CDF */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="The CDF Difference"
            title="Why Professionals Trust Us With Their Clients"
            subtitle="Your reputation is on the line with every referral. Here's why professionals across California choose CDF."
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRUST_SIGNALS.map((signal, i) => (
              <FadeIn key={signal.title} delay={i * 60}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full">
                  <signal.icon className="w-8 h-8 text-champagne-400 mb-4" />
                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {signal.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {signal.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How Referrals Work */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Simple Process"
            title="How the Referral Works"
            subtitle="Three steps. No paperwork for you. We handle everything from first call to funded deal."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Introduce Us",
                description:
                  "Call or email us with your client's situation. Or have them call us directly and mention your name. Either way, we respond within 24 hours.",
              },
              {
                step: "02",
                title: "We Handle the Rest",
                description:
                  "CDF underwrites the deal, orders the appraisal, coordinates with escrow and title, and keeps you updated throughout. Your client gets white-glove service.",
              },
              {
                step: "03",
                title: "Client Gets Funded",
                description:
                  "Loan closes in as few as 7 days. Your client's problem is solved, your professional relationship is strengthened, and you stay informed at every step.",
              },
            ].map((step, i) => (
              <FadeIn key={step.step} delay={i * 100}>
                <div className="text-center">
                  <span className="font-heading text-5xl font-bold text-champagne-500/20">
                    {step.step}
                  </span>
                  <h3 className="font-heading text-xl font-bold text-cdf mt-2 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body leading-relaxed">{step.description}</p>
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
            <p className="eyebrow !text-champagne-300 mb-3">Get Started</p>
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-white heading-underline-center mb-6">
              Start Your Referral Partnership
            </h2>
            <p className="text-lg text-ivory/70 max-w-2xl mx-auto mb-8">
              One call tells you everything you need to know. Speak directly
              with Francisco or Frank about how we can serve your clients.
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
