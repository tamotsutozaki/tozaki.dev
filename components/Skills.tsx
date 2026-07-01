"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { SkillCard } from "./SkillCard";
import { SKILLS, type SkillSize } from "@/lib/skills";
import { FiChevronDown } from "react-icons/fi";

// Span no grid conforme o tamanho do card.
// Bento só a partir de md (>=768px). No mobile todos os cards ficam 1x1 (mesmo
// tamanho) numa grade de 2 colunas.
const spanClass = (size: SkillSize) =>
  size === 4 ? "md:col-span-2 md:row-span-2" : size === 2 ? "md:col-span-2" : "";

type PopCoords = { left: number; top?: number; bottom?: number; placement: "top" | "bottom" };

export function Skills() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<PopCoords | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const openRef = useRef(false);
  const placementRef = useRef<"top" | "bottom">("bottom");
  const popRef = useRef<HTMLDivElement>(null);

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
  // Ancora o balão ao botão. keep=true mantém o lado atual (evita "flip"
  // cima/baixo ao reancorar durante o scroll/resize).
  const place = (keep = false) => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const left = r.left; // ancora pela borda esquerda do botão (balão cresce p/ direita)
    const placement = keep ? placementRef.current : window.innerHeight - r.bottom >= r.top ? "bottom" : "top";
    placementRef.current = placement;
    setCoords(
      placement === "bottom"
        ? { left, top: r.bottom + 8, placement }
        : { left, bottom: window.innerHeight - r.top + 8, placement }
    );
  };
  const openNow = () => {
    cancelClose();
    place(false);
    setOpen(true);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  };

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // No scroll/resize, REANCORA o balão ao botão enquanto aberto — em vez de
  // fechar. (Fechar no scroll causava o bug: a inércia do Lenis dispara ~66
  // eventos 'scroll'/s por ~1.1s e clobberava o open do hover.) Fechar agora é
  // só por mouseleave (grace) ou Esc. rAF evita thrash com a enxurrada de eventos.
  useEffect(() => {
    let raf = 0;
    const reanchor = () => {
      if (!openRef.current || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        place(true);
      });
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", reanchor, { passive: true });
    window.addEventListener("resize", reanchor);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", reanchor);
      window.removeEventListener("resize", reanchor);
      cancelAnimationFrame(raf);
      cancelClose();
    };
  }, []);

  // Touch: fecha ao tocar FORA do gatilho e do balão — sempre com animação (via
  // setOpen(false) → remove .is-open → transição). No desktop o fechamento é por
  // hover (mouseleave), então isto só vale para ponteiro grosso (hover:none).
  useEffect(() => {
    if (!open || !window.matchMedia("(hover:none)").matches) return;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || popRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

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
              <h2 className="m-0 font-extrabold uppercase text-fg" style={{ fontSize: "clamp(2rem,6vw,4.4rem)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "24ch" }}>{t.skills.heading}</h2>
            </Reveal>
          </div>
        </div>

        <Reveal delay={120}>
          <p className="m-0 text-fg2" style={{ marginBottom: "clamp(36px,5vh,56px)", fontSize: 15, lineHeight: 1.55 }}>{t.skills.sub}</p>
        </Reveal>

        {/* Grade bento (visíveis) */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6" style={{ gridAutoRows: "160px", gridAutoFlow: "dense" }}>
          {visible.map((s, i) => (
            <Reveal key={s.name} delay={(i % 6) * 40} className={`${spanClass(s.size)} ${s.hideMobile ? "max-md:hidden" : ""}`}>
              <SkillCard skill={s} />
            </Reveal>
          ))}
        </div>

        {/* Gatilho do balão */}
        <div className="mt-6 flex justify-start">
          <button
            ref={triggerRef}
            onMouseEnter={() => { if (!window.matchMedia("(hover:none)").matches) openNow(); }}
            onMouseLeave={() => { if (!window.matchMedia("(hover:none)").matches) scheduleClose(); }}
            onFocus={() => { if (!window.matchMedia("(hover:none)").matches) openNow(); }}
            onBlur={() => { if (!window.matchMedia("(hover:none)").matches) scheduleClose(); }}
            onClick={() => { if (window.matchMedia("(hover:none)").matches) { open ? setOpen(false) : openNow(); } }}
            aria-expanded={open}
            aria-controls="skills-extra"
            className={`loadbtn hswap-trigger group inline-flex items-center gap-2 rounded-[10px] border border-fg px-5 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-fg cursor-default ${open ? "is-on" : ""}`}
          >
            <span className="loadbtn-fill" aria-hidden />
            <span className="hswap relative z-[1]">
              <span className="hswap-orig">{t.skills.showAll}</span>
              <span className="hswap-copy text-bg" aria-hidden>{t.skills.showAll}</span>
            </span>
            <FiChevronDown size={15} className={`relative z-[1] transition-[color,transform] duration-300 group-hover:text-bg ${open ? "text-bg" : ""} ${open && coords?.placement === "top" ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>

      {/* Balão flutuante (portal → flutua sobre QUALQUER conteúdo, cima ou baixo).
          Fica sempre montado; entra/sai via classe is-open (transição). */}
      {mounted &&
        createPortal(
          <div
            className="skills-pop-wrap pointer-events-none fixed z-[120]"
            style={{ left: coords?.left ?? -9999, top: coords?.top, bottom: coords?.bottom, width: "min(95vw, 1040px)" }}
          >
            <div
              ref={popRef}
              id="skills-extra"
              role="region"
              aria-label={t.skills.showAll}
              aria-hidden={!open}
              onMouseEnter={() => { if (!window.matchMedia("(hover:none)").matches) cancelClose(); }}
              onMouseLeave={() => { if (!window.matchMedia("(hover:none)").matches) scheduleClose(); }}
              className={`skills-pop relative rounded-2xl border border-line2 p-5 shadow-2xl sm:p-6 ${open ? "is-open" : ""}`}
              style={{ background: "var(--bg-elev)", transformOrigin: coords?.placement === "top" ? "bottom left" : "top left" }}
            >
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-fg3">{t.skills.showAll}</div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6" style={{ gridAutoRows: "140px", gridAutoFlow: "dense" }}>
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
        className="relative mx-auto overflow-hidden border-t border-b border-line py-[22px]"
        style={{ maxWidth: 1240, marginTop: "clamp(20px,4vh,40px)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)" }}
      >
        <div className="marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center font-mono text-fg3" aria-hidden={dup === 1} style={{ fontSize: "clamp(15px,2vw,21px)", letterSpacing: "-0.01em" }}>
              {visible.map((s, i) => {
                const Icon = s.Icon;
                return (
                  <React.Fragment key={`${dup}-${i}`}>
                    <span className="inline-flex items-center gap-[10px] whitespace-nowrap">
                      {Icon ? <Icon size={20} /> : <span className="font-bold">{s.glyph}</span>}
                      {s.name}
                    </span>
                    <span className="opacity-45" style={{ margin: "0 24px" }} aria-hidden>/</span>
                  </React.Fragment>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
