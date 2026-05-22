# CLAUDE.md — Adelante Design System

> Este archivo es leído automáticamente por Claude Code al abrir esta carpeta.

## Contexto obligatorio

Leer antes de cualquier acción:

1. `docs/flotante.md` — entry point del sistema. Define los componentes disponibles y referencia los archivos companion necesarios según la tarea.

**Regla:** usar solo lo que esté documentado. Si un componente o valor no existe, preguntar antes de continuar.

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
| Build | Vite |
| Docs | Storybook 10 (React Vite) |
| De