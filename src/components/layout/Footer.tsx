"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-cdf text-white">
      <div className="max-container section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Image
              src="/images/cdf-logo-white.png"
              alt="Capital Direct Funding"
              width={200}
              height={45}
              className="h-10 w-auto mb-6"
            />
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              {SITE_CONFIG.description}
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-gold" />
                {SITE_CONFIG.phone}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-white/70 hover:text-gold transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-gold" />
                {SITE_CONFIG.email}
              </a>
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                {SITE_CONFIG.address.full}
              </div>
            </div>
          </div>

          {/* Borrowers links */}
          <div>
            <h4 className="font-heading font-semibold text-gold mb-4 text-sm uppercase tracking-wider">
              Borrowers
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.borrowers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Investors links */}
          <div>
            <h4 className="font-heading font-semibold text-gold mb-4 text-sm uppercase tracking-wider">
              Investors
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.investors.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-heading font-semibold text-gold mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Affiliations */}
      <div className="border-t border-white/10">
        <div className="max-container section-padding py-6 flex justify-center">
          <Image
            src="/images/footer-img.png"
            alt="NAHREP Corporate Member"
            width={300}
            height={60}
            className="h-12 w-auto opacity-70"
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-container section-padding py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} {SITE_CONFIG.legalName} All rights reserved.
              {SITE_CONFIG.dreLicense && ` DRE# ${SITE_CONFIG.dreLicense}`}
              {SITE_CONFIG.nmls && ` | NMLS# ${SITE_CONFIG.nmls}`}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {SITE_CONFIG.social.linkedin && (
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-gold transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
