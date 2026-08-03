import type { Metadata } from "next";
import { PageSeo, PartnerPageSchema } from "@/components/JsonLd";
import { BESPOKE_PARTNER_FAQS } from "@/lib/partner-pages";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Attorney Referrals — Private Lender for Probate & Estates",
  description:
    "Direct private lender for California attorneys: probate distributions, post-bankruptcy funding, divorce buyouts, foreclosure intervention. 7-day closings. DRE# 01885595.",
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
  alternates: { canonical: `${SITE_URL}/professionals/attorneys` },
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
      <PartnerPageSchema
        path="/professionals/attorneys"
        name={BESPOKE_PARTNER_FAQS["/professionals/attorneys"].name}
        audienceType={BESPOKE_PARTNER_FAQS["/professionals/attorneys"].audienceType}
        description={
          "Direct private lender for California attorneys: probate distributions, post-bankruptcy funding, divorce buyouts, foreclosure intervention. 7-day closings. DRE# 01885595."
        }
        faqs={BESPOKE_PARTNER_FAQS["/professionals/attorneys"].faqs}
      />
      {children}
    </>
  );
}
