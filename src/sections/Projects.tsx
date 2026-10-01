import { getProjectCards, visibleProjects } from "@/data/projects";
import { sectionIndex } from "@/data/sections";
import { categories } from "@/data/categories";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectsGallery } from "./ProjectsGallery";

export function Projects() {
  if (visibleProjects.length === 0) return null;
  // Solo las categorías que tienen al menos un proyecto visible
  const usedCategories = categories.filter((c) =>
    visibleProjects.some((p) => p.categories.includes(c.id)),
  );

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="bg-paper-2/60 py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <SectionTitle
          index={sectionIndex("proyectos")}
          eyebrow="Proyectos"
          id="proyectos-title"
          title="Trabajo seleccionado"
          description="Una selección de proyectos con marcas en las que participé. En cada caso detallo el contexto, la estrategia y mi rol específico."
        />
        <ProjectsGallery projects={getProjectCards()} categories={usedCategories} />
      </div>
    </section>
  );
}
