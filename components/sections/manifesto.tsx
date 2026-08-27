"use client";

import { Section } from "@/components/primitives/section";
import { WordReveal } from "@/components/primitives/word-reveal";
import { DrawRule, Reveal } from "@/components/primitives/reveal";
import { useLang } from "@/components/providers/lang-provider";

export function Manifesto() {
  const { t } = useLang();

  return (
    <Section index={t.manifesto.index} srTitle={t.manifesto.index}>
      <WordReveal
        text={t.manifesto.lead}
        className="display max-w-[18ch] text-[clamp(2rem,5vw,4rem)]"
      />

      <DrawRule className="my-12 md:my-16" />

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {t.manifesto.body.map((paragraph, i) => (
          <Reveal as="p" key={i} delay={i * 0.08} className="measure text-[1.05rem] leading-relaxed text-muted">
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
