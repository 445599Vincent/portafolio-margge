import { experience } from "@/data/experience";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExperienceItem } from "@/components/ExperienceItem";

export function Experience() {
  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <SectionTitle
          index="03"
          eyebrow="Experiencia"
          id="experiencia-title"
          title="Recorrido profesional"
          description="Más de 5 años en agencias, trabajando con equipos creativos y cuentas de distintos sectores."
        />
        <ol className="mt-16 sm:mt-20">
          {experience.map((entry) => (
            <ExperienceItem key={entry.id} entry={entry} />
          ))}
        </ol>
      </div>
    </section>
  );
}
