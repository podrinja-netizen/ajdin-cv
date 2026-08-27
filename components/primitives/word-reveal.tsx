"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll-driven word-by-word reveal. Words sit at low opacity and resolve as
 * the block crosses the viewport. Under reduced motion the whole block is
 * simply legible from the start.
 */
export function WordReveal({
  text,
  className,
  highlight,
}: {
  text: string;
  className?: string;
  /** One word or phrase per block gets the accent — never more. */
  highlight?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");
  const normalized = (w: string) => w.replace(/[.,—:;]/g, "").toLowerCase();
  // `highlight` may be a phrase — every word in it gets the accent.
  const accented = new Set(
    (highlight ?? "").toLowerCase().split(" ").filter(Boolean),
  );

  if (reduced) {
    return (
      <p ref={ref} className={cn(className)}>
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={accented.has(normalized(word)) ? "text-accent" : undefined}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1.6) / words.length]}
          accent={accented.has(normalized(word))}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const blur = useTransform(progress, range, ["blur(5px)", "blur(0px)"]);

  return (
    <span className="relative mr-[0.28em] inline-block whitespace-nowrap">
      <motion.span
        style={{ opacity, filter: blur }}
        className={accent ? "text-accent" : undefined}
      >
        {children}
      </motion.span>
    </span>
  );
}
