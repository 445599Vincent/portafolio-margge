import { services } from "@/data/services";
import { sectionIndex } from "@/data/sections";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function Services() {
  if (services.length === 0) return null;
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="border-t border-line py-24 sm:py-32 lg:py-40">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionTitle
            index={sectionIndex("servicios")}
            eyebrow="Servicios"
            id="servicios-title"
            title="Cómo puedo ayudarte"
            description="Servicios como consultora independiente. Cada proyecto se adapta al momento y a los objetivos de la marca."
          />
          <div className="mt-10 hidden lg:block" data-reveal>
            <ButtonLink href="/#contacto">Cuéntame tu proyecto</ButtonLink>
          </div>
        </div>
        <ul data-reveal>
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </ul>
        <div className="lg:hidden">
          <ButtonLink href="/#contacto">Cuéntame tu proyecto</ButtonLink>
        </div>
      </div>
    </section>
  );
}
