"use client";

import React from "react";
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
                {t.about.cards.lang.map((l) => (
                  <div key={l.name}>
                    <div className="text-[15px] font-semibold leading-snug text-fg">{l.name}</div>
                    <div className="mt-1 text-[13px] leading-snug text-fg2">{l.level}</div>
                  </div>
                ))}
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
            <div className="pt-[26px] border-t border-line">
              <div className="flex items-center gap-x-5 md:gap-x-8">
                <div className="flex-none w-[120px] md:w-[135px]">
                  <div className="overflow-hidden rounded-full border border-line2 bg-bg-elev" style={{ aspectRatio: "1 / 1" }}>
                    <Image src="/assets/pedro.png" alt="Pedro Tozaki" width={860} height={860} className="w-full h-full object-cover" priority />
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
                    {t.about.chips.map((c) => (
                      <span key={c} className="font-mono text-[11px] px-3 py-[7px] border border-line rounded-[7px] text-fg2">{c}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags no mobile: largura total, abaixo da foto + "6+" */}
              <div className="mt-5 flex flex-wrap gap-2 md:hidden">
                {t.about.chips.map((c) => (
                  <span key={c} className="font-mono text-[11px] px-3 py-[7px] border border-line rounded-[7px] text-fg2">{c}</span>
                ))}
              </div>
            </div>

            {/* Links sociais + CV — hover pinta na cor da marca */}
            <div className="pt-[26px] border-t border-line">
              <div className="mb-3 font-mono text-[10px] tracking-[0.2em] uppercase text-fg3">{t.about.findMe}</div>
              <div className="flex flex-wrap items-center gap-2.5">
                <BrandIconBtn href={SITE.github} label="GitHub" brand="var(--fg)" brandFg="var(--bg)"><FaGithub size={17} /></BrandIconBtn>
                <BrandIconBtn href={SITE.linkedin} label="LinkedIn" brand="#0A66C2" brandFg="#fff"><FaLinkedinIn size={16} /></BrandIconBtn>
                <BrandIconBtn href={SITE.whatsapp} label="WhatsApp" brand="#25D366" brandFg="#fff"><FaWhatsapp size={17} /></BrandIconBtn>
                <BrandIconBtn href={`mailto:${getEmail()}`} label="E-mail" brand="#EA4335" brandFg="#fff"><FiMail size={17} /></BrandIconBtn>
                <a
                  href={SITE.cvUrl}
                  download="Pedro Tozaki - CV.pdf"
                  aria-label={t.contact.cv}
                  style={{ "--brand": "#2E90E6", "--brand-fg": "#fff" } as React.CSSProperties}
                  className="fillbrand fillbtn tswap-trigger inline-flex items-center h-[42px] px-4 rounded-[11px] border border-line2 text-fg2 font-medium text-[13px] cursor-pointer"
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
function BrandIconBtn({ href, label, brand, brandFg, children }: { href: string; label: string; brand: string; brandFg: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ "--brand": brand, "--brand-fg": brandFg } as React.CSSProperties}
      className="fillbrand fillbtn tswap-trigger grid place-items-center w-[42px] h-[42px] rounded-[11px] border border-line2 text-fg2 cursor-pointer"
    >
      <span className="fillbtn-fill" aria-hidden />
      <span className="tswap relative z-[1]">
        <span className="tswap-orig">{children}</span>
        <span className="tswap-copy" aria-hidden>{children}</span>
      </span>
    </a>
  );
}
