"use client";

import React from "react";
import { useApp } from "./Providers";
import { useLenis } from "./SmoothScroll";
import { SwapText } from "./SwapText";
import { SITE, getEmail } from "@/lib/site";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

export function Footer() {
  const { t, replayIntro } = useApp();
  const lenis = useLenis();
  const email = getEmail();

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // "hero" / topo: volta ao início (mesmo comportamento do wordmark da navbar)
    if (id === "hero") {
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
      replayIntro();
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-line overflow-hidden" style={{ padding: "clamp(56px,9vh,110px) clamp(18px,5vw,72px) 38px" }}>
      <div className="mx-auto" style={{ maxWidth: 1240 }}>
        <div className="flex justify-between flex-wrap items-start gap-7" style={{ marginBottom: "clamp(20px,4vh,44px)" }}>
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[12.5px] text-fg2 mb-3.5">
              <span className="relative inline-grid place-items-center w-[7px] h-[7px]">
                <span className="pulse-dot" />
                <span className="w-[6px] h-[6px] rounded-full bg-fg" />
              </span>
              {t.contact.availLine}
            </div>
            <a href="#contato" onClick={go("contato")} className="tswap-trigger inline-flex items-center font-bold text-fg cursor-pointer" style={{ fontSize: "clamp(1.4rem,3vw,2.1rem)", letterSpacing: "-0.03em" }}>
              <SwapText>
                <span className="inline-flex items-center gap-2.5">{t.contact.heading}<span style={{ fontSize: "0.7em" }}>↗</span></span>
              </SwapText>
            </a>
          </div>
        </div>

        <a href="#hero" onClick={go("hero")} aria-label="Voltar ao início" className="display-name footer-name inline-block cursor-pointer">PEDRO<br />TOZAKI</a>

        <div className="flex justify-between flex-wrap items-center gap-3 mt-[30px] pt-6 border-t border-line font-mono text-[11px] tracking-[0.04em] text-fg3">
          <span>{t.footer.rights}</span>
          <div className="flex gap-2.5">
            <Social href={SITE.github} label="GitHub"><FaGithub size={17} /></Social>
            <Social href={SITE.linkedin} label="LinkedIn"><FaLinkedinIn size={16} /></Social>
            <Social href={`mailto:${email}`} label="Email"><FiMail size={17} /></Social>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="fillbtn tswap-trigger grid place-items-center w-10 h-10 rounded-[9px] border border-line2 text-fg2 cursor-pointer">
      <span className="fillbtn-fill" aria-hidden />
      <span className="tswap relative z-[1]">
        <span className="tswap-orig">{children}</span>
        <span className="tswap-copy text-bg" aria-hidden>{children}</span>
      </span>
    </a>
  );
}
