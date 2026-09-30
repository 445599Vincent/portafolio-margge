/**
 * Tipos del contenido del sitio.
 * Todo el contenido variable vive en /src/data y se tipa aquí.
 *
 * Convención de placeholders: cualquier texto entre corchetes, por ejemplo
 * "[Agregar marca]", se considera contenido pendiente y se muestra con un
 * estilo visual distinto para que sea fácil de identificar y reemplazar.
 */

export type Media = {
  /** Ruta dentro de /public, p. ej. "/assets/projects/mi-proyecto/cover.jpg". Vacío = placeholder. */
  src: string;
  alt: string;
  type?: "image" | "video";
  /** Poster opcional para videos. */
  poster?: string;
  caption?: string;
};

export type Brand = {
  id: string;
  name: string;
  /** Logo en /public/assets/brands. Vacío = se muestra el nombre. */
  logo: string;
  industry?: string;
  url?: string;
};

export type Category = {
  id: string;
  label: string;
};

export type ProjectResult = {
  /** Cifra o resultado. Ej.: "+35 %" */
  value: string;
  /** Qué mide. Ej.: "alcance orgánico en 3 meses" */
  label: string;
  /**
   * Solo marcar `true` cuando el resultado esté confirmado Y sea atribuible
   * al trabajo en el que Margge participó. Los resultados no verificados se
   * muestran como "Pendiente de confirmar".
   */
  verified: boolean;
  /** Fuente o contexto del dato (opcional). */
  source?: string;
};

export type Project = {
  slug: string;
  /** Si es false, el proyecto no se publica (útil para borradores). */
  published: boolean;
  /** Proyecto destacado: ocupa más espacio en la galería. */
  featured?: boolean;
  /** Referencia a Brand.id en brands.ts */
  brandId: string;
  title: string;
  /** Ids de categories.ts */
  categories: string[];
  /** Tipo de proyecto visible en la tarjeta. Ej.: "Campaña de lanzamiento" */
  type: string;
  year: string;
  industry: string;
  /** Rol de Margge en el proyecto. Ej.: "Content Strategist" */
  role: string;
  /** Descripción breve para la tarjeta (1–2 líneas). */
  summary: string;
  cover: Media;

  // ——— Caso de estudio ———
  context: string;
  objective: string;
  challenge: string;
  strategy: string;
  /**
   * Distinción clave: con qué marca trabajó vs. de qué fue responsable.
   */
  involvement: {
    /** Cómo se dio la colaboración. Ej.: "A través de la agencia X, como parte del equipo de cuenta". */
    collaboration: string;
    /** Acciones de las que Margge fue responsable directa (solo confirmadas). */
    responsibleFor: string[];
    /** Trabajo del equipo/agencia en el que Margge no fue responsable directa (contexto). */
    teamContributions?: string[];
  };
  execution: string;
  deliverables: string[];
  results: ProjectResult[];
  gallery: Media[];
  learnings: string;
};

/**
 * Datos mínimos que necesita una tarjeta de proyecto (se envían al cliente).
 * La marca y las categorías llegan ya resueltas desde el servidor.
 */
export type ProjectCardData = Pick<
  Project,
  "slug" | "featured" | "title" | "categories" | "type" | "year" | "summary" | "cover"
> & {
  brandName: string;
  categoryLabels: string[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Información ampliada que se muestra al expandir. */
  details: string[];
  /** Opción de "Tipo de proyecto" (src/data/contact.ts) que se preselecciona al consultar este servicio. */
  projectType?: string;
  /**
   * `true` mientras Margge no confirme que ofrece este servicio.
   * Los servicios en borrador se muestran con la etiqueta "Por confirmar".
   */
  draft: boolean;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  responsibilities: string[];
  /** Nombres de marcas/cuentas o ids de brands.ts */
  accounts: string[];
  /** Slugs de proyectos en projects.ts */
  highlightedProjects: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  relation: "cliente" | "supervisor" | "compañero" | "marca";
  /** Solo se muestran testimonios reales con autorización para publicarse. */
  approved: boolean;
};

export type Stat = {
  value: string;
  label: string;
};
