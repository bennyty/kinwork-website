const subject = "Hello Kinwork — let's talk about my workflow";
const body = `Hi Ben,

I run a small business and I'd love to talk about how a custom application could make our work easier.

A little about us:
- What we do:
- Where our workflow slows us down:
- Best way to reach me:

Thanks!`;

const mailto = `mailto:contact@kinwork.us?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export function ContactButton({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <a
        href={mailto}
        className="rounded-full bg-terracotta px-4 py-1.5 text-cream text-sm whitespace-nowrap hover:bg-terracotta-dark transition-colors"
      >
        Contact us
      </a>
    );
  }
  return (
    <a
      href={mailto}
      className="group inline-flex items-center gap-3 rounded-full bg-terracotta px-7 py-3.5 text-cream text-lg shadow-sm hover:bg-terracotta-dark hover:shadow-md transition-all"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
        <path
          d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="15" r="1.4" fill="currentColor" />
      </svg>
      Come say hello
      <span className="opacity-80 text-sm font-normal group-hover:translate-x-0.5 transition-transform">
        →
      </span>
    </a>
  );
}
