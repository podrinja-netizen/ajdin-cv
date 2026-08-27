"use client";

import { ArrowDownToLine, ArrowUpRight, Copy } from "lucide-react";
import { toast } from "sonner";
import { Reveal, DrawRule } from "@/components/primitives/reveal";
import { IDENTITY } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";
import { copyText } from "@/lib/clipboard";

export function Contact() {
  const { t } = useLang();

  const onCopy = async () => {
    const ok = await copyText(IDENTITY.email);
    toast[ok ? "success" : "error"](ok ? t.contact.copied : t.contact.copyFailed);
  };

  return (
    <footer id="contact" className="movement scroll-mt-4">
      <div className="shell">
        <Reveal as="p" className="label">
          {t.contact.index}
        </Reveal>

        <Reveal as="h2" delay={0.06} className="display mt-8 text-[clamp(2.5rem,9vw,7rem)]">
          {t.contact.title}
        </Reveal>

        <DrawRule accent className="mt-10" />

        {/* email — the primary action, at the size of a headline */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Reveal>
            <a
              href={`mailto:${IDENTITY.email}`}
              className="link-underline font-sans text-[clamp(1.35rem,4vw,2.5rem)] font-medium tracking-tightest"
            >
              {IDENTITY.email}
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <button
              type="button"
              onClick={onCopy}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 font-mono text-label uppercase text-muted transition-colors hover:border-muted hover:text-ink"
            >
              <Copy aria-hidden className="size-3" />
              {t.contact.copy}
            </button>
          </Reveal>
        </div>

        {/* the rest of the details, as a schedule */}
        <dl className="mt-14 border-t border-line md:mt-20">
          <Row label={t.contact.instagram}>
            <a
              href={IDENTITY.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="link-underline inline-flex items-center gap-1.5"
            >
              {IDENTITY.instagramHandle}
              <ArrowUpRight aria-hidden className="size-3.5 text-muted" />
            </a>
          </Row>

          {IDENTITY.phone && (
            <Row label={t.contact.phoneLabel}>
              <a href={`tel:${IDENTITY.phone}`} className="link-underline">
                {IDENTITY.phone}
              </a>
            </Row>
          )}

          <Row label={t.contact.availabilityLabel}>{t.contact.availability}</Row>

          <Row label="LinkedIn">
            <span className="text-muted">{t.contact.noLinkedin}</span>
          </Row>
        </dl>

        <Reveal className="mt-12">
          <a
            href={IDENTITY.cvFile}
            download
            className="group inline-flex items-center gap-3 border border-line px-6 py-4 text-sm text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <ArrowDownToLine
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
            />
            {t.contact.download}
          </a>
        </Reveal>

        <Reveal
          as="p"
          delay={0.1}
          className="mt-20 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted"
        >
          {t.contact.colophon}
        </Reveal>
      </div>
    </footer>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-1.5 border-b border-line py-5 md:grid-cols-12 md:items-baseline md:gap-8 md:py-6">
      <dt className="label md:col-span-2">{label}</dt>
      <dd className="text-[1.05rem] text-ink md:col-span-10">{children}</dd>
    </Reveal>
  );
}
