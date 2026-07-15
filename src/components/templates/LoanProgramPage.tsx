"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG, LOAN_PROGRAMS, PROCESS_STEPS } from "@/lib/constants";
import { getLoanPage } from "@/lib/loan-pages";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { track } from "@/lib/analytics";

/**
 * Shared template for dedicated loan program pages.
 *
 * Receives only the route `path`; content comes from loan-pages.ts and every
 * numeric parameter (LTV / rates / terms / range) renders straight from
 * LOAN_PROGRAMS in constants.ts — single source of truth, nothing re-typed.
 */
export default function LoanProgramPage({ path }: { path: string }) {
  const page = getLoanPage(path);
  const program = page
    ? LOAN_PROGRAMS.find((p) => p.slug === page.programSlug)
    : undefined;

  if (!page || !program) return null;

  const tel = `tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`;
  const contactHref = `/contact?program=${program.slug}`;
  const trackCta = (cta: "call" | "contact", placement: "hero" | "footer") =>
    track("cta_click", { cta, placement, page: path, program: program.slug });

  const parameterTiles = [
    { label: "Loan-to-Value", value: program.parameters.ltv },
    { label: "Rates", value: program.parameters.rates },
    { label: "Terms", value: program.parameters.terms },
    { label: "Loan Amounts", value: program.parameters.loanRange },
  ];

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
            <p className="eyebrow !text-champagne-300 mb-3">{page.eyebrow}</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              {page.h1}{" "}
              <span className="text-champagne-gradient">
                {page.h1Highlight}
              </span>
            </h1>
            <p className="text-xl text-ivory/70 leading-relaxed mb-4">
              {page.heroLead}
            </p>
            <p className="text-ivory/50 leading-relaxed mb-8">{page.heroSub}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href={tel}
                className="btn-champagne"
                onClick={() => trackCta("call", "hero")}
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link
                href={contactHref}
                className="btn-ghost-light"
                onClick={() => trackCta("contact", "hero")}
              >
                Get Preliminary Terms
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/50">
              <span>Direct Lender Since 2009</span>
              <span className="text-champagne-500/40">•</span>
              <span>$200M+ Deployed</span>
              <span className="text-champagne-500/40">•</span>
              <span>500+ Transactions</span>
              <span className="text-champagne-500/40">•</span>
              <span>24-Hour Response</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program parameters */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Program Parameters"
            title={program.title}
            subtitle={program.description}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {parameterTiles.map((tile, i) => (
              <FadeIn key={tile.label} delay={i * 60}>
                <div className="bg-light rounded-xl p-6 text-center h-full border border-cdf/5">
                  <div className="font-heading text-xl md:text-2xl font-bold text-cdf mb-1">
                    {tile.value}
                  </div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-champagne-600">
                    {tile.label}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {program.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-body"
                >
                  <CheckCircle2 className="w-4 h-4 text-champagne-600 mt-0.5 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Scenarios */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow={page.scenariosEyebrow}
            title={page.scenariosTitle}
            subtitle={page.scenariosSubtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.scenarios.map((scenario, i) => (
              <FadeIn key={scenario.title} delay={i * 60}>
                <div className="bg-white rounded-xl p-8 h-full border border-cdf/5 relative">
                  {scenario.tag && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-champagne-600 bg-champagne-500/10 px-2.5 py-1 rounded-full">
                      {scenario.tag}
                    </span>
                  )}
                  <scenario.icon className="w-8 h-8 text-champagne-600 mb-4" />
                  <h3 className="font-heading text-lg font-bold text-cdf mb-3 pr-16">
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

      {/* Why CDF */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="The CDF Difference"
            title={page.whoForTitle}
            light
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {page.whoFor.map((item, i) => (
              <FadeIn key={item} delay={i * 60}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 h-full flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-champagne-400 mt-0.5 shrink-0" />
                  <p className="text-white/80 text-sm leading-relaxed">
                    {item}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="How It Works"
            title="From First Call to Funded in 4 Steps"
            subtitle="A streamlined process built to close in as few as 7 business days."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {PROCESS_STEPS.map((step, i) => (
              <FadeIn key={step.step} delay={i * 80}>
                <div className="bg-light rounded-xl p-6 h-full border border-cdf/5">
                  <div className="font-heading text-3xl font-bold text-champagne-600/30 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/loan-process"
              className="inline-flex items-center gap-1.5 text-cdf hover:text-champagne-600 transition-colors text-sm font-semibold"
            >
              See the full loan process
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Common Questions"
            title={`${program.shortTitle} Loan FAQs`}
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {page.faqs.map((faq, i) => (
              <FadeIn key={faq.question} delay={i * 40}>
                <div className="bg-white rounded-xl p-6 md:p-8 border border-cdf/5">
                  <h3 className="font-heading text-lg font-bold text-cdf mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Related programs */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Explore More"
            title="Related Loan Programs"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {page.related.map((rel, i) => (
              <FadeIn key={rel.path} delay={i * 60}>
                <Link
                  href={rel.path}
                  className="group bg-light rounded-xl p-6 border border-cdf/5 flex items-center justify-between gap-3 hover:border-champagne-500/30 transition-colors h-full"
                >
                  <span className="font-heading font-bold text-cdf text-sm">
                    {rel.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-champagne-600 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
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
              Tell Us About Your Deal
            </h2>
            <p className="text-lg text-ivory/70 max-w-2xl mx-auto mb-8">
              One call gets you a straight answer and preliminary terms within
              24 hours. If we can&apos;t do the deal, we&apos;ll tell you that
              too — fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href={tel}
                className="btn-champagne"
                onClick={() => trackCta("call", "footer")}
              >
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link
                href={contactHref}
                className="btn-ghost-light"
                onClick={() => trackCta("contact", "footer")}
              >
                Start Your Application
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-ivory/40 text-xs max-w-2xl mx-auto leading-relaxed">
              All loans are business-purpose loans secured by California real
              estate. Rates, LTVs, and terms shown are program starting points
              — final terms are deal-specific.
              {SITE_CONFIG.dreLicense && ` DRE# ${SITE_CONFIG.dreLicense}`}
              {SITE_CONFIG.nmls && ` | NMLS# ${SITE_CONFIG.nmls}`}
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
