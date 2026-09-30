/**
 * Prellenado del formulario de contacto desde otras secciones de la página
 * (p. ej. "Consultar sobre este servicio"). Usa un evento del navegador para
 * no acoplar componentes: quien lo emite no necesita conocer el formulario.
 */

export const CONTACT_PREFILL_EVENT = "contacto:prefill";

export type ContactPrefill = {
  /** Debe coincidir con una opción de `projectTypes` (src/data/contact.ts). */
  projectType?: string;
  message?: string;
};

export function prefillContact(detail: ContactPrefill) {
  window.dispatchEvent(new CustomEvent<ContactPrefill>(CONTACT_PREFILL_EVENT, { detail }));
}

/**
 * Desde un caso de estudio el CTA enlaza a `/?proyecto=<slug>#contacto` y el formulario
 * propone un mensaje que menciona ese proyecto.
 */
export const PROJECT_PARAM = "proyecto";

export const contactHrefForProject = (slug: string) => `/?${PROJECT_PARAM}=${encodeURIComponent(slug)}#contacto`;

/** `title` es null cuando el título del proyecto aún es provisional. */
export function projectInterestMessage(title: string | null) {
  return title
    ? `Hola Margge, vi el caso «${title}» y me gustaría hablar sobre un proyecto similar. `
    : "Hola Margge, vi tus proyectos y me gustaría hablar sobre un proyecto similar. ";
}
