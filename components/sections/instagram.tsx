"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionTitle } from "@/components/primitives/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { INSTAGRAM, IDENTITY } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";

/**
 * A quiet strip of real posts. Greyscale by default like the portrait in the
 * About section, so five colour photographs cannot hijack a page that has
 * spent the whole scroll being restrained; colour arrives on hover.
 *
 * Horizontally scrollable below md, a five-column grid above it.
 */
export function Instagram() {
  const { t, lang } = useLang();

  if (!INSTAGRAM.length) return null;

  return (
    <Section index={t.instagram.index}>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <SectionTitle>{t.instagram.title}</SectionTitle>

        <Reveal delay={0.1}>
          <a
            href={IDENTITY.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex items-center gap-2 font-mono text-label uppercase text-muted transition-colors hover:text-ink"
          >
            {t.instagram.follow}
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </div>

      <RevealGroup
        as="ul"
        stagger={0.06}
        className="-mx-6 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2 md:mx-0 md:mt-16 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
      >
        {INSTAGRAM.map((post) => (
          <RevealItem
            as="li"
            key={post.url}
            className="w-[62vw] shrink-0 snap-start sm:w-[40vw] md:w-auto"
          >
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-line bg-elevated transition-colors duration-300 group-hover:border-muted">
                <Image
                  src={post.image}
                  alt={lang === "en" ? post.en : post.bs}
                  fill
                  sizes="(max-width: 768px) 62vw, 18vw"
                  className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
