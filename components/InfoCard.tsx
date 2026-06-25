"use client";

import React from "react";
import type { IconType } from "react-icons";

type HoverFx = "grow" | "spotlight" | "jump" | "lift";

/**
 * Card de informação da seção Sobre — ícone + rótulo em maiúsculas + valor.
 * `hover` escolhe o efeito de hover (teste A/B entre os cards estáticos).
 */
export function InfoCard({
  icon: Icon,
  label,
  className = "",
  style,
  hover,
  children,
}: {
  icon: IconType;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  hover?: HoverFx;
  children: React.ReactNode;
}) {
  // Spotlight: atualiza a posição do brilho conforme o cursor.
  const onMouseMove =
    hover === "spotlight"
      ? (e: React.MouseEvent<HTMLDivElement>) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      : undefined;

  const fx = hover ? `card-fx card-${hover}` : "hover:bg-bg-elev2";

  return (
    <div
      style={style}
      onMouseMove={onMouseMove}
      className={`theme-invert group flex flex-col gap-3 rounded-xl border-[1.5px] border-line2 bg-bg-elev p-5 transition-[transform,box-shadow,background-color,border-color,color] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_-18px_rgba(0,0,0,0.5)] ${fx} ${className}`}
    >
      <div className="relative z-[1] flex items-center gap-3">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-lg border border-line2 text-fg">
          <Icon size={16} aria-hidden />
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-fg3">{label}</span>
      </div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
