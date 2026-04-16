"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function GetInTouch() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", "09f80e34-62a3-4fc0-9773-ff3f8f0683e2");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      setSubmitted(true);
      form.reset();
      setTimeout(() => setSubmitted(false), 5000);
    }
  }

  return (
    <section className="bg-gradient-cdf section-padding-y relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4A017 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

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
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
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
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <select
                  name="inquiry_type"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white/70 focus:outline-none focus:border-gold/50 transition-colors"
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
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-gold/50 transition-colors resize-none"
              />

              <button
                type="submit"
                className="btn-gold w-full flex items-center justify-center gap-2 text-lg"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
