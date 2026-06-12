"use client";

import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLeadForm } from "@/lib/useLeadForm";
import { SITE_CONFIG } from "@/lib/constants";

export default function GetInTouch() {
  const { submitted, submitting, error, handleSubmit } = useLeadForm();

  return (
    <section className="hero-atmosphere section-padding-y relative overflow-hidden">
      <div className="hairline-champagne absolute inset-x-0 top-0 h-px" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C9A86A 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="hero-glow pointer-events-none absolute left-1/2 top-0 h-[40vw] w-[70vw] -translate-x-1/2 opacity-60" />

      <div className="relative z-10 max-container section-padding">
        <SectionHeading
          eyebrow="Get Started"
          title="Ready to Get Funded?"
          subtitle="Tell us about your deal. We respond to every inquiry within 24 hours."
          light
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-champagne-400 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold text-white mb-2">
                Message Received!
              </h3>
              <p className="text-white/60">
                We&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="subject" value="New CDF Website Inquiry" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-champagne-400/60 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-champagne-400/60 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-champagne-400/60 transition-colors"
                />
                <select
                  name="inquiry_type"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white/70 focus:outline-none focus:border-champagne-400/60 transition-colors"
                >
                  <option value="Borrower Inquiry">Borrower Inquiry</option>
                  <option value="Investor Inquiry">Investor Inquiry</option>
                  <option value="Loan Status">Loan Status</option>
                  <option value="General">General Question</option>
                </select>
              </div>

              <textarea
                name="message"
                placeholder="Tell us about your deal or question..."
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-champagne-400/60 transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={submitting}
                className="btn-champagne w-full flex items-center justify-center gap-2 text-lg disabled:opacity-60 disabled:cursor-wait"
              >
                <Send className="w-5 h-5" />
                {submitting ? "Sending…" : "Send Message"}
              </button>

              {error && (
                <p className="text-center text-sm text-red-300" role="alert">
                  Something went wrong sending your message. Please call{" "}
                  <a href="tel:+16267961680" className="font-semibold text-champagne-300 underline">
                    {SITE_CONFIG.phone}
                  </a>{" "}
                  or email{" "}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-champagne-300 underline">
                    {SITE_CONFIG.email}
                  </a>
                  .
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
