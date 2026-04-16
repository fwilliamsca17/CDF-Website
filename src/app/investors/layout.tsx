import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust Deed Investments for Accredited Investors — 8.95%–10.95% Yields",
  description:
    "Earn consistent returns with whole-note, first trust deed investments secured by California real estate. Yields from 8.95% to 10.95%. Conservative LTV ratios, monthly interest payments, and complete transparency.",
  openGraph: {
    title: "Invest in Trust Deeds — Capital Direct Funding",
    description:
      "Whole-note first trust deed investments. 8.95%–10.95% yields secured by California real estate.",
  },
  alternates: { canonical: "https://capitaldf.com/investors" },
};

export default function InvestorsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
