"use client";

import { STATS } from "@/lib/constants";
import StatCounter from "@/components/ui/StatCounter";

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-16 md:py-20">
      {/* Champagne dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9A86A 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Soft blue glow continuing the hero atmosphere */}
      <div className="hero-glow pointer-events-none absolute -top-1/2 left-1/2 h-[40vw] w-[80vw] -translate-x-1/2 opacity-60" />
      {/* Champagne hairline top edge */}
      <div className="hairline-champagne absolute inset-x-0 top-0 h-px" />

      <div className="relative z-10 max-container section-padding">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-4">
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
