"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionTitle } from "@/components/primitives/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/primitives/reveal";
import { CursorPreview } from "@/components/primitives/cursor-preview";
import { WEB_PROJECTS } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";
import { cn } from "@/lib/utils";

export function WebWork() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const [canPreview, setCanPreview] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setCanPreview(fine.matches);
    update();
    fine.addEventListener("change", update);
    return () => fine.removeEventListener("change", update);
  }, []);

  const domains = WEB_PROJECTS.map((p) => p.domain);

  return (
    <Section id="work" index={t.work.index}>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <SectionTitle>{t.work.title}</SectionTitle>
        <Reveal as="p" delay={0.1} className="label hidden lg:block">
          {t.work.note}
        </Reveal>
      </div>

      <div onMouseLeave={() => setActive(null)}>
        <RevealGroup as="ol" className="mt-12 border-t border-line md:mt-16">
          {WEB_PROJECTS.map((project, i) => (
            <RevealItem as="li" key={project.domain}>
              <a
                href={`https://${project.domain}`}
                target="_blank"
                rel="noreferrer noopener"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  "group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 border-b border-line py-5 transition-colors duration-300 md:grid-cols-[3rem_minmax(0,14rem)_1fr_auto] md:gap-6 md:py-6",
                  active !== null && active !== i ? "text-muted/45" : "text-ink",
                )}
              >
                <span className="label transition-colors group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="font-sans text-[1.15rem] font-medium tracking-tightest md:text-[1.35rem]">
                  {project.domain}
                </span>

                <span className="col-span-2 col-start-2 text-sm leading-relaxed text-muted md:col-span-1 md:col-start-3 md:pr-8">
                  {lang === "en" ? project.en : project.bs}
                </span>

                <span className="col-start-3 row-start-1 flex items-center gap-2 justify-self-end md:col-start-4">
                  <span className="label hidden transition-colors group-hover:text-ink md:inline">
                    {t.work.visit}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <Reveal as="p" className="mt-6 label">
        {t.work.more}
      </Reveal>

      <CursorPreview domains={domains} activeIndex={active} enabled={canPreview} />
    </Section>
  );
}
