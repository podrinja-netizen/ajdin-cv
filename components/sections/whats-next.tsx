"use client";

import { WordReveal } from "@/components/primitives/word-reveal";
import { Reveal } from "@/components/primitives/reveal";
import { useLang } from "@/components/providers/lang-provider";

/** The one full-screen movement. No icons, no bullets — just the sentence. */
export function WhatsNext() {
  const { t } = useLang();

  return (
    <section className="border-t border-line">
      <div className="shell flex min-h-[85svh] flex-col justify-center py-28 md:py-40">
        <h2 className="sr-only">{t.next.index}</h2>
        <Reveal as="p" className="label" aria-hidden>
          {t.next.index}
        </Reveal>

        <Reveal as="p" delay={0.08} className="measure mt-8 leading-relaxed text-muted">
          {t.next.lead}
        </Reveal>

        <WordReveal
          text={t.next.statement}
          highlight={t.next.highlight}
          className="display mt-10 max-w-[16ch] text-[clamp(2.25rem,7vw,5.5rem)]"
        />
      </div>
    </section>
  );
}
