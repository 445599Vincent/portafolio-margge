import { site } from "@/data/site";

/** Un texto es placeholder si está vacío o completamente entre corchetes: "[Agregar marca]". */
export function isPlaceholder(text: string | undefined | null): boolean {
  if (!text) return true;
  const t = text.trim();
  return t.startsWith("[") && t.endsWith("]");
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

/** Canales de contacto derivados de site.ts. Los no configurados quedan con href vacío. */
export function getContactChannels(): ContactChannel[] {
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
