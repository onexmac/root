# root — monorepo de Marcos (onexmac)

Todo proyecto de código vive aquí, cada uno en su carpeta: `root/<proyecto>/` (kebab-case).

## Reglas

- **No crear repos nuevos ni clones sueltos.** Un proyecto nuevo es una carpeta nueva en `root/`.
  - Cloud (Claude Code web/app): adjuntar solo `onexmac/root`.
  - Local: `~/git/onexmac/root`.
- **Un proyecto = una carpeta = un proyecto de Vercel**, con Root Directory = `<proyecto>` y producción en `main`.
- **Publicar** = desplegar a producción y entregar el link `<proyecto>.vercel.app` ya verificado (que cargue). Con el repo conectado a Vercel, publicar es merge a `main`; si no, desde la carpeta del proyecto:

  ```bash
  npx -y vercel@latest deploy --prod --yes --token "$VERCEL_TOKEN"
  ```

  `VERCEL_TOKEN` viene del environment (secret), nunca escrito en un archivo del repo.
- **Merge a `main`**: cuando Marcos pidió el cambio, sin confirmación aparte.
- **Sin vigilancia de PRs**: no suscribirse ni programar check-ins salvo pedido explícito.
- Ramas de trabajo: `claude/<tema>`. Cambios a una carpeta no tocan otras.

## Carpetas especiales

- **`magi/`** — canon de MAGI. Solo se modifica cuando la tarea es sobre MAGI. Su `CLAUDE.md` rige dentro de la carpeta. Nunca se publica a Vercel.
- **`adelante-design-system/`** — copia de `DavidpcAD/adelante-design-system` para referencia (sistema de diseño **Losa Flotante**). No se edita aquí; se actualiza con:

  ```bash
  git subtree pull --prefix=adelante-design-system https://github.com/DavidpcAD/adelante-design-system.git main
  ```

- **`histok/`** — privado; vive aquí por eso `root` es privado.

## Sistema de diseño

AD Visual (Figma `gAMndOnwTBgC6nZnjY6bgT`, páginas 493:45 y Graveyard 5047:11726): Inter, tooltips en Bitter itálica, listas con líneas finas, versión oscura en `cuadrillas/index.html`.

Losa Flotante. Tokens: `control-usuarios/design-system/DESIGN.md`, `control-usuarios/app/globals.css`; componentes en `adelante-design-system/react/`. Stack de prototipos: Next.js + Tailwind v4 + motion + Phosphor.

## Proyectos

| Carpeta | Qué es | Vercel |
|---|---|---|
| cuadrillas | Tablero de cuadrillas por maestro de obra (HTML estático) | cuadrillas (Framework: Other) |
| control-usuarios | Prototipo control de usuarios / pedidos | control-usuarios |
| kpi | KPI Adelante | — |
| antomap | Antomap | — |
| adelante-web | Web Adelante | — |
| duck | — | — |
| histok | — | — |
| magi | Canon MAGI | no se publica |
| adelante-design-system | Referencia DS (David) | — |

Fuera de root: `plasticle` (privado, aparte) y forks de terceros.
