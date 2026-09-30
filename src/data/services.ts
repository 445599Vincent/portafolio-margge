import type { Service } from "@/lib/types";

/**
 * Servicios como consultora independiente.
 * Estos servicios son PROVISIONALES (`draft: true`): Margge debe confirmar cuáles ofrece.
 * Para quitar un servicio, elimina su bloque. Para confirmarlo, cambia `draft` a false.
 * `projectType` debe coincidir con una opción de `projectTypes` en contact.ts.
 */
export const services: Service[] = [
  {
    id: "estrategia-marketing-digital",
    name: "Estrategia de marketing digital",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Estrategia de marketing digital",
    draft: true,
  },
  {
    id: "estrategia-redes-sociales",
    name: "Estrategia de redes sociales",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Redes sociales",
    draft: true,
  },
  {
    id: "content-planning",
    name: "Gestión y planeación de contenido",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Contenido",
    draft: true,
  },
  {
    id: "campanas-digitales",
    name: "Campañas digitales",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Campaña digital",
    draft: true,
  },
  {
    id: "consultoria-marca",
    name: "Consultoría de marca",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Marca / branding",
    draft: true,
  },
  {
    id: "direccion-contenido",
    name: "Dirección de contenido",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Contenido",
    draft: true,
  },
  {
    id: "community-management",
    name: "Community management",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Redes sociales",
    draft: true,
  },
  {
    id: "produccion-contenido",
    name: "Producción y coordinación de contenido",
    description: "[Agregar descripción corta del servicio.]",
    details: ["[Qué incluye]", "[Entregables]", "[Para quién es]"],
    projectType: "Contenido",
    draft: true,
  },
];
