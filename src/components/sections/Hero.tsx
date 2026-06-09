"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import HeroVideo from "./HeroVideo";

const ROTATING_TYPES = [
  "Fix & Flip",
  "Bridge Loans",
  "Construction",
  "Cash-Out Refi",
  "Probate & Estate",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTATING_TYPES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-atmosphere relative flex min-h-screen items-center overflow-hidden">
      {/* Deferred YouTube video — loads on idle, fades in beneath the
          overlays so the nocturne palette stays dominant. Never on the
          critical path; respects reduced-motion + Save-Data. */}
      <HeroVideo />
      {/* Drifting light source */}
      <div className="hero-glow pointer-events-none absolute -right-[10%] -top-[15%] h-[65vw] w-[65vw] motion-safe:animate-glow-drift" />
      {/* Film grain */}
      <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.07]" />
      {/* Vignette */}
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 max-container section-padding w-full pt-32 pb-24">
        <div className="max-w-3xl">
          <p
            className="hero-in mb-6 flex items-center gap-3 text-label font-semibold uppercase tracking-[0.22em] text-champagne-300"
            style={{ animationDelay: "0ms" }}
          >
            <span className="h-px w-8 bg-champagne-500/70" />
            Private Lending for California Real Estate
          </p>

          <h1
            className="hero-in-lcp mb-6 font-heading text-display-lg font-bold leading-[1.04] text-ivory md:text-display-xl"
            style={{ animationDelay: "90ms" }}
          >
            Fast, Flexible
            <br />
            <span className="text-champagne-gradient">Private Lending.</span>
          </h1>

          <div
            className="hero-in mb-7 flex h-12 items-center md:h-14"
            style={{ animationDelay: "200ms" }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4 }}
                className="text-xl font-light text-ivory/70 md:text-2xl"
              >
                Fund Your{" "}
                <span className="font-medium text-champagne-300">
                  {ROTATING_TYPES[currentIndex]}
                </span>{" "}
                Deal in 7 Days.
              </motion.p>
            </AnimatePresence>
          </div>

          <p
            className="hero-in mb-10 max-w-xl text-lg leading-relaxed text-ivory/55"
            style={{ animationDelay: "280ms" }}
          >
            Over $200M deployed across 500+ transactions. We specialize in
            scenarios where banks say no — probate, foreclosure, bankruptcy,
            self-employed, and more.
          </p>

          <div
            className="hero-in flex flex-col gap-4 sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <Link href="/borrowers" className="btn-champagne group">
              I&apos;m a Borrower
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/investors" className="btn-ghost-light group">
              I&apos;m an Investor
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div
            className="hero-in mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-ivory/50"
            style={{ animationDelay: "460ms" }}
          >
            <span>
              <span className="font-semibold text-ivory">$200M+</span> deployed
            </span>
            <span className="h-4 w-px bg-ivory/15" />
            <span>
              <span className="font-semibold text-ivory">500+</span> loans funded
            </span>
            <span className="h-4 w-px bg-ivory/15" />
            <span>
              Close in <span className="font-semibold text-ivory">7 days</span>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/40 md:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 motion-safe:animate-scroll-cue" />
      </div>

      {/* Bottom hairline */}
      <div className="hairline-champagne absolute inset-x-0 bottom-0 h-px" />
    </section>
  );
}
