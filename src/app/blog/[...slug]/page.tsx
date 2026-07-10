import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";
import RelatedPrograms from "@/components/blog/RelatedPrograms";

const BASE = "https://capitaldf.com";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${BASE}${post.path}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      ...(post.heroImage ? { images: [`${BASE}${post.heroImage}`] } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${BASE}${post.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    ...(post.date ? { datePublished: post.date } : {}),
    ...(post.heroImage ? { image: `${BASE}${post.heroImage}` } : {}),
    author: { "@type": "Organization", name: "Capital Direct Funding" },
    publisher: { "@id": `${BASE}/#organization` },
    mainEntityOfPage: url,
    isPartOf: { "@id": `${BASE}/#website` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        <header className="hero-atmosphere relative overflow-hidden pb-12 pt-32">
          <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
          <div className="hairline-champagne absolute inset-x-0 bottom-0 h-px" />
          <div className="relative z-10 max-container section-padding">
            <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ivory/50">
              <Link href="/" className="transition-colors hover:text-champagne-300">
                Home
              </Link>
              <span className="mx-2 text-ivory/30">/</span>
              <Link href="/blog" className="transition-colors hover:text-champagne-300">
                Blog
              </Link>
            </nav>
            {post.date && (
              <p className="mb-3 text-label font-semibold uppercase tracking-[0.22em] text-champagne-300">
                {formatDate(post.date)}
              </p>
            )}
            <h1 className="max-w-4xl font-heading text-heading-xl font-bold leading-[1.1] text-ivory md:text-display">
              {post.title}
            </h1>
          </div>
        </header>

        <div className="bg-light section-padding-y">
          <div className="max-container section-padding">
            <div
              className="blog-prose mx-auto max-w-3xl"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            />

            <RelatedPrograms
              title={post.title}
              excerpt={post.excerpt ?? ""}
              bodyHtml={post.bodyHtml}
            />

            <div className="mx-auto mt-14 max-w-3xl border-t border-cdf/10 pt-8">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cdf transition-colors hover:text-champagne-600"
                >
                  <ArrowLeft className="h-4 w-4" />
                  All articles
                </Link>
                <Link href="/contact" className="btn-cdf group">
                  Talk to a lender
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
