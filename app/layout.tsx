import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Archivo_Black } from "next/font/google";
import { Providers, noFlashScript } from "@/components/Providers";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const archivo = Archivo_Black({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Pedro Tozaki — Full-Stack Developer",
  description:
    "Full-Stack Developer baseado no Brasil. Construo aplicações do back ao front, do conceito ao deploy. Disponível para projetos freelance e oportunidades.",
  openGraph: {
    title: "Pedro Tozaki — Full-Stack Developer",
    description: "Construo aplicações do back ao front, do conceito ao deploy.",
    type: "website",
    // TODO: adicionar uma OG image em /public e referenciar aqui:
    // images: ["/og.png"],
  },
  metadataBase: new URL("https://tozaki.dev"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning className={`${inter.variable} ${mono.variable} ${archivo.variable}`}>
      <head>
        {/* Aplica o tema antes da página pintar (evita flash) */}
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body>
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
