"use client";

import React, { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";
import { FiMapPin, FiCode } from "react-icons/fi";

export function Hero() {
  const { introKey } = useApp();

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ padding: "90px clamp(18px,5vw,72px) 96px" }}>
      {/* key={introKey} remonta o conteúdo → a intro toca de novo (load + clique no logo) */}
      <HeroContent key={introKey} />
    </section>
  );
}

function HeroContent() {
  const { t } = useApp();
  const fxRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  // Dispara depois do header (header começa ~60ms; aqui após ele, para a ordem
  // ser: itens do header → TOZAKI → tagline → cantos).
  useEffect(() => {
    const id = setTimeout(() => setShow(true), 460);
    return () => clearTimeout(id);
  }, []);

  // Efeito de "distanciamento" no scroll: o conteúdo encolhe, desce e some.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = fxRef.current;
      if (!el) return;
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      el.style.transform = `translateY(${p * 90}px) scale(${1 - p * 0.18})`;
      el.style.opacity = String(1 - p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const vis = show ? "is-visible" : "";

  return (
    <>
      <div ref={fxRef} className="w-full flex flex-col items-center will-change-transform">
        <div className={`reveal-mask w-full text-center ${vis}`}>
          <div className="reveal-inner">
            <h1 className="display-name hero-name">TOZAKI</h1>
          </div>
        </div>

        <div className={`reveal-mask text-center ${vis}`} style={{ marginTop: "clamp(22px,3.5vh,40px)" }}>
          <div className="reveal-inner" style={{ transitionDelay: "150ms" }}>
            <div className="font-mono uppercase text-fg3 mb-3" style={{ fontSize: "clamp(10px,1.4vw,12px)", letterSpacing: "0.32em" }}>
              {t.hero.taglineLead}
            </div>
            <div className="text-fg font-medium" style={{ fontSize: "clamp(1.15rem,2.4vw,1.7rem)", lineHeight: 1.35, textWrap: "balance" } as React.CSSProperties}>
              {t.hero.taglineMain} <em className="italic font-normal text-fg2">{t.hero.taglineEm}</em>
            </div>
          </div>
        </div>
      </div>

      {/* Meta — canto inferior esquerdo */}
      <div className={`reveal absolute bottom-[30px] flex items-start gap-[11px] ${vis}`} style={{ left: "clamp(18px,5vw,72px)", transitionDelay: "350ms" }}>
        <span className="text-fg2 mt-px">
          <FiMapPin size={16} />
        </span>
        <div className="font-mono" style={{ fontSize: "13px", letterSpacing: "0.12em", lineHeight: 1.5 }}>
          <div className="text-fg font-medium">{t.hero.loc1}</div>
          <div className="text-fg3">{t.hero.loc2}</div>
        </div>
      </div>

      {/* Meta — canto inferior direito */}
      <div className={`reveal absolute bottom-[30px] flex items-start gap-[11px] ${vis}`} style={{ right: "clamp(18px,5vw,72px)", transitionDelay: "430ms" }}>
        <span className="text-fg2 mt-px">
          <FiCode size={18} />
        </span>
        <div className="font-mono" style={{ fontSize: "13px", letterSpacing: "0.12em", lineHeight: 1.5 }}>
          <div className="text-fg font-medium">{t.hero.role1}</div>
          <div className="text-fg3">{t.hero.role2}</div>
        </div>
      </div>
    </>
  );
}
