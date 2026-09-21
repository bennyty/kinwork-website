import type { ReactNode } from "react";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={`font-serif leading-none text-ink inline-flex flex-col ${className ?? ""}`}
    >
      <span className="text-xl">Kin</span>
      <span className="text-xl">work</span>
    </span>
  );
}

/**
 * The roofline from the business card: two slopes meeting at a peak, a
 * chimney on the right slope, a dot beneath the peak. Sits on top of the
 * frame border; the cream fill masks the border underneath it.
 */
function Roof() {
  return (
    <svg
      viewBox="0 0 240 62"
      aria-hidden
      className="absolute -top-[46px] left-1/2 -translate-x-1/2 w-[240px]"
    >
      <polygon points="30,60 120,12 210,60" fill="var(--cream)" stroke="none" />
      <polyline
        points="30,60 120,12 210,60"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect
        x="150"
        y="16"
        width="12"
        height="24"
        fill="var(--cream)"
        stroke="var(--terracotta)"
        strokeWidth="3"
      />
      <circle cx="120" cy="34" r="5" fill="var(--terracotta)" />
    </svg>
  );
}

export function HouseFrame({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative mt-12 ${className ?? ""}`}>
      <div className="border-[3px] border-terracotta rounded-sm">
        {children}
      </div>
      <Roof />
    </div>
  );
}

/** Arched door with a doorknob dot, from the card back. */
export function Door({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 84" aria-hidden className={className}>
      <path
        d="M4 84 V36 a28 28 0 0 1 56 0 V84"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="4"
      />
      <circle cx="50" cy="52" r="4" fill="var(--terracotta)" />
    </svg>
  );
}

/** Window flower box with hanging stems, from the card back. */
export function FlowerBox({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 40" aria-hidden className={className}>
      {[20, 48, 76, 104, 132, 160].map((x, i) => (
        <g key={x}>
          <line
            x1={x}
            y1={0}
            x2={x}
            y2={8 + (i % 2) * 6}
            stroke="var(--terracotta)"
            strokeWidth="2.5"
          />
          <circle
            cx={x}
            cy={11 + (i % 2) * 6}
            r="3.5"
            fill="var(--terracotta)"
          />
        </g>
      ))}
      <rect
        x="6"
        y="24"
        width="168"
        height="14"
        rx="4"
        fill="none"
        stroke="var(--terracotta)"
        strokeWidth="2.5"
      />
      <line
        x1="16"
        y1="31"
        x2="164"
        y2="31"
        stroke="var(--terracotta)"
        strokeWidth="2.5"
        strokeDasharray="7 6"
      />
    </svg>
  );
}
