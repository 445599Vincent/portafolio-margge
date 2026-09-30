/**
 * Configuración general del sitio: identidad, SEO, contacto y redes.
 * Los campos vacíos ("") se muestran como placeholders o se ocultan.
 */
export const site = {
  name: "Margge Jiménez",
  shortName: "Margge",
  /** Título profesional provisional */
  title: "Consultora de Marketing Digital",
  /** Propuesta de valor provisional (hero) */
  tagline: "Estrategia, contenido y marcas que conectan.",
  /** Línea de apoyo del hero */
  intro:
    "Más de 5 años en agencias diseñando estrategia, contenido y comunicación para marcas de distintos sectores.",

  /**
   * URL pública (SEO, sitemap, Open Graph). Prioridad: NEXT_PUBLIC_SITE_URL →
   * URL de producción que inyectan Vercel o Netlify en el build → localhost en desarrollo.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    process.env.URL ||
    "http://localhost:3000",
  /**
   * Indexación en buscadores. Con SITE_NOINDEX="true" (hoy en netlify.toml, mientras haya contenido
   * provisional) todas las páginas llevan `noindex`. Para lanzar: quitar esa variable y volver a publicar.
   */
  indexable: process.env.SITE_NOINDEX !== "true",
  locale: "es_MX",
  seo: {
    title: "Margge Jiménez | Consultora de Marketing Digital",
    description:
      "Margge Jiménez, consultora de marketing digital con más de 5 años de experiencia en agencias. Estrategia, contenido y comunicación para marcas.",
    keywords: [
      "marketing digital",
      "consultora de marketing",
      "estrategia de contenido",
      "redes sociales",
      "Margge Jiménez",
    ],
  },

  /** Canales de contacto. Dejar "" para mostrar el placeholder. */
  contact: {
    email: "",
    /** Solo dígitos con código de país, p. ej. "5215512345678" */
    whatsapp: "",
    location: "[Agregar ciudad / país]",
  },
  social: {
    linkedin: "",
    instagram: "",
  },
};

export const navigation = [
  { label: "Inicio", href: "/#inicio", id: "inicio" },
  { label: "Sobre mí", href: "/#sobre-mi", id: "sobre-mi" },
  { label: "Proyectos", href: "/#proyectos", id: "proyectos" },
  { label: "Experiencia", href: "/#experiencia", id: "experiencia" },
  { label: "Servicios", href: "/#servicios", id: "servicios" },
  { label: "Contacto", href: "/#contacto", id: "contacto" },
] as const;
