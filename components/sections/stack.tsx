"use client";

import { Section, SectionTitle } from "@/components/primitives/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { Marquee } from "@/components/primitives/marquee";
import { useLang } from "@/components/providers/lang-provider";

export function Stack() {
  const { t } = useLang();
  const everything = t.stack.groups.flatMap((g) => g.items);

  return (
    <Section id="stack" index={t.stack.index}>
      <SectionTitle>{t.stack.title}</SectionTitle>

      <RevealGroup className="mt-12 border-t border-line md:mt-16" stagger={0.08}>
        {t.stack.groups.map((group) => (
          <RevealItem
            key={group.name}
            className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <h3 className="label text-ink md:col-span-3 md:pt-1">{group.name}</h3>

            <ul className="flex flex-wrap gap-x-2 gap-y-2 md:col-span-9">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="border border-line px-3 py-1.5 text-sm text-muted transition-colors duration-300 hover:border-muted hover:text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-10">
        <Marquee items={everything} duration={58} />
      </Reveal>

      <Reveal as="p" delay={0.1} className="mt-10 text-lg text-muted md:text-xl">
        {t.stack.footnote}
      </Reveal>
    </Section>
  );
}
