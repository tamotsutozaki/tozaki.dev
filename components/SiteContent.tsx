import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Divider } from "@/components/Divider";

/** Conteúdo do site — compartilhado entre a home (/) e a entrada em inglês (/en).
 *  O idioma em si é resolvido no Providers (lê a URL: /en ou ?lang=en). */
export function SiteContent() {
  return (
    <main>
      <Nav />
      <Hero />
      <Divider />
      <About />
      <Divider />
      <Skills />
      <Divider />
      <Projects />
      <Divider />
      <Contact />
      <Footer />
    </main>
  );
}
