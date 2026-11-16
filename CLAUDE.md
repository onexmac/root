# root — monorepo de Marcos (onexmac)

Todo proyecto de código vive aquí, cada uno en su carpeta: `root/<proyecto>/` (kebab-case).

## Reglas

- **No crear repos nuevos ni clones sueltos.** Un proyecto nuevo es una carpeta nueva en `root/`.
  - Cloud (Claude Code web/app): adjuntar solo `onexmac/root`.
  - Local: `~/git/onexmac/root`.
- **Un solo proyecto de Vercel para todo `root`.** Cada proyecto se publica como subruta: `<dominio>/<carpeta>/`. Nada se configura por proyecto en Vercel.
  - `vercel.json` (raíz) corre `scripts/build-root.sh`, que arma `dist/` y genera el índice `/`.
  - Proyecto nuevo = carpeta nueva + agregarla en `scripts/build-root.sh` (`STATIC`, `NEXT` o `VITE`).
  - Apps Next: `next.config.ts` usa `ROOT_BASE` (export estático + `basePath`). Rutas a archivos de `public/` escritas a mano deben llevar el prefijo (`process.env.NEXT_PUBLIC_BASE`).
  - Probar antes de subir: `bash scripts/build-root.sh` y revisar `dist/<carpeta>/`.
- **Publicar** = push a `main`. Entregar el link `<dominio>/<carpeta>/` ya verificado (que cargue).
- **Merge a `main`**: cuando Marcos pidió el cambio, sin confirmación aparte.
- **Sin vigilancia de PRs**: no suscribirse ni programar check-ins salvo pedido explícito.
- Ramas de trabajo: `claude/<tema>`. Cambios a una carpeta no tocan otras.

## Carpetas especiales

- **MAGI no vive aquí.** Su canon está en el repo privado `onexmac/magi`. No copiar archivos de MAGI a `root`.
- **`adelante-design-system/`** — copia de `DavidpcAD/adelante-design-system` para referencia (sistema de diseño **Losa Flotante**). No se edita aquí; se actualiza con:

  ```bash
  git subtree pull --prefix=adelante-design-system https://github.com/DavidpcAD/adelante-design-system.git main
  ```

- **`histok/`** — privado; vive aquí por eso `root` es privado.

## Sistema de diseño

AD Visual (Figma `gAMndOnwTBgC6nZnjY6bgT`, páginas 493:45 y Graveyard 5047:11726): Inter, tooltips en Bitter itálica, listas con líneas finas, versión oscura en `cuadrillas/index.html`.

Losa Flotante. Tokens: `control-usuarios/design-system/DESIGN.md`, `control-usuarios/app/globals.css`; componentes en `adelante-design-system/react/`. Stack de prototipos: Next.js + Tailwind v4 + motion + Phosphor.

## Proyectos

| Carpeta | Qué es | Publicación |
|---|---|---|
| cuadrillas | Tablero de cuadrillas por maestro de obra | `/cuadrillas/` (estático) |
| control-usuarios | Prototipo control de usuarios / pedidos | `/control-usuarios/` (Next) |
| kpi | KPI Adelante | `/kpi/` (estático) |
| antomap | Antomap | `/antomap/` (estático) |
| adelante-web | Web Adelante / DS overview | `/adelante-web/` (Next) |
| duck | Duck DS (Vite en `skll-corp/`) | `/duck/` (Vite) |
| histok | Histok | `/histok/` (Next) |
| adelante-design-system | Referencia DS (David) | no se publica |

Fuera de root: `plasticle` (privado, aparte) y forks de terceros.
