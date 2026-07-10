import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import {
  Hammer,
  ArrowLeftRight,
  Building2,
  Scale,
  ShieldAlert,
  Briefcase,
  Clock,
  TrendingUp,
  Home,
  Landmark,
  FileText,
  RefreshCw,
  AlertTriangle,
  Users,
  HardHat,
  Layers,
  KeyRound,
  Gavel,
  HeartHandshake,
  LineChart,
  CalendarClock,
  Split,
} from "lucide-react";

/**
 * Content layer for the dedicated loan program pages.
 *
 * HARD RULE: every rate, LTV, term, and loan range on these pages renders
 * from LOAN_PROGRAMS.parameters in constants.ts — the single source of truth.
 * This file holds only narrative content (scenarios, FAQs, positioning).
 * Do not add numeric claims here that aren't already verified in constants
 * or llms-full.txt.
 */

export type LoanPageScenario = {
  title: string;
  description: string;
  tag?: string;
  icon: LucideIcon;
};

export type LoanPageFaq = {
  question: string;
  answer: string;
};

export type LoanPageData = {
  /** must match a LOAN_PROGRAMS slug — parameters render from there */
  programSlug: string;
  /** route path, e.g. "/fix-and-flip-loans" */
  path: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  eyebrow: string;
  h1: string;
  h1Highlight: string;
  heroLead: string;
  heroSub: string;
  scenariosEyebrow: string;
  scenariosTitle: string;
  scenariosSubtitle: string;
  scenarios: LoanPageScenario[];
  whoForTitle: string;
  whoFor: string[];
  faqs: LoanPageFaq[];
  /** paths of related program pages (rendered as cross-links) */
  related: { path: string; label: string }[];
};

