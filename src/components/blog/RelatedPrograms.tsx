import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

/**
 * Render-level interlinking from blog posts to money pages.
 *
 * Scores each program against the post's title/excerpt/body and renders the
 * top matches as a CTA box. Runs at build time (server component) — no
 * mutation of the migrated post HTML, every post gets consistent linking.
 */

type Matcher = {
  path: string;
  label: string;
  blurb: string;
  terms: string[];
};

const MATCHERS: Matcher[] = [
  {
    path: "/fix-and-flip-loans",
    label: "Fix & Flip Loans",
    blurb: "Up to 75% ARV with rehab draws",
    terms: ["fix and flip", "fix-and-flip", "flip", "rehab", "renovation", "arv", "flipper"],
  },
  {
    path: "/bridge-loans",
    label: "Bridge Loans",
    blurb: "Close the gap in as few as 7 days",
    terms: ["bridge", "1031", "gap financing", "blanket loan", "short-term financing"],
  },
  {
    path: "/construction-loans",
    label: "Ground-Up Construction",
    blurb: "Lot + vertical in one facility",
    terms: ["construction", "ground up", "ground-up", "builder", "spec home", "build-to-rent", "build to rent", "development"],
  },
  {
    path: "/adu-loans",
    label: "ADU Construction Loans",
    blurb: "75–85% LTC, milestone draws",
    terms: ["adu", "accessory dwelling", "garage conversion", "jadu", "backyard home"],
  },
  {
    path: "/cash-out-refinance",
    label: "Cash-Out Refinance",
    blurb: "Unlock equity with no seasoning",
    terms: ["cash out", "cash-out", "refinance", "equity", "refi"],
  },
  {
    path: "/probate-loans",
    label: "Probate & Estate Loans",
    blurb: "Court-experienced estate funding",
    terms: ["probate", "estate", "inheritance", "trust sale", "heir", "executor", "administrator"],
  },
  {
    path: "/foreclosure-bankruptcy-loans",
    label: "Foreclosure & Bankruptcy Recovery",
    blurb: "No credit minimums, fast payoffs",
    terms: ["foreclosure", "bankruptcy", "notice of default", "trustee sale", "bail out", "bailout", "bail-out", "distressed"],
  },
  {
    path: "/self-employed-loans",
    label: "Self-Employed Solutions",
    blurb: "No tax returns required",
    terms: ["self employed", "self-employed", "bank statement", "no tax return", "tax returns", "foreign national", "1099", "business owner"],
  },
  {
    path: "/investors",
    label: "Trust Deed Investments",
    blurb: "8.95–10.95% secured yields",
    terms: ["trust deed", "passive income", "first position", "sdira", "self-directed ira", "solo 401", "investor return", "monthly interest"],
  },
];

/** Default trio when a post matches nothing specific. */
const DEFAULTS = ["/fix-and-flip-loans", "/bridge-loans", "/cash-out-refinance"];

function countOccurrences(haystack: string, term: string): number {
  let count = 0;
  let idx = haystack.indexOf(term);
  while (idx !== -1) {
    count += 1;
    idx = haystack.indexOf(term, idx + term.length);
  }
  return count;
}

export function matchPrograms(
  title: string,
  excerpt: string,
  bodyHtml: string,
): Matcher[] {
  const t = title.toLowerCase();
  const e = excerpt.toLowerCase();
  // Strip tags so scoring reads text, not markup/URLs.
  const b = bodyHtml.replace(/<[^>]+>/g, " ").toLowerCase();

  const scored = MATCHERS.map((m) => {
    let score = 0;
    for (const term of m.terms) {
      if (t.includes(term)) score += 6;
      if (e.includes(term)) score += 3;
      score += Math.min(countOccurrences(b, term), 5);
    }
    return { m, score };
  })
    .filter((s) => s.score >= 4)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, 3)
    .map((s) => s.m);

  // Top up to three cards from the defaults so the box never looks sparse.
  for (const path of DEFAULTS) {
    if (scored.length >= 3) break;
    const fallback = MATCHERS.find(
      (m) => m.path === path && !scored.includes(m),
    );
    if (fallback) scored.push(fallback);
  }
  return scored;
}

export default function RelatedPrograms({
  title,
  excerpt,
  bodyHtml,
}: {
  title: string;
  excerpt: string;
  bodyHtml: string;
}) {
  const matches = matchPrograms(title, excerpt, bodyHtml);
  const tel = `tel:${SITE_CONFIG.phone.replace(/[^\d+]/g, "")}`;

  return (
    <aside className="mx-auto mt-12 max-w-3xl rounded-2xl border border-cdf/10 bg-white p-6 md:p-8">
      <div className="flex flex-col gap-1 mb-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-lg font-bold text-cdf">
          Financing for situations like this
        </h2>
        <a
          href={tel}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-champagne-600 hover:text-cdf transition-colors"
        >
          <Phone className="h-3.5 w-3.5" />
          {SITE_CONFIG.phone}
        </a>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {matches.map((program) => (
          <Link
            key={program.path}
            href={program.path}
            className="group rounded-xl border border-cdf/5 bg-light p-4 transition-colors hover:border-champagne-500/30"
          >
            <span className="mb-1 flex items-center justify-between gap-2 font-heading text-sm font-bold text-cdf">
              {program.label}
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-champagne-600 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="block text-xs text-body/70">{program.blurb}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
