import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/blog";
import { PageSeo } from "@/components/JsonLd";

const DESCRIPTION =
  "Insights on private lending, hard money, fix & flip, bridge loans, foreclosure solutions, and the California real estate market from Capital Direct Funding.";

export const metadata: Metadata = {
  title: "Blog — Private Lending & California Real Estate Insights",
  description: DESCRIPTION,
  alternates: { canonical: "https://capitaldf.com/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageSeo
        title="Blog | Capital Direct Funding"
        description={DESCRIPTION}
        path="/blog"
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />

      <section className="hero-atmosphere relative overflow-hidden pb-16 pt-32">
        <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.06]" />
        <div className="hairline-champagne absolute inset-x-0 bottom-0 h-px" />
        <div className="relative z-10 max-container section-padding">
          <p className="mb-3 flex items-center gap-3 text-label font-semibold uppercase tracking-[0.22em] text-champagne-300">
            <span className="h-px w-8 bg-champagne-500/70" />
            Insights
          </p>
          <h1 className="font-heading text-display-lg font-bold leading-[1.05] text-ivory">
            The CDF Blog
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ivory/60">
            Private lending strategy, market updates, and practical guidance for
            California borrowers and investors.
          </p>
        </div>
      </section>

      <section className="bg-light section-padding-y">
        <div className="max-container section-padding">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.path}
                href={post.path}
                className="group flex flex-col overflow-hidden rounded-2xl border border-cdf/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-champagne-400/40 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cdf/5">
                  {post.heroImage ? (
                    <Image
                      src={post.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-cdf">
                      <span className="font-heading text-xl font-bold text-champagne-300/60">
                        CDF
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  {post.date && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-champagne-700">
                      {formatDate(post.date)}
                    </p>
                  )}
                  <h2 className="mb-2 font-heading text-lg font-bold leading-snug text-cdf">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-body">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-4 text-sm font-semibold text-champagne-600">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
