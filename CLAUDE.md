# CLAUDE.md — Adelante Design System

> Este archivo es leído automáticamente por Claude Code. Define cómo trabajar con este repositorio.

## Misión

Cuando el usuario te dé una pantalla de Figma, debes:
1. Leer el diseño usando el **Figma MCP**
2. Generar un prototipo funcional usando los **componentes de este design system**
3. Respetar los **tokens de diseño** (`react/design-system.css`) — nunca valores hardcodeados

---

## Repositorio

- **GitHub:** https://github.com/DavidpcAD/adelante-design-system
- **Figma:** https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante
- **Storybook:** https://davidpcad.github.io/adelante-design-system/

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | React 19 + TypeScript |
| Styling | CSS custom properties (`react/design-system.css`) |
| Motion | `motion/react` (Framer Motion) |
| Data fetching | TanStack Query (`@tanstack/react-query`) |
| Drag & Drop | `@dnd-kit/core` + `@dnd-kit/sortable` |
| Build | Vite |
| Testing | Vitest |
| Docs | Storybook |

> **No usar Tailwind.** Todos los estilos van con `var(--ds-*)` tokens.

---

## Flujo de trabajo: Figma → Código

Cuando el usuario comparta una URL de Figma:

### Paso 1 — Leer el diseño
Usa la herramienta `mcp_figma_get_design_context` con el `fileKey` y `nodeId` de la URL.

### Paso 2 — Identificar componentes
Mapea los elementos visuales a los componentes existentes:

| Elemento en Figma | Componente React |
|---|---|
| `setButtons` / botón | `import { Button } from "./react/Button/Button"` |
| `searchField` / barra de búsqueda | `import { SearchBar } from "./react/SearchBar/SearchBar"` |
| `tabs` / navegación por tabs | `import { TabsMenu } from "./react/TabsMenu/TabsMenu"` |
| `toggleCards` / toggle colapsable | `import { ToggleCards } from "./react/ToggleCards/ToggleCards"` |
| `navigationControls` / nav bar | `import { Nav } from "./react/Nav/Nav"` |
| `summaryCard` / tarjeta de resumen | `import { Card } from "./react/Card/Card"` |
| `formField` / campo de formulario | `import { FormField } from "./react/Form/Form"` |
| `home` / ícono | `import { Icon } from "./react/Icon/Icon"` |

### Paso 3 — Generar el prototipo
- Crear el archivo en `react/screens/<NombrePantalla>/<NombrePantalla>.tsx`
- Importar componentes existentes — **no reinventar**
- Aplicar layout con CSS (flexbox/grid) usando tokens
- Agregar animaciones con `motion/react` cuando aplique

---

## Componentes disponibles

### Button
```tsx
import { Button } from "./react/Button/Button";

<Button label="Confirmar" variant="primary" state="standard" onClick={() => {}} />
<Button label="Cancelar" variant="secondary" state="standard" />
<Button label="No disponible" variant="disabled" state="disabled" />
```
Props: `label: string`, `variant: primary|secondary|disabled`, `state: standard|pressed|disabled`

### SearchBar
```tsx
import { SearchBar } from "./react/SearchBar/SearchBar";

<SearchBar layout="label" state="standard" />   // con texto
<SearchBar layout="icon" state="standard" />    // solo ícono
<SearchBar layout="normal" state="standard" />  // sin label
```
Props: `layout: label|normal|icon`, `state: standard|pressed`

### TabsMenu
```tsx
import { TabsMenu } from "./react/TabsMenu/TabsMenu";

<TabsMenu label="Boleta" layout="label+icon" state="standard" />
<TabsMenu label="Opciones" layout="label" state="pressed" />
```
Props: `label: string`, `layout: label|label+icon`, `state: standard|pressed`

### ToggleCards
```tsx
import { ToggleCards } from "./react/ToggleCards/ToggleCards";

<ToggleCards state="standard" mode="normal" visibility="open" />
<ToggleCards state="standard" mode="disabled" visibility="hidden" />
```
Props: `state: standard|pressed`, `mode: normal|disabled`, `visibility: open|hidden`

### Nav
```tsx
import { Nav } from "./react/Nav/Nav";
```

### Card
```tsx
import { Card } from "./react/Card/Card";
```

### FormField / Form
```tsx
import { FormField } from "./react/Form/Form";
```

