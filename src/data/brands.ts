import type { Brand } from "@/lib/types";

/**
 * Marcas con las que Margge ha trabajado.
 * NUNCA agregar marcas no confirmadas.
 *
 * Para agregar un logo: colócalo en /public/assets/brands (SVG o PNG
 * transparente, idealmente monocromo) y escribe su ruta en `logo`.
 */
export const brands: Brand[] = [
  // Confirmadas: marcas con las que Margge trabajó directamente
  { id: "cava-alta", name: "Cava Alta", logo: "/assets/brands/cava-alta.png" },
  { id: "cedaky-mall", name: "Cedaky Mall", logo: "/assets/brands/cedaky-mall.png" },
  // Pendientes
  { id: "marca-03", name: "[Marca 03]", logo: "" },
  { id: "marca-04", name: "[Marca 04]", logo: "" },
  { id: "marca-05", name: "[Marca 05]", logo: "" },
  { id: "marca-06", name: "[Marca 06]", logo: "" },
  { id: "marca-07", name: "[Marca 07]", logo: "" },
  { id: "marca-08", name: "[Marca 08]", logo: "" },
];

export function getBrand(id: string): Brand {
  return brands.find((b) => b.id === id) ?? { id, name: "[Agregar marca]", logo: "" };
}
