import type { Metadata } from "next";
import { PageSeo, PartnerPageSchema } from "@/components/JsonLd";
import { BESPOKE_PARTNER_FAQS } from "@/lib/partner-pages";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Broker Referrals — Private Money for Hard-to-Place Files",
  description:
    "Direct private money lender for California mortgage pros: business-purpose files your investors decline, 7-day closings, relationships protected. DRE# 01885595.",
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
  alternates: { canonical: `${SITE_URL}/professionals/mortgage` },
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
      <PartnerPageSchema
        path="/professionals/mortgage"
        name={BESPOKE_PARTNER_FAQS["/professionals/mortgage"].name}
        audienceType={BESPOKE_PARTNER_FAQS["/professionals/mortgage"].audienceType}
        description={
          "Direct private money lender for California mortgage pros: business-purpose files your investors decline, 7-day closings, relationships protected. DRE# 01885595."
        }
        faqs={BESPOKE_PARTNER_FAQS["/professionals/mortgage"].faqs}
      />
      {children}
    </>
  );
}
