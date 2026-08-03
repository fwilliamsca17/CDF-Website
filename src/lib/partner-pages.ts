import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";
import {
  FileCheck,
  Clock,
  Scale,
  Home,
  Building2,
  Landmark,
  HardHat,
  Hammer,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Wallet,
  PiggyBank,
} from "lucide-react";

/**
 * Content layer for the second wave of referral-partner pages
 * (/professionals/*). The original four (attorneys, CPAs, mortgage,
 * real-estate) are bespoke components; these are data-driven through
 * PartnerPage.tsx so adding a partner type stays a data change.
 *
 * HARD RULES: no invented statistics; every number traces to verified CDF
 * facts. No compensation/referral-fee language anywhere — escrow officers,
 * fiduciaries, and advisors operate under neutrality and fiduciary duties,
 * and the pitch is client outcomes, not kickbacks. All lending references
 * stay business-purpose; investor language mirrors /investors exactly.
 */

export type PartnerScenario = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PartnerPageData = {
  path: string;
  /** short name for nav/hub cards, e.g. "Escrow & Title" */
  name: string;
  /** hero eyebrow, e.g. "For Escrow & Title Professionals" */
  eyebrow: string;
  /** schema.org Audience.audienceType */
  audienceType: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  h1: string;
  h1Highlight: string;
  heroLead: string;
  scenarios: PartnerScenario[];
  /** how working together actually goes — 3 steps */
  process: { title: string; description: string }[];
  /** why CDF, for this audience specifically */
  value: { title: string; description: string; icon: LucideIcon }[];
  faqs: { question: string; answer: string }[];
  related: { path: string; label: string }[];
};

