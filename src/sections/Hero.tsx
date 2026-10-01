import type { CSSProperties } from "react";
import { site } from "@/data/site";
import { heroPhoto, about } from "@/data/about";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Content } from "@/components/ui/Content";
import { sectionVisible } from "@/data/sections";
import { isHidden } from "@/lib/content";

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

export function Hero() {
  const [first, ...rest] = site.name.split(" ");
  return (
    <section id="inicio" aria-label="Presentación" className="relative pt-28 sm:pt-36 lg:pt-40">
      <div className="container-site grid gap-12 pb-16 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16 lg:pb-24">
        <div>
          <p className="eyebrow animate-fade-up flex flex-wrap items-center gap-3 text-muted" style={delay(0)}>
            <span className="inline-block size-1.5 rounded-full bg-accent" aria-hidden />
            {site.title}
            {!isHidden(site.contact.location) && (
              <>
                <span aria-hidden className="h-px w-6 bg-current opacity-40" />
                <Content text={site.contact.location} />
              </>
            )}
          </p>

          <h1
            className="font-display animate-fade-up mt-6 text-[clamp(4.5rem,19vw,11.5rem)] leading-[0.85]"
            style={delay(80)}
          >
            {first}
            <br />
            <em className="text-accent">{rest.join(" ")}</em>
          </h1>

          <p
            className="font-display animate-fade-up mt-8 max-w-xl text-3xl leading-tight text-balance sm:text-4xl"
            style={delay(180)}
          >
            {site.tagline}
          </p>
          <p className="animate-fade-up mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg" style={delay(240)}>
            {site.intro}
          </p>

          <div className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={delay(320)}>
            {sectionVisible.proyectos ? (
              <>
                <ButtonLink href="/#proyectos">Ver proyectos</ButtonLink>
                <ButtonLink href="/#contacto" variant="secondary" arrow={false}>
                  Trabajemos juntos
                </ButtonLink>
              </>
            ) : (
              <ButtonLink href="/#contacto">Trabajemos juntos</ButtonLink>
            )}
          </div>
        </div>

        {/* Sin animación de entrada: es el elemento LCP y debe pintarse de inmediato. */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <MediaFrame
            media={heroPhoto}
            aspect="aspect-[4/5]"
            preload
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 28rem, calc(100vw - 2.5rem)"
            label="[Agregar fotografía profesional de Margge]"
          />
          <p className="eyebrow absolute -bottom-3 left-4 bg-paper px-3 py-1.5 text-[0.65rem] text-muted sm:left-6">
            {about.focus.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
