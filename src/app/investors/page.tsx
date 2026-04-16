"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { INVESTOR_BENEFITS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Review Opportunities",
    description:
      "We present individual loan opportunities to you with full deal details — property information, borrower profile, loan terms, and risk assessment.",
    icon: "Search",
  },
  {
    step: 2,
    title: "Invest in Whole Notes",
    description:
      "Select the deals that match your investment criteria. You invest in the entire loan (whole note) secured by a first trust deed on the property.",
    icon: "FileText",
  },
  {
    step: 3,
    title: "Earn Monthly Returns",
    description:
      "Receive monthly interest payments for the duration of the loan. When the borrower repays, you receive your principal back in full.",
    icon: "TrendingUp",
  },
];

const RISK_MITIGANTS = [
  "Conservative LTV ratios (typically 60-75%)",
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
      <section className="bg-gradient-cdf pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #D4A017 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-3">For Accredited Investors</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Earn Consistent Returns{" "}
              <span className="gradient-text">Secured by Real Estate</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Invest in whole-note, first trust deed positions backed by
              California real property. Attractive yields with tangible asset
              security and complete transparency.
            </p>
            <Button href="/contact" variant="gold" size="lg" showArrow>
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding-y bg-white scroll-mt-28">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="How It Works"
            title="Simple, Transparent Trust Deed Investing"
            subtitle="We handle the origination, underwriting, and servicing. You select the deals and earn the returns."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => {
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[step.icon];
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                    {IconComponent && <IconComponent className="w-7 h-7 text-gold" />}
                  </div>
                  <div className="font-heading text-4xl font-bold text-cdf/10 mb-2">
                    0{step.step}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-cdf mb-3">
                    {step.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="returns" className="section-padding-y bg-light scroll-mt-28">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Investment Benefits"
            title="Why Trust Deed Investing with CDF"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INVESTOR_BENEFITS.map((benefit, i) => {
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[benefit.icon];
              return (
                <FadeIn key={benefit.title} delay={i * 80}>
                  <div className="bg-white rounded-xl p-6 card-hover h-full">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                      {IconComponent && <IconComponent className="w-5 h-5 text-gold" />}
                    </div>
                    <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-body text-sm leading-relaxed">
                      {benefit.description}
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
              <p className="eyebrow mb-3">Risk Mitigation</p>
              <h2 className="font-heading text-heading-xl font-bold text-white heading-underline mb-6">
                Protecting Your Investment
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Capital preservation is our first priority. Every loan is
                personally reviewed by our team with multiple layers of
                protection built into every transaction.
              </p>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <ul className="space-y-3">
                  {RISK_MITIGANTS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-white/80 text-sm">
                      <LucideIcons.CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Get Started */}
      <section id="get-started" className="section-padding-y bg-white scroll-mt-28">
        <div className="max-container section-padding text-center">
          <FadeIn>
            <p className="eyebrow mb-3">Get Started</p>
            <h2 className="font-heading text-heading-xl font-bold text-cdf heading-underline-center mb-6">
              Ready to Start Investing?
            </h2>
            <p className="text-body text-lg leading-relaxed max-w-2xl mx-auto mb-4">
              Trust deed investments through Capital Direct Funding are available
              to accredited investors. Contact us to learn about current
              investment opportunities and how we can help you build a portfolio
              of real estate-backed income.
            </p>
            <p className="text-body/60 text-sm mb-8">
              All investments involve risk. Past performance is not indicative of
              future results. This is not an offer to sell securities.
            </p>
            <Button href="/contact" variant="gold" size="lg" showArrow>
              Contact Us to Learn More
            </Button>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
