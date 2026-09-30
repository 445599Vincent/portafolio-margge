"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { contactContent, projectTypes } from "@/data/contact";
import { site } from "@/data/site";
import {
  FORM_NAME,
  isFormConnected,
  submitContact,
  validateContact,
  type ContactPayload,
  type FieldErrors,
} from "@/lib/forms";
import { cn } from "@/lib/content";
import {
  CONTACT_PREFILL_EVENT,
  PROJECT_PARAM,
  projectInterestMessage,
  type ContactPrefill,
} from "@/lib/contact-prefill";
import { setSearchParam, useSearchParam } from "@/lib/use-search-param";
import { ArrowRight } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "success" | "error" | "not-connected";

const empty: ContactPayload = { name: "", company: "", email: "", projectType: "", message: "" };

const fieldBase =
  "mt-2 block w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink transition-colors duration-300 placeholder:text-muted/70 focus:border-ink focus:outline-none focus:ring-0 aria-[invalid=true]:border-red-700";

type Props = {
  /** slug → título de los proyectos publicados (null si el título aún es provisional). */
  projectTitles: Record<string, string | null>;
};

export function ContactForm({ projectTitles }: Props) {
  const [values, setValues] = useState<ContactPayload>(empty);
  // Llegada desde un caso de estudio (/?proyecto=<slug>#contacto): mensaje inicial sugerido.
  const projectSlug = useSearchParam(PROJECT_PARAM);
  const [messageEdited, setMessageEdited] = useState(false);
  const suggestedMessage =
    projectSlug && projectSlug in projectTitles && !messageEdited
      ? projectInterestMessage(projectTitles[projectSlug])
      : "";
  /** Valores efectivos del formulario (incluye el mensaje sugerido mientras no se edite). */
  const fields: ContactPayload = { ...values, message: values.message || suggestedMessage };
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactPayload, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // Prellenado desde otras secciones ("Consultar sobre este servicio"): solo completa campos vacíos.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { projectType, message } = (event as CustomEvent<ContactPrefill>).detail;
      setValues((v) => ({
        ...v,
        projectType: v.projectType || (projectType && projectTypes.includes(projectType) ? projectType : ""),
        message: v.message.trim() ? v.message : (message ?? ""),
      }));
      setStatus((s) => (s === "success" ? "idle" : s));
      // El nuevo interés reemplaza al del caso de estudio: que no reaparezca al recargar.
      setSearchParam(PROJECT_PARAM, null);
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  const update = (key: keyof ContactPayload, value: string) => {
    if (key === "message") setMessageEdited(true);
    const next = { ...fields, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };

  const blur = (key: keyof ContactPayload) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContact(fields));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // Honeypot anti-spam: si se llenó, se ignora silenciosamente
    if ((form.elements.namedItem("bot-field") as HTMLInputElement | null)?.value) return;

    const found = validateContact(fields);
    setErrors(found);
    setTouched({ name: true, email: true, projectType: true, message: true });
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!isFormConnected) {
      setStatus("not-connected");
      return;
    }

    setStatus("sending");
    try {
      await submitContact(fields);
      setStatus("success");
      setValues(empty);
      setSearchParam(PROJECT_PARAM, null); // no volver a sugerir el mensaje tras enviar
      setTouched({});
    } catch {
      setStatus("error");
    }
  }

  const err = (key: keyof ContactPayload) => (touched[key] ? errors[key] : undefined);

  const mailto = site.contact.email
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(
        `Proyecto: ${fields.projectType || "Contacto desde el sitio"}`,
      )}&body=${encodeURIComponent(
        `${fields.message}\n\n${fields.name}${fields.company ? ` — ${fields.company}` : ""}\n${fields.email}`,
      )}`
    : "";

  if (status === "success") {
    return (
      <div className="border-t border-ink pt-10" role="status">
        <p className="font-display text-4xl sm:text-5xl">{contactContent.successMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm underline underline-offset-4 hover:text-accent"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      name={FORM_NAME}
      noValidate
      onSubmit={onSubmit}
      className="grid gap-8 sm:grid-cols-2"
      aria-describedby="form-note"
    >
      <p className="hidden">
        <label>
          No llenar este campo: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <Field id="name" label="Nombre" required error={err("name")}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => blur("name")}
          aria-invalid={!!err("name")}
          aria-describedby={err("name") ? "name-error" : undefined}
          className={fieldBase}
        />
      </Field>

      <Field id="company" label="Empresa" hint="Opcional">
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={(e) => update("company", e.target.value)}
          className={fieldBase}
        />
      </Field>

      <Field id="email" label="Email" required error={err("email")}>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => blur("email")}
          aria-invalid={!!err("email")}
          aria-describedby={err("email") ? "email-error" : undefined}
          className={fieldBase}
        />
      </Field>

      <Field id="projectType" label="Tipo de proyecto" required error={err("projectType")}>
        <div className="relative">
          <select
            id="projectType"
            name="projectType"
            required
            value={values.projectType}
            onChange={(e) => update("projectType", e.target.value)}
            onBlur={() => blur("projectType")}
            aria-invalid={!!err("projectType")}
            aria-describedby={err("projectType") ? "projectType-error" : undefined}
            className={cn(fieldBase, "appearance-none pr-8", !values.projectType && "text-muted")}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span aria-hidden className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-muted">
            ↓
          </span>
        </div>
      </Field>

      <Field id="message" label="Mensaje" required error={err("message")} className="sm:col-span-2">
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
          aria-invalid={!!err("message")}
          aria-describedby={err("message") ? "message-error" : undefined}
          placeholder="Cuéntame sobre tu marca, tus objetivos y plazos."
          className={cn(fieldBase, "resize-y")}
        />
      </Field>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="text-xs text-muted">
          Los campos marcados con * son obligatorios.
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-ink px-8 text-sm font-medium text-paper transition-colors duration-300 hover:bg-accent disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar mensaje"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {status === "error" && (
          <p className="border-l-2 border-red-700 pl-4 text-sm text-red-800">
            No se pudo enviar el mensaje. Inténtalo de nuevo
            {site.contact.email ? (
              <>
                {" "}o escribe a{" "}
                <a href={`mailto:${site.contact.email}`} className="underline">
                  {site.contact.email}
                </a>
              </>
            ) : null}
            .
          </p>
        )}
        {status === "not-connected" && (
          <p className="border-l-2 border-accent pl-4 text-sm text-ink/80">
            El envío del formulario aún no está configurado.{" "}
            {mailto ? (
              <a href={mailto} className="font-medium underline underline-offset-4">
                Enviar este mensaje por email
              </a>
            ) : (
              <span className="ph">[Configurar NEXT_PUBLIC_FORM_PROVIDER o el email en site.ts]</span>
            )}
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between text-sm font-medium">
        <span>
          {label}
          {required && <span aria-hidden className="text-accent"> *</span>}
        </span>
        {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
