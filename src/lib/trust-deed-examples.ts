export type TrustDeedExample = {
  slug: string;
  title: string;
  city: string;
  state: string;
  propertyType: string;
  lienPosition: "1st" | "2nd";
  status: "Available" | "Partially placed" | "Assignment pending";
  fundingStructure: "Direct-funded" | "Originated / assignment" | "Fund retained interest";
  loanAmount: number;
  availableInvestment: number;
  minimumInvestment: number;
  netInvestorRatePct: number;
  servicingSpreadPct: number;
  ltvPct: number;
  termMonths: number;
  paymentType: string;
  prepay: string;
  occupancy: string;
  useOfFunds: string;
  exitStrategy: string;
  collateralSummary: string;
  investorSummary: string;
  gatedDetails: string[];
  documents: string[];
  timeline: Array<{ label: string; value: string }>;
};

export const TRUST_DEED_EXAMPLES: TrustDeedExample[] = [
  {
    slug: "sample-city-1st-td-bridge",
    title: "1st Trust Deed Bridge Loan",
    city: "Sample City",
    state: "CA",
    propertyType: "Single-family residence",
    lienPosition: "1st",
    status: "Available",
    fundingStructure: "Originated / assignment",
    loanAmount: 500000,
    availableInvestment: 250000,
    minimumInvestment: 50000,
    netInvestorRatePct: 10,
    servicingSpreadPct: 1,
    ltvPct: 58,
    termMonths: 12,
    paymentType: "Monthly interest-only",
    prepay: "6-month minimum interest",
    occupancy: "Non-owner occupied",
    useOfFunds: "Business-purpose bridge financing before refinance.",
    exitStrategy: "Conventional refinance after borrower completes stabilization.",
    collateralSummary:
      "Sample California residential collateral with conservative leverage and a first lien position.",
    investorSummary:
      "Investors review a loan-level package and may receive an assignment of beneficial interest after approval and funding through escrow.",
    gatedDetails: [
      "Exact property address",
      "Borrower/entity details",
      "Appraisal or valuation package",
      "Title report and recorded instruments",
    ],
    documents: [
      "Loan summary",
      "Preliminary title package",
      "Assignment package",
      "Servicing agreement",
    ],
    timeline: [
      { label: "Underwriting", value: "Complete" },
      { label: "Assignment package", value: "Draft" },
      { label: "Funding target", value: "Sample date" },
      { label: "First payment", value: "Monthly after funding" },
    ],
  },
  {
    slug: "sample-town-multifamily-note",
    title: "Multifamily Trust Deed Participation",
    city: "Sample Town",
    state: "CA",
    propertyType: "Small multifamily",
    lienPosition: "1st",
    status: "Partially placed",
    fundingStructure: "Direct-funded",
    loanAmount: 875000,
    availableInvestment: 325000,
    minimumInvestment: 75000,
    netInvestorRatePct: 10.5,
    servicingSpreadPct: 1,
    ltvPct: 61,
    termMonths: 18,
    paymentType: "Monthly interest-only",
    prepay: "No prepay after month 6",
    occupancy: "Income property",
    useOfFunds: "Business-purpose refinance and capital improvements.",
    exitStrategy: "Sale or debt-service-coverage refinance after improvements.",
    collateralSummary:
      "Sample income property collateral with a first deed of trust and monthly interest remittance.",
    investorSummary:
      "CDF funded the loan directly and may assign interests to approved investors while retaining servicing.",
    gatedDetails: [
      "Rent roll and operating history",
      "Borrower background",
      "Property-level inspection notes",
      "Insurance and title details",
    ],
    documents: [
      "Loan summary",
      "Payment schedule",
      "Recorded deed of trust",
      "Assignment documents",
    ],
    timeline: [
      { label: "Loan funded", value: "Complete" },
      { label: "Investor assignment", value: "Open" },
      { label: "Servicing", value: "CDF retained" },
      { label: "Payment cadence", value: "Monthly" },
    ],
  },
  {
    slug: "sample-bay-fund-retained-interest",
    title: "Fund Retained Interest Example",
    city: "Sample Bay",
    state: "CA",
    propertyType: "Mixed-use property",
    lienPosition: "1st",
    status: "Assignment pending",
    fundingStructure: "Fund retained interest",
    loanAmount: 650000,
    availableInvestment: 150000,
    minimumInvestment: 50000,
    netInvestorRatePct: 9.75,
    servicingSpreadPct: 1,
    ltvPct: 55,
    termMonths: 24,
    paymentType: "Monthly interest-only",
    prepay: "Open after month 9",
    occupancy: "Commercial / residential mix",
    useOfFunds: "Business-purpose acquisition bridge.",
    exitStrategy: "Borrower plans refinance after lease-up period.",
    collateralSummary:
      "Sample mixed-use collateral where the CDF fund retains an interest alongside assigned investor interests.",
    investorSummary:
      "The investor-facing rate is net. CDF discloses the 1% servicing spread while tracking fund interests internally.",
    gatedDetails: [
      "Fund retained interest schedule",
      "Borrower private notes",
      "Lease-up support documents",
      "Final assignment recording package",
    ],
    documents: [
      "Loan summary",
      "Fund interest memo",
      "Servicing ledger",
      "Assignment checklist",
    ],
    timeline: [
      { label: "Origination", value: "CDF / fund" },
      { label: "Assignment", value: "Pending" },
      { label: "Fund interest", value: "Retained" },
      { label: "Servicing spread", value: "1.00%" },
    ],
  },
];

export const SAMPLE_PORTFOLIO_ACCOUNTS = [
  {
    accountName: "Sample Investor C - Personal",
    accountType: "Individual",
    positions: [
      {
        loanRef: "SYN-LN-1",
        title: "1st Trust Deed Bridge Loan",
        city: "Sample City",
        netRatePct: 10,
        ownershipPct: 50,
        investedPrincipal: 150000,
        currentBalance: 147500,
        nextPaymentDate: "Sample monthly cycle",
        status: "Current",
        documents: ["Assignment", "Servicing agreement", "Monthly statement"],
        payments: [
          { date: "Sample Month 1", interest: 1250, principal: 0, balance: 147500 },
          { date: "Sample Month 2", interest: 1250, principal: 0, balance: 147500 },
          { date: "Sample Month 3", interest: 1250, principal: 0, balance: 147500 },
        ],
      },
    ],
  },
  {
    accountName: "Forge Trust Co. CFBO Sample Investor C IRA #99001",
    accountType: "Self-directed IRA",
    positions: [
      {
        loanRef: "SYN-LN-2",
        title: "Multifamily Trust Deed Participation",
        city: "Sample Town",
        netRatePct: 10.5,
        ownershipPct: 100,
        investedPrincipal: 300000,
        currentBalance: 295000,
        nextPaymentDate: "Sample monthly cycle",
        status: "Current",
        documents: ["Recorded deed of trust", "Custodian direction letter", "Monthly statement"],
        payments: [
          { date: "Sample Month 1", interest: 2625, principal: 0, balance: 295000 },
          { date: "Sample Month 2", interest: 2625, principal: 0, balance: 295000 },
          { date: "Sample Month 3", interest: 2625, principal: 0, balance: 295000 },
        ],
      },
    ],
  },
];

export function getTrustDeedExample(slug: string) {
  return TRUST_DEED_EXAMPLES.find((loan) => loan.slug === slug);
}
