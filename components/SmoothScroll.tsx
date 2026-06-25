"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

const LenisCtx = createContext<Lenis | null>(null);

/** Acesso à instância do Lenis (null se smooth scroll desativado). */
export function useLenis(): Lenis | null {
  return useContext(LenisCtx);
}

/**
 * Smooth scroll com inércia (Lenis). Inicializa o loop de rAF e expõe a
 * instância via contexto para a navegação por clique (Nav/Footer).
 * Respeita `prefers-reduced-motion`: se ligado, não ativa (scroll normal).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const l = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    setLenis(l);

    let raf = 0;
    const loop = (time: number) => {
      l.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      l.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisCtx.Provider value={lenis}>{children}</LenisCtx.Provider>;
}
