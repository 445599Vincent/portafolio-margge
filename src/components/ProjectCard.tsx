import Link from "next/link";
import type { ProjectCardData } from "@/lib/types";
import { cn, isHidden } from "@/lib/content";
import { Content } from "./ui/Content";
import { MediaFrame } from "./ui/MediaFrame";
import { ArrowUpRight } from "./ui/Icons";

type Props = {
  project: ProjectCardData;
  /** Variante grande para proyectos destacados. */
  large?: boolean;
  className?: string;
};

export function ProjectCard({ project, large, className }: Props) {
  // Marca y año provisionales no se muestran en producción (ni su separador)
  const meta = [
    { text: project.brandName, className: "font-medium text-ink" },
    { text: project.year },
  ].filter((m) => !isHidden(m.text));
  return (
    <article className={cn("group relative", className)}>
      <div className="overflow-hidden">
        <MediaFrame
          media={project.cover}
          aspect={large ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[4/5]"}
          sizes={large ? "(min-width: 768px) 90vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
          label="[Agregar imagen del proyecto]"
          className="transition-transform duration-700 ease-(--ease-out-soft) group-hover:scale-[1.025]"
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
        {meta.map((m, i) => (
          <span key={i} className="contents">
            {i > 0 && <span aria-hidden>·</span>}
            <Content text={m.text} className={m.className} />
          </span>
        ))}
        {meta.length > 0 && (
          <span aria-hidden className="hidden sm:inline">
            ·
          </span>
        )}
        <span className="w-full sm:w-auto">
          {project.categoryLabels.join(" / ")}
        </span>
      </div>

      <h3 className={cn("font-display mt-3 text-balance", large ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl")}>
        <Link
          href={`/proyectos/${project.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
        >
          <Content text={project.title} />
        </Link>
      </h3>

      <Content text={project.type} as="p" className="mt-2 text-sm text-muted" />
      <Content
        text={project.summary}
        as="p"
        className="mt-3 max-w-prose text-[0.95rem] leading-relaxed text-ink/80"
      />

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
        <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 group-hover:after:scale-x-100">
          Ver caso
        </span>
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>

      {/* Anillo de foco visible para teclado (el enlace cubre toda la tarjeta) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-2 rounded-sm ring-accent ring-offset-4 ring-offset-paper group-has-[a:focus-visible]:ring-2"
      />
    </article>
  );
}
