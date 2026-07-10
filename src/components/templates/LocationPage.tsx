"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG, LOAN_PROGRAMS } from "@/lib/constants";
import { getLocationPage, LOCATION_PAGES } from "@/lib/location-pages";
import { getLoanPageByProgramSlug } from "@/lib/loan-pages";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Shared template for county location pages. Content comes from
 * location-pages.ts; the program grid renders from LOAN_PROGRAMS and links
 * each program to its dedicated page (crawl mesh between locations and
 * programs).
 */
export default function LocationPage({ path }: { path: string }) {
  const page = getLocationPage(path);
  if (!page) return null;

  const tel = `tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`;
  const otherLocations = LOCATION_PAGES.filter((l) => l.path !== path);

  const programLinks = [
    ...LOAN_PROGRAMS.map((program) => ({
      label: program.title,
      href:
        getLoanPageByProgramSlug(program.slug)?.path ??
        `/borrowers#${program.slug}`,
    })),
    { label: "ADU Construction Loans", href: "/adu-loans" },
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
            <p className="eyebrow !text-champagne-300 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Hard Money Lender — {page.name}
            </p>
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
              <a href={tel} className="btn-champagne">
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link href="/contact" className="btn-ghost-light">
                Get Preliminary Terms
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ivory/50">
              <span>Direct Lender Since 2009</span>
              <span className="text-champagne-500/40">•</span>
              <span>$200M+ Deployed</span>
              <span className="text-champagne-500/40">•</span>
              <span>7-Day Closings</span>
              <span className="text-champagne-500/40">•</span>
              <span>DRE# {SITE_CONFIG.dreLicense}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Local narrative */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 items-start max-w-5xl mx-auto">
            <FadeIn>
              <div>
                <p className="eyebrow mb-3">Why CDF in {page.name}</p>
                <h2 className="font-heading text-heading-xl font-bold text-cdf mb-6">
                  A Direct Lender That Knows {page.county}
                </h2>
                {page.narrative.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-body leading-relaxed mb-4"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={120}>
              <div className="bg-light rounded-2xl p-8 border border-cdf/5">
                <h3 className="font-heading text-lg font-bold text-cdf mb-4">
                  Every Program. Every City.
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Closings in as few as 7 business days",
                    "Loan amounts from $50K to $5M",
                    "Asset-based underwriting — no credit minimums",
                    "No tax returns required",
                    "Direct decisions from the people funding the loan",
                    "24-hour response on every inquiry",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-body"
                    >
                      <CheckCircle2 className="w-4 h-4 text-champagne-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Local scenarios */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow={`${page.name} Lending`}
            title={`What We Fund in ${page.county}`}
            subtitle="Local market knowledge isn't a slogan — it's how the deals actually get underwritten."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.scenarios.map((scenario, i) => (
              <FadeIn key={scenario.title} delay={i * 60}>
                <div className="bg-white rounded-xl p-8 h-full border border-cdf/5">
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

      {/* Program grid */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Loan Programs"
            title={`Every CDF Program, Available in ${page.name}`}
            subtitle="Eight specialized programs — one direct lender."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {programLinks.map((program, i) => (
              <FadeIn key={program.href} delay={i * 40}>
                <Link
                  href={program.href}
                  className="group bg-light rounded-xl p-5 border border-cdf/5 flex items-center justify-between gap-3 hover:border-champagne-500/30 transition-colors h-full"
                >
                  <span className="font-heading font-bold text-cdf text-sm">
                    {program.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-champagne-600 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cities served */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Service Area"
            title={`Cities We Serve in ${page.county}`}
            subtitle="A representative list — we lend county-wide, and everywhere else in California."
          />

          <FadeIn>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              {page.cities.map((city) => (
                <span
                  key={city}
                  className="text-sm text-body bg-white border border-cdf/10 rounded-full px-4 py-1.5"
                >
                  {city}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Common Questions"
            title={`${page.name} Lending FAQs`}
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {page.faqs.map((faq, i) => (
              <FadeIn key={faq.question} delay={i * 40}>
                <div className="bg-light rounded-xl p-6 md:p-8 border border-cdf/5">
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

      {/* Other service areas */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="More Service Areas"
            title="Lending Across Southern California"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {otherLocations.map((location, i) => (
              <FadeIn key={location.path} delay={i * 60}>
                <Link
                  href={location.path}
                  className="group bg-white rounded-xl p-5 border border-cdf/5 flex items-center justify-between gap-3 hover:border-champagne-500/30 transition-colors h-full"
                >
                  <span className="font-heading font-bold text-cdf text-sm">
                    {location.name}
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
              Have a {page.name} Deal? Let&apos;s Talk.
            </h2>
            <p className="text-lg text-ivory/70 max-w-2xl mx-auto mb-8">
              One call gets you a straight answer and preliminary terms within
              24 hours — from a direct lender that&apos;s been funding{" "}
              {page.county} real estate since 2009.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a href={tel} className="btn-champagne">
                <Phone className="w-5 h-5" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link href="/contact" className="btn-ghost-light">
                Start Your Application
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-ivory/40 text-xs max-w-2xl mx-auto leading-relaxed">
              All loans are business-purpose loans secured by California real
              estate. Rates, LTVs, and terms are program starting points —
              final terms are deal-specific.
              {SITE_CONFIG.dreLicense && ` DRE# ${SITE_CONFIG.dreLicense}`}
              {SITE_CONFIG.nmls && ` | NMLS# ${SITE_CONFIG.nmls}`}
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
