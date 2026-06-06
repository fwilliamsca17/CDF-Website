import { FAQ_ITEMS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import { ChevronDown } from "lucide-react";

/**
 * Visible FAQ — native <details> accordions (zero JS, fully crawlable, and
 * exactly the Q&A structure answer engines extract). Grouped by category.
 * Reads FAQ_ITEMS so it always matches the FAQPage JSON-LD.
 */
export default function Faq({ heading = true }: { heading?: boolean }) {
  const categories = Array.from(new Set(FAQ_ITEMS.map((f) => f.category)));

  return (
    <section className="bg-light section-padding-y">
      <div className="max-container section-padding">
        {heading && (
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Common questions about our private money loans and first trust deed investments."
          />
        )}

        <div className="mx-auto max-w-3xl space-y-10">
          {categories.map((cat) => (
            <FadeIn key={cat}>
              <div>
                <h2 className="mb-4 flex items-center gap-3 font-heading text-sm font-bold uppercase tracking-[0.15em] text-champagne-700">
                  <span className="h-px w-6 bg-champagne-500" />
                  {cat}
                </h2>
                <div className="space-y-3">
                  {FAQ_ITEMS.filter((f) => f.category === cat).map((f) => (
                    <details
                      key={f.question}
                      className="group rounded-xl border border-cdf/10 bg-white px-5 py-4 transition-colors open:border-champagne-400/40 hover:border-cdf/20"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading font-semibold text-cdf [&::-webkit-details-marker]:hidden">
                        {f.question}
                        <ChevronDown className="h-5 w-5 shrink-0 text-champagne-600 transition-transform duration-300 group-open:rotate-180" />
                      </summary>
                      <p className="faq-answer mt-3 text-sm leading-relaxed text-body">
                        {f.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
