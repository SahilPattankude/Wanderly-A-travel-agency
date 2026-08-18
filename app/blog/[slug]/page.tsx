import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, type PortableTextBlock } from "@/sanity/queries";

type PageProps = { params: { slug: string } };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${params.slug}` },
    openGraph: { type: "article", title, description, url: `/blog/${params.slug}` },
  };
}

function ArticleBody({ blocks }: { blocks: PortableTextBlock[] }) {
  return (
    <div className="space-y-5 text-lg leading-8 text-ink-600">
      {blocks.map((block) => {
        const text = block.children.map((child) => child.text).join("");
        if (block.style === "h2") return <h2 key={block._key} className="pt-7 font-display text-3xl font-semibold leading-tight text-ink-700">{text}</h2>;
        if (block.style === "h3") return <h3 key={block._key} className="pt-4 font-display text-2xl font-semibold leading-tight text-ink-700">{text}</h3>;
        if (block.listItem === "bullet") return <ul key={block._key} className="list-disc pl-6"><li>{text}</li></ul>;
        if (block.listItem === "number") return <ol key={block._key} className="list-decimal pl-6"><li>{text}</li></ol>;
        return <p key={block._key}>{text}</p>;
      })}
    </div>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main id="main-content" className="min-h-screen bg-sand-50 px-5 py-16 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-semibold text-ocean-600 hover:text-sunset-600">← All travel guides</Link>
        <header className="border-b border-ink-700/10 pb-10 pt-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-sunset-600">{post.category} · {post.readTime}</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink-700 sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-ink-500">{post.excerpt}</p>
        </header>
        <div className="py-10"><ArticleBody blocks={post.body} /></div>
      </article>
    </main>
  );
}
