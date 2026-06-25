"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Revela o conteúdo ao entrar na viewport (entrance animation).
 * - `mask`: o conteúdo emerge de baixo DENTRO do próprio espaço (overflow hidden) —
 *   ideal para títulos. Sem `mask`: fade + slide pra cima (ideal para blocos/cards).
 * - `delay`: atraso em ms, para fazer stagger (cascata) entre elementos.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  mask = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  mask?: boolean;
  as?: keyof JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (mask) {
    return React.createElement(
      Tag,
      {
        ref: ref as React.Ref<HTMLElement>,
        className: `reveal-mask ${visible ? "is-visible" : ""} ${className}`,
      },
      React.createElement(
        "div",
        { className: "reveal-inner", style: delay ? { transitionDelay: `${delay}ms` } : undefined },
        children
      )
    );
  }

  return React.createElement(
    Tag,
    {
      ref: ref as React.Ref<HTMLElement>,
      className: `reveal ${visible ? "is-visible" : ""} ${className}`,
      style: delay ? { transitionDelay: `${delay}ms` } : undefined,
    },
    children
  );
}
