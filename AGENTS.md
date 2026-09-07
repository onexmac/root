<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Histok — app de repaso

Reels de estudio para una estudiante de décimo en Costa Rica. Lema: *Más
Historia, menos Tik Tok*. Se usa **en un iPhone**, así que tiene que sentirse
nativa: gestos, resortes, nada de esperas.

- **En vivo:** https://histok.vercel.app
- **Stack:** Next.js (App Router) · TypeScript · Tailwind v4 · `motion`
- Importá siempre desde `motion/react`, **nunca** de `framer-motion`.

```bash
npm run dev          # servidor local
npx tsc --noEmit     # tipos
npx eslint .         # lint
node scripts/audit-content.mjs   # auditoría de contenido — corré esto SIEMPRE
```

## Desplegar

Vercel **no** está conectado a este repo: los despliegues salen del CLI, y la
carpeta `.vercel/` que guarda el enlace está en `.gitignore`. Desde una
máquina nueva hay que enlazar el proyecto una vez (`vercel link`, proyecto
`estudia-reels` de la cuenta `onexmac`) y después:

```bash
npx vercel --prod --yes
npx vercel alias set <deploy-que-devolvió> histok.vercel.app
```

El alias es necesario porque `histok.vercel.app` no sigue automáticamente al
último despliegue de producción. Si preferís que cada push despliegue solo,
conectá el repo desde el panel de Vercel (Project → Settings → Git) y el paso
del alias desaparece.

## Modelo de contenido

Todo vive en `data/topics.ts`: `Materia` → `Topic` (sección) → `Slide`.

```ts
type BodyPart =
  | string              // texto normal
  | { term: string }    // término del glosario: rojo y tocable
  | { name: string }    // personaje histórico: resaltado, no tocable
```

- `slide.info` es el pie de foto que aparece al **mantener presionada** la
  imagen. Describe la foto real y su fuente.
- `slide.diagram` muestra la imagen **entera** (sin recorte ni parallax), en
  vez de a sangre completa. Es para los gráficos dibujados de Biología.

## Reglas de contenido (se aprendieron a golpes)

1. **Un término del glosario nunca lleva su definición en la misma
   diapositiva.** Si el texto ya explica la palabra, tocar el rojo no enseña
   nada. El auditor marca cualquier solapamiento ≥45 %.
2. **Toda diapositiva lleva `info`.** Escribilo contra la fuente real de la
   imagen, no de memoria.
3. **Las imágenes salen de Wikimedia Commons**, con licencia libre
   verificada (dominio público, CC0, CC BY, CC BY-SA) y con la identidad de
   lo que muestran confirmada en la página del archivo. Redimensionalas a
   ~1600 px de lado mayor antes de commitear.
4. **Ninguna imagen se repite** entre diapositivas.
5. **Seguí la estructura del profesor.** Si él ve cuatro casos por separado,
   son cuatro secciones o cuatro diapositivas — no una sola combinada.
6. Los gráficos dibujados (Biología) son SVG a 1000×1450, fondo azul oscuro
   `#070d24` y trazos neón. El dibujo va en el tercio superior: en el
   teléfono el texto de la diapositiva cubre la parte de abajo.

## Interacciones

`ONBOARDING.md` es el manual de interacciones (Losa Flotante): resortes con
nombre, el gesto de arrastre, el patrón de "una sola MotionValue manda", y
las trampas de depuración. **Leelo antes de tocar animaciones.**

Dos que cuestan horas si no las sabés:

- El preview oculto **congela `requestAnimationFrame`**. No podés juzgar una
  animación ahí: verificá por medición (DOM, `getComputedStyle`) y dejá el
  "cómo se siente" para un aparato real.
- **Nunca corrás `next build` con el `next dev` levantado**: corrompe el caché
  de Turbopack y salen errores fantasma. Parás el server, `rm -rf .next`,
  y volvés a arrancar.
