# Contenido pendiente — Portafolio de Margge Jiménez

Checklist de la información real que falta para publicar el sitio. Todo lo que hoy aparece
**entre corchetes y en color terracota** en la web es contenido provisional.

> Regla: solo se publica información confirmada. Si un dato no se puede verificar o no se puede
> mostrar por confidencialidad, se omite; nunca se estima ni se inventa.

---

## 1. Identidad y contacto → `src/data/site.ts`

- [ ] Título profesional definitivo (hoy: "Consultora de Marketing Digital")
- [ ] Propuesta de valor, una frase (hoy: "Estrategia, contenido y marcas que conectan.")
- [ ] Ciudad / país (o "Remoto")
- [ ] Email de contacto
- [ ] WhatsApp (con código de país, p. ej. 52 55 1234 5678)
- [ ] URL de LinkedIn
- [ ] URL de Instagram
- [ ] Dominio final del sitio (p. ej. `margge.com`)

## 2. Fotografías → `public/assets/margge/` + `src/data/about.ts`

- [x] Retrato principal para la portada → `margge-jimenez-retrato.jpg` (1166×1349)
- [ ] Segunda foto para "Sobre mí" (vertical, 4:5). Hoy se usa el mismo retrato con un encuadre más
      cerrado; una toma distinta (trabajando, en contexto, de medio cuerpo) le daría más variedad.
- [ ] Ideal: versión del retrato en mayor resolución (≥ 1600 px de alto) para pantallas retina grandes

## 3. Sobre mí → `src/data/about.ts`

- [ ] Revisar/ajustar los 2 párrafos provisionales
- [ ] Tercer párrafo: enfoque personal, especialidades, tipo de marcas o industrias
- [ ] Número de marcas con las que ha trabajado (o eliminar la cifra)
- [ ] Número de proyectos (o eliminar la cifra)
- [ ] Áreas de enfoque (hoy: Estrategia · Marketing digital · Contenido · Comunicación)

## 4. Marcas → `src/data/brands.ts` + `public/assets/brands/`

Agregadas (trabajo directo, con logo): **Cava Alta**, **Cedaky Mall**. Ya no hay espacios provisionales:
la sección muestra solo marcas confirmadas (los proyectos de ejemplo mostrarán "[Agregar marca]").

Por cada marca nueva:
- [ ] Nombre exacto
- [ ] Logo (SVG o PNG transparente, idealmente en una sola tinta)
- [ ] Confirmar que se puede mostrar públicamente (algunas agencias/NDAs lo impiden)

## 5. Experiencia → `src/data/experience.ts`

Por cada agencia o empresa, de la más reciente a la más antigua:
- [ ] Nombre de la agencia/empresa
- [ ] Cargo
- [ ] Periodo (mes/año inicio — mes/año fin o "Actual")
- [ ] Ciudad
- [ ] 2–4 responsabilidades principales
- [ ] Marcas/cuentas que manejó
- [ ] Proyectos destacados (si tienen caso de estudio)

## 6. Proyectos / casos de estudio → `src/data/projects.ts` + `public/assets/projects/<proyecto>/`

Recomendado: 4–6 proyectos fuertes. Por cada uno:

**Ficha**
- [ ] Marca · nombre del proyecto · año · industria
- [ ] Tipo de proyecto y categorías (Social Media, Estrategia, Branding, Campañas, Producción de contenido, Lanzamientos, Marketing digital)
- [ ] Rol de Margge
- [ ] Descripción breve (1–2 líneas)

**Caso**
- [ ] Contexto · objetivo · reto
- [ ] Estrategia utilizada
- [ ] Ejecución y piezas desarrolladas

**Participación (clave)**
- [ ] Cómo se dio la colaboración (p. ej. "desde la agencia X, como parte del equipo de cuenta")
- [ ] Qué hizo Margge directamente (solo acciones de las que fue responsable)
- [ ] Qué hizo el resto del equipo o la agencia (contexto, no se le atribuye)

**Resultados**
- [ ] Cifras o resultados **confirmados** y atribuibles, con su fuente si es posible
- [ ] Confirmar que se pueden publicar

**Material visual**
- [ ] Imagen principal (horizontal, mín. 2000 px de ancho)
- [ ] 2–6 imágenes o videos para la galería
- [ ] Aprendizajes o impacto

## 7. Servicios → `src/data/services.ts`

Hoy hay 8 servicios provisionales marcados "Por confirmar". Para cada uno:
- [ ] ¿Lo ofrece? (sí / no → se elimina)
- [ ] Descripción corta
- [ ] Qué incluye, entregables y para quién es

## 8. Metodología → `src/data/process.ts`

- [ ] Validar los 6 pasos (Descubrimiento → Resultados) o ajustarlos a su forma real de trabajar

## 9. Testimonios (opcional) → `src/data/testimonials.ts`

La sección permanece oculta hasta que haya testimonios reales. Por cada uno:
- [ ] Texto literal · nombre · cargo · empresa · relación (cliente, supervisor/a, colega, marca)
- [ ] Autorización para publicarlo

## 10. Identidad visual (opcional) → `src/app/globals.css`

- [ ] Colores de marca personal, si existen (hoy: neutros cálidos + acento terracota)
- [ ] Tipografías preferidas, si existen
