# LosaFlotante.md — Design System Live Code

> Figma → MCP → Live Code (componentes del sistema de diseño)

**Figma file:** `oRDLRL9OUNcTQ0k6G5MBPS`
**Storybook live:** https://davidpcad.github.io/adelante-design-system/
**GitHub:** https://github.com/DavidpcAD/adelante-design-system

---

## Flujo — Actualizar o crear un componente

Cuando el usuario comparta un nodo de Losa Flotante o diga *"actualiza/crea el [Componente] según Figma"*:

### 1. Leer el nodo en Figma
```
tool: get_figma_data
fileKey: oRDLRL9OUNcTQ0k6G5MBPS
nodeId: el que aparezca en la URL (?node-id=XXX-XXX)
```

### 2. Identificar qué existe en Live Code
Revisar si el componente ya existe en `react/<Componente>/<Componente>.tsx`.

**Si el valor o componente NO existe en Live Code → preguntar al usuario:**
> "El componente/valor `[nombre]` no existe en el sistema. ¿Qué hacemos?
> 1. **Crear** — lo implemento nuevo siguiendo los tokens de Figma
> 2. **Usar uno existente** — dime cuál y lo mapeo
> 3. **Modificar uno existente** — dime cuál y le agrego lo que falta"

Esperar respuesta antes de continuar.

### 3. Implementar el cambio
- Archivo: `react/<Componente>/<Componente>.tsx`
- Usar **solo** tokens de `react/design-system.css` — nunca valores hardcodeados
- Seguir las props y variantes exactas que muestra Figma

### 4. Actualizar la story
- Archivo: `react/<Componente>/<Componente>.stories.tsx`
- Agregar una story por cada variante nueva o modificada
- Mantener las stories existentes intactas

### 5. Commit y push
```bash
git add react/<Componente>/
git commit -m "feat(<Componente>): [descripción del cambio según Figma]"
git push origin main
```
El Storybook se despliega automáticamente en GitHub Pages.

---

## Instrucciones detalladas por componente

### Button (`react/Button/Button.tsx`)
- Colores: `green` · `red` · `white` · `black` · `gray`
- Layouts: `label` · `icon-left` · `icon-right` · `icon` (solo ícono, 56×56)
- States: `standard` · `pressed` · `disabled`
- Sizes: `md` (default 56px) · `sm` (44px, sombra ligera, `sm + icon` = círculo 44px)
- **Pressed visual:** anillo outward 8px del mismo color de tono (green-200 sobre green-100, red-100 sobre red-200, etc.) usando `box-shadow: 0 0 0 8px <tono>, var(--ds-shadow-03-big)`.
- Token de radio: `--ds-radius-lg` (md) y `--ds-radius-xl` (sm).

### SearchBar (`react/SearchBar/SearchBar.tsx`)
- Layouts: `label` (con campo de búsqueda) · `icon` (solo lupa, circular)
- States: `standard` · `active` (borde negro 2px) · `disabled` (bg gray-100)
- El ícono es `search` (lupa) — viewBox 24×24, fill.

### TabsMenu (`react/TabsMenu/TabsMenu.tsx`)
- Pill negra 300×80, radius 32, padding 24px vertical / 40px horizontal.
- Layouts: `label+icon` · `label`
- States: `standard` · `pressed` (anillo black 80% 8px)
- Disabled: bg gray-100, color gray-400.

### FormField (`react/Form/Form.tsx`)
- States: `standard` · `active` (borde negro 2px) · `x` (borde verde 2px, botón clear) · `ayuda` (helper gris + ícono `info`) · `advertencia` (borde rojo 2px, helper rojo + ícono `info` rojo) · `disabled` (bg gray-100, sin borde)
- Width: 370px · Input height: 59px · Radius: xl (32px)
- **Iconos importantes:**
  - WithClear (state=`x`): botón a la derecha del input usa `Icon name="delete"` (X real, NO `close` porque ese path es chevron-down).
  - Ayuda + Advertencia: ícono `info` (circular) acompaña al helper text inferior, color `gray-300` en ayuda y `red-200` en advertencia.
- Helper text: `display: inline-flex; gap: 4px;` para alinear ícono + texto.

### CheckBox (`react/Form/Form.tsx`)
- States: `add` (negro lleno, ícono `good` blanco) · `remove` (negro lleno, ícono `minus` blanco) · `standard` (borde negro 4px, bg blanco) · `disabled` (borde gray-200, bg gray-100)
- Box: 30×30, radius lg (16px), border-width 4px.
- **Ícono:** usa `good` para add y `minus` para remove (`size="sm"`, color blanco). NO usar `completado` porque incluye el círculo dibujado.

### Tag (`react/Form/Form.tsx`)
- States: `active` (bg negro, texto blanco, ícono `completado` blanco a la derecha) · `standard` (transparente, borde gray-200 2px, texto gray-300, sin ícono) · `disabled` (mismo standard pero opacity 0.55)
- Height 48px, min-width 80px, radius 40px, padding 0 20px.

