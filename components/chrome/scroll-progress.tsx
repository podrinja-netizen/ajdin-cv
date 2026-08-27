"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** 2px accent line across the top — the only always-on use of the accent. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      data-scroll-progress
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[65] h-0.5 origin-left bg-accent"
    />
  );
}
