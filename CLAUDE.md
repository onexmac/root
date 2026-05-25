# CLAUDE.md — Adelante Design System

> Este archivo es leído automáticamente por Claude Code al abrir esta carpeta.

## Contexto obligatorio

**ACCIÓN REQUERIDA antes de cualquier tarea:** usar la herramienta Read para leer estos tres archivos en orden, completos. No escanear.

1. `docs/Memory.md` — equipo, stack, workflow y entorno
2. `docs/Losa.md` — reglas de gobierno y tabla de routing
3. `docs/Flotante.md` — librería de componentes: tokens, springs, haptics, inventario DS y vendoring

**Regla:** si un componente, prop, token o interacción no está documentado explícitamente en `Flotante.md`, no inventar — preguntar antes de continuar.

---

## Flujos de trabajo

| Flujo | Archivo | Cuándo usarlo |
|---|---|---|
| **Losa Flotante** | [docs/flotante.md](docs/flotante.md) | Actualizar o crear un componente del sistema de diseño |

Si el componente (o valor) **no existe en Live Code**, preguntar al usuario qué hacer antes de continuar.

---

## Archivos de Figma

| Archivo | Key |
|---|---|
| **Losa Flotante** (design system) | `oRDLRL9OUNcTQ0k6G5MBPS` |
| **Prototype Screens** | _(agregar key cuando esté disponible)_ |

---

## Links

- **Storybook live:** https://davidpcad.github.io/adelante-design-system/
- **GitHub:** https://github.com/DavidpcAD/adelante-design-system
- **Figma:** https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | CSS custom properties (`react/design-system.css`) |
| Motion | `motion/react` (Framer Motion) |
| Icons | `@phosphor-icons/react` |
| Build | Vite |
| Docs | Storybook 10 (React Vite) |
| Testing | Vitest + Playwright (browser) |
| Deploy | GitHub Pages + Chromatic |
| Design | Figma + `@figma/code-connect` |
