import type { Metadata } from "next";
import { PageSeo, PartnerPageSchema } from "@/components/JsonLd";
import { BESPOKE_PARTNER_FAQS } from "@/lib/partner-pages";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Agent Referrals — Private Money That Closes in 7 Days",
  description:
    "Direct private lender for California agents: rescue funding when financing falls through, investor capital, probate listings. Commissions protected. DRE# 01885595.",
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
    canonical: `${SITE_URL}/professionals/real-estate`,
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
      <PartnerPageSchema
        path="/professionals/real-estate"
        name={BESPOKE_PARTNER_FAQS["/professionals/real-estate"].name}
        audienceType={BESPOKE_PARTNER_FAQS["/professionals/real-estate"].audienceType}
        description={
          "Direct private lender for California agents: rescue funding when financing falls through, investor capital, probate listings. Commissions protected. DRE# 01885595."
        }
        faqs={BESPOKE_PARTNER_FAQS["/professionals/real-estate"].faqs}
      />
      {children}
    </>
  );
}