### ProgressBar (`react/Form/Form.tsx`)
- Layout vertical: label (16px regular, color black) → track 14px → description (12px regular, gray-300, **alineada a la derecha**, `text-align: right; align-self: flex-end`).
- Track: white bg, radius 20px, shadow interno suave.
- Fill: black, radius 20px, transición `width 300ms ease`.
- Width: 368px · Gap interno: 8px.

### OptionLabel (`react/Form/Form.tsx`)
- States: `active` (borde 4px black, **interior `gray-500`** — un tono más claro que el borde para visibilidad) · `standard` (borde 4px gray-200, interior blanco) · `disabled` (borde gray-200, interior gray-100, texto gray-300)
- Dot: 30×30 círculo, border-width 4px.

### SummaryCard (`react/Card/Card.tsx`)
- Visibility: `open` (con ToggleCards big) · `close` (con ToggleCards small + flecha down)
- Layout: info-block izquierda (company + code + order + timestamp) · actions derecha (ícono status QuantitySelectorState + ToggleCards).
- Width: 362px, radius lg (16px), bg white, shadow 01.

### MaterialList (`react/Card/Card.tsx`)
- Layout: descripción a la izquierda (flex:1) · QuantitySelector a la derecha (sm = 49px).
- **QuantitySelector interactivo:** al tocarlo cicla el `qtyState`: `pendiente → incompleto → completo → sin-stock → pendiente`. Si se pasa `onStateChange`, es controlado; si no, mantiene estado interno con `useState`. También dispara `onQtyChange(qty)` si está definido.
- Width 353px, padding 8 20, radius lg, bg white.

### DetailCard (`react/Card/Card.tsx`)
- Composición: SummaryCard (open) + lista de MaterialList.
- Cada MaterialList responde a touch en su QuantitySelector independientemente.
- Width 353px, gap 12px, shadow 02-soft, padding 12 0.

### QuantitySelector (`react/QuantitySelector/QuantitySelector.tsx`)
- States: `pendiente` (gris, sin anillo) · `incompleto` (anillo amarillo mitad derecha, clip-path 50%) · `completo` (anillo verde completo) · `sin-stock` (anillo rojo completo).
- Modes: `standard` · `pressed` (el círculo interior crece 1px reduciendo inset).
- Sizes: `sm` 49px · `md` 64px · `lg` 96px.
- **Interacción:** cuando se pasa `onTap`, el componente es un `<button>` con animación press automática vía `:active` y haptic feedback. El consumidor (MaterialList) maneja el ciclo de estados.
- Estructura: 3 capas absolute — `__outer` (gray-200 disk) + `__ring` (border-color por variante) + `__inner` (black circle con el número).

