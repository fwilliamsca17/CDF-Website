"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessTimeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PROCESS_STEPS.map((step, i) => {
        const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[step.icon];
        return (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative"
          >
            {/* Connector line */}
            {i < PROCESS_STEPS.length - 1 && (
              <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gold/20" />
            )}

            <div className="bg-white rounded-xl p-6 card-hover border border-cdf/5 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                  {IconComponent && <IconComponent className="w-5 h-5 text-gold" />}
                </div>
                <span className="font-heading text-3xl font-bold text-cdf/10">
                  0{step.step}
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-cdf mb-2">
                {step.title}
              </h3>
              <p className="text-body text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
