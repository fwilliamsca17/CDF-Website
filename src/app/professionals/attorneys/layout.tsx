import type { Metadata } from "next";
import { PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "For Attorneys — Probate, Estate, Bankruptcy & Divorce Funding",
  description:
    "Capital Direct Funding partners with California attorneys on probate distributions, post-bankruptcy financing, divorce buyouts, and foreclosure intervention. Close in as few as 7 days.",
  keywords: [
    "probate attorney lender",
    "estate attorney private lender",
    "bankruptcy attorney referral lender",
    "divorce buyout loan",
    "foreclosure attorney referral",
    "hard money lender attorney",
    "probate loan California",
    "estate distribution funding",
  ],
  openGraph: {
    title: "For Attorneys — Capital Direct Funding",
    description:
      "Private funding for your clients' most complex real estate situations. Probate, bankruptcy, divorce, foreclosure — close in 7 days.",
  },
  alternates: { canonical: "https://capitaldf.com/professionals/attorneys" },
};

export default function AttorneysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageSeo
        title="For Attorneys — Probate, Estate, Bankruptcy & Divorce Funding"
        description="Capital Direct Funding partners with attorneys on probate, estate, bankruptcy, and divorce real estate funding across California."
        path="/professionals/attorneys"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Professionals", path: "/professionals" },
          { name: "Attorneys", path: "/professionals/attorneys" },
        ]}
        speakable={["h1", "h2", ".eyebrow + h2 + p"]}
      />
      {children}
    </>
  );
}
