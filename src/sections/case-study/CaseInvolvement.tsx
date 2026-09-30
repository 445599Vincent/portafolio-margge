import type { Project } from "@/lib/types";
import { getBrand } from "@/data/brands";
import { site } from "@/data/site";
import { Content } from "@/components/ui/Content";

/**
 * Bloque clave del caso: separa claramente
 * "trabajó con esta marca" de "fue responsable de estas acciones".
 */
export function CaseInvolvement({ project }: { project: Project }) {
  const { collaboration, responsibleFor, teamContributions } = project.involvement;
  const brand = getBrand(project.brandId);

  return (
    <section
      aria-labelledby="participacion-title"
      className="my-10 border border-ink/15 bg-paper-2/50 p-6 sm:my-14 sm:p-10 lg:p-14"
      data-reveal
    >
      <h2 id="participacion-title" className="eyebrow text-accent">
        Participación de {site.shortName}
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-3 lg:gap-12">
        <div>
          <h3 className="text-sm font-medium">Colaboración con la marca</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            <Content text={brand.name} className="text-ink" />
          </p>
          <Content text={collaboration} as="p" className="mt-2 leading-relaxed" />
        </div>

        <div className="lg:col-span-2 lg:border-l lg:border-ink/10 lg:pl-12">
          <h3 className="text-sm font-medium">Responsabilidad directa de {site.shortName}</h3>
          <ul className="mt-4 space-y-3">
            {responsibleFor.map((item, i) => (
              <li key={i} className="flex gap-3 text-lg leading-snug">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent" />
                <Content text={item} />
              </li>
            ))}
          </ul>

          {teamContributions && teamContributions.length > 0 && (
            <div className="mt-10 border-t border-ink/10 pt-6">
              <h3 className="text-sm font-medium text-muted">Trabajo del equipo o la agencia</h3>
              <p className="mt-1 text-xs text-muted">
                Se incluye como contexto. No se atribuye a {site.shortName}.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {teamContributions.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="mt-[0.65em] h-px w-3 shrink-0 bg-current" />
                    <Content text={item} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
