// ===================== PROJETOS =====================
import type { Lang } from "./content";

export type Project = {
  id: string;
  name: string;
  year: string;
  /** Caminho da imagem em /public */
  img: string;
  /** Link do site ao vivo */
  live: string;
  /** Link do repositório/código. TODO: apontar para o repo específico de cada um. */
  code: string;
  featured: boolean;
  tags: string[];
  kicker: Record<Lang, string>;
  desc: Record<Lang, string>;
  bullets: Record<Lang, string[]>;
};

export const PROJECTS: Project[] = [
  {
    id: "liriun",
    name: "Liriun",
    year: "2026",
    img: "/assets/project-liriun.png",
    live: "https://www.liriun.com/",
    code: "https://github.com/TozakiMoreira/liriun",
    featured: false,
    tags: [".NET", "Next.js", "Flutter", "Google Gemini", "PostgreSQL", "Clean Architecture"],
    kicker: { pt: "Organizador por voz", en: "Voice task organizer" },
    desc: {
      pt: "App de produtividade voice-first para web, iOS e Android: você fala, a IA do Gemini interpreta e transforma em tarefa organizada com lembrete.",
      en: "Voice-first productivity app for web, iOS and Android: you speak, Gemini AI interprets and turns it into an organized task with a reminder.",
    },
    bullets: {
      pt: [
        "Backend único em C#/.NET (Clean Architecture + EF Core) servindo web e mobile via REST + JWT",
        "Captura por voz e texto interpretada pela IA do Google Gemini, que estrutura a tarefa automaticamente",
        "App Flutter (iOS/Android) com voz nativa (STT/TTS) e lembretes locais agendados",
        "Site em Next.js 15 + React 19 com área logada, i18n pt/en e banco PostgreSQL (Supabase)",
      ],
      en: [
        "Single C#/.NET backend (Clean Architecture + EF Core) serving web and mobile over REST + JWT",
        "Voice and text capture interpreted by Google Gemini AI, which structures the task automatically",
        "Flutter app (iOS/Android) with native voice (STT/TTS) and scheduled local reminders",
        "Next.js 15 + React 19 site with a logged-in app area, pt/en i18n and a PostgreSQL (Supabase) database",
      ],
    },
  },
  {
    id: "tomore",
    name: "ToMore",
    year: "2025",
    img: "/assets/project-tomore.png",
    live: "https://www.tomore.co",
    code: "https://github.com/TozakiMoreira/tomore",
    featured: false,
    tags: ["Astro", "TypeScript", "Tailwind", "Cloudflare", "Content Collections", "i18n"],
    kicker: { pt: "Estúdio de software", en: "Software studio" },
    desc: {
      pt: "Site bilíngue (PT/EN) de um estúdio de software, com portfólio de casos, formulário de contato funcional e SEO completo — em Astro SSR na Cloudflare Pages.",
      en: "Bilingual (PT/EN) software studio site, with a case-study portfolio, a working contact form and full SEO — on Astro SSR at Cloudflare Pages.",
    },
    bullets: {
      pt: [
        "Astro 5 SSR + TypeScript + Tailwind 4, com deploy na Cloudflare Pages",
        "Portfólio de casos bilíngue via Content Collections, com imagens otimizadas (astro:assets)",
        "Formulário de contato funcional: validação Zod, honeypot anti-spam e envio via Resend",
        "i18n PT/EN, SEO completo (JSON-LD, hreflang, sitemap) e View Transitions + scroll suave (Lenis)",
      ],
      en: [
        "Astro 5 SSR + TypeScript + Tailwind 4, deployed on Cloudflare Pages",
        "Bilingual case-study portfolio via Content Collections, with optimized images (astro:assets)",
        "Working contact form: Zod validation, anti-spam honeypot and delivery via Resend",
        "PT/EN i18n, full SEO (JSON-LD, hreflang, sitemap) and View Transitions + smooth scroll (Lenis)",
      ],
    },
  },
  {
    id: "eternize",
    name: "Eternize",
    year: "2026",
    img: "/assets/project-eternize.png",
    live: "https://www.eternize.art",
    code: "https://github.com/tamotsutozaki/eternize-web-site",
    featured: false,
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion", "Cloudflare Pages", "SuperFrete"],
    kicker: { pt: "Vitrine + portfólio", en: "Showcase + portfolio" },
    desc: {
      pt: "Site institucional e portfólio de uma marca de retratos de pets pintados à mão sobre madeira, com calculadora de frete serverless. Não é e-commerce: toda venda acontece por WhatsApp.",
      en: "Institutional site and portfolio for a brand of hand-painted pet portraits on wood, with a serverless shipping calculator. Not an e-commerce: every sale happens over WhatsApp.",
    },
    bullets: {
      pt: [
        "Next.js 16 (App Router, export estático) + React 19 + TypeScript + Tailwind v4",
        "Calculadora de frete via Cloudflare Pages Function (proxy da API SuperFrete, token no servidor)",
        "Portfólio com filtro por tamanho e lightbox; tabela de preços por tamanho (14/18/25 cm)",
        "Sem carrinho ou checkout: CTAs abrem conversas pré-preenchidas no WhatsApp",
      ],
      en: [
        "Next.js 16 (App Router, static export) + React 19 + TypeScript + Tailwind v4",
        "Shipping calculator via a Cloudflare Pages Function (SuperFrete API proxy, token kept server-side)",
        "Portfolio with size filtering and a lightbox; size-based pricing table (14/18/25 cm)",
        "No cart or checkout: CTAs open prefilled WhatsApp conversations",
      ],
    },
  },
];
