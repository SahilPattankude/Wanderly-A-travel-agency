import { client, isSanityConfigured } from "@/sanity/lib/client";

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children: { _key: string; _type: "span"; text: string; marks?: string[] }[];
  markDefs?: { _key: string; _type: string; href?: string }[];
  style?: string;
  listItem?: "bullet" | "number";
  level?: number;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  readTime: string;
  featuredDestination: string;
  body: PortableTextBlock[];
};

const postFields = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  metaTitle,
  metaDescription,
  category,
  readTime,
  featuredDestination,
  body
`;

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured || !client) return [];
  return client.fetch(`*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {${postFields}}`);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSanityConfigured || !client) return null;
  return client.fetch(`*[_type == "post" && slug.current == $slug][0] {${postFields}}`, { slug });
}
