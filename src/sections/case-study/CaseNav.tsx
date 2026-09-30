import Link from "next/link";
import type { Project } from "@/lib/types";
import { Content } from "@/components/ui/Content";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";

type Props = { prev?: Project; next?: Project };

/** Navegación entre proyectos + regreso al portafolio. */
export function CaseNav({ prev, next }: Props) {
  return (
    <nav aria-label="Otros proyectos" className="border-t border-line">
      <div className="container-site">
        <div className="grid gap-px bg-line sm:grid-cols-[1fr_auto_1fr]">
          {prev ? (
            <Link href={`/proyectos/${prev.slug}`} className="group bg-paper py-10 sm:py-14 sm:pr-8">
              <span className="eyebrow inline-flex items-center gap-2 text-muted">
                <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Anterior
              </span>
              <Content
                text={prev.title}
                as="span"
                className="font-display mt-4 block text-3xl group-hover:text-accent sm:text-4xl"
              />
            </Link>
          ) : (
            <span className="bg-paper" />
          )}

          <Link
            href="/#proyectos"
            className="flex items-center justify-center bg-paper py-8 text-sm font-medium underline-offset-4 hover:underline sm:px-10"
          >
            Todos los proyectos
          </Link>

          {next ? (
            <Link href={`/proyectos/${next.slug}`} className="group bg-paper py-10 text-right sm:py-14 sm:pl-8">
              <span className="eyebrow inline-flex items-center gap-2 text-muted">
                Siguiente
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <Content
                text={next.title}
                as="span"
                className="font-display mt-4 block text-3xl group-hover:text-accent sm:text-4xl"
              />
            </Link>
          ) : (
            <span className="bg-paper" />
          )}
        </div>
      </div>
    </nav>
  );
}
