"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { VALUE_PROPS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ValueProps() {
  return (
    <section className="bg-light section-padding-y">
      <div className="max-container section-padding">
        <SectionHeading
          eyebrow="Why Capital Direct Funding"
          title="Built for Speed. Designed for Complexity."
          subtitle="We provide funding solutions where traditional lenders fall short. Our team combines deep real estate expertise with the speed and flexibility of private capital."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUE_PROPS.map((prop, i) => {
            const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[prop.icon];
            return (
              <motion.div
                key={prop.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 card-hover"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5">
                  {IconComponent && <IconComponent className="w-6 h-6 text-gold" />}
                </div>
                <h3 className="font-heading text-xl font-bold text-cdf mb-3">
                  {prop.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">
                  {prop.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
