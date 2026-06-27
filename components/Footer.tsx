"use client";

import React from "react";
import { useApp } from "./Providers";
import { useLenis } from "./SmoothScroll";
import { SITE, getEmail } from "@/lib/site";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { FiMail, FiDownload } from "react-icons/fi";

export function Footer() {
  const { t, replayIntro } = useApp();
  const lenis = useLenis();
  const email = getEmail();

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // "hero" / topo: volta ao início (mesmo comportamento do wordmark da navbar)
    if (id === "hero") {
      // Fallback sem Lenis (reduced-motion) é instantâneo — ver Nav.tsx (R3).
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0 });
      replayIntro();
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el);
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top });
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
                <span className="w-[6px] h-[6px] rounded-full bg-[#2E90E6]" />
              </span>
              {t.contact.availLine}
            </div>
            <a href="#contato" onClick={go("contato")} className="group inline-flex items-center gap-2.5 font-bold text-fg cursor-pointer max-md:py-2 max-md:-my-2" style={{ fontSize: "clamp(1.4rem,3vw,2.1rem)", letterSpacing: "-0.03em" }}>
              {t.footer.cta}
              <span className="transition-transform duration-150 group-hover:translate-x-[4px] group-hover:-translate-y-[7px]" style={{ fontSize: "0.7em" }}>↗</span>
            </a>
          </div>
        </div>

        <a href="#hero" onClick={go("hero")} aria-label="Voltar ao início" className="display-name footer-name inline-block cursor-pointer">PEDRO<br />TOZAKI</a>

        <div className="flex justify-between flex-wrap items-center gap-3 mt-[30px] pt-6 border-t border-line font-mono text-[11px] tracking-[0.04em] text-fg3">
          <span>{t.footer.rights}</span>
          <div className="flex gap-2.5">
            <Social href={SITE.github} label="GitHub" brand="var(--fg)" brandFg="var(--bg)"><FaGithub size={17} /></Social>
            <Social href={SITE.linkedin} label="LinkedIn" brand="#0A66C2" brandFg="#fff"><FaLinkedinIn size={16} /></Social>
            <Social href={SITE.whatsapp} label="WhatsApp" brand="#25D366" brandFg="#fff"><FaWhatsapp size={17} /></Social>
            <Social href={`mailto:${email}`} label="Email" brand="#EA4335" brandFg="#fff"><FiMail size={17} /></Social>
            {/* CV: mostra "CV"; no hover troca pelo ícone de download */}
            <a
              href={SITE.cvUrl}
              download="Pedro Tozaki - CV.pdf"
              aria-label="Baixar CV"
              style={{ "--brand": "#2E90E6", "--brand-fg": "#fff" } as React.CSSProperties}
              className="fillbrand fillbtn tswap-trigger grid place-items-center w-10 h-10 max-md:w-11 max-md:h-11 rounded-[9px] border border-line2 text-fg2 font-mono text-[12px] font-semibold cursor-pointer"
            >
              <span className="fillbtn-fill" aria-hidden />
              <span className="tswap relative z-[1]">
                <span className="tswap-orig">CV</span>
                <span className="tswap-copy" aria-hidden><FiDownload size={16} /></span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Social({ href, label, brand, brandFg, children }: { href: string; label: string; brand: string; brandFg: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{ "--brand": brand, "--brand-fg": brandFg } as React.CSSProperties}
      className="fillbrand fillbtn tswap-trigger grid place-items-center w-10 h-10 max-md:w-11 max-md:h-11 rounded-[9px] border border-line2 text-fg2 cursor-pointer"
    >
      <span className="fillbtn-fill" aria-hidden />
      <span className="tswap relative z-[1]">
        <span className="tswap-orig">{children}</span>
        <span className="tswap-copy" aria-hidden>{children}</span>
      </span>
    </a>
  );
}
