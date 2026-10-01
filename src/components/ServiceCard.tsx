import type { Service } from "@/lib/types";
import { Content } from "./ui/Content";
import { Plus } from "./ui/Icons";
import { ServiceCta } from "./ServiceCta";

type Props = { service: Service; index: number };

/** Servicio en formato de fila expandible: <details> nativo, accesible y funcional sin JavaScript. */
export function ServiceCard({ service, index }: Props) {
  return (
    <li className="border-t border-line last:border-b">
      <details className="service-details group/details">
        <summary className="service-summary group cursor-pointer">
          <span className="grid grid-cols-[2.5rem_1fr_auto] items-start gap-3 py-6 sm:grid-cols-[3.5rem_1fr_auto] sm:gap-4 sm:py-7">
            <span className="pt-2 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
            <span className="flex flex-col gap-2">
              <h3 className="font-display text-[1.75rem] leading-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                {service.name}
              </h3>
              {service.draft && (
                <span className="eyebrow w-fit rounded-full border border-accent/40 px-2 py-0.5 text-[0.625rem] text-accent">
                  Por confirmar
                </span>
              )}
            </span>
            <span className="mt-1 flex size-10 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-ink group-open/details:rotate-45 group-open/details:border-ink group-open/details:bg-ink group-open/details:text-paper">
              <Plus className="size-4" />
              <span className="sr-only">
                <span className="group-open/details:hidden">Ver más</span>
                <span className="hidden group-open/details:inline">Cerrar</span>
              </span>
            </span>
          </span>
          <Content
            text={service.description}
            className="-mt-2 block pb-6 pl-[3.25rem] pr-12 font-normal text-muted sm:pl-[4.5rem]"
          />
        </summary>

        <div className="pb-8 pl-[3.25rem] pr-12 sm:pl-[4.5rem]">
          <ul className="space-y-2 text-[0.95rem]">
            {service.details.map((d, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                <Content text={d} />
              </li>
            ))}
          </ul>
          <ServiceCta projectType={service.projectType} serviceName={service.name} />
        </div>
      </details>
    </li>
  );
}
