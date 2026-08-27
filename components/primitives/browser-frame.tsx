"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * A thin browser chrome around a real screenshot, tilted and parallaxed on
 * scroll. If the screenshot has not been dropped in yet, the frame holds its
 * shape and says so rather than showing a broken image.
 */
export function BrowserFrame({
  src,
  alt,
  domain,
  pendingLabel,
  tilt = -1.4,
  className,
}: {
  src: string | null;
  alt: string;
  domain: string;
  pendingLabel: string;
  tilt?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt, tilt * -0.4]);

  const showImage = src && !failed;

  return (
    <motion.div
      ref={ref}
      style={reduced ? undefined : { y, rotate }}
      className={cn(
        "overflow-hidden rounded-lg border border-line bg-elevated",
        className,
      )}
    >
      {/* chrome bar */}
      <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
          <span className="size-2 rounded-full bg-line" />
        </span>
        <span className="ml-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {domain}
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full bg-surface">
        {showImage ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center px-6 text-center">
            <span className="label text-muted">{pendingLabel}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
