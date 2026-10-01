import type { ReactNode } from "react";
import { Content } from "@/components/ui/Content";
import { isHidden } from "@/lib/content";

type Props = {
  label: string;
  /** Texto simple (se resalta si es placeholder) o contenido libre. */
  text?: string;
  children?: ReactNode;
  id?: string;
};

/** Fila editorial del caso de estudio: etiqueta a la izquierda, contenido a la derecha. */
export function CaseBlock({ label, text, children, id }: Props) {
  // Sin texto visible ni contenido adicional, el bloque no se muestra
  if ((text === undefined || isHidden(text)) && !children) return null;
  return (
    <section
      aria-labelledby={id}
      className="grid gap-4 border-t border-line py-10 sm:py-14 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-12"
      data-reveal
    >
      <h2 id={id} className="eyebrow pt-1.5 text-muted">
        {label}
      </h2>
      <div>
        {text !== undefined && (
          <Content text={text} as="p" className="font-display text-2xl leading-snug text-pretty sm:text-3xl" />
        )}
        {children}
      </div>
    </section>
  );
}
