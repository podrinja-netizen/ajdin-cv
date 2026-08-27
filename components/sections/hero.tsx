"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { IDENTITY } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t } = useLang();
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 24, filter: "blur(8px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  const meta = [
    { k: t.hero.meta.based, v: t.hero.meta.basedValue },
    { k: t.hero.meta.disciplines, v: t.hero.meta.disciplinesValue },
    { k: t.hero.meta.status, v: t.hero.meta.statusValue, live: true },
  ];

  return (
    <header className="relative flex min-h-svh flex-col overflow-hidden pb-28 pt-20 md:pb-24 md:pt-24">
      <div className="shell">
        <motion.div
          {...rise(0.05)}
          className="flex items-center gap-3 font-mono text-label uppercase text-muted"
        >
          <span
            aria-hidden
            className="grid size-6 place-items-center border border-line text-[10px] text-accent"
          >
            A
          </span>
          <span className="hidden sm:inline">{IDENTITY.name}</span>
          <span className="text-line">/</span>
          <span>
            {IDENTITY.city} · {IDENTITY.age}
          </span>
        </motion.div>
      </div>

      <div className="shell mt-auto grid w-full gap-12 pt-16 lg:grid-cols-12 lg:items-end lg:gap-8">
        {/* the name, at architectural scale */}
        <div className="lg:col-span-8">
          <motion.h1
            {...rise(0.12)}
            className="display text-[clamp(3.25rem,11vw,8.5rem)]"
          >
            <span className="block">Ajdin</span>
            <span className="block">Podrinja</span>
          </motion.h1>

          <motion.div
            aria-hidden
            className="mt-7 h-px w-full origin-left bg-accent"
            initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={reduced ? { duration: 0 } : { duration: 1.1, delay: 0.4, ease: EASE }}
          />

          <motion.div
            {...rise(0.3)}
            className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <p className="label text-ink">{t.hero.role}</p>
            <p className="max-w-[46ch] text-[0.975rem] leading-relaxed text-muted sm:text-right">
              {t.hero.claim}
            </p>
          </motion.div>
        </div>

        {/* the meta rail */}
        <motion.dl
          {...rise(0.42)}
          className="border-t border-line lg:col-span-3 lg:col-start-10 lg:border-t-0"
        >
          {meta.map((row) => (
            <div
              key={row.k}
              className="flex items-baseline justify-between gap-6 border-b border-line py-3 lg:flex-col lg:items-start lg:justify-start lg:gap-1.5 lg:border-b-0 lg:border-t lg:py-3.5"
            >
              <dt className="label">{row.k}</dt>
              <dd className="flex items-center gap-2 text-sm text-ink">
                {row.live && (
                  <span aria-hidden className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                )}
                {row.v}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        {...rise(0.6)}
        className="shell mt-12 hidden items-center gap-2 text-muted md:flex"
      >
        <ArrowDown className="size-3" aria-hidden />
        <span className="label">{t.hero.scroll}</span>
      </motion.div>
    </header>
  );
}
