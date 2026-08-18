import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";
import {
  Hammer,
  Building2,
  Scale,
  Briefcase,
  Home,
  Landmark,
  Clock,
  TrendingUp,
  Warehouse,
  Sun,
  MapPin,
  HardHat,
} from "lucide-react";

/**
 * Content layer for the county location pages ("hard money lender ___").
 *
 * HARD RULE: no local market statistics may be invented here. Local content
 * is qualitative (property types, court processes, neighborhood names) or
 * sourced from verified CDF facts (HQ in West Covina, service concentration
 * per llms-full.txt: LA, Orange, San Bernardino, Riverside, San Diego).
 */

export type LocationScenario = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type LocationFaq = {
  question: string;
  answer: string;
};

export type LocationPageData = {
  /** route path, e.g. "/hard-money-lender-los-angeles" */
  path: string;
  /** display name, e.g. "Los Angeles" */
  name: string;
  /** full county name — drives schema areaServed, so keep it a real county */
  county: string;
  /**
   * Optional heading label for city-level pages. A city page inside a county
   * we already cover reads wrong under the county's own name ("Cities We Serve
   * in Los Angeles County" on the West Covina page), and repeating the county
   * headings verbatim invites the two pages to compete for the same query.
   * Falls back to `county` when unset, so the county pages are unaffected.
   */
  areaLabel?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  h1: string;
  h1Highlight: string;
  heroLead: string;
  heroSub: string;
  /** narrative intro — 2 paragraphs on why CDF knows this market */
  narrative: [string, string];
  scenarios: LocationScenario[];
  cities: string[];
  faqs: LocationFaq[];
};

