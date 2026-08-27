"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 4);

/** useLayoutEffect warns during SSR; effects never run there anyway. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Counts up once, when it first enters the viewport.
 *
 * The real number is the default: it is what the server renders, what shows
 * with JavaScript disabled, and what a background tab shows when its animation
 * frames are throttled. The count-down-to-zero only happens on a live client
 * that can actually animate, and it happens before the first paint.
 */
export function NumberTicker({
  value,
  suffix = "",
  duration = 1400,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

  const [display, setDisplay] = useState(value);
  const [armed, setArmed] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (reduced || document.hidden) return;
    setDisplay(0);
    setArmed(true);
  }, [reduced]);

  useEffect(() => {
    if (!armed || !inView) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(EASE_OUT(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [armed, inView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
