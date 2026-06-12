import type { Metadata } from "next";
import { PageSeo, InvestorHowToSchema, InvestmentProductSchema } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Direct Trust Deed Investment — Whole-Note, First Position, 8.95%–10.95% Yields",
  description:
    "Invest directly in California real estate through whole-note first trust deed positions. You select the deal, own the note, and hold the recorded lien. 8.95%–10.95% annual yields, monthly interest, no fund fees. Available to accredited investors.",
  keywords: [
    "trust deed investment",
    "trust deed investing",
    "first trust deed investment",
    "whole note investment",
    "private money investment",
    "real estate backed investment",
    "accredited investor California",
    "trust deed yields",
    "monthly interest real estate",
    "self directed IRA real estate",
    "solo 401k real estate investment",
    "private lending investment",
    "California trust deed",
    "direct real estate investment",
    "passive real estate income",
  ],
  openGraph: {
    title: "Direct Trust Deed Investment — Capital Direct Funding",
    description:
      "Whole-note first trust deed investments. Select individual deals, own the note directly, earn monthly interest secured by California real estate.",
  },
  alternates: { canonical: "https://capitaldf.com/investors" },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InvestorHowToSchema />
      <InvestmentProductSchema />
      <PageSeo
        title="Direct Trust Deed Investment for Accredited Investors"
        description="Invest directly in whole-note, first trust deed positions secured by California real estate. You select the deal, own the note, and earn monthly interest at 8.95%–10.95% yields."
        path="/investors"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Investors", path: "/investors" },
        ]}
        speakable={["h1", "h2", ".eyebrow + h2 + p"]}
      />
      {children}
    </>
  );
}
