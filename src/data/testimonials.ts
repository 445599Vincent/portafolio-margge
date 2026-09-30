import type { Testimonial } from "@/lib/types";

/**
 * Testimonios REALES de clientes, supervisores, compañeros o marcas.
 * NUNCA inventar testimonios. La sección permanece oculta mientras no haya
 * ningún testimonio con `approved: true`.
 *
 * Ejemplo de estructura:
 * {
 *   id: "nombre-apellido",
 *   quote: "Texto del testimonio tal cual fue escrito.",
 *   author: "Nombre Apellido",
 *   role: "Cargo",
 *   company: "Empresa",
 *   relation: "supervisor",
 *   approved: true,
 * }
 */
export const testimonials: Testimonial[] = [];

export const approvedTestimonials = testimonials.filter((t) => t.approved);
