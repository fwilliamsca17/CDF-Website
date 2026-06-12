import type { Metadata } from "next";
import { PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "For Mortgage Professionals — Non-QM & Hard-to-Place Loan Solutions",
  description:
    "Don't lose the deal. Capital Direct Funding funds the loans your conventional lender can't close — self-employed, credit challenges, time-sensitive situations. Close in 7 days across California.",
  keywords: [
    "mortgage broker referral partner",
    "non QM lender referral",
    "hard money lender broker",
    "self employed loan referral",
    "hard to place loan California",
    "loan officer referral partner",
    "bridge loan referral",
    "private money broker partner",
  ],
  openGraph: {
    title: "For Mortgage Professionals — Capital Direct Funding",
    description:
      "Non-QM solutions for your pipeline. Fund the deals your conventional lender declines. 7-day closings across California.",
  },
  alternates: { canonical: "https://capitaldf.com/professionals/mortgage" },
};

export default function MortgageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageSeo
        title="For Mortgage Professionals — Non-QM & Hard-to-Place Solutions"
        description="Capital Direct Funding partners with mortgage brokers and loan officers on non-QM, self-employed, and hard-to-place loan scenarios across California."
        path="/professionals/mortgage"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Professionals", path: "/professionals" },
          { name: "Mortgage Professionals", path: "/professionals/mortgage" },
        ]}
        speakable={["h1", "h2", ".eyebrow + h2 + p"]}
      />
      {children}
    </>
  );
}
