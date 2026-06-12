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
    facebook: "https://www.facebook.com/p/Capital-Direct-Funding-Inc-100068992066992/",
    instagram: "https://www.instagram.com/capital_df/",
    youtube: "https://www.youtube.com/@capitaldirectfundinginc.1382",
    yelp: "https://www.yelp.com/biz/capital-direct-funding-west-covina-2",
  },
};

export type NavChild = {
  label: string;
  href: string;
  description: string;
};

export type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href: string; children: NavChild[] };

export const NAV_ITEMS: NavItem[] = [
  { label: "Borrowers", href: "/borrowers" },
  { label: "Investors", href: "/investors" },
  {
    label: "Professionals",
    href: "/professionals",
    children: [
      { label: "Attorneys", href: "/professionals/attorneys", description: "Probate, estate, bankruptcy & family law" },
      { label: "CPAs & Tax Advisors", href: "/professionals/cpas", description: "Tax-advantaged strategies for your clients" },
      { label: "Mortgage Professionals", href: "/professionals/mortgage", description: "Non-QM solutions for your pipeline" },
      { label: "Real Estate Agents", href: "/professionals/real-estate", description: "Close more deals, faster" },
    ],
  },
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
    title: "You Select Every Deal",
    description:
      "No blind pools. Review individual loan opportunities and choose which to fund based on property, borrower, LTV, and terms.",
    icon: "Eye",
  },
  {
    title: "First Trust Deed Position",
    description:
      "Your name is on the recorded deed of trust \u2014 the senior lien on the property. The same security instrument a bank holds.",
    icon: "Shield",
  },
  {
    title: "Monthly Interest Income",
    description:
      "Earn 8.95\u201310.95% annual yields paid monthly. Passive income backed by California real property, not market performance.",
    icon: "TrendingUp",
  },
  {
    title: "No Fund Fees or Lock-ups",
    description:
      "No management fees, no performance fees, no redemption gates. Your return is the stated rate on the note. Capital returns at maturity.",
    icon: "DollarSign",
  },
  {
    title: "IRA & 401(k) Compatible",
    description:
      "Invest through self-directed IRAs, Solo 401(k)s, trusts, or entities. We coordinate directly with your custodian for funding and payoff.",
    icon: "PiggyBank",
  },
  {
    title: "Personally Underwritten",
    description:
      "Francisco and Frank personally review every loan. Independent appraisals, title insurance, and escrow-managed disbursements on every deal.",
    icon: "Handshake",
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
      "A trust deed investment is a loan you make to a real estate borrower, secured by a recorded first-position lien on their property. CDF originates and underwrites the loan, then presents it to you with full deal details. If you fund the deal, a first trust deed is recorded in your name at the county recorder's office. You earn monthly interest for the life of the loan, and your principal is returned through escrow when the borrower pays off.",
  },
  {
    category: "For Investors",
    question: "What returns can trust deed investors earn?",
    answer:
      "Accredited investors in our whole-note, first trust deed positions earn monthly interest with yields between 8.95% and 10.95%, secured by California real estate at conservative loan-to-value ratios.",
  },
  {
    category: "For Investors",
    question: "What is the minimum investment amount?",
    answer:
      "CDF offers whole-note investments, meaning you fund the entire loan. There are no fractional pools or participation certificates. Loan amounts typically range from $100,000 to $5,000,000, so the minimum investment corresponds to the size of the individual loan opportunity.",
  },
  {
    category: "For Investors",
    question: "Can I invest through a self-directed IRA or Solo 401(k)?",
    answer:
      "Yes. Trust deed investments work with self-directed IRAs (through custodians like Forge Trust, Provident Trust Group, or The Entrust Group), Solo 401(k) plans, living trusts, family trusts, LLCs, and corporations. CDF coordinates directly with your custodian or plan administrator for funding and payoff.",
  },
  {
    category: "For Investors",
    question: "How is my investment secured?",
    answer:
      "Every investment is secured by a recorded first trust deed — the senior lien position on the property. This is the same security instrument a bank holds on a mortgage. In addition, every loan includes an independent appraisal, title insurance, borrower personal guarantees, and escrow-managed disbursements.",
  },
  {
    category: "For Investors",
    question: "How is CDF different from a real estate fund or crowdfunding platform?",
    answer:
      "CDF offers direct investment: you review each loan individually, choose which to fund, and hold the recorded deed of trust in your name (or entity). There are no blind pools, no management fees, no lock-up periods, and no platform intermediary. You own the actual note, not a fund share or participation certificate.",
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
  professionals: [
    { label: "Attorneys", href: "/professionals/attorneys" },
    { label: "CPAs & Tax Advisors", href: "/professionals/cpas" },
    { label: "Mortgage Professionals", href: "/professionals/mortgage" },
    { label: "Real Estate Agents", href: "/professionals/real-estate" },
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
