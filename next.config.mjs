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
 * closest equivalent. The blog stays on Squarespace at blog.capitaldf.com
 * until the 146 posts are migrated into this site.
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
  // Partner-audience pages
  { source: "/real-estate", destination: "/contact", permanent: true },
  { source: "/professionals", destination: "/contact", permanent: true },
  { source: "/mortgages", destination: "/contact", permanent: true },
  // Loan-product landing pages
  { source: "/construction-loans", destination: "/borrowers", permanent: true },
  { source: "/probate-lending", destination: "/borrowers", permanent: true },
  { source: "/purchase-loan", destination: "/borrowers", permanent: true },
  { source: "/rehab-loans", destination: "/borrowers", permanent: true },
  { source: "/rehab-financing-loan", destination: "/borrowers", permanent: true },
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
