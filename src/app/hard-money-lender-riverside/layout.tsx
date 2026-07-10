import type { Metadata } from "next";
import LocationPageLayout from "@/components/templates/LocationPageLayout";
import { buildLocationPageMetadata } from "@/lib/location-pages";

const PATH = "/hard-money-lender-riverside";

export const metadata: Metadata = buildLocationPageMetadata(PATH);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LocationPageLayout path={PATH}>{children}</LocationPageLayout>;
}
