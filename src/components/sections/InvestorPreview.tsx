"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { INVESTOR_BENEFITS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function InvestorPreview() {
  return (
    <section className="bg-dark section-padding-y relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4A017 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-container section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow mb-3">For Accredited Investors</p>
            <h2 className="font-heading text-heading-xl md:text-display-lg font-bold text-white heading-underline mb-6">
              Earn Consistent Returns Backed by Real Estate
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Invest in whole-note, first trust deed positions secured by
              California real estate. Each investment is individually selected,
              personally underwritten, and backed by tangible property assets.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              With conservative loan-to-value ratios and rigorous underwriting,
              our trust deed investments provide attractive, risk-adjusted
              returns with the security of real property backing every dollar.
            </p>
            <Button href="/investors" variant="gold" showArrow>
              Learn About Investing
            </Button>
          </motion.div>

          {/* Right: Benefits grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INVESTOR_BENEFITS.slice(0, 4).map((benefit, i) => {
              const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[benefit.icon];
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
                >
                  <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center mb-3">
                    {IconComponent && <IconComponent className="w-4 h-4 text-gold" />}
                  </div>
                  <h3 className="font-heading text-sm font-bold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
