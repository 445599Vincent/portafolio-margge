import { navigation } from "./site";
import { visibleProjects } from "./projects";
import { visibleExperience } from "./experience";

/**
 * Secciones que se ocultan cuando no tienen contenido listo (en producción todo lo
 * provisional se oculta; ver `showPlaceholders` en src/lib/content.ts).
 */
export const sectionVisible = {
  proyectos: visibleProjects.length > 0,
  experiencia: visibleExperience.length > 0,
};

/** Menú sin enlaces a secciones ocultas. */
export const visibleNavigation = navigation.filter(
  (n) => !(n.id in sectionVisible) || sectionVisible[n.id as keyof typeof sectionVisible],
);

/** Orden de las secciones numeradas de la home (ver src/app/page.tsx). */
const numbered = ["sobre-mi", "proyectos", "experiencia", "servicios", "metodologia", "contacto"] as const;

/** Número consecutivo ("01", "02"…) que salta las secciones ocultas. */
export function sectionIndex(id: (typeof numbered)[number]) {
  const visible = numbered.filter((s) => !(s in sectionVisible) || sectionVisible[s as keyof typeof sectionVisible]);
  return String(visible.indexOf(id) + 1).padStart(2, "0");
}
