"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Phone, Send } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import {
  QUIZ_QUESTIONS,
  routeLead,
  type LeadRoute,
  type QuizAnswers,
  type QuizField,
} from "@/lib/quiz";
import { useLeadForm } from "@/lib/useLeadForm";
import { track } from "@/lib/analytics";
import { useExperiment } from "@/lib/experiments";
import { cn } from "@/lib/utils";
import LandingHeroBackdrop from "@/components/landing/LandingHeroBackdrop";

const TOTAL_STEPS = QUIZ_QUESTIONS.length + 1;

// PostHog experiment "psr-hero-headline" — variant keys must match the
// feature flag exactly. Copy stays calm and promise-free (CC 2945).
const HERO_HEADLINES: Record<
  string,
  { pre: string; highlight: string; post: string }
> = {
  control: { pre: "What Is the Best Path for ", highlight: "Your Property", post: "?" },
  // Copy must promise only what the page literally delivers: the quiz shows
  // options/routing in ~2 minutes; the substantive answer comes from an
  // advisor. "Straight answer in 2 minutes" over-promised (review finding).
  "see-options": {
    pre: "See ",
    highlight: "Your Property's Options",
    post: " in 2 Minutes",
  },
};

const HERO_POINTS = [
  "Understand your timeline",
  "Explore CDF business-purpose financing",
  "Identify time-sensitive payoff or bridge needs",
  "Receive a review from an experienced CDF advisor",
];

const RESULT_COPY: Record<
  LeadRoute,
  { headline: string; body: string[]; secondary?: { href: string; label: string } }
> = {
  cdf_priority_review: {
    headline: "Your situation warrants a priority CDF review.",
    body: [
      "Based on your answers, a time-sensitive bridge or payoff review may be appropriate. Capital Direct Funding has been a direct lender since 2009, and a real person reviews every submission.",
      "A CDF advisor will confirm the business purpose, collateral, timeline, and preliminary eligibility. Submitting this review is not a loan application or promise of approval.",
    ],
    secondary: { href: "/borrowers", label: "Explore loan programs" },
  },
  cdf_standard_review: {
    headline: "Your property may fit a CDF financing review.",
    body: [
      "Based on your answers, one or more CDF business-purpose loan programs may fit your property strategy.",
      "A CDF advisor will review the property use, requested proceeds, collateral, and exit plan before discussing preliminary terms. Submitting this review is not a loan application or promise of approval.",
    ],
    secondary: { href: "/borrowers", label: "Explore loan programs" },
  },
  resource_only: {
    headline: "You have options — and we can point you to the right ones.",
    body: [
      "CDF's loan programs are business-purpose, so a consumer mortgage on an owner-occupied home isn't something we finance. That doesn't mean you're out of options — it means the right help looks different.",
      "Our advisors regularly connect homeowners with the resources that fit their situation: HUD-approved housing counselors, loan-modification help through your mortgage servicer, and, where appropriate, introductions to licensed bankruptcy attorneys. Pointing you in the right direction is free — and it starts with a call.",
    ],
    secondary: {
      href: "https://www.hud.gov/housing-counseling",
      label: "Find a HUD-approved counselor",
    },
  },
};

