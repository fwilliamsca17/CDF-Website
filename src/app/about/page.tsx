"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Heart, Target, Shield } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import GetInTouch from "@/components/sections/GetInTouch";

const VALUES = [
  {
    icon: Target,
    title: "Speed & Execution",
    description:
      "We understand that in real estate, timing is everything. Our streamlined process and direct lending model allow us to close deals in as few as 7 days.",
  },
  {
    icon: Shield,
    title: "Capital Preservation",
    description:
      "Conservative underwriting with disciplined loan-to-value ratios protects our investors while providing borrowers with competitive terms.",
  },
  {
    icon: Heart,
    title: "Relationship-Driven",
    description:
      "As a family-run company, we build lasting relationships. When you call us, you talk to decision-makers who know your name and your deals.",
  },
  {
    icon: Building2,
    title: "California Expertise",
    description:
      "With over 500 transactions funded across California, we know the markets, the regulations, and the nuances that matter.",
  },
];

export default function AboutPage() {
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
            <p className="eyebrow mb-3">About Us</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Family-Run. Relationship-Driven. Results-Focused.
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Capital Direct Funding is a private lending company built on the
              belief that every real estate deal deserves a fair shot at funding
              — regardless of how complex the situation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <p className="eyebrow mb-3">Our Story</p>
              <h2 className="font-heading text-heading-xl font-bold text-cdf heading-underline mb-6">
                Where Banks Say No, We Say How
              </h2>
              <div className="space-y-4 text-body leading-relaxed">
                <p>
                  Capital Direct Funding was founded to fill a critical gap in
                  the California real estate market. Traditional banks and
                  institutional lenders follow rigid guidelines that leave many
                  qualified borrowers without access to capital — especially in
                  complex situations like probate, foreclosure, bankruptcy, or
                  self-employment.
                </p>
                <p>
                  We take a different approach. As a direct private lender, we
                  evaluate each deal on its individual merits — the property, the
                  borrower&apos;s plan, and the exit strategy. Our simplified
                  underwriting process means faster decisions, fewer hoops, and
                  closings in as few as 7 days.
                </p>
                <p>
                  With over $200 million in deployed capital and more than 500
                  funded transactions, we&apos;ve built a track record of
                  performance that borrowers and investors trust.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative">
                <div className="bg-cdf/5 rounded-2xl aspect-[4/3] flex items-center justify-center">
                  <Image
                    src="/images/francisco-headshot.png"
                    alt="Capital Direct Funding Leadership"
                    width={400}
                    height={400}
                    className="rounded-2xl object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gold text-white rounded-xl p-4 shadow-lg">
                  <p className="font-heading text-2xl font-bold">$200M+</p>
                  <p className="text-sm text-white/80">Capital Deployed</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Our Values"
            title="What Drives Us"
            subtitle="We built CDF on principles that put our borrowers, investors, and partners first."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((value, i) => (
              <FadeIn key={value.title} delay={i * 100}>
                <div className="bg-white rounded-xl p-8 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <value.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-cdf mb-2">
                        {value.title}
                      </h3>
                      <p className="text-body text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
