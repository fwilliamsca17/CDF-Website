import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { LOAN_PAGES } from "@/lib/loan-pages";
import { LOCATION_PAGES } from "@/lib/location-pages";
import { SITE_URL } from "@/lib/constants";
import { lastModifiedFor } from "@/lib/content-dates";

/**
 * Static routes that aren't generated from a data file. Program and county
 * pages are derived from LOAN_PAGES / LOCATION_PAGES below, so adding one
 * there can't silently miss the sitemap.
 *
 * lastModified comes from CONTENT_UPDATED — never `new Date()`. See
 * src/lib/content-dates.ts for why.
 */
const STATIC_ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/borrowers", changeFrequency: "weekly", priority: 0.9 },
  { path: "/investors", changeFrequency: "weekly", priority: 0.9 },
  // ADU is a bespoke route, NOT part of LOAN_PAGES (which has 7 entries) —
  // it will not be picked up by the loanPages map below. Keep it here.
  { path: "/adu-loans", changeFrequency: "weekly", priority: 0.9 },
  { path: "/rates-and-terms", changeFrequency: "weekly", priority: 0.9 },
  { path: "/property-strategy-review", changeFrequency: "weekly", priority: 0.9 },
  { path: "/professionals", changeFrequency: "weekly", priority: 0.9 },
  { path: "/professionals/attorneys", changeFrequency: "monthly", priority: 0.8 },
  { path: "/professionals/cpas", changeFrequency: "monthly", priority: 0.8 },
  { path: "/professionals/mortgage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/professionals/real-estate", changeFrequency: "monthly", priority: 0.8 },
  { path: "/loan-process", changeFrequency: "monthly", priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/team", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    // "/" would yield a trailing slash that the homepage canonical tag
    // (bare SITE_URL) doesn't carry — keep the two byte-identical.
    url: route.path === "/" ? SITE_URL : `${SITE_URL}${route.path}`,
    lastModified: lastModifiedFor(route.path),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dedicated loan program pages — primary acquisition surface.
  const loanPages: MetadataRoute.Sitemap = LOAN_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: lastModifiedFor(page.path),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // County service-area pages.
  const locationPages: MetadataRoute.Sitemap = LOCATION_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: lastModifiedFor(page.path),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Posts already carry real publish dates — use them, don't override.
  const blogPosts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}${post.path}`,
    lastModified: post.date ? new Date(post.date) : lastModifiedFor("/blog"),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticPages, ...loanPages, ...locationPages, ...blogPosts];
}
