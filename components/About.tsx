"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { SITE } from "@/lib/site";

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
                <h2 className="m-0 font-extrabold uppercase text-fg" style={{ fontSize: "clamp(2rem,6vw,4.4rem)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: "15ch" }}>
                  {t.about.heading}
                </h2>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="grid items-center" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: "clamp(28px,5vw,64px)" }}>
          {/* Foto */}
          <Reveal>
            <div className="relative" style={{ maxWidth: 430 }}>
              <div className="overflow-hidden rounded-2xl border border-line2 bg-bg-elev" style={{ aspectRatio: "1 / 1" }}>
                <Image src="/assets/pedro.png" alt="Pedro Tozaki" width={860} height={860} className="w-full h-full object-cover" priority />
              </div>
              <div className="absolute left-[14px] bottom-[14px] flex items-center gap-2 px-3 py-[7px] rounded-full border border-line2 font-mono text-[10.5px] tracking-[0.08em] text-fg backdrop-blur-md" style={{ background: "var(--navbg)" }}>
                <span className="relative inline-grid place-items-center w-[7px] h-[7px]">
                  <span className="pulse-dot" />
                  <span className="w-[6px] h-[6px] rounded-full bg-fg" />
                </span>
                {t.about.available}
              </div>
            </div>
          </Reveal>

          {/* Texto */}
          <Reveal delay={80} className="flex flex-col gap-5">
            <p className="m-0 text-fg" style={{ fontSize: "clamp(1rem,1.5vw,1.18rem)", lineHeight: 1.6, maxWidth: "52ch" }}>{t.about.body1}</p>
            <p className="m-0 text-fg2" style={{ fontSize: 15, lineHeight: 1.6, maxWidth: "52ch" }}>{t.about.body2}</p>

            <div className="flex items-end gap-[18px] mt-1.5 pt-[26px] border-t border-line">
              <span className="font-extrabold text-fg" style={{ fontSize: "clamp(3.2rem,6vw,5rem)", lineHeight: 0.85, letterSpacing: "-0.04em" }}>
                {SITE.projectsCount}{t.about.statSuffix}
              </span>
              <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-fg3 pb-2" style={{ lineHeight: 1.5, maxWidth: "14ch" }}>{t.about.statLabel}</span>
            </div>

            <div className="flex flex-wrap gap-2 mt-0.5">
              {[t.about.chipRole, t.about.chipLoc, t.about.chipLang].map((c) => (
                <span key={c} className="font-mono text-[11px] px-3 py-[7px] border border-line rounded-[7px] text-fg2">{c}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
