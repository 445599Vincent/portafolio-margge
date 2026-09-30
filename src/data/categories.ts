import type { Category } from "@/lib/types";

/**
 * Categorías para filtrar proyectos. Editables libremente.
 * Solo se muestran en los filtros las categorías que tengan al menos un proyecto publicado.
 */
export const categories: Category[] = [
  { id: "social-media", label: "Social Media" },
  { id: "estrategia", label: "Estrategia" },
  { id: "branding", label: "Branding" },
  { id: "campanas", label: "Campañas" },
  { id: "contenido", label: "Producción de contenido" },
  { id: "lanzamientos", label: "Lanzamientos" },
  { id: "marketing-digital", label: "Marketing digital" },
];

export function getCategoryLabel(id: string): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
