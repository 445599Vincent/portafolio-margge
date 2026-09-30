import { Hero } from "@/sections/Hero";
import { Brands } from "@/sections/Brands";
import { About } from "@/sections/About";
import { Projects } from "@/sections/Projects";
import { Experience } from "@/sections/Experience";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { Testimonials } from "@/sections/Testimonials";
import { FinalCTA } from "@/sections/FinalCTA";
import { Contact } from "@/sections/Contact";

/**
 * Home. El orden de las secciones se controla aquí:
 * credibilidad (marcas, sobre mí, proyectos, experiencia) antes de la oferta (servicios, proceso, contacto).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <About />
      <Projects />
      <Experience />
      <Services />
      <Process />
      <Testimonials />
      <FinalCTA />
      <Contact />
    </>
  );
}
