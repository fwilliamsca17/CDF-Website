import type { Metadata } from "next";
import { TeamSchema, PageSeo } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Meet the Team — Capital Direct Funding Leadership & Staff",
  description:
    "Meet the Capital Direct Funding team. Founded by Frank Williams with Juan Williams as Broker of Record. 12 professionals dedicated to fast, flexible private lending for California real estate.",
  openGraph: {
    title: "Our Team — Capital Direct Funding",
    description:
      "Meet the 12-person team behind Capital Direct Funding. Family-run private lending since 2009.",
  },
  alternates: { canonical: "https://capitaldf.com/team" },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TeamSchema />
      <PageSeo
        title="Meet the Capital Direct Funding Team"
        description="The people behind Capital Direct Funding — founded by Frank Williams, a team dedicated to fast, flexible private lending for California real estate."
        path="/team"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Team", path: "/team" },
        ]}
      />
      {children}
    </>
  );
}
