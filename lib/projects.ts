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
    tags: ["C#", ".NET", "Next.js", "Flutter", "PostgreSQL", "Clean Arch."],
    kicker: { pt: "App de produtividade", en: "Productivity app" },
    desc: {
      pt: "App de produtividade voice-first para web, iOS e Android. Você fala, o Liriun escuta, organiza e lembra.",
      en: "Voice-first productivity app for web, iOS and Android. You speak, Liriun listens, organizes and reminds.",
    },
    bullets: {
      pt: [
        "Back-end em C#/.NET com Clean Architecture e EF Core",
        "Front-end web em Next.js e React",
        "App mobile em Flutter para iOS e Android",
        "Banco de dados PostgreSQL",
      ],
      en: [
        "Back-end in C#/.NET with Clean Architecture and EF Core",
        "Web front-end in Next.js and React",
        "Mobile app in Flutter for iOS and Android",
        "PostgreSQL database",
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
    tags: ["Astro", "TypeScript", "Zod", "Resend", "i18n", "SEO"],
    kicker: { pt: "Estúdio de software", en: "Software studio" },
    desc: {
      pt: "Site bilíngue de um estúdio de software, com formulário de contato funcional, i18n e SEO completo.",
      en: "Bilingual software studio site, with a working contact form, i18n and full SEO.",
    },
    bullets: {
      pt: [
        "Construído em Astro + TypeScript",
        "Formulário com validação Zod e envio via Resend",
        "i18n PT/EN e SEO completo",
        "Foco em performance e acessibilidade",
      ],
      en: [
        "Built with Astro + TypeScript",
        "Form with Zod validation and Resend delivery",
        "PT/EN i18n and full SEO",
        "Focus on performance and accessibility",
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
    tags: ["Next.js", "TypeScript", "Tailwind", "Cloudflare", "Serverless"],
    kicker: { pt: "Vitrine + e-commerce", en: "Showcase + e-commerce" },
    desc: {
      pt: "Vitrine de produtos sob encomenda com calculadora de frete serverless integrada à API SuperFrete.",
      en: "Made-to-order product showcase with a serverless shipping calculator integrated with the SuperFrete API.",
    },
    bullets: {
      pt: [
        "Next.js + TypeScript + Tailwind",
        "Cálculo de frete em Cloudflare Function (serverless)",
        "Integração com a API SuperFrete",
        "Deploy na Cloudflare Pages",
      ],
      en: [
        "Next.js + TypeScript + Tailwind",
        "Shipping calculation via Cloudflare Function (serverless)",
        "Integration with the SuperFrete API",
        "Deployed on Cloudflare Pages",
      ],
    },
  },
];
