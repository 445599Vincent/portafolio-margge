import type { ExperienceEntry } from "@/lib/types";

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
