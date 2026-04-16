"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import FadeIn from "@/components/ui/FadeIn";

export default function ContactPage() {
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
                    <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
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
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
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
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
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
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-cdf mb-1.5">
                          Inquiry Type
                        </label>
                        <select
                          name="inquiry_type"
                          className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
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
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Tell us about your deal or question..."
                        className="w-full border border-cdf/20 rounded-lg px-4 py-3 text-dark placeholder:text-body/40 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-gold flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
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
                      className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                    >
                      <Phone className="w-5 h-5 text-gold" />
                      {SITE_CONFIG.phone}
                    </a>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors"
                    >
                      <Mail className="w-5 h-5 text-gold" />
                      {SITE_CONFIG.email}
                    </a>
                    <div className="flex items-start gap-3 text-white/70">
                      <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p>{SITE_CONFIG.address.street}</p>
                        <p>
                          {SITE_CONFIG.address.city}, {SITE_CONFIG.address.state}{" "}
                          {SITE_CONFIG.address.zip}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-white/70">
                      <Clock className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                      <div>
                        <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                        <p>Sat - Sun: By Appointment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
                  <h3 className="font-heading text-lg font-bold text-cdf mb-2">
                    Need Funding Fast?
                  </h3>
                  <p className="text-body text-sm leading-relaxed mb-3">
                    Call us directly for the fastest response. We can often
                    provide a preliminary assessment on the same call.
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-600 transition-colors"
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
