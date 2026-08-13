import { defineArrayMember, defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required().max(80) }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required().max(180) }),
    defineField({ name: "body", title: "Article", type: "array", of: [defineArrayMember({ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Heading 2", value: "h2" }, { title: "Heading 3", value: "h3" }], lists: [{ title: "Bullet", value: "bullet" }, { title: "Numbered", value: "number" }] })], validation: (rule) => rule.required() }),
    defineField({ name: "category", title: "Category", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "featuredDestination", title: "Featured destination", type: "string" }),
    defineField({ name: "readTime", title: "Read time", type: "string", description: 'For example, "7 min read"' }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "metaTitle", title: "SEO title", type: "string", validation: (rule) => rule.required().max(60) }),
    defineField({ name: "metaDescription", title: "SEO description", type: "text", rows: 3, validation: (rule) => rule.required().max(160) }),
    defineField({ name: "focusKeyword", title: "Focus keyword", type: "string" }),
    defineField({ name: "secondaryKeywords", title: "Secondary keywords", type: "array", of: [defineArrayMember({ type: "string" })] }),
  ],
  preview: { select: { title: "title", subtitle: "category" } },
});
