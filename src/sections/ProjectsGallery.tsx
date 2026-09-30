"use client";

import { useMemo } from "react";
import type { Category, ProjectCardData } from "@/lib/types";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/content";
import { setSearchParam, useSearchParam } from "@/lib/use-search-param";

type Props = { projects: ProjectCardData[]; categories: Category[] };

const ALL = "todos";
/** Parámetro de URL que guarda el filtro activo: /?categoria=branding#proyectos */
const PARAM = "categoria";

export function ProjectsGallery({ projects, categories }: Props) {
  // La URL es la fuente del filtro (enlaces compartibles); en el servidor siempre es "todos".
  const requested = useSearchParam(PARAM);
  const filter = requested && categories.some((c) => c.id === requested) ? requested : ALL;
  const setFilter = (id: string) => setSearchParam(PARAM, id === ALL ? null : id);

  const visible = useMemo(
    () => (filter === ALL ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter, projects],
  );

  const options = [{ id: ALL, label: "Todos" }, ...categories];
  const [lead, ...others] = visible;
  const leadIsLarge = lead?.featured === true;
  const grid = leadIsLarge ? others : visible;

  return (
    <div className="mt-14">
      <div
        role="group"
        aria-label="Filtrar proyectos por categoría"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {options.map((o) => {
          const count =
            o.id === ALL ? projects.length : projects.filter((p) => p.categories.includes(o.id)).length;
          const selected = filter === o.id;
          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setFilter(o.id)}
              className={cn(
                // `relative`: contiene el texto sr-only dentro del carrusel (evita scroll horizontal en móvil)
                "relative inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                selected
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/15 text-ink/70 hover:border-ink/50 hover:text-ink",
              )}
            >
              {o.label}
              <span aria-hidden className={cn("text-xs", selected ? "text-paper/60" : "text-muted")}>
                {count}
              </span>
              <span className="sr-only">
                , {count} {count === 1 ? "proyecto" : "proyectos"}
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "proyecto" : "proyectos"}
      </p>

      <div key={filter} className="mt-12 sm:mt-16">
        {leadIsLarge && lead && (
          <ProjectCard project={lead} large className="animate-fade-up mb-16 sm:mb-24" />
        )}
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-x-16 lg:gap-y-24">
          {grid.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              className={cn("animate-fade-up", i % 2 === 1 && "md:mt-28")}
            />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="py-16 text-center text-muted">No hay proyectos en esta categoría todavía.</p>
        )}
      </div>
    </div>
  );
}
