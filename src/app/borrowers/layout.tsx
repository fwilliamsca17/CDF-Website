import type { Metadata } from "next";
import { LoanProductsSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Loan Programs for Real Estate Borrowers — Fix & Flip, Bridge, Construction",
  description:
    "Private lending solutions for California real estate investors. Fix & flip, bridge loans, construction, cash-out refinance, probate, foreclosure recovery, and self-employed financing. Close in as few as 7 days. Rates from 8.50%.",
  openGraph: {
    title: "Borrower Loan Programs — Capital Direct Funding",
    description:
      "7 loan programs for California real estate. Fix & flip, bridge, construction, probate, and more. Close in 7 days.",
  },
  alternates: { canonical: "https://capitaldf.com/borrowers" },
};

export default function BorrowersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoanProductsSchema />
      {children}
    </>
  );
}
