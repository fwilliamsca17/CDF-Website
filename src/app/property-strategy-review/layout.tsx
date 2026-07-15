import type { Metadata } from "next";
import { PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Property Strategy Review — What Is the Best Path for Your Property?",
  description:
    "A confidential, 2-minute review of your property situation. Compare financing, sale, and timing options for California property owners — five questions, no obligation.",
  openGraph: {
    title: "Property Strategy Review — Capital Direct Funding",
    description:
      "Five questions, two minutes. See which options fit your property, your timeline, and your goals.",
  },
  alternates: { canonical: "https://capitaldf.com/property-strategy-review" },
};

export default function PropertyStrategyReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageSeo
        title="Property Strategy Review"
        description="A confidential five-question review that helps California property owners compare financing and sale options."
        path="/property-strategy-review"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Property Strategy Review", path: "/property-strategy-review" },
        ]}
      />
      {children}
    </>
  );
}
