// ===================== SKILLS =====================
// Grade "bento": cada skill tem um tamanho (1 pequeno, 2 médio, 4 grande)
// proporcional ao uso/relevância. `hidden` fica atrás do botão "Ver todas".
// `color` = cor de marca, usada para pintar o card no hover.
import type { IconType } from "react-icons";
import {
  SiCsharp,
  SiDotnet,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiFlutter,
  SiPython,
  SiPostgresql,
  SiMicrosoftsqlserver,
  SiGit,
  SiDocker,
  SiTailwindcss,
  SiAstro,
  SiCloudflare,
  SiRender,
  SiPostman,
  SiMicrosoftazure,
  SiOracle,
  SiC,
  SiPhp,
  SiLaravel,
  SiBootstrap,
  SiMysql,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";

export type SkillCat = "lang" | "backend" | "frontend" | "mobile" | "database" | "devops" | "arch" | "cloud";

/** 1 = pequeno (1 célula) · 2 = médio (2 células) · 4 = grande (2×2). */
export type SkillSize = 1 | 2 | 4;

export type Skill = {
  name: string;
  cat: SkillCat;
  size: SkillSize;
  /** Quando true, só aparece após clicar em "Ver todas as tecnologias". */
  hidden?: boolean;
  /** Quando true, fica oculto no mobile (<768px) — evita linha ímpar na grade 2-col. */
  hideMobile?: boolean;
  /** Ícone react-icons OU glifo de texto (para skills sem logo no set). */
  Icon?: IconType;
  glyph?: string;
  /** Cor de marca (hex) — pinta o card no hover. */
  color?: string;
};

// Ordenado por categoria (itens relacionados ficam juntos), com o card maior
// de cada grupo como âncora. As ocultas seguem o mesmo agrupamento.
export const SKILLS: Skill[] = [
  // ---- Linguagens
  { name: "C#", cat: "lang", size: 4, Icon: SiCsharp, color: "#9B4F96" },
  { name: "TypeScript", cat: "lang", size: 2, Icon: SiTypescript, color: "#3178C6" },

  // ---- Frontend
  { name: "React", cat: "frontend", size: 4, Icon: SiReact, color: "#61DAFB" },
  { name: "Angular", cat: "frontend", size: 2, Icon: SiAngular, color: "#DD0031" },
  { name: "ASP.NET Core", cat: "backend", size: 2, Icon: SiDotnet, color: "#512BD4" },
  { name: "Tailwind CSS", cat: "frontend", size: 1, Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Astro", cat: "frontend", size: 1, Icon: SiAstro, color: "#FF5D01" },

  // ---- Backend
  { name: "Next.js", cat: "frontend", size: 2, Icon: SiNextdotjs, color: "#000000" },

  // ---- Banco de dados
  { name: "PostgreSQL", cat: "database", size: 2, Icon: SiPostgresql, color: "#4169E1" },
  { name: "SQL Server", cat: "database", size: 1, Icon: SiMicrosoftsqlserver, color: "#CC2927" },

  // ---- Arquitetura
  { name: "Clean Arch.", cat: "arch", size: 1, glyph: "◇", color: "#64748B" },
  { name: "REST APIs", cat: "arch", size: 1, glyph: "{ }", color: "#64748B" },

  // ---- DevOps  (Cloudflare ocupa o slot do Git — troca posicional por layout)
  { name: "Cloudflare", cat: "cloud", size: 1, Icon: SiCloudflare, color: "#F38020" },
  { name: "Docker", cat: "devops", size: 1, Icon: SiDocker, color: "#2496ED" },
  { name: "Postman", cat: "devops", size: 1, Icon: SiPostman, color: "#FF6C37" },

  // ---- Cloud / Deploy  (Git ocupa o slot do Cloudflare)
  { name: "Git", cat: "devops", size: 1, Icon: SiGit, color: "#F05032" },
  { name: "Render", cat: "cloud", size: 1, Icon: SiRender, color: "#46E3B7" },
  { name: "Azure", cat: "cloud", size: 1, Icon: SiMicrosoftazure, color: "#0078D4" },
  { name: "Oracle Cloud", cat: "cloud", size: 1, hideMobile: true, Icon: SiOracle, color: "#F80000" },

  // ---- Ocultas (atrás do botão "Ver todas") — agrupadas por categoria
  { name: "Python", cat: "lang", size: 1, hidden: true, Icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", cat: "lang", size: 1, hidden: true, Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", cat: "lang", size: 1, hidden: true, Icon: FaJava, color: "#007396" },
  { name: "C", cat: "lang", size: 1, hidden: true, Icon: SiC, color: "#A8B9CC" },
  { name: "PHP", cat: "lang", size: 1, hidden: true, Icon: SiPhp, color: "#777BB4" },
  { name: "Bootstrap", cat: "frontend", size: 1, hidden: true, Icon: SiBootstrap, color: "#7952B3" },
  { name: "Laravel", cat: "backend", size: 1, hidden: true, Icon: SiLaravel, color: "#FF2D20" },
  { name: "MySQL", cat: "database", size: 1, hidden: true, Icon: SiMysql, color: "#4479A1" },
  { name: "MVC", cat: "arch", size: 2, hidden: true, glyph: "▤", color: "#64748B" },
  { name: "Flutter", cat: "mobile", size: 2, hidden: true, Icon: SiFlutter, color: "#02569B" },
];
