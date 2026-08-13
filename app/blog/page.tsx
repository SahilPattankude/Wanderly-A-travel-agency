import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Travel Guides | Wanderly",
  description: "Practical destination guides and thoughtful trip-planning advice from Wanderly.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main id="main-content" className="min-h-screen bg-sand-50 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-ocean-600 hover:text-sunset-600">
          ← Back to Wanderly
        </Link>
        <header className="max-w-3xl pt-12 pb-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sunset-600">Travel guides</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink-700 sm:text-6xl">Travel with more intention.</h1>
          <p className="mt-5 text-lg leading-8 text-ink-500">Practical, considered guides to help you spend less time coordinating and more time experiencing a place.</p>
        </header>
        <section aria-label="Travel guide articles" className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.length === 0 && <p className="text-ink-500">Travel guides will appear here once they are published in Sanity.</p>}
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col rounded-3xl border border-ink-700/10 bg-white p-7 shadow-card">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-ocean-600">{post.category}</p>
              <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-ink-700">{post.title}</h2>
              <p className="mt-4 flex-1 leading-7 text-ink-500">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between gap-4 text-sm text-ink-500">
                <span>{post.readTime}</span>
                <Link href={`/blog/${post.slug}`} className="font-bold text-sunset-600 hover:text-sunset-700">Read guide →</Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
