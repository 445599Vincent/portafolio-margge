import type { CSSProperties } from "react";
import { sectionIndex } from "@/data/sections";
import { about } from "@/data/about";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Content } from "@/components/ui/Content";
import { isHidden } from "@/lib/content";

export function About() {
  const stats = about.stats.filter((s) => !isHidden(s.value));
  return (
    <section id="sobre-mi" aria-labelledby="sobre-mi-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-site">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div className="order-2 lg:order-1" data-reveal>
            <MediaFrame
              media={about.photo}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              label="[Agregar fotografía de Margge]"
              // Encuadre más cerrado que en el hero, para no repetir la misma toma.
              // Si se agrega una segunda fotografía, se puede quitar.
              imgClassName="scale-[1.3] origin-[50%_18%]"
              className="max-w-md lg:sticky lg:top-28 lg:max-w-none"
            />
          </div>

          <div className="order-1 lg:order-2">
            <SectionTitle index={sectionIndex("sobre-mi")} eyebrow="Sobre mí" title={about.heading} id="sobre-mi-title" />
            <div className="mt-10 space-y-5 text-lg leading-relaxed text-ink/80" data-reveal>
              {about.paragraphs.map((p, i) => (
                <Content key={i} text={p} as="p" />
              ))}
            </div>

            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Áreas de enfoque">
              {about.focus.map((f) => (
                <li key={f} className="rounded-full border border-line px-4 py-1.5 text-sm">
                  {f}
                </li>
              ))}
            </ul>

            {stats.length > 0 && (
            <dl
              className="mt-14 grid border-t border-line"
              style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="flex flex-col border-line pt-6 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 sm:[&:not(:first-child)]:pl-6"
                  data-reveal
                  style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                >
                  <dt className="order-2 mt-2 text-xs text-muted sm:text-sm">{s.label}</dt>
                  <Content text={s.value} as="dd" className="font-display order-1 text-5xl sm:text-6xl lg:text-7xl" />
                </div>
              ))}
            </dl>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
