import type { Metadata } from "next";
import { PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "For Real Estate Agents — Close More Deals With Fast Private Funding",
  description:
    "Capital Direct Funding helps real estate agents close more transactions. Fix & flip financing, buyer backup lending, bridge loans, and probate funding — all closing in as few as 7 days across California.",
  keywords: [
    "real estate agent hard money lender",
    "realtor referral private lender",
    "fix and flip lender agent",
    "buyer backup financing",
    "bridge loan real estate agent",
    "probate listing lender",
    "fast close lender California",
    "real estate agent referral partner",
  ],
  openGraph: {
    title: "For Real Estate Agents — Capital Direct Funding",
    description:
      "Close more deals. Fast private funding for your buyers, sellers, and investors. 7-day closings across California.",
  },
  alternates: {
    canonical: "https://capitaldf.com/professionals/real-estate",
  },
};

export default function RealEstateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageSeo
        title="For Real Estate Agents — Close More Deals With Fast Private Funding"
        description="Capital Direct Funding partners with real estate agents on fix & flip, bridge, probate, and buyer backup lending scenarios across California."
        path="/professionals/real-estate"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Professionals", path: "/professionals" },
          { name: "Real Estate Agents", path: "/professionals/real-estate" },
        ]}
        speakable={["h1", "h2", ".eyebrow + h2 + p"]}
      />
      {children}
    </>
  );
}
