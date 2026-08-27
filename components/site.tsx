"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { Cursor } from "@/components/chrome/cursor";
import { ScrollProgress } from "@/components/chrome/scroll-progress";
import { Dock } from "@/components/chrome/dock";
import { CommandMenu } from "@/components/chrome/command-menu";
import { Hero } from "@/components/sections/hero";
import { Manifesto } from "@/components/sections/manifesto";
import { Timeline } from "@/components/sections/timeline";
import { WebWork } from "@/components/sections/web-work";
import { Systems } from "@/components/sections/systems";
import { AiContent } from "@/components/sections/ai-content";
import { Stack } from "@/components/sections/stack";
import { Numbers } from "@/components/sections/numbers";
import { Lifestyle } from "@/components/sections/lifestyle";
import { WhatsNext } from "@/components/sections/whats-next";
import { Contact } from "@/components/sections/contact";
import { useLang } from "@/components/providers/lang-provider";
import { CvSheet } from "@/components/cv-sheet";

export function Site() {
  const [commandOpen, setCommandOpen] = useState(false);
  const { t } = useLang();

  return (
    <>
      <a
        href="#work"
        className="print-hide sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded focus:border focus:border-line focus:bg-elevated focus:px-4 focus:py-2 focus:text-sm"
      >
        {t.nav.work}
      </a>

      <ScrollProgress />
      <Cursor />

      <main className="print:hidden">
        <Hero />
        <Manifesto />
        <Timeline />
        <WebWork />
        <Systems />
        <AiContent />
        <Stack />
        <Numbers />
        <Lifestyle />
        <WhatsNext />
        <Contact />
      </main>

      {/* Ctrl+P anywhere on the site prints the same one-page sheet as /cv,
          rendered from the same component and the same content. */}
      <div className="hidden print:block" aria-hidden>
        <CvSheet embedded />
      </div>

      <Dock onCommand={() => setCommandOpen(true)} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "!rounded-full !border !border-line !bg-elevated !text-ink !font-mono !text-[11px] !uppercase !tracking-[0.14em]",
        }}
      />
    </>
  );
}
