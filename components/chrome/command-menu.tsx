"use client";

import { useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import {
  ArrowDownToLine,
  ArrowRight,
  Copy,
  AtSign,
  Languages,
  Printer,
  SunMoon,
} from "lucide-react";
import { IDENTITY, SECTION_IDS, type SectionId } from "@/lib/content";
import { useLang } from "@/components/providers/lang-provider";
import { copyText } from "@/lib/clipboard";

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { t, lang, toggleLang } = useLang();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const run = useCallback(
    (fn: () => void) => {
      onOpenChange(false);
      // let the dialog close before the page moves under it
      window.setTimeout(fn, 40);
    },
    [onOpenChange],
  );

  const jump = (id: SectionId) =>
    run(() =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );

  const onCopyEmail = () =>
    run(async () => {
      const ok = await copyText(IDENTITY.email);
      toast[ok ? "success" : "error"](
        ok ? t.contact.copied : t.contact.copyFailed,
      );
    });

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-[2px] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content className="fixed left-1/2 top-[18vh] z-[81] w-[min(92vw,34rem)] -translate-x-1/2 overflow-hidden rounded-xl border border-line bg-elevated data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95">
          <Dialog.Title className="sr-only">{t.nav.command}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {t.cmd.placeholder}
          </Dialog.Description>

          <Command
            loop
            className="[&_[cmdk-group-heading]]:label [&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pb-2 [&_[cmdk-group-heading]]:pt-4"
          >
            <div className="border-b border-line px-4">
              <Command.Input
                autoFocus
                placeholder={t.cmd.placeholder}
                className="w-full bg-transparent py-4 text-[0.95rem] text-ink outline-none placeholder:text-muted"
              />
            </div>

            <Command.List className="max-h-[min(22rem,50vh)] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-4 py-8 text-center text-sm text-muted">
                {t.cmd.empty}
              </Command.Empty>

              <Command.Group heading={t.cmd.sections}>
                {SECTION_IDS.map((id) => (
                  <Item key={id} onSelect={() => jump(id)} icon={<ArrowRight className="size-3.5" />}>
                    {t.nav[id]}
                  </Item>
                ))}
              </Command.Group>

              <Command.Group heading={t.cmd.actions}>
                <Item onSelect={onCopyEmail} icon={<Copy className="size-3.5" />}>
                  {t.cmd.copyEmail}
                </Item>
                <Item
                  onSelect={() => run(() =>
                    window.open(
                      lang === "bs" ? IDENTITY.cvFileBs : IDENTITY.cvFile,
                      "_blank",
                    ),
                  )}
                  icon={<ArrowDownToLine className="size-3.5" />}
                >
                  {t.cmd.downloadCv}
                </Item>
                <Item
                  onSelect={() => run(() => { window.location.href = "/cv"; })}
                  icon={<Printer className="size-3.5" />}
                >
                  {t.cmd.printCv}
                </Item>
                <Item
                  onSelect={() =>
                    run(() => window.open(IDENTITY.instagram, "_blank", "noopener"))
                  }
                  icon={<AtSign className="size-3.5" />}
                >
                  {t.cmd.openInstagram}
                </Item>
                <Item onSelect={() => run(toggleLang)} icon={<Languages className="size-3.5" />}>
                  {t.cmd.switchLang}
                </Item>
                <Item
                  onSelect={() =>
                    run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))
                  }
                  icon={<SunMoon className="size-3.5" />}
                >
                  {t.cmd.toggleTheme}
                </Item>
              </Command.Group>
            </Command.List>
          </Command>

          <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
            <span className="label">{IDENTITY.name}</span>
            <span className="label">
              <kbd className="rounded border border-line px-1.5 py-0.5">Esc</kbd>
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Item({
  children,
  onSelect,
  icon,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  icon: React.ReactNode;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-md px-4 py-2.5 text-sm text-muted outline-none data-[selected=true]:bg-surface data-[selected=true]:text-ink"
    >
      <span className="text-muted">{icon}</span>
      {children}
    </Command.Item>
  );
}
