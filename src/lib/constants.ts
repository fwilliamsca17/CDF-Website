export const SITE_CONFIG = {
  name: "Capital Direct Funding",
  shortName: "CDF",
  legalName: "Capital Direct Funding, Inc.",
  domain: "capitaldf.com",
  tagline: "Fast, Flexible Private Lending for California Real Estate",
  description:
    "Capital Direct Funding provides fast, flexible private lending solutions for real estate borrowers and whole-note first trust deed investments for accredited investors across California.",
  phone: "(626) 796-1680",
  email: "info@capitaldf.com",
  dreLicense: "01885595",
  nmls: "1159831",
  address: {
    street: "100 N Citrus St, Suite 530",
    city: "West Covina",
    state: "CA",
    zip: "91791",
    full: "100 N Citrus St, Suite 530, West Covina, CA 91791",
  },
  social: {
    linkedin: "https://linkedin.com/company/capital-direct-funding",
  },
};

export const NAV_ITEMS = [
  { label: "Borrowers", href: "/borrowers" },
  { label: "Investors", href: "/investors" },
  { label: "Loan Process", href: "/loan-process" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const STATS = [
  { value: 200, prefix: "$", suffix: "M+", label: "Capital Deployed" },
  { value: 500, prefix: "", suffix: "+", label: "Loans Funded" },
  { value: 7, prefix: "", suffix: "", label: "Day Average Closings" },
  { value: 15, prefix: "", suffix: "+", label: "Years Experience" },
];

export interface LoanProgram {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  parameters: {
    ltv: string;
    rates: string;
    terms: string;
    loanRange: string;
  };
  features: string[];
}

export const LOAN_PROGRAMS: LoanProgram[] = [
  {
    slug: "fix-and-flip",
    title: "Fix & Flip Loans",
    shortTitle: "Fix & Flip",
    description:
      "Short-term financing for property acquisition and renovation. Get in, renovate, and sell for a profit with fast capital at your side.",
    icon: "Hammer",
    parameters: {
      ltv: "Up to 75% ARV",
      rates: "From 9.99%",
      terms: "6 - 18 months",
      loanRange: "$100K - $3M",
    },
    features: [
      "Fast 7-day closings",
      "Rehab draws included",
      "No prepayment penalty",
      "Interest-only payments",
    ],
  },
  {
    slug: "bridge-loans",
    title: "Bridge Loans",
    shortTitle: "Bridge",
    description:
      "Short-term capital to bridge the gap between transactions. Ideal when you need to close quickly while arranging permanent financing.",
    icon: "ArrowLeftRight",
    parameters: {
      ltv: "Up to 70%",
      rates: "From 9.99%",
      terms: "6 - 24 months",
      loanRange: "$100K - $5M",
    },
    features: [
      "Close in as few as 7 days",
      "Flexible exit strategies",
      "Commercial & residential",
      "Cross-collateralization available",
    ],
  },
  {
    slug: "construction",
    title: "Ground-Up Construction",
    shortTitle: "Construction",
    description:
      "Financing for new construction projects from the ground up. We fund lot acquisition and construction costs with structured draws.",
    icon: "Building2",
    parameters: {
      ltv: "Up to 65% of completed value",
      rates: "From 10.99%",
      terms: "12 - 24 months",
      loanRange: "$250K - $5M",
    },
    features: [
      "Lot acquisition + construction",
      "Structured draw schedule",
      "Experienced builder required",
      "SFR and small multifamily",
    ],
  },
  {
    slug: "cash-out",
    title: "Cash-Out Refinance",
    shortTitle: "Cash-Out Refi",
    description:
      "Unlock the equity in your investment properties. Use the proceeds for new acquisitions, renovations, or business purposes.",
    icon: "Banknote",
    parameters: {
      ltv: "Up to 65%",
      rates: "From 9.99%",
      terms: "12 - 36 months",
      loanRange: "$100K - $3M",
    },
    features: [
      "Quick access to equity",
      "No seasoning requirements",
      "Business purpose only",
      "1st position trust deeds",
    ],
  },
  {
    slug: "probate",
    title: "Probate & Estate Loans",
    shortTitle: "Probate & Estate",
    description:
      "Specialized funding for properties in probate, trust sales, and estate situations. We understand the unique timelines and court requirements.",
    icon: "Scale",
    parameters: {
      ltv: "Up to 65%",
      rates: "From 10.99%",
      terms: "6 - 24 months",
      loanRange: "$100K - $3M",
    },
    features: [
      "Court confirmation expertise",
      "Flexible timelines",
      "Work with estate attorneys",
      "Trust and estate sales",
    ],
  },
  {
    slug: "foreclosure-recovery",
    title: "Foreclosure & Bankruptcy Recovery",
    shortTitle: "Foreclosure/BK",
    description:
      "Funding solutions for borrowers navigating foreclosure or emerging from bankruptcy. We look at the asset and the deal, not just the credit score.",
    icon: "ShieldAlert",
    parameters: {
      ltv: "Up to 60%",
      rates: "From 11.99%",
      terms: "6 - 24 months",
      loanRange: "$100K - $2M",
    },
    features: [
      "No minimum credit score",
      "Asset-based underwriting",
      "Post-bankruptcy solutions",
      "Foreclosure bail-out loans",
    ],
  },
  {
    slug: "self-employed",
    title: "Self-Employed Solutions",
    shortTitle: "Self-Employed",
    description:
      "Flexible financing for self-employed borrowers and business owners who don't fit conventional income documentation requirements.",
    icon: "Briefcase",
    parameters: {
      ltv: "Up to 70%",
      rates: "From 9.99%",
      terms: "6 - 36 months",
      loanRange: "$100K - $3M",
    },
    features: [
      "No tax returns required",
      "Bank statement programs",
      "Business purpose loans",
      "Simplified underwriting",
    ],
  },
];

export const VALUE_PROPS = [
  {
    icon: "Zap",
    title: "Speed",
    description:
      "Close in as few as 7 days. When time is critical, we deliver. No committee approvals, no bureaucratic delays.",
  },
  {
    icon: "Settings",
    title: "Flexibility",
    description:
      "Creative solutions for complex situations. Probate, bankruptcy, self-employed \u2014 we find a way when banks say no.",
  },
  {
    icon: "Shield",
    title: "Expertise",
    description:
      "Over $200M deployed across 500+ transactions. We specialize in scenarios where conventional lenders fall short.",
  },
  {
    icon: "Users",
    title: "Relationships",
    description:
      "Family-run and relationship-driven. You work with decision-makers, not committees. Your success is our success.",
  },
];

export const INVESTOR_BENEFITS = [
  {
    title: "Whole-Note Investments",
    description:
      "Invest in individual loans secured by California real estate. Full transparency on every deal with direct ownership of the note.",
    icon: "FileText",
  },
  {
    title: "First Trust Deed Security",
    description:
      "Every investment is secured by a first-position trust deed on the underlying property, providing a tangible asset backing your investment.",
    icon: "Shield",
  },
  {
    title: "Consistent Returns",
    description:
      "Earn attractive, risk-adjusted returns backed by real property. Monthly interest payments provide steady, predictable income.",
    icon: "TrendingUp",
  },
  {
    title: "Capital Preservation",
    description:
      "Conservative loan-to-value ratios and thorough underwriting protect your principal. Every loan is personally reviewed by our team.",
    icon: "Lock",
  },
  {
    title: "California Real Estate Backed",
    description:
      "All loans are secured by California real property \u2014 one of the most liquid and valuable real estate markets in the world.",
    icon: "Building2",
  },
  {
    title: "Experienced Management",
    description:
      "Over 15 years of real estate and finance expertise across multiple disciplines, with a proven track record of capital preservation.",
    icon: "Award",
  },
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Apply",
    description:
      "Submit your loan inquiry online or by phone. We respond within 24 hours with an initial assessment and preliminary terms.",
    icon: "FileEdit",
  },
  {
    step: 2,
    title: "Underwrite",
    description:
      "Our team evaluates the property and deal structure. We order the appraisal, title, and complete our due diligence.",
    icon: "Search",
  },
  {
    step: 3,
    title: "Approve",
    description:
      "Receive your commitment letter and clear closing conditions. We work with your escrow and title to prepare for funding.",
    icon: "CheckCircle",
  },
  {
    step: 4,
    title: "Fund",
    description:
      "Sign documents and receive your funds. We close in as few as 7 days from completed application. Fast, simple, done.",
    icon: "DollarSign",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

// Single source of truth for FAQ content — consumed by both the visible
// /faq page and the FAQPage JSON-LD so the structured data always matches
// what's on the page. Every answer is grounded in existing, approved facts
// (rates, terms, licensing, service area) — no invented figures.
export const FAQ_ITEMS: FaqItem[] = [
  {
    category: "Getting Funded",
    question: "How fast can Capital Direct Funding close a loan?",
    answer:
      "We can close loans in as few as 7 business days from completed application. Our streamlined underwriting and direct lending model eliminate committee approvals and bureaucratic delays.",
  },
  {
    category: "Getting Funded",
    question: "What types of loans does Capital Direct Funding offer?",
    answer:
      "We offer Fix & Flip loans, Bridge loans, Ground-Up Construction financing, Cash-Out Refinance, Probate & Estate loans, Foreclosure & Bankruptcy Recovery loans, Self-Employed Solutions, and ADU Construction loans across California.",
  },
  {
    category: "Getting Funded",
    question: "What are Capital Direct Funding's interest rates?",
    answer:
      "Rates start at 8.50% and vary by program and risk profile. Fix & Flip, Bridge, Cash-Out Refinance, and Self-Employed loans start from 9.99%; Ground-Up Construction and Probate & Estate loans from 10.99%; Foreclosure & Bankruptcy Recovery from 11.99%. ADU construction loans range from 9.5% to 11%.",
  },
  {
    category: "Getting Funded",
    question: "What is the loan range?",
    answer:
      "Our loan amounts range from $50,000 to $5,000,000 depending on the program. ADU construction loans range from $60,000 to $300,000 per unit.",
  },
  {
    category: "Eligibility",
    question: "What is the minimum credit score required?",
    answer:
      "We are an asset-based lender, meaning we focus primarily on the property and deal structure rather than credit scores. We specialize in scenarios where borrowers may not meet conventional credit requirements, including post-bankruptcy and foreclosure situations.",
  },
  {
    category: "Eligibility",
    question: "Can self-employed borrowers get a loan without tax returns?",
    answer:
      "Yes. We offer bank statement programs and simplified documentation for self-employed borrowers and business owners who don't fit conventional income documentation requirements. No tax returns required.",
  },
  {
    category: "Eligibility",
    question: "Does Capital Direct Funding offer ADU construction loans?",
    answer:
      "Yes. We offer ADU construction loans with 75-85% loan-to-cost, rates from 9.5-11%, 12-18 month terms, and milestone-based draws. We specialize in detached ADUs, garage conversions, attached ADUs, and junior ADUs across Los Angeles and Orange County.",
  },
  {
    category: "For Investors",
    question: "How do trust deed investments work?",
    answer:
      "Accredited investors can invest in whole-note, first trust deed positions secured by California real estate. Each investment is individually selected and personally underwritten with conservative loan-to-value ratios. Investors earn monthly interest payments with yields between 8.95% and 10.95%.",
  },
  {
    category: "For Investors",
    question: "What returns can trust deed investors earn?",
    answer:
      "Accredited investors in our whole-note, first trust deed positions earn monthly interest with yields between 8.95% and 10.95%, secured by California real estate at conservative loan-to-value ratios.",
  },
  {
    category: "About CDF",
    question: "Is Capital Direct Funding a direct lender or a broker?",
    answer:
      "Capital Direct Funding is a direct private lender. Because we lend our own and our investors' capital, there are no committee approvals or bureaucratic delays — you work directly with the decision-makers.",
  },
  {
    category: "About CDF",
    question: "What areas does Capital Direct Funding serve?",
    answer:
      "We fund loans throughout the state of California, with particular expertise in Los Angeles County, Orange County, San Bernardino County, Riverside County, and San Diego County.",
  },
  {
    category: "About CDF",
    question: "Where is Capital Direct Funding located?",
    answer:
      "Our office is located at 100 N Citrus St, Suite 530, West Covina, CA 91791. We are licensed under California DRE# 01885595 and NMLS# 1159831.",
  },
];

export const TEAM_HEADLINE =
  "We believe in strengthening our team\u2019s personal performance through constantly educating ourselves on win-win opportunities, while providing clients with the resources they need to reach their goals.";

export const TEAM_MEMBERS = [
  {
    name: "Frank Williams",
    title: "Founder & Investor Relations",
    bio: "With over 30 years of experience in the mortgage banking industry, Frank Williams has established himself as the venerable choice for even today\u2019s savviest buyers. Originally, Frank began his real estate finance career in 1990 with an emphasis in Wholesale Mortgage Banking. His expertise and excellent customer service allowed him to grow quickly within the industry. In less than 10 years, Frank helped secure over $500 million of funding for various projects, as an Area Sales Manager for New Century Mortgage Corp. from 1998\u20132007.\n\nThrough his unparalleled success and tireless work ethic, Frank has developed a track record for bringing his client\u2019s dreams to fruition. So, it came as little surprise that, just as many mortgage professionals were exiting the industry after the market credit crisis of 2007, Frank saw it as an opportunity to expand. Shortly thereafter, he founded Capital Direct Funding in 2009.\n\nBy believing not only in building for his family\u2019s future, but for his client\u2019s as well, Frank utilized his vast experience to create a truly unique financing option. Today, as Co-founder and Divisional Manager, Frank has made Capital Direct Funding into California\u2019s premier private lending firm through his continued commitment to help his clients succeed.",
    image: "/images/team-frank.png",
    linkedin: null,
    email: null,
    featured: true,
  },
  {
    name: "Juan Williams",
    title: "Account Executive",
    image: "/images/team-juan.png",
    linkedin: null,
    email: "juanw@capitaldf.com",
    featured: false,
  },
  {
    name: "Karla Banuelos",
    title: "Account Manager",
    image: "/images/team-karla.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Erendira Cabrera",
    title: "Operations Support Specialist",
    image: "/images/team-erendira.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Lisbeth Batista",
    title: "Executive Administrator",
    image: "/images/team-lisbeth.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Rochelle Ramirez",
    title: "Sales & Underwriting Assistant",
    image: "/images/team-rochelle.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Cindy Adlawan",
    title: "Executive Operations Coordinator",
    image: "/images/team-cindy.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Kristle Alcuizar",
    title: "Administrative Research Specialist",
    image: "/images/team-kristle.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Sas Brosas",
    title: "Front Desk Coordinator",
    image: "/images/team-sas.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Ivy Verdad",
    title: "Financial Operations Manager",
    image: "/images/team-ivy.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Christine Olino",
    title: "Client Relations Assistant",
    image: "/images/team-christine.png",
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Juan N. Williams",
    title: "Broker of Record",
    image: null,
    linkedin: null,
    email: null,
    featured: false,
  },
  {
    name: "Francisco Williams",
    title: "Commercial Loan Broker",
    image: "/images/team-francisco-cdf.png",
    linkedin: "https://www.linkedin.com/in/fwilliamsca/",
    email: null,
    featured: false,
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Capital Direct Funding got us closed in 5 days when our bank fell through at the last minute. They understood the deal, moved fast, and made it happen. We've done multiple deals with them since.",
    author: "Real Estate Investor",
    location: "Los Angeles, CA",
    result: "Closed in 5 days",
  },
  {
    quote:
      "As a self-employed borrower, getting financing was a nightmare until I found CDF. They looked at the property and my track record, not just my tax returns. Simple, straightforward process.",
    author: "Property Developer",
    location: "Orange County, CA",
    result: "Funded without tax returns",
  },
  {
    quote:
      "I've been investing in their trust deed offerings for over three years. Consistent returns, complete transparency, and the team is always available to answer questions. Highly recommend.",
    author: "Accredited Investor",
    location: "San Diego, CA",
    result: "3+ years investing",
  },
  {
    quote:
      "We had a complicated probate situation and every other lender passed. CDF understood the process, worked with our attorney, and funded the deal. True specialists in complex situations.",
    author: "Estate Attorney Referral",
    location: "Pasadena, CA",
    result: "Probate loan funded",
  },
];

export const FOOTER_LINKS = {
  borrowers: [
    { label: "Fix & Flip Loans", href: "/borrowers#fix-and-flip" },
    { label: "Bridge Loans", href: "/borrowers#bridge-loans" },
    { label: "Construction Loans", href: "/borrowers#construction" },
    { label: "Cash-Out Refinance", href: "/borrowers#cash-out" },
    { label: "Probate & Estate", href: "/borrowers#probate" },
  ],
  investors: [
    { label: "How It Works", href: "/investors#how-it-works" },
    { label: "Returns & Security", href: "/investors#returns" },
    { label: "Get Started", href: "/investors#get-started" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Loan Process", href: "/loan-process" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};
