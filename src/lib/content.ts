import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentDir = path.join(process.cwd(), "content", "journal");

// gray-matter parses unquoted YAML dates into Date objects; quoted ones stay strings.
function toIsoDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.slice(0, 10);
  return "";
}

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  kind: "case-study" | "article";
  summary: string;
  client?: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(contentDir, file), "utf8"));
      return toMeta(slug, data);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(contentDir, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return { meta: toMeta(slug, data), html: processed.toString() };
}

function toMeta(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: toIsoDate(data.date),
    kind: data.kind === "case-study" ? "case-study" : "article",
    summary: typeof data.summary === "string" ? data.summary : "",
    client: typeof data.client === "string" ? data.client : undefined,
  };
}

export function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
