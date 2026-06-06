import type { Metadata } from "next";
import { PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "ADU Construction Loans — 75–85% LTC, Fast Close, LA & Orange County",
  description:
    "Finance your ADU construction project with Capital Direct Funding. 75–85% LTC, 9.5–11% rates, 12–18 month terms, milestone-based draws. Serving Los Angeles and Orange County homeowners and investors. $60K–$300K per ADU.",
  keywords: [
    "ADU construction loan",
    "accessory dwelling unit financing",
    "ADU financing California",
    "construction loan Los Angeles",
    "ADU lender Orange County",
    "garage conversion financing",
    "JADU loan",
    "ADU builder financing",
  ],
  openGraph: {
    title: "ADU Construction Loans — Capital Direct Funding",
    description:
      "75–85% LTC ADU construction loans. Fast close, milestone-based draws. LA & Orange County.",
  },
  alternates: { canonical: "https://capitaldf.com/adu-loans" },
};

export default function ADULayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSeo
        title="ADU Construction Loans — Los Angeles & Orange County"
        description="ADU construction loans with 75-85% loan-to-cost, rates 9.5-11%, 12-18 month terms, and milestone-based draws across Los Angeles and Orange County."
        path="/adu-loans"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "ADU Construction Loans", path: "/adu-loans" },
        ]}
      />
      {children}
    </>
  );
}
