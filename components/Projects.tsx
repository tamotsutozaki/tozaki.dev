"use client";

import React from "react";
import Image from "next/image";
import { useApp } from "./Providers";
import { Reveal } from "./Reveal";
import { PROJECTS } from "@/lib/projects";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";

export function Projects() {
  const { t, lang } = useApp();
  const count = String(PROJECTS.length).padStart(2, "0");

  // Spotlight (reflexo) acompanhando o cursor sobre o card inteiro.
  const onCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section id="projetos" className="relative overflow-hidden" style={{ scrollMarginTop: 80, padding: "clamp(80px,12vh,150px) clamp(18px,5vw,72px)" }}>
      <span className="watermark" style={{ fontSize: "clamp(4.5rem,9vw,8.5rem)" }}>{t.projects.label}</span>

      <div className="relative z-[1] mx-auto" style={{ maxWidth: 1240 }}>
        {/* Header */}
        <div style={{ marginBottom: "clamp(48px,7vh,84px)" }}>
          <div className="flex items-start" style={{ gap: "clamp(12px,3vw,38px)" }}>
            <Reveal className="flex-none"><span className="section-num">03</span></Reveal>
            <div className="flex-1 min-w-0" style={{ paddingTop: "clamp(4px,1.2vw,16px)" }}>
              <Reveal delay={90} className="mb-[18px]">
                <span className="inline-block font-mono text-[10.5px] font-medium tracking-[0.22em] uppercase text-fg2 border border-line2 rounded-[5px] px-[11px] py-[5px]">{t.projects.label}</span>
              </Reveal>
              <Reveal mask delay={160}>
                <h2 className="m-0 font-extrabold uppercase text-fg" style={{ fontSize: "clamp(2rem,6vw,4.4rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>{t.projects.heading}</h2>
              </Reveal>
            </div>
          </div>
          {/* sub + contador — começa sob o número (alinhado à esquerda) */}
          <Reveal delay={240}>
            <div className="flex items-baseline justify-between gap-6 flex-wrap" style={{ marginTop: "clamp(14px,2vh,22px)" }}>
              <p className="m-0 text-fg2" style={{ maxWidth: "40ch", fontSize: 15, lineHeight: 1.5 }}>{t.projects.sub}</p>
              <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase text-fg3 whitespace-nowrap flex-none">
                <span className="w-[34px] h-px bg-line2" />
                {count} {t.projects.countLabel}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="flex flex-col" style={{ gap: "clamp(20px,4vh,40px)" }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <article
                onMouseMove={onCardMove}
                className="theme-invert card-fx card-spotlight proj-card relative grid items-center bg-bg-elev border border-line rounded-2xl"
                style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,330px),1fr))", gap: "clamp(20px,3.5vw,52px)", padding: "clamp(18px,2.4vw,30px)" }}
              >
                <div className="relative z-[1] border border-line rounded-[11px] overflow-hidden bg-bg" style={{ aspectRatio: "16 / 10" }}>
                  <Image src={p.img} alt={p.name} fill className="object-cover" style={{ objectPosition: "top center" }} sizes="(max-width: 768px) 100vw, 50vw" />
                  {p.featured && (
                    <span className="absolute left-3 top-3 font-mono text-[9.5px] font-semibold tracking-[0.18em] uppercase text-bg bg-fg px-[9px] py-[5px] rounded-[5px]">{t.projects.featured}</span>
                  )}
                </div>

                <div className="relative z-[1] flex flex-col gap-[15px]">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[13px] text-fg3">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg3">{p.kicker[lang]} · {p.year}</span>
                  </div>
                  <h3 className="m-0 font-extrabold uppercase text-fg" style={{ fontSize: "clamp(1.7rem,3.4vw,2.7rem)", letterSpacing: "-0.03em", lineHeight: 0.98 }}>{p.name}</h3>
                  <p className="m-0 text-fg2" style={{ maxWidth: "48ch", fontSize: 15, lineHeight: 1.55 }}>{p.desc[lang]}</p>

                  <ul className="list-none m-0 p-0 flex flex-col gap-[9px] mt-0.5">
                    {p.bullets[lang].map((b) => (
                      <li key={b} className="flex gap-2.5 items-start text-fg2 text-sm" style={{ lineHeight: 1.45 }}>
                        <span className="flex-none mt-px text-fg"><FiCheckCircle size={15} /></span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-[7px] mt-0.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10.5px] tracking-[0.06em] uppercase px-[9px] py-[5px] border border-line rounded-md text-fg2">{tag}</span>
                    ))}
                  </div>

                  <div className="flex gap-2.5 flex-wrap mt-2">
                    <ProjectLink href={p.live} label={t.projects.live} primary />
                    <ProjectLink href={p.code} label={t.projects.code} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Botão de projeto com o mesmo efeito do header: outline + preenchimento subindo
 *  + swap (texto/seta) no lugar + respirada. `primary` dá borda mais forte. */
function ProjectLink({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`fillbtn tswap-trigger inline-flex items-center justify-center px-[17px] py-[11px] rounded-lg border ${primary ? "border-fg" : "border-line2"} text-fg font-medium text-[13px] cursor-pointer`}
    >
      <span className="fillbtn-fill" aria-hidden />
      <span className="tswap relative z-[1]">
        <span className="tswap-orig inline-flex items-center justify-center gap-[7px]">{label}<FiArrowUpRight size={14} aria-hidden /></span>
        <span className="tswap-copy text-bg inline-flex items-center justify-center gap-[7px]" aria-hidden>{label}<FiArrowUpRight size={14} /></span>
      </span>
    </a>
  );
}
