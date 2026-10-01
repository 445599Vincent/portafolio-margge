import Link from "next/link";
import type { ExperienceEntry } from "@/lib/types";
import { getProject } from "@/data/projects";
import { getBrand, brands } from "@/data/brands";
import { Content } from "./ui/Content";
import { visibleTexts } from "@/lib/content";
import { ArrowUpRight } from "./ui/Icons";

/** Resuelve un id de brands.ts a su nombre, o devuelve el texto tal cual. */
function accountName(value: string) {
  return brands.some((b) => b.id === value) ? getBrand(value).name : value;
}

export function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const projects = entry.highlightedProjects.map(getProject).filter((p) => p !== undefined);
  const responsibilities = visibleTexts(entry.responsibilities);
  const accounts = visibleTexts(entry.accounts.map(accountName));

  return (
    <li className="relative grid gap-6 border-t border-line py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] md:gap-12 lg:py-12" data-reveal>
      {/* Punto del timeline */}
      <span aria-hidden className="absolute -top-[5px] left-0 size-[9px] rounded-full bg-accent" />

      <div>
        <Content text={entry.period} as="p" className="font-mono text-xs tracking-wide text-muted" />
        <Content text={entry.company} as="h3" className="font-display mt-3 text-3xl sm:text-4xl" />
        <Content text={entry.role} as="p" className="mt-2 text-base font-medium" />
        {entry.location && <Content text={entry.location} as="p" className="mt-1 text-sm text-muted" />}
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {responsibilities.length > 0 && (
          <div className="sm:col-span-2">
            <h4 className="eyebrow text-muted">Responsabilidades</h4>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] leading-relaxed">
              {responsibilities.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                  <Content text={r} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {accounts.length > 0 && (
          <div>
            <h4 className="eyebrow text-muted">Marcas / cuentas</h4>
            <ul className="mt-4 flex flex-wrap gap-2">
              {accounts.map((a, i) => (
                <li key={i} className="rounded-full border border-line px-3 py-1 text-sm">
                  <Content text={a} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {projects.length > 0 && (
          <div>
            <h4 className="eyebrow text-muted">Proyectos destacados</h4>
            <ul className="mt-4 space-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                  >
                    <Content text={p.title} />
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </li>
  );
}
