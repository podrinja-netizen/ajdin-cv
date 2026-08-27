"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import { SECTION_IDS, type SectionId } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";
import { cn } from "@/lib/utils";

/** Which section currently owns the viewport. */
function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id as SectionId);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Dock({ onCommand }: { onCommand: () => void }) {
  const { t, lang, toggleLang } = useLang();
  const { resolvedTheme, setTheme } = useTheme();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const jump = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  }, []);

  const links = SECTION_IDS.map((id) => ({ id, label: t.nav[id] }));

  return (
    <nav
      data-dock
      aria-label={t.nav.menu}
      className="print-hide fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 md:bottom-8"
    >
      {/* mobile: collapsed to a single control */}
      <div className="md:hidden">
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 overflow-hidden rounded-xl border border-line bg-elevated/95 backdrop-blur"
            >
              {links.map((link) => (
                <li key={link.id} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => jump(link.id)}
                    className={cn(
                      "block w-full px-6 py-3.5 text-left font-mono text-label uppercase",
                      active === link.id ? "text-accent" : "text-muted",
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-1.5 rounded-full border border-line bg-elevated/90 p-1.5 backdrop-blur">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={t.nav.menu}
            className="grid size-9 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
          <LangPill lang={lang} onToggle={toggleLang} />
          <ThemeButton
            mounted={mounted}
            theme={resolvedTheme}
            setTheme={setTheme}
            label={t.nav.theme}
          />
        </div>
      </div>

      {/* desktop: the full rail */}
      <div className="hidden items-center gap-1 rounded-full border border-line bg-elevated/80 p-1.5 backdrop-blur-md md:flex">
        {links.map((link) => (
          <button
            key={link.id}
            type="button"
            onClick={() => jump(link.id)}
            aria-current={active === link.id ? "true" : undefined}
            className={cn(
              "relative rounded-full px-4 py-2 font-mono text-label uppercase transition-colors",
              active === link.id ? "text-ink" : "text-muted hover:text-ink",
            )}
          >
            {active === link.id && (
              <motion.span
                layoutId="dock-active"
                className="absolute inset-0 rounded-full bg-surface"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
            <span className="relative">{link.label}</span>
            {active === link.id && (
              <span className="absolute inset-x-4 bottom-1 h-px bg-accent" />
            )}
          </button>
        ))}

        <span className="mx-1 h-5 w-px bg-line" aria-hidden />

        <button
          type="button"
          onClick={onCommand}
          aria-label={t.nav.command}
          className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          <Command className="size-3.5" />
        </button>
        <LangPill lang={lang} onToggle={toggleLang} />
        <ThemeButton
          mounted={mounted}
          theme={resolvedTheme}
          setTheme={setTheme}
          label={t.nav.theme}
        />
      </div>
    </nav>
  );
}

function LangPill({ lang, onToggle }: { lang: string; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={lang === "en" ? "Prebaci na bosanski" : "Switch to English"}
      className="rounded-full px-3 py-2 font-mono text-label uppercase text-muted transition-colors hover:bg-surface hover:text-ink"
    >
      <span className={lang === "en" ? "text-ink" : undefined}>EN</span>
      <span className="mx-1 text-line">/</span>
      <span className={lang === "bs" ? "text-ink" : undefined}>BS</span>
    </button>
  );
}

function ThemeButton({
  mounted,
  theme,
  setTheme,
  label,
}: {
  mounted: boolean;
  theme: string | undefined;
  setTheme: (t: string) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={label}
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
    >
      {/* render a stable icon until the theme is known, to avoid a flash */}
      {mounted && theme === "light" ? (
        <Sun className="size-3.5" />
      ) : (
        <Moon className="size-3.5" />
      )}
    </button>
  );
}
