import type { ExperienceEntry } from "@/lib/types";
import { isPlaceholder, showPlaceholders } from "@/lib/content";

/**
 * Trayectoria profesional, de la más reciente a la más antigua.
 * `accounts`: nombres de marcas manejadas (solo confirmadas).
 * `highlightedProjects`: slugs de projects.ts (se enlazan automáticamente).
 */
export const experience: ExperienceEntry[] = [
  {
    id: "exp-01",
    company: "[Agencia o empresa]",
    role: "[Cargo]",
    period: "[Año inicio] — [Año fin]",
    location: "[Ciudad]",
    responsibilities: [
      "[Responsabilidad principal]",
      "[Responsabilidad principal]",
      "[Responsabilidad principal]",
    ],
    accounts: ["[Marca]", "[Marca]"],
    highlightedProjects: ["proyecto-01"],
  },
  {
    id: "exp-02",
    company: "[Agencia o empresa]",
    role: "[Cargo]",
    period: "[Año inicio] — [Año fin]",
    location: "[Ciudad]",
    responsibilities: ["[Responsabilidad principal]", "[Responsabilidad principal]"],
    accounts: ["[Marca]", "[Marca]"],
    highlightedProjects: ["proyecto-02"],
  },
  {
    id: "exp-03",
    company: "[Agencia o empresa]",
    role: "[Cargo]",
    period: "[Año inicio] — [Año fin]",
    location: "[Ciudad]",
    responsibilities: ["[Responsabilidad principal]", "[Responsabilidad principal]"],
    accounts: ["[Marca]"],
    highlightedProjects: [],
  },
];

/** Una entrada está lista cuando empresa y cargo ya no son provisionales. */
const isEntryReady = (e: ExperienceEntry) => !isPlaceholder(e.company) && !isPlaceholder(e.role);

/** Entradas que se muestran en este build (en producción, solo las listas). */
export const visibleExperience = showPlaceholders ? experience : experience.filter(isEntryReady);
