import type { Metadata } from "next";
import { PageSeo, PartnerPageSchema } from "@/components/JsonLd";
import { buildPartnerPageMetadata, getPartnerPage } from "@/lib/partner-pages";

const PATH = "/professionals/financial-advisors";

export const metadata: Metadata = buildPartnerPageMetadata(PATH);

export default function Layout({ children }: { children: React.ReactNode }) {
  const page = getPartnerPage(PATH)!;
  return (
    <>
      <PageSeo
        title={page.seo.title}
        description={page.seo.description}
        path={PATH}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Professionals", path: "/professionals" },
          { name: page.name, path: PATH },
        ]}
        speakable={["h1", ".faq-answer"]}
      />
      <PartnerPageSchema
        path={PATH}
        name={"Financial advisor partnership"}
        audienceType={page.audienceType}
        description={page.seo.description}
        faqs={page.faqs}
      />
      {children}
    </>
  );
}
