import type { ProjectResult } from "@/lib/types";
import { Content } from "@/components/ui/Content";
import { cn, isHidden } from "@/lib/content";

/**
 * Resultados del proyecto. Solo los marcados como `verified` se presentan como
 * confirmados; el resto se muestra explícitamente como pendiente de confirmar.
 */
export function CaseResults({ results: all }: { results: ProjectResult[] }) {
  const results = all.filter((r) => !isHidden(r.value) && !isHidden(r.label));
  if (results.length === 0) return null;
  return (
    <ul className="mt-2 grid gap-px overflow-hidden bg-line sm:grid-cols-2">
      {results.map((r, i) => (
        <li key={i} className="bg-paper py-6 sm:p-8 sm:first:pl-0 sm:[&:nth-child(odd)]:pl-0">
          <Content
            text={r.value}
            as="p"
            className={cn("font-display text-5xl sm:text-6xl", r.verified && "text-accent")}
          />
          <Content text={r.label} as="p" className="mt-3 text-sm leading-relaxed" />
          {r.verified ? (
            r.source && <p className="mt-2 text-xs text-muted">Fuente: {r.source}</p>
          ) : (
            <p className="eyebrow mt-4 w-fit rounded-full border border-accent/40 px-2 py-0.5 text-[0.6rem] text-accent">
              Pendiente de confirmar
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
