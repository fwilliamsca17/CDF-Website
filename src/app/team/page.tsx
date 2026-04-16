"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, User } from "lucide-react";
import { TEAM_MEMBERS, TEAM_HEADLINE } from "@/lib/constants";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import GetInTouch from "@/components/sections/GetInTouch";

export default function TeamPage() {
  const leadership = TEAM_MEMBERS.filter((m) => m.featured);
  const team = TEAM_MEMBERS.filter((m) => !m.featured);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-cdf pt-32 pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #D4A017 1px, transparent 1px)",
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
              {TEAM_HEADLINE}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding-y bg-white">
        <div className="max-container section-padding">
          <SectionHeading
            eyebrow="Leadership"
            title="Company Principals"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((member, i) => (
              <FadeIn key={member.name} delay={i * 100}>
                <div className="bg-light rounded-xl overflow-hidden card-hover">
                  <div className="aspect-[4/3] bg-cdf/10 relative">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-20 h-20 text-cdf/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-cdf">
                      {member.name}
                    </h3>
                    <p className="text-gold font-semibold text-sm mb-3">
                      {member.title}
                    </p>
                    <div className="flex items-center gap-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-cdf hover:text-gold transition-colors text-sm"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-1.5 text-cdf hover:text-gold transition-colors text-sm"
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
        </div>
      </section>

      {/* Full Team */}
      <section className="section-padding-y bg-light">
        <div className="max-container section-padding">
          <SectionHeading eyebrow="The Team" title="Our People" />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-xl overflow-hidden card-hover text-center"
              >
                <div className="aspect-square bg-cdf/5 relative flex items-center justify-center">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-cdf/15" />
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-heading text-sm font-bold text-cdf leading-tight">
                    {member.name}
                  </h4>
                  <p className="text-body/60 text-xs mt-1">{member.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
