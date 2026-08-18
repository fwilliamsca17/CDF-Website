import type { Metadata } from "next";
import { AduLoanSchema, PageSeo } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { ADU_SEO } from "@/lib/adu-page";

export const metadata: Metadata = {
  title: ADU_SEO.title,
  description: ADU_SEO.description,
  keywords: [
    "private money ADU loans Los Angeles",
    "hard money ADU loan",
    "private money ADU financing Los Angeles requirements",
    "ADU construction loan Los Angeles",
    "hard money ADU construction",
    "garage conversion financing Los Angeles",
    "JADU loan private money",
    "ADU financing California private lender",
  ],
  openGraph: {
    title: ADU_SEO.title,
    description: ADU_SEO.description,
  },
  alternates: { canonical: `${SITE_URL}/adu-loans` },
};

export default function ADULayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSeo
        title={ADU_SEO.title}
        description={ADU_SEO.description}
        path="/adu-loans"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Private Money ADU Loans", path: "/adu-loans" },
        ]}
        speakable={["h1", ".adu-lede", ".faq-answer"]}
      />
      <AduLoanSchema />
      {children}
    </>
  );
}
