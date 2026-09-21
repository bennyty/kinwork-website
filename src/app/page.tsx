import Link from "next/link";
import { HouseFrame, Door, FlowerBox } from "@/components/house";
import { ContactButton } from "@/components/contact-button";
import { getAllPosts, formatDate } from "@/lib/content";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero — the front of the card */}
      <HouseFrame className="mt-20">
        <div className="px-8 py-16 sm:px-16 sm:py-20 text-center">
          <h1 className="font-serif text-5xl sm:text-6xl text-ink">Kinwork</h1>
          <div className="mx-auto mt-5 mb-6 h-[3px] w-16 bg-copper" />
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
              <em className="font-serif">working</em> — because the best
              software for your business starts with a relationship, not a
              requirements document.
            </p>
            <p>
              We work closely with small businesses to learn how they actually
              work: the morning routines, the sticky notes, the spreadsheet
              that holds everything together. Then we design bespoke
              applications that fit into that workflow — not the other way
              around — so the tools disappear and the work gets easier.
            </p>
            <p>
              No off-the-shelf compromises. No “change how you operate to suit
              the software.” Just custom applications shaped around the way
              your business already runs, making it more efficient.
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
              title: "We visit",
              text: "We sit with your team and learn the real workflow — the one that never made it into a manual.",
            },
            {
              title: "We design",
              text: "We shape a bespoke application around that workflow, trimming the busywork and keeping what works.",
            },
            {
              title: "We stay kin",
              text: "We stick around as your business grows, tending the software the way you tend the shop.",
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
              Case studies and articles on building software that fits.
            </p>
          </div>
          <Link
            href="/journal"
            className="shrink-0 text-terracotta hover:text-terracotta-dark transition-colors"
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
