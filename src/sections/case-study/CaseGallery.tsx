import type { Media } from "@/lib/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/content";

/** Galería editorial: la primera pieza ocupa todo el ancho, el resto en dos columnas. */
export function CaseGallery({ items }: { items: Media[] }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="galeria-title" className="border-t border-line py-10 sm:py-14">
      <h2 id="galeria-title" className="eyebrow text-muted">
        Galería
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
        {items.map((m, i) => {
          const wide = i === 0 && items.length !== 2;
          return (
            <figure key={i} className={cn(wide && "sm:col-span-2")} data-reveal>
              <MediaFrame
                media={m}
                aspect={wide ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3] sm:aspect-[4/5]"}
                sizes={wide ? "(min-width: 1344px) 1248px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
                label="[Agregar imagen o video]"
              />
              {m.caption && <figcaption className="mt-3 text-sm text-muted">{m.caption}</figcaption>}
            </figure>
          );
        })}
      </div>
    </section>
  );
}
