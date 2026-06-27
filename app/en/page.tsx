import type { Metadata } from "next";
import { SiteContent } from "@/components/SiteContent";

// Entrada em inglês: o Providers detecta /en e abre o site já em EN.
// Metadados em inglês para quando o link /en for compartilhado.
export const metadata: Metadata = {
  title: "Pedro Tozaki — Full-Stack Dev",
  description:
    "Full-Stack Developer based in Brazil. I build applications back to front, concept to deploy. Available for freelance projects and professional opportunities.",
  alternates: { canonical: "/en" },
  openGraph: {
    title: "Pedro Tozaki — Full-Stack Developer",
    description: "I build applications back to front, concept to deploy.",
    type: "website",
    url: "https://tozaki.dev/en",
    siteName: "Pedro Tozaki",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pedro Tozaki — Full-Stack Developer" }],
  },
};

export default function HomeEn() {
  return <SiteContent />;
}
