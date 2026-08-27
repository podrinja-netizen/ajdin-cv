"use client";

import { ArrowUpRight } from "lucide-react";
import { Section, SectionTitle } from "@/components/primitives/section";
import { DrawRule, Reveal } from "@/components/primitives/reveal";
import { BrowserFrame } from "@/components/primitives/browser-frame";
import { SYSTEMS } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";
import { cn } from "@/lib/utils";

export function Systems() {
  const { t, lang } = useLang();

  return (
    <Section id="systems" index={t.systems.index}>
      <SectionTitle>{t.systems.title}</SectionTitle>
      <Reveal as="p" delay={0.08} className="measure mt-6 leading-relaxed text-muted">
        {t.systems.lead}
      </Reveal>

      <div className="mt-16 flex flex-col gap-16 md:mt-24 md:gap-28">
        {SYSTEMS.map((system, i) => {
          const copy = lang === "en" ? system.en : system.bs;
          const flip = i % 2 === 1;
          const href = "url" in system ? system.url : `https://${system.domain}`;
          const liveUrl = "live" in system && system.live ? href : null;

          return (
            <article
              key={system.domain}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <Reveal className={cn("order-2", flip ? "md:order-2" : "md:order-1")}>
                <p className="label text-accent">{copy.kicker}</p>

                <h3 className="display mt-4 text-[clamp(1.5rem,3vw,2.25rem)]">
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline inline-flex items-center gap-2"
                  >
                    {system.domain}
                    <ArrowUpRight aria-hidden className="size-4 text-muted" />
                  </a>
                </h3>

                <p className="measure mt-5 leading-relaxed text-muted">{copy.body}</p>

                {copy.stat && (
                  <>
                    <DrawRule className="mt-7" />
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                      {copy.stat}
                    </p>
                  </>
                )}
              </Reveal>

              <div className={cn("order-1", flip ? "md:order-1" : "md:order-2")}>
                <BrowserFrame
                  src={system.shot}
                  liveUrl={liveUrl}
                  alt={lang === "en" ? system.shotAlt.en : system.shotAlt.bs}
                  domain={system.domain}
                  pendingLabel={t.systems.pending}
                  tilt={flip ? 1.4 : -1.4}
                />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
