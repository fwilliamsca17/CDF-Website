import type { Metadata } from "next";
import Link from "next/link";

/**
 * Custom 404. Without this, the Next default not-found inherited the root
 * metadata wholesale — homepage canonical and truncated description on a
 * 404 response (flagged in the 2026-08-04 sweep). Noindex, no canonical,
 * and routes the visitor somewhere useful.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "That page doesn't exist. Browse Capital Direct Funding's loan programs, service areas, and rates — or call (626) 796-1680.",
  robots: { index: false, follow: true },
  // Empty object REPLACES the root alternates wholesale (Next merges
  // metadata per top-level field) — without this the 404 inherits the
  // homepage canonical, which is a mixed signal on an error response.
  alternates: {},
};

const USEFUL_LINKS = [
  { href: "/borrowers", label: "Loan Programs" },
  { href: "/rates-and-terms", label: "Rates & Terms" },
  { href: "/private-money-lender-california", label: "Where We Lend" },
  { href: "/investors", label: "Trust Deed Investing" },
  { href: "/contact", label: "Contact Us" },
];

export default function NotFound() {
  return (
    <section className="hero-atmosphere relative flex min-h-[70vh] items-center overflow-hidden pb-20 pt-32">
      <div className="relative z-10 max-container section-padding text-center">
        <p className="eyebrow !text-champagne-300 mb-3">404</p>
        <h1 className="font-heading text-display-lg font-bold text-white mb-4">
          That Page Doesn&apos;t Exist.
        </h1>
        <p className="mx-auto mb-8 max-w-xl leading-relaxed text-ivory/60">
          The address may have changed when we rebuilt the site. Everything we
          offer is one click away below — or call{" "}
          <a href="tel:6267961680" className="text-champagne-300 hover:text-champagne-200">
            (626) 796-1680
          </a>{" "}
          and a person will point you the right way.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {USEFUL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
