"use client";

import { useEffect, useRef } from "react";
import { iconMap } from "@/lib/icons";
import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const pivot = window.innerHeight * 0.62;
      const span = rect.height * 0.85 || 1;
      const p = Math.min(1, Math.max(0, (pivot - rect.top) / span));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const n = PROCESS_STEPS.length;

  return (
    <div ref={ref} style={{ ["--p" as string]: "0" }}>
      {/* Scroll-bound progress bar */}
      <div className="relative mb-12 h-[3px] w-full overflow-hidden rounded-full bg-cdf/10">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-champagne-300 via-champagne-400 to-champagne-500"
          style={{ width: "calc(var(--p) * 100%)" }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((step, i) => {
          const IconComponent = iconMap[step.icon];
          return (
            <div
              key={step.step}
              className="relative rounded-xl border border-cdf/5 bg-white p-6 card-hover"
              style={{ ["--start" as string]: (i / n).toString() }}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-cdf/5">
                  {/* Champagne ring illuminates as the scroll progress reaches this step */}
                  <span
                    className="absolute inset-0 rounded-full ring-2 ring-champagne-500"
                    style={{
                      opacity:
                        "clamp(0, calc((var(--p) - var(--start)) * 8), 1)",
                    }}
                  />
                  {IconComponent && <IconComponent className="h-5 w-5 text-cdf" />}
                </div>
                <span className="font-heading text-3xl font-bold text-cdf/10">
                  0{step.step}
                </span>
              </div>

              <h3 className="mb-2 font-heading text-xl font-bold text-cdf">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-body">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
