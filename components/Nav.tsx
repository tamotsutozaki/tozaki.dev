"use client";

import React, { useEffect, useRef, useState } from "react";
import { useApp } from "./Providers";
import { useLenis } from "./SmoothScroll";
import { SwapText } from "./SwapText";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const SECTIONS = [
  { id: "sobre", num: "01", key: "about" as const },
  { id: "skills", num: "02", key: "skills" as const },
  { id: "projetos", num: "03", key: "projects" as const },
  { id: "contato", num: "04", key: "contact" as const },
];

export function Nav() {
  const { t, theme, toggleTheme, lang, toggleLang, replayIntro, introKey } = useApp();
  const lenis = useLenis();
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Enquanto > 0, ignora o auto-hide (navegação por clique está rolando a página)
  const lockUntil = useRef(0);
  // Bolinha deslizante: uma só, ancorada sob o link ativo (translateX animado).
  const linksWrap = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const dotEl = useRef<HTMLSpanElement>(null);
  const dotShown = useRef(false); // bolinha visível agora?
  const dotReady = useRef(false); // a intro terminou? (gate de visibilidade)
  const revealTimer = useRef<number | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active; // latest-ref: timers leem o active fresco (sem closure velha)

  // Posiciona a bolinha sob o link ativo. Lê tudo de refs (à prova de closure
  // velha em timers). Se estava oculta, SALTA pro lugar (sem deslizar) + fade-in;
  // o deslize só acontece entre seções já visíveis.
  const positionDot = () => {
    const node = dotEl.current;
    if (!node) return;
    const wrap = linksWrap.current;
    const el = linkRefs.current[activeRef.current];
    // Gate da intro, seção sem link (ex.: Contato), ou container escondido
    // (display:none abaixo do md / via zoom) → esconde e zera dotShown, pra que
    // ao voltar pro desktop ela RENASÇA no lugar em vez de deslizar da borda.
    if (!dotReady.current || !wrap || !el || wrap.offsetParent === null) {
      node.style.opacity = "0";
      dotShown.current = false;
      return;
    }
    const wr = wrap.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    if (wr.width === 0) {
      node.style.opacity = "0";
      dotShown.current = false;
      return;
    }
    const tf = `translateX(${er.left - wr.left + er.width / 2}px) translateX(-50%)`;
    if (!dotShown.current) {
      node.style.transition = "none";
      node.style.transform = tf;
      void node.offsetWidth; // força reflow → o salto não anima
      node.style.transition = "transform .34s cubic-bezier(.4,0,.2,1), opacity .25s ease";
      node.style.opacity = "1";
    } else {
      node.style.transform = tf;
      node.style.opacity = "1";
    }
    dotShown.current = true;
  };

  // Reposiciona ao mudar a seção ativa (scroll-spy/clique) ou o idioma (larguras).
  useEffect(() => {
    const id = requestAnimationFrame(positionDot);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lang]);

  // GATE da intro — roda no mount (F5) e em todo "voltar ao topo" (logo / Início /
  // troca de idioma / nome no footer → replayIntro muda introKey). Esconde a
  // bolinha e só a revela DEPOIS que a intro (~1.0s) e o scroll-to-top (~1.1s)
  // assentam. Assim: (R1) no F5 não aparece antes da animação; (R3) no reset não
  // desliza atravessando as seções — some e renasce no lugar. Ao revelar, CHAMA
  // positionDot() (que lê o active fresco) — então ela reaparece mesmo que o
  // usuário só role a página depois do reset (R4).
  useEffect(() => {
    dotReady.current = false;
    dotShown.current = false;
    if (dotEl.current) dotEl.current.style.opacity = "0";
    if (revealTimer.current) clearTimeout(revealTimer.current);
    const reduce = typeof window !== "undefined" && window.matchMedia
      && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    revealTimer.current = window.setTimeout(() => {
      dotReady.current = true;
      positionDot();
    }, reduce ? 150 : 1300);
    return () => { if (revealTimer.current) clearTimeout(revealTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introKey]);

  useEffect(() => {
    const onResize = () => positionDot();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Esconde a navbar ao rolar pra baixo, mostra ao rolar pra cima
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // Durante uma navegação por clique, mantém o header visível
      if (Date.now() < lockUntil.current) {
        lastY = y;
        return;
      }
      const goingDown = y > lastY;
      // Ignora micro-movimentos e mantém visível perto do topo
      if (Math.abs(y - lastY) > 6) {
        setHidden(goingDown && y > 80);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = ["hero", ...SECTIONS.map((s) => s.id)];
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    // Mantém o header visível durante o scroll suave do clique
    setHidden(false);
    lockUntil.current = Date.now() + 1400;
    const el = document.getElementById(id);
    if (id === "hero" || !el) {
      // Fallback (sem Lenis = reduced-motion) é INSTANTÂNEO: scroll animado aqui
      // não é neutralizado pelo CSS e faria a bolinha atravessar as seções no
      // reset (R3), além de contrariar o reduced-motion.
      if (lenis) lenis.scrollTo(0);
      else window.scrollTo({ top: 0 });
      replayIntro();
      return;
    }
    if (lenis) {
      // O Lenis já honra o scrollMarginTop:80 das seções — sem offset extra
      // (passar offset causava deslocamento duplo: -80 -76 = -156px).
      lenis.scrollTo(el);
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top });
    }
  };

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between gap-[25px] h-[80px]"
        style={{ background: "var(--bg)", paddingLeft: "clamp(18px,5vw,72px)", paddingRight: "clamp(18px,5vw,72px)", transform: hidden && !menuOpen ? "translateY(-100%)" : "translateY(0)", transition: "transform .35s ease, background .5s ease, border-color .5s ease" }}
      >
        {/* Intro do header: uma única key remonta todo o conteúdo a cada replay
            (clique no logo) — evita colisão de keys entre itens irmãos. */}
        <React.Fragment key={introKey}>
        {/* Wordmark */}
        <a href="#hero" onClick={go("hero")} aria-label="Pedro Tozaki" className="nav-logo inline-flex items-baseline gap-[0.3em] cursor-pointer" style={{ fontSize: "19.4px", letterSpacing: "-0.015em" }}>
          <NavItem delay={60} mask className="inline-flex">
            <span className="font-normal text-fg3 transition-colors duration-500">pedro</span>
          </NavItem>
          <NavItem delay={120} mask className="inline-flex">
            <span className="font-bold text-fg transition-colors duration-500">tozaki</span>
          </NavItem>
        </a>

        {/* Grupo à direita: links + CTA + controles */}
        <div className="flex items-center gap-[11px]">
          {/* Links desktop */}
          <div ref={linksWrap} className="relative hidden md:flex items-center gap-0.5">
            <NavItem delay={130} mask className="inline-flex">
              <a
                ref={(el) => { linkRefs.current["hero"] = el; }}
                href="#hero"
                onClick={go("hero")}
                className="tswap-trigger relative inline-flex items-center px-[15px] py-[9px] font-mono text-[13.75px] tracking-[0.16em] uppercase text-fg2 hover:text-fg transition-colors cursor-pointer"
              >
                <SwapText>{t.nav.home}</SwapText>
              </a>
            </NavItem>
            {SECTIONS.filter((s) => s.id !== "contato").map((s, i) => (
              <NavItem key={s.id} delay={190 + i * 60} mask className="inline-flex">
                <a
                  ref={(el) => { linkRefs.current[s.id] = el; }}
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className="tswap-trigger relative inline-flex items-center px-[15px] py-[9px] font-mono text-[13.75px] tracking-[0.16em] uppercase text-fg2 hover:text-fg transition-colors cursor-pointer"
                >
                  <SwapText>{t.nav[s.key]}</SwapText>
                </a>
              </NavItem>
            ))}
            {/* Bolinha única deslizante (sob o link ativo) — posição/visibilidade
                controladas via ref em updateDot (nasce oculta, opacity 0). */}
            <span
              ref={dotEl}
              aria-hidden
              className="pointer-events-none absolute bottom-[1px] left-0 w-[4px] h-[4px] rounded-full bg-fg"
              style={{ opacity: 0, transition: "transform .34s cubic-bezier(.4,0,.2,1), opacity .25s ease" }}
            />
          </div>
          {/* CTA desktop */}
          <NavItem delay={310} className="hidden md:inline-flex">
            <a href="#contato" onClick={go("contato")} className="fillbtn tswap-trigger inline-flex items-center justify-center px-[19px] py-[10px] rounded-lg border border-fg text-fg font-medium text-[15.6px] cursor-pointer">
              <span className="fillbtn-fill" aria-hidden />
              <span className="tswap relative z-[1]">
                <span className="tswap-orig">{t.nav.cta}</span>
                <span className="tswap-copy text-bg" aria-hidden>{t.nav.cta}</span>
              </span>
            </a>
          </NavItem>
          {/* Idioma */}
          <NavItem delay={350} className="inline-flex">
            <button onClick={(e) => { toggleLang(); go("hero")(e); }} aria-label="Toggle language" className="fillbtn tswap-trigger grid place-items-center w-[42px] h-[42px] rounded-[11px] border border-line2 text-fg font-mono text-[13px] font-semibold tracking-[0.04em] cursor-pointer">
              <span className="fillbtn-fill" aria-hidden />
              <span className="tswap relative z-[1]">
                <span className="tswap-orig">{lang === "pt" ? "PT" : "EN"}</span>
                <span className="tswap-copy text-bg" aria-hidden>{lang === "pt" ? "EN" : "PT"}</span>
              </span>
            </button>
          </NavItem>
          {/* Tema */}
          <NavItem delay={390} className="inline-flex">
            <button onClick={(e) => toggleTheme({ x: e.clientX, y: e.clientY })} aria-label="Toggle theme" className="fillbtn tswap-trigger grid place-items-center w-[42px] h-[42px] rounded-[11px] border border-line2 text-fg cursor-pointer">
              <span className="fillbtn-fill" aria-hidden />
              <span className="tswap relative z-[1]">
                <span className="tswap-orig">{theme === "dark" ? <FiMoon size={19} /> : <FiSun size={19} />}</span>
                <span className="tswap-copy text-bg" aria-hidden>{theme === "dark" ? <FiSun size={19} /> : <FiMoon size={19} />}</span>
              </span>
            </button>
          </NavItem>
          {/* Hamburguer mobile */}
          <button onClick={() => setMenuOpen((v) => !v)} aria-label="Menu" className="md:hidden grid place-items-center w-[42px] h-[42px] rounded-[11px] border border-line2 bg-transparent text-fg cursor-pointer">
            {menuOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          </button>
        </div>
        </React.Fragment>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-[99] bg-bg flex flex-col animate-rise" style={{ padding: "88px clamp(24px,7vw,56px) 40px" }}>
          <a href="#hero" onClick={go("hero")} className="flex items-baseline gap-[18px] py-5 border-b border-line font-bold uppercase text-fg cursor-pointer" style={{ fontSize: "clamp(26px,7vw,40px)", letterSpacing: "-0.03em" }}>
            <span className="font-mono text-[13px] font-medium text-fg3">00</span>
            {t.nav.home}
          </a>
          {SECTIONS.filter((s) => s.id !== "contato").map((s) => (
            <a key={s.id} href={`#${s.id}`} onClick={go(s.id)} className="flex items-baseline gap-[18px] py-5 border-b border-line font-bold uppercase text-fg cursor-pointer" style={{ fontSize: "clamp(26px,7vw,40px)", letterSpacing: "-0.03em" }}>
              <span className="font-mono text-[13px] font-medium text-fg3">{s.num}</span>
              {t.nav[s.key]}
            </a>
          ))}
          <a href="#contato" onClick={go("contato")} className="mt-auto inline-flex items-center justify-center gap-2 p-4 rounded-[10px] bg-fg text-bg font-semibold text-[15px] cursor-pointer">
            {t.nav.cta} →
          </a>
        </div>
      )}
    </>
  );
}

/** Wrapper que dá a animação de entrada (intro) a um item do header, isolando-a
 *  das transições/hover próprias do elemento. Gerencia o reveal no mount — então
 *  basta remontar (key={introKey}) para replay garantido. `mask` = rise mascarado
 *  (texto, igual ao TOZAKI); sem mask = rise + fade (botões, preserva o hover). */
function NavItem({
  delay,
  mask = false,
  className = "",
  children,
}: {
  delay: number;
  mask?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(id);
  }, [delay]);

  const vis = show ? "is-visible" : "";
  if (mask) {
    return (
      <span className={`navi-mask ${vis} ${className}`}>
        <span className="navi-inner">{children}</span>
      </span>
    );
  }
  return <span className={`navi ${vis} ${className}`}>{children}</span>;
}

