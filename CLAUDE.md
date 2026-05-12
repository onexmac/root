# CLAUDE.md — Adelante Design System

> Este archivo es leído automáticamente por Claude Code al abrir esta carpeta.

## Flujos de trabajo

| Flujo | Archivo | Cuándo usarlo |
|---|---|---|
| **Losa Flotante** | [LosaFlotante.md](LosaFlotante.md) | Actualizar o crear un componente del sistema de diseño |
| **Formaleta** | [Formaleta.md](Formaleta.md) | Generar una pantalla de la app desde Figma |

Ambos flujos tienen el mismo checkpoint: si el componente (o valor) **no existe en Live Code**, preguntar al usuario qué hacer antes de continuar.

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
| Deploy | GitHub Pages — auto en push a `main` |
| Figma sync | MCP de Figma (`mcp.figma.com`) |

> **Regla global:** No usar Tailwind. Todo con `var(--ds-*)` tokens.