### Icon
```tsx
import { Icon } from "./react/Icon/Icon";
```

---

## Tokens de diseño

Siempre usar `var(--ds-*)`. El archivo está en `react/design-system.css`.

### Colores
```css
--ds-color-green-100: #add010    /* Primary CTA */
--ds-color-green-200: #88a024    /* Primary pressed */
--ds-color-red-100:   #c96c6c    /* Danger */
--ds-color-gray-500:  #5d636c    /* Text secondary */
--ds-color-gray-200:  #d9d9d9    /* Disabled bg */
--ds-color-gray-100:  #ebebeb    /* Borders */
--ds-color-black:     #000000    /* Primary text, secondary btn bg */
--ds-color-white:     #ffffff    /* Backgrounds, secondary btn text */
--ds-color-surface:   #f3f3f3    /* Page background */
--ds-color-yellow:    #f0c802    /* Accent / badge */
```

### Spacing
```css
--ds-space-1: 4px   --ds-space-2: 8px   --ds-space-3: 12px
--ds-space-4: 16px  --ds-space-5: 20px  --ds-space-6: 24px
```

### Border Radius
```css
--ds-radius-sm: 4px   --ds-radius-md: 8px
--ds-radius-lg: 16px  --ds-radius-xl: 32px  /* botones, pills */
```

### Sombras
```css
--ds-shadow-01:      0 4px 8px rgba(170,175,182,.25)            /* cards, inputs */
--ds-shadow-03-big:  0 2px 4px rgba(0,0,0,.16), 0 0 6px ...    /* botones */
```

### Tipografía
```css
--ds-font-family: "Roboto", "Segoe UI", sans-serif
--ds-font-size-body-sm: 12px    --ds-font-weight-regular:  400
--ds-font-size-body-md: 16px    --ds-font-weight-semibold: 600
--ds-font-size-heading: 32px
```

---

## Animaciones con motion/react

```ts
// springs.ts — importar desde aquí, nunca inline
export const springs = {
  snappy:     { type: "spring", stiffness: 400, damping: 30 }, // respuesta rápida
  completing: { type: "spring", stiffness: 300, damping: 28 }, // check, confirmar
  deleting:   { type: "spring", stiffness: 500, damping: 25 }, // warning, remover
  expanding:  { type: "spring", stiffness: 200, damping: 26 }, // card expand
  settling:   { type: "spring", stiffness: 150, damping: 28 }, // retorno al reposo
} as const;
```

```tsx
import { motion } from "motion/react";
import { springs } from "./springs";

// Transición de entrada
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={springs.expanding}
/>

// Slide-to-confirm
<motion.div
  drag="x"
  dragConstraints={{ left: 0, right: maxDrag }}
  dragElastic={0.1}
  onDragEnd={(_, info) => {
    if (info.offset.x / maxDrag > 0.72) onConfirm();
    else controls.start({ x: 0, transition: springs.snappy });
  }}
/>
```

---

## Optimistic UI con TanStack Query

```ts
const mutation = useMutation({
  mutationFn: confirmPackage,
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['packages'] });
    const prev = queryClient.getQueryData(['packages']);
    queryClient.setQueryData(['packages'], (old) =>
      old.map(p => p.id === id ? { ...p, isConfirmed: true } : p)
    );
    return { prev };
  },
  onError: (_, __, ctx) => queryClient.setQueryData(['packages'], ctx?.prev),
});
```

---

## Haptics

```ts
export const haptic = {
  complete: () => navigator.vibrate([10, 30, 10]),
  select:   () => navigator.vibrate(5),
  drag:     () => navigator.vibrate(8),
  delete:   () => navigator.vibrate([15, 10, 15]),
};
```
> Solo funciona en Android Chrome. iOS Safari no expone Vibration API.

---

## Reglas

1. **Nunca hardcodear colores** — siempre `var(--ds-color-*)`.
2. **Nunca crear un componente nuevo** si ya existe en `react/`. Reutilizar.
3. **Nunca usar Tailwind** — CSS custom properties únicamente.
4. **Springs semánticos** — el nombre debe describir la interacción, no la velocidad.
5. **Optimistic UI primero** — UI responde inmediato, el servidor confirma después.
6. **Botones con radius-xl** (32px). Cards con radius-lg (16px).
7. **Font Roboto semibold (600)** para labels de botones y títulos.
