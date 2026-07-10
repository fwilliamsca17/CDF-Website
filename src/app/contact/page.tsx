"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { SITE_CONFIG, LOAN_PROGRAMS } from "@/lib/constants";
import FadeIn from "@/components/ui/FadeIn";
import { useLeadForm } from "@/lib/useLeadForm";

// Valid ?program= values: LOAN_PROGRAMS slugs plus the ADU program.
const PROGRAM_OPTIONS = [
  ...LOAN_PROGRAMS.map((p) => ({ value: p.slug, label: p.title })),
  { value: "adu", label: "ADU Construction Loans" },
];

export default function ContactPage() {
  const { submitted, submitting, error, handleSubmit } = useLeadForm();
  const [program, setProgram] = useState("");

  // Preselect the loan program from ?program= (links on program pages pass
  // it). Read from window so the page stays statically generated.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get(
      "program",
    );
    if (requested && PROGRAM_OPTIONS.some((o) => o.value === requested)) {
      setProgram(requested);
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-cdf pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle, #C9A86A 1px, transparent 1px)",
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
            <p className="eyebrow mb-3">Contact Us</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Let&apos;s Talk About{" "}
              <span className="gradient-text">Your Deal</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Whether you&apos;re a borrower, investor, or broker — we&apos;re
              here to help. Reach out and we&apos;ll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="font-heading text-heading-xl font-bold text-cdf heading-underline mb-8">
                  Send Us a Message
                </h2>

                {submitted ? (
                  <div className="text-center py-16 bg-light rounded-xl">
                    <CheckCircle className="w-16 h-16 text-champagne-600 mx-auto mb-4" />
                    <h3 className="font-heading text-2xl font-bold text-cdf mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-body">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <input type="hidden" name="subject" value="Contact Form - CDF Website" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-cdf mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cdf mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-cdf mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cdf mb-1.5">
                          Inquiry Type
                        </label>
                        <select
                          name="inquiry_type"
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-gold/30 transition-colors"
                        >
                          <option value="Borrower Inquiry">Borrower Inquiry</option>
                          <option value="Investor Inquiry">Investor Inquiry</option>
                          <option value="Broker Inquiry">Broker Inquiry</option>
                          <option value="Loan Status">Loan Status</option>
                          <option value="General">General Question</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cdf mb-1.5">
                        Loan Program
                      </label>
                      <select
                        name="loan_program"
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-gold/30 transition-colors"
                      >
                        <option value="">Not sure yet / General</option>
                        {PROGRAM_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-cdf mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell us about your deal or question..."
                        className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark placeholder:text-body/40 focus:outline-none focus:border-champagne-500 focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-60 disabled:cursor-wait"
                    >
                      <Send className="w-5 h-5" />
                      {submitting ? "Sending…" : "Send Message"}
                    </button>

                    {error && (
                      <p className="text-sm text-red-600" role="alert">
                        Something went wrong sending your message. Please call{" "}
                        <a href="tel:+16267961680" className="font-semibold text-cdf underline">
                          {SITE_CONFIG.phone}
                        </a>{" "}
                        or email{" "}
                        <a href={`mailto:${SITE_CONFIG.email}`} className="font-semibold text-cdf underline">
                          {SITE_CONFIG.email}
                        </a>
                        .
                      </p>
                    )}
                  </form>
                )}
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div>
              <FadeIn delay={200}>
                <div className="bg-cdf rounded-xl p-6 text-white mb-6">
                  <h3 className="font-heading text-xl font-bold mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="flex items-center gap-3 text-white/70 hover:text-champagne-600 transition-colors"
                    >
                      <Phone className="w-5 h-5 text-champagne-600" />
                      {SITE_CONFIG.phone}
                    </a>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="flex items-center gap-3 text-white/70 hover:text-champagne-600 transition-colors"
                    >
                      <Mail className="w-5 h-5 text-champagne-600" />
                      {SITE_CONFIG.email}
                    </a>
                    <div className="flex items-start gap-3 text-white/70">
                      <MapPin className="w-5 h-5 text-champagne-600 mt-0.5 shrink-0" />
                      <div>
                        <p>{SITE_CONFIG.address.street}</p>
                        <p>
                          {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                          {SITE_CONFIG.address.zip}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-white/70">
                      <Clock className="w-5 h-5 text-champagne-600 mt-0.5 shrink-0" />
                      <div>
                        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                        <p>Sat - Sun: By Appointment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-champagne-500/10 rounded-xl p-6 border border-champagne-500/20">
                  <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                    Need Funding Fast?
                  </h3>
                  <p className="text-body text-sm leading-relaxed mb-3">
                    Call us directly for the fastest response. We can often
                    provide a preliminary assessment on the same call.
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-champagne-600 font-semibold hover:text-champagne-600-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
