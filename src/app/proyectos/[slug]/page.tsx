import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProject, publishedProjects } from "@/data/projects";
import { getBrand } from "@/data/brands";
import { contactContent } from "@/data/contact";
import { isPlaceholder } from "@/lib/content";
import { projectJsonLd } from "@/lib/seo";
import { contactHrefForProject } from "@/lib/contact-prefill";
import { Content } from "@/components/ui/Content";
import { CTA } from "@/components/CTA";
import { CaseHeader } from "@/sections/case-study/CaseHeader";
import { CaseBlock } from "@/sections/case-study/CaseBlock";
import { CaseInvolvement } from "@/sections/case-study/CaseInvolvement";
import { CaseResults } from "@/sections/case-study/CaseResults";
import { CaseGallery } from "@/sections/case-study/CaseGallery";
import { CaseNav } from "@/sections/case-study/CaseNav";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const brand = getBrand(project.brandId);
  const title = isPlaceholder(project.title) ? `Proyecto ${slug}` : project.title;
  const brandName = isPlaceholder(brand.name) ? "" : ` · ${brand.name}`;
  const description = isPlaceholder(project.summary)
    ? `Caso de estudio${brandName}: contexto, estrategia, participación y resultados.`
    : project.summary;
  // Sin portada, se usan las imágenes generadas del sitio (app/opengraph-image y app/twitter-image).
  const cover = project.cover.src ? [{ url: project.cover.src, alt: project.cover.alt }] : undefined;

  return {
    title: `${title}${brandName}`,
    description,
    alternates: { canonical: `/proyectos/${slug}` },
    openGraph: {
      type: "article",
      url: `/proyectos/${slug}`,
      title,
      description,
      images: cover ?? ["/opengraph-image"],
    },
    twitter: { card: "summary_large_image", title, description, images: cover ?? ["/twitter-image"] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const jsonLd = projectJsonLd(project);

  return (
    <article>
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <CaseHeader project={project} />

      <div className="container-site py-16 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <CaseBlock id="contexto" label="Contexto" text={project.context} />
          <CaseBlock id="objetivo" label="Objetivo" text={project.objective} />
          <CaseBlock id="reto" label="Reto" text={project.challenge} />
          <CaseBlock id="estrategia" label="Estrategia" text={project.strategy} />

          <CaseInvolvement project={project} />

          <CaseBlock id="ejecucion" label="Ejecución" text={project.execution}>
            {project.deliverables.length > 0 && (
              <div className="mt-10">
                <h3 className="text-sm font-medium">Contenido y piezas desarrolladas</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.deliverables.map((d, i) => (
                    <li key={i} className="rounded-full border border-line px-4 py-1.5 text-sm">
                      <Content text={d} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CaseBlock>

          <CaseBlock id="resultados" label="Resultados">
            <CaseResults results={project.results} />
          </CaseBlock>

          <CaseGallery items={project.gallery} />

          <CaseBlock id="aprendizajes" label="Aprendizajes e impacto" text={project.learnings} />
        </div>
      </div>

      <CaseNav prev={prev} next={next} />

      <CTA
        heading={contactContent.ctaHeading}
        text={contactContent.ctaText}
        buttonLabel={contactContent.ctaButton}
        href={contactHrefForProject(project.slug)}
      />
    </article>
  );
}
