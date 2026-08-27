"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { shotUrl } from "@/lib/utils";

/**
 * The live screenshot that trails the cursor across the web directory.
 * Desktop only: it needs a fine pointer and it is pure enhancement — every row
 * is a plain link without it.
 */
export function CursorPreview({
  domains,
  activeIndex,
  enabled,
}: {
  domains: readonly string[];
  activeIndex: number | null;
  enabled: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // the lerp — a soft, heavily damped follow rather than a hard lock
  const sx = useSpring(x, { stiffness: 140, damping: 20, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 20, mass: 0.6 });

  // Once a row has been hovered its screenshot stays mounted, so coming back
  // to it is instant instead of re-fetching.
  const [warmed, setWarmed] = useState<number[]>([]);

  useEffect(() => {
    if (activeIndex === null) return;
    setWarmed((prev) =>
      prev.includes(activeIndex) ? prev : [...prev, activeIndex],
    );
  }, [activeIndex]);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  const open = activeIndex !== null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          opacity: open ? 1 : 0,
          scale: open ? 1 : 0.96,
          filter: open ? "blur(0px)" : "blur(6px)",
        }}
        initial={false}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[220px] w-[352px] -translate-y-1/2 translate-x-8 overflow-hidden rounded-md border border-line bg-elevated"
      >
        {/* the domain sits underneath, so a slow or failed shot still reads */}
        <span className="absolute inset-0 grid place-items-center px-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {activeIndex !== null ? domains[activeIndex] : null}
        </span>

        {warmed.map((i) => (
          /* eslint-disable-next-line @next/next/no-img-element --
             Microlink 302-redirects to the real screenshot and the Next image
             optimizer cannot follow that; these are decorative previews. */
          <img
            key={domains[i]}
            src={shotUrl(domains[i])}
            alt=""
            width={352}
            height={220}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.dataset.failed = "true";
            }}
            className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200 data-[failed=true]:hidden"
            style={{ opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
