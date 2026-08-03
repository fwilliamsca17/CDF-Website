import type { Metadata } from "next";
import { PageSeo, PartnerPageSchema } from "@/components/JsonLd";
import { BESPOKE_PARTNER_FAQS } from "@/lib/partner-pages";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CPA Referrals — Trust Deed Income & Client Lending",
  description:
    "Direct private lender for CPAs: first trust deed income at 8.95%–10.95% for accredited clients, SDIRA-compatible, plus no-tax-return client lending. DRE# 01885595.",
  keywords: [
    "CPA real estate referral",
    "tax advisor trust deed investment",
    "SDIRA trust deed CPA",
    "Solo 401k real estate investment",
    "1031 exchange bridge loan",
    "self employed borrower CPA referral",
    "tax advantaged real estate",
    "CPA referral hard money",
  ],
  openGraph: {
    title: "For CPAs & Tax Advisors — Capital Direct Funding",
    description:
      "Tax-advantaged trust deed investments and private lending solutions for your clients. 8.95–10.95% yields, SDIRA and Solo 401(k) compatible.",
  },
  alternates: { canonical: `${SITE_URL}/professionals/cpas` },
};

export default function CPAsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageSeo
        title="For CPAs & Tax Advisors"
        description="Trust deed investments and private lending solutions for your clients. Tax-advantaged strategies through SDIRA, Solo 401(k), and entity structures."
        path="/professionals/cpas"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Professionals", path: "/professionals" },
          { name: "CPAs & Tax Advisors", path: "/professionals/cpas" },
        ]}
        speakable={["h1", "h2", ".eyebrow + h2 + p"]}
      />
      <PartnerPageSchema
        path="/professionals/cpas"
        name={BESPOKE_PARTNER_FAQS["/professionals/cpas"].name}
        audienceType={BESPOKE_PARTNER_FAQS["/professionals/cpas"].audienceType}
        description={
          "Direct private lender for CPAs: first trust deed income at 8.95%–10.95% for accredited clients, SDIRA-compatible, plus no-tax-return client lending. DRE# 01885595."
        }
        faqs={BESPOKE_PARTNER_FAQS["/professionals/cpas"].faqs}
      />
      {children}
    </>
  );
}
