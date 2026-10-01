import Link from "next/link";
import type { Project } from "@/lib/types";
import { getBrand } from "@/data/brands";
import { getCategoryLabel } from "@/data/categories";
import { Content } from "@/components/ui/Content";
import { isHidden } from "@/lib/content";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { ArrowLeft } from "@/components/ui/Icons";

export function CaseHeader({ project }: { project: Project }) {
  const brand = getBrand(project.brandId);
  const meta = [
    { label: "Marca", value: brand.name },
    { label: "Año", value: project.year },
    { label: "Industria", value: project.industry },
    { label: "Rol de Margge", value: project.role },
    { label: "Tipo de proyecto", value: project.type },
  ].filter((m) => !isHidden(m.value));

  return (
    <header className="pt-28 sm:pt-36">
      <div className="container-site">
        <Link
          href="/#proyectos"
          className="group inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Volver a proyectos
        </Link>

        <p className="eyebrow animate-fade-up mt-10 flex flex-wrap gap-x-3 text-muted">
          <span className="text-accent">Caso de estudio</span>
          {project.categories.map((c) => (
            <span key={c}>· {getCategoryLabel(c)}</span>
          ))}
        </p>

        <h1 className="font-display animate-fade-up mt-6 max-w-5xl text-[clamp(3rem,10vw,8rem)] leading-[0.9] text-balance">
          <Content text={project.title} />
        </h1>
        <Content
          text={project.summary}
          as="p"
          className="animate-fade-up mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        />

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-y border-line py-6 sm:grid-cols-3 sm:py-8 lg:grid-cols-5">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="eyebrow text-[0.65rem] text-muted">{m.label}</dt>
              <Content text={m.value} as="dd" className="mt-2 text-sm font-medium sm:text-base" />
            </div>
          ))}
        </dl>
      </div>

      <div className="container-site mt-12 sm:mt-16">
        <MediaFrame
          media={project.cover}
          aspect="aspect-[4/3] sm:aspect-[16/9]"
          sizes="(min-width: 1344px) 1248px, 100vw"
          preload
          label="[Agregar imagen principal del proyecto]"
        />
      </div>
    </header>
  );
}
