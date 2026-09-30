"use client";

import { useId, useState } from "react";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/content";
import { prefillContact } from "@/lib/contact-prefill";
import { Content } from "./ui/Content";
import { ArrowRight, Plus } from "./ui/Icons";

type Props = { service: Service; index: number };

/** Servicio en formato de fila expandible (accordion accesible). */
export function ServiceCard({ service, index }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <li className="border-t border-line last:border-b">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-start gap-3 py-6 text-left sm:grid-cols-[3.5rem_1fr_auto] sm:gap-4 sm:py-7"
        >
          <span className="pt-2 font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
          <span className="flex flex-col gap-2">
            <span className="font-display text-[1.75rem] leading-tight transition-colors duration-300 group-hover:text-accent sm:text-4xl">
              {service.name}
            </span>
            {service.draft && (
              <span className="eyebrow w-fit rounded-full border border-accent/40 px-2 py-0.5 text-[0.625rem] text-accent">
                Por confirmar
              </span>
            )}
          </span>
          <span
            className={cn(
              "mt-1 flex size-10 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover:border-ink",
              open && "rotate-45 border-ink bg-ink text-paper",
            )}
          >
            <Plus className="size-4" />
            <span className="sr-only">{open ? "Cerrar" : "Ver más"}</span>
          </span>
        </button>
      </h3>

      <Content
        text={service.description}
        as="p"
        className="-mt-2 pb-6 pl-[3.25rem] pr-12 text-muted sm:pl-[4.5rem]"
      />

      <div
        id={panelId}
        role="region"
        aria-label={`Detalle: ${service.name}`}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-(--ease-out-soft)",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="pb-8 pl-[3.25rem] pr-12 sm:pl-[4.5rem]">
            <ul className="space-y-2 text-[0.95rem]">
              {service.details.map((d, i) => (
                <li key={i} className="flex gap-3">
                  <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-accent" />
                  <Content text={d} />
                </li>
              ))}
            </ul>
            <a
              href="#contacto"
              onClick={() =>
                prefillContact({
                  projectType: service.projectType,
                  message: `Hola Margge, me interesa el servicio de ${service.name.toLowerCase()}. `,
                })
              }
              className="group/cta mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
            >
              Consultar sobre este servicio
              <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}
