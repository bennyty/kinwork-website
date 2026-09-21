import type { Metadata } from "next";
import Link from "next/link";
import { FlowerBox } from "@/components/house";
import { getAllPosts, formatDate } from "@/lib/content";

export const metadata: Metadata = {
  title: "Case studies & articles",
  description:
    "Case studies and articles from Kinwork on building bespoke software for small businesses.",
};

export default function JournalPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 mt-16">
      <FlowerBox className="h-9 w-auto mb-5" />
      <h1 className="font-serif text-4xl text-ink">From the window box</h1>
      <p className="mt-3 text-lg text-ink-soft">
        Case studies from the businesses we&apos;ve worked with, and articles
        on building software that fits the way you work.
      </p>
      <div className="mt-12 space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/journal/${post.slug}`}
            className="group block border-b border-copper/40 pb-8"
          >
            <p className="text-xs uppercase tracking-wide text-terracotta">
              {post.kind === "case-study" ? "Case study" : "Article"}
              {post.client ? ` · ${post.client}` : ""}
              {!post.published && (
                <span className="ml-2 rounded bg-red-600 px-2 py-0.5 font-bold text-white">
                  Draft
                </span>
              )}
            </p>
            <h2 className="font-serif text-2xl mt-2 text-ink group-hover:text-terracotta transition-colors">
              {post.title}
            </h2>
            <p className="mt-2 text-ink-soft leading-relaxed">{post.summary}</p>
            <p className="mt-3 text-sm text-ink-soft">{formatDate(post.date)}</p>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-ink-soft">Nothing planted here yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
