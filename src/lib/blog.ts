import fs from "fs";
import path from "path";

export interface BlogPost {
  /** Original Squarespace path, preserved verbatim (e.g. /blog/2026/4/13/slug). */
  path: string;
  /** Path segments after /blog/, for the [...slug] catch-all route. */
  slug: string[];
  title: string;
  /** ISO date string from the original Article JSON-LD. */
  date: string;
  author: string;
  /** Local /blog/images/... path (images were pulled off the Squarespace CDN). */
  heroImage: string;
  excerpt: string;
  /** Article body HTML with images rewritten to local paths. */
  bodyHtml: string;
}

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  const file = path.join(process.cwd(), "src/content/blog/posts.json");
  const posts = JSON.parse(fs.readFileSync(file, "utf-8")) as BlogPost[];
  // Newest first; posts with a missing date sink to the bottom.
  posts.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  cache = posts;
  return posts;
}

export function getPostBySlug(slug: string[]): BlogPost | undefined {
  const target = "/blog/" + slug.join("/");
  return getAllPosts().find((p) => p.path === target);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
