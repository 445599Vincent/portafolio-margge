import { getProjectCards, publishedProjects } from "@/data/projects";
import { categories } from "@/data/categories";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProjectsGallery } from "./ProjectsGallery";

export function Projects() {
  // Solo las categorías que tienen al menos un proyecto publicado
  const usedCategories = categories.filter((c) =>
    publishedProjects.some((p) => p.categories.includes(c.id)),
  );

  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="bg-paper-2/60 py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <SectionTitle
          index="02"
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
