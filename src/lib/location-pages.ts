import type { Metadata } from "next";
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
  /** full county name for schema areaServed */
  county: string;
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
        "Direct hard money lender headquartered in Los Angeles County. Fix & flip, bridge, construction, probate, and cash-out loans across LA — $50K to $5M, closings in as few as 7 days. DRE# 01885595.",
      keywords: [
        "hard money lender Los Angeles",
        "private money lender Los Angeles",
        "hard money loans LA",
        "Los Angeles bridge loan lender",
        "fix and flip lender Los Angeles",
        "private lender Los Angeles County",
        "hard money lender San Fernando Valley",
        "probate loans Los Angeles",
      ],
    },
    h1: "Los Angeles Is Our Backyard.",
    h1Highlight: "Literally.",
    heroLead:
      "Capital Direct Funding is headquartered in West Covina — we've been lending our own capital across Los Angeles County since 2009. When you call, you're talking to decision-makers who drive these streets, not a national call center reading a script.",
    heroSub:
      "Fix & flip, bridge, construction, probate, foreclosure recovery, and cash-out loans from $50K to $5M, closing in as few as 7 days.",
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
          "LA leads California in ADU construction, and we built a dedicated program for it: 75–85% LTC with milestone draws for detached units, garage conversions, and JADUs.",
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
          "All eight programs: fix & flip, bridge, ground-up construction, cash-out refinance, probate & estate, foreclosure & bankruptcy recovery, self-employed solutions, and ADU construction — from $50K to $5M.",
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
    alternates: { canonical: `https://capitaldf.com${path}` },
  };
}
