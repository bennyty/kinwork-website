import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPost, formatDate } from "@/lib/content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await getPost(slug);
  return { title: meta.title, description: meta.summary };
}

export default async function PostPage({
  params,
}: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const { meta, html } = await getPost(slug);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 mt-16">
      <Link
        href="/journal"
        className="text-sm text-terracotta hover:text-terracotta-dark transition-colors"
      >
        ← All case studies &amp; articles
      </Link>
      <p className="mt-8 text-xs uppercase tracking-wide text-terracotta">
        {meta.kind === "case-study" ? "Case study" : "Article"}
        {meta.client ? ` · ${meta.client}` : ""}
      </p>
      <h1 className="font-serif text-4xl mt-2 text-ink">{meta.title}</h1>
      <p className="mt-3 text-sm text-ink-soft">{formatDate(meta.date)}</p>
      <div className="mx-0 mt-6 mb-8 h-[3px] w-16 bg-copper" />
      <div
        className="prose-kinwork text-ink-soft"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
