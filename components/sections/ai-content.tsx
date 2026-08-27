"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { Section, SectionTitle } from "@/components/primitives/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { TIKTOKS } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";

export function AiContent() {
  const { t, lang } = useLang();

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
          {TIKTOKS.map((clip, i) => (
            <RevealItem key={clip.url}>
              <a
                href={clip.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
              >
                {/* the real first frame, 9:16, straight from the post */}
                <div className="relative aspect-[9/16] overflow-hidden border border-line bg-elevated transition-colors duration-300 group-hover:border-muted">
                  <Image
                    src={clip.thumb}
                    alt={lang === "en" ? clip.en : clip.bs}
                    fill
                    sizes="(max-width: 768px) 45vw, 22vw"
                    className="object-cover transition-[transform,filter] duration-500 group-hover:scale-[1.03]"
                  />

                  {/* a scrim so the mono chrome stays legible over any frame */}
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40"
                  />

                  <span className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                      9:16
                    </span>
                  </span>

                  <span
                    aria-hidden
                    className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-[2px] transition-all duration-300 group-hover:border-accent group-hover:text-accent md:size-14"
                  >
                    <Play className="size-4 translate-x-px fill-current" />
                  </span>

                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-3">
                    <span className="line-clamp-2 text-[0.8rem] leading-snug text-white">
                      {lang === "en" ? clip.en : clip.bs}
                    </span>
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/60">
                      {t.ai.watch}
                    </span>
                  </span>
                </div>
              </a>
            </RevealItem>
          ))}
          <Reveal as="p" className="label col-span-2 mt-1">
            {t.ai.videoLabel}
          </Reveal>
        </RevealGroup>
      </div>
    </Section>
  );
}
