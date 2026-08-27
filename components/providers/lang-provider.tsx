"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { content, type Content, type Lang } from "@/lib/content";

const STORAGE_KEY = "ajdin-lang";

type LangContextValue = {
  lang: Lang;
  t: Content;
  setLang: (next: Lang) => void;
  toggleLang: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  // EN is the default; the stored preference is applied after hydration so the
  // server-rendered markup always matches.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    // ?lang=bs wins over the stored preference, so a link (or a headless
    // print of /cv?lang=bs) can pin the language without any user state.
    const asked = new URLSearchParams(window.location.search).get("lang");
    if (asked === "bs" || asked === "en") {
      setLangState(asked);
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "bs" || stored === "en") setLangState(stored);
    } catch {
      /* private mode / storage disabled — English stands */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* nothing to persist to — the session still switches */
    }
  }, []);

  const toggleLang = useCallback(
    () => setLang(lang === "en" ? "bs" : "en"),
    [lang, setLang],
  );

  return (
    <LangContext.Provider
      value={{ lang, t: content[lang] as Content, setLang, toggleLang }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
