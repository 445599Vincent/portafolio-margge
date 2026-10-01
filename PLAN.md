# PLAN.md — Hoja de ruta del portafolio de Margge Jiménez

Fuente única de lo que falta por hacer. La mantiene el **Planificador**; el **Ejecutor** y **Codex** solo
marcan avances (estado + nota corta) y no agregan tareas nuevas sin pasar por aquí.

Sitio: https://portafoliomargge.netlify.app · Repo: `445599Vincent/portafolio-margge` (push a `main` = deploy).

---

## 1. Roles

| Rol | Quién | Hace | No hace |
|---|---|---|---|
| **Planificador** | Sesión de Claude "Planificador" | Define cambios con el usuario, prioriza, redacta encargos con esfuerzo y criterios de aceptación, revisa resultados | Editar código del sitio |
| **Ejecutor** | Sesión de Claude "Ejecutor" | Diseño, UI, contenido, componentes, decisiones visuales y de UX | Cambiar el plan o la prioridad |
| **Codex** | Codex | Ingeniería acotada: SEO técnico, integraciones, configuración, scripts, QA, documentación | Decisiones de diseño o de contenido |

Regla de reparto: si la tarea necesita **criterio visual o de redacción** → Ejecutor. Si está **completamente
especificada y se puede verificar con un comando o una lista** → Codex.

## 2. Niveles de esfuerzo

Cada encargo indica el esfuerzo con el que debes pedirlo. Regla: el nivel más bajo que resuelva la tarea
sin reintentos. Un reintento cuesta más que haber subido un nivel.

| Nivel | Cuándo | Ejemplos en este proyecto |
|---|---|---|
| **Bajo** | Cambio mecánico, archivo(s) indicado(s), sin decisiones | Cargar textos o datos en `src/data/*`, quitar `SITE_NOINDEX`, actualizar README, cambiar un color o un texto |
| **Medio** | Cambio acotado con alguna decisión o en 2–4 archivos | Nueva variante de una sección, ajuste responsive, agregar un proyecto con imágenes, QA con checklist |
| **Alto** | Varias capas a la vez, causa desconocida o riesgo de romper algo | Bug sin causa clara, rendimiento, integraciones (formulario, analítica, dominio), rediseño de una sección |
| **Muy alto** | Solo si "Alto" ya falló o es arquitectura | Casi nunca en este proyecto |

### Modelo + esfuerzo por nivel

| Nivel | Ejecutor (Claude Code) | Codex |
|---|---|---|
| **Bajo** | Claude **Sonnet 5.5** · esfuerzo `low` | **GPT-6-Luna** · `low` |
| **Medio** | Claude **Sonnet 5.5** · esfuerzo `medium` | **GPT-6-Sol** · `medium` |
| **Alto** | Claude **Opus 5.5** · esfuerzo `high` | **GPT-6-Sol** · `high` |
| **Muy alto** | Claude **Opus 5.5** · `xhigh` → si falla, **Fable 5.1** · `high` | **GPT-6-Astra** · `high` |
| _Planificador_ | Claude **Opus 5.5** · esfuerzo `medium` | — |

Notas:
- Claude Code arranca por defecto en esfuerzo `xhigh`: bájalo siempre según la tabla.
- Fable 5.1 cuesta ~2.5× Opus 5.5; Opus 5.5 ~2× Sonnet 5.5. Haiku 4.5 no se usa: las tareas mecánicas van a Codex.
- Codex: no usar la generación GPT-5.x (anterior). `service_tier = "priority"` consume más; dejarlo en el
  estándar salvo urgencia. Los niveles `max`/`ultra` no se usan en este proyecto.

Para ahorrar tokens:
- Un encargo = una tarea con su id (`P-xx`). No mezclar tareas en un mismo mensaje.
- Pegar el encargo tal cual: ya incluye archivos, contexto y criterio de aceptación (evita que el agente explore).
- Tareas relacionadas, en la misma conversación del agente. Tareas no relacionadas, en conversación nueva.

## 3. Flujo de trabajo

