"use client";

import React from "react";

/** Cabeçalho padrão de seção: número gigante + chip-label + heading (+ filhos opcionais). */
export function SectionHeader({
  num,
  label,
  heading,
  children,
  headingMaxCh,
}: {
  num: string;
  label: string;
  heading: string;
  children?: React.ReactNode;
  headingMaxCh?: number;
}) {
  return (
    <div className="flex items-start w-full" style={{ gap: "clamp(12px,3vw,38px)" }}>
      <span className="section-num">{num}</span>
      <div className="flex-1 min-w-0" style={{ paddingTop: "clamp(4px,1.2vw,16px)" }}>
        <span className="inline-block font-mono text-[10.5px] font-medium tracking-[0.22em] uppercase text-fg2 border border-line2 rounded-[5px] px-[11px] py-[5px] mb-[18px]">
          {label}
        </span>
        <h2
          className="m-0 font-extrabold uppercase text-fg"
          style={{ fontSize: "clamp(2rem,6vw,4.4rem)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: headingMaxCh ? `${headingMaxCh}ch` : undefined }}
        >
          {heading}
        </h2>
        {children}
      </div>
    </div>
  );
}
