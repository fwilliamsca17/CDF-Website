"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { LOAN_PROGRAMS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export default function LoanPrograms() {
  return (
    <section className="bg-white section-padding-y">
      <div className="max-container section-padding">
        <SectionHeading
          eyebrow="Loan Programs"
          title="Funding for Every Situation"
          subtitle="From fix & flip to probate, we offer a full suite of private lending solutions tailored to real estate investors across California."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOAN_PROGRAMS.slice(0, 6).map((program, i) => {
            const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[program.icon];
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-light rounded-xl p-6 card-hover border border-cdf/5"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-cdf/10 flex items-center justify-center shrink-0">
                    {IconComponent && <IconComponent className="w-5 h-5 text-cdf" />}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-cdf">
                      {program.title}
                    </h3>
                  </div>
                </div>

                <p className="text-body text-sm leading-relaxed mb-4">
                  {program.description}
                </p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {Object.entries(program.parameters).map(([key, value]) => (
                    <div key={key} className="bg-white rounded-md px-3 py-2">
                      <p className="text-[10px] uppercase tracking-wider text-body/60 font-medium">
                        {key === "ltv" ? "LTV" : key === "loanRange" ? "Loan Size" : key.charAt(0).toUpperCase() + key.slice(1)}
                      </p>
                      <p className="text-sm font-semibold text-cdf">{value}</p>
                    </div>
                  ))}
                </div>

                <Button
                  href={`/borrowers#${program.slug}`}
                  variant="ghost"
                  size="sm"
                  showArrow
                  className="px-0"
                >
                  Learn More
                </Button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Button href="/borrowers" variant="gold" showArrow>
            View All Loan Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
