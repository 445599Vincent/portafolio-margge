import type { Media, Stat } from "@/lib/types";

/** Retrato principal. Al reemplazarlo, se actualiza en el hero y en "Sobre mí". */
const PORTRAIT = "/assets/margge/margge-jimenez-retrato.jpg";

/**
 * Sección "Sobre mí". Texto provisional basado únicamente en información
 * confirmada (más de 5 años, experiencia en agencias). Reemplazar con el texto definitivo.
 */
export const about = {
  heading: "Estrategia con criterio, contenido con intención.",
  paragraphs: [
    "Soy consultora de marketing digital con más de 5 años de experiencia trabajando en agencias y colaborando con marcas de diferentes sectores.",
    "Mi trabajo se mueve entre la estrategia, el contenido y la comunicación: entender a la marca y a su audiencia, definir qué decir y cómo, y acompañar la ejecución para que cada acción tenga un propósito.",
    "[Agregar párrafo con el enfoque personal de Margge, especialidades o tipo de marcas con las que trabaja.]",
  ],
  photo: {
    src: PORTRAIT,
    alt: "Retrato profesional de Margge Jiménez",
  } satisfies Media,
  /** No inventar cifras: reemplazar [XX] con datos reales o eliminar la cifra. */
  stats: [
    { value: "+5", label: "años de experiencia" },
    { value: "[XX]", label: "marcas" },
    { value: "[XX]", label: "proyectos" },
  ] satisfies Stat[],
  /** Enfoques / áreas: provisionales */
  focus: ["Estrategia", "Marketing digital", "Contenido", "Comunicación"],
};

/** Fotografía del hero (puede ser la misma que la de "Sobre mí"). */
export const heroPhoto: Media = {
  src: PORTRAIT,
  alt: "Margge Jiménez, consultora de marketing digital",
};
