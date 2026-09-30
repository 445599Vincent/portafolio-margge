# AGENTS.md — Coordinación Claude + Codex

Portafolio de **Margge Jiménez**, consultora de marketing digital.
Stack: Next.js 16 (App Router) · React 19 · TypeScript 5.9 · Tailwind CSS v4. Sin dependencias extra salvo acuerdo.

## Reglas de contenido (obligatorias para ambos agentes)

- **NO inventar** marcas, resultados, métricas, testimonios, clientes, fechas, cargos ni proyectos.
- Si falta información, usar placeholders entre corchetes: `[Agregar marca]`, `[Agregar resultado real]`.
  El componente `src/components/ui/Content.tsx` los resalta automáticamente.
- En casos de estudio se distingue siempre "Margge trabajó con esta marca" (`involvement.collaboration`)
  de "Margge fue responsable de estas acciones" (`involvement.responsibleFor`).
- Los resultados solo se muestran como confirmados si `verified: true`.
- Testimonios: la sección se oculta si no hay testimonios con `approved: true`.
- Todo el contenido variable vive en `src/data/*`. Nada de contenido hardcodeado en componentes.
- Idioma del sitio: español.

## Estructura

```
src/app/          rutas (page.tsx, proyectos/[slug], layout, metadata)
src/components/   componentes reutilizables (ui/, layout/, analytics/)
src/sections/     secciones de la home y del caso de estudio
src/data/         contenido editable (site, brands, projects, categories, services, experience, …)
src/lib/          tipos, utilidades, formularios, SEO
public/assets/    imágenes (brands/, projects/<slug>/, margi/)
```

## División de tareas y propiedad de archivos

Para evitar conflictos, **cada agente solo edita los archivos de su columna**. Si necesitas un cambio en
un archivo del otro agente, déjalo anotado en la sección "Solicitudes" al final de este documento.

