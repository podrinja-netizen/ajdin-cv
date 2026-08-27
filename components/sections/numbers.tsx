"use client";

import { Section } from "@/components/primitives/section";
import { RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { NumberTicker } from "@/components/primitives/number-ticker";
import { useLang } from "@/components/providers/lang-provider";

export function Numbers() {
  const { t } = useLang();

  return (
    <Section index={t.numbers.index} srTitle={t.numbers.index}>
      <RevealGroup className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-8" stagger={0.08}>
        {t.numbers.items.map((item) => (
          <RevealItem key={item.label} className="border-t border-line pt-5">
            <p className="display text-[clamp(2.75rem,7vw,4.75rem)] leading-none">
              <NumberTicker value={item.value} suffix={item.suffix} />
            </p>
            <p className="mt-4 max-w-[18ch] text-sm leading-relaxed text-muted">
              {item.label}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