### Nav — NavigationControls / FilterOptions / ToggleMenu (`react/Nav/Nav.tsx`)
- Pill 65×59, radius xl (32px), shadow 03-big.
- States: `standard` · `pressed` (**anillo 8px visible tanto vía prop `state="pressed"` como vía `:active` real al presionar**).
- NavigationControls: bg white · íconos `back` / `arrow-right`. Pressed: anillo `--ds-color-surface` (#F3F3F3).
- FilterOptions: bg white (mode normal) o black (mode close) · íconos `filter` / `close`. Pressed normal: anillo surface; pressed close: anillo black-100 (rgba 0,0,0,0.8).
- ToggleMenu: bg white (open) o black (close) · íconos `open` (chevron-up-down) / `close`. Pressed sigue la misma regla por mode.
- **Importante:** el CSS aplica el borde pressed también en `:not(:disabled):active` para que sea visible al hacer click real.

### Icon (`react/Icon/Icon.tsx`)
- viewBox `0 0 24 24`, fill, paths exportados directamente de Figma.
- Sizes: `sm` 16 · `md` 20 · `lg` 24.
- **OJO con los nombres** — algunos paths del catálogo son confusos:
  - `close`: dibuja un chevron-down con línea inferior — **NO es una X**. Para una X usar `delete`.
  - `check`: alias de `good` (✓ simple).
  - `completado`: círculo lleno con check (ícono de status, no plain check).
  - `info`: círculo con i (ⓘ) — usado para ayuda y advertencia.
  - `alert`: triángulo con ! (⚠) — disponible pero los forms usan `info` para consistencia con Figma.
- Aliases backward-compatible: `chevron-down → close`, `chevron-up → open`, `chevrons-up-down → open`, `forward → arrow-right`, `lens → search`, `warning → alert`.

### ToggleCards (`react/ToggleCards/ToggleCards.tsx`)
- Sizes: `big` (60×88) · `small` (60×50)
- Visibility: `open` (ícono `open` = chevrons-up-down) · `close` (ícono `close` = chevron-down)
- Mode: `normal` (bg black) · `disabled` (bg gray-200)
- Pressed: anillo black-100 8px.

### SelectionDropdown (`react/SelectionDropdown/SelectionDropdown.tsx`)
- Card blanca expansible, width 372px, radius xl, shadow 01.
- Header siempre visible: label gris (16px, gray-300) + ToggleCards small a la derecha.
- **Toggle visibility:** compressed (cerrado) muestra `close` (chevron-down); expanded (abierto) muestra `open` (chevrons-up-down) indicando que se puede colapsar.
- List inner: padding top 16px (`--ds-space-4`) + lados 12px (`--ds-space-3`), gap 16px entre pills.
- Cada item: pill negra 100% width, height 58px, radius xl, padding 0 40px, font semibold, color white.
- Animación: `motion.div` con height auto + opacity, `springs.expanding`.

### SlideButton (`react/SlideButton/SlideButton.tsx`)
- Slider con thumb arrastrable horizontal — completar acción.

### ScrollPicker (`react/ScrollPicker/`)
- Selector tipo iOS picker, drag vertical.

---

## Componentes existentes en Live Code

| Componente | Archivo | Variantes / Props clave |
|---|---|---|
| Button | `react/Button/Button.tsx` | color · layout · state · size |
| SearchBar | `react/SearchBar/SearchBar.tsx` | layout · state |
| TabsMenu | `react/TabsMenu/TabsMenu.tsx` | layout · state |
| FormField | `react/Form/Form.tsx` | state: standard\|active\|x\|ayuda\|advertencia\|disabled |
| CheckBox | `react/Form/Form.tsx` | state: add\|remove\|standard\|disabled |
| Tag | `react/Form/Form.tsx` | state: active\|standard\|disabled |
| ProgressBar | `react/Form/Form.tsx` | progress 0–100 · label · description |
| OptionLabel | `react/Form/Form.tsx` | state: active\|standard\|disabled |
| SummaryCard | `react/Card/Card.tsx` | visibility: open\|close |
| MaterialList | `react/Card/Card.tsx` | qtyState · qty · onStateChange (cicla) |
| DetailCard | `react/Card/Card.tsx` | compuesto SummaryCard + MaterialList[] |
| NavigationControls | `react/Nav/Nav.tsx` | state · navigation: back\|go |
| FilterOptions | `react/Nav/Nav.tsx` | state · mode: normal\|close |
| ToggleMenu | `react/Nav/Nav.tsx` | state · mode: open\|close |
| Icon | `react/Icon/Icon.tsx` | name · size · color |
| QuantitySelector | `react/QuantitySelector/` | state · mode · size · onTap |
| ToggleCards | `react/ToggleCards/ToggleCards.tsx` | size · visibility · mode |
| SelectionDropdown | `react/SelectionDropdown/` | label · items · isOpen · onToggle |
| SlideButton | `react/SlideButton/` | — |
| ScrollPicker | `react/ScrollPicker/` | — |

---

## Tokens de diseño (`react/design-system.css`)

### Colores
```css
--ds-color-green-100: #add010   --ds-color-green-200: #88a024
--ds-color-red-100:   #c96c6c   --ds-color-red-200:   #bb4a4a
--ds-color-gray-500:  #5d636c   --ds-color-gray-400:  #747b86
--ds-color-gray-300:  #aaafb6   --ds-color-gray-200:  #d9d9d9
--ds-color-gray-100:  #ebebeb   --ds-color-black:     #000000
--ds-color-black-100: rgba(0,0,0,.8)
--ds-color-white:     #ffffff   --ds-color-surface:   #f3f3f3
--ds-color-yellow:    #f0c802
```

### Spacing
```css
--ds-space-1: 4px   --ds-space-2: 8px   --ds-space-3: 12px
--ds-space-4: 16px  --ds-space-5: 20px  --ds-space-6: 24px
--ds-space-10: 40px
```

### Border Radius
```css
--ds-radius-sm: 4px   --ds-radius-md: 8px
--ds-radius-lg: 16px  --ds-radius-xl: 32px
```

### Sombras
```css
--ds-shadow-01:      0 4px 8px rgba(170,175,182,.25)
--ds-shadow-02-soft: 0 0 6px rgba(0,0,0,.16)
--ds-shadow-03-big:  0 2px 4px rgba(0,0,0,.16), 0 0 6px rgba(0,0,0,.16)
```

### Tipografía
```css
--ds-font-family:           "Roboto", "Segoe UI", sans-serif
--ds-font-size-body-sm:     12px / line-height 16px
--ds-font-size-label:       14px / line-height 20px
--ds-font-size-body-md:     16px / line-height 24px
--ds-font-size-subtitle:    20px / line-height 24px
--ds-font-size-subtitle-lg: 24px / line-height 24px
--ds-font-size-heading:     32px / line-height 40px
--ds-font-weight-regular:   400
--ds-font-weight-semibold:  600
--ds-letter-spacing-tight:  0.25px
--ds-letter-spacing-wide:   0.4px
```

---

## Reglas
1. Nunca hardcodear colores — siempre `var(--ds-color-*)`.
2. Nunca usar Tailwind — CSS custom properties únicamente.
3. Siempre agregar o actualizar la story del componente.
4. Commit y push para que el Storybook se actualice en vivo.
5. Validar que el ícono usado existe en `Icon.tsx` antes de referenciarlo — varios nombres son aliases y el path real puede no ser lo que sugiere el nombre (caso `close`).
6. Para estados `pressed` que deben verse al hacer click real (no solo vía prop), aplicar la regla CSS tanto a `.componente--pressed` como a `.componente:not(:disabled):active`.
