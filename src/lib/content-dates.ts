/**
 * Last substantive content change per route, as YYYY-MM-DD.
 *
 * WHY THIS FILE EXISTS: the sitemap used to stamp `new Date()` on every entry,
 * so all 174 URLs claimed to have changed on whatever day the site last built.
 * Search engines detect that pattern and stop trusting <lastmod> for the whole
 * domain — which costs us the one signal that actually earns fast recrawls
 * when we DO ship a real change.
 *
 * DISCIPLINE: bump the date here when you meaningfully change a page's copy,
 * offer terms, or FAQs. Do NOT bump it for styling, refactors, or dependency
 * bumps — a lastmod that moves without the content moving is the same lie,
 * just slower. If you're unsure, leave it.
 *
 * Seeded 2026-07-29 from `git log -1 --format=%cs` per route.
 * Blog posts are excluded: they carry their own real publish dates.
 */
export const CONTENT_UPDATED: Record<string, string> = {
  "/": "2026-07-15",

  // Audience hubs
  "/borrowers": "2026-07-09",
  "/investors": "2026-06-11",
  "/professionals": "2026-07-09",
  "/professionals/attorneys": "2026-07-09",
  "/professionals/cpas": "2026-06-11",
  "/professionals/mortgage": "2026-07-09",
  "/professionals/real-estate": "2026-07-09",

  // Loan program pages
  "/fix-and-flip-loans": "2026-07-09",
  "/bridge-loans": "2026-07-09",
  "/construction-loans": "2026-07-09",
  "/cash-out-refinance": "2026-07-09",
  "/probate-loans": "2026-07-09",
  "/foreclosure-bankruptcy-loans": "2026-07-09",
  "/self-employed-loans": "2026-07-09",
  "/adu-loans": "2026-06-11",

  // Service-area pages — city tier
  "/hard-money-lender-west-covina": "2026-07-29",
  "/hard-money-lender-covina": "2026-08-03",
  "/hard-money-lender-pasadena": "2026-08-03",
  "/hard-money-lender-glendale": "2026-08-03",
  "/hard-money-lender-long-beach": "2026-08-03",
  "/hard-money-lender-pomona": "2026-08-03",
  "/hard-money-lender-el-monte": "2026-08-03",

  // Service-area pages — county tier
  "/hard-money-lender-los-angeles": "2026-07-09",
  "/hard-money-lender-orange-county": "2026-07-09",
  "/hard-money-lender-riverside": "2026-07-09",
  "/hard-money-lender-san-bernardino": "2026-07-09",
  "/hard-money-lender-san-diego": "2026-07-09",

  // Company & conversion
  "/property-strategy-review": "2026-07-16",
  "/loan-process": "2026-06-11",
  "/about": "2026-06-11",
  "/team": "2026-06-06",
  "/contact": "2026-07-09",
  "/faq": "2026-06-06",
  "/privacy": "2026-06-11",
  "/blog": "2026-06-11",
};

/**
 * Date to stamp on a route. Falls back to the earliest date we know about
 * rather than "now" — an unmapped route is a gap in the map above, and
 * guessing "today" is exactly the behaviour this file replaces.
 */
const FALLBACK = "2026-06-06";

export function lastModifiedFor(path: string): Date {
  return new Date(`${CONTENT_UPDATED[path] ?? FALLBACK}T12:00:00Z`);
}
