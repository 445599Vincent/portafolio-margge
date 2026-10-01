import { site } from "@/data/site";

/** Un texto es placeholder si está vacío o completamente entre corchetes: "[Agregar marca]". */
export function isPlaceholder(text: string | undefined | null): boolean {
  if (!text) return true;
  const t = text.trim();
  return t.startsWith("[") && t.endsWith("]");
}

/**
 * ¿Se muestran los textos provisionales? Siempre en desarrollo; en producción solo con
 * SHOW_PLACEHOLDERS=true. En el sitio público lo provisional se oculta.
 */
export const showPlaceholders =
  process.env.NODE_ENV !== "production" || process.env.SHOW_PLACEHOLDERS === "true";

/** Texto provisional que no debe mostrarse en este build. */
export function isHidden(text: string | undefined | null): boolean {
  return !showPlaceholders && isPlaceholder(text);
}

/** Filtra los textos que no deben mostrarse en este build. */
export function visibleTexts(list: string[]): string[] {
  return list.filter((t) => !isHidden(t));
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export type ContactChannel = {
  id: "email" | "whatsapp" | "linkedin" | "instagram";
  label: string;
  /** URL lista para usar; vacío si aún no se configuró. */
  href: string;
  /** Texto visible (p. ej. la dirección de correo). */
  display: string;
};

/**
 * Canales de contacto derivados de site.ts. Los no configurados quedan con href vacío
 * (y en producción no se incluyen, salvo con SHOW_PLACEHOLDERS=true).
 */
export function getContactChannels(): ContactChannel[] {
  return allContactChannels().filter((c) => showPlaceholders || c.href);
}

function allContactChannels(): ContactChannel[] {
  const { email, whatsapp } = site.contact;
  const { linkedin, instagram } = site.social;
  return [
    {
      id: "email",
      label: "Email",
      href: email ? `mailto:${email}` : "",
      display: email || "[Agregar email]",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : "",
      display: whatsapp ? "WhatsApp" : "[Agregar WhatsApp]",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: linkedin,
      display: linkedin ? "LinkedIn" : "[Agregar LinkedIn]",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: instagram,
      display: instagram ? "Instagram" : "[Agregar Instagram]",
    },
  ];
}
