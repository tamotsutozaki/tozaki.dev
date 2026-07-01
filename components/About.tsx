"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { FiMapPin, FiBriefcase, FiGlobe, FiMail, FiDownload } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { InfoCard } from "./InfoCard";
import { SITE, getEmail } from "@/lib/site";

// Destaca as palavras marcadas com **asteriscos** (cor/peso mais fortes).
function renderRich(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-fg">{part}</strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export function About() {
  const { t } = useApp();
  // Ligado quando o mouse está na tag "Disponível…" — aciona o hover de todos
  // os botões do "Encontre-me" ao mesmo tempo.
  const [socialOn, setSocialOn] = useState(false);

  return (
    <section id="sobre" className="relative overflow-hidden" style={{ scrollMarginTop: 80, padding: "clamp(80px,12vh,150px) clamp(18px,5vw,72px)" }}>
      <span className="watermark" style={{ fontSize: "clamp(4.5rem,9vw,8.5rem)" }}>{t.about.label}</span>

      <div className="relative z-[1] mx-auto" style={{ maxWidth: 1240 }}>
        <div style={{ marginBottom: "clamp(40px,6vh,72px)" }}>
          {/* Header simplificado (sem chip duplicado) */}
          <div className="flex items-start" style={{ gap: "clamp(12px,3vw,38px)" }}>
            <Reveal className="flex-none"><span className="section-num">01</span></Reveal>
            <div style={{ paddingTop: "clamp(4px,1.2vw,16px)" }}>
              <Reveal delay={90} className="mb-[18px]">
                <span className="inline-block font-mono text-[10.5px] font-medium tracking-[0.22em] uppercase text-fg2 border border-line2 rounded-[5px] px-[11px] py-[5px]">
                  {t.about.label}
                </span>
              </Reveal>
              <Reveal mask delay={160}>
                <h2 className="m-0 font-extrabold uppercase text-fg" style={{ fontSize: "clamp(2rem,6vw,4.4rem)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "22ch", paddingTop: "0.12em" }}>
                  {t.about.heading}
                </h2>
              </Reveal>
            </div>
          </div>
          <Reveal delay={240}>
            <p className="m-0 text-fg2" style={{ marginTop: "clamp(14px,2vh,22px)", fontSize: 15, lineHeight: 1.55 }}>{t.about.sub}</p>
          </Reveal>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-x-[clamp(28px,5vw,64px)] gap-y-10">
          {/* Cards — coluna à esquerda no desktop (empilhados), abaixo no mobile */}
          <Reveal className="order-1 flex w-full flex-col gap-4 lg:order-1 lg:w-[390px] lg:flex-none">
            <InfoCard icon={FiMapPin} label={t.about.cards.locLabel} hover="spotlight">
              <span className="text-[15px] font-semibold leading-snug text-fg">{t.about.cards.locValue}</span>
            </InfoCard>

            {/* TODO: trocar depois para "Freelancer · Disponível para projetos" */}
            <InfoCard icon={FiBriefcase} label={t.about.cards.roleLabel} hover="spotlight">
              <div className="text-[15px] font-semibold leading-snug text-fg">{t.about.cards.roleValue}</div>
              <div className="mt-1 font-mono text-[11px] tracking-[0.08em] text-fg3">{t.about.cards.roleSub}</div>
            </InfoCard>

            <InfoCard icon={LuGraduationCap} label={t.about.cards.eduLabel} hover="spotlight">
              <div className="flex flex-col gap-3">
                {t.about.cards.edu.map((e) => (
                  <div key={e.school}>
                    <div className="text-[15px] font-semibold leading-snug text-fg">{e.school}</div>
                    <div className="mt-1 text-[13px] leading-snug text-fg2">{e.detail}</div>
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard icon={FiGlobe} label={t.about.cards.langLabel} hover="spotlight">
              <div className="flex flex-col gap-3">
                {t.about.cards.lang.map((l) => {
                  const item = l as { name: string; level: string; proof?: string; proofLabel?: string; proofLink?: string };
                  return (
                    <div key={item.name}>
                      <div className="text-[15px] font-semibold leading-snug text-fg">{item.name}</div>
                      <div className="mt-1 text-[13px] leading-snug text-fg2">
                        {item.proof && item.proofLabel ? (
                          <>
                            {item.level.split(item.proofLabel)[0]}
                            <ProofBadge label={item.proofLabel} image={item.proof} link={item.proofLink} linkLabel={t.about.viewProof} />
                          </>
                        ) : (
                          item.level
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </InfoCard>
          </Reveal>

          {/* Apresentação + (foto · 6+) — à direita no desktop, topo no mobile */}
          <Reveal delay={80} className="order-2 flex w-full flex-col gap-8 lg:order-2 lg:flex-1">
            {/* Parágrafos sozinhos */}
            <div className="flex flex-col gap-5" style={{ maxWidth: "60ch" }}>
              {t.about.intro.map((para, i) => (
                <p key={i} className="m-0 text-fg2" style={{ fontSize: "clamp(0.9rem,1vw,0.95rem)", lineHeight: 1.7 }}>
                  {renderRich(para)}
                </p>
              ))}
            </div>

            {/* Foto + "6+" lado a lado; tags abaixo no mobile (largura total),
                na coluna sob o "6+" no desktop */}
            <div className="pt-[26px] border-t border-line2 md:border-line">
              <div className="flex items-center gap-x-5 md:gap-x-8">
                <div className="flex-none w-[120px] md:w-[135px]">
                  <div className="overflow-hidden rounded-full border border-line2 bg-bg-elev" style={{ aspectRatio: "1 / 1" }}>
                    <Image src="/assets/pedro.png" alt="Pedro Tozaki" width={540} height={540} className="w-full h-full object-cover" priority />
                  </div>
                </div>

                <div className="flex min-w-0 flex-col gap-4">
                  <div className="flex items-end gap-[18px]">
                    <span className="font-extrabold text-fg" style={{ fontSize: "clamp(3.2rem,6vw,5rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
                      {SITE.projectsCount}{t.about.statSuffix}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg3 pb-2" style={{ lineHeight: 1.5, maxWidth: "14ch" }}>
                      {t.about.statLabel}
                    </span>
                  </div>

                  {/* Tags no desktop: na coluna, sob o "6+" */}
                  <div className="hidden md:flex flex-wrap gap-2">
                    {t.about.chips.map((c, i) =>
                      i === t.about.chips.length - 1 ? (
                        <AvailChip key={c} label={c} onHover={setSocialOn} />
                      ) : (
                        <span key={c} className={CHIP_CLASS}>{c}</span>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Tags no mobile: largura total, abaixo da foto + "6+" */}
              <div className="mt-5 flex flex-wrap gap-2 md:hidden">
                {t.about.chips.map((c, i) =>
                  i === t.about.chips.length - 1 ? (
                    <AvailChip key={c} label={c} onHover={setSocialOn} />
                  ) : (
                    <span key={c} className={CHIP_CLASS}>{c}</span>
                  )
                )}
              </div>
            </div>

            {/* Links sociais + CV — hover pinta na cor da marca */}
            <div className="pt-[26px] border-t border-line2 md:border-line">
              <div className="mb-3 font-mono text-[10px] tracking-[0.2em] uppercase text-fg3">{t.about.findMe}</div>
              <div className="flex flex-wrap items-center gap-2.5">
                <BrandIconBtn href={SITE.github} label="GitHub" brand="var(--fg)" brandFg="var(--bg)" isOn={socialOn}><FaGithub size={17} /></BrandIconBtn>
                <BrandIconBtn href={SITE.linkedin} label="LinkedIn" brand="#0A66C2" brandFg="#fff" isOn={socialOn}><FaLinkedinIn size={16} /></BrandIconBtn>
                <BrandIconBtn href={SITE.whatsapp} label="WhatsApp" brand="#25D366" brandFg="#fff" isOn={socialOn}><FaWhatsapp size={17} /></BrandIconBtn>
                <BrandIconBtn href={`mailto:${getEmail()}`} label="E-mail" brand="#EA4335" brandFg="#fff" isOn={socialOn}><FiMail size={17} /></BrandIconBtn>
                <a
                  href={SITE.cvUrl}
                  download="Pedro Tozaki - CV.pdf"
                  aria-label={t.contact.cv}
                  style={{ "--brand": "#2E90E6", "--brand-fg": "#fff" } as React.CSSProperties}
                  className={`fillbrand fillbtn tswap-trigger inline-flex items-center h-[42px] px-4 rounded-[11px] border border-line2 text-fg2 font-medium text-[13px] cursor-pointer ${socialOn ? "is-on" : ""}`}
                >
                  <span className="fillbtn-fill" aria-hidden />
                  <span className="tswap relative z-[1]">
                    <span className="tswap-orig inline-flex items-center gap-2"><FiDownload size={15} /><span className="md:hidden">CV</span><span className="hidden md:inline">{t.contact.cv}</span></span>
                    <span className="tswap-copy inline-flex items-center gap-2" aria-hidden><FiDownload size={15} /><span className="md:hidden">CV</span><span className="hidden md:inline">{t.contact.cv}</span></span>
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Botão de ícone com o fill-sweep subindo na COR DA MARCA + troca do ícone
 *  (tswap). Vars --brand/--brand-fg colorem o preenchimento e o ícone trocado. */
function BrandIconBtn({ href, label, brand, brandFg, isOn = false, children }: { href: string; label: string; brand: string; brandFg: string; isOn?: boolean; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ "--brand": brand, "--brand-fg": brandFg } as React.CSSProperties}
      className={`fillbrand fillbtn tswap-trigger grid place-items-center w-[42px] h-[42px] rounded-[11px] border border-line2 text-fg2 cursor-pointer ${isOn ? "is-on" : ""}`}
    >
      <span className="fillbtn-fill" aria-hidden />
      <span className="tswap relative z-[1]">
        <span className="tswap-orig">{children}</span>
        <span className="tswap-copy" aria-hidden>{children}</span>
      </span>
    </a>
  );
}

/** Estilo padrão das tags do "6+" (outline). */
const CHIP_CLASS = "font-mono text-[11px] px-3 py-[7px] border border-line rounded-[7px] text-fg2";

/** Tag "Disponível…": igual às outras em repouso; no hover pinta com a cor do
 *  LinkedIn (blob) e — via onHover — aciona o hover de todos os botões sociais. */
function AvailChip({ label, onHover }: { label: string; onHover: (v: boolean) => void }) {
  return (
    <span
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{ "--brand": "#0A66C2", "--brand-fg": "#fff" } as React.CSSProperties}
      className={`fillbrand fillbtn tswap-trigger inline-flex items-center ${CHIP_CLASS} cursor-default`}
    >
      <span className="fillbtn-fill" aria-hidden />
      <span className="tswap relative z-[1]">
        <span className="tswap-orig">{label}</span>
        <span className="tswap-copy" aria-hidden>{label}</span>
      </span>
    </span>
  );
}

/** "Selo" com balão: ao passar o mouse (ou tocar no mobile) mostra a imagem do
 *  diploma, igual ao balão das stacks secundárias (portal + hover/tap + esc). */
function ProofBadge({ label, image, link, linkLabel }: { label: string; image: string; link?: string; linkLabel?: string }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ left: number; bottom: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => setMounted(true), []);

  const isCoarse = () => typeof window !== "undefined" && window.matchMedia("(hover:none)").matches;

  const place = () => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ left: r.left + r.width / 2, bottom: window.innerHeight - r.top + 10 });
  };
  // Fecha com atraso (graça) pra dar tempo de levar o mouse do TOEIC até o balão.
  const cancelClose = () => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; } };
  const openNow = () => { cancelClose(); place(); setOpen(true); };
  const scheduleClose = () => { cancelClose(); closeTimer.current = window.setTimeout(() => setOpen(false), 220); };

  useEffect(() => {
    if (!open) return;
    const reposition = () => place();
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onDown = (e: PointerEvent) => {
      if (!isCoarse()) return;
      const tgt = e.target as Node;
      if (ref.current?.contains(tgt) || popRef.current?.contains(tgt)) return;
      setOpen(false);
    };
    window.addEventListener("scroll", reposition, { passive: true });
    window.addEventListener("resize", reposition);
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("scroll", reposition);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        onMouseEnter={() => { if (!isCoarse()) openNow(); }}
        onMouseLeave={() => { if (!isCoarse()) scheduleClose(); }}
        onFocus={() => { if (!isCoarse()) openNow(); }}
        onBlur={() => { if (!isCoarse()) scheduleClose(); }}
        onClick={() => { if (isCoarse()) (open ? setOpen(false) : openNow()); }}
        aria-label={`Ver diploma ${label}`}
        className="font-semibold text-fg underline decoration-dotted decoration-fg3 underline-offset-2 transition-colors hover:decoration-fg cursor-pointer"
      >
        {label}
      </button>
      {mounted &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[120]"
            style={{ left: coords?.left ?? -9999, bottom: coords?.bottom, transform: "translateX(-50%)" }}
          >
            <div
              ref={popRef}
              aria-hidden={!open}
              onMouseEnter={() => { if (!isCoarse()) cancelClose(); }}
              onMouseLeave={() => { if (!isCoarse()) scheduleClose(); }}
              className={`proof-pop rounded-xl border border-line2 p-2 shadow-2xl ${open ? "is-open" : ""}`}
              style={{ background: "var(--bg-elev)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={`Diploma ${label}`} className="block rounded-lg" style={{ width: "min(80vw, 380px)", height: "auto" }} />
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 flex items-center justify-center gap-1.5 rounded-lg py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg2 transition-colors hover:text-[#0A66C2]"
                >
                  <FaLinkedinIn size={12} /> {linkLabel ?? "LinkedIn"} <span aria-hidden>↗</span>
                </a>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
