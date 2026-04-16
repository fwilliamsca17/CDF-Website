"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { CheckCircle } from "lucide-react";
import { LOAN_PROGRAMS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import GetInTouch from "@/components/sections/GetInTouch";

const SPECIALTIES = [
  {
    title: "Probate & Estate Sales",
    description: "Court confirmation expertise, flexible timelines, and coordination with estate attorneys.",
  },
  {
    title: "Foreclosure Bail-Outs",
    description: "Fast capital to prevent foreclosure and protect your equity when time is running out.",
  },
  {
    title: "Post-Bankruptcy",
    description: "Funding solutions for borrowers emerging from bankruptcy. We focus on the asset, not the credit score.",
  },
  {
    title: "Self-Employed Borrowers",
    description: "No tax returns required. Bank statement programs and simplified documentation for business owners.",
  },
];

export default function BorrowersPage() {
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
            <p className="eyebrow mb-3">For Borrowers</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Funding Solutions for{" "}
              <span className="gradient-text">Every Situation</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed mb-8">
              Whether you&apos;re flipping a property, bridging to permanent
              financing, or navigating a complex situation — we have a loan
              program designed for you. Close in as few as 7 days.
            </p>
            <Button href="/contact" variant="gold" size="lg" showArrow>
              Apply Now
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Loan Programs */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Loan Programs"
            title="Our Lending Solutions"
            subtitle="Private capital for residential and commercial investment properties across California."
          />

          <div className="space-y-8">
            {LOAN_PROGRAMS.map((program, i) => {
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[program.icon];
              return (
                <motion.div
                  key={program.slug}
                  id={program.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-light rounded-xl p-6 md:p-8 border border-cdf/5 scroll-mt-28"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Left: Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-cdf/10 flex items-center justify-center shrink-0">
                          {IconComponent && <IconComponent className="w-6 h-6 text-cdf" />}
                        </div>
                        <div>
                          <h3 className="font-heading text-heading-lg font-bold text-cdf">
                            {program.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-body leading-relaxed mb-4">
                        {program.description}
                      </p>
                      <ul className="space-y-2">
                        {program.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-body">
                            <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Parameters */}
                    <div className="bg-white rounded-xl p-5 border border-cdf/5">
                      <h4 className="font-heading text-sm font-bold text-cdf uppercase tracking-wider mb-4">
                        Loan Parameters
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(program.parameters).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-cdf/5 last:border-0">
                            <span className="text-sm text-body/60 uppercase tracking-wider">
                              {key === "ltv" ? "LTV" : key === "loanRange" ? "Loan Size" : key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                            <span className="text-sm font-semibold text-cdf">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5">
                        <Button href="/contact" variant="gold" size="sm" className="w-full justify-center">
                          Inquire About This Loan
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="section-padding-y bg-dark">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Our Specialty"
            title="Complex Situations. Simple Solutions."
            subtitle="We built our business on the deals other lenders won't touch."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SPECIALTIES.map((spec, i) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {spec.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {spec.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
