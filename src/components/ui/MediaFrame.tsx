import Image from "next/image";
import type { Media } from "@/lib/types";
import { cn, showPlaceholders } from "@/lib/content";

type Props = {
  media: Media;
  /** Clases de proporción, p. ej. "aspect-[4/5]" */
  aspect?: string;
  sizes?: string;
  /** Imagen principal visible al cargar (LCP): se precarga con prioridad alta. */
  preload?: boolean;
  className?: string;
  /** Texto del placeholder cuando no hay imagen. */
  label?: string;
  imgClassName?: string;
};

/**
 * Contenedor de imagen/video con proporción fija (evita saltos de layout, CLS).
 * Las imágenes usan next/image: lazy loading, AVIF/WebP y tamaños responsivos.
 * Si no hay `src`, muestra un placeholder claramente identificado.
 */
export function MediaFrame({
  media,
  aspect = "aspect-[4/3]",
  sizes = "100vw",
  preload,
  className,
  label = "[Agregar imagen]",
  imgClassName,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden bg-paper-2", aspect, className)}>
      {media.src ? (
        media.type === "video" ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={media.src}
            poster={media.poster}
            controls
            playsInline
            preload="none"
            aria-label={media.alt}
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            preload={preload}
            fetchPriority={preload ? "high" : undefined}
            className={cn("object-cover", imgClassName)}
          />
        )
      ) : (
        <div
          className="ph-frame absolute inset-0 flex items-center justify-center p-6 text-center"
          {...(showPlaceholders ? { role: "img", "aria-label": media.alt || label } : { "aria-hidden": true })}
        >
          {showPlaceholders && <span className="eyebrow max-w-[20ch] leading-relaxed text-muted">{label}</span>}
        </div>
      )}
    </div>
  );
}
