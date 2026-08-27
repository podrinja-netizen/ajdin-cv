"use client";

import { Section } from "@/components/primitives/section";
import { RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { useLang } from "@/components/providers/lang-provider";

/** Deliberately quiet — three lines, no imagery, no icons. */
export function Lifestyle() {
  const { t } = useLang();

  return (
    <Section index={t.life.index} srTitle={t.life.index}>
      <RevealGroup className="grid gap-10 md:grid-cols-3 md:gap-0" stagger={0.07}>
        {t.life.items.map((item) => (
          <RevealItem
            key={item.name}
            className="border-t border-line pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0 md:first:border-l-0 md:first:pl-0"
          >
            <h3 className="label text-ink">{item.name}</h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">{item.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
