import type { Metadata } from "next";
import { LoanProductsSchema, PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Private Money Loans — Fix & Flip, Bridge, Construction, Probate | California",
  description:
    "Private money loans for California real estate. Fix & flip, bridge, ground-up construction, cash-out refinance, probate, foreclosure recovery, self-employed, and ADU financing. Close in as few as 7 days. Rates from 8.50%. No bank qualifying.",
  keywords: [
    "private money loan California",
    "hard money lender California",
    "fix and flip loan",
    "bridge loan California",
    "construction loan private lender",
    "probate loan California",
    "foreclosure bail out loan",
    "self employed real estate loan",
    "no tax return mortgage",
    "cash out refinance private lender",
    "hard money loan Los Angeles",
    "private lender Orange County",
    "fast close hard money",
    "asset based lender California",
    "ADU construction loan",
    "real estate rehab loan",
  ],
  openGraph: {
    title: "Private Money Loans — Capital Direct Funding",
    description:
      "8 loan programs for California real estate. Fix & flip, bridge, construction, probate, and more. Close in 7 days.",
  },
  alternates: { canonical: "https://capitaldf.com/borrowers" },
};

export default function BorrowersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoanProductsSchema />
      <PageSeo
        title="Private Money Loan Programs for California Real Estate"
        description="Private money loans for California real estate: fix & flip, bridge, construction, cash-out refinance, probate, foreclosure recovery, self-employed, and ADU financing."
        path="/borrowers"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Borrowers", path: "/borrowers" },
        ]}
        speakable={["h1", "h2", ".eyebrow + h2 + p"]}
      />
      {children}
    </>
  );
}
