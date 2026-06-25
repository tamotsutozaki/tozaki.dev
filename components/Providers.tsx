"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { CONTENT, type Dict, type Lang } from "@/lib/content";

type Theme = "dark" | "light";

type AppCtx = {
  lang: Lang;
  theme: Theme;
  t: Dict;
  toggleLang: () => void;
  toggleTheme: (coords?: { x: number; y: number }) => void;
  setLang: (l: Lang) => void;
  setTheme: (th: Theme) => void;
  introKey: number;
  replayIntro: () => void;
};

const Ctx = createContext<AppCtx | null>(null);

export function useApp(): AppCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used within <Providers>");
  return ctx;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");
  // Default só para SSR/1º render; o estado real vem do que o script anti-flash
  // aplicou na <html> (sincronizado no efeito abaixo). Sem flash de fundo.
  const [theme, setThemeState] = useState<Theme>("light");
  const themeRef = useRef<Theme>("light");
  const [introKey, setIntroKey] = useState(0);
  const replayIntro = useCallback(() => setIntroKey((k) => k + 1), []);

  // Aplica o tema na <html>, mantém o ref em dia e (se for escolha do usuário) persiste.
  const applyTheme = useCallback((next: Theme, persist: boolean) => {
    themeRef.current = next;
    setThemeState(next);
    document.documentElement.classList.toggle("light", next === "light");
    if (persist) {
      try {
        localStorage.setItem("tz-theme", next);
      } catch {}
    }
  }, []);

  const flipTheme = useCallback(() => {
    applyTheme(themeRef.current === "dark" ? "light" : "dark", true);
  }, [applyTheme]);

  const setTheme = useCallback((th: Theme) => applyTheme(th, true), [applyTheme]);

  // Lê idioma salvo no mount.
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("tz-lang") as Lang | null;
      if (savedLang === "pt" || savedLang === "en") setLangState(savedLang);
    } catch {}
  }, []);

  // Sincroniza o estado com o tema que o script anti-flash já aplicou (sem mexer
  // na classe → sem flash). E segue o sistema enquanto não houver escolha manual.
  useEffect(() => {
    const current: Theme = document.documentElement.classList.contains("light") ? "light" : "dark";
    themeRef.current = current;
    setThemeState(current);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("tz-theme");
      } catch {}
      if (saved === "dark" || saved === "light") return; // escolha manual tem prioridade
      applyTheme(e.matches ? "dark" : "light", false); // segue o sistema, sem persistir
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [applyTheme]);

  // Idioma → <html lang> + persiste.
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("tz-lang", lang);
    } catch {}
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === "pt" ? "en" : "pt")), []);

  // Troca de tema com "onda circular" via View Transitions API.
  // Sem suporte / reduced-motion / sem coords → cai no gradiente atual.
  const toggleTheme = useCallback(
    (coords?: { x: number; y: number }) => {
      const startVT = (document as unknown as { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }).startViewTransition;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!startVT || reduce || !coords) {
        flipTheme();
        return;
      }
      const root = document.documentElement;
      const r = Math.hypot(
        Math.max(coords.x, window.innerWidth - coords.x),
        Math.max(coords.y, window.innerHeight - coords.y)
      );
      root.style.setProperty("--theme-x", `${coords.x}px`);
      root.style.setProperty("--theme-y", `${coords.y}px`);
      root.style.setProperty("--theme-r", `${r}px`);
      root.classList.add("vt-active");
      const transition = startVT.call(document, () => {
        flushSync(() => flipTheme());
      });
      transition.finished.finally(() => root.classList.remove("vt-active"));
    },
    [flipTheme]
  );

  const value = useMemo<AppCtx>(
    () => ({ lang, theme, t: CONTENT[lang], toggleLang, toggleTheme, setLang, setTheme, introKey, replayIntro }),
    [lang, theme, toggleLang, toggleTheme, setLang, setTheme, introKey, replayIntro]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/**
 * Script anti-flash: aplica a classe de tema ANTES da página pintar.
 * Prioridade: escolha salva (tz-theme) → senão o padrão do sistema
 * (prefers-color-scheme). CSS base (:root) é dark; .light sobrescreve.
 */
export const noFlashScript = `(function(){try{var t=localStorage.getItem('tz-theme');var dark;if(t==='dark'||t==='light'){dark=(t==='dark');}else{dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;}var c=document.documentElement.classList;if(dark){c.remove('light');}else{c.add('light');}}catch(e){}})();`;
