import type { Project, ProjectCardData } from "@/lib/types";
import { getBrand } from "./brands";
import { getCategoryLabel } from "./categories";

/**
 * Proyectos / casos de estudio.
 *
 * Para agregar un proyecto: copia un bloque, cambia el `slug` (será la URL:
 * /proyectos/<slug>) y reemplaza los placeholders entre corchetes.
 *
 * Reglas de contenido:
 * - `involvement.responsibleFor` solo incluye acciones confirmadas de Margge.
 * - Lo que hizo el equipo o la agencia va en `involvement.teamContributions`.
 * - `results[].verified` solo es true si el dato está confirmado y es atribuible.
 * - Imágenes en /public/assets/projects/<slug>/ (JPG/WebP, máx. ~2400 px de ancho).
 */
export const projects: Project[] = [
  {
    slug: "proyecto-01",
    published: true,
    featured: true,
    brandId: "marca-01",
    title: "[Nombre del proyecto 01]",
    categories: ["estrategia", "social-media"],
    type: "[Tipo de proyecto — ej. Estrategia de redes sociales]",
    year: "[Año]",
    industry: "[Industria]",
    role: "[Rol de Margge]",
    summary: "[Agregar descripción breve del proyecto en una o dos líneas.]",
    cover: { src: "", alt: "[Describir la imagen principal del proyecto]" },
    context: "[Agregar contexto: situación de la marca antes del proyecto.]",
    objective: "[Agregar objetivo del proyecto.]",
    challenge: "[Agregar problema o reto principal.]",
    strategy: "[Agregar estrategia utilizada.]",
    involvement: {
      collaboration: "[Ej. A través de la agencia X, como parte del equipo de cuenta]",
      responsibleFor: [
        "[Acción confirmada de la que Margge fue responsable]",
        "[Otra acción confirmada]",
      ],
      teamContributions: ["[Trabajo realizado por el equipo o la agencia]"],
    },
    execution: "[Agregar cómo se ejecutó el proyecto.]",
    deliverables: ["[Pieza o entregable 01]", "[Pieza o entregable 02]", "[Pieza o entregable 03]"],
    results: [
      { value: "[Dato]", label: "[Agregar resultado real]", verified: false },
      { value: "[Dato]", label: "[Agregar resultado real]", verified: false },
    ],
    gallery: [
      { src: "", alt: "[Agregar imagen de galería]" },
      { src: "", alt: "[Agregar imagen de galería]" },
      { src: "", alt: "[Agregar imagen de galería]" },
    ],
    learnings: "[Agregar aprendizajes o impacto del proyecto.]",
  },
  {
    slug: "proyecto-02",
    published: true,
    brandId: "marca-02",
    title: "[Nombre del proyecto 02]",
    categories: ["campanas", "marketing-digital"],
    type: "[Tipo de proyecto — ej. Campaña digital]",
    year: "[Año]",
    industry: "[Industria]",
    role: "[Rol de Margge]",
    summary: "[Agregar descripción breve del proyecto en una o dos líneas.]",
    cover: { src: "", alt: "[Describir la imagen principal del proyecto]" },
    context: "[Agregar contexto.]",
    objective: "[Agregar objetivo del proyecto.]",
    challenge: "[Agregar problema o reto principal.]",
    strategy: "[Agregar estrategia utilizada.]",
    involvement: {
      collaboration: "[Describir cómo colaboró Margge con la marca]",
      responsibleFor: ["[Acción confirmada de la que Margge fue responsable]"],
      teamContributions: ["[Trabajo realizado por el equipo o la agencia]"],
    },
    execution: "[Agregar cómo se ejecutó el proyecto.]",
    deliverables: ["[Pieza o entregable 01]", "[Pieza o entregable 02]"],
    results: [{ value: "[Dato]", label: "[Agregar resultado real]", verified: false }],
    gallery: [
      { src: "", alt: "[Agregar imagen de galería]" },
      { src: "", alt: "[Agregar imagen de galería]" },
    ],
    learnings: "[Agregar aprendizajes o impacto del proyecto.]",
  },
  {
    slug: "proyecto-03",
    published: true,
    brandId: "marca-03",
    title: "[Nombre del proyecto 03]",
    categories: ["contenido", "social-media"],
    type: "[Tipo de proyecto — ej. Producción de contenido]",
    year: "[Año]",
    industry: "[Industria]",
    role: "[Rol de Margge]",
    summary: "[Agregar descripción breve del proyecto en una o dos líneas.]",
    cover: { src: "", alt: "[Describir la imagen principal del proyecto]" },
    context: "[Agregar contexto.]",
    objective: "[Agregar objetivo del proyecto.]",
    challenge: "[Agregar problema o reto principal.]",
    strategy: "[Agregar estrategia utilizada.]",
    involvement: {
      collaboration: "[Describir cómo colaboró Margge con la marca]",
      responsibleFor: ["[Acción confirmada de la que Margge fue responsable]"],
    },
    execution: "[Agregar cómo se ejecutó el proyecto.]",
    deliverables: ["[Pieza o entregable 01]", "[Pieza o entregable 02]"],
    results: [{ value: "[Dato]", label: "[Agregar resultado real]", verified: false }],
    gallery: [
      { src: "", alt: "[Agregar imagen de galería]" },
      { src: "", alt: "[Agregar imagen de galería]" },
    ],
    learnings: "[Agregar aprendizajes o impacto del proyecto.]",
  },
  {
    slug: "proyecto-04",
    published: true,
    brandId: "marca-04",
    title: "[Nombre del proyecto 04]",
    categories: ["lanzamientos", "campanas"],
    type: "[Tipo de proyecto — ej. Lanzamiento de producto]",
    year: "[Año]",
    industry: "[Industria]",
    role: "[Rol de Margge]",
    summary: "[Agregar descripción breve del proyecto en una o dos líneas.]",
    cover: { src: "", alt: "[Describir la imagen principal del proyecto]" },
    context: "[Agregar contexto.]",
    objective: "[Agregar objetivo del proyecto.]",
    challenge: "[Agregar problema o reto principal.]",
    strategy: "[Agregar estrategia utilizada.]",
    involvement: {
      collaboration: "[Describir cómo colaboró Margge con la marca]",
      responsibleFor: ["[Acción confirmada de la que Margge fue responsable]"],
      teamContributions: ["[Trabajo realizado por el equipo o la agencia]"],
    },
    execution: "[Agregar cómo se ejecutó el proyecto.]",
    deliverables: ["[Pieza o entregable 01]", "[Pieza o entregable 02]"],
    results: [{ value: "[Dato]", label: "[Agregar resultado real]", verified: false }],
    gallery: [
      { src: "", alt: "[Agregar imagen de galería]" },
      { src: "", alt: "[Agregar imagen de galería]" },
    ],
    learnings: "[Agregar aprendizajes o impacto del proyecto.]",
  },
  {
    slug: "proyecto-05",
    published: true,
    brandId: "marca-05",
    title: "[Nombre del proyecto 05]",
    categories: ["branding", "estrategia"],
    type: "[Tipo de proyecto — ej. Consultoría de marca]",
    year: "[Año]",
    industry: "[Industria]",
    role: "[Rol de Margge]",
    summary: "[Agregar descripción breve del proyecto en una o dos líneas.]",
    cover: { src: "", alt: "[Describir la imagen principal del proyecto]" },
    context: "[Agregar contexto.]",
    objective: "[Agregar objetivo del proyecto.]",
    challenge: "[Agregar problema o reto principal.]",
    strategy: "[Agregar estrategia utilizada.]",
    involvement: {
      collaboration: "[Describir cómo colaboró Margge con la marca]",
      responsibleFor: ["[Acción confirmada de la que Margge fue responsable]"],
    },
    execution: "[Agregar cómo se ejecutó el proyecto.]",
    deliverables: ["[Pieza o entregable 01]"],
    results: [{ value: "[Dato]", label: "[Agregar resultado real]", verified: false }],
    gallery: [{ src: "", alt: "[Agregar imagen de galería]" }],
    learnings: "[Agregar aprendizajes o impacto del proyecto.]",
  },
];

export const publishedProjects = projects.filter((p) => p.published);

/** Proyectos publicados reducidos a los datos de su tarjeta (para la galería). */
export function getProjectCards(): ProjectCardData[] {
  return publishedProjects.map((p) => ({
    slug: p.slug,
    featured: p.featured,
    title: p.title,
    categories: p.categories,
    type: p.type,
    year: p.year,
    summary: p.summary,
    cover: p.cover,
    brandName: getBrand(p.brandId).name,
    categoryLabels: p.categories.map(getCategoryLabel),
  }));
}

export function getProject(slug: string) {
  return publishedProjects.find((p) => p.slug === slug);
}

/** Proyecto anterior y siguiente (circular) para la navegación entre casos. */
export function getAdjacentProjects(slug: string) {
  const i = publishedProjects.findIndex((p) => p.slug === slug);
  const n = publishedProjects.length;
  if (i === -1 || n < 2) return { prev: undefined, next: undefined };
  return {
    prev: publishedProjects[(i - 1 + n) % n],
    next: publishedProjects[(i + 1) % n],
  };
}
