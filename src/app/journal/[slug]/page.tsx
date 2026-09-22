import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate, isDev } from "@/lib/content";

// Static export requires at least one route for a dynamic segment. When no
// posts are published, fall back to a sentinel slug that 404s instead of
// failing the build.
const NO_POSTS_SLUG = "__no-posts__";

export function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) return [{ slug: NO_POSTS_SLUG }];
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.meta.title, description: post.meta.summary };
}

export default async function PostPage({
  params,
}: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const { meta, html } = post;

  return (
    <article className="mx-auto w-full max-w-3xl px-6 mt-16">
      <Link
        href="/journal"
        className="bench-link text-sm text-terracotta hover:text-terracotta-dark transition-colors"
      >
        ← All case studies &amp; articles
      </Link>
      {isDev && !meta.published && (
        <p className="mt-6 inline-block rounded bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Draft — not published
        </p>
      )}
      <h1 className="font-serif text-4xl mt-2 text-ink">{meta.title}</h1>
      <p className="mt-8 uppercase tracking-wide text-terracotta">
        {meta.kind === "case-study" ? "Case study" : "Article"}
        {meta.client ? ` - ${meta.client}` : ""}
      </p>
      <p className="mt-3 text-sm text-ink-soft">{formatDate(meta.date)}</p>
      <div className="mx-0 mt-6 mb-8 h-[3px] w-16 bg-copper" />
      <div
        className="prose-kinwork text-ink-soft"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
