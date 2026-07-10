/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/*
 * 301 map for the Squarespace → Vercel cutover (2026-06-11).
 * Source paths come from the live Squarespace sitemap inventory (168 URLs);
 * every path that would otherwise 404 after the DNS flip is mapped to its
 * closest equivalent. (Blog fully migrated 2026-06-22; blog.capitaldf.com
 * retired and its CNAME removed 2026-07-09.)
 *
 * CAUTION: redirects run BEFORE the filesystem — never map a source path
 * that a real page now occupies, or the page becomes unreachable
 * (/professionals and /construction-loans were shadowed this way).
 */
const squarespaceRedirects = [
  // Homepage variants
  { source: "/welcome", destination: "/", permanent: true },
  { source: "/home", destination: "/", permanent: true },
  // Duplicates / legacy nav paths
  { source: "/borrowers-2", destination: "/borrowers", permanent: true },
  { source: "/contact-1", destination: "/contact", permanent: true },
  { source: "/Company", destination: "/team", permanent: true },
  { source: "/company", destination: "/team", permanent: true },
  // Team bios
  { source: "/francisco-williams", destination: "/team", permanent: true },
  { source: "/frank-williams", destination: "/team", permanent: true },
  // Content pages
  { source: "/adu", destination: "/adu-loans", permanent: true },
  { source: "/success-stories", destination: "/about", permanent: true },
  { source: "/privacy-policy", destination: "/privacy", permanent: true },
  // Partner-audience pages (dedicated professionals pages exist as of
  // 2026-06-17 — /professionals itself is a real page now, do NOT redirect it)
  { source: "/real-estate", destination: "/professionals/real-estate", permanent: true },
  { source: "/mortgages", destination: "/professionals/mortgage", permanent: true },
  // Loan-product landing pages (dedicated program pages exist as of
  // 2026-07-09 — /construction-loans itself is a real page now)
  { source: "/probate-lending", destination: "/probate-loans", permanent: true },
  { source: "/purchase-loan", destination: "/borrowers", permanent: true },
  { source: "/rehab-loans", destination: "/fix-and-flip-loans", permanent: true },
  { source: "/rehab-financing-loan", destination: "/fix-and-flip-loans", permanent: true },
  // Foreclosure content cluster — the NOS lander IS this topic
  {
    source: "/stop-foreclosure-scams",
    destination: "https://sc.capitaldf.com/nos",
    permanent: true,
  },
  { source: "/foreclosure-in-ca", destination: "/faq", permanent: true },
  // NOTE: /blog and /blog/* are now served natively by this site (146 posts
  // migrated in from Squarespace at their original URLs) — no redirect needed.
];

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return squarespaceRedirects;
  },
};

export default nextConfig;
