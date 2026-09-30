import type { CSSProperties, ReactNode } from "react";
import { ButtonLink } from "./ui/ButtonLink";

type Props = {
  heading: string;
  text?: string;
  buttonLabel: string;
  href: string;
  /** Contenido adicional (p. ej. enlaces de contacto). */
  children?: ReactNode;
  headingId?: string;
};

/** Bloque de llamada a la acción sobre fondo oscuro. */
export function CTA({ heading, text, buttonLabel, href, children, headingId }: Props) {
  return (
    <div className="on-dark bg-ink text-paper">
      <div className="container-site py-24 sm:py-32 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <h2 id={headingId} className="font-display text-5xl text-balance sm:text-7xl lg:text-8xl" data-reveal>
            {heading}
          </h2>
          <div className="lg:pb-3" data-reveal style={{ "--reveal-delay": "120ms" } as CSSProperties}>
            {text && <p className="max-w-md text-lg leading-relaxed text-paper/70">{text}</p>}
            <ButtonLink href={href} variant="light" className="mt-8">
              {buttonLabel}
            </ButtonLink>
          </div>
        </div>
        {children && <div className="mt-16 border-t border-paper/15 pt-8">{children}</div>}
      </div>
    </div>
  );
}
