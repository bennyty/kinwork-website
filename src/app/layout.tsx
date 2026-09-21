import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Wordmark } from "@/components/house";
import { ContactButton } from "@/components/contact-button";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kinwork — Custom applications and workflow automation",
    template: "%s · Kinwork",
  },
  description:
    "Kinwork works closely with small businesses to learn their workflow and design custom bespoke applications that make them more efficient.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="mx-auto w-full max-w-5xl px-6 py-6 flex items-center justify-between">
          <Link href="/" aria-label="Kinwork home">
            <Wordmark className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/journal"
              className="text-ink-soft hover:text-terracotta transition-colors"
            >
              Case studies &amp; articles
            </Link>
            <ContactButton compact />
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-copper/40 mt-16">
          <div className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between text-sm text-ink-soft">
            <p>
              <span className="font-serif text-ink">Kinwork</span> · Great
              Falls, VA
            </p>
            <p>
              <a
                href="mailto:contact@kinwork.us"
                className="hover:text-terracotta transition-colors"
              >
                contact@kinwork.us
              </a>{" "}
              · kinwork.us
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
