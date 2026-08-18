import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getRelatedPosts,
  type PortableTextBlock,
} from "@/sanity/queries";

type PageProps = { params: { slug: string } };

const baseUrl = "https://wanderly-a-travel-agency.vercel.app";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) return {};

  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${baseUrl}/blog/${params.slug}`,
    },
  };
}

function ArticleBody({ blocks }: { blocks: PortableTextBlock[] }) {
  return (
    <div className="space-y-5 text-lg leading-8 text-ink-600">
      {blocks.map((block) => {
        const text = block.children.map((child) => child.text).join("");

        if (block.style === "h2") {
          return (
            <h2
              key={block._key}
              className="pt-7 font-display text-3xl font-semibold leading-tight text-ink-700"
            >
              {text}
            </h2>
          );
        }

        if (block.style === "h3") {
          return (
            <h3
              key={block._key}
              className="pt-4 font-display text-2xl font-semibold leading-tight text-ink-700"
            >
              {text}
            </h3>
          );
        }

        if (block.listItem === "bullet") {
          return (
            <ul key={block._key} className="list-disc pl-6">
              <li>{text}</li>
            </ul>
          );
        }

        if (block.listItem === "number") {
          return (
            <ol key={block._key} className="list-decimal pl-6">
              <li>{text}</li>
            </ol>
          );
        }

        return <p key={block._key}>{text}</p>;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.category, post._id);

  const articleUrl = `${baseUrl}/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}/#article`,
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Wanderly",
      url: baseUrl,
    },
    author: {
      "@type": "Organization",
      name: "Wanderly",
      url: baseUrl,
    },
    articleSection: post.category,
    inLanguage: "en",
  };

  return (
    <main
      id="main-content"
      className="min-h-screen bg-sand-50 px-5 py-16 sm:px-8"
    >
      {/* BlogPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <article className="mx-auto max-w-3xl">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="text-sm font-semibold text-ocean-600 hover:text-sunset-600"
        >
          ← All travel guides
        </Link>

        {/* Article Header */}
        <header className="border-b border-ink-700/10 pb-10 pt-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sunset-600">
            {post.category} · {post.readTime}
          </p>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink-700 sm:text-6xl">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-ink-500">
            {post.excerpt}
          </p>
        </header>

        {/* Article Content */}
        <div className="py-10">
          <ArticleBody blocks={post.body} />
        </div>

        {/* AI Trip Planner CTA */}
        <section className="mt-4 rounded-3xl bg-ocean-700 px-6 py-8 text-center text-white shadow-card sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
            ✨ Plan your trip
          </p>

          <h2 className="mt-2 font-display text-2xl font-semibold sm:text-3xl">
            Ready to create your own itinerary?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
            Use Wanderly AI to create a personalized travel itinerary based on
            your destination, budget, interests, and travel style.
          </p>

          <Link
            href="/ai-planner"
            className="mt-5 inline-flex items-center rounded-2xl bg-white px-6 py-3 font-semibold text-ocean-700 transition hover:bg-sand-50"
          >
            ✨ Plan My Trip with AI
          </Link>
        </section>

        {/* Related Travel Guides */}
        {relatedPosts.length > 0 && (
          <section className="mt-12 border-t border-ink-700/10 pt-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sunset-600">
              Keep exploring
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold text-ink-700">
              More Travel Guides
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost._id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group rounded-2xl border border-ink-700/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-card"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-sunset-600">
                    {relatedPost.category}
                  </p>

                  <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-ink-700 group-hover:text-ocean-600">
                    {relatedPost.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-ink-500">
                    {relatedPost.excerpt}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-ocean-600">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}