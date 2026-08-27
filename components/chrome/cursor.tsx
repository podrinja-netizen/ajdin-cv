"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, [data-cursor-grow]";

/**
 * A difference-blend dot that replaces the system cursor on fine pointers.
 * Touch devices, coarse pointers and reduced-motion users keep their own.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.35 });

  const [enabled, setEnabled] = useState(false);
  const [grown, setGrown] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const allowed = fine.matches && !calm.matches;
    setEnabled(allowed);
    if (!allowed) return;

    document.documentElement.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as Element | null;
      setGrown(!!target?.closest?.(INTERACTIVE));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      data-cursor
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="block rounded-full bg-white"
        animate={{
          width: grown ? 40 : 10,
          height: grown ? 40 : 10,
          opacity: visible ? 1 : 0,
          x: grown ? -20 : -5,
          y: grown ? -20 : -5,
        }}
        initial={false}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
