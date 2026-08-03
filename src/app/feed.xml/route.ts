import { getAllPosts } from "@/lib/blog";
import { SITE_URL, SITE_CONFIG } from "@/lib/constants";

/**
 * RSS 2.0 feed — discovery surface for AI crawlers, aggregators, and
 * readers. Statically generated at build time (the blog only changes on
 * deploy). Capped at the 30 newest posts; the sitemap carries the full
 * archive.
 */
export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts()
    .filter((p) => p.date)
    .slice(0, 30);

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}${p.path}`;
      return [
        "    <item>",
        `      <title>${escapeXml(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(p.date).toUTCString()}</pubDate>`,
        `      <description>${escapeXml(p.excerpt || "")}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_CONFIG.name)} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Private lending strategy, hard money insights, and California real estate guidance from Capital Direct Funding.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