export default function PropertyStrategyReviewPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [completed, setCompleted] = useState(false);
  const startedRef = useRef(false);
  // Mirrors `step` so clicks from the exiting AnimatePresence panel (alive
  // ~250ms with stale closures) can't double-advance and skip a question.
  const stepRef = useRef(1);
  const { submitted, submitting, error, handleSubmit } = useLeadForm({
    subject: "Property Strategy Review — CDF Website",
  });

  const tel = `tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`;
  const route = routeLead(answers);
  const question = step <= QUIZ_QUESTIONS.length ? QUIZ_QUESTIONS[step - 1] : null;
  const headlineVariant = useExperiment("psr-hero-headline");
  const headline = HERO_HEADLINES[headlineVariant] ?? HERO_HEADLINES.control;

  // useLeadForm resets `submitted` after 5s — latch completion locally so the
  // result screen persists, and fire quiz_completed exactly once.
  useEffect(() => {
    if (submitted && !completed) {
      setCompleted(true);
      track("quiz_completed", {
        route,
        property_type: answers.property_type,
        property_use: answers.property_use,
        timeline: answers.timeline,
        equity: answers.equity,
        goal: answers.goal,
      });
    }
  }, [submitted, completed, route, answers]);

  function selectOption(field: QuizField, value: string) {
    if (QUIZ_QUESTIONS[stepRef.current - 1]?.field !== field) return;
    if (!startedRef.current) {
      startedRef.current = true;
      track("quiz_started", { page: "/property-strategy-review" });
    }
    const nextAnswers = { ...answers, [field]: value };
    setAnswers(nextAnswers);
    track("quiz_step_completed", { step: stepRef.current, field, value });

    if (stepRef.current === QUIZ_QUESTIONS.length) {
      const nextRoute = routeLead(nextAnswers);
      const routingProperties = {
        route: nextRoute,
        property_type: nextAnswers.property_type,
        property_use: nextAnswers.property_use,
        timeline: nextAnswers.timeline,
        equity: nextAnswers.equity,
        goal: nextAnswers.goal,
      };
      track("routing_decision_made", routingProperties);
      // Every route proceeds to contact capture — resource_only leads are
      // referral conversations (HUD counselors, loan-mod resources, BK
      // attorneys), not lending pipeline, but the advisor call still starts
      // with a name and number. The result copy stays financing-free.
    }

    stepRef.current = Math.min(stepRef.current + 1, TOTAL_STEPS);
    setStep(stepRef.current);
  }

  function goBack() {
    stepRef.current = Math.max(stepRef.current - 1, 1);
    setStep(stepRef.current);
  }

  const result = RESULT_COPY[route];

  return (
    <>
      {/* Hero */}
      <section className="hero-atmosphere relative min-h-[640px] overflow-hidden pb-20 pt-32 flex items-center">
        <LandingHeroBackdrop />
        <div className="relative z-10 max-container section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[46rem]"
          >
            <p className="eyebrow !text-champagne-300 mb-3">
              Property Strategy Review
            </p>
            <h1 className="font-heading text-[2.6rem] leading-[1.04] sm:text-display-lg md:text-display-xl font-bold text-white mb-6">
              {headline.pre}
              <span className="text-champagne-gradient">
                {headline.highlight}
              </span>
              {headline.post}
            </h1>
            <p className="text-lg sm:text-xl text-ivory/70 leading-relaxed mb-8">
              Every property situation has more than one path forward. Five
              quick questions help you see which options fit your timeline,
              your equity, and your goals.
            </p>
            <ul className="space-y-3 mb-8">
              {HERO_POINTS.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-ivory/80"
                >
                  <CheckCircle2 className="w-5 h-5 text-champagne-400 mt-0.5 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <a href="#review" className="btn-champagne">
                Start the Review
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-sm text-ivory/50">
                2 minutes · 5 questions · Confidential
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quiz */}
      <section id="review" className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <div className="max-w-2xl mx-auto">
            {completed ? (
              <div className="bg-light rounded-2xl border border-cdf/5 p-6 sm:p-10 text-center">
                <CheckCircle2 className="w-14 h-14 text-champagne-600 mx-auto mb-5" />
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cdf mb-4">
                  {result.headline}
                </h2>
                {result.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-body leading-relaxed mb-3"
                  >
                    {paragraph}
                  </p>
                ))}
                {route !== "resource_only" && (
                  <p className="text-cdf font-semibold mt-6 mb-8">
                    Your review is in — an advisor will reach out within one
                    business day.
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  {route !== "resource_only" && (
                    <a href={tel} className="btn-champagne">
                      <Phone className="w-5 h-5" />
                      Call {SITE_CONFIG.phone}
                    </a>
                  )}
                  {result.secondary && (
                    <Link
                      href={result.secondary.href}
                      className="inline-flex items-center gap-1.5 text-cdf hover:text-champagne-600 transition-colors text-sm font-semibold"
                    >
                      {result.secondary.label}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
                <p className="text-body/60 text-xs leading-relaxed max-w-md mx-auto">
                  All loans are business-purpose loans secured by California
                  real estate. CDF is not your mortgage servicer, housing
                  counselor, or law firm. If keeping your home is your
                  priority, you may also wish to contact your servicer or a
                  HUD-approved housing counselor — foreclosure counseling is
                  available at little or no cost.
                  {SITE_CONFIG.dreLicense && ` DRE# ${SITE_CONFIG.dreLicense}`}
                  {SITE_CONFIG.nmls && ` | NMLS# ${SITE_CONFIG.nmls}`}
                </p>
              </div>
            ) : (
              <div className="bg-light rounded-2xl border border-cdf/5 p-6 sm:p-10">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-champagne-600">
                      Step {step} of {TOTAL_STEPS}
                    </span>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex items-center gap-1 text-sm text-body hover:text-cdf transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                      </button>
                    )}
                  </div>
                  <div className="h-1.5 rounded-full bg-cdf/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-champagne-500 transition-all duration-300"
                      style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.25 }}
                  >
                    {question ? (
                      <>
                        <h2 className="font-heading text-xl sm:text-2xl font-bold text-cdf mb-6">
                          {question.question}
                        </h2>
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() =>
                                selectOption(question.field, option.value)
                              }
                              className={cn(
                                "w-full text-left rounded-xl border px-5 py-4 text-cdf font-medium transition-colors",
                                answers[question.field] === option.value
                                  ? "border-champagne-500 bg-champagne-500/10"
                                  : "border-cdf/10 bg-white hover:border-champagne-500/40"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h2 className="font-heading text-xl sm:text-2xl font-bold text-cdf mb-2">
                          Where can an advisor reach you?
                        </h2>
                        <p className="text-body text-sm mb-6">
                          An experienced advisor reviews every submission
                          personally and follows up within one business day.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <input
                            type="hidden"
                            name="property_type"
                            value={answers.property_type ?? ""}
                          />
                          <input
                            type="hidden"
                            name="property_use"
                            value={answers.property_use ?? ""}
                          />
                          <input
                            type="hidden"
                            name="timeline"
                            value={answers.timeline ?? ""}
                          />
                          <input
                            type="hidden"
                            name="equity"
                            value={answers.equity ?? ""}
                          />
                          <input
                            type="hidden"
                            name="goal"
                            value={answers.goal ?? ""}
                          />
                          <input
                            type="hidden"
                            name="recommended_route"
                            value={route}
                          />

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <input
                              type="text"
                              name="first_name"
                              placeholder="First Name"
                              className="w-full bg-white border border-cdf/10 rounded-lg px-4 py-3 text-cdf placeholder:text-body/50 focus:outline-none focus:border-champagne-500/60 transition-colors"
                            />
                            <input
                              type="text"
                              name="last_name"
                              placeholder="Last Name"
                              className="w-full bg-white border border-cdf/10 rounded-lg px-4 py-3 text-cdf placeholder:text-body/50 focus:outline-none focus:border-champagne-500/60 transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <input
                              type="tel"
                              name="phone"
                              placeholder="Phone Number *"
                              required
                              className="w-full bg-white border border-cdf/10 rounded-lg px-4 py-3 text-cdf placeholder:text-body/50 focus:outline-none focus:border-champagne-500/60 transition-colors"
                            />
                            <input
                              type="email"
                              name="email"
                              placeholder="Email Address *"
                              required
                              className="w-full bg-white border border-cdf/10 rounded-lg px-4 py-3 text-cdf placeholder:text-body/50 focus:outline-none focus:border-champagne-500/60 transition-colors"
                            />
                          </div>

                          <input
                            type="text"
                            name="property_city"
                            placeholder="Property City (optional)"
                            className="w-full bg-white border border-cdf/10 rounded-lg px-4 py-3 text-cdf placeholder:text-body/50 focus:outline-none focus:border-champagne-500/60 transition-colors"
                          />

                          <label className="flex items-start gap-3 text-xs text-body leading-relaxed cursor-pointer">
                            <input
                              type="checkbox"
                              name="consent"
                              required
                              className="mt-0.5 h-4 w-4 shrink-0 accent-champagne-600"
                            />
                            <span>
                              I agree to receive calls, texts, and emails from
                              Capital Direct Funding about my inquiry,
                              including through automated technology such as
                              autodialed or prerecorded calls and texts.
                              Message and data rates may apply. Reply STOP to
                              opt out. Consent is not a condition of any
                              service.
                            </span>
                          </label>

                          <button
                            type="submit"
                            disabled={submitting}
                            className="btn-champagne w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-wait"
                          >
                            <Send className="w-5 h-5" />
                            {submitting ? "Sending…" : "Get My Strategy Review"}
                          </button>

                          {error && (
                            <p
                              className="text-center text-sm text-red-600"
                              role="alert"
                            >
                              Something went wrong sending your review. Please
                              call{" "}
                              <a
                                href={tel}
                                className="font-semibold text-champagne-600 underline"
                              >
                                {SITE_CONFIG.phone}
                              </a>{" "}
                              or email{" "}
                              <a
                                href={`mailto:${SITE_CONFIG.email}`}
                                className="font-semibold text-champagne-600 underline"
                              >
                                {SITE_CONFIG.email}
                              </a>
                              .
                            </p>
                          )}
                        </form>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
