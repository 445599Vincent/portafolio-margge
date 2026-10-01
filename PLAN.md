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

En Codex corresponde a `low / medium / high` (y `xhigh` para "Muy alto", si tu versión lo ofrece).
En Claude, al selector de esfuerzo de la sesión del Ejecutor.

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

| Id | Tarea | Agente | Esfuerzo | Estado |
|---|---|---|---|---|
| P-01 | Datos de contacto y redes (email, WhatsApp, LinkedIn, Instagram, ciudad) en `src/data/site.ts` | Codex | Bajo | Bloqueado |
| P-02 | Texto definitivo de "Sobre mí" + cifras reales (marcas, proyectos) en `src/data/about.ts` | Ejecutor | Bajo | Bloqueado |
| P-03 | Trayectoria real (agencias, cargos, periodos, cuentas) en `src/data/experience.ts` | Codex | Bajo | Bloqueado |
| P-04 | Servicios confirmados (quitar los que no ofrece, descripciones, `draft:false`) en `src/data/services.ts` | Ejecutor | Bajo | Bloqueado |
| P-05 | Proyectos reales: 4–6 casos con imágenes, participación y resultados verificados | Ejecutor | Medio (por proyecto) | Bloqueado |
| P-06 | Marcas restantes con logo (o eliminar los 6 espacios provisionales) | Codex | Bajo | Bloqueado |

### B. Funcionamiento y publicación

| Id | Tarea | Agente | Esfuerzo | Estado |
|---|---|---|---|---|
| P-10 | Verificar formulario en Netlify: "Form detection" activo, envío de prueba recibido, notificación por email configurada | Usuario + Codex | Bajo | Pendiente |
| P-11 | Pruebas de robustez: sitio sin JavaScript y con "movimiento reducido" | Codex | Medio | Pendiente |
| P-12 | Medir rendimiento móvil en entorno calibrado (pagespeed.web.dev desde el navegador del usuario) | Usuario | — | Pendiente |
| P-13 | Lanzamiento: quitar `SITE_NOINDEX`, dominio propio, Search Console, GA4/Clarity | Codex | Medio | Bloqueado (contenido) |

### C. Mejoras de diseño (a definir con el usuario)

| Id | Tarea | Agente | Esfuerzo | Estado |
|---|---|---|---|---|
| P-20 | _(por definir en la próxima conversación de planificación)_ | — | — | — |

---

## 5. Registro de decisiones

- Sitio oculto de buscadores (`SITE_NOINDEX=true` en `netlify.toml`) hasta tener contenido real.
- Nombre correcto: **Margge** Jiménez.
- Marcas confirmadas: Cava Alta y Cedaky Mall (trabajo directo). Los proyectos de ejemplo no se asocian a marcas reales.
- Netlify inyecta un comentario en `<head>`; `layout.tsx` lo elimina antes de hidratar (no quitar ese script).
