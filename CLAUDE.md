# CLAUDE.md — Adelante Design System

> Este archivo es leído automáticamente por Claude Code al abrir esta carpeta.

## Archivos de Figma

| Archivo | Key | URL |
|---|---|---|
| **Losa Flotante** (design system) | `oRDLRL9OUNcTQ0k6G5MBPS` | https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante |
| **Prototype Screens** (pantallas de app) | _(agregar key cuando esté disponible)_ | — |

---

## Flujos de trabajo

### Flujo 1 — Actualizar un componente del Design System

Cuando el usuario diga: *"actualiza el Button según Figma"* o comparta un nodo de Losa Flotante:

1. **Leer el nodo en Figma** usando el MCP:
   - Herramienta: `get_figma_data`
   - fileKey: `oRDLRL9OUNcTQ0k6G5MBPS`
   - nodeId: el que aparezca en la URL (`?node-id=XXX-XXX`)

2. **Identificar qué cambió** (colores, tipografía, tamaños, variantes)

3. **Actualizar el componente** en `react/<Componente>/<Componente>.tsx`
   - Usar tokens de `react/design-system.css` — nunca valores hardcodeados
   - Actualizar también `<Componente>.stories.tsx` si cambian variantes

4. **Hacer commit y push** — el Storybook se despliega automáticamente en GitHub Pages

---

### Flujo 2 — Generar una pantalla desde Prototype Screens

Cuando el usuario comparta una URL de pantalla de Figma:

1. **Leer la pantalla** usando el MCP:
   - Herramienta: `get_figma_data` con el fileKey y nodeId de la pantalla

2. **Mapear elementos visuales a componentes existentes**:

| Elemento en Figma | Componente React |
|---|---|
| Botón / `setButtons` | `import { Button } from "../Button/Button"` |
| Barra de búsqueda / `searchField` | `import { SearchBar } from "../SearchBar/SearchBar"` |
| Tabs / navegación | `import { TabsMenu } from "../TabsMenu/TabsMenu"` |
| Toggle colapsable | `import { ToggleCards } from "../ToggleCards/ToggleCards"` |
| Nav bar | `import { Nav } from "../Nav/Nav"` |
| Tarjeta de resumen | `import { Card } from "../Card/Card"` |
| Campo de formulario | `import { FormField } from "../Form/Form"` |
| Ícono | `import { Icon } from "../Icon/Icon"` |

3. **Crear la pantalla** en `react/screens/<NombrePantalla>/<NombrePantalla>.tsx`
   - Reutilizar componentes existentes — no reinventar
   - Layout con CSS (flexbox/grid) usando tokens `var(--ds-*)`
   - Animaciones con `motion/react` cuando aplique

4. **Agregar story** en `react/screens/<NombrePantalla>/<NombrePantalla>.stories.tsx`

5. **Commit y push** → deploy automático

---

## Links del proyecto

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
| Testing | Vitest |
| Docs | Storybook 10 (React Vite) |
| Deploy | GitHub Pages — auto en push a `main` |
| Figma sync | MCP de Figma (`mcp.figma.com`) |

> **Regla:** No usar Tailwind. Todo con `var(--ds-*)` tokens.

---

## Componentes disponibles

### Button
```tsx
import { Button } from "../Button/Button";

<Button label="Confirmar" color="green" state="standard" />
<Button label="Cancelar" color="black" state="standard" />
<Button label="Eliminar" color="red" state="standard" />
<Button label="Desactivado" color="gray" state="disabled" />
<Button label="Buscar" color="green" layout="icon-left" icon="search" />
```
Props: `color: green|red|white|black|gray`, `layout: label|icon-left|icon-right|icon`, `state: standard|pressed|disabled`

### SearchBar
```tsx
import { SearchBar } from "../SearchBar/SearchBar";

<SearchBar layout="label" state="standard" />
<SearchBar layout="icon" state="standard" />
```

### TabsMenu
```tsx
import { TabsMenu } from "../TabsMenu/TabsMenu";

<TabsMenu label="Boleta" layout="label+icon" state="standard" />
<TabsMenu label="Opciones" layout="label" state="pressed" />
```

### Card
```tsx
import { Card } from "../Card/Card";
```

### Nav
```tsx
import { Nav } from "../Nav/Nav";
```

### FormField
```tsx
import { FormField } from "../Form/Form";
```

### Icon
```tsx
import { Icon } from "../Icon/Icon";
// Íconos disponibles: search, back, forward, close, menu, check, alert, plus, minus, edit, delete, home, user, settings, arrow-up, arrow-down
```

### ToggleCards
```tsx
import { ToggleCards } from "../ToggleCards/ToggleCards";

<ToggleCards state="standard" mode="normal" visibility="open" />
```

---

## Tokens de diseño (`react/design-system.css`)

### Colores
```css
--ds-color-green-100: #add010    /* CTA principal */
--ds-color-green-200: #88a024    /* CTA pressed */
--ds-color-red-100:   #c96c6c    /* Danger */
--ds-color-red-200:   #bb4a4a    /* Danger pressed */
--ds-color-gray-500:  #5d636c    /* Texto secundario */
--ds-color-gray-400:  #747b86    /* Placeholder */
--ds-color-gray-300:  #aaafb6    /* Bordes suaves */
--ds-color-gray-200:  #d9d9d9    /* Bordes */
--ds-color-gray-100:  #ebebeb    /* Fondo hover */
--ds-color-black:     #000000    /* Texto principal */
--ds-color-white:     #ffffff    /* Fondo claro */
--ds-color-surface:   #f3f3f3    /* Fondo de página */
--ds-color-yellow:    #f0c802    /* Advertencia */
```

### Spacing
```css
--ds-space-1: 4px   --ds-space-2: 8px   --ds-space-3: 12px
--ds-space-4: 16px  --ds-space-5: 20px  --ds-space-6: 24px
```

### Border Radius
```css
--ds-radius-sm: 4px    /* inputs pequeños */
--ds-radius-md: 8px    /* cards, inputs */
--ds-radius-lg: 16px   /* modales, cards grandes */
--ds-radius-xl: 32px   /* botones, pills */
```

### Sombras
```css
--ds-shadow-01:      0 4px 8px rgba(170,175,182,.25)   /* cards, tablas */
--ds-shadow-02-soft: 0 6px 0 rgba(0,0,0,.16)           /* botones */
--ds-shadow-03-big:  0 2px 4px rgba(0,0,0,.16), 0 0 6px rgba(0,0,0,.16)
```

### Tipografía
```css
--ds-font-family:          "Roboto", "Segoe UI", sans-serif
--ds-font-size-body-sm:    12px   --ds-font-weight-regular:  400
--ds-font-size-body-md:    16px   --ds-font-weight-semibold: 600
--ds-font-size-subtitle:   20px
--ds-font-size-heading:    32px
```

---

## Animaciones con motion/react

```tsx
import { motion } from "motion/react";

// Entrada suave
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", stiffness: 300, damping: 28 }}
/>
```

---

## Reglas

1. **Nunca hardcodear colores** — siempre `var(--ds-color-*)`.
2. **Nunca crear componente nuevo** si ya existe en `react/`. Reutilizar.
3. **Nunca usar Tailwind** — CSS custom properties únicamente.
4. **Siempre agregar story** cuando se crea o actualiza un componente.
5. **Commit y push** para que el Storybook se actualice en vivo.
