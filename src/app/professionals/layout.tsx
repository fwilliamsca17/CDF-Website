import type { Metadata } from "next";
import { PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Professional Referral Partners — Attorneys, CPAs, Mortgage & Real Estate",
  description:
    "Capital Direct Funding partners with attorneys, CPAs, mortgage professionals, and real estate agents across California. Fast private funding solutions for your clients' most complex real estate situations.",
  keywords: [
    "private lender referral partner",
    "attorney referral hard money",
    "CPA real estate referral",
    "mortgage broker referral partner",
    "real estate agent hard money lender",
    "probate attorney lender",
    "trust deed investment referral",
    "private money lender partnership",
    "California referral partner lender",
  ],
  openGraph: {
    title: "Professional Referral Partners — Capital Direct Funding",
    description:
      "Partner with a direct private lender your clients can trust. Fast closings, transparent terms, protected relationships.",
  },
  alternates: { canonical: "https://capitaldf.com/professionals" },
};

export default function ProfessionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageSeo
        title="Professional Referral Partners"
        description="Capital Direct Funding partners with attorneys, CPAs, mortgage professionals, and real estate agents. Fast private funding for your clients' complex situations."
        path="/professionals"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Professionals", path: "/professionals" },
        ]}
        speakable={["h1", "h2", ".eyebrow + h2 + p"]}
      />
      {children}
    </>
  );
}