export const LOAN_PAGES: LoanPageData[] = [
  // ──────────────────────────────────────────────────────────────
  // FIX & FLIP
  // ──────────────────────────────────────────────────────────────
  {
    programSlug: "fix-and-flip",
    path: "/fix-and-flip-loans",
    seo: {
      title: "Fix & Flip Loans California — Up to 75% ARV, 7-Day Closings",
      description:
        "Direct fix & flip financing for California investors. Up to 75% ARV, rates from 9.99%, rehab draws included, no prepayment penalty. Close in as few as 7 days with a direct lender — not a broker.",
      keywords: [
        "fix and flip loans California",
        "fix and flip lender Los Angeles",
        "hard money fix and flip loans",
        "rehab loans California",
        "house flipping loans",
        "ARV loans California",
        "fix and flip financing Orange County",
        "private money rehab lender",
      ],
    },
    eyebrow: "Fix & Flip Loans",
    h1: "Fund the Purchase and the Rehab.",
    h1Highlight: "Close in 7 Days.",
    heroLead:
      "Winning flips are won at the offer. When you can close in 7 days with financing that covers acquisition and renovation, you beat every buyer waiting on a bank — and sellers know it.",
    heroSub:
      "Capital Direct Funding is a direct lender. We fund our own deals, approve in-house, and have financed California flips since 2009 — over $200M deployed across 500+ transactions.",
    scenariosEyebrow: "Deals We Fund",
    scenariosTitle: "Built for How Flippers Actually Buy",
    scenariosSubtitle:
      "Every flip has a clock on it. These are the situations where our capital wins deals.",
    scenarios: [
      {
        title: "Auction & Trustee Sale Purchases",
        description:
          "You found the deal at auction but the payment deadline doesn't wait for bank underwriting. We close on auction timelines so you never forfeit a deposit — or a deal.",
        tag: "Speed Critical",
        icon: Gavel,
      },
      {
        title: "Off-Market & Wholesale Contracts",
        description:
          "Your wholesaler gave you 10 days to close. Conventional financing can't touch that. We underwrite the asset and the exit, issue terms fast, and fund inside your contract window.",
        tag: "Tight Windows",
        icon: KeyRound,
      },
      {
        title: "Heavy Rehab Projects",
        description:
          "Cosmetic flips are easy money — the margin is in the heavy lifts. We fund up to 75% of after-repair value with structured rehab draws, so your capital stays free for the next deal.",
        tag: "Up to 75% ARV",
        icon: Hammer,
      },
      {
        title: "First-Time Flippers With a Strong Deal",
        description:
          "No track record yet? We underwrite the deal first — purchase price, scope, comps, and exit. A strong project with real margin can stand on its own.",
        tag: "Deal-First Underwriting",
        icon: TrendingUp,
      },
      {
        title: "Multiple Concurrent Projects",
        description:
          "Banks cap how many projects they'll finance. We look at each deal on its merits, so experienced flippers can run several projects at once without hitting an arbitrary ceiling.",
        tag: "Portfolio Flippers",
        icon: Layers,
      },
      {
        title: "Mid-Project Refinance & Rescue",
        description:
          "Your current lender stalled, the project ran long, or a partner needs out. We refinance mid-project so you can finish the rehab and protect the profit you've already built.",
        tag: "Project Rescue",
        icon: RefreshCw,
      },
    ],
    whoForTitle: "Why Flippers Work With CDF",
    whoFor: [
      "Interest-only payments keep carry costs down while you renovate",
      "No prepayment penalty — sell early and keep the difference",
      "Rehab draws released on your schedule, not a committee's",
      "Direct lender: the person who approves your loan answers your call",
    ],
    faqs: [
      {
        question: "How fast can a fix & flip loan close in California?",
        answer:
          "In as few as 7 business days from a completed application. Capital Direct Funding is a direct lender — we underwrite in-house, order appraisal and title immediately, and don't wait on committee approvals.",
      },
      {
        question: "What does 75% ARV mean for my loan amount?",
        answer:
          "We lend up to 75% of the after-repair value — the appraised value of the property once your renovation is complete, not just the purchase price. On the right deal, that can cover most of the acquisition and the full rehab budget.",
      },
      {
        question: "How do rehab draws work?",
        answer:
          "Your renovation budget is funded through structured draws tied to completed work. Finish a stage, request the draw, and funds are released — keeping the project moving without tying up your own cash.",
      },
      {
        question: "Do I need flipping experience to qualify?",
        answer:
          "Experience helps, but we underwrite the deal first: purchase price, renovation scope, comparable sales, and exit strategy. A strong project with real margin can qualify on its own merits.",
      },
      {
        question: "Is there a prepayment penalty if I sell quickly?",
        answer:
          "No. Fix & flip loans have no prepayment penalty — if your project sells in month four of a twelve-month term, you pay interest only for the time you used the money.",
      },
      {
        question: "What are the rates and terms on fix & flip loans?",
        answer:
          "Rates start at 9.99% with terms of 6 to 18 months and loan amounts from $100K to $3M. Every quote is deal-specific — call (626) 796-1680 and we'll give you preliminary terms within 24 hours.",
      },
    ],
    related: [
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/construction-loans", label: "Ground-Up Construction" },
      { path: "/adu-loans", label: "ADU Construction Loans" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // BRIDGE LOANS
  // ──────────────────────────────────────────────────────────────
  {
    programSlug: "bridge-loans",
    path: "/bridge-loans",
    seo: {
      title: "Bridge Loans California — Close in 7 Days, Up to 70% LTV",
      description:
        "Short-term bridge financing for California real estate. Up to 70% LTV, rates from 9.99%, terms 6–24 months, $100K–$5M. Commercial and residential. Direct lender with flexible exit strategies.",
      keywords: [
        "bridge loans California",
        "bridge loan lender Los Angeles",
        "commercial bridge loans",
        "residential bridge loan California",
        "short term real estate loans",
        "private bridge financing",
        "bridge loan for property purchase",
        "1031 exchange bridge loan",
      ],
    },
    eyebrow: "Bridge Loans",
    h1: "The Deal Won't Wait.",
    h1Highlight: "Your Capital Shouldn't Either.",
    heroLead:
      "A bridge loan buys you the one thing banks can't sell: time. Close on the new property now, then refinance or sell on your schedule — not under pressure.",
    heroSub:
      "We bridge commercial and residential transactions across California, $100K to $5M, with exit strategies built around your actual plan.",
    scenariosEyebrow: "When a Bridge Wins",
    scenariosTitle: "Situations Where Timing Is Everything",
    scenariosSubtitle:
      "Bridge capital exists for the gap between opportunity and permanent financing. Here's where it earns its keep.",
    scenarios: [
      {
        title: "Buy Before You Sell",
        description:
          "The perfect property is available now, but your capital is tied up in one you haven't sold. We lend against the equity so you can secure the new asset without a fire-sale on the old one.",
        tag: "Most Common",
        icon: ArrowLeftRight,
      },
      {
        title: "1031 Exchange Deadlines",
        description:
          "You identified the replacement property but your 45/180-day clock is running and permanent financing is behind schedule. We close inside the window and keep your exchange — and its tax deferral — intact.",
        tag: "Time Critical",
        icon: CalendarClock,
      },
      {
        title: "Maturing Loan Payoff",
        description:
          "Your current note is maturing and the refinance isn't ready. A bridge pays off the maturing lender, stops default interest, and gives you room to finish permanent financing properly.",
        tag: "Debt Maturity",
        icon: Clock,
      },
      {
        title: "Value-Add Before Refinance",
        description:
          "The property doesn't qualify for bank financing yet — vacancy is too high or the rent roll needs work. Bridge capital carries you through stabilization, then you refinance at the better basis.",
        tag: "Stabilization",
        icon: LineChart,
      },
      {
        title: "Partnership Buyouts",
        description:
          "A partner wants out, a divorce settlement requires a buyout, or an inheritance needs to be split. We lend against the property so one party can buy the other out cleanly — without forcing a sale.",
        tag: "Ownership Changes",
        icon: Split,
      },
      {
        title: "Cross-Collateralized Acquisitions",
        description:
          "Strong portfolio, but the target deal needs more leverage than one property supports. We can cross-collateralize multiple properties to get the full purchase funded in one close.",
        tag: "Portfolio Leverage",
        icon: Layers,
      },
    ],
    whoForTitle: "Why Borrowers Bridge With CDF",
    whoFor: [
      "Commercial and residential — one lender for the whole portfolio",
      "Flexible exit strategies: sale, refinance, or stabilization",
      "Cross-collateralization available for larger acquisitions",
      "Direct decisions from the people who fund the loan",
    ],
    faqs: [
      {
        question: "What is a bridge loan and when does it make sense?",
        answer:
          "A bridge loan is short-term financing secured by real estate that 'bridges' the gap between a purchase and your permanent financing or sale. It makes sense whenever the opportunity moves faster than a bank: competitive purchases, 1031 deadlines, maturing debt, or a property that needs stabilizing before it qualifies for conventional financing.",
      },
      {
        question: "How fast can a bridge loan close?",
        answer:
          "In as few as 7 days from completed application. As a direct lender we control the entire process — underwriting, appraisal, title, and escrow coordination all run in parallel.",
      },
      {
        question: "What LTV and loan amounts are available?",
        answer:
          "Up to 70% loan-to-value, from $100K to $5M, on both commercial and residential property across California. Terms run 6 to 24 months with rates from 9.99%.",
      },
      {
        question: "What exit strategies do you accept?",
        answer:
          "Sale of the property, refinance into permanent financing, or stabilization followed by either. We underwrite your actual plan — and pressure-test it with you up front, so the loan is built around a realistic exit.",
      },
      {
        question: "Can I use a bridge loan for a 1031 exchange?",
        answer:
          "Yes. Bridge financing is one of the most common ways to close a replacement property inside the 180-day exchange window when permanent financing can't move fast enough. We coordinate with your exchange accommodator to keep the timeline intact.",
      },
      {
        question: "Do you lend on owner-occupied homes?",
        answer:
          "Our loans are business-purpose loans secured by California real estate — investment property, commercial buildings, and business-purpose transactions. Call (626) 796-1680 and we'll tell you within one conversation whether your scenario fits.",
      },
    ],
    related: [
      { path: "/fix-and-flip-loans", label: "Fix & Flip Loans" },
      { path: "/cash-out-refinance", label: "Cash-Out Refinance" },
      { path: "/probate-loans", label: "Probate & Estate Loans" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // GROUND-UP CONSTRUCTION
  // ──────────────────────────────────────────────────────────────
  {
    programSlug: "construction",
    path: "/construction-loans",
    seo: {
      title:
        "Ground-Up Construction Loans California — Private Lender, Fast Draws",
      description:
        "Private construction financing for California builders. Lot acquisition + vertical construction, up to 65% of completed value, rates from 10.99%, $250K–$5M. Structured draws that keep projects moving.",
      keywords: [
        "construction loans California",
        "ground up construction financing",
        "private construction lender Los Angeles",
        "spec home construction loans",
        "builder financing California",
        "lot and construction loan",
        "SFR construction loans",
        "multifamily construction financing",
      ],
    },
    eyebrow: "Ground-Up Construction",
    h1: "From Dirt to Done —",
    h1Highlight: "Without the Bank Bottleneck.",
    heroLead:
      "Construction profits die in delays. Slow draws stall subs, stalled subs blow schedules, and blown schedules eat margin. We fund lot acquisition and vertical construction with draws that release when the work is done — not when a committee meets.",
    heroSub:
      "Built for experienced California builders: spec homes, small multifamily, and infill projects from $250K to $5M.",
    scenariosEyebrow: "Projects We Fund",
    scenariosTitle: "Construction Capital That Matches How Builders Work",
    scenariosSubtitle:
      "From lot closing to certificate of occupancy, the structure matters as much as the rate.",
    scenarios: [
      {
        title: "Spec Home Construction",
        description:
          "You've got the lot, the plans, and the comps to prove the exit. We fund acquisition and construction in one facility — up to 65% of completed value — so you're not stitching together capital mid-project.",
        tag: "SFR Spec",
        icon: Home,
      },
      {
        title: "Infill Lot Development",
        description:
          "California's best margins hide in infill lots that banks find 'too complicated.' We understand entitlements, demo, and utility work — and fund projects conventional construction lenders won't touch.",
        tag: "Infill",
        icon: Building2,
      },
      {
        title: "Small Multifamily Builds",
        description:
          "Duplexes, fourplexes, and small apartment projects that pencil beautifully but fall below institutional minimums. We fund the builds that are too small for the big lenders and too complex for the banks.",
        tag: "2–10 Units",
        icon: Layers,
      },
      {
        title: "Teardown & Rebuild",
        description:
          "The land is worth more than the structure. We fund acquisition, demolition, and new construction as one project — common across LA and Orange County's aging housing stock.",
        tag: "Teardown",
        icon: Hammer,
      },
      {
        title: "Mid-Project Takeover",
        description:
          "Your construction lender froze draws, or the project needs more capital to reach completion. We evaluate work-in-place and fund completion — protecting everything you've already built.",
        tag: "Completion Capital",
        icon: HardHat,
      },
      {
        title: "Build-to-Rent Projects",
        description:
          "Building to hold instead of sell? We fund the construction phase with a term structure that hands off cleanly to permanent rental financing at stabilization.",
        tag: "BTR",
        icon: TrendingUp,
      },
    ],
    whoForTitle: "Why Builders Choose CDF",
    whoFor: [
      "One facility covers lot acquisition and construction",
      "Draw schedule structured around your build plan",
      "Experienced-builder underwriting — we speak construction",
      "Direct access to decision-makers when the project needs a fast answer",
    ],
    faqs: [
      {
        question: "What do your construction loans cover?",
        answer:
          "Lot acquisition plus vertical construction costs in a single facility, up to 65% of the completed value, from $250K to $5M. Terms run 12 to 24 months with rates from 10.99%.",
      },
      {
        question: "How does the draw schedule work?",
        answer:
          "Draws are structured around your build plan and released against completed work. Because we're a direct lender, draw approvals don't sit in a queue — your subs stay paid and your schedule stays intact.",
      },
      {
        question: "Do I need builder experience to qualify?",
        answer:
          "Yes — ground-up construction loans require an experienced builder on the project. If you're newer, pairing with an experienced general contractor can satisfy this, and our fix & flip and ADU programs may fit lighter projects.",
      },
      {
        question: "What project types do you fund?",
        answer:
          "Single-family residences and small multifamily across California — spec homes, infill development, teardown-rebuilds, and build-to-rent projects.",
      },
      {
        question: "Can you take over a stalled construction project?",
        answer:
          "Often, yes. We evaluate the work in place, remaining budget, and completion plan. If the numbers support it, we refinance the existing lender and fund completion.",
      },
      {
        question: "How fast can a construction loan close?",
        answer:
          "Faster than any bank construction department — our underwriting, appraisal, and title work run in parallel. Call (626) 796-1680 with your project details and you'll have preliminary terms within 24 hours.",
      },
    ],
    related: [
      { path: "/adu-loans", label: "ADU Construction Loans" },
      { path: "/fix-and-flip-loans", label: "Fix & Flip Loans" },
      { path: "/bridge-loans", label: "Bridge Loans" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // CASH-OUT REFINANCE
  // ──────────────────────────────────────────────────────────────
  {
    programSlug: "cash-out",
    path: "/cash-out-refinance",
    seo: {
      title:
        "Cash-Out Refinance California — Investment Property Equity in 7 Days",
      description:
        "Business-purpose cash-out refinancing on California investment property. Up to 65% LTV, rates from 9.99%, no seasoning requirements, $100K–$3M. Access your equity in as few as 7 days.",
      keywords: [
        "cash out refinance investment property California",
        "hard money cash out refinance",
        "business purpose cash out loan",
        "no seasoning cash out refinance",
        "investment property equity loan",
        "private money cash out California",
        "rental property cash out refinance",
        "commercial cash out refinance",
      ],
    },
    eyebrow: "Cash-Out Refinance",
    h1: "Your Equity Is Sitting Idle.",
    h1Highlight: "Put It to Work in 7 Days.",
    heroLead:
      "Banks take 45 to 60 days and a mountain of documentation to release your own equity. We underwrite the property, issue terms in 24 hours, and fund business-purpose cash-out in as few as 7 days.",
    heroSub:
      "No seasoning requirements — refinance a recent purchase at today's value, not last year's price.",
    scenariosEyebrow: "What Investors Do With Equity",
    scenariosTitle: "Capital for the Next Move",
    scenariosSubtitle:
      "Every one of these is a business-purpose cash-out we've funded — secured by California real estate.",
    scenarios: [
      {
        title: "Fund the Next Acquisition",
        description:
          "The strongest offer is a cash offer. Pull equity from a stabilized property and buy the next one outright — then refinance the whole position once it's yours.",
        tag: "Buy With Cash",
        icon: KeyRound,
      },
      {
        title: "Renovation & Value-Add Capital",
        description:
          "Fund the rehab of one property with the equity in another. Cheaper than a partner, faster than a bank, and you keep 100% of the upside.",
        tag: "Value-Add",
        icon: Hammer,
      },
      {
        title: "Business Working Capital",
        description:
          "Your business needs inventory, equipment, or expansion capital — and your real estate holds the equity to fund it. Business-purpose cash-out puts property equity behind business growth.",
        tag: "Business Growth",
        icon: Briefcase,
      },
      {
        title: "No-Seasoning Refinance",
        description:
          "Bought under market value or forced appreciation fast? Banks make you wait 6–12 months to recognize the new value. We refinance at today's appraised value with no seasoning requirement.",
        tag: "No Seasoning",
        icon: CalendarClock,
      },
      {
        title: "Debt Consolidation on the Portfolio",
        description:
          "Replace expensive or maturing debt across multiple properties with one clean first-position loan. Simpler payments, cleaner balance sheet, better position for the next lender.",
        tag: "Consolidation",
        icon: Layers,
      },
      {
        title: "Partnership & Estate Settlements",
        description:
          "Buying out a partner or settling an estate distribution without selling the property. Cash-out against the asset keeps the property in your hands and closes the settlement.",
        tag: "Buyouts",
        icon: HeartHandshake,
      },
    ],
    whoForTitle: "Why Investors Pull Equity With CDF",
    whoFor: [
      "No seasoning requirements — today's value, not purchase price",
      "First-position trust deeds, clean structure",
      "Asset-based underwriting — the property qualifies, not your tax return",
      "Terms from 12 to 36 months for room to execute your plan",
    ],
    faqs: [
      {
        question: "What is a business-purpose cash-out refinance?",
        answer:
          "A loan secured by your investment property where the proceeds fund business purposes — acquiring property, renovations, business capital, or settling partnership interests. It's underwritten on the asset, which is why it closes in days instead of months.",
      },
      {
        question: "How much equity can I access?",
        answer:
          "Up to 65% loan-to-value on California investment property, from $100K to $3M, at rates from 9.99% with terms of 12 to 36 months.",
      },
      {
        question: "What does 'no seasoning requirement' mean?",
        answer:
          "Banks typically require you to own a property 6–12 months before refinancing at its current appraised value. We don't. If you bought below market or added value quickly, we lend against what it's worth today.",
      },
      {
        question: "Do you require tax returns or income documentation?",
        answer:
          "Our underwriting is asset-based — focused on the property's value and the deal structure rather than personal income documentation. That's why self-employed investors and business owners close with us when banks stall.",
      },
      {
        question: "How fast can I get the funds?",
        answer:
          "In as few as 7 business days from completed application. You'll have preliminary terms within 24 hours of your first call to (626) 796-1680.",
      },
      {
        question: "Can I cash out on a property that has no mortgage?",
        answer:
          "Yes — free-and-clear properties are the cleanest cash-out transactions we do. We place a new first trust deed and you receive the proceeds at closing.",
      },
    ],
    related: [
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/self-employed-loans", label: "Self-Employed Solutions" },
      { path: "/fix-and-flip-loans", label: "Fix & Flip Loans" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // PROBATE & ESTATE
  // ──────────────────────────────────────────────────────────────
  {
    programSlug: "probate",
    path: "/probate-loans",
    seo: {
      title: "Probate & Estate Loans California — Court-Experienced Lender",
      description:
        "Specialized probate and estate financing in California. Up to 65% LTV, terms 6–24 months, $100K–$3M. Court confirmation expertise, flexible timelines, and direct coordination with estate attorneys.",
      keywords: [
        "probate loans California",
        "estate loans California",
        "inheritance property loan",
        "trust loans California",
        "probate real estate financing",
        "court confirmation loan",
        "estate settlement financing",
        "loan to buy out siblings inheritance",
      ],
    },
    eyebrow: "Probate & Estate Loans",
    h1: "Estates Move on Court Time.",
    h1Highlight: "Your Financing Shouldn't Fight It.",
    heroLead:
      "Probate financing fails when the lender doesn't understand the process. We've funded estate transactions since 2009 — we know court confirmation timelines, letters of administration, and what a judge needs to see.",
    heroSub:
      "We work directly with estate attorneys, administrators, and heirs to structure loans that fit the legal process instead of fighting it.",
    scenariosEyebrow: "Estate Situations We Fund",
    scenariosTitle: "Financing Built Around the Probate Process",
    scenariosSubtitle:
      "Every estate has its own complications. These are the ones we resolve most often.",
    scenarios: [
      {
        title: "Heir & Sibling Buyouts",
        description:
          "One heir wants to keep the family property; the others want their share in cash. We lend against the property so one heir buys out the rest — no forced sale, no family fracture.",
        tag: "Most Common",
        icon: HeartHandshake,
      },
      {
        title: "Estate Debt & Expense Settlement",
        description:
          "The estate owes taxes, attorney fees, or debts, but its wealth is locked in real estate. We unlock equity so the administrator can settle obligations without a rushed below-market sale.",
        tag: "Liquidity",
        icon: Scale,
      },
      {
        title: "Court Confirmation Purchases",
        description:
          "Buying property through a court-confirmed probate sale means hard deadlines and overbid risk. We fund on court timelines so your purchase doesn't collapse waiting for a bank.",
        tag: "Court Sales",
        icon: Gavel,
      },
      {
        title: "Trust Property Financing",
        description:
          "Successor trustees often need capital against trust-held property — to distribute to beneficiaries, maintain the asset, or prepare it for sale. We lend directly to trusts and coordinate with trustees and counsel.",
        tag: "Trusts",
        icon: Landmark,
      },
      {
        title: "Pre-Sale Property Preparation",
        description:
          "The estate property will sell for far more with repairs and updates. We fund the work so the estate captures full market value instead of settling for an as-is investor price.",
        tag: "Maximize Value",
        icon: Hammer,
      },
      {
        title: "Reverse Mortgage & Lien Payoffs",
        description:
          "A reverse mortgage comes due at death, or existing liens threaten foreclosure during probate. We pay off the pressing debt and give the estate time to administer properly.",
        tag: "Time Sensitive",
        icon: ShieldAlert,
      },
    ],
    whoForTitle: "Why Attorneys and Administrators Choose CDF",
    whoFor: [
      "Court confirmation expertise — we know what judges require",
      "Flexible timelines matched to the probate calendar",
      "Direct coordination with estate attorneys and fiduciaries",
      "We lend to estates, trusts, and administrators — not just individuals",
    ],
    faqs: [
      {
        question: "Can an estate or trust get a loan during probate?",
        answer:
          "Yes. With proper authority — letters testamentary, letters of administration, or trustee powers — an estate or trust can borrow against its real estate. We structure these loans regularly and coordinate directly with counsel on the required approvals.",
      },
      {
        question: "How does an inheritance buyout loan work?",
        answer:
          "The loan is secured by the estate property and the proceeds pay the departing heirs for their shares. The heir keeping the property then refinances into long-term financing or sells on their own timeline. It keeps the property in the family without anyone being forced out cheap.",
      },
      {
        question: "Do you require court approval for the loan?",
        answer:
          "It depends on the administrator's authority. Under full IAEA authority, many loans proceed with notice rather than a hearing; limited authority may require court confirmation. We've worked both paths and build the timeline around what your case requires.",
      },
      {
        question: "What are the terms on probate and estate loans?",
        answer:
          "Up to 65% LTV, $100K to $3M, terms of 6 to 24 months, rates from 10.99%. Interest-only structures keep the estate's carrying cost low while administration completes.",
      },
      {
        question: "Do you work directly with our probate attorney?",
        answer:
          "Always. Estate loans go smoother when the lender and counsel are in direct contact — we handle the lending mechanics so your attorney can focus on the administration.",
      },
      {
        question: "How fast can an estate loan fund?",
        answer:
          "In as few as 7 days once we have the property details and authority documents. Call (626) 796-1680 — we'll tell you in one conversation what the estate qualifies for.",
      },
    ],
    related: [
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/foreclosure-bankruptcy-loans", label: "Foreclosure Recovery" },
      { path: "/professionals/attorneys", label: "For Attorneys" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // FORECLOSURE & BANKRUPTCY RECOVERY
  // ──────────────────────────────────────────────────────────────
  {
    programSlug: "foreclosure-recovery",
    path: "/foreclosure-bankruptcy-loans",
    seo: {
      title:
        "Foreclosure Bailout & Post-Bankruptcy Loans California — No Credit Minimum",
      description:
        "Foreclosure bail-out and post-bankruptcy financing in California. No minimum credit score, asset-based underwriting, up to 60% LTV, $100K–$2M. Stop the sale and recover on your terms.",
      keywords: [
        "foreclosure bailout loans California",
        "stop foreclosure loan",
        "loan after bankruptcy California",
        "bad credit hard money loans",
        "notice of default loan",
        "foreclosure rescue financing",
        "post bankruptcy real estate loan",
        "no credit check hard money lender",
      ],
    },
    eyebrow: "Foreclosure & Bankruptcy Recovery",
    h1: "A Foreclosure Date Isn't the End.",
    h1Highlight: "It's a Deadline We Can Beat.",
    heroLead:
      "Banks look at your credit report. We look at your property. If there's real equity, a foreclosure notice or a past bankruptcy doesn't disqualify you — it just means the clock matters more.",
    heroSub:
      "No minimum credit score. Asset-based underwriting. Direct answers in 24 hours, because in these situations, waiting is the one thing you can't afford.",
    scenariosEyebrow: "Situations We Resolve",
    scenariosTitle: "When the Property Is Strong but the Story Is Complicated",
    scenariosSubtitle:
      "These are exactly the loans banks won't make — and exactly where direct private capital exists to help.",
    scenarios: [
      {
        title: "Foreclosure Bail-Out",
        description:
          "A Notice of Default or trustee sale date is on the calendar. We pay off the foreclosing lender, stop the sale, and replace panic with a manageable plan — sell, refinance, or recover.",
        tag: "Emergency",
        icon: AlertTriangle,
      },
      {
        title: "Post-Bankruptcy Rebuild",
        description:
          "You emerged from Chapter 7 or 13 and every conventional lender wants years of waiting. If your property has equity, we lend now — so the bankruptcy becomes history instead of a holding pattern.",
        tag: "No Waiting Period",
        icon: RefreshCw,
      },
      {
        title: "Exit From Chapter 13 Plans",
        description:
          "Property equity can pay off a Chapter 13 plan early and end the payment plan years ahead of schedule. We work with your bankruptcy attorney on court approval where required.",
        tag: "Plan Payoff",
        icon: Scale,
      },
      {
        title: "Reinstatement & Arrears Catch-Up",
        description:
          "Sometimes you don't need to replace the whole loan — you need capital to reinstate it. We structure loans that cure the default and stabilize the position.",
        tag: "Reinstatement",
        icon: ShieldAlert,
      },
      {
        title: "Maturity Default Refinance",
        description:
          "Your balloon came due and the refinance fell through — now default interest is compounding. We pay off the matured note and stop the bleeding while you arrange the permanent exit.",
        tag: "Balloon Default",
        icon: Clock,
      },
      {
        title: "Protecting Inherited Property in Default",
        description:
          "You inherited a property already in foreclosure — the estate can't move fast enough and the sale date won't wait. We fund on the property's equity and buy the estate time to act.",
        tag: "Inherited Default",
        icon: Home,
      },
    ],
    whoForTitle: "Why Borrowers in Recovery Choose CDF",
    whoFor: [
      "No minimum credit score — the property qualifies, not the report",
      "We move on foreclosure timelines, not bank timelines",
      "Post-bankruptcy lending without multi-year waiting periods",
      "Discreet, judgment-free process from people who've seen it all",
    ],
    faqs: [
      {
        question: "Can I get a loan to stop a foreclosure in California?",
        answer:
          "Yes, if the property has sufficient equity. A foreclosure bail-out loan pays off the foreclosing lender before the trustee sale, stopping the foreclosure. The key variable is time — call us the day you decide to act, because every week of delay adds fees and shrinks options.",
      },
      {
        question: "How soon after bankruptcy can I get a loan?",
        answer:
          "There's no mandatory waiting period with us. Conventional lenders impose 2–4 year waits after bankruptcy; our underwriting is asset-based, so a discharged bankruptcy with a strong property can fund right away.",
      },
      {
        question: "Is there really no minimum credit score?",
        answer:
          "Really. We underwrite the property value, the equity position, and the exit plan. Credit history explains the past; the asset secures the loan.",
      },
      {
        question: "What are the terms on foreclosure recovery loans?",
        answer:
          "Up to 60% LTV, $100K to $2M, terms of 6 to 24 months, rates from 11.99%. The conservative LTV is what makes lending possible in these situations at all — it protects both sides.",
      },
      {
        question: "How fast can you fund before a trustee sale date?",
        answer:
          "In as few as 7 days from completed application. If your sale date is closer than that, call (626) 796-1680 immediately — depending on the situation there may still be a path, but hours matter.",
      },
      {
        question: "Will you work with my bankruptcy or foreclosure attorney?",
        answer:
          "Yes — we prefer it. Where court approval is required, we coordinate directly with your counsel and structure the loan to fit what the court will approve.",
      },
    ],
    related: [
      { path: "/probate-loans", label: "Probate & Estate Loans" },
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/professionals/attorneys", label: "For Attorneys" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // SELF-EMPLOYED SOLUTIONS
  // ──────────────────────────────────────────────────────────────
  {
    programSlug: "self-employed",
    path: "/self-employed-loans",
    seo: {
      title:
        "Self-Employed Real Estate Loans California — No Tax Returns Required",
      description:
        "Real estate financing for self-employed borrowers and business owners in California. No tax returns required, bank statement programs, up to 70% LTV, $100K–$3M, rates from 9.99%.",
      keywords: [
        "no tax return loans California",
        "self employed real estate loans",
        "bank statement loans California",
        "business owner property financing",
        "no doc investment property loan",
        "self employed hard money loans",
        "1099 borrower real estate loan",
        "entrepreneur property financing",
      ],
    },
    eyebrow: "Self-Employed Solutions",
    h1: "Your Tax Return Is Optimized.",
    h1Highlight: "Your Financing Shouldn't Punish You for It.",
    heroLead:
      "You run a profitable business and write off everything you legally can — then a bank calls you 'unqualified' because the net income line looks thin. We underwrite the asset and the real cash flow, not the tax strategy.",
    heroSub:
      "No tax returns required. Bank statement programs available. Built for the business owners, contractors, and 1099 earners who actually drive California's economy.",
    scenariosEyebrow: "Who We Fund",
    scenariosTitle: "Financing That Understands How Owners Actually Earn",
    scenariosSubtitle:
      "If your income is real but your documentation is 'non-traditional,' you're exactly who this program exists for.",
    scenarios: [
      {
        title: "Business Owners With Optimized Returns",
        description:
          "Your CPA did their job — depreciation, write-offs, deferrals. Now the bank says you don't earn enough. We look at the property and the deal, so tax efficiency stops costing you deals.",
        tag: "Most Common",
        icon: Briefcase,
      },
      {
        title: "Bank Statement Qualification",
        description:
          "Your deposits tell the real story. Our bank statement programs qualify you on actual cash flow instead of adjusted gross income — no two-year tax return autopsy.",
        tag: "Bank Statements",
        icon: FileText,
      },
      {
        title: "Recently Self-Employed",
        description:
          "Banks want a two-year self-employment history. If you left W-2 life last year and your business is producing, we're not going to make you wait two years to invest.",
        tag: "New Entrepreneurs",
        icon: TrendingUp,
      },
      {
        title: "Real Estate Professionals & Agents",
        description:
          "Commission income is 'irregular' to a bank — even when it's substantial. Agents, brokers, and investors qualify with us on the strength of the deal, not the pay stub they don't have.",
        tag: "Commission Income",
        icon: KeyRound,
      },
      {
        title: "Contractors & Trades Businesses",
        description:
          "Seasonal revenue, equipment write-offs, project-based income — everything about a contractor's finances confuses a bank underwriter. None of it confuses us.",
        tag: "Trades",
        icon: HardHat,
      },
      {
        title: "Foreign Nationals & ITIN Borrowers",
        description:
          "No U.S. credit file doesn't mean no deal. We finance foreign nationals investing in California real estate with asset-based underwriting and straightforward documentation.",
        tag: "Foreign Nationals",
        icon: Users,
      },
    ],
    whoForTitle: "Why the Self-Employed Close With CDF",
    whoFor: [
      "No tax returns required — ever, on any program",
      "Bank statement programs that credit your real cash flow",
      "Simplified underwriting: the property and the plan, not the paperwork",
      "Business-purpose loans from $100K to $3M across California",
    ],
    faqs: [
      {
        question: "Can I really get a real estate loan without tax returns?",
        answer:
          "Yes. Our loans are business-purpose loans underwritten on the property's value and the deal structure. Tax returns are not part of our documentation requirements.",
      },
      {
        question: "How do bank statement loans work?",
        answer:
          "Instead of tax returns, your business or personal bank statements demonstrate cash flow. Deposits show the real earning power that write-offs hide — and that's what we credit.",
      },
      {
        question: "I've been self-employed less than two years. Do I qualify?",
        answer:
          "The two-year rule is a bank convention, not ours. If your business is generating real cash flow and the property supports the loan, recent self-employment is not a barrier.",
      },
      {
        question: "What are the terms for self-employed borrowers?",
        answer:
          "Up to 70% LTV, $100K to $3M, terms of 6 to 36 months, rates from 9.99% — the same competitive terms W-2 borrowers get elsewhere, without the documentation battle.",
      },
      {
        question: "Do you finance foreign nationals?",
        answer:
          "Yes. Foreign national financing is one of our specializations — no U.S. credit history required, with asset-based underwriting on California property.",
      },
      {
        question: "How fast can a self-employed borrower close?",
        answer:
          "The same 7-day capability as every CDF program — simplified documentation actually makes these files faster, not slower. Call (626) 796-1680 for preliminary terms within 24 hours.",
      },
    ],
    related: [
      { path: "/cash-out-refinance", label: "Cash-Out Refinance" },
      { path: "/fix-and-flip-loans", label: "Fix & Flip Loans" },
      { path: "/professionals/cpas", label: "For CPAs & Tax Advisors" },
    ],
  },
];

/** Look up a loan page by its route path. */
export function getLoanPage(path: string): LoanPageData | undefined {
  return LOAN_PAGES.find((p) => p.path === path);
}

/** Look up a loan page by its LOAN_PROGRAMS slug. */
export function getLoanPageByProgramSlug(
  slug: string,
): LoanPageData | undefined {
  return LOAN_PAGES.find((p) => p.programSlug === slug);
}

/** Build the Next.js Metadata object for a program page route. */
export function buildLoanPageMetadata(path: string): Metadata {
  const page = getLoanPage(path);
  if (!page) return {};
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
    },
    alternates: { canonical: `https://capitaldf.com${path}` },
  };
}
