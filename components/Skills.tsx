"use client";

import React from "react";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { SKILLS } from "@/lib/skills";

export function Skills() {
  const { t } = useApp();
  const marqueeItems = SKILLS.map((s) => s.name);

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

        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,184px),1fr))" }}>
          {SKILLS.map((s, i) => {
            const Icon = s.Icon;
            return (
              <Reveal key={s.name} delay={(i % 4) * 50}>
                <div className="group relative overflow-hidden p-[18px] bg-bg-elev border border-line rounded-[13px] flex flex-col hover:-translate-y-1 hover:border-line2 hover:bg-bg-elev2 transition-all duration-300" style={{ minHeight: 138 }}>
                  <div className="h-[30px] flex items-center z-[1] text-fg">
                    {Icon ? <Icon size={28} /> : <span className="font-mono text-[19px] font-bold text-fg">{s.glyph}</span>}
                  </div>
                  <div className="mt-auto z-[1]">
                    <div className="font-semibold text-[15.5px] tracking-[-0.01em] text-fg">{s.name}</div>
                    <div className="mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-fg3">{t.skills.cats[s.cat]}</div>
                  </div>
                  {/* Marca d'água */}
                  <span className="absolute right-[-14px] bottom-[-18px] text-fg pointer-events-none" style={{ opacity: 0.05 }}>
                    {Icon ? <Icon size={120} /> : <span className="font-mono font-bold" style={{ fontSize: 96, lineHeight: 1 }}>{s.glyph}</span>}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

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
