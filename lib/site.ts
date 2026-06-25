// ===================== CONFIG DO SITE =====================
// Valores genéricos / placeholder. Troque pelos reais.
// Vários são lidos de variáveis de ambiente quando disponíveis (ver .env.example).

export const SITE = {
  name: "Pedro Tozaki",
  // E-mail montado em runtime (leve anti-spam). Ajuste as duas partes.
  emailUser: "pedro",
  emailDomain: "tozaki.dev",

  // TODO: trocar pelos links reais
  calLink: process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/seu-usuario",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "https://wa.me/55SEUNUMERO",
  linkedin: "https://linkedin.com/in/pedro-tozaki",
  github: "https://github.com/tamotsutozaki",
  leetcode: "https://leetcode.com/seu-usuario", // opcional — ver Contact.tsx
  cvUrl: "/cv-pedro-tozaki.pdf", // coloque o PDF em /public

  // Quantos projetos exibir no contador da seção Sobre
  projectsCount: 6,
} as const;

export function getEmail(): string {
  return `${SITE.emailUser}@${SITE.emailDomain}`;
}