1. Usuario ↔ Planificador: se define el cambio y se agrega aquí con id, agente, esfuerzo y criterio de aceptación.
2. El Planificador entrega el encargo listo para pegar.
3. Ejecutor/Codex lo implementa, corre `npm run check`, hace commit (`P-xx: …`) y push a `main`.
4. Marca la tarea como `Hecho` aquí con una nota de una línea.
5. El Planificador revisa (diff + sitio en vivo) y la cierra o abre una corrección.

Estados: `Pendiente` · `Bloqueado` (falta info del usuario o de Margge) · `En curso` · `Hecho` · `Verificado`.

---

## 4. Backlog

### A. Contenido real (depende de Margge — ver `CONTENIDO_PENDIENTE.md`)

| Id | Tarea | Agente · modelo · esfuerzo | Estado |
|---|---|---|---|
| P-01 | Datos de contacto y redes (email, WhatsApp, LinkedIn, Instagram, ciudad) en `src/data/site.ts` | Codex · GPT-6-Luna · low | Bloqueado |
| P-02 | Texto definitivo de "Sobre mí" + cifras reales (marcas, proyectos) en `src/data/about.ts` | Ejecutor · Sonnet 5.5 · low | Bloqueado |
| P-03 | Trayectoria real (agencias, cargos, periodos, cuentas) en `src/data/experience.ts` | Codex · GPT-6-Luna · low | Bloqueado |
| P-04 | Servicios confirmados (quitar los que no ofrece, descripciones, `draft:false`) en `src/data/services.ts` | Ejecutor · Sonnet 5.5 · low | Bloqueado |
| P-05 | Proyectos reales: 4–6 casos con imágenes, participación y resultados verificados (un encargo por proyecto) | Ejecutor · Sonnet 5.5 · medium | Bloqueado |
| P-06 | Marcas restantes con logo PNG transparente (o eliminar los 6 espacios provisionales) | Codex · GPT-6-Sol · medium | Bloqueado |

### B. Funcionamiento y publicación

| Id | Tarea | Agente · modelo · esfuerzo | Estado |
|---|---|---|---|
| P-10 | Verificar formulario en Netlify: "Form detection" activo, envío de prueba recibido, notificación por email configurada | Usuario (en Netlify) | Pendiente |
| P-11 | Pruebas de robustez: sitio sin JavaScript y con "movimiento reducido" | Codex · GPT-6-Sol · medium | Hecho — QA en vivo 375/1280: movimiento reducido OK y fallos sin JS documentados en AGENTS.md. |
| P-12 | Medir rendimiento móvil en entorno calibrado (pagespeed.web.dev desde el navegador del usuario) | Usuario | Verificado — PSI móvil 99/100/100 (LCP 2.1 s, TBT 10 ms, CLS 0). Sin tareas de rendimiento. |
| P-14 | Formulario sin JavaScript: `method="POST"` + `action="/__forms.html"` + `form-name` oculto (hoy envía por GET y deja datos personales en la URL) | Ejecutor · Sonnet 5.5 · low | Pendiente |
| P-13 | Lanzamiento: quitar `SITE_NOINDEX`, dominio propio, Search Console, GA4/Clarity | Codex · GPT-6-Sol · medium | Bloqueado (contenido) |

### C. Mejoras de diseño (a definir con el usuario)

| Id | Tarea | Agente · modelo · esfuerzo | Estado |
|---|---|---|---|
| P-20 | _(por definir en la próxima conversación de planificación)_ | — | — |

---

## 5. Registro de decisiones

- Sitio oculto de buscadores (`SITE_NOINDEX=true` en `netlify.toml`) hasta tener contenido real.
- Nombre correcto: **Margge** Jiménez.
- Marcas confirmadas: Cava Alta y Cedaky Mall (trabajo directo). Los proyectos de ejemplo no se asocian a marcas reales.
- Rendimiento cerrado (2026-09-30): PageSpeed móvil 99. Las cifras bajas previas eran por la CPU local.
- Netlify inyecta un comentario en `<head>`; `layout.tsx` lo elimina antes de hidratar (no quitar ese script).
