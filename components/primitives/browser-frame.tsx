"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn, shotUrl } from "@/lib/utils";

/**
 * A thin browser chrome around a screenshot, tilted and parallaxed on scroll.
 *
 * `src` is a local screenshot (the admin panels). `live` instead pulls a
 * current screenshot of the site itself, for the campaign platforms where
 * there is no back office to show. With neither, the frame holds its shape and
 * says so rather than showing a broken image.
 */
export function BrowserFrame({
  src,
  liveUrl,
  alt,
  domain,
  pendingLabel,
  tilt = -1.4,
  priority = false,
  className,
}: {
  src?: string | null;
  /** Pull a current screenshot of this URL when there is no local `src`. */
  liveUrl?: string | null;
  alt: string;
  domain: string;
  pendingLabel: string;
  tilt?: number;
  priority?: boolean;
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
        {/* the domain reads underneath, so a slow or failed shot is never blank */}
        <span className="absolute inset-0 grid place-items-center px-6 text-center">
          <span className="label text-muted">
            {src || liveUrl ? domain : pendingLabel}
          </span>
        </span>

        {src && !failed && (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            className="object-cover object-top"
            onError={() => setFailed(true)}
          />
        )}

        {!src && liveUrl && !failed && (
          /* eslint-disable-next-line @next/next/no-img-element --
             Microlink 302-redirects to the real screenshot and the Next image
             optimizer cannot follow that. */
          <img
            src={shotUrl(liveUrl)}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
      </div>
    </motion.div>
  );
}
