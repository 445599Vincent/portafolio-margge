# Portafolio de Margge Jiménez

Sitio en español para el portafolio profesional de Margge Jiménez, consultora de marketing digital. Está construido con Next.js 16 (App Router), React 19, TypeScript 5.9 y Tailwind CSS v4.

## Requisitos y ejecución local

- Node.js 20.9 o superior.
- npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

En Windows PowerShell, copia las variables con `Copy-Item .env.example .env.local`. El sitio estará disponible en `http://localhost:3000`.

Antes de publicar, ejecuta:

```bash
npm run check
```

`npm run check` ejecuta, en orden, el chequeo de tipos, ESLint y el build de producción. También puedes usar `npm run typecheck`, `npm run lint` o `npm run build` por separado durante el desarrollo.

## Dónde editar el contenido

Todo el contenido variable está en `src/data`. No escribas contenido editorial directamente en los componentes.

| Archivo | Contenido |
| --- | --- |
| `about.ts` | Presentación, foto, cifras y áreas de enfoque. |
| `brands.ts` | Marcas confirmadas, logos, sector y enlaces. |
| `categories.ts` | Categorías y etiquetas para filtrar proyectos. |
| `contact.ts` | Textos del contacto, CTA y tipos de proyecto. |
| `experience.ts` | Trayectoria, responsabilidades, cuentas y proyectos asociados. |
| `process.ts` | Pasos y descripciones de la metodología de trabajo. |
| `projects.ts` | Casos de estudio, participación, entregables, resultados e imágenes. |
| `services.ts` | Servicios; usa `draft: true` mientras no estén confirmados. |
| `site.ts` | Nombre, título, SEO, URL pública, contacto y redes sociales. |
| `testimonials.ts` | Testimonios autorizados. Solo se muestran los que tienen `approved: true`. |

Los valores pendientes se escriben entre corchetes, por ejemplo `[Agregar resultado real]`. El sitio los resalta para que sean fáciles de localizar. No sustituyas un placeholder con información no confirmada.

Usa [`CONTENIDO_PENDIENTE.md`](./CONTENIDO_PENDIENTE.md) como checklist central para recopilar y validar los datos reales que aún faltan antes de publicar.

### Validación automática del contenido

`src/lib/validate-content.ts` revisa los archivos de `src/data` desde el servidor. En un build de producción detiene la compilación ante problemas que harían publicar contenido roto, como ids o slugs duplicados, rutas de imágenes inexistentes, categorías o tipos de proyecto inválidos, resultados verificados que aún contienen placeholders, testimonios aprobados incompletos o referencias a proyectos no publicados.

Los avisos no detienen el build; señalan situaciones que todavía pueden resolverse mediante el fallback previsto, como una marca pendiente. Durante `npm run dev` también aparece en la consola el total de textos provisionales entre corchetes. Corrige los errores antes de desplegar y usa los avisos junto con `CONTENIDO_PENDIENTE.md` para completar el contenido real.

## Agregar un proyecto

1. Copia un objeto existente en `src/data/projects.ts`.
2. Asigna un `slug` único, estable y sin espacios. La ruta será `/proyectos/<slug>`.
3. Usa un `brandId` existente en `src/data/brands.ts` y categorías existentes en `src/data/categories.ts`.
4. Completa únicamente información confirmada. `involvement.collaboration` explica cómo trabajó Margge con la marca; `involvement.responsibleFor` enumera solo acciones bajo su responsabilidad. El trabajo del equipo va en `teamContributions`.
5. Marca `published: true` cuando el caso esté listo. Usa `featured: true` solo si debe destacarse.
6. Crea `public/assets/projects/<slug>/` y guarda allí la portada y la galería. Registra rutas desde la raíz pública, por ejemplo `/assets/projects/mi-proyecto/cover.webp`.
7. Usa JPG, PNG o WebP optimizados, idealmente con un ancho máximo aproximado de 2400 px, y escribe textos alternativos descriptivos.

Los logos se guardan en `public/assets/brands/`. Prefiere PNG o SVG con fondo transparente; si el material original llega como JPG con fondo, conviértelo antes de usarlo. `public/assets/brands/cava-alta.png` y `public/assets/brands/cedaky-mall.png` sirven como referencia. Las fotografías de Margge pueden guardarse en `public/assets/margge/` y sus rutas se configuran en `src/data/about.ts`.

Un resultado solo puede usar `verified: true` cuando el dato esté confirmado y sea atribuible al trabajo en el que participó Margge. Si existe una fuente o contexto, añádelo en `source`. Los resultados sin verificar no se presentan como confirmados.

Para publicar un testimonio, agrega una entrada real y autorizada en `src/data/testimonials.ts` con `approved: true`. Si no hay testimonios aprobados, la sección permanece oculta.

Cada categoría puede compartirse con `/?categoria=<id>#proyectos`, usando exactamente un `id` de `src/data/categories.ts`; por ejemplo, `/?categoria=social-media#proyectos`.

El CTA de cada caso enlaza a `/?proyecto=<slug>#contacto`. Al llegar, el formulario propone un mensaje relacionado con ese proyecto; si el título todavía es un placeholder, usa un mensaje genérico y no expone el texto provisional.

