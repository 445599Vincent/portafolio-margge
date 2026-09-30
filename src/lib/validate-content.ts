import { existsSync } from "node:fs";
import path from "node:path";
import { about, heroPhoto } from "@/data/about";
import { brands } from "@/data/brands";
import { categories } from "@/data/categories";
import { projectTypes } from "@/data/contact";
import { experience } from "@/data/experience";
import { projects, publishedProjects } from "@/data/projects";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { isPlaceholder } from "@/lib/content";

/**
 * Validación del contenido de /src/data (solo servidor).
 *
 * - Errores: rompen el build de producción (rutas de imágenes inexistentes, ids duplicados,
 *   categorías o tipos de proyecto que no existen…), para no publicar un sitio roto.
 * - Avisos: se muestran en consola sin detener nada.
 * En desarrollo también informa cuántos textos provisionales ("[…]") quedan.
 */

let validated = false;

export function validateContent() {
  if (validated) return;
  validated = true;

  const errors: string[] = [];
  const warnings: string[] = [];

  const duplicates = (label: string, ids: string[]) => {
    const seen = new Set<string>();
    for (const id of ids) {
      if (seen.has(id)) errors.push(`${label} duplicado: "${id}"`);
      seen.add(id);
    }
  };

  const checkAsset = (where: string, src: string | undefined) => {
    if (!src || /^https?:\/\//.test(src)) return;
    if (!src.startsWith("/")) {
      errors.push(`${where}: la ruta "${src}" debe empezar con "/" (p. ej. /assets/...)`);
      return;
    }
    const file = path.join(process.cwd(), "public", decodeURIComponent(src));
    if (!existsSync(file)) errors.push(`${where}: no existe el archivo public${src}`);
  };

  duplicates("Slug de proyecto", projects.map((p) => p.slug));
  duplicates("Id de marca", brands.map((b) => b.id));
  duplicates("Id de categoría", categories.map((c) => c.id));
  duplicates("Id de servicio", services.map((s) => s.id));

  const categoryIds = new Set(categories.map((c) => c.id));
  const brandIds = new Set(brands.map((b) => b.id));
  const publishedSlugs = new Set(publishedProjects.map((p) => p.slug));

  for (const b of brands) checkAsset(`Marca "${b.name}" (logo)`, b.logo);

  checkAsset("Foto del hero (about.ts)", heroPhoto.src);
  checkAsset("Foto de Sobre mí (about.ts)", about.photo.src);

  for (const p of projects) {
    const where = `Proyecto "${p.slug}"`;
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(p.slug))
      errors.push(`${where}: el slug solo puede tener minúsculas, números y guiones`);
    for (const c of p.categories)
      if (!categoryIds.has(c)) errors.push(`${where}: la categoría "${c}" no existe en categories.ts`);
    if (!brandIds.has(p.brandId))
      warnings.push(`${where}: la marca "${p.brandId}" no está en brands.ts (se mostrará "[Agregar marca]")`);
    checkAsset(`${where} (portada)`, p.cover.src);
    p.gallery.forEach((m, i) => {
      checkAsset(`${where} (galería #${i + 1})`, m.src);
      checkAsset(`${where} (poster galería #${i + 1})`, m.poster);
    });
    for (const r of p.results)
      if (r.verified && (isPlaceholder(r.value) || isPlaceholder(r.label)))
        errors.push(`${where}: hay un resultado marcado como verificado que aún es un placeholder`);
  }

  for (const s of services)
    if (s.projectType && !projectTypes.includes(s.projectType))
      errors.push(
        `Servicio "${s.id}": projectType "${s.projectType}" no coincide con ninguna opción de projectTypes (contact.ts)`,
      );

  for (const e of experience)
    for (const slug of e.highlightedProjects)
      if (!publishedSlugs.has(slug))
        errors.push(`Experiencia "${e.id}": el proyecto destacado "${slug}" no existe o no está publicado`);

  for (const t of testimonials)
    if (t.approved && [t.quote, t.author].some((v) => !v.trim() || isPlaceholder(v)))
      errors.push(`Testimonio "${t.id}": está aprobado pero tiene texto o autor vacío/provisional`);

  const isProd = process.env.NODE_ENV === "production";

  if (warnings.length) console.warn(`\n[contenido] Avisos:\n  - ${warnings.join("\n  - ")}\n`);

  if (!isProd) {
    const pending = countPlaceholders([about, heroPhoto, brands, projects, services, experience]);
    if (pending > 0)
      console.info(`[contenido] Quedan ${pending} textos provisionales "[…]". Ver CONTENIDO_PENDIENTE.md`);
  }

  if (errors.length) {
    const message = `[contenido] Hay ${errors.length} error(es) en /src/data:\n  - ${errors.join("\n  - ")}\n`;
    if (isProd) throw new Error(message);
    console.error(message);
  }
}

function countPlaceholders(value: unknown): number {
  if (typeof value === "string") return isPlaceholder(value) && value.trim() !== "" ? 1 : 0;
  if (Array.isArray(value)) return value.reduce((n: number, v) => n + countPlaceholders(v), 0);
  if (value && typeof value === "object")
    return Object.values(value).reduce((n: number, v) => n + countPlaceholders(v), 0);
  return 0;
}
