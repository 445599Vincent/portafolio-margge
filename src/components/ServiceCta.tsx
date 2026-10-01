"use client";

import { prefillContact } from "@/lib/contact-prefill";
import { ArrowRight } from "./ui/Icons";

type Props = { projectType?: string; serviceName: string };

/** Enlace a #contacto (sin JS) que además prellena el formulario (con JS). */
export function ServiceCta({ projectType, serviceName }: Props) {
  return (
    <a
      href="#contacto"
      onClick={() =>
        prefillContact({
          projectType,
          message: `Hola Margge, me interesa el servicio de ${serviceName.toLowerCase()}. `,
        })
      }
      className="group/cta mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
    >
      Consultar sobre este servicio
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
    </a>
  );
}
