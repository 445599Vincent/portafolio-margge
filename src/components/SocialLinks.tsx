import type { ComponentType, SVGProps } from "react";
import { getContactChannels, type ContactChannel, cn } from "@/lib/content";
import { Instagram, LinkedIn, Mail, WhatsApp } from "./ui/Icons";

const icons: Record<ContactChannel["id"], ComponentType<SVGProps<SVGSVGElement>>> = {
  email: Mail,
  whatsapp: WhatsApp,
  linkedin: LinkedIn,
  instagram: Instagram,
};

type Props = {
  className?: string;
  /** Mostrar el texto además del icono. */
  showLabel?: boolean;
  only?: ContactChannel["id"][];
};

/**
 * Enlaces de contacto/redes desde site.ts.
 * Los canales aún no configurados se muestran como placeholder (sin enlace).
 */
export function SocialLinks({ className, showLabel = true, only }: Props) {
  const channels = getContactChannels().filter((c) => !only || only.includes(c.id));
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-3", className)}>
      {channels.map((c) => {
        const Icon = icons[c.id];
        const inner = (
          <>
            <Icon className="size-[18px] shrink-0" />
            {showLabel ? (
              <span className={c.href ? undefined : "ph"}>{c.display}</span>
            ) : (
              <span className="sr-only">{c.label}</span>
            )}
          </>
        );
        return (
          <li key={c.id}>
            {c.href ? (
              <a
                href={c.href}
                target={c.id === "email" ? undefined : "_blank"}
                rel={c.id === "email" ? undefined : "noopener noreferrer"}
                className="inline-flex min-h-11 items-center gap-2.5 text-sm opacity-80 transition-opacity hover:opacity-100"
              >
                {inner}
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center gap-2.5 text-sm" title="Pendiente de configurar en src/data/site.ts">
                {inner}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
