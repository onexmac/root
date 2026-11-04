# control-usuarios

Prototipo del flujo UO2 → UO5 de "Control de Usuarios" basado en la propuesta CP2 del Figma.

## Stack
Next.js 15 (App Router) + TypeScript + Tailwind v4 + motion + Phosphor + next-themes.
Conventions: `~/Documents/claudecode/prototype-stack.md`.

## Design system (fixed)
Losa Flotante — https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante?node-id=2-2&m=dev
Tokens en `design-system/DESIGN.md`. Reglas en `design-system/SKILL.md`.
Tokens están aplicados en `app/globals.css` vía `@theme`.

## Mockup screens
Figma file (privado del usuario, página CP2 nodeId `205:1671`):
- UO2 (`205:1720`) — vista lista de usuarios, con hover en fila revelando "Editar"
- UO3 (`207:2453`) — botón `+` en estado armed (dim overlay + pill expandido)
- UO4 (`207:2619`) — panel "Nuevo Usuario", tab "Personal" (paso 1)
- UO5 (`205:1925`) — panel "Nuevo Usuario", tab "Rol y asignación" (paso 2)

## Flujo
`idle` (UO2) → click `+` → `armed` (UO3) → click otra vez → `personal` (UO4) → tab/next → `role` (UO5) → "Crear usuario" → vuelve a `idle`.

## Starter primitives
- `lib/springs.ts` — transitions con nombre (snappy / completing / deleting / expanding / settling / shrinking)
- `lib/haptic.ts` — vocabulario semántico de vibración
- `lib/cn.ts` — clsx + tailwind-merge

## Run
`npm run dev` → http://localhost:3000
`npx vercel --prod` → ship
