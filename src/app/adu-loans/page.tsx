"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  CreditCard,
  Clock,
  UserCheck,
  Home,
  DollarSign,
  Lock,
  Shield,
  Activity,
  FileText,
  Phone,
  CheckCircle,
  ArrowRight,
  Star,
  MessageSquare,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const FEATURES = [
  {
    icon: CreditCard,
    title: "75\u201385% Loan-to-Cost",
    description:
      "Maximize your leverage. We fund up to 85% of total project cost including land value, permitting, and construction \u2014 so you keep more cash for reserves.",
  },
  {
    icon: Clock,
    title: "Fast Underwriting",
    description:
      "Our streamlined 12-point forensic underwriting process means faster decisions. No weeks of back-and-forth \u2014 get clarity quickly so your project stays on schedule.",
  },
  {
    icon: UserCheck,
    title: "Milestone-Based Draws",
    description:
      "Funding releases tied to construction milestones \u2014 foundation, framing, MEP, finishes. You only pay interest on what\u2019s drawn, keeping carrying costs low.",
  },
  {
    icon: Home,
    title: "ADU Specialists",
    description:
      "We understand zoning (SB 9, SB 13, AB 68), lot utilization ratios, and ADU-specific permitting across every LA and OC jurisdiction. We speak your language.",
  },
  {
    icon: DollarSign,
    title: "Construction-to-Perm",
    description:
      "Seamless transition from your construction loan to permanent financing. DSCR, conventional refi, or sale exit \u2014 we map your takeout from day one.",
  },
  {
    icon: Lock,
    title: "Interest Reserve Built In",
    description:
      "Your interest reserve is capitalized into the loan \u2014 no monthly payments from your pocket during construction. Focus on building, not cash flow juggling.",
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Pre-Qualify",
    description:
      "Submit your property details and project plan. We respond within 24 hours with your eligibility and estimated terms.",
  },
  {
    step: 2,
    title: "Underwriting",
    description:
      "Our team verifies property value, zoning compliance, contractor bids, and construction timeline via our 12-point forensic checklist.",
  },
  {
    step: 3,
    title: "Approval & Close",
    description:
      "Receive your commitment letter, finalize docs, and close. Interest reserve and first draw funded at closing.",
  },
  {
    step: 4,
    title: "Build & Draw",
    description:
      "Construction begins. Funds released at each milestone \u2014 foundation, framing, MEP, finish. We inspect and wire within 48 hours.",
  },
];

const LOAN_PARAMS = [
  { param: "Loan-to-Cost (LTC)", value: "75 \u2013 85%" },
  { param: "Interest Rate", value: "9.5 \u2013 11.0% (Interest-Only)" },
  { param: "Origination Fee", value: "1.5 \u2013 2.0 points" },
  { param: "Loan Term", value: "12 \u2013 18 months (+3\u20134 mo buffer)" },
  { param: "Draw Schedule", value: "Milestone-based" },
  { param: "Minimum Equity", value: "15 \u2013 25% (cash + land value)" },
  { param: "Interest Reserve", value: "Required, capitalized in loan" },
  { param: "Loan Range", value: "$60K \u2013 $300K per ADU" },
];

const ADU_TYPES = [
  "Detached ADU: 600\u20131,200 SF \u2014 $150K\u2013$300K construction",
  "Garage Conversion: 300\u2013500 SF \u2014 $60K\u2013$100K construction",
  "Attached ADU: 400\u2013800 SF \u2014 $120K\u2013$200K construction",
  "Yield on cost: 8.0% \u2013 12.0% annually",
  "Perm take-out via DSCR or conventional refi",
];

const TESTIMONIALS = [
  {
    text: "CDF funded our garage conversion in Fontana in under 3 weeks. The milestone draw process was seamless \u2014 our contractor loved it. Now we\u2019re collecting $1,450/mo in rent.",
    initials: "RM",
    name: "Roberto M.",
    location: "Homeowner, Fontana CA",
  },
  {
    text: "I built a detached ADU on my property in Anaheim. CDF structured the loan so I had zero out-of-pocket during construction with the interest reserve. The property appraised $240K higher after.",
    initials: "LT",
    name: "Linda T.",
    location: "Investor, Anaheim CA",
  },
  {
    text: "As a contractor, I recommend CDF to my clients. Their draw process is the fastest in the business \u2014 48 hours from inspection to wire. It keeps my projects on schedule and my subs paid.",
    initials: "JG",
    name: "James G.",
    location: "Licensed GC, Los Angeles CA",
  },
];

