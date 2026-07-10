import { PageSeo, LocationPageSchema } from "@/components/JsonLd";
import { getLocationPage } from "@/lib/location-pages";

/**
 * Shared layout body for county location pages: emits the WebPage +
 * breadcrumb graph and the county's Service + FAQPage schema.
 */
export default function LocationPageLayout({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const page = getLocationPage(path);
  if (!page) return <>{children}</>;

  return (
    <>
      <PageSeo
        title={page.seo.title}
        description={page.seo.description}
        path={path}
        crumbs={[
          { name: "Home", path: "/" },
          { name: `Hard Money Lender ${page.name}`, path },
        ]}
        speakable={["h1", "h2"]}
      />
      <LocationPageSchema path={path} />
      {children}
    </>
  );
}