## Variables de entorno

Copia `.env.example` como `.env.local`. Nunca subas secretos al repositorio. Las variables con prefijo `NEXT_PUBLIC_` quedan expuestas al navegador, por lo que solo deben contener identificadores o URLs públicas.

- `NEXT_PUBLIC_SITE_URL`: URL pública absoluta opcional usada por metadatos, sitemap, robots y JSON-LD. Si está vacía, el sitio usa `VERCEL_PROJECT_PRODUCTION_URL` en Vercel, `URL` en Netlify y `http://localhost:3000` en local, en ese orden.
- `NEXT_PUBLIC_FORM_PROVIDER`: `none`, `netlify`, `formspree` o `api`.
- `NEXT_PUBLIC_FORM_ENDPOINT`: endpoint público para Formspree, Supabase Edge Function o API propia.
- `NEXT_PUBLIC_GA_ID`: identificador de Google Analytics 4.
- `NEXT_PUBLIC_CLARITY_ID`: identificador de Microsoft Clarity.
- `NEXT_PUBLIC_GSC_VERIFICATION`: código de verificación de Google Search Console.

Analítica, Clarity y Search Console solo se cargan cuando su variable correspondiente existe. Reinicia el servidor de desarrollo después de cambiar variables.

## Conectar el formulario

El formulario envía los campos `name`, `company`, `email`, `projectType` y `message`. La lógica pública vive en `src/lib/forms.ts` y no debe cambiarse al conectar un proveedor.

Al editar `src/data/services.ts`, cada `projectType` debe coincidir exactamente con una opción de `projectTypes` en `src/data/contact.ts`. Ese valor alimenta la acción «Consultar sobre este servicio» y preselecciona el tipo correcto en el formulario.

### Netlify Forms

Configura `NEXT_PUBLIC_FORM_PROVIDER=netlify` y deja `NEXT_PUBLIC_FORM_ENDPOINT` vacío. `public/__forms.html` contiene el formulario oculto que Netlify detecta durante el despliegue, incluido el honeypot `bot-field`.

### Formspree

Configura `NEXT_PUBLIC_FORM_PROVIDER=formspree` y usa la URL pública entregada por Formspree en `NEXT_PUBLIC_FORM_ENDPOINT`, por ejemplo `https://formspree.io/f/[ID_DEL_FORMULARIO]`.

### Supabase Edge Function

Publica una función que acepte `POST` con JSON, valide los cinco campos y responda con un estado HTTP 2xx. Habilita CORS solo para el dominio del portafolio. Configura `NEXT_PUBLIC_FORM_PROVIDER=api` y la URL pública de la función en `NEXT_PUBLIC_FORM_ENDPOINT`. No pongas la service role key ni otros secretos en variables `NEXT_PUBLIC_`; mantenlos dentro de Supabase.

### API propia

Usa `NEXT_PUBLIC_FORM_PROVIDER=api` y configura `NEXT_PUBLIC_FORM_ENDPOINT` con un endpoint HTTPS que acepte el mismo JSON. La API debe validar, limitar solicitudes, filtrar spam y devolver un estado 2xx cuando el envío sea aceptado. Los secretos permanecen exclusivamente en el servidor.

Con `NEXT_PUBLIC_FORM_PROVIDER=none`, el formulario valida los campos pero no intenta enviar.

## Analítica y Search Console

Para GA4, define `NEXT_PUBLIC_GA_ID` con el identificador de medición. Para Microsoft Clarity, define `NEXT_PUBLIC_CLARITY_ID`. Ambos scripts usan carga posterior a la interacción y se omiten por completo si no están configurados.

Para Google Search Console, añade el valor del meta tag de verificación en `NEXT_PUBLIC_GSC_VERIFICATION`. La etiqueta se genera desde el layout. Tras desplegar, registra el sitemap en `/sitemap.xml`.

## Despliegue

### Netlify

Importa el repositorio y define las variables de entorno en la interfaz de Netlify. `netlify.toml` ejecuta `npm run build`; Netlify detecta Next.js y aplica su runtime oficial automáticamente. La variable `URL` que inyecta Netlify se usa como URL canónica si `NEXT_PUBLIC_SITE_URL` está vacía. Netlify Forms requiere desplegar el sitio al menos una vez para detectar `public/__forms.html`.

### Vercel

Importa el repositorio como proyecto Next.js. No necesita un archivo de configuración adicional: Vercel detecta el framework, instala dependencias y ejecuta el build. `VERCEL_PROJECT_PRODUCTION_URL`, inyectada por Vercel, se usa automáticamente como URL canónica; define `NEXT_PUBLIC_SITE_URL` únicamente si necesitas sobrescribirla con otro dominio.

## SEO técnico

La aplicación genera `sitemap.xml`, `robots.txt`, imágenes Open Graph/Twitter y JSON-LD desde `src/data`. Los campos vacíos o con placeholders entre corchetes no se incluyen en los datos estructurados. Si configuras un dominio canónico distinto del dominio de producción de la plataforma, decláralo en `NEXT_PUBLIC_SITE_URL`.
