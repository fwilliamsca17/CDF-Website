"use client";

import { motion } from "framer-motion";
import { FileText, CheckSquare, Clock, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FadeIn from "@/components/ui/FadeIn";
import Button from "@/components/ui/Button";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import GetInTouch from "@/components/sections/GetInTouch";

const DOCUMENTS = [
  {
    category: "Property",
    items: [
      "Property address and description",
      "Purchase contract (if acquisition)",
      "Scope of work and budget (if renovation)",
      "Photos of the property",
    ],
  },
  {
    category: "Borrower",
    items: [
      "Completed loan application",
      "Government-issued ID",
      "Entity documents (if applicable)",
      "Real estate experience summary",
    ],
  },
  {
    category: "Financial",
    items: [
      "Proof of funds for down payment",
      "Bank statements (most recent 2 months)",
      "Current rent roll (if income property)",
      "Exit strategy documentation",
    ],
  },
];

export default function LoanProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-cdf pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #D4A017 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10 max-container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="eyebrow mb-3">How It Works</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              From Application to{" "}
              <span className="gradient-text">Funding in Days</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Our streamlined process is designed for speed and simplicity. No
              lengthy applications, no committee approvals, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="The Process"
            title="Four Steps to Funding"
            subtitle="We've simplified the private lending process to get you funded as quickly as possible."
          />
          <ProcessTimeline />
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="What to Expect"
            title="A Different Lending Experience"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Phone,
                title: "24-Hour Response",
                description: "We respond to every inquiry within 24 hours with a preliminary assessment of your deal.",
              },
              {
                icon: FileText,
                title: "Simplified Underwriting",
                description: "We focus on the property and the deal, not mountains of paperwork. Common sense lending.",
              },
              {
                icon: Clock,
                title: "7-Day Closings",
                description: "With a complete file, we can fund your deal in as few as 7 business days from application.",
              },
              {
                icon: CheckSquare,
                title: "Clear Communication",
                description: "You'll know exactly where your loan stands at every step. No surprises, no runaround.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 100}>
                <div className="bg-light rounded-xl p-6 card-hover text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                    {item.title}
                  </h3>
                  <p className="text-body text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="section-padding-y bg-dark">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Documentation"
            title="What You'll Need"
            subtitle="Having these documents ready helps us move quickly on your deal."
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCUMENTS.map((doc, i) => (
              <FadeIn key={doc.category} delay={i * 100}>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10 h-full">
                  <h3 className="font-heading text-lg font-bold text-gold mb-4">
                    {doc.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {doc.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-white/70 text-sm">
                        <CheckSquare className="w-4 h-4 text-gold/60 mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/50 text-sm mb-6">
              Don&apos;t have all documents ready? No problem. Contact us and
              we&apos;ll tell you exactly what&apos;s needed for your specific situation.
            </p>
            <Button href="/contact" variant="gold" showArrow>
              Start Your Application
            </Button>
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
