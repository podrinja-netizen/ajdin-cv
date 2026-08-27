"use client";

import { Play } from "lucide-react";
import { Section, SectionTitle } from "@/components/primitives/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { TIKTOKS } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";

export function AiContent() {
  const { t } = useLang();

  return (
    <Section index={t.ai.index}>
      <div className="grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:col-span-6">
          <SectionTitle>{t.ai.title}</SectionTitle>
          <Reveal as="p" delay={0.08} className="measure mt-6 leading-relaxed text-muted">
            {t.ai.body}
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-4 md:col-span-6 md:gap-6" stagger={0.08}>
          {TIKTOKS.map((url, i) => (
            <RevealItem key={url}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex aspect-[9/16] flex-col justify-between border border-line bg-elevated p-4 transition-colors duration-300 hover:border-muted md:p-5"
              >
                <span className="label">{String(i + 1).padStart(2, "0")}</span>

                <span
                  aria-hidden
                  className="grid size-12 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover:border-accent group-hover:text-accent md:size-14"
                >
                  <Play className="size-4 translate-x-px fill-current" />
                </span>

                <span className="flex flex-col gap-1">
                  <span className="label text-ink">{t.ai.watch}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                    {t.ai.videoLabel}
                  </span>
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