export const LOCATION_PAGES: LocationPageData[] = [
  // ──────────────────────────────────────────────────────────────
  // WEST COVINA — city-level page. This is the one market where the
  // "we are physically here" claim is literally true and unfakeable:
  // competitors ranking for these queries are national shops with a
  // service-area page. Keep this page about the San Gabriel Valley
  // specifically so it does not restate (and compete with) the LA
  // County page, which already lists West Covina as a served city.
  // ──────────────────────────────────────────────────────────────
  {
    path: "/hard-money-lender-west-covina",
    name: "West Covina",
    county: "Los Angeles County",
    areaLabel: "the San Gabriel Valley",
    seo: {
      title:
        "Hard Money Lender West Covina — Local Direct Private Money Lender",
      description:
        "Capital Direct Funding is headquartered in West Covina at 100 N Citrus St, Suite 530. Direct private money loans across the San Gabriel Valley — $50K to $5M, closings in as few as 7 days. DRE# 01885595.",
      keywords: [
        "hard money lender West Covina",
        "private money lender West Covina",
        "hard money loans West Covina CA",
        "West Covina bridge loan lender",
        "fix and flip lender West Covina",
        "hard money lender San Gabriel Valley",
        "private lender Covina",
        "ADU loans West Covina",
        "probate loans West Covina",
        "hard money lender near me West Covina",
      ],
    },
    h1: "We Don't Just Lend in West Covina.",
    h1Highlight: "We're Headquartered Here.",
    heroLead:
      "Capital Direct Funding's office is at 100 N Citrus St, Suite 530 — not a service-area map pin, not a national call center with a local phone number. Frank Williams founded this company here in 2009, and every loan we've funded since has been underwritten from this building.",
    heroSub:
      "Fix & flip, bridge, construction, ADU, probate, foreclosure recovery, and cash-out loans from $50K to $5M across the San Gabriel Valley — closing in as few as 7 days.",
    narrative: [
      "Most of the lenders competing for West Covina searches are headquartered somewhere else — Burbank, San Diego, out of state — running a service-area page for a market they've never driven. We're on Citrus Street. When a borrower wants to walk a deal in, they walk in. When a property needs eyes on it, we're minutes from the 10, the 57, the 60, and the 210 rather than a day's coordination away.",
      "That proximity matters most on the deals that don't fit a template. West Covina and its neighbors are built largely on postwar tract housing on deep lots — the exact stock that rewards a well-run rehab or a backyard ADU, and the exact stock a conventional construction desk struggles to underwrite. Add long-tenure ownership that turns into estate and probate transactions, and a dense base of self-employed owners whose tax returns never tell the real story, and you get a market where asset-based lending isn't a fallback. It's the right tool. We've deployed over $200M across 500+ California transactions doing exactly this.",
    ],
    scenarios: [
      {
        title: "Postwar Tract-Home Rehabs",
        description:
          "The SGV's 1950s and '60s housing stock is the region's flip inventory. We fund up to 75% ARV with rehab draws — and we can look at the property the same week rather than routing photos to an out-of-area committee.",
        icon: Hammer,
      },
      {
        title: "Backyard ADUs on Deep Lots",
        description:
          "SGV lots are generous by LA County standards, which makes them prime ADU candidates. Our dedicated program runs 75–85% LTC with milestone draws for detached units, garage conversions, and JADUs.",
        icon: Home,
      },
      {
        title: "Self-Employed & Small-Business Owners",
        description:
          "The Valley runs on owner-operated businesses whose returns are written to minimize tax, not to qualify for a mortgage. No tax returns required — the property qualifies, not the paperwork.",
        icon: Briefcase,
      },
      {
        title: "Probate & Estate Property",
        description:
          "Decades of stable ownership means a steady flow of estate transactions. We've funded these for years — court confirmation timelines, administrator authority, and attorney coordination included.",
        icon: Scale,
      },
      {
        title: "Foreclosure Intervention",
        description:
          "When a trustee sale date is set, the calendar is the whole problem. We move on foreclosure timelines — paying off the foreclosing lender and buying owners room to sell or refinance on their terms.",
        icon: Clock,
      },
      {
        title: "Small Multifamily & Mixed-Use",
        description:
          "Duplexes, fourplexes, and the small commercial and mixed-use buildings along the Valley's older corridors — projects that pencil locally but confuse lenders underwriting from a spreadsheet.",
        icon: Building2,
      },
    ],
    cities: [
      "West Covina",
      "Covina",
      "Baldwin Park",
      "La Puente",
      "Walnut",
      "Glendora",
      "Azusa",
      "San Dimas",
      "Diamond Bar",
      "Hacienda Heights",
      "Rowland Heights",
      "El Monte",
      "Pomona",
      "Duarte",
      "Monrovia",
      "Arcadia",
      "Temple City",
      "Claremont",
    ],
    faqs: [
      {
        question: "Do you have an actual office in West Covina?",
        answer:
          "Yes. Capital Direct Funding is headquartered at 100 N Citrus St, Suite 530, West Covina, CA 91791. It is our only office and has been our base since Frank Williams founded the company in 2009 — we are not a national lender running a West Covina service-area page.",
      },
      {
        question: "How fast can you close a hard money loan in West Covina?",
        answer:
          "In as few as 7 business days from a completed application. Because underwriting, doc prep, and funding all happen in this office, there is no out-of-state committee that needs a local market explained to it first.",
      },
      {
        question:
          "Do you lend on owner-occupied homes in West Covina?",
        answer:
          "Our loans are business-purpose loans secured by California real estate — investment property, commercial buildings, and business-purpose transactions. Call (626) 796-1680 and we'll tell you within one conversation whether your scenario fits.",
      },
      {
        question:
          "What size loans do you write in the San Gabriel Valley?",
        answer:
          "$50,000 to $5,000,000, secured by a first trust deed, typically at or below 70% loan-to-value. All eight programs are available across the Valley: fix & flip, bridge, ground-up construction, cash-out refinance, probate & estate, foreclosure & bankruptcy recovery, self-employed solutions, and ADU construction.",
      },
      {
        question:
          "Do you lend outside West Covina in the surrounding SGV cities?",
        answer:
          "Yes — Covina, Baldwin Park, La Puente, Walnut, Glendora, Azusa, San Dimas, Diamond Bar, Hacienda Heights, Rowland Heights, El Monte, Pomona and the rest of the San Gabriel Valley, plus all of Los Angeles County and California statewide.",
      },
      {
        question: "Can I come into your office to discuss a deal?",
        answer:
          "Yes. We're at 100 N Citrus St, Suite 530, open Monday through Friday, 9:00 AM to 6:00 PM. Call (626) 796-1680 first so the right person is there — for most local borrowers a single walk-in conversation replaces a week of email.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // LOS ANGELES
  // ──────────────────────────────────────────────────────────────
  {
    path: "/hard-money-lender-los-angeles",
    name: "Los Angeles",
    county: "Los Angeles County",
    seo: {
      title:
        "Hard Money Lender Los Angeles — Direct Private Money, 7-Day Closings",
      description:
        "Direct hard money lender headquartered in Los Angeles County. Fix & flip, bridge, construction, private money ADU loans, probate, and cash-out — $50K to $5M, closings in as few as 7 days. DRE# 01885595.",
      keywords: [
        "hard money lender Los Angeles",
        "private money lender Los Angeles",
        "hard money loans LA",
        "Los Angeles bridge loan lender",
        "fix and flip lender Los Angeles",
        "private lender Los Angeles County",
        "hard money lender San Fernando Valley",
        "probate loans Los Angeles",
        "private money ADU loans Los Angeles",
      ],
    },
    h1: "Los Angeles Is Our Backyard.",
    h1Highlight: "Literally.",
    heroLead:
      "Capital Direct Funding is headquartered in West Covina — we've been lending our own capital across Los Angeles County since 2009. When you call, you're talking to decision-makers who drive these streets, not a national call center reading a script.",
    heroSub:
      "Fix & flip, bridge, construction, private money ADU loans, probate, foreclosure recovery, and cash-out from $50K to $5M, closing in as few as 7 days.",
    narrative: [
      "Los Angeles rewards investors who move fast and punishes everyone else. Whether it's a mid-century flip in Highland Park, a probate property working through the Stanley Mosk Courthouse, a teardown-rebuild in the Valley, or an ADU project unlocking rental income in a backyard — the winning bid is almost always the one that can actually close.",
      "That's the entire reason CDF exists. We underwrite LA deals from LA, we know the difference between a Watts comp and a West Adams comp, and we've funded over $200M across 500+ California transactions. When your deal needs a lender who understands this county's speed, courts, and construction reality — that's us.",
    ],
    scenarios: [
      {
        title: "Flips Across Every Submarket",
        description:
          "From entry-level rehabs in Palmdale to seven-figure projects on the Westside, we fund up to 75% ARV with rehab draws — and we know LA comps block by block.",
        icon: Hammer,
      },
      {
        title: "Probate & Estate Properties",
        description:
          "LA County runs one of the busiest probate systems in the country. We've funded estate transactions for years — court confirmation timelines, administrator authority, attorney coordination and all.",
        icon: Scale,
      },
      {
        title: "The ADU Boom",
        description:
          "LA leads California in ADU construction. Our dedicated private money ADU loan program funds 75–85% LTC with milestone draws for detached units, garage conversions, and JADUs — see /adu-loans.",
        icon: Home,
      },
      {
        title: "Entertainment & Gig Economy Borrowers",
        description:
          "Producers, performers, freelancers, business owners — LA runs on 1099 income that banks can't underwrite. No tax returns required; the property qualifies, not the pay stub.",
        icon: Briefcase,
      },
      {
        title: "Foreclosure Intervention",
        description:
          "When a trustee sale date is looming anywhere in LA County, we move on foreclosure timelines — paying off the foreclosing lender and giving owners room to recover.",
        icon: Clock,
      },
      {
        title: "Small Multifamily & Infill",
        description:
          "Duplexes to small apartment buildings, infill lots, teardown-rebuilds — the projects that pencil in LA but confuse conventional construction desks.",
        icon: Building2,
      },
    ],
    cities: [
      "Los Angeles",
      "Long Beach",
      "Glendale",
      "Pasadena",
      "West Covina",
      "Santa Clarita",
      "Pomona",
      "Torrance",
      "Burbank",
      "Downey",
      "El Monte",
      "Inglewood",
      "Whittier",
      "Lancaster",
      "Palmdale",
      "Covina",
    ],
    faqs: [
      {
        question: "Are you actually located in Los Angeles County?",
        answer:
          "Yes — our office is at 100 N Citrus St, Suite 530, West Covina, CA 91791. We've been headquartered in LA County since Frank Williams founded the company in 2009.",
      },
      {
        question: "How fast can you close a hard money loan in Los Angeles?",
        answer:
          "In as few as 7 business days from completed application. Local underwriting means no waiting on an out-of-state committee to understand an LA deal.",
      },
      {
        question: "What loan types do you offer in Los Angeles?",
        answer:
          "All eight programs: fix & flip, bridge, ground-up construction, cash-out refinance, probate & estate, foreclosure & bankruptcy recovery, self-employed solutions, and private money ADU construction — from $50K to $5M.",
      },
      {
        question: "Do you offer private money ADU loans in Los Angeles?",
        answer:
          "Yes. Hard-money, business-purpose ADU construction loans at 75–85% loan-to-cost, 9.5–11%, $60,000–$300,000 per unit, 12–18 months, milestone draws. Detached, garage conversion, attached, and JADU. Full terms at /adu-loans.",
      },
      {
        question: "Do you lend in every part of LA County?",
        answer:
          "Yes — from the Antelope Valley to the South Bay, San Fernando Valley to the San Gabriel Valley. If it's LA County real estate with a sound deal behind it, we'll look at it.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // ORANGE COUNTY
  // ──────────────────────────────────────────────────────────────
  {
    path: "/hard-money-lender-orange-county",
    name: "Orange County",
    county: "Orange County",
    seo: {
      title:
        "Hard Money Lender Orange County — Private Money Loans, 7-Day Closings",
      description:
        "Direct private money lender serving all of Orange County. Fix & flip, bridge, ADU, construction, and cash-out loans from Anaheim to Newport Beach — $50K to $5M, closing in as few as 7 days.",
      keywords: [
        "hard money lender Orange County",
        "private money lender Orange County",
        "hard money loans Irvine",
        "fix and flip lender Anaheim",
        "bridge loan Orange County",
        "private lender Newport Beach",
        "hard money Santa Ana",
        "OC real estate investor loans",
      ],
    },
    h1: "Orange County Deals Move Fast.",
    h1Highlight: "We Move Faster.",
    heroLead:
      "High values, tight inventory, and buyers with real money — Orange County is one of the most competitive real estate markets in America. Winning here means closing power, and that's exactly what direct private capital delivers.",
    heroSub:
      "From flips in Anaheim's older tracts to bridge loans on coastal assets, we fund OC deals from $50K to $5M in as few as 7 days.",
    narrative: [
      "Orange County's housing stock tells an investor story in two acts: postwar tract neighborhoods in Anaheim, Garden Grove, and Santa Ana that reward smart renovation, and coastal communities where values support substantial bridge and construction lending. We've financed both since 2009 — from our base just up the 57 in West Covina.",
      "OC is also entrepreneur country. Business owners, contractors, and self-employed professionals dominate this county — exactly the borrowers whose optimized tax returns make banks flinch. Our asset-based underwriting was built for them: no tax returns, bank statement programs, and answers in 24 hours.",
    ],
    scenarios: [
      {
        title: "Tract Home Flips",
        description:
          "The older neighborhoods of Anaheim, Santa Ana, Fullerton, and Garden Grove are renovation goldmines. Up to 75% ARV with rehab draws keeps your capital ready for the next one.",
        icon: Hammer,
      },
      {
        title: "Coastal Bridge Loans",
        description:
          "Newport Beach, Huntington Beach, Laguna — high-value properties where a bridge loan secures the next acquisition before the current asset sells. Up to $5M, cross-collateralization available.",
        icon: TrendingUp,
      },
      {
        title: "Business-Owner Financing",
        description:
          "OC runs on small business. When your income is real but your tax return is optimized, we underwrite the property instead — no tax returns required.",
        icon: Briefcase,
      },
      {
        title: "ADU & Backyard Development",
        description:
          "Orange County homeowners are adding units for rental income and family housing. Our ADU program funds 75–85% of cost with milestone-based draws.",
        icon: Home,
      },
      {
        title: "1031 Exchange Deadlines",
        description:
          "OC investors trading up face brutal exchange timelines in a market this competitive. We close inside the window and keep the tax deferral intact.",
        icon: Clock,
      },
      {
        title: "Estate & Trust Properties",
        description:
          "Long-held OC family properties moving through probate or trust administration — we fund buyouts, settlements, and pre-sale preparation with court-aware structuring.",
        icon: Scale,
      },
    ],
    cities: [
      "Anaheim",
      "Santa Ana",
      "Irvine",
      "Huntington Beach",
      "Garden Grove",
      "Orange",
      "Fullerton",
      "Costa Mesa",
      "Mission Viejo",
      "Newport Beach",
      "Buena Park",
      "Lake Forest",
      "Tustin",
      "Yorba Linda",
      "San Clemente",
      "Laguna Niguel",
    ],
    faqs: [
      {
        question: "Do you lend throughout Orange County?",
        answer:
          "Yes — every city from La Habra to San Clemente, coastal and inland alike. Orange County is one of our five core counties and minutes from our LA County headquarters.",
      },
      {
        question: "What's the maximum loan amount in Orange County?",
        answer:
          "Up to $5M on bridge and construction loans — a range that matters in OC, where coastal values routinely exceed what smaller private lenders can fund.",
      },
      {
        question: "Can self-employed OC business owners qualify?",
        answer:
          "That's one of our core specializations. No tax returns required — we underwrite the property and the deal, with bank statement programs available when cash-flow documentation helps.",
      },
      {
        question: "How fast can you fund an Orange County deal?",
        answer:
          "As few as 7 business days from completed application, with preliminary terms within 24 hours of your first call to (626) 796-1680.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // SAN DIEGO
  // ──────────────────────────────────────────────────────────────
  {
    path: "/hard-money-lender-san-diego",
    name: "San Diego",
    county: "San Diego County",
    seo: {
      title:
        "Hard Money Lender San Diego — Direct Private Money, 7-Day Closings",
      description:
        "Direct private money lender serving San Diego County. Fix & flip, bridge, construction, ADU, and cash-out financing from Chula Vista to Oceanside — $50K to $5M, closing in as few as 7 days.",
      keywords: [
        "hard money lender San Diego",
        "private money lender San Diego",
        "San Diego fix and flip loans",
        "bridge loan San Diego",
        "private lender Chula Vista",
        "hard money North County San Diego",
        "San Diego investor loans",
        "ADU financing San Diego",
      ],
    },
    h1: "San Diego Real Estate Rewards Speed.",
    h1Highlight: "We Deliver It.",
    heroLead:
      "From North County flips to ADU projects in the city's pro-density neighborhoods, San Diego investors compete against deep-pocketed buyers in a supply-starved market. Direct private capital is how you win anyway.",
    heroSub:
      "All eight CDF loan programs — flip, bridge, construction, probate, cash-out, and more — available across San Diego County, $50K to $5M.",
    narrative: [
      "San Diego combines coastal-city values with a genuinely diverse economy — military, biotech, tourism, and a deep small-business base. For investors that means steady demand across every product type: renovation projects in established neighborhoods like El Cajon and Vista, ADU additions in the city's transit corridors, and bridge scenarios on higher-value coastal assets.",
      "We've lent across San Diego County since 2009 as one of our five core Southern California counties. Same direct model as everywhere we lend: our own capital, in-house underwriting, preliminary terms in 24 hours, and closings in as few as 7 days.",
    ],
    scenarios: [
      {
        title: "North County & East County Flips",
        description:
          "Oceanside, Escondido, Vista, El Cajon — the county's renovation belt. Up to 75% ARV with structured rehab draws for cosmetic refreshes through full guts.",
        icon: Hammer,
      },
      {
        title: "ADU-Friendly City Policies",
        description:
          "San Diego has some of California's most ADU-friendly rules, and homeowners are building. Our ADU program funds 75–85% of cost, from garage conversions to detached new units.",
        icon: Home,
      },
      {
        title: "Military & Veteran Investors",
        description:
          "San Diego's military community invests heavily in local real estate. When VA or conventional routes don't fit an investment deal's timeline, our asset-based lending does.",
        icon: Landmark,
      },
      {
        title: "Coastal Bridge Scenarios",
        description:
          "La Jolla to Carlsbad — when the right property surfaces in a coastal market, a 7-day close beats every financed buyer in line. Up to $5M.",
        icon: TrendingUp,
      },
      {
        title: "Self-Employed & Biotech Contractors",
        description:
          "Consultants, founders, and contract professionals with complex income — we underwrite the asset, not the W-2 you don't have.",
        icon: Briefcase,
      },
      {
        title: "Probate & Trust Sales",
        description:
          "Long-held San Diego family properties in probate or trust administration. Court-experienced structuring for buyouts, settlements, and confirmations.",
        icon: Scale,
      },
    ],
    cities: [
      "San Diego",
      "Chula Vista",
      "Oceanside",
      "Escondido",
      "Carlsbad",
      "El Cajon",
      "Vista",
      "San Marcos",
      "Encinitas",
      "National City",
      "La Mesa",
      "Santee",
      "Poway",
      "Imperial Beach",
    ],
    faqs: [
      {
        question: "Do you lend in San Diego County?",
        answer:
          "Yes — San Diego is one of our five core Southern California counties, from the South Bay to Fallbrook, coast to East County.",
      },
      {
        question: "Can you fund ADU construction in San Diego?",
        answer:
          "Yes. Our dedicated ADU program funds 75–85% of construction cost with milestone-based draws — detached units, garage conversions, attached ADUs, and JADUs.",
      },
      {
        question: "How do San Diego investors typically use your loans?",
        answer:
          "Flips in North and East County, ADU additions in the city, bridge loans on competitive purchases, and cash-out refinancing to fund the next acquisition. All business-purpose, secured by California real estate.",
      },
      {
        question: "How quickly can a San Diego loan close?",
        answer:
          "As few as 7 business days from completed application. Call (626) 796-1680 and you'll have preliminary terms within 24 hours.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // RIVERSIDE
  // ──────────────────────────────────────────────────────────────
  {
    path: "/hard-money-lender-riverside",
    name: "Riverside",
    county: "Riverside County",
    seo: {
      title:
        "Hard Money Lender Riverside — Inland Empire Private Money Loans",
      description:
        "Direct private money lender for Riverside County and the Inland Empire. Fix & flip, construction, bridge, and cash-out loans from Corona to Coachella Valley — $50K to $5M, 7-day closings.",
      keywords: [
        "hard money lender Riverside",
        "private money lender Inland Empire",
        "Riverside County fix and flip loans",
        "hard money Corona CA",
        "construction loans Temecula",
        "private lender Moreno Valley",
        "Coachella Valley hard money",
        "Inland Empire investor loans",
      ],
    },
    h1: "The Inland Empire Is Growing.",
    h1Highlight: "Fund the Growth.",
    heroLead:
      "Riverside County is where Southern California actually builds. Families and businesses priced out of the coastal counties keep moving inland — and the investors who renovate, build, and hold here are capturing that momentum.",
    heroSub:
      "Fix & flip, ground-up construction, bridge, and cash-out lending across the Inland Empire and Coachella Valley, $50K to $5M.",
    narrative: [
      "From Corona and Riverside proper down the 215 to Murrieta and Temecula, and east to the Coachella Valley — Riverside County offers what the coast can't: room to build and price points where renovation math still works. That makes it flip country, construction country, and increasingly build-to-rent country.",
      "We've financed Inland Empire deals since 2009 as one of our five core counties. Ground-up construction is a particular strength here — one facility covering lot acquisition and vertical construction, with draws structured around your build plan instead of a bank committee's calendar.",
    ],
    scenarios: [
      {
        title: "Affordable-Entry Flips",
        description:
          "Moreno Valley, Hemet, Perris, San Jacinto — price points where renovation margins still pencil. Up to 75% ARV keeps your cash free for the next project.",
        icon: Hammer,
      },
      {
        title: "Ground-Up & Spec Construction",
        description:
          "The IE is one of the few Southern California regions with real land. We fund lot acquisition plus construction in one facility — spec homes, small multifamily, build-to-rent.",
        icon: HardHat,
      },
      {
        title: "Coachella Valley Projects",
        description:
          "Palm Springs to Indio — vacation-market renovations, seasonal-rental repositioning, and land development in one of California's distinctive submarkets.",
        icon: Sun,
      },
      {
        title: "Southwest County Growth",
        description:
          "Murrieta, Temecula, Menifee — the county's fastest-growing corridor. Bridge and construction capital for investors building where the demand is moving.",
        icon: TrendingUp,
      },
      {
        title: "Cash-Out for Expansion",
        description:
          "IE investors sitting on appreciated equity use business-purpose cash-out to fund the next acquisition — no seasoning requirements, today's value.",
        icon: Building2,
      },
      {
        title: "Contractor & Trades Borrowers",
        description:
          "The Inland Empire runs on construction and logistics trades — seasonal, project-based income that banks can't read. We underwrite the asset instead.",
        icon: Briefcase,
      },
    ],
    cities: [
      "Riverside",
      "Moreno Valley",
      "Corona",
      "Murrieta",
      "Temecula",
      "Menifee",
      "Hemet",
      "Perris",
      "Indio",
      "Palm Desert",
      "Palm Springs",
      "Lake Elsinore",
      "Eastvale",
      "Jurupa Valley",
      "Cathedral City",
    ],
    faqs: [
      {
        question: "Do you cover all of Riverside County?",
        answer:
          "Yes — from the Corona/Eastvale corridor through the 215 growth cities to the entire Coachella Valley. Riverside County is one of our five core counties.",
      },
      {
        question: "Do you fund new construction in the Inland Empire?",
        answer:
          "Yes — ground-up construction is one of our strongest IE programs: lot acquisition plus vertical construction up to 65% of completed value, $250K to $5M, with structured draws.",
      },
      {
        question: "What do Inland Empire flips qualify for?",
        answer:
          "Up to 75% of after-repair value, rates from 9.99%, terms 6–18 months, with rehab draws included and no prepayment penalty.",
      },
      {
        question: "How fast can a Riverside County loan close?",
        answer:
          "As few as 7 business days. One call to (626) 796-1680 gets you preliminary terms within 24 hours.",
      },
    ],
  },

  // ──────────────────────────────────────────────────────────────
  // SAN BERNARDINO
  // ──────────────────────────────────────────────────────────────
  {
    path: "/hard-money-lender-san-bernardino",
    name: "San Bernardino",
    county: "San Bernardino County",
    seo: {
      title:
        "Hard Money Lender San Bernardino — Direct Private Money, Fast Closings",
      description:
        "Direct private money lender for San Bernardino County. Fix & flip, construction, bridge, and cash-out loans from Rancho Cucamonga to the High Desert — $50K to $5M, closing in as few as 7 days.",
      keywords: [
        "hard money lender San Bernardino",
        "private money lender San Bernardino County",
        "fix and flip loans Fontana",
        "hard money Rancho Cucamonga",
        "private lender Ontario CA",
        "High Desert hard money loans",
        "Victorville investor loans",
        "Inland Empire private lending",
      ],
    },
    h1: "San Bernardino County:",
    h1Highlight: "Big County, Bigger Opportunity.",
    heroLead:
      "The largest county in the continental U.S. runs from the logistics powerhouse of the West Valley to High Desert communities where entry prices let new investors actually get started. We fund deals across all of it.",
    heroSub:
      "Direct private capital for flips, construction, bridge, and cash-out scenarios — $50K to $5M, closing in as few as 7 days.",
    narrative: [
      "San Bernardino County's West Valley — Rancho Cucamonga, Ontario, Fontana, Chino — sits at the center of Southern California's logistics economy, with the housing demand that follows the jobs. Head up the Cajon Pass and the High Desert offers some of the region's most accessible price points: Victorville, Hesperia, and Apple Valley are where renovation margins still work for investors building their first portfolio.",
      "We've lent across San Bernardino County since 2009 — it's one of our five core counties and borders our home base in the San Gabriel Valley. Same model everywhere: our own capital, asset-based underwriting, no credit score minimums, and answers in 24 hours.",
    ],
    scenarios: [
      {
        title: "West Valley Flips",
        description:
          "Fontana, Rialto, San Bernardino, Colton — steady renovation inventory near the logistics job base. Up to 75% ARV with rehab draws included.",
        icon: Hammer,
      },
      {
        title: "High Desert Entry Points",
        description:
          "Victorville, Hesperia, Apple Valley — accessible price points where newer investors can build a track record. We underwrite the deal, not your résumé.",
        icon: Sun,
      },
      {
        title: "Logistics-Corridor Housing",
        description:
          "Ontario, Chino, Rancho Cucamonga — housing demand follows warehouse jobs. Construction and bridge capital for investors serving the corridor's growth.",
        icon: Warehouse,
      },
      {
        title: "Mountain & Resort Properties",
        description:
          "Lake Arrowhead, Big Bear — cabin renovations and short-term-rental repositioning in the mountain communities. Unconventional properties are our comfort zone.",
        icon: MapPin,
      },
      {
        title: "Ground-Up on Real Land",
        description:
          "One of the few SoCal counties with genuine buildable land. Lot acquisition plus construction in one facility, up to 65% of completed value.",
        icon: HardHat,
      },
      {
        title: "Foreclosure & Recovery Lending",
        description:
          "When a trustee sale looms anywhere in the county, we move on foreclosure timelines — no credit minimums, asset-based decisions, fast payoffs.",
        icon: Clock,
      },
    ],
    cities: [
      "San Bernardino",
      "Fontana",
      "Rancho Cucamonga",
      "Ontario",
      "Victorville",
      "Rialto",
      "Hesperia",
      "Chino",
      "Chino Hills",
      "Upland",
      "Redlands",
      "Apple Valley",
      "Colton",
      "Yucaipa",
      "Montclair",
      "Highland",
    ],
    faqs: [
      {
        question: "Do you lend in the High Desert?",
        answer:
          "Yes — Victorville, Hesperia, Apple Valley, and the surrounding communities. The accessible price points make the High Desert a strong market for investors building a portfolio.",
      },
      {
        question: "Do you fund mountain and cabin properties?",
        answer:
          "Yes — Lake Arrowhead, Big Bear, and the mountain communities. Unconventional properties that make banks nervous are core private-lending territory.",
      },
      {
        question: "What are your terms for San Bernardino County flips?",
        answer:
          "Up to 75% ARV, rates from 9.99%, terms 6–18 months, $100K–$3M, with rehab draws and no prepayment penalty.",
      },
      {
        question: "How close are you to San Bernardino County?",
        answer:
          "Our West Covina headquarters sits minutes from the county line — San Bernardino is one of our five core counties, and we've lent here since 2009.",
      },
    ],
  },
  // ──────────────────────────────────────────────────────────────
  // CITY TIER — LA County city pages. Same rules as West Covina:
  // qualitative local content only (neighborhoods, property stock,
  // proximity), no invented market statistics, no demographic angles,
  // and headings scoped via areaLabel so each page complements rather
  // than duplicates the LA County page. Riverside/San Bernardino city
  // pages are deliberately absent — the county pages own those slugs.
  // Irvine was considered and skipped: no honest local angle beyond
  // what the Orange County page already says.
  // ──────────────────────────────────────────────────────────────
  {
    path: "/hard-money-lender-covina",
    name: "Covina",
    county: "Los Angeles County",
    areaLabel: "the East San Gabriel Valley",
    seo: {
      title: "Hard Money Lender Covina — Direct Private Money From Next Door",
      description:
        "Direct hard money lender bordering Covina — CDF is headquartered on Citrus in West Covina, minutes from downtown Covina. Fix & flip, bridge, ADU, and probate loans, $50K–$5M, 7-day closings. DRE# 01885595.",
      keywords: [
        "hard money lender Covina",
        "private money lender Covina",
        "hard money loans Covina CA",
        "fix and flip lender Covina",
        "bridge loan Covina",
        "ADU loans Covina",
        "probate loans Covina",
        "private lender East San Gabriel Valley",
      ],
    },
    h1: "The Direct Lender Next Door",
    h1Highlight: "to Covina.",
    heroLead:
      "Our headquarters sits on Citrus in West Covina, minutes from downtown Covina. Before your escrow officer has finished her coffee, we can have eyes on your property — no regional office, no out-of-state committee, just the people who fund the loan, one town over.",
    heroSub:
      "Fix & flip, bridge, construction, ADU, probate, foreclosure recovery, and cash-out loans from $50K to $5M across the East San Gabriel Valley — closing in as few as 7 days.",
    narrative: [
      "Covina is one of those markets that outsiders lump into greater LA and locals know street by street: the bungalows and cottages around the walkable downtown, postwar tracts south of Badillo, Charter Oak's larger lots, the newer hillside stock toward Covina Hills. We know the difference because we live and work here — Covina borders our home city, and plenty of our team's daily errands run straight up Citrus.",
      "That proximity is worth real money on a deal. When a lender can drive a property in ten minutes, underwriting stops being a photo-and-spreadsheet exercise. We've deployed over $200M across 500+ California transactions, and the East SGV playbook is our bread and butter — buy the dated tract home, renovate to today's buyer, or hold it and add a backyard unit on one of these generous lots.",
    ],
    scenarios: [
      {
        title: "Bungalow & Tract Rehabs",
        description:
          "From downtown-adjacent cottages to postwar tracts, Covina's stock rewards clean, fast renovations. We fund up to 75% ARV with rehab draws and can walk the property before most lenders return the first call.",
        icon: Hammer,
      },
      {
        title: "Deep-Lot ADUs",
        description:
          "Covina and Charter Oak lots often have the depth ADU projects need. Our dedicated program runs 75–85% LTC with milestone draws for detached units, garage conversions, and JADUs.",
        icon: Home,
      },
      {
        title: "Probate & Estate Property",
        description:
          "Long-tenure ownership produces a steady flow of estate transactions here. We've funded probate deals for years — court confirmation timelines, administrator authority, attorney coordination included.",
        icon: Scale,
      },
      {
        title: "Self-Employed & Trades",
        description:
          "Contractors, shop owners, and operators whose tax returns understate real cash flow. No tax returns required — the property qualifies, not the paperwork.",
        icon: Briefcase,
      },
      {
        title: "Foreclosure Intervention",
        description:
          "When a trustee sale is on the calendar, we move on foreclosure timelines — paying off the foreclosing lender and buying the owner room to sell or refinance deliberately.",
        icon: Clock,
      },
      {
        title: "Downtown & Small Multifamily",
        description:
          "Duplexes, fourplexes, and the small mixed-use buildings around downtown Covina — local-scale projects that pencil but confuse conventional lending desks.",
        icon: Building2,
      },
    ],
    cities: [
      "Covina",
      "West Covina",
      "Charter Oak",
      "Glendora",
      "Azusa",
      "San Dimas",
      "Baldwin Park",
      "Irwindale",
      "La Verne",
      "Walnut",
    ],
    faqs: [
      {
        question: "How close is your office to Covina?",
        answer:
          "Our headquarters is at 100 N Citrus St, Suite 530, West Covina, CA 91791 — minutes from downtown Covina. We're not a national lender with a Covina landing page; this is our neighborhood, and you're welcome to walk a deal into the office.",
      },
      {
        question: "How fast can you close a hard money loan in Covina?",
        answer:
          "In as few as 7 business days from a completed application. Underwriting, doc prep, and funding all happen in our West Covina office, and being able to see the property same-week keeps files moving.",
      },
      {
        question: "Do you lend on a home the owner lives in?",
        answer:
          "Our loans are business-purpose loans secured by California real estate — investment property, commercial buildings, and business-purpose transactions. Call (626) 796-1680 and we'll tell you in one conversation whether your scenario fits.",
      },
      {
        question: "What are your terms in the East San Gabriel Valley?",
        answer:
          "$50,000 to $5,000,000 secured by a first trust deed, typically at or below 70% loan-to-value, with all eight programs available — fix & flip up to 75% ARV, bridge, construction, cash-out, probate, foreclosure recovery, self-employed, and ADU construction.",
      },
    ],
  },

  {
    path: "/hard-money-lender-pasadena",
    name: "Pasadena",
    county: "Los Angeles County",
    areaLabel: "Pasadena and the Foothills",
    seo: {
      title: "Hard Money Lender Pasadena — Craftsman Rehabs, Estates, Rebuilds",
      description:
        "Direct private money lender for Pasadena and the foothills. Craftsman rehabs, estate and probate funding, ADUs, and builder rebuild projects — $50K to $5M, closings in as few as 7 days. DRE# 01885595.",
      keywords: [
        "hard money lender Pasadena",
        "private money lender Pasadena",
        "hard money loans Pasadena CA",
        "fix and flip lender Pasadena",
        "probate loans Pasadena",
        "estate loans Pasadena",
        "Altadena rebuild construction loans",
        "bridge loan Pasadena",
        "ADU loans Pasadena",
      ],
    },
    h1: "Pasadena Rewards Craftsmanship.",
    h1Highlight: "So Do We.",
    heroLead:
      "Bungalow Heaven, Madison Heights, the foothill streets above the Rose Bowl — Pasadena's housing stock punishes cheap flips and rewards work done right. We underwrite from twenty-plus miles east on the 210, close in days, and respect the difference between a renovation and a restoration.",
    heroSub:
      "Fix & flip, bridge, construction, ADU, probate, and cash-out loans from $50K to $5M across Pasadena, Altadena, and the foothills — closing in as few as 7 days.",
    narrative: [
      "Pasadena is a market of specifics. A craftsman in Bungalow Heaven carries obligations a tract house never will; an estate near Caltech can sit in probate while heirs on three coasts decide what to do; a foothill lot needs a lender who understands hillside construction rather than one who's merely heard of it. Banks flatten those specifics into checkboxes. We underwrite them.",
      "The foothills are also rebuilding. In the wake of the Eaton Fire, builders and investors are taking on lot acquisitions and ground-up projects across Altadena and the surrounding streets — work that needs construction capital on a builder's timeline, not a bank's. We've funded over $200M across 500+ California transactions, and ground-up construction with milestone draws is one of our eight core programs.",
    ],
    scenarios: [
      {
        title: "Craftsman & Historic Rehabs",
        description:
          "Landmark districts and character homes demand experienced execution. We fund up to 75% ARV with rehab draws for investors who restore rather than erase — and we know what that scope actually costs.",
        icon: Hammer,
      },
      {
        title: "Foothill Rebuilds & Lot Acquisitions",
        description:
          "Builders and investors taking on post-fire lots and ground-up foothill projects need capital that moves at construction speed. Lot + vertical funding with structured milestone draws.",
        icon: HardHat,
      },
      {
        title: "Estate & Probate Homes",
        description:
          "Generational Pasadena properties routinely pass through probate. We've funded estate transactions for years — court confirmation, administrator authority, and attorney coordination are familiar ground.",
        icon: Scale,
      },
      {
        title: "ADUs & Backyard Units",
        description:
          "Pasadena's lots and rental demand make ADUs pencil. Our dedicated program runs 75–85% LTC with milestone draws for detached units, conversions, and JADUs.",
        icon: Home,
      },
      {
        title: "Competitive-Bid Bridge",
        description:
          "Pasadena listings move. A 7-day close turns your offer into the functional equivalent of cash while slower buyers wait on loan committees.",
        icon: Clock,
      },
      {
        title: "Self-Employed Professionals",
        description:
          "Consultants, practice owners, and founders whose returns are optimized for taxes, not mortgage files. No tax returns required — the property qualifies.",
        icon: Briefcase,
      },
    ],
    cities: [
      "Pasadena",
      "Altadena",
      "South Pasadena",
      "San Marino",
      "Sierra Madre",
      "Arcadia",
      "Monrovia",
      "La Cañada Flintridge",
      "Eagle Rock",
      "Alhambra",
      "San Gabriel",
      "Temple City",
    ],
    faqs: [
      {
        question: "Do you fund fire-rebuild projects in Altadena?",
        answer:
          "Yes — for builders and investors acquiring lots or taking on ground-up rebuild projects, we fund lot acquisition and vertical construction with milestone draws. Our loans are business-purpose; for an owner rebuilding their own primary residence, a consumer construction lender is the right fit, and we'll say so on the first call.",
      },
      {
        question: "Have you worked with historic and landmark-district homes?",
        answer:
          "Yes. Character and landmark properties carry renovation scopes and timelines that generic rehab underwriting misprices. We underwrite the actual scope — and our draws are structured around how restoration work really sequences.",
      },
      {
        question: "Where are you located, and how fast can you close?",
        answer:
          "We're headquartered at 100 N Citrus St, Suite 530, West Covina — a straight shot down the 210 from Pasadena. Closings run as fast as 7 business days from a completed application because underwriting and funding happen in one office.",
      },
      {
        question: "What loan sizes do you write in Pasadena?",
        answer:
          "$50,000 to $5,000,000 secured by a first trust deed, typically at or below 70% loan-to-value. Pasadena's price points often land in our mid-range — bridge and rehab loans from several hundred thousand to a few million dollars.",
      },
    ],
  },

  {
    path: "/hard-money-lender-glendale",
    name: "Glendale",
    county: "Los Angeles County",
    areaLabel: "Glendale and the Verdugos",
    seo: {
      title: "Hard Money Lender Glendale — Multifamily, Hillside & Bridge Loans",
      description:
        "Direct private money lender for Glendale, Burbank, and the Verdugo cities. Small multifamily, hillside homes, estate funding, and business-purpose bridge loans — $50K to $5M, 7-day closings. DRE# 01885595.",
      keywords: [
        "hard money lender Glendale",
        "private money lender Glendale",
        "hard money loans Glendale CA",
        "multifamily bridge loan Glendale",
        "hillside home loan Glendale",
        "probate loans Glendale",
        "private lender Burbank",
        "bridge loan Glendale",
      ],
    },
    h1: "Glendale Is a Family-Business Town.",
    h1Highlight: "We're a Family-Run Lender.",
    heroLead:
      "Capital Direct Funding has been family-run since Frank Williams founded it in 2009 — so Glendale's owner-operators, family partnerships, and generational property holders are speaking our language. We lend our own and our investors' capital, and the people you call are the people who decide.",
    heroSub:
      "Small multifamily, bridge, fix & flip, construction, probate, and cash-out loans from $50K to $5M across Glendale, Burbank, and the Verdugo cities — closing in as few as 7 days.",
    narrative: [
      "Glendale splits into two markets that confuse out-of-area lenders. South of the 134 sits some of the region's densest small-multifamily stock — duplexes to small apartment buildings where value-add investors do their best work. Climb north into Rossmoyne, Adams Hill, the Verdugo Woodlands, and up through Montrose and La Crescenta, and you're in hillside single-family territory: view lots, retaining walls, and appraisals that demand local comps rather than a national model.",
      "We underwrite both from one office and one philosophy: the asset and the plan, not the borrower's tax returns. That fits how Glendale actually works — family businesses, self-employed professionals, and property held across generations, where the paperwork rarely tells the real story. Over $200M deployed across 500+ California transactions, and decisions come from the family that funds the loan.",
    ],
    scenarios: [
      {
        title: "Small Multifamily Value-Add",
        description:
          "Duplexes to small apartment buildings south of the 134 — reposition units, raise the asset's performance, refinance or sell. Bridge and rehab capital sized to the plan.",
        icon: Building2,
      },
      {
        title: "Hillside & View Properties",
        description:
          "Rossmoyne, Adams Hill, the Woodlands, up to Montrose — hillside collateral that makes bank appraisal desks nervous is normal territory for an asset-based lender with local comps.",
        icon: MapPin,
      },
      {
        title: "Family Business Owners",
        description:
          "Owner-operators whose returns are written to minimize taxes, not qualify for loans. No tax returns required — we underwrite the property and the plan.",
        icon: Briefcase,
      },
      {
        title: "Estate & Probate Property",
        description:
          "Generational holdings pass through probate here constantly. Court confirmation timelines, administrator authority, attorney coordination — familiar ground since 2009.",
        icon: Scale,
      },
      {
        title: "Competitive-Bid Bridge",
        description:
          "When the right building lists, the winning buyer is the one who can actually close. A 7-day close makes your offer functionally cash.",
        icon: Clock,
      },
      {
        title: "Cash-Out for Business Capital",
        description:
          "Unlock equity in investment property to fund acquisitions, renovations, or the business itself — business-purpose cash-out in days, not months.",
        icon: TrendingUp,
      },
    ],
    cities: [
      "Glendale",
      "Burbank",
      "Montrose",
      "La Crescenta",
      "La Cañada Flintridge",
      "Eagle Rock",
      "Atwater Village",
      "Tujunga",
      "Sunland",
      "Sun Valley",
      "Highland Park",
    ],
    faqs: [
      {
        question: "Do you lend on hillside homes in Glendale?",
        answer:
          "Yes — hillside and view properties in Rossmoyne, Adams Hill, the Verdugo Woodlands, and up through Montrose and La Crescenta. Unconventional collateral that slows a bank down is core private-lending territory; we underwrite the asset with local comps.",
      },
      {
        question: "Do you fund small apartment buildings?",
        answer:
          "Yes. Duplexes through small multifamily are a core asset class for us — bridge, rehab, and cash-out structures from $50K to $5M, secured by a first trust deed at conservative loan-to-value.",
      },
      {
        question: "Is this a consumer mortgage? I live in the property.",
        answer:
          "Our loans are business-purpose loans secured by California real estate — investment property, commercial buildings, and business-purpose transactions. Call (626) 796-1680 and we'll tell you in one conversation whether your scenario fits.",
      },
      {
        question: "How fast can you close in Glendale?",
        answer:
          "As fast as 7 business days from a completed application. We're headquartered in West Covina and underwrite Glendale deals directly — no committee, no out-of-state review, 24-hour response on every inquiry.",
      },
    ],
  },

  {
    path: "/hard-money-lender-long-beach",
    name: "Long Beach",
    county: "Los Angeles County",
    areaLabel: "Long Beach and the Gateway Cities",
    seo: {
      title: "Hard Money Lender Long Beach — Multifamily & Fix-and-Flip Loans",
      description:
        "Direct private money lender for Long Beach and the Gateway Cities. Pre-war multifamily, craftsman flips, ADUs, and probate funding — $50K to $5M, closings in as few as 7 days. DRE# 01885595.",
      keywords: [
        "hard money lender Long Beach",
        "private money lender Long Beach",
        "hard money loans Long Beach CA",
        "multifamily loan Long Beach",
        "fix and flip lender Long Beach",
        "ADU loans Long Beach",
        "probate loans Long Beach",
        "bridge loan Long Beach",
      ],
    },
    h1: "Long Beach Is a Landlord's Town.",
    h1Highlight: "We're a Landlord's Lender.",
    heroLead:
      "Few cities in California carry Long Beach's density of small rental property — pre-war fourplexes in Alamitos Beach, craftsman streets in Wrigley and Rose Park, stucco eights near the traffic circle. We fund the investors who buy, fix, and hold them, with asset-based underwriting and closings in days.",
    heroSub:
      "Small multifamily, fix & flip, bridge, ADU, probate, and cash-out loans from $50K to $5M across Long Beach and the Gateway Cities — closing in as few as 7 days.",
    narrative: [
      "Long Beach rewards investors who understand its patchwork: California Heights and Bixby Knolls trade differently than Belmont Shore; a fourplex off Cherry is a different deal than one near the beach; and the pre-war stock that gives the city its character comes with pre-war plumbing, wiring, and surprises. Value-add multifamily here is a renovation business as much as a rental business — and it needs a lender who funds the renovation, not just the purchase.",
      "That's our lane. We fund up to 75% ARV on rehabs with draws, bridge acquisitions that can't wait for a bank, and business-purpose cash-out against stabilized units to buy the next building. Long Beach has also embraced ADUs and garage conversions, and our dedicated ADU program — 75–85% LTC with milestone draws — fits the city's alley-loaded lots. Over $200M deployed, 500+ California transactions, decisions from the people writing the check.",
    ],
    scenarios: [
      {
        title: "Pre-War Multifamily Value-Add",
        description:
          "Fourplexes to small apartment buildings in Alamitos Beach, Rose Park, and downtown — buy, renovate unit by unit, refinance or sell. Capital structured for the turn schedule.",
        icon: Building2,
      },
      {
        title: "Craftsman District Flips",
        description:
          "Wrigley, California Heights, and the historic districts reward respectful renovations. Up to 75% ARV with rehab draws, underwritten by people who know these blocks trade on character.",
        icon: Hammer,
      },
      {
        title: "ADUs & Garage Conversions",
        description:
          "Alley-loaded lots and strong rental demand make Long Beach an ADU market. 75–85% LTC with milestone draws for detached units, conversions, and JADUs.",
        icon: Home,
      },
      {
        title: "Port & Logistics Operators",
        description:
          "Owner-operators and trades built around the port economy — strong cash flow, complicated tax returns. No tax returns required; the property qualifies.",
        icon: Warehouse,
      },
      {
        title: "Probate & Estate Property",
        description:
          "Long-held Long Beach homes and rental buildings routinely pass through probate. Court timelines, administrator authority, and attorney coordination are familiar ground.",
        icon: Scale,
      },
      {
        title: "Foreclosure Intervention",
        description:
          "Trustee sale looming anywhere in the Gateway Cities? We move on foreclosure timelines — paying off the foreclosing lender so the owner can exit on their terms.",
        icon: Clock,
      },
    ],
    cities: [
      "Long Beach",
      "Signal Hill",
      "Lakewood",
      "Bellflower",
      "Paramount",
      "Downey",
      "Norwalk",
      "Cerritos",
      "Carson",
      "San Pedro",
      "Wilmington",
    ],
    faqs: [
      {
        question: "Do you lend on small apartment buildings in Long Beach?",
        answer:
          "Yes — duplexes through small multifamily are core collateral for us, including pre-war buildings that need real renovation budgets. Bridge, rehab with draws, and cash-out structures from $50K to $5M at conservative loan-to-value.",
      },
      {
        question: "You're in West Covina — can you really serve Long Beach?",
        answer:
          "Yes. We've lent across Los Angeles County since 2009, and Long Beach is an easy drive down the 605 from our office. Same-week property visits, direct underwriting, and 7-day closings don't require a storefront on Pine Ave.",
      },
      {
        question: "Do you finance ADU projects in Long Beach?",
        answer:
          "Yes — our dedicated ADU program runs 75–85% loan-to-cost with milestone draws for detached units, garage conversions, and JADUs on investment property.",
      },
      {
        question: "Do you lend on owner-occupied homes?",
        answer:
          "Our loans are business-purpose loans secured by California real estate — investment property, commercial buildings, and business-purpose transactions. Call (626) 796-1680 and we'll tell you within one conversation whether your scenario fits.",
      },
    ],
  },

  {
    path: "/hard-money-lender-pomona",
    name: "Pomona",
    county: "Los Angeles County",
    areaLabel: "the Pomona Valley",
    seo: {
      title: "Hard Money Lender Pomona — Pomona Valley Fix & Flip and Bridge",
      description:
        "Direct private money lender for Pomona, Claremont, La Verne, and the Pomona Valley. Entry-level flips, historic rehabs, rentals, and probate funding — $50K to $5M, 7-day closings. DRE# 01885595.",
      keywords: [
        "hard money lender Pomona",
        "private money lender Pomona",
        "hard money loans Pomona CA",
        "fix and flip lender Pomona",
        "Pomona Valley private lender",
        "probate loans Pomona",
        "rental property loan Pomona",
        "bridge loan Claremont",
      ],
    },
    h1: "Pomona Is Where Portfolios Start.",
    h1Highlight: "We Fund First Deals and Fiftieth.",
    heroLead:
      "The Pomona Valley's price points let investors do what's nearly impossible closer to the coast: buy, renovate, and hold at numbers that still make sense. We fund that work from twenty minutes up the 10 — first-time flippers and veteran operators alike, judged on the deal, not the résumé length.",
    heroSub:
      "Fix & flip, bridge, construction, rental cash-out, probate, and foreclosure recovery loans from $50K to $5M across the Pomona Valley — closing in as few as 7 days.",
    narrative: [
      "Pomona is several markets wearing one name. Lincoln Park's historic homes attract restoration-minded buyers; Phillips Ranch and Ganesha Hills trade as family neighborhoods; the blocks around the colleges run on rental demand that resets every fall; and the city's edges blur into Claremont, La Verne, San Dimas, and Diamond Bar — each a half-step up the price ladder. Investors who learn these distinctions build portfolios here. Lenders who don't, pass on good deals.",
      "We're the opposite of a stranger to this valley — it's the eastern edge of our home turf, a straight shot down the 10 and 57 from our West Covina headquarters. Many of our borrowers run holdings that straddle the county line into Montclair, Ontario, and Chino, and our lending follows them: all of Los Angeles County, San Bernardino County, and Riverside County are core territory, with over $200M deployed across 500+ transactions.",
    ],
    scenarios: [
      {
        title: "Entry-Level Flips",
        description:
          "The Valley's price points are where many investors do their first deal — and where experienced flippers still find margin. Up to 75% ARV with rehab draws, no credit minimums.",
        icon: Hammer,
      },
      {
        title: "Lincoln Park & Historic Rehabs",
        description:
          "Pomona's historic districts reward renovations that respect the architecture. We underwrite the real restoration scope, not a per-square-foot guess.",
        icon: Landmark,
      },
      {
        title: "Student & Workforce Rentals",
        description:
          "Rental demand around the colleges and job corridors supports buy-and-hold strategies. Bridge in, renovate, then cash-out refinance against the stabilized asset.",
        icon: Home,
      },
      {
        title: "Cross-County Portfolios",
        description:
          "Pomona investors routinely hold property across the LA–San Bernardino line. We lend in both counties and can cross-collateralize when it strengthens the deal.",
        icon: MapPin,
      },
      {
        title: "Probate & Estate Property",
        description:
          "Long-tenure ownership across the Valley produces steady estate transactions. Court confirmation timelines and attorney coordination are familiar ground.",
        icon: Scale,
      },
      {
        title: "Foreclosure Intervention",
        description:
          "When a trustee sale date is set, we move on foreclosure timelines — paying off the foreclosing lender and giving the owner room to recover equity on their schedule.",
        icon: Clock,
      },
    ],
    cities: [
      "Pomona",
      "Claremont",
      "La Verne",
      "San Dimas",
      "Diamond Bar",
      "Walnut",
      "Glendora",
      "Montclair",
      "Ontario",
      "Chino",
      "Chino Hills",
    ],
    faqs: [
      {
        question: "Do you work with first-time flippers in Pomona?",
        answer:
          "Yes. We underwrite the deal — purchase price, scope, ARV, exit — rather than demanding a long track record. Plenty of borrowers did their first project with us in the Pomona Valley and their tenth somewhere pricier.",
      },
      {
        question: "Do you lend across the county line in Montclair, Ontario, or Chino?",
        answer:
          "Yes — Los Angeles, San Bernardino, and Riverside counties are all core territory, so a portfolio that straddles the line is no complication. We can also cross-collateralize multiple properties when it strengthens a deal.",
      },
      {
        question: "How fast can you close in Pomona?",
        answer:
          "As fast as 7 business days from a completed application. Our headquarters is in West Covina, straight down the 10 — same-week property visits are normal, and decisions come from the people funding the loan.",
      },
      {
        question: "Are these consumer home loans?",
        answer:
          "No — our loans are business-purpose loans secured by California real estate: investment property, commercial buildings, and business-purpose transactions. Call (626) 796-1680 and we'll tell you in one conversation whether your scenario fits.",
      },
    ],
  },

  {
    path: "/hard-money-lender-el-monte",
    name: "El Monte",
    county: "Los Angeles County",
    areaLabel: "the Central San Gabriel Valley",
    seo: {
      title: "Hard Money Lender El Monte — ADU, Rehab & Small Multifamily Loans",
      description:
        "Direct private money lender for El Monte and the Central San Gabriel Valley, minutes from our West Covina HQ. Deep-lot ADUs, rehabs, small multifamily — $50K to $5M, 7-day closings. DRE# 01885595.",
      keywords: [
        "hard money lender El Monte",
        "private money lender El Monte",
        "hard money loans El Monte CA",
        "ADU loans El Monte",
        "fix and flip lender El Monte",
        "small multifamily loan El Monte",
        "private lender South El Monte",
        "bridge loan Rosemead",
      ],
    },
    h1: "Deep Lots. Dense Demand.",
    h1Highlight: "Direct Funding.",
    heroLead:
      "El Monte's mid-century homes sit on some of the most ADU-ready lots in the county, minutes from our West Covina headquarters on the 10. When a lender can drive your property between meetings, underwriting moves at the speed the Central SGV actually demands.",
    heroSub:
      "ADU construction, fix & flip, bridge, small multifamily, probate, and cash-out loans from $50K to $5M across the Central San Gabriel Valley — closing in as few as 7 days.",
    narrative: [
      "The Central SGV — El Monte, South El Monte, Rosemead, and the neighborhoods around them — is a market built on practical housing: mid-century homes on deep lots, small rental properties, and family-owned businesses operating close to home. For investors, that combination is the point. The deep lot takes a backyard unit; the dated house rewards a disciplined renovation; the duplex around the corner cash-flows the day escrow closes.",
      "We underwrite this market from ten minutes away. That means same-week property visits, comps read street by street rather than zip code by zip code, and terms built on what the asset and the plan support. Rental demand here is durable, which is exactly what our ADU program — 75–85% LTC with milestone draws — was built for. Over $200M deployed across 500+ California transactions since 2009.",
    ],
    scenarios: [
      {
        title: "Deep-Lot ADUs & JADUs",
        description:
          "El Monte lots were made for backyard units. Detached ADUs, garage conversions, and JADUs at 75–85% LTC with milestone draws — on investment property with real rental demand behind it.",
        icon: Home,
      },
      {
        title: "Mid-Century Rehabs",
        description:
          "The area's postwar stock rewards clean, well-budgeted renovations. Up to 75% ARV with rehab draws, and we can walk the property before your inspection contingency expires.",
        icon: Hammer,
      },
      {
        title: "Small Multifamily & Infill",
        description:
          "Duplexes, triplexes, and small infill projects across the Central SGV — local-scale deals that pencil on rental demand but confuse conventional lending desks.",
        icon: Building2,
      },
      {
        title: "Family Business Owners",
        description:
          "Shops, trades, and operators whose tax returns are written to minimize taxes, not qualify for loans. No tax returns required — the property qualifies, not the paperwork.",
        icon: Briefcase,
      },
      {
        title: "Probate & Estate Property",
        description:
          "Decades of stable ownership produce a steady flow of estate transactions. Court confirmation timelines, administrator authority, and attorney coordination included.",
        icon: Scale,
      },
      {
        title: "Foreclosure Intervention",
        description:
          "When a trustee sale is on the calendar, we move on foreclosure timelines — paying off the foreclosing lender and buying the owner room to sell or refinance deliberately.",
        icon: Clock,
      },
    ],
    cities: [
      "El Monte",
      "South El Monte",
      "Rosemead",
      "Temple City",
      "Baldwin Park",
      "Arcadia",
      "San Gabriel",
      "Monterey Park",
      "Whittier",
      "La Puente",
      "Irwindale",
    ],
    faqs: [
      {
        question: "How close are you to El Monte?",
        answer:
          "Our headquarters at 100 N Citrus St, Suite 530, West Covina is about ten minutes down the 10. Same-week property visits are routine, and you're welcome to bring a deal into the office — call (626) 796-1680 first so the right person is there.",
      },
      {
        question: "Do you fund ADU projects in El Monte?",
        answer:
          "Yes — deep-lot detached units, garage conversions, and JADUs on investment property, at 75–85% loan-to-cost with milestone draws. It's one of our eight core programs, built for exactly this housing stock.",
      },
      {
        question: "Do you lend on owner-occupied homes?",
        answer:
          "Our loans are business-purpose loans secured by California real estate — investment property, commercial buildings, and business-purpose transactions. One call and we'll tell you whether your scenario fits.",
      },
      {
        question: "What are your terms in the Central San Gabriel Valley?",
        answer:
          "$50,000 to $5,000,000 secured by a first trust deed, typically at or below 70% loan-to-value — fix & flip up to 75% ARV, bridge, construction, cash-out, probate, foreclosure recovery, self-employed, and ADU construction all available.",
      },
    ],
  },
];

/** Look up a location page by its route path. */
export function getLocationPage(path: string): LocationPageData | undefined {
  return LOCATION_PAGES.find((p) => p.path === path);
}

/** Build the Next.js Metadata object for a location page route. */
export function buildLocationPageMetadata(path: string): Metadata {
  const page = getLocationPage(path);
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
