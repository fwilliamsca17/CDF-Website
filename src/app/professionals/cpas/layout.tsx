import type { Metadata } from "next";
import { PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "For CPAs & Tax Advisors — Trust Deed Investments & Client Lending",
  description:
    "Help your clients deploy capital into tax-advantaged trust deed investments at 8.95–10.95% yields. SDIRA, Solo 401(k), and entity-structured real estate lending through Capital Direct Funding.",
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
  alternates: { canonical: "https://capitaldf.com/professionals/cpas" },
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
      {children}
    </>
  );
}
