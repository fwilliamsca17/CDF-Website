"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import { TEAM_MEMBERS } from "@/lib/constants";
import FadeIn from "@/components/ui/FadeIn";
import GetInTouch from "@/components/sections/GetInTouch";

export default function TeamPage() {
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
            <p className="eyebrow mb-3">Our Team</p>
            <h1 className="font-heading text-display-lg md:text-display-xl font-bold text-white mb-6">
              Meet the People{" "}
              <span className="gradient-text">Behind Your Funding</span>
            </h1>
            <p className="text-xl text-white/60 leading-relaxed">
              Capital Direct Funding is a family-run company. When you work with
              us, you work directly with decision-makers who are personally
              invested in your success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          {TEAM_MEMBERS.map((member) => (
            <FadeIn key={member.name}>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                {/* Photo */}
                <div className="lg:col-span-2">
                  <div className="relative">
                    <div className="bg-cdf/5 rounded-2xl overflow-hidden aspect-[3/4]">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={500}
                        height={667}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gold rounded-xl px-5 py-3 shadow-lg">
                      <p className="font-heading text-sm font-bold text-white">
                        {member.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="lg:col-span-3">
                  <p className="eyebrow mb-2">Leadership</p>
                  <h2 className="font-heading text-display font-bold text-cdf heading-underline mb-6">
                    {member.name}
                  </h2>
                  <p className="text-body text-lg leading-relaxed mb-6">
                    {member.bio}
                  </p>

                  <div className="flex items-center gap-4">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-cdf hover:text-gold transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    )}
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-2 text-cdf hover:text-gold transition-colors text-sm font-medium"
                      >
                        <Mail className="w-4 h-4" />
                        {member.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
