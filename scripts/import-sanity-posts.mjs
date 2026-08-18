import fs from "node:fs";
import path from "node:path";
import { createClient } from "@sanity/client";

// Helper to manually parse .env if it exists
if (fs.existsSync(".env")) {
  const envContent = fs.readFileSync(".env", "utf8");
  envContent.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let val = match[2] || "";
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      process.env[match[1]] = val.trim();
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before importing posts.");
}

const client = createClient({ projectId, dataset, apiVersion: "2026-08-13", token, useCdn: false });
const postsDirectory = path.join(process.cwd(), "content", "blogs");
const valueFor = (source, key) => source.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?\\s*$`, "m"))?.[1]?.trim() ?? "";
const key = () => Math.random().toString(36).slice(2, 14);

function markdownToBlocks(content) {
  return content.trim().split("\n\n").flatMap((section) => {
    if (section.startsWith("# ")) return [];
    const lines = section.split("\n");
    const heading = section.match(/^(#{2,3}) (.+)$/);
    const list = lines.every((line) => /^(- |\d+\. )/.test(line));
    if (heading) return [{ _key: key(), _type: "block", style: heading[1].length === 2 ? "h2" : "h3", children: [{ _key: key(), _type: "span", text: heading[2] }] }];
    if (list) return lines.map((line) => ({ _key: key(), _type: "block", style: "normal", listItem: line.startsWith("- ") ? "bullet" : "number", level: 1, children: [{ _key: key(), _type: "span", text: line.replace(/^(- |\d+\. )/, "") }] }));
    return [{ _key: key(), _type: "block", style: "normal", children: [{ _key: key(), _type: "span", text: section }] }];
  });
}

for (const fileName of fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"))) {
  const file = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const [, frontmatter = "", content = ""] = file.split(/^---\s*$/m, 3);
  const slug = valueFor(frontmatter, "slug");
  await client.createOrReplace({
    _id: `post-${slug}`,
    _type: "post",
    title: valueFor(frontmatter, "title"), slug: { _type: "slug", current: slug },
    excerpt: valueFor(frontmatter, "excerpt"), metaTitle: valueFor(frontmatter, "metaTitle"),
    metaDescription: valueFor(frontmatter, "metaDescription"), category: valueFor(frontmatter, "category"),
    readTime: valueFor(frontmatter, "readTime"), featuredDestination: valueFor(frontmatter, "featuredDestination"),
    focusKeyword: valueFor(frontmatter, "focusKeyword"), publishedAt: new Date().toISOString(), body: markdownToBlocks(content),
  });
  console.log(`Imported ${slug}`);
}
