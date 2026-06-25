// ===================== SKILLS =====================
// Ícones via react-icons (Simple Icons set). Skills sem logo usam um glifo de texto.
import type { IconType } from "react-icons";
import {
  SiDotnet,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiAngular,
  SiFlutter,
  SiPostgresql,
  SiGit,
  SiDocker,
} from "react-icons/si";

export type SkillCat = "lang" | "backend" | "frontend" | "mobile" | "database" | "devops" | "arch";

export type Skill = {
  name: string;
  cat: SkillCat;
  /** Ícone react-icons OU glifo de texto (para skills sem logo no set). */
  Icon?: IconType;
  glyph?: string;
};

export const SKILLS: Skill[] = [
  { name: "C#", cat: "lang", glyph: "C#" },
  { name: ".NET", cat: "backend", Icon: SiDotnet },
  { name: "TypeScript", cat: "lang", Icon: SiTypescript },
  { name: "JavaScript", cat: "lang", Icon: SiJavascript },
  { name: "React", cat: "frontend", Icon: SiReact },
  { name: "Next.js", cat: "frontend", Icon: SiNextdotjs },
  { name: "Node.js", cat: "backend", Icon: SiNodedotjs },
  { name: "Angular", cat: "frontend", Icon: SiAngular },
  { name: "Flutter", cat: "mobile", Icon: SiFlutter },
  { name: "PostgreSQL", cat: "database", Icon: SiPostgresql },
  { name: "EF Core", cat: "database", glyph: "EF" },
  { name: "Dapper", cat: "database", glyph: "Dp" },
  { name: "REST APIs", cat: "arch", glyph: "{ }" },
  { name: "Clean Arch.", cat: "arch", glyph: "◇" },
  { name: "Git", cat: "devops", Icon: SiGit },
  { name: "Docker", cat: "devops", Icon: SiDocker },
];
