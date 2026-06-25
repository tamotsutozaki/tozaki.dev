"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { SkillCard } from "./SkillCard";
import { SKILLS, type SkillSize } from "@/lib/skills";
import { FiChevronDown, FiX } from "react-icons/fi";

// Span no grid conforme o tamanho do card.
const spanClass = (size: SkillSize) =>
  size === 4 ? "col-span-2 row-span-2" : size === 2 ? "col-span-2" : "";

type PopCoords = { left: number; top?: number; bottom?: number; placement: "top" | "bottom" };

export function Skills() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<PopCoords | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);

  const marqueeItems = SKILLS.map((s) => s.name);
  const visible = SKILLS.filter((s) => !s.hidden);
  const hiddenSkills = SKILLS.filter((s) => s.hidden);

  useEffect(() => setMounted(true), []);

  // Hover-intent: abre escolhendo o lado (cima/baixo) com mais espaço no viewport;
  // fecha com atraso de graça para o mouse atravessar do botão até o balão.
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = () => {
    cancelClose();
    const el = triggerRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      const below = window.innerHeight - r.bottom;
      const above = r.top;
      const left = r.left + r.width / 2;
      setCoords(
        below >= above
          ? { left, top: r.bottom + 8, placement: "bottom" }
          : { left, bottom: window.innerHeight - r.top + 8, placement: "top" }
      );
    }
    setOpen(true);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onScroll = () => setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      cancelClose();
    };
  }, []);

  return (
    <section id="skills" className="relative overflow-hidden" style={{ scrollMarginTop: 80, padding: "clamp(80px,12vh,150px) clamp(18px,5vw,72px) clamp(40px,6vh,64px)" }}>
      <span className="watermark" style={{ fontSize: "clamp(4.5rem,9vw,8.5rem)" }}>{t.skills.label}</span>

      <div className="relative z-[1] mx-auto" style={{ maxWidth: 1240 }}>
        <div className="flex items-start" style={{ gap: "clamp(12px,3vw,38px)", marginBottom: "clamp(18px,3vh,30px)" }}>
          <Reveal className="flex-none"><span className="section-num">02</span></Reveal>
          <div style={{ paddingTop: "clamp(4px,1.2vw,16px)" }}>
            <Reveal delay={90} className="mb-[18px]">
              <span className="inline-block font-mono text-[10.5px] font-medium tracking-[0.22em] uppercase text-fg2 border border-line2 rounded-[5px] px-[11px] py-[5px]">{t.skills.label}</span>
            </Reveal>
            <Reveal mask delay={160}>
              <h2 className="m-0 font-extrabold uppercase text-fg" style={{ fontSize: "clamp(2rem,6vw,4.4rem)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "18ch" }}>{t.skills.heading}</h2>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <p className="m-0 text-fg2" style={{ marginBottom: "clamp(36px,5vh,56px)", fontSize: 15, lineHeight: 1.55, paddingLeft: "clamp(0px,11vw,118px)" }}>{t.skills.sub}</p>
        </Reveal>

        {/* Grade bento (visíveis) */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6" style={{ gridAutoRows: "160px", gridAutoFlow: "dense" }}>
          {visible.map((s, i) => (
            <Reveal key={s.name} delay={(i % 6) * 40} className={spanClass(s.size)}>
              <SkillCard skill={s} />
            </Reveal>
          ))}
        </div>

        {/* Gatilho do balão */}
        <div className="mt-6 flex justify-center">
          <button
            ref={triggerRef}
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
            onFocus={openNow}
            onBlur={scheduleClose}
            onClick={() => (open ? setOpen(false) : openNow())}
            aria-expanded={open}
            aria-controls="skills-extra"
            className="fillbtn tswap-trigger group inline-flex items-center gap-2 rounded-[10px] border border-fg px-5 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-fg cursor-pointer"
          >
            <span className="fillbtn-fill" aria-hidden />
            <span className="tswap relative z-[1]">
              <span className="tswap-orig">{t.skills.showAll}</span>
              <span className="tswap-copy text-bg" aria-hidden>{t.skills.showAll}</span>
            </span>
            <FiChevronDown size={15} className={`relative z-[1] transition-[color,transform] duration-300 group-hover:text-bg ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Balão flutuante (portal → flutua sobre QUALQUER conteúdo, cima ou baixo) */}
      {mounted && open && coords &&
        createPortal(
          <div
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="fixed z-[120] -translate-x-1/2"
            style={{ left: coords.left, top: coords.top, bottom: coords.bottom, width: "min(90vw, 820px)" }}
          >
            <div
              id="skills-extra"
              role="region"
              aria-label={t.skills.showAll}
              className="skills-pop relative rounded-2xl border border-line2 p-5 shadow-2xl sm:p-6"
              style={{ background: "var(--bg-elev)", transformOrigin: coords.placement === "top" ? "bottom center" : "top center" }}
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg border border-line2 text-fg2 transition-colors hover:border-fg hover:text-fg cursor-pointer"
              >
                <FiX size={18} />
              </button>

              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg3">{t.skills.showAll}</div>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-4" style={{ gridAutoRows: "140px", gridAutoFlow: "dense" }}>
                {hiddenSkills.map((s) => (
                  <div key={s.name} className={spanClass(s.size)}>
                    <SkillCard skill={s} />
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Marquee */}
      <div
        className="relative overflow-hidden border-t border-b border-line py-[22px]"
        style={{ marginTop: "clamp(20px,4vh,40px)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)" }}
      >
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {marqueeItems.map((m, i) => (
                <span key={`${dup}-${i}`} className="inline-flex items-center gap-[22px] px-6 font-mono text-fg3 whitespace-nowrap" style={{ fontSize: "clamp(15px,2vw,21px)", letterSpacing: "-0.01em" }}>
                  {m}<span className="opacity-45">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