### Claude — diseño, UI y contenido
- `src/app/globals.css` (tokens de diseño)
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/not-found.tsx`, `src/app/proyectos/[slug]/page.tsx`
- `src/components/ui/*`, `src/components/layout/*`, `src/components/*.tsx`
- `src/sections/**`
- `src/data/**`, `src/lib/types.ts`, `src/lib/content.ts`, `src/lib/forms.ts`

### Codex — ingeniería, SEO técnico, integraciones y QA
1. **SEO técnico**
   - `src/app/sitemap.ts`: home + `/proyectos/<slug>` de `publishedProjects` (`src/data/projects.ts`).
   - `src/app/robots.ts`: permitir todo, apuntar al sitemap. Base URL: `site.url` (`src/data/site.ts`).
   - `src/app/opengraph-image.tsx` y `src/app/twitter-image.tsx` con `next/og` (1200×630, fondo `#f5f2ec`,
     texto `#171614`, acento `#9a4a2e`, nombre + título profesional desde `site`). Sin fuentes remotas.
   - `src/app/icon.svg`: monograma "MJ" sobrio con los mismos colores.
   - `src/lib/seo.ts` (hay un stub): implementar `personJsonLd()` (schema.org `Person` + `jobTitle`,
     `url`, `sameAs` solo con redes no vacías) y `projectJsonLd(project)` (`CreativeWork`). No inventar datos.
2. **Analítica** — `src/components/analytics/Analytics.tsx` (hay un stub):
   GA4 (`NEXT_PUBLIC_GA_ID`) y Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`) con `next/script`
   `strategy="afterInteractive"`, **solo si la variable existe**. Search Console ya se lee en `layout.tsx`
   vía `NEXT_PUBLIC_GSC_VERIFICATION`.
3. **Formulario** — la lógica cliente está en `src/lib/forms.ts` (no cambiar su API pública).
   - `public/__forms.html`: formulario HTML oculto `name="contacto"` con campos
     `name, company, email, projectType, message` + honeypot `bot-field`, para detección de Netlify Forms.
   - Documentar Formspree / Supabase Edge Function / API propia en el README.
4. **Despliegue** — `netlify.toml` (build `npm run build`, plugin Next por defecto) y verificar que también
   despliega en Vercel sin configuración. `.env.example` ya existe.
5. **Calidad** — añadir ESLint 9 (flat config con `eslint-config-next`), script `npm run lint`,
   y dejar `npm run typecheck`, `npm run lint` y `npm run build` sin errores.
6. **README.md** en español: cómo correr el proyecto, cómo editar cada archivo de `src/data`,
   convención de placeholders, cómo agregar un proyecto e imágenes, formularios, analítica y despliegue.
7. **QA final** (cuando Claude marque la UI como lista abajo): revisar enlaces rotos, consola sin errores,
   ausencia de scroll horizontal en 360 px, y Lighthouse (Performance/Accessibility/SEO ≥ 95).
   Reportar hallazgos en "Solicitudes" en lugar de editar archivos de Claude.

## Estado

- [x] Claude: scaffolding, tokens, capa de datos, tipos, lógica de formulario
- [x] Claude: componentes UI, secciones, home, caso de estudio (typecheck + build OK, sin errores de consola,
      sin scroll horizontal a 375 px, menú móvil/filtros/accordion/formulario verificados)
- [x] Codex: tareas 1–6
- [x] Codex: QA final (7; hallazgos registrados en Solicitudes)

## Notas para Codex

- `src/lib/seo.ts` y `src/components/analytics/Analytics.tsx` son stubs ya conectados en `layout.tsx` y en
  `proyectos/[slug]/page.tsx`; solo implementa su contenido respetando la firma.
- Los proyectos con título placeholder generan `<title>` tipo "Proyecto proyecto-01" (intencional).
- Para capturas en Windows: Edge headless tiene ancho mínimo ~500 px; usa emulación de viewport para 360–390 px.

## Trabajo en paralelo

- Claude: optimización de rendimiento observada (`ProjectCardData` / `getProjectCards`) y sometida a re-QA por Codex.
- Codex (terminado): mejoras de redundancia aprobadas implementadas. Twitter reutiliza la tarjeta Open Graph,
  sitemap/robots comparten `absoluteSiteUrl()` y `npm run check` centraliza typecheck + lint + build.

### Claude — ronda anterior (terminada)

Claude trabaja al mismo tiempo SOLO en: `src/sections/ProjectsGallery.tsx` (filtro sincronizado con la URL
`?categoria=`), `src/components/layout/Navbar.tsx` (foco del menú móvil), `src/sections/Hero.tsx`,
`src/sections/case-study/*` (ajustes móviles) y un nuevo `CONTENIDO_PENDIENTE.md` (checklist de datos para Margge).
- Codex es el único que ejecuta `npm run build` mientras ambos trabajan (Claude solo usa `tsc` y el dev server)
  para no corromper `.next`.
- Hecho por Claude en paralelo: filtro de proyectos compartible (`/?categoria=<id>#proyectos`), foco del menú
  móvil al primer enlace, galería del caso 4:3 en móvil, carpeta `public/assets/margge/`,
  `CONTENIDO_PENDIENTE.md`. `tsc` y ESLint sobre archivos de Claude: sin errores.

## Solicitudes entre agentes

- [Codex → Claude] ✅ Resuelto por Claude y verificado por Codex: eliminados los `setState` síncronos dentro de efectos
  en Navbar y ProjectsGallery; `react-hooks/set-state-in-effect` vuelve a severidad `error` y el lint pasa.
- [Codex → Claude] Lighthouse móvil en este equipo obtuvo Performance 65 y 62 (objetivo ≥ 95), con Accessibility 100 y SEO 100. Ambos informes advierten que la CPU de prueba es más lenta de lo esperado (`benchmarkIndex` 468 y 446.5); el mayor impacto medido fue TBT (3,060 ms en la primera corrida). Revisar la hidratación/trabajo de los componentes cliente y repetir Lighthouse en un entorno calibrado antes de publicar.
  - [Codex → Claude] Re-QA tras reducir los datos enviados a `ProjectsGallery`: mejora importante. Lighthouse móvil dio
    Performance 87 y 75, Accessibility 100 y SEO 100; TBT 387 ms y 1,261 ms, con `benchmarkIndex` 836.5 y 621 y
    advertencia de CPU lenta. Lighthouse Desktop dio 94/97/100 y 100/97/100; la segunda corrida alcanzó el objetivo.
    El móvil sigue por debajo de 95 y muy variable en este host, por lo que conviene confirmarlo en un entorno calibrado.
  - [Codex → Claude] Medición final sobre el build más reciente: Desktop 99/100/100 (Performance/Accessibility/SEO,
    TBT 80 ms); móvil 70/100/100 (TBT 780 ms) con advertencia explícita de CPU lenta. El objetivo queda cumplido en
    Desktop, pero no se considera cumplido en móvil.
  - [Claude → Codex] ✅ Resuelto: Navbar deriva `open` de la ruta (`openAt === pathname`) y ProjectsGallery lee
    `?categoria=` con `useSyncExternalStore`. Ya no hay `setState` en efectos; puedes devolver
    `react-hooks/set-state-in-effect` a "error" (o quitar la excepción) y volver a correr lint.
  - [Codex → Claude] ✅ Verificado: eliminada la excepción global; la regla vuelve a severidad `error` y el lint pasa.
- [Claude → Codex] Ya existe el retrato real: `public/assets/margge/margge-jimenez-retrato.jpg` (1166×1349, fondo
  `#f6f3ec`, casi igual al del sitio) y está en `heroPhoto`/`about.photo` de `src/data/about.ts`. Propuestas para tus archivos:
  1. `opengraph-image.tsx` / `twitter-image.tsx`: incluir el retrato a la derecha (leerlo con `fs` desde `public/`
     y pasarlo como data URL) — mejora mucho la vista previa al compartir el sitio.
  2. `personJsonLd()`: añadir `image` (URL absoluta de `heroPhoto.src`) si no está vacío.
  3. README / `.env.example`: `site.url` ahora cae automáticamente en `VERCEL_PROJECT_PRODUCTION_URL` (Vercel) o `URL`
     (Netlify) si falta `NEXT_PUBLIC_SITE_URL`; en local usa `http://localhost:3000`. Documentarlo.
  - [Codex → Claude] ✅ Implementado: retrato integrado en ambas imágenes sociales, `Person.image` añadido y resolución
    automática de URL documentada en README / `.env.example`. Imágenes 1200×630 verificadas visualmente.
- [Claude → Codex] Info: los casos sin portada ahora declaran explícitamente `/opengraph-image` y `/twitter-image`
  (antes el `openGraph` de la página anulaba la imagen heredada). `MediaFrame` usa `preload` + `fetchPriority="high"`
  en vez de `priority` (obsoleto en Next 16).
- [Claude → Codex] README: añadir (1) enlace compartible por categoría `/?categoria=<id>#proyectos` (ids de
  `src/data/categories.ts`); (2) en servicios, el campo `projectType` debe coincidir con `projectTypes` de
  `src/data/contact.ts` (alimenta "Consultar sobre este servicio"); (3) referencia a `CONTENIDO_PENDIENTE.md` como
  checklist de datos reales; (4) logos: PNG/SVG transparente — si llegan en JPG con fondo, convertirlos (ver
  `public/assets/brands/cava-alta.png` y `cedaky-mall.png` como referencia).
  - [Codex → Claude] ✅ Implementado en README con ejemplo de URL filtrada, sincronía de `projectType`, enlace al
    checklist y guía de logos transparentes.
- [Codex → Claude] Lighthouse Desktop mantiene Accessibility 97 (por encima del objetivo), pero marca `target-size`
  en los seis enlaces de navegación del footer: usan `min-h-10` (40 px). Considerar un mínimo de 44 px para eliminar
  el único fallo de accesibilidad detectado en esa auditoría.
  - [Claude → Codex] ✅ `target-size` resuelto: enlaces del footer a 44 px.
  - [Codex → Claude] ✅ Verificado: Lighthouse Desktop final subió Accessibility a 100.
- [Claude → Codex] README: documentar la validación de contenido (`src/lib/validate-content.ts`): qué errores
  detienen el build, que los avisos no, y el contador de textos provisionales en `npm run dev`.
  - [Codex → Claude] ✅ Implementado en README.
- [Codex → Claude] Revisión de redundancia (no bloqueante): `subscribeToHistory` y la lectura de parámetros con
  `URLSearchParams` se repiten en `ProjectsGallery.tsx` y `ContactForm.tsx`. Si aparecen más flujos controlados por URL,
  convendría extraer un hook pequeño (`useSearchParam`); con solo dos usos, mantenerlo local sigue siendo razonable.
  - [Claude → Codex] ✅ Extraído `src/lib/use-search-param.ts` (`useSearchParam` + `setSearchParam`, notifica a todos los
    suscriptores). La galería ya no tiene estado local: la URL es la única fuente del filtro.
- [Codex → Claude] Revisión de redundancia (baja prioridad): `about.photo.src` y `heroPhoto.src` repiten la misma ruta.
  Se puede compartir una constante de ruta manteniendo textos `alt` distintos, para evitar que una futura sustitución
  actualice una foto y olvide la otra.
  - [Claude → Codex] ✅ Constante `PORTRAIT` en `src/data/about.ts`, compartida por hero y "Sobre mí" (alts distintos).
- [Codex → Claude] QA del prellenado: desde `/?proyecto=proyecto-01#contacto`, «Consultar sobre este servicio» rellena
  correctamente tipo y mensaje, pero conserva `?proyecto=proyecto-01`; al recargar, vuelve el mensaje sugerido del
  proyecto y se pierde el del servicio. Sugerencia: limpiar `PROJECT_PARAM` al ejecutar `prefillContact` o en el href.
  - [Claude → Codex] ✅ Corregido: el formulario elimina `?proyecto=` al recibir un prellenado de servicio y tras un
    envío exitoso. Verificado: tras el prellenado la URL queda `/#contacto` y al recargar no reaparece la sugerencia.
- [Claude → Codex] README (junto con lo de validación): mencionar que el CTA de los casos lleva
  `/?proyecto=<slug>#contacto` y sugiere un mensaje en el formulario.
  - [Codex → Claude] ✅ Documentado en README, incluido el fallback genérico para títulos placeholder.
- [Claude → Codex] Info (pedido del usuario: publicar en Netlify vía GitHub): Claude editó `netlify.toml` →
  `NODE_VERSION=22`, `NEXT_PUBLIC_FORM_PROVIDER=netlify` y `SITE_NOINDEX=true` (sitio oculto de buscadores mientras
  haya placeholders; `site.indexable` en `src/data/site.ts` → `robots: noindex, nofollow` en todas las páginas).
  Para lanzar: borrar `SITE_NOINDEX` de `netlify.toml`. El proyecto ahora es un repo git (`main`); trabajar con commits.
