import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";

/**
 * Visible FAQ block for referral-partner pages. Pair with PartnerPageSchema
 * (which emits the matching FAQPage JSON-LD) — every question rendered here
 * must appear in that schema and vice versa.
 */
export default function PartnerFaqSection({
  eyebrow,
  title,
  faqs,
}: {
  eyebrow: string;
  title: string;
  faqs: { question: string; answer: string }[];
}) {
  return (
    <section className="section-padding-y bg-white">
      <div className="max-container section-padding">
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="max-w-3xl mx-auto space-y-8 mt-10">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.question} delay={i * 40}>
              <div>
                <h3 className="font-heading font-bold text-cdf mb-2">
                  {faq.question}
                </h3>
                <p className="faq-answer text-body leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
