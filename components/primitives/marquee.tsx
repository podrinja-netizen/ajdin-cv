"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A single continuous strip of tool names. Not a carousel — nothing here is
 * content you can miss; it is a texture that reads at a glance. It pauses on
 * hover and becomes a plain wrapped list under reduced motion.
 */
export function Marquee({
  items,
  duration = 46,
  reverse = false,
  className,
}: {
  items: readonly string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
        {items.map((item) => (
          <li key={item} className="label text-muted">
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const track = [...items, ...items];

  return (
    <div
      className={cn("group relative w-full overflow-hidden", className)}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
        aria-hidden
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="label whitespace-nowrap text-muted">
            {item}
          </span>
        ))}
      </div>
      {/* the same list, once, for assistive tech */}
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
