import { isPlaceholder } from "@/lib/content";

type Props = {
  text: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "li" | "dd" | "strong";
  className?: string;
  /** Texto a mostrar si `text` está vacío. */
  fallback?: string;
};

/**
 * Renderiza texto de contenido. Si es un placeholder ("[Agregar …]") se
 * resalta visualmente para que sea fácil de encontrar y reemplazar.
 */
export function Content({ text, as: Tag = "span", className, fallback = "[Pendiente]" }: Props) {
  const value = text?.trim() ? text : fallback;
  if (isPlaceholder(value)) {
    return (
      <Tag className={className} data-placeholder="">
        <span className="ph">{value}</span>
      </Tag>
    );
  }
  return <Tag className={className}>{value}</Tag>;
}
