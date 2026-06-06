import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/sections/Faq";
import GetInTouch from "@/components/sections/GetInTouch";
import { FAQSchema, PageSeo } from "@/components/JsonLd";

const DESCRIPTION =
  "Answers to common questions about Capital Direct Funding's private money loans — rates, eligibility, loan amounts, ADU construction loans, and first trust deed investments across California.";

export const metadata: Metadata = {
  title: "FAQ — Private Lending & Trust Deed Questions",
  description: DESCRIPTION,
  alternates: { canonical: "https://capitaldf.com/faq" },
  openGraph: {
    title: "Frequently Asked Questions | Capital Direct Funding",
    description: DESCRIPTION,
    url: "https://capitaldf.com/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <PageSeo
        title="Frequently Asked Questions | Capital Direct Funding"
        description={DESCRIPTION}
        path="/faq"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
        speakable={[".faq-answer"]}
      />
      <FAQSchema />

      <section className="hero-atmosphere relative overflow-hidden pb-16 pt-32">
        <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="hairline-champagne absolute inset-x-0 bottom-0 h-px" />
        <div className="relative z-10 max-container section-padding">
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ivory/50">
            <Link href="/" className="transition-colors hover:text-champagne-300">
              Home
            </Link>
            <span className="mx-2 text-ivory/30">/</span>
            <span className="text-ivory/80">FAQ</span>
          </nav>
          <p className="mb-3 flex items-center gap-3 text-label font-semibold uppercase tracking-[0.22em] text-champagne-300">
            <span className="h-px w-8 bg-champagne-500/70" />
            Frequently Asked Questions
          </p>
          <h1 className="font-heading text-display-lg font-bold leading-[1.05] text-ivory">
            Questions, answered.
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ivory/60">
            Everything borrowers and investors ask about funding, rates,
            eligibility, and California first trust deed investments.
          </p>
        </div>
      </section>

      <Faq heading={false} />
      <GetInTouch />
    </>
  );
}