export default function ADULoansPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", "09f80e34-62a3-4fc0-9773-ff3f8f0683e2");
    data.append("subject", "ADU Loan Pre-Qualification - CDF Website");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      setFormSubmitted(true);
      form.reset();
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.png"
            alt="ADU construction site in California backyard"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-dark" />

        <div className="relative z-10 max-container section-padding w-full pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 bg-cdf/30 border border-cdf-400/30 rounded-full px-4 py-1.5 text-sm text-cdf-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now Funding in LA &amp; Orange County
              </div>

              <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white leading-tight mb-5">
                Build Your ADU.
                <br />
                <span className="gradient-text">We Fund It.</span>
              </h1>

              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                Construction loans up to 85% LTC for Accessory Dwelling Units.
                Fast approvals, milestone-based draws, and a clear path to
                permanent financing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href="#contact"
                  className="btn-gold inline-flex items-center justify-center gap-2 text-lg"
                >
                  Get Pre-Qualified
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#process"
                  className="btn-outline inline-flex items-center justify-center gap-2 text-lg"
                >
                  How It Works
                </a>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-gold">
                    85%
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                    Max LTC
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-gold">
                    12&ndash;18 mo
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                    Loan Terms
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-gold">
                    $60K&ndash;$300K
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider mt-1">
                    Loan Range
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Lead Form */}
            <motion.div
              id="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl scroll-mt-28"
            >
              <div className="text-xs font-bold uppercase tracking-wider text-cdf mb-2">
                Free Pre-Qualification
              </div>
              <h3 className="font-heading text-xl font-bold text-dark-900 mb-5">
                Check Your ADU Eligibility
              </h3>

              {formSubmitted ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
                  <h4 className="font-heading text-lg font-bold text-dark-900 mb-1">
                    Submitted!
                  </h4>
                  <p className="text-body text-sm">
                    We&apos;ll call you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      required
                      className="w-full border border-dark-200 rounded-lg px-4 py-2.5 text-dark-900 placeholder:text-dark-400 focus:outline-none focus:border-cdf focus:ring-1 focus:ring-cdf/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      required
                      className="w-full border border-dark-200 rounded-lg px-4 py-2.5 text-dark-900 placeholder:text-dark-400 focus:outline-none focus:border-cdf focus:ring-1 focus:ring-cdf/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 123-4567"
                      required
                      className="w-full border border-dark-200 rounded-lg px-4 py-2.5 text-dark-900 placeholder:text-dark-400 focus:outline-none focus:border-cdf focus:ring-1 focus:ring-cdf/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Property Address
                    </label>
                    <input
                      type="text"
                      name="property_address"
                      placeholder="123 Main St, City, CA 90001"
                      className="w-full border border-dark-200 rounded-lg px-4 py-2.5 text-dark-900 placeholder:text-dark-400 focus:outline-none focus:border-cdf focus:ring-1 focus:ring-cdf/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1">
                      Project Type
                    </label>
                    <select
                      name="project_type"
                      className="w-full border border-dark-200 rounded-lg px-4 py-2.5 text-dark-900 focus:outline-none focus:border-cdf focus:ring-1 focus:ring-cdf/30"
                    >
                      <option value="">Select your project</option>
                      <option value="detached-adu">Detached ADU (New Build)</option>
                      <option value="garage-conversion">Garage Conversion ADU</option>
                      <option value="attached-adu">Attached ADU</option>
                      <option value="junior-adu">Junior ADU (JADU)</option>
                      <option value="mf-adu">Multifamily ADU (4+ units)</option>
                      <option value="other">Other / Not Sure</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn-gold w-full flex items-center justify-center gap-2 text-base mt-2"
                  >
                    Check Eligibility
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY CDF — FEATURES ── */}
      <section className="section-padding-y bg-light" id="programs">
        <div className="max-container section-padding">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-cdf text-sm font-semibold mb-3">
              <Shield className="w-4 h-4" />
              Why Capital Direct Funding
            </div>
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-cdf heading-underline-center">
              Built for ADU Construction
            </h2>
            <p className="mt-6 text-body text-lg max-w-2xl mx-auto">
              We specialize in the unique financing needs of ADU projects — from
              garage conversions to detached new builds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-cdf/10 flex items-center justify-center mb-4">
                  <feat.icon className="w-6 h-6 text-cdf" />
                </div>
                <h3 className="font-heading text-lg font-bold text-dark-900 mb-2">
                  {feat.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {feat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding-y bg-white" id="process">
        <div className="max-container section-padding">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-cdf text-sm font-semibold mb-3">
              <Activity className="w-4 h-4" />
              From Application to Funded
            </div>
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-cdf heading-underline-center">
              How It Works
            </h2>
            <p className="mt-6 text-body text-lg max-w-2xl mx-auto">
              Four clear steps from pre-qualification to your first construction
              draw. No surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-cdf text-white font-heading text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h4 className="font-heading text-lg font-bold text-dark-900 mb-2">
                  {step.title}
                </h4>
                <p className="text-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOAN TERMS ── */}
      <section className="section-padding-y bg-light" id="terms">
        <div className="max-container section-padding">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-cdf text-sm font-semibold mb-3">
              <FileText className="w-4 h-4" />
              Transparent Terms
            </div>
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-cdf heading-underline-center">
              ADU Construction Loan Parameters
            </h2>
            <p className="mt-6 text-body text-lg max-w-2xl mx-auto">
              Clear terms, no hidden fees. Here&apos;s exactly what to expect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Table */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden border border-cdf/10"
            >
              <table className="w-full">
                <thead>
                  <tr className="bg-cdf text-white">
                    <th className="text-left px-5 py-3 text-sm font-semibold">
                      Parameter
                    </th>
                    <th className="text-left px-5 py-3 text-sm font-semibold">
                      Standard Terms
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {LOAN_PARAMS.map((row, i) => (
                    <tr
                      key={row.param}
                      className={i % 2 === 0 ? "bg-white" : "bg-light"}
                    >
                      <td className="px-5 py-3 text-sm text-body font-medium">
                        {row.param}
                      </td>
                      <td className="px-5 py-3 text-sm text-cdf font-semibold">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>

            {/* Highlight */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-cdf-950 rounded-xl p-6 md:p-8 text-white"
            >
              <h3 className="font-heading text-xl font-bold mb-3">
                Your Property Could Generate $1,200&ndash;$1,800/mo
              </h3>
              <p className="text-cdf-200 text-sm leading-relaxed mb-5">
                A well-built ADU in LA or Orange County adds significant rental
                income and property value. At a 5.5% cap rate, a single ADU can
                add $218K&ndash;$327K to your property&apos;s value.
              </p>
              <ul className="space-y-2.5">
                {ADU_TYPES.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-cdf-100 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        className="section-padding-y bg-cdf-950 relative overflow-hidden"
        id="testimonials"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #D4A017 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-container section-padding">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-gold text-sm font-semibold mb-3">
              <MessageSquare className="w-4 h-4" />
              Real Results
            </div>
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-white heading-underline-center">
              What Our Borrowers Say
            </h2>
            <p className="mt-6 text-cdf-200 text-lg max-w-2xl mx-auto">
              Homeowners and investors across Southern California trust CDF for
              ADU construction financing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex gap-0.5 mb-4 text-gold">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cdf flex items-center justify-center text-white text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {t.name}
                    </h4>
                    <p className="text-white/50 text-xs">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding-y bg-gradient-cdf relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #D4A017 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-container section-padding text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-white mb-4">
              Ready to Build Your ADU?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Get pre-qualified in 24 hours. No obligation, no credit pull until
              you&apos;re ready to move forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="#contact"
                className="btn-gold inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                Start Your Application
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="btn-outline inline-flex items-center justify-center gap-2 text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 text-white/50 text-sm">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" /> CA DRE Licensed
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4" /> NMLS Registered
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" /> SOC 2 Compliant
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
