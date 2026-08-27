"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Section, SectionTitle } from "@/components/primitives/section";
import { Reveal } from "@/components/primitives/reveal";
import { useLang } from "@/components/providers/lang-provider";

export function Timeline() {
  const { t } = useLang();
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="timeline" index={t.timeline.index}>
      <SectionTitle>{t.timeline.title}</SectionTitle>

      <ol ref={ref} className="relative mt-14 md:mt-20">
        {/* the rail, drawn in as the reader descends */}
        <span
          aria-hidden
          className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-line md:block"
        >
          <motion.span
            className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
            style={reduced ? { scaleY: 1 } : { scaleY }}
          />
        </span>

        {t.timeline.items.map((item) => (
          <li key={`${item.year}-${item.org}`} className="md:pl-10">
            <Reveal className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <div className="md:col-span-2">
                <span className="label text-ink">{item.year}</span>
              </div>

              <div className="md:col-span-10">
                <h3 className="display text-[clamp(1.35rem,2.6vw,1.9rem)]">
                  {item.org}
                </h3>
                <p className="mt-1.5 text-sm text-accent">{item.role}</p>
                <p className="measure mt-4 leading-relaxed text-muted">{item.body}</p>

                <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
