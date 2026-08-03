"use client";

import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { getPartnerPage } from "@/lib/partner-pages";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import PartnerFaqSection from "@/components/sections/PartnerFaqSection";
import { track } from "@/lib/analytics";

/**
 * Shared template for the data-driven referral-partner pages
 * (partner-pages.ts). Mirrors the section rhythm of the four bespoke
 * professionals pages: hero → client scenarios → how it works → why CDF →
 * FAQ → CTA, with body links into programs (the crawl mesh the audit
 * found missing on the bespoke pages).
 */
export default function PartnerPage({ path }: { path: string }) {
  const page = getPartnerPage(path);
  if (!page) return null;

  const tel = `tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`;
  const trackCta = (placement: "hero" | "footer") =>
    track("cta_click", { cta: "call", placement, page: path });

  return (
    <>
      {/* Hero */}
      <section className="hero-atmosphere pt-32 pb-20 relative overflow-hidden">
        <div className="relative z-10 max-container section-padding">
          <div className="max-w-3xl">
            <p className="eyebrow !text-champagne-300 mb-3">{page.eyebrow}</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              {page.h1}{" "}
              <span className="gradient-text">{page.h1Highlight}</span>
            </h1>
            <p className="text-ivory/70 leading-relaxed mb-8">{page.heroLead}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={tel}
                onClick={() => trackCta("hero")}
                className="inline-flex items-center gap-2 rounded-lg bg-champagne-500 px-6 py-3 font-semibold text-cdf hover:bg-champagne-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {SITE_CONFIG.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border border-white/25 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Discuss a Client Scenario
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Client scenarios */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Client Scenarios"
            title="Where We Help Your Clients"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {page.scenarios.map((s, i) => (
              <FadeIn key={s.title} delay={i * 50}>
                <div className="h-full rounded-xl bg-light p-6 border border-cdf/5">
                  <s.icon className="w-8 h-8 text-champagne-600 mb-4" />
                  <h3 className="font-heading font-bold text-cdf mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-body/85 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How working together goes */}
      <section className="section-padding-y bg-cdf">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="How It Works"
            title="Three Steps, No Surprises"
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {page.process.map((step, i) => (
              <FadeIn key={step.title} delay={i * 60}>
                <div className="h-full rounded-xl bg-white/5 border border-white/10 p-6">
                  <p className="font-heading text-champagne-300 font-bold text-sm mb-2">
                    Step {i + 1}
                  </p>
                  <h3 className="font-heading font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-ivory/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why CDF */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading eyebrow="Why CDF" title="Built for Referral Trust" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {page.value.map((v, i) => (
              <FadeIn key={v.title} delay={i * 60}>
                <div className="h-full rounded-xl bg-white p-6 border border-cdf/5">
                  <v.icon className="w-8 h-8 text-champagne-600 mb-4" />
                  <h3 className="font-heading font-bold text-cdf mb-2">
                    {v.title}
                  </h3>
                  <p className="text-sm text-body/85 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Program crawl-mesh links */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {page.related.map((r) => (
              <Link
                key={r.path}
                href={r.path}
                className="inline-flex items-center gap-1.5 rounded-full border border-cdf/15 bg-white px-4 py-2 text-sm font-semibold text-cdf hover:border-champagne-500/40 hover:text-champagne-700 transition-colors"
              >
                {r.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (schema emitted by PartnerPageSchema in the layout) */}
      <PartnerFaqSection
        eyebrow={`${page.name} FAQs`}
        title="Questions Partners Actually Ask"
        faqs={page.faqs}
      />

      {/* CTA */}
      <section className="hero-atmosphere section-padding-y relative overflow-hidden">
        <div className="relative z-10 max-container section-padding text-center">
          <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-white heading-underline-center mb-6">
            One Scenario Is All It Takes
          </h2>
          <p className="text-ivory/70 leading-relaxed mb-8 max-w-2xl mx-auto">
            Call with a live client situation and judge us on the answer. Most
            partnerships here started exactly that way.
          </p>
          <a
            href={tel}
            onClick={() => trackCta("footer")}
            className="inline-flex items-center gap-2 rounded-lg bg-champagne-500 px-6 py-3 font-semibold text-cdf hover:bg-champagne-400 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call {SITE_CONFIG.phone}
          </a>
        </div>
      </section>
    </>
  );
}
