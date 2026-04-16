"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

const ROTATING_TYPES = [
  "Fix & Flip",
  "Bridge Loans",
  "Construction",
  "Cash-Out Refi",
  "Probate & Estate",
];

const YT_VIDEO_ID = "4xHQQiQBnJk";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ROTATING_TYPES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* YouTube Background Video */}
      <div className="absolute inset-0 pointer-events-none">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playlist=${YT_VIDEO_ID}&playsinline=1&disablekb=1`}
          title="Background video"
          allow="autoplay; encrypted-media"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] min-w-[100vw] min-h-[100vh] border-0"
          style={{ aspectRatio: "16/9" }}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-dark" />

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #D4A017 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Fallback image for slow connections */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: "url(/images/hero-bg.png)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-container section-padding w-full pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-4">Private Lending for California Real Estate</p>

          <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white leading-tight mb-4">
            Fast, Flexible
            <br />
            <span className="gradient-text">Private Lending.</span>
          </h1>

          <div className="h-14 md:h-16 mb-6 flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="text-xl md:text-2xl text-white/70 font-light"
              >
                Fund Your{" "}
                <span className="text-gold font-medium">
                  {ROTATING_TYPES[currentIndex]}
                </span>{" "}
                Deal in 7 Days.
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="text-white/60 text-lg mb-10 max-w-xl leading-relaxed">
            Over $200M deployed across 500+ transactions. We specialize in
            scenarios where banks say no — probate, foreclosure, bankruptcy,
            self-employed, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/borrowers" variant="gold" size="lg" showArrow>
              I&apos;m a Borrower
            </Button>
            <Button href="/investors" variant="outline" size="lg" showArrow>
              I&apos;m an Investor
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
    </section>
  );
}
