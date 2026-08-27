"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { IDENTITY, WEB_PROJECTS, SYSTEMS } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";

/**
 * The same facts as the site, set as a single-page document: black on white,
 * no motion, no chrome. `/cv` on screen and Ctrl+P produce the same sheet.
 */
export function CvSheet({ embedded = false }: { embedded?: boolean }) {
  const { t, lang, toggleLang } = useLang();

  return (
    <div
      className={
        embedded ? "" : "min-h-svh bg-elevated py-10 print:bg-white print:py-0"
      }
    >
      {/* toolbar — screen only, and never on the embedded print copy */}
      {!embedded && (
      <div className="print-hide mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-label uppercase text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden className="size-3" />
          {t.cv.back}
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="rounded-full border border-line px-3 py-1.5 font-mono text-label uppercase text-muted transition-colors hover:text-ink"
          >
            {lang === "en" ? "BS" : "EN"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-full border border-line px-4 py-1.5 font-mono text-label uppercase text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Printer aria-hidden className="size-3" />
            {t.cv.print}
          </button>
        </div>
      </div>
      )}

      {/* the sheet */}
      <article className="mx-auto max-w-[210mm] bg-white px-10 py-12 text-[#111] print:max-w-none print:px-0 print:py-0">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-[#111] pb-4">
          <div>
            <h1 className="font-sans text-[2.1rem] font-bold leading-none tracking-[-0.03em]">
              {IDENTITY.name}
            </h1>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#555]">
              {t.hero.role}
            </p>
          </div>

          <ul className="text-right font-mono text-[10px] leading-relaxed tracking-[0.06em] text-[#555]">
            <li>{IDENTITY.email}</li>
            {IDENTITY.phone && <li>{IDENTITY.phone}</li>}
            <li>{IDENTITY.instagramHandle}</li>
            <li>
              {IDENTITY.city}, BiH · {IDENTITY.site.replace("https://", "")}
            </li>
          </ul>
        </header>

        <Block title={t.cv.profile}>
          <p className="text-[11px] leading-relaxed text-[#333]">
            {t.hero.claim} {t.manifesto.body[0]}
          </p>
        </Block>

        <Block title={t.cv.experience}>
          <ul className="space-y-3">
            {t.timeline.items.map((item) => (
              <li key={`${item.year}-${item.org}`} className="grid grid-cols-[5.5rem_1fr] gap-4">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#666]">
                  {item.year}
                </span>
                <div>
                  <p className="text-[11.5px] font-semibold">
                    {item.org} — <span className="font-normal">{item.role}</span>
                  </p>
                  <p className="mt-0.5 text-[10.5px] leading-relaxed text-[#444]">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t.cv.systems}>
          <ul className="space-y-1.5">
            {SYSTEMS.map((system) => (
              <li key={system.domain} className="grid grid-cols-[9rem_1fr] gap-4">
                <span className="text-[10.5px] font-semibold">{system.domain}</span>
                <span className="text-[10.5px] leading-relaxed text-[#444]">
                  {(lang === "en" ? system.en : system.bs).kicker}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t.cv.selected}>
          <p className="text-[10.5px] leading-relaxed text-[#444]">
            {WEB_PROJECTS.map((p) => p.domain).join(" · ")} — {t.cv.more}
          </p>
        </Block>

        <Block title={t.cv.skills}>
          <ul className="space-y-1.5">
            {t.stack.groups.map((group) => (
              <li key={group.name} className="grid grid-cols-[5.5rem_1fr] gap-4">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.1em] text-[#666]">
                  {group.name}
                </span>
                <span className="text-[10.5px] leading-relaxed text-[#444]">
                  {group.items.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t.cv.details}>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-1 text-[10.5px] text-[#444]">
            <li>
              <strong className="font-semibold text-[#111]">
                {t.contact.availabilityLabel}:
              </strong>{" "}
              {t.contact.availability}
            </li>
            <li>
              <strong className="font-semibold text-[#111]">LinkedIn:</strong>{" "}
              {t.contact.noLinkedin}
            </li>
          </ul>
        </Block>
      </article>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 break-inside-avoid">
      <h2 className="mb-2.5 border-b border-[#ddd] pb-1 font-mono text-[9.5px] uppercase tracking-[0.18em] text-[#111]">
        {title}
      </h2>
      {children}
    </section>
  );
}
