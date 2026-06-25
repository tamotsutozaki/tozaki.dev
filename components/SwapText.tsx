"use client";

import React from "react";

/**
 * Efeito "text swap" no hover: o conteúdo atual sobe e some enquanto uma cópia
 * idêntica entra por baixo, dando a impressão de substituição.
 *
 * Use dentro de um elemento clicável (<a>/<button>) que tenha a classe
 * `tswap-trigger` — o hover desse elemento dispara a animação.
 */
export function SwapText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`tswap ${className ?? ""}`}>
      <span className="tswap-orig">{children}</span>
      <span className="tswap-copy" aria-hidden>{children}</span>
    </span>
  );
}
