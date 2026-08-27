"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: "-100px" } as const;

/**
 * The one authored entrance, reused everywhere: content rises out of a blur
 * while the hairline beneath it draws itself left to right.
 */
export const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: EASE },
  },
};

const staticVariants: Variants = {
  hidden: { opacity: 1, y: 0, filter: "blur(0px)" },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "ol" | "ul" | "section" | "span" | "p" | "h2" | "h3";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      variants={reduced ? staticVariants : riseVariants}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      transition={{ delay: reduced ? 0 : delay }}
    >
      {children}
    </Tag>
  );
}

/** Parent that staggers its <RevealItem> children by 60ms. */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
  delay = 0,
  as = "div",
}: RevealProps & { stagger?: number }) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        shown: {
          transition: reduced
            ? {}
            : { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: Omit<RevealProps, "delay">) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag className={className} variants={reduced ? staticVariants : riseVariants}>
      {children}
    </Tag>
  );
}

/** A hairline that draws itself from the left when it enters the viewport. */
export function DrawRule({
  className,
  accent = false,
  delay = 0,
  duration = 0.9,
}: {
  className?: string;
  accent?: boolean;
  delay?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={cn("h-px w-full origin-left", accent ? "bg-accent" : "bg-line", className)}
      initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={reduced ? { duration: 0 } : { duration, delay, ease: EASE }}
    />
  );
}
