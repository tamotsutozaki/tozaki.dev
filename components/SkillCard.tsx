"use client";

import React from "react";
import { useApp } from "./Providers";
import type { Skill } from "@/lib/skills";

/**
 * Card de tecnologia da grade bento. O `size` define o destaque; no hover o
 * card é pintado com a cor de marca (`color`), texto/ícone sempre claros, e
 * um brilho (spotlight) acompanha o cursor.
 */
export function SkillCard({ skill }: { skill: Skill }) {
  const { t } = useApp();
  const { Icon, glyph, cat, name, size, color } = skill;

  const iconSize = size === 4 ? 46 : size === 2 ? 34 : 28;
  const wmSize = size === 4 ? 240 : size === 2 ? 168 : 120;
  const nameSize = size === 4 ? "text-[24px]" : size === 2 ? "text-[17px]" : "text-[15px]";

  const style = color
    ? ({ "--brand": color, "--brand-fg": "#ffffff" } as React.CSSProperties)
    : undefined;

  // Spotlight: posição do brilho acompanha o cursor.
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div
      style={style}
      onMouseMove={onMouseMove}
      className="skill-card group relative flex h-full flex-col overflow-hidden rounded-[13px] border border-line bg-bg-elev p-[18px]"
    >
      <div className="sc-icon z-[1] flex items-center text-fg">
        {Icon ? (
          <Icon size={iconSize} />
        ) : (
          <span className="font-mono font-bold" style={{ fontSize: iconSize * 0.7 }}>{glyph}</span>
        )}
      </div>

      <div className="z-[1] mt-auto">
        <div className={`sc-name font-semibold tracking-[-0.01em] text-fg ${nameSize}`}>{name}</div>
        <div className="sc-cat mt-1 font-mono text-[10px] tracking-[0.12em] uppercase text-fg3">{t.skills.cats[cat]}</div>
      </div>

      {/* Marca d'água (ícone fantasma no canto) */}
      <span className="sc-wm pointer-events-none absolute bottom-[-18px] right-[-14px] text-fg">
        {Icon ? (
          <Icon size={wmSize} />
        ) : (
          <span className="font-mono font-bold" style={{ fontSize: wmSize * 0.8, lineHeight: 1 }}>{glyph}</span>
        )}
      </span>
    </div>
  );
}
