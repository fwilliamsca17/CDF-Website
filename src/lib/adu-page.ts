/**
 * Copy + FAQ for /adu-loans. Visible HTML and JSON-LD must stay in lockstep.
 *
 * Numbers come from loan-terms.ts (slug "adu") and the published parameter
 * table on the page. Do not add rents, cap rates, grant "availability,"
 * or competitor rate bands here.
 */

export const ADU_SEO = {
  title: "Private Money ADU Loans in Los Angeles | Hard Money Construction",
  description:
    "Direct private money ADU loans in Los Angeles and Orange County. Hard-money, business-purpose construction financing: 75–85% LTC, 9.5–11%, $60K–$300K per unit, milestone draws. Not a HELOC or a CalHFA grant.",
  h1: "Private Money ADU Loans",
  h1Highlight: "Hard Money in Los Angeles",
  lede:
    "Capital Direct Funding is a direct private money lender for ADU construction in Los Angeles and Orange County. These are hard-money, business-purpose construction loans — 75–85% of project cost, rates 9.5–11%, $60,000–$300,000 per unit, 12–18 months, with milestone draws. Not a HELOC, not a CalHFA grant, and not a 30-year consumer mortgage.",
};

export const ADU_COMPARE: { path: string; pays: string; fits: string; isNot: string }[] =
  [
    {
      path: "CalHFA ADU grant",
      pays: "Pre-development only (plans, permits, soils, fees) when a round is open",
      fits: "Income-eligible owner-occupants, if funding exists",
      isNot: "The vertical build. CalHFA’s last published round was fully allocated Dec 28, 2023",
    },
    {
      path: "HELOC / cash-out / Non-QM",
      pays: "Existing home equity as cash or a credit line",
      fits: "Owner-occupants with equity, DTI, and a bank or mortgage broker",
      isNot: "A construction draw facility when you just bought or the bank said no",
    },
    {
      path: "Habitat / NHS / factory programs",
      pays: "0% or subsidized money, or a factory-built package",
      fits: "Income-qualified homeowners",
      isNot: "An investor or rental ADU on a timeline",
    },
    {
      path: "CDF private money",
      pays: "75–85% of ADU project cost, released on milestones",
      fits: "Business-purpose rental / investment ADUs in LA and Orange County",
      isNot: "A 30-year consumer mortgage or a government grant",
    },
  ];

export const ADU_FAQS: { question: string; answer: string }[] = [
  {
    question: "Can I use a private money or hard money loan for an ADU in Los Angeles?",
    answer:
      "Yes. Capital Direct Funding funds ADU construction as a private money / hard money loan — a short-term, asset-based, business-purpose construction facility secured by California real estate. Published terms: 75–85% loan-to-cost, 9.5–11% interest-only, $60,000–$300,000 per unit, 12–18 months, milestone draws. Detached ADUs, garage conversions, attached ADUs, and junior ADUs (JADUs) in Los Angeles and Orange County.",
  },
  {
    question: "What are private money ADU financing requirements in Los Angeles?",
    answer:
      "The loan is business-purpose (typically a rental or investment ADU), secured by California real estate. We review the property, project type, contractor or bid, use (rent vs occupy), and timeline. Published parameters: 75–85% of cost, $60,000–$300,000 per unit, 12–18 month term, 9.5–11%, 1.5–2 origination points, capitalized interest reserve, and milestone-based draws. This is not a consumer mortgage on an owner-occupied family unit and it is not a “no equity required” unsecured loan.",
  },
  {
    question: "I just bought and have little equity. Can I still finance an ADU?",
    answer:
      "A HELOC usually will not work if there is no equity yet. A private money ADU loan is underwritten to loan-to-cost on the project, not to a long-term consumer DTI. That does not mean zero cash: published terms require 15–25% equity in the project (cash plus land value). We look at the specific lot and budget; we do not promise “no money down.”",
  },
  {
    question: "What is the CalHFA ADU Grant Program status in 2026?",
    answer:
      "CalHFA’s own program page states the latest ADU Grant round was fully allocated on December 28, 2023, and that anyone offering to get you an ADU grant is a financial scam. When funded, the grant reimbursed up to $40,000 of pre-development and non-recurring closing costs — site prep, architectural plans, permits, soils, impact fees, surveys — not vertical construction. Confirm current status at calhfa.ca.gov/adu. CDF does not administer CalHFA grants. We finance the build as private money.",
  },
  {
    question: "How is this different from a HELOC or a bank construction loan?",
    answer:
      "A HELOC is consumer credit against existing equity, usually on an owner-occupied home, underwritten to income and DTI. Bank construction loans are slower and often require full documentation. CDF’s ADU program is a 12–18 month private construction loan with milestone draws and a planned takeout (DSCR refinance, sale, or conventional) after completion. If a HELOC fits, use it. If the bank will not fund the build, that is this lane.",
  },
  {
    question: "What if I need a regular mortgage or HomeStyle loan for an owner-occupied ADU?",
    answer:
      "That is not this page. Owner-occupied HomeStyle, FHA 203(k), cash-out, and HELOC paths are brokered through Elite Fundings / Francisco Williams (franciscowilliams.com/adu-financing). CDF is private money construction for business-purpose ADUs.",
  },
  {
    question: "Does CDF list ADUs for rent in Los Angeles?",
    answer:
      "No. We finance construction of rental ADUs. We are not a rental listing service and we do not publish an inventory of ADUs for rent.",
  },
];
