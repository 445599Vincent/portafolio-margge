/**
 * Envío del formulario de contacto, desacoplado del proveedor.
 *
 * Configurar con variables de entorno (ver .env.example):
 * - NEXT_PUBLIC_FORM_PROVIDER = "formspree" | "netlify" | "api" | "none"
 * - NEXT_PUBLIC_FORM_ENDPOINT = URL del endpoint (formspree / api / Supabase Edge Function)
 *
 * Con "none" el formulario valida pero no envía, y ofrece el email directo como alternativa.
 */

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
};

export type FormProvider = "formspree" | "netlify" | "api" | "none";

export const FORM_NAME = "contacto";

export const formProvider = (process.env.NEXT_PUBLIC_FORM_PROVIDER || "none") as FormProvider;
const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "";

export const isFormConnected =
  formProvider === "netlify" || (formProvider !== "none" && endpoint !== "");

export async function submitContact(data: ContactPayload): Promise<void> {
  switch (formProvider) {
    case "netlify": {
      // Netlify detecta el formulario a partir de /public/__forms.html
      const body = new URLSearchParams({ "form-name": FORM_NAME, ...data });
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(`Netlify Forms: ${res.status}`);
      return;
    }
    case "formspree":
    case "api": {
      if (!endpoint) throw new Error("Falta NEXT_PUBLIC_FORM_ENDPOINT");
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return;
    }
    default:
      throw new Error("FORM_NOT_CONNECTED");
  }
}

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(data: ContactPayload): FieldErrors {
  const errors: FieldErrors = {};
  if (data.name.trim().length < 2) errors.name = "Escribe tu nombre.";
  if (!data.email.trim()) errors.email = "Escribe tu email.";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "Revisa el formato del email.";
  if (!data.projectType) errors.projectType = "Selecciona un tipo de proyecto.";
  if (data.message.trim().length < 10)
    errors.message = "Cuéntame un poco más sobre tu proyecto (mínimo 10 caracteres).";
  return errors;
}
