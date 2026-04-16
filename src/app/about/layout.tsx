import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Family-Run Private Lending Since 2009",
  description:
    "Capital Direct Funding is a family-run private lending company founded in 2009. Over $200M deployed across 500+ transactions in California. We specialize in complex lending situations where banks say no.",
  openGraph: {
    title: "About Capital Direct Funding",
    description:
      "Family-run private lending since 2009. Over $200M deployed, 500+ loans funded across California.",
  },
  alternates: { canonical: "https://capitaldf.com/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