export const PARTNER_PAGES: PartnerPageData[] = [
  // ──────────────────────────────────────────────────────────────
  // ESCROW & TITLE
  // ──────────────────────────────────────────────────────────────
  {
    path: "/professionals/escrow-title",
    name: "Escrow & Title",
    eyebrow: "For Escrow & Title Professionals",
    audienceType: "Escrow officers and title professionals",
    seo: {
      title: "For Escrow & Title Officers — Rescue Financing That Closes",
      description:
        "Capital Direct Funding keeps California escrows alive when financing falls out. Direct private money, docs in days, wires on time — $50K to $5M, closing in as few as 7 business days. DRE# 01885595.",
      keywords: [
        "escrow officer private lender",
        "financing fell through escrow",
        "rescue loan escrow California",
        "title company hard money lender",
        "fast close lender escrow",
        "private money escrow rescue",
        "bridge loan open escrow",
      ],
    },
    h1: "When Financing Falls Out,",
    h1Highlight: "Your Escrow Doesn't Have To.",
    heroLead:
      "Every escrow officer knows the call: the lender re-traded, the file died in committee, and a transaction months in the making is 72 hours from cancellation. We exist for that call. Direct private capital, underwriting in-house, docs to your desk in days — and wires that land when we say they will.",
    scenarios: [
      {
        title: "Mid-Escrow Lender Fallout",
        description:
          "The buyer's financing collapsed with contingencies released. We can underwrite, doc, and fund a business-purpose replacement loan inside the existing escrow — often without moving the closing date.",
        icon: Clock,
      },
      {
        title: "Short-Fuse Closings",
        description:
          "Auction purchases, 1031 deadlines, court-confirmed sales — timelines a conventional lender cannot physically meet. Our standard close is as fast as 7 business days from complete application.",
        icon: FileCheck,
      },
      {
        title: "Probate & Trust Sales",
        description:
          "Court confirmation calendars, administrator authority, heirs in three states. We fund estate transactions routinely and know what your file needs before you ask.",
        icon: Scale,
      },
      {
        title: "Title Complications Banks Won't Touch",
        description:
          "Seasoning issues, recent quitclaims, partition situations, unpermitted additions. Where a bank declines the file outright, we work the exception with you and your title officer.",
        icon: ShieldCheck,
      },
      {
        title: "Bridge Between Transactions",
        description:
          "Your client is selling one property and buying another, and the calendars don't line up. Business-purpose bridge loans from $50K to $5M keep both escrows moving.",
        icon: Building2,
      },
    ],
    process: [
      {
        title: "Call With the Scenario",
        description:
          "One conversation — property, timeline, what fell apart. We'll tell you the same day whether we can save the closing and on what terms.",
      },
      {
        title: "Terms in Writing, Fast",
        description:
          "A written term sheet typically within 24 hours. What we quote is what we close; re-trading files the week of funding is how lenders end up on escrow officers' blacklists.",
      },
      {
        title: "Docs and Wire on Schedule",
        description:
          "Loan documents drawn and delivered to escrow in days, funding conditions kept minimal, and the wire confirmed when promised. Your closing statement stays intact.",
      },
    ],
    value: [
      {
        title: "We Answer the Phone",
        description:
          "You get the decision-makers directly — the same family that has run this company since 2009. No loan committee, no 48-hour callback window.",
        icon: Handshake,
      },
      {
        title: "Clean, Predictable Files",
        description:
          "Professional doc prep, standard business-purpose loan packages, clear funding conditions. Over 500 California closings' worth of working with escrow and title.",
        icon: FileCheck,
      },
      {
        title: "Speed That's Real",
        description:
          "As fast as 7 business days application-to-funding — because underwriting, docs, and funding decisions all happen in one West Covina office.",
        icon: Clock,
      },
    ],
    faqs: [
      {
        question: "How fast can you fund into an already-open escrow?",
        answer:
          "As fast as 7 business days from a completed application — sometimes faster when title and escrow are already open and the file is clean, since your existing prelim and escrow instructions do double duty.",
      },
      {
        question: "What do you need from escrow to move quickly?",
        answer:
          "The essentials: open order with the prelim, purchase contract or payoff context, and your contact for instructions. We handle borrower documentation directly and keep our funding conditions short and explicit.",
      },
      {
        question: "Do you re-trade terms before closing?",
        answer:
          "No. Terms are issued in writing after underwriting, not before it — which is why what we quote is what funds. Escrow officers refer us because our closings don't blow up their calendars.",
      },
      {
        question: "What kinds of loans are these?",
        answer:
          "Business-purpose loans secured by California real estate — investment property, commercial, and business-purpose transactions — in first trust deed position, $50,000 to $5,000,000. If a scenario is consumer-purpose, we say so on the first call.",
      },
      {
        question: "Do you work with title on exceptions?",
        answer:
          "Yes. Vesting cleanups, authority documents for estates and entities, and workable exceptions are normal private-lending territory. We'd rather solve a title issue with your title officer than decline a fundable deal.",
      },
    ],
    related: [
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/probate-loans", label: "Probate & Estate Loans" },
      { path: "/rates-and-terms", label: "Rates & Terms" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // FIDUCIARIES & TRUSTEES
  // ──────────────────────────────────────────────────────────────
  {
    path: "/professionals/fiduciaries",
    name: "Fiduciaries & Trustees",
    eyebrow: "For Professional Fiduciaries",
    audienceType:
      "Professional fiduciaries, trustees, conservators, and estate administrators",
    seo: {
      title: "For Fiduciaries & Trustees — Estate and Trust Property Funding",
      description:
        "Capital Direct Funding lends to California estates, trusts, and conservatorships — liquidity for administration, distributions, and property preservation without a fire sale. Court-timeline experienced. DRE# 01885595.",
      keywords: [
        "professional fiduciary lender California",
        "trust loan lender",
        "estate loan California",
        "conservatorship property loan",
        "trustee borrow against trust property",
        "probate administration funding",
        "irrevocable trust loan California",
        "estate liquidity loan",
      ],
    },
    h1: "Estate Liquidity",
    h1Highlight: "Without the Fire Sale.",
    heroLead:
      "Professional fiduciaries manage other people's outcomes under court and statutory scrutiny — and real property is where administrations stall. We lend to estates, trusts, and conservatorships directly, on court-compatible timelines, so you can administer from a position of liquidity instead of desperation.",
    scenarios: [
      {
        title: "Administration Liquidity",
        description:
          "Debts, taxes, and expenses due before property can reasonably sell. A loan to the estate or trust, secured by its real property, funds administration without dumping the asset below market.",
        icon: Wallet,
      },
      {
        title: "Equalizing Distributions",
        description:
          "One heir wants the house; the others want their share. Financing secured by the property lets the estate distribute equitably without forcing a sale nobody wants.",
        icon: Scale,
      },
      {
        title: "Pre-Sale Property Preparation",
        description:
          "Deferred maintenance is a discount at sale. Renovation capital — with draws — lets the fiduciary deliver the property at its actual value rather than its neglected one.",
        icon: Hammer,
      },
      {
        title: "Reverse Mortgage & Lien Payoffs",
        description:
          "A reverse mortgage due on death, a foreclosing lender, or property taxes in arrears. We pay off the pressing lien and give the administration room to proceed deliberately.",
        icon: ShieldCheck,
      },
      {
        title: "Conservatorship Property Needs",
        description:
          "Preserving a conservatee's property — repairs, arrears, carrying costs — with court approval in the loop. We're comfortable being part of a supervised process.",
        icon: Landmark,
      },
    ],
    process: [
      {
        title: "Scenario and Authority Review",
        description:
          "We look at the property, the need, and your authority documents — letters, trust instrument, or court order. You'll know quickly whether the structure works.",
      },
      {
        title: "Terms Your Counsel Can Review",
        description:
          "Written terms suitable for counsel and, where required, the court. We've been part of supervised administrations before; documentation rigor is the default, not an upcharge.",
      },
      {
        title: "Funding on the Administration's Calendar",
        description:
          "Fast when the situation demands it — as fast as 7 business days — and patient when court approval sets the pace. The loan serves the administration, not the other way around.",
      },
    ],
    value: [
      {
        title: "Estates and Trusts Are Core Business",
        description:
          "Probate and estate lending is one of our eight standing programs, not an exotic exception. Vesting in estates, trusts, and entities is routine.",
        icon: Scale,
      },
      {
        title: "Court-Timeline Fluent",
        description:
          "Confirmation hearings, notice periods, supervised sales — we've funded around them since 2009. We know what a fiduciary can and cannot promise a lender.",
        icon: Landmark,
      },
      {
        title: "Conservative, Defensible Structures",
        description:
          "First trust deeds at conservative leverage, typically 65% LTV or below on estate property. Terms a fiduciary can defend to beneficiaries and the bench.",
        icon: ShieldCheck,
      },
    ],
    faqs: [
      {
        question: "Can an estate or irrevocable trust actually borrow?",
        answer:
          "Yes. We lend to estates, trusts, and entities regularly — the loan vests in the estate or trust, secured by its real property, supported by your authority documents (letters testamentary or of administration, the trust instrument, or a court order).",
      },
      {
        question: "Do you require court approval?",
        answer:
          "We follow what the administration requires. Where court approval is needed, we structure terms that can be presented to the court and hold while approval is obtained; where the fiduciary has independent authority, we move on your timeline.",
      },
      {
        question: "What are typical terms for estate and trust loans?",
        answer:
          "From 10.99% on our probate and estate program, 6–24 month terms, $100K–$3M, first trust deed position, typically at or below 65% loan-to-value. Interest-only payments keep carrying costs predictable during administration.",
      },
      {
        question: "How fast can you fund when there's a deadline?",
        answer:
          "As fast as 7 business days from a completed application when the authority documents are in order — relevant when a reverse mortgage matures, a tax sale looms, or a trustee sale date is set.",
      },
      {
        question: "Are these consumer loans?",
        answer:
          "No — loans for estate and trust administration are business-purpose, secured by California real estate. Where a scenario would be consumer-purpose, we identify it on the first call and say so.",
      },
    ],
    related: [
      { path: "/probate-loans", label: "Probate & Estate Loans" },
      { path: "/professionals/attorneys", label: "For Attorneys" },
      { path: "/rates-and-terms", label: "Rates & Terms" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // CONTRACTORS & BUILDERS
  // ──────────────────────────────────────────────────────────────
  {
    path: "/professionals/contractors",
    name: "Contractors & Builders",
    eyebrow: "For Contractors & Builders",
    audienceType: "General contractors, builders, and ADU specialists",
    seo: {
      title: "For Contractors & Builders — Construction Capital That Draws On Time",
      description:
        "Capital Direct Funding finances the projects California contractors build — ground-up, ADU, and rehab loans with milestone draws that actually pay on schedule. $50K to $5M. DRE# 01885595.",
      keywords: [
        "contractor referral lender California",
        "construction loan private lender",
        "ADU builder financing partner",
        "milestone draw construction loan",
        "ground up construction lender California",
        "rehab draw lender",
        "builder financing partner",
        "spec construction loan California",
      ],
    },
    h1: "You Build the Project.",
    h1Highlight: "We Make Sure It's Funded.",
    heroLead:
      "Every contractor has lost a signed job to financing — the client's bank said no, or said yes and then drew out payments until the schedule collapsed. Send us the client, and the project gets business-purpose construction capital with milestone draws that pay when the work is done, not when a committee gets around to it.",
    scenarios: [
      {
        title: "The Client Whose Bank Said No",
        description:
          "A signed contract, a capable client, and no construction financing. We underwrite the project and the property — no tax returns — so good projects stop dying in bank committees.",
        icon: Briefcase,
      },
      {
        title: "ADU Projects",
        description:
          "Our dedicated ADU program funds 75–85% of cost at 9.5%–11% with milestone draws — detached units, garage conversions, JADUs — built for the exact projects filling your pipeline.",
        icon: Home,
      },
      {
        title: "Ground-Up Construction",
        description:
          "Lot acquisition plus vertical construction to 65% of completed value, $250K–$5M, 12–24 months. Draw schedules mapped to your actual build sequence.",
        icon: HardHat,
      },
      {
        title: "Rehab & Flip Projects",
        description:
          "Investor clients get up to 75% of ARV with rehab draws — which means your invoices get paid on schedule instead of floating the job on your own credit.",
        icon: Hammer,
      },
      {
        title: "Stalled-Project Rescue",
        description:
          "A project half-built and out of money is a problem for everyone on it. Where the equity and plan support it, we refinance and restart stalled projects with realistic completion budgets.",
        icon: Clock,
      },
    ],
    process: [
      {
        title: "Introduce the Project",
        description:
          "You or your client calls with the property, budget, and plans. Builders' numbers get read by people who fund construction all year — expect real questions, fast.",
      },
      {
        title: "Project-Based Underwriting",
        description:
          "We underwrite completed value, cost, and the builder's track record. Your client gets written terms typically within 24 hours of a complete package.",
      },
      {
        title: "Draws That Keep the Schedule",
        description:
          "Milestone inspections happen in days, not weeks — our office is local and our draw process is built so the trades get paid and the schedule holds.",
      },
    ],
    value: [
      {
        title: "Draws Without the Drama",
        description:
          "Slow draws kill schedules and subcontractor relationships. Our milestone process is the product — inspected fast, funded fast, documented cleanly.",
        icon: TrendingUp,
      },
      {
        title: "We Understand Budgets",
        description:
          "Scope, contingency, and sequencing get read by decision-makers who fund construction constantly — not scored by an out-of-state checklist.",
        icon: HardHat,
      },
      {
        title: "Repeat-Project Relationships",
        description:
          "Contractors who bring us one fundable client tend to bring the next ten. Since 2009: $200M+ across 500+ California loans, a large share of it construction and rehab.",
        icon: Handshake,
      },
    ],
    faqs: [
      {
        question: "How do your construction draws actually work?",
        answer:
          "Milestone-based: work completed, inspected locally, funded — typically within days of the draw request. Draw schedules are set against the real build sequence before closing so there are no surprises mid-project.",
      },
      {
        question: "Can you finance my client's ADU project?",
        answer:
          "Yes — that's a dedicated program: 75–85% loan-to-cost, rates 9.5%–11%, 12–18 month terms, $60K–$300K per unit, milestone draws, for detached ADUs, garage conversions, and JADUs on investment property.",
      },
      {
        question: "Do you fund spec builders?",
        answer:
          "Yes. Ground-up construction runs to 65% of completed value, $250K–$5M, 12–24 months, from 10.99% — lot acquisition and vertical, with builder experience part of the underwrite.",
      },
      {
        question: "Can you take over a stalled project?",
        answer:
          "Often, yes. Where protective equity and a realistic completion budget support it, we refinance stalled projects and fund completion. Bring the current numbers — the honest version — and we'll give you a straight answer.",
      },
      {
        question: "Does my client need tax returns to qualify?",
        answer:
          "No. These are business-purpose loans underwritten on the project and the property. Self-employed clients — which most construction clients are — qualify on the deal, not their returns.",
      },
    ],
    related: [
      { path: "/construction-loans", label: "Ground-Up Construction" },
      { path: "/adu-loans", label: "ADU Construction Loans" },
      { path: "/fix-and-flip-loans", label: "Fix & Flip Loans" },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // FINANCIAL ADVISORS
  // ──────────────────────────────────────────────────────────────
  {
    path: "/professionals/financial-advisors",
    name: "Financial Advisors",
    eyebrow: "For Financial Advisors & Wealth Managers",
    audienceType:
      "Financial advisors, wealth managers, and family offices",
    seo: {
      title: "For Financial Advisors — Trust Deed Income & Client Liquidity",
      description:
        "Capital Direct Funding works with California advisors two ways: first trust deed investments yielding 8.95%–10.95% for accredited clients, and business-purpose real estate liquidity that avoids portfolio liquidation. DRE# 01885595.",
      keywords: [
        "trust deed investments financial advisor",
        "first trust deed investing California",
        "alternative income accredited investor",
        "SDIRA trust deed investment",
        "real estate secured income clients",
        "private lending investment advisor",
        "client liquidity real estate loan",
        "family office trust deed",
      ],
    },
    h1: "Two Conversations",
    h1Highlight: "Worth Having With Us.",
    heroLead:
      "Advisors call us for two different clients. The first holds real estate and needs business-purpose liquidity without liquidating a portfolio at the wrong time. The second is accredited, wants secured monthly income, and is tired of choosing between bond yields and equity risk. We have a seventeen-year track record with both.",
    scenarios: [
      {
        title: "First Trust Deed Income",
        description:
          "Accredited clients invest in whole-note, first trust deed positions secured by California real estate — 8.95%–10.95% yields, paid as monthly interest, at conservative 60–75% LTV.",
        icon: PiggyBank,
      },
      {
        title: "Self-Directed Retirement Accounts",
        description:
          "Trust deed investments work inside SDIRAs and Solo 401(k)s — tax-advantaged monthly income secured by recorded first liens, held through the client's custodian.",
        icon: ShieldCheck,
      },
      {
        title: "No Blind Pools, Ever",
        description:
          "Clients select each loan individually with the full package — property, independent appraisal, borrower profile, LTV, rate, and exit. The deed records in their name, their trust, or their custodian.",
        icon: FileCheck,
      },
      {
        title: "Liquidity Without Liquidation",
        description:
          "A client with investment real estate and a business-purpose capital need doesn't have to sell securities in a down month. Business-purpose cash-out against their property, closing in days.",
        icon: Wallet,
      },
      {
        title: "Real Estate Opportunities on a Clock",
        description:
          "When a client's acquisition can't wait for bank underwriting, business-purpose bridge financing from $50K to $5M keeps the opportunity — and your planning work — intact.",
        icon: Clock,
      },
    ],
    process: [
      {
        title: "Introduction Call",
        description:
          "You and your client speak directly with Francisco or Frank — the principals — about goals, risk tolerance, and whether trust deeds or financing actually fit. No pitch deck, no pressure.",
      },
      {
        title: "Full Transparency on Every Deal",
        description:
          "For investors: every loan presented with property, appraisal, LTV, rate, term, and exit before any commitment. For borrowers: written terms typically within 24 hours.",
      },
      {
        title: "Funding Through Licensed Escrow",
        description:
          "Capital moves through licensed escrow with title insurance on every transaction; first trust deeds record at the county in the client's chosen vesting. CDF services the loan — collection, reporting, payoff.",
      },
    ],
    value: [
      {
        title: "No Fund Fees, No Lock-Ups",
        description:
          "No management fees, no performance fees, no lock-up periods, no blind pools. Clients hold whole notes directly — CDF earns on originating and servicing, not on your client's yield.",
        icon: PiggyBank,
      },
      {
        title: "Conservative By Structure",
        description:
          "First lien position only, 60–75% LTV, California real estate the team underwrites in-house. The same family has run this discipline since 2009 — $200M+ across 500+ loans.",
        icon: ShieldCheck,
      },
      {
        title: "Principal Access",
        description:
          "Your clients deal with the principals of a family-run firm, not a rotating coverage desk. When you refer a client, your reputation is handled accordingly.",
        icon: Handshake,
      },
    ],
    faqs: [
      {
        question: "What yields do trust deed investments pay?",
        answer:
          "8.95%–10.95%, paid as monthly interest, on whole-note first trust deed positions secured by California real estate at 60–75% loan-to-value. Individual investments typically start at $100,000.",
      },
      {
        question: "Is this a fund or pooled investment?",
        answer:
          "No. Clients invest in individual whole notes — one investor, one loan, one recorded first trust deed in the client's name, trust, entity, or retirement-account custodian. Each deal is selected individually with full documentation.",
      },
      {
        question: "Can clients invest through an SDIRA or Solo 401(k)?",
        answer:
          "Yes — self-directed IRAs, Solo 401(k)s, trusts, and entities all work. The deed records in the custodian's or entity's vesting and monthly interest flows to the account.",
      },
      {
        question: "What happens if a borrower stops paying?",
        answer:
          "The investment is secured by a recorded first trust deed at conservative leverage — the protective equity exists for exactly this case. CDF's servicing arm manages collection and, where necessary, the remedies available to a first-position lienholder in California.",
      },
      {
        question: "What due diligence can my client see before investing?",
        answer:
          "The full loan package: property address and photos, independent appraisal, borrower profile, loan-to-value, rate, term, and exit strategy — before committing a dollar. Advisors are welcome in every conversation.",
      },
    ],
    related: [
      { path: "/investors", label: "Trust Deed Investing" },
      { path: "/professionals/cpas", label: "For CPAs & Tax Advisors" },
      { path: "/rates-and-terms", label: "Rates & Terms" },
    ],
  },
];

/**
 * FAQ + schema data for the four ORIGINAL bespoke professionals pages
 * (attorneys, CPAs, mortgage, real-estate). Their page components predate
 * the PartnerPage template; this record lets their layouts emit
 * PartnerPageSchema and their pages render the matching visible FAQ block
 * without rebuilding them. Same rule as everywhere: schema questions and
 * visible questions must be identical.
 */
export const BESPOKE_PARTNER_FAQS: Record<
  string,
  {
    name: string;
    audienceType: string;
    faqs: { question: string; answer: string }[];
    related: { path: string; label: string }[];
  }
> = {
  "/professionals/attorneys": {
    name: "Attorney referral partnership",
    audienceType: "Attorneys — probate, estate, bankruptcy, and family law",
    faqs: [
      {
        question: "How fast can you fund a probate or estate transaction?",
        answer:
          "As fast as 7 business days from a completed application when authority documents are in order — and where a court confirmation calendar sets the pace, terms hold while the process runs. Probate and estate lending is one of our eight standing programs, from 10.99%, $100K–$3M.",
      },
      {
        question: "Can a client borrow soon after bankruptcy?",
        answer:
          "Yes. Our foreclosure and bankruptcy recovery program has no credit minimums — the property, protective equity, and exit strategy carry the file. Terms run from 11.99%, $100K–$2M, at up to 60% loan-to-value.",
      },
      {
        question: "How do divorce buyout loans work?",
        answer:
          "One spouse keeps the property by borrowing against it to fund the other's share — a business-purpose loan secured by the real estate, structured to close on the settlement's timeline rather than a bank's.",
      },
      {
        question: "Will you deal directly with me as counsel?",
        answer:
          "Yes — most attorney-referred files run through counsel's office, and we're used to being part of a supervised or negotiated process. Your client relationship stays yours; we never market to referred clients.",
      },
      {
        question: "What should I send to get a same-day read on a scenario?",
        answer:
          "The property address, the situation in three sentences, and the timeline. Call (626) 796-1680 — the principals review attorney referrals personally and you'll have a real answer, not a portal login.",
      },
    ],
    related: [
      { path: "/probate-loans", label: "Probate & Estate Loans" },
      { path: "/foreclosure-bankruptcy-loans", label: "Foreclosure & BK Recovery" },
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/rates-and-terms", label: "Rates & Terms" },
    ],
  },
  "/professionals/cpas": {
    name: "CPA referral partnership",
    audienceType: "CPAs and tax advisors",
    faqs: [
      {
        question: "How are trust deed investment returns reported for taxes?",
        answer:
          "Investors receive monthly interest on whole-note first trust deeds and year-end tax documentation from our servicing operation. Interest is ordinary income; held inside an SDIRA or Solo 401(k), it accrues to the account under the plan's tax treatment.",
      },
      {
        question: "Can my client's self-directed IRA invest in trust deeds?",
        answer:
          "Yes — SDIRAs, Solo 401(k)s, trusts, and entities all work. The first trust deed records in the custodian's vesting and monthly interest flows to the account. Yields run 8.95%–10.95% at 60–75% loan-to-value.",
      },
      {
        question: "My client's returns are optimized for taxes — can they still get a loan?",
        answer:
          "That's our self-employed program in one sentence: no tax returns required, from 9.99%, up to 70% loan-to-value. We underwrite the property and the plan, so tax-efficient returns stop being a financing obstacle.",
      },
      {
        question: "Do these loans work for 1031 exchange timelines?",
        answer:
          "Yes — business-purpose bridge financing closes in as few as 7 business days, which is what a 45-day identification or 180-day closing window actually requires.",
      },
      {
        question: "Is the trust deed investment a pooled fund?",
        answer:
          "No. One investor, one loan, one recorded first trust deed in the client's chosen vesting — selected individually with the full package (appraisal, LTV, rate, term, exit) before any commitment. No management fees, no lock-ups.",
      },
    ],
    related: [
      { path: "/investors", label: "Trust Deed Investing" },
      { path: "/self-employed-loans", label: "Self-Employed Solutions" },
      { path: "/cash-out-refinance", label: "Cash-Out Refinance" },
      { path: "/rates-and-terms", label: "Rates & Terms" },
    ],
  },
  "/professionals/mortgage": {
    name: "Mortgage professional referral partnership",
    audienceType: "Mortgage brokers and loan officers",
    faqs: [
      {
        question: "What files should I send you?",
        answer:
          "The ones your investors won't take: business-purpose scenarios needing speed, self-employed borrowers without qualifying returns, credit events, unusual collateral, or court timelines. If it's fundable on the asset, we'll tell you same-day.",
      },
      {
        question: "Do you protect my client relationship?",
        answer:
          "Completely. Your client is your client — we never solicit referred borrowers, and when their next conventional need arises, they're yours. Referral partnerships only work when that's absolute.",
      },
      {
        question: "What are your terms?",
        answer:
          "Business-purpose loans from $50,000 to $5,000,000, first trust deed, typically at or below 70% loan-to-value, from 9.50% depending on program — full program-by-program numbers are published on our rates and terms page.",
      },
      {
        question: "How fast do you actually close?",
        answer:
          "As fast as 7 business days from a completed application. Underwriting, docs, and funding run in one office, which is why quoted terms don't get re-traded the week of closing.",
      },
      {
        question: "Do you handle owner-occupied or consumer files?",
        answer:
          "No — we're business-purpose only: investment property, commercial, and business-purpose transactions. Consumer files stay with you; that boundary is part of why the referral lane is clean.",
      },
    ],
    related: [
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/self-employed-loans", label: "Self-Employed Solutions" },
      { path: "/fix-and-flip-loans", label: "Fix & Flip Loans" },
      { path: "/rates-and-terms", label: "Rates & Terms" },
    ],
  },
  "/professionals/real-estate": {
    name: "Real estate agent referral partnership",
    audienceType: "Real estate agents and brokers",
    faqs: [
      {
        question: "My buyer's financing just fell through — can you save the deal?",
        answer:
          "Often, yes. For business-purpose purchases we can underwrite, doc, and fund inside the existing escrow in as few as 7 business days — frequently without moving the closing date. Call with the scenario before anyone cancels.",
      },
      {
        question: "Can my investor clients get proof of funds quickly?",
        answer:
          "Qualified investors with a live deal get fast written terms — which is what makes an offer credible on a competitive listing. One conversation about the property and the plan is where it starts.",
      },
      {
        question: "Do you fund the probate and estate listings nobody can finance?",
        answer:
          "Yes — court confirmation timelines, administrator sales, and as-is condition are our probate program's normal territory, from 10.99%, closing on the court's calendar.",
      },
      {
        question: "Is my commission protected?",
        answer:
          "Your commission is escrow's business, not ours — our loan closes through the same escrow that pays you. We never work around the agent, and referred clients remain your clients.",
      },
      {
        question: "What can't you fund?",
        answer:
          "Consumer-purpose loans — a buyer financing their own primary residence needs a consumer lender, and we say so immediately. Investment purchases, flips, bridges, and business-purpose scenarios are our lane.",
      },
    ],
    related: [
      { path: "/fix-and-flip-loans", label: "Fix & Flip Loans" },
      { path: "/bridge-loans", label: "Bridge Loans" },
      { path: "/probate-loans", label: "Probate & Estate Loans" },
      { path: "/rates-and-terms", label: "Rates & Terms" },
    ],
  },
};

export function getPartnerPage(path: string): PartnerPageData | undefined {
  return PARTNER_PAGES.find((p) => p.path === path);
}

export function buildPartnerPageMetadata(path: string): Metadata {
  const page = getPartnerPage(path);
  if (!page) return {};
  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
    },
    alternates: { canonical: `${SITE_URL}${path}` },
  };
}
