import Link from "next/link";
import { HouseFrame, Door, FlowerBox, Wordmark } from "@/components/house";
import { ContactButton } from "@/components/contact-button";
import { getAllPosts, formatDate } from "@/lib/content";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero — the front of the card */}
      <HouseFrame className="mt-20">
        <div className="px-8 py-16 sm:px-16 sm:py-20 text-center">
          <h1>
            <Wordmark className="mx-auto h-24 w-auto sm:h-32" />
          </h1>
          <div className="mx-auto mt-5 mb-6 h-1 w-16 bg-copper" />
          <p className="font-serif italic text-xl sm:text-2xl text-ink-soft max-w-2xl mx-auto leading-relaxed">
            Custom applications and workflow automation
            <br className="hidden sm:block" /> for more efficient work and a
            better life
          </p>
          <div className="mt-10">
            <ContactButton />
          </div>
        </div>
      </HouseFrame>

      {/* Brand story */}
      <section className="mt-20 grid gap-10 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl text-ink">
            Kinship, put to work.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            <p>
              <span className="text-ink font-medium">Kinwork</span> is a
              portmanteau of <em className="font-serif">kinship</em> and{" "}
              <em className="font-serif">work</em>. We believe that workflow
              improvements for your business starts with a relationship, not a
              requirements document.
            </p>
            <p>
              We work closely with small businesses to learn how they actually
              work. We will learn about the routines, the hard worker that
              manually copies information between inflexible software, the spreadsheet
              that holds everything together. Then we design bespoke
              applications that streamline the workflow and connect the pieces.
            </p>
          </div>
        </div>
        <Door className="hidden sm:block h-40 w-auto justify-self-center" />
      </section>

      {/* How we work */}
      <section className="mt-20">
        <h2 className="font-serif text-3xl text-ink">How we work</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Visit",
              text: "We sit with your team and learn the workflow that makes your business tick — the one that never made it into a manual.",
            },
            {
              title: "Design",
              text: "We shape a bespoke application around that workflow, streamlining your process.",
            },
            {
              title: "Stay kin",
              text: "We are committed to staying in touch and supporting your teams as your business grows and changes.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="border border-copper/50 rounded-sm p-6 bg-cream-deep/40"
            >
              <p className="font-serif text-terracotta text-sm">0{i + 1}</p>
              <h3 className="font-serif text-xl mt-1 text-ink">{step.title}</h3>
              <p className="mt-3 text-ink-soft leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journal preview — the flower box */}
      <section className="mt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <FlowerBox className="h-9 w-auto mb-4" />
            <h2 className="font-serif text-3xl text-ink">
              From the window box
            </h2>
            <p className="mt-2 text-ink-soft">
              Case Studies - where we've built software that flourishes.
            </p>
          </div>
          <Link
            href="/journal"
            className="bench-link shrink-0 text-terracotta hover:text-terracotta-dark transition-colors"
          >
            See all →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/journal/${post.slug}`}
              className="group border border-copper/50 rounded-sm p-6 hover:border-terracotta transition-colors"
            >
              <p className="text-xs uppercase tracking-wide text-terracotta">
                {post.kind === "case-study" ? "Case study" : "Article"}
              </p>
              <h3 className="font-serif text-xl mt-2 text-ink group-hover:text-terracotta transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                {post.summary}
              </p>
              <p className="mt-4 text-xs text-ink-soft">
                {formatDate(post.date)}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
