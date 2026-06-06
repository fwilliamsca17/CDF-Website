import { iconMap } from "@/lib/icons";
import { LOAN_PROGRAMS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";

export default function LoanPrograms() {
  return (
    <section className="bg-white section-padding-y">
      <div className="max-container section-padding">
        <SectionHeading
          eyebrow="Loan Programs"
          title="Funding for Every Situation"
          subtitle="From fix & flip to probate, we offer a full suite of private lending solutions tailored to real estate investors across California."
        />
      </div>

      {/* Horizontal scroll-snap showcase — swipe on mobile, scroll on desktop */}
      <FadeIn>
        <div className="relative">
          {/* Edge fades signalling more cards */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent md:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent md:w-16" />

          <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-12 lg:px-20 xl:px-28 [-webkit-overflow-scrolling:touch] [scrollbar-color:theme(colors.champagne.400)_transparent] [scrollbar-width:thin]">
            {LOAN_PROGRAMS.slice(0, 6).map((program) => {
              const IconComponent = iconMap[program.icon];
              return (
                <article
                  key={program.slug}
                  className="group relative w-[80%] shrink-0 snap-start overflow-hidden rounded-2xl border border-cdf/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-champagne-400/40 hover:shadow-xl sm:w-[380px]"
                >
                  {/* Champagne top accent on hover */}
                  <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-champagne-300 to-champagne-500 transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cdf/10 transition-colors duration-300 group-hover:bg-champagne-500/15">
                    {IconComponent && (
                      <IconComponent className="h-6 w-6 text-cdf transition-colors duration-300 group-hover:text-champagne-700" />
                    )}
                  </div>

                  <h3 className="mb-3 font-heading text-xl font-bold text-cdf">
                    {program.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-body">
                    {program.description}
                  </p>

                  <div className="mb-6 grid grid-cols-2 gap-2">
                    {Object.entries(program.parameters).map(([key, value]) => (
                      <div key={key} className="rounded-lg bg-light px-3 py-2">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-body/60">
                          {key === "ltv"
                            ? "LTV"
                            : key === "loanRange"
                            ? "Loan Size"
                            : key.charAt(0).toUpperCase() + key.slice(1)}
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
                </article>
              );
            })}
            {/* Tail spacer so the last card can snap clear of the edge fade */}
            <div className="w-2 shrink-0 sm:w-8" aria-hidden />
          </div>
        </div>
      </FadeIn>

      <div className="max-container section-padding mt-10 text-center">
        <p className="mb-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-body/40">
          <span className="h-px w-6 bg-champagne-500/60" />
          Drag or scroll to explore
          <span className="h-px w-6 bg-champagne-500/60" />
        </p>
        <Button href="/borrowers" variant="gold" showArrow>
          View All Loan Programs
        </Button>
      </div>
    </section>
  );
}
