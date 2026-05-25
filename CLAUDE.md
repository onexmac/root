# CLAUDE.md — Adelante Design System

> This file is read automatically by Claude Code when opening this folder.

## Required context

**REQUIRED ACTION before any task:** use the Read tool to read these three files in order, in full. Do not skim.

1. `docs/Flotante.md` — component library: tokens, springs, haptics, DS inventory and vendoring.
2. `docs/Losa.md` — governing rules and routing table.
3. `docs/Memory.md` — team, stack, workflow and environment.

**Rule:** if a component, prop, token or interaction is not explicitly documented in `Flotante.md`, do not invent it — ask before continuing.

---

## Workflows

| Workflow | File | When to use |
|---|---|---|
| **Losa Flotante** | [docs/flotante.md](docs/flotante.md) | Updating or creating a design system component |

If the component (or value) **does not exist in Live Code**, ask the user what to do before continuing.

---

## Figma files

| File | Key |
|---|---|
| **Losa Flotante** (design system) | `oRDLRL9OUNcTQ0k6G5MBPS` |
| **Prototype Screens** | _(add key when available)_ |

---

## Links

- **Storybook live:** https://davidpcad.github.io/adelante-design-system/
- **GitHub:** https://github.com/DavidpcAD/adelante-design-system
- **Figma:** https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante

---

## Stack

| Layer | Technology |
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
