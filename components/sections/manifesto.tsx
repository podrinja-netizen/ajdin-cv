"use client";

import Image from "next/image";
import { Section } from "@/components/primitives/section";
import { WordReveal } from "@/components/primitives/word-reveal";
import { DrawRule, Reveal } from "@/components/primitives/reveal";
import { useLang } from "@/components/providers/lang-provider";
import { IDENTITY } from "@/lib/content";

export function Manifesto() {
  const { t } = useLang();

  return (
    <Section index={t.manifesto.index} srTitle={t.manifesto.index}>
      <WordReveal
        text={t.manifesto.lead}
        className="display max-w-[18ch] text-[clamp(2rem,5vw,4rem)]"
      />

      <DrawRule className="my-12 md:my-16" />

      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        {/* the portrait — a real face, framed like everything else on the page */}
        <Reveal className="md:col-span-3">
          <figure className="max-w-[180px]">
            <div className="relative aspect-square overflow-hidden border border-line">
              <Image
                src={IDENTITY.portrait}
                alt={`${IDENTITY.name} — ${t.hero.role}`}
                fill
                sizes="180px"
                className="object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
              />
            </div>
            <figcaption className="label mt-3 leading-[1.7]">
              <span className="block text-ink">{IDENTITY.name}</span>
              <span className="block">{IDENTITY.city}</span>
            </figcaption>
          </figure>
        </Reveal>

        {t.manifesto.body.map((paragraph, i) => (
          <Reveal
            as="p"
            key={i}
            delay={0.08 + i * 0.08}
            className="text-[1.05rem] leading-relaxed text-muted md:col-span-4"
          >
            {i === 1 ? (
              paragraph
            ) : (
              <Highlight text={paragraph} word={t.manifesto.highlight} />
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** Accents exactly one word in the block. */
function Highlight({ text, word }: { text: string; word: string }) {
  const index = text.toLowerCase().lastIndexOf(word.toLowerCase());
  if (index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-accent">{text.slice(index, index + word.length)}</span>
      {text.slice(index + word.length)}
    </>
  );
}
