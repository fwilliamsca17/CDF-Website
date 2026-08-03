/**
 * Structured numeric terms per loan program — the machine-readable layer.
 *
 * WHY: AI answer engines cite lenders whose numbers are liftable. Competitor
 * pages get quoted ("$50K–$20M, 80% LTV, 7.99–13%") because directories hold
 * their terms as structured data; ours lived only inside prose strings and a
 * pipe-delimited schema description. This file feeds (a) the /rates-and-terms
 * comparison table and (b) real schema.org fields (annualPercentageRate,
 * amount, loanTerm) in JsonLd.tsx.
 *
 * KEEP IN SYNC with LOAN_PROGRAMS parameter strings in constants.ts and the
 * program copy in llms.txt / llms-full.txt — a mismatch between our own
 * machine-readable sources is worse than no data (see the 8.50% incident,
 * corrected 2026-08-03: an aspirational floor nothing offered undercut every
 * consistent claim around it). Rate floors here must equal a real program
 * floor: the sitewide minimum is ADU's 9.50%.
 */

export type LoanTermsRow = {
  /** LOAN_PROGRAMS slug, or "adu" for the bespoke ADU program */
  slug: string;
  name: string;
  href: string;
  /** annual rate floor, percent */
  rateFrom: number;
  /** rate ceiling where published (ADU only) — omit rather than guess */
  rateTo?: number;
  termMinMonths: number;
  termMaxMonths: number;
  amountMin: number;
  amountMax: number;
  /** display string — LTV bases differ (ARV, LTC, completed value, LTV) */
  ltvDisplay: string;
};

export const LOAN_TERMS: LoanTermsRow[] = [
  {
    slug: "fix-and-flip",
    name: "Fix & Flip",
    href: "/fix-and-flip-loans",
    rateFrom: 9.99,
    termMinMonths: 6,
    termMaxMonths: 18,
    amountMin: 100_000,
    amountMax: 3_000_000,
    ltvDisplay: "Up to 75% of ARV",
  },
  {
    slug: "bridge-loans",
    name: "Bridge",
    href: "/bridge-loans",
    rateFrom: 9.99,
    termMinMonths: 6,
    termMaxMonths: 24,
    amountMin: 100_000,
    amountMax: 5_000_000,
    ltvDisplay: "Up to 70% LTV",
  },
  {
    slug: "construction",
    name: "Ground-Up Construction",
    href: "/construction-loans",
    rateFrom: 10.99,
    termMinMonths: 12,
    termMaxMonths: 24,
    amountMin: 250_000,
    amountMax: 5_000_000,
    ltvDisplay: "Up to 65% of completed value",
  },
  {
    slug: "cash-out",
    name: "Cash-Out Refinance",
    href: "/cash-out-refinance",
    rateFrom: 9.99,
    termMinMonths: 12,
    termMaxMonths: 36,
    amountMin: 100_000,
    amountMax: 3_000_000,
    ltvDisplay: "Up to 65% LTV",
  },
  {
    slug: "probate",
    name: "Probate & Estate",
    href: "/probate-loans",
    rateFrom: 10.99,
    termMinMonths: 6,
    termMaxMonths: 24,
    amountMin: 100_000,
    amountMax: 3_000_000,
    ltvDisplay: "Up to 65% LTV",
  },
  {
    slug: "foreclosure-recovery",
    name: "Foreclosure & Bankruptcy Recovery",
    href: "/foreclosure-bankruptcy-loans",
    rateFrom: 11.99,
    termMinMonths: 6,
    termMaxMonths: 24,
    amountMin: 100_000,
    amountMax: 2_000_000,
    ltvDisplay: "Up to 60% LTV",
  },
  {
    slug: "self-employed",
    name: "Self-Employed Solutions",
    href: "/self-employed-loans",
    rateFrom: 9.99,
    termMinMonths: 6,
    termMaxMonths: 36,
    amountMin: 100_000,
    amountMax: 3_000_000,
    ltvDisplay: "Up to 70% LTV",
  },
  {
    // Bespoke program — not in LOAN_PROGRAMS; numbers from llms.txt.
    slug: "adu",
    name: "ADU Construction",
    href: "/adu-loans",
    rateFrom: 9.5,
    rateTo: 11,
    termMinMonths: 12,
    termMaxMonths: 18,
    amountMin: 60_000,
    amountMax: 300_000,
    ltvDisplay: "75–85% LTC (per unit)",
  },
];

export function getLoanTerms(slug: string): LoanTermsRow | undefined {
  return LOAN_TERMS.find((t) => t.slug === slug);
}

export function formatAmount(n: number): string {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M`
    : `$${Math.round(n / 1_000)}K`;
}
