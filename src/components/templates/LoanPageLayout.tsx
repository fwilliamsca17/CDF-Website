import { PageSeo, LoanPageSchema } from "@/components/JsonLd";
import { getLoanPage } from "@/lib/loan-pages";

/**
 * Shared layout body for dedicated loan program pages: emits the WebPage +
 * breadcrumb graph and the program's LoanOrCredit + FAQPage schema.
 */
export default function LoanPageLayout({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const page = getLoanPage(path);
  if (!page) return <>{children}</>;

  return (
    <>
      <PageSeo
        title={page.seo.title}
        description={page.seo.description}
        path={path}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Loan Programs", path: "/borrowers" },
          { name: page.eyebrow, path },
        ]}
        speakable={["h1", "h2"]}
      />
      <LoanPageSchema path={path} />
      {children}
    </>
  );
}
