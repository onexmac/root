# Flotante.md — Catálogo de Componentes

> Referencia canónica: qué hace cada componente, sus props exactas, cuándo usarlo y cuándo NO.
> Stack: React 19 + TypeScript · CSS `var(--ds-*)` · `motion/react` · Vite · Storybook 10
> **Regla de oro:** nunca valores hardcodeados. Solo tokens `--ds-*`. Sin Tailwind.

---

## Índice

1. [Button](#1-button)
2. [Icon](#2-icon)
3. [FormField](#3-formfield)
4. [CheckBox](#4-checkbox)
5. [Card / SummaryCard](#5-card--summarycard)
6. [TabsMenu](#6-tabsmenu)
7. [SearchBar](#7-searchbar)
8. [SelectionDropdown](#8-selectiondropdown)
9. [QuantitySelector](#9-quantityselector)
10. [SlideButton](#10-slidebutton)
11. [SlideToConfirm](#11-slidetoconfirm)
12. [SlideArm](#12-slidearm)
13. [Sheet](#13-sheet)
14. [ToggleCards](#14-togglecards)
15. [NavigationControls](#15-navigationcontrols)
16. [FilterOptions](#16-filteroptions)
17. [ToggleMenu](#17-togglemenu)
18. [AdelanteMark](#18-adelantemark)

---

## 1. Button

**Archivo:** `react/buttons/Button.tsx`

Botón principal del sistema. Cubre todos los CTAs de la app.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto del botón |
| `color` | `"green" \| "red" \| "white" \| "black" \| "gray"` | `"green"` | Color / intención semántica |
| `layout` | `"label" \| "icon-left" \| "icon-right" \| "icon"` | `"label"` | Disposición del contenido |
| `icon` | `IconName` | — | Ícono (requiere `layout` con icon) |
| `state` | `"standard" \| "pressed" \| "disabled"` | `"standard"` | Estado de interacción |
| `size` | `"md" \| "sm"` | `"md"` | `md`=56px · `sm`=44px |
| `fullWidth` | `boolean` | `false` | Ocupa el 100% del contenedor |
| `onClick` | `() => void` | — | Handler |

### Detalles visuales

- **`md`**: altura 56 px · `border-radius: var(--ds-radius-lg)` (16 px)
- **`sm`**: altura 44 px · `border-radius: var(--ds-radius-xl)` (32 px) · sombra ligera
- **`layout="icon"`**: círculo exacto — 56×56 en `md`, 44×44 en `sm`
- **Pressed halo**: anillo outward 8 px del mismo tono (`green-200`, `red-100`, `rgba(0,0,0,0.8)`, `#F3F3F3`, `gray-100`)
- **`gray`**: semánticamente "deshabilitado visual" — halo de 2 px (no 8)

### ✅ Usar para

- Acciones primarias de pantalla (`green`)
- Acciones destructivas (`red`)
- Acciones secundarias sobre fondo oscuro (`white`)
- CTAs neutros / de navegación (`black`)
- Botones deshabilitados (`gray` o `state="disabled"`)

### ❌ No usar para

- Navegación de tabs → usar `TabsMenu`
- Confirmar deslizando → usar `SlideButton` o `SlideArm`
- Chips de filtro → usar `SelectionDropdown`
- Botones de cierre compactos dentro de cards → usar `ToggleCards`

---

## 2. Icon

**Archivo:** `react/iconos/Icon.tsx`

Catálogo de íconos del sistema. 34 íconos, todos `viewBox 0 0 24 24`, fill por CSS.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `IconName` | — | Nombre del ícono (ver catálogo) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño del SVG |
| `color` | `string` | `"currentColor"` | Color fill — **usar CSS prop, no atributo SVG** |
| `className` | `string` | — | Clase extra |

### Catálogo completo de nombres

`home` · `user` · `folder` · `open` · `arrow-right` · `back` · `search` · `go` · `check` · `list` · `boleta` · `traslado` · `entrega` · `sin-stock` · `completado` · `incompleto` · `pendiente` · `sin-autorizar` · `filter` · `close` · `edit` · `info` · `plus` · `minus` · `delete` · `place` · `alert` · `remove` · `calculator` · `cuadrillas` · `rol` · `menu` · `options` · `good`

### Aliases disponibles

| Alias | Resuelve a |
|-------|-----------|
| `arrow` / `forward` | `arrow-right` |
| `chevron-left` | `back` |
| `chevron-right` | `arrow-right` |
| `chevron-down` | `close` |
| `chevron-up` / `chevrons-up-down` | `open` |
| `warning` | `alert` |
| `lens` / `leans` | `search` |
| `check` | `good` |

### ⚠️ Íconos que se confunden frecuentemente

| Ícono | Forma real | Confusión común |
|-------|-----------|-----------------|
| `good` | Checkmark simple (sin círculo) | `completado` tiene círculo exterior |
| `minus` | Barra horizontal (sin círculo) | `remove` tiene círculo exterior |
| `delete` | X real | `close` es chevron-down, NO una X |
| `info` | Círculo con i | Usar para helpers/ayuda |

### ⚠️ SVG fill y variables CSS

```tsx
// ❌ MAL — el atributo HTML no resuelve var()
<Icon name="good" color="var(--ds-color-white)" />

// ✅ BIEN — sobreescribir via CSS property
.mi-clase svg { fill: var(--ds-color-white); }
```

### ✅ Usar para

- Decoración semántica dentro de otros componentes
- Indicadores de estado (completado, incompleto, pendiente, sin-stock)
- Íconos de navegación

### ❌ No usar para

- El logo/marca de la app → usar `AdelanteMark`
- Íconos animados complejos → usar directamente SVG con `motion`

---

## 3. FormField

**Archivo:** `react/forms/Form.tsx`

Campo de texto del sistema con label, input y helper.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"Nombre"` | Label superior |
| `placeholder` | `string` | `"Escribir aquí"` | Placeholder del input |
| `type` | `"text" \| "email" \| "password" \| "number" \| "tel"` | `"text"` | Tipo HTML del input |
| `state` | `FormFieldState` | `"standard"` | Estado visual |
| `helperText` | `string` | — | Texto de ayuda/advertencia |
| `value` | `string` | — | Valor controlado |
| `onChange` | `ChangeEventHandler` | — | Handler de cambio |
| `onClear` | `() => void` | — | Handler del botón X (solo en `state="x"`) |

### Estados (`FormFieldState`)

| Estado | Visual | Cuándo |
|--------|--------|--------|
| `standard` | Borde gris fino | Reposo |
| `active` | Borde negro 2 px | Foco / typing |
| `x` | Borde verde 2 px + botón delete | Tiene contenido clearable |
| `ayuda` | Borde gris + helper gris + ícono `info` | Instrucción al usuario |
| `advertencia` | Borde rojo 2 px + helper rojo + ícono `incompleto` | Validación fallida |
| `disabled` | Fondo gray-100, sin borde | Campo bloqueado |

### Dimensiones (Figma)

- Width: 370 px · Input height: 59 px · `border-radius: var(--ds-radius-xl)` (32 px)

### ✅ Usar para

- Inputs de formulario: nombre, cantidad, búsqueda textual, contraseñas
- Cualquier campo que requiera feedback de validación

### ❌ No usar para

- Buscar en listas → usar `SearchBar`
- Seleccionar entre opciones fijas → usar `SelectionDropdown`
- Cantidades con +/- → usar `QuantitySelector`

---

## 4. CheckBox

**Archivo:** `react/forms/Form.tsx`

Selector binario con estados de intención.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"Opción"` | Texto de la opción |
| `state` | `"standard" \| "add" \| "remove" \| "disabled"` | `"standard"` | Estado semántico |
| `checked` | `boolean` | `false` | Valor actual |
| `onChange` | `(checked: boolean) => void` | — | Handler |

### Semántica de estados

| Estado | Visual | Ícono | Cuándo |
|--------|--------|-------|--------|
| `standard` | Borde gris, sin relleno | — | Sin seleccionar |
| `add` | Círculo negro + checkmark blanco | `good` | Marcar para agregar |
| `remove` | Círculo negro + minus blanco | `minus` | Marcar para quitar |
| `disabled` | Atenuado, no interactivo | — | Bloqueado |

### ✅ Usar para

- Listas de selección múltiple
- Confirmaciones booleanas (acepto términos, incluir en pedido)
- Acciones contextuales de agregar/quitar items

### ❌ No usar para

- Selección exclusiva (una sola opción) → usar radio o `TabsMenu`
- Activar/desactivar features → usar un toggle dedicado
- Filtros → usar `SelectionDropdown`

---

## 5. Card / SummaryCard

**Archivo:** `react/cards/Card.tsx`

Tarjeta resumen de una orden/boleta con estado de completitud.

### Props de `SummaryCard`

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `company` | `string` | `"NOVARUM"` | Nombre de empresa |
| `code` | `string` | `"C.01"` | Código de obra/centro |
| `orderNumber` | `string` | `"BS000095"` | Número de orden |
| `timestamp` | `string` | `"Ayer 10:25 am"` | Tiempo legible |
| `statusState` | `QuantitySelectorState` | `"completo"` | Estado visual del ícono |
| `visibility` | `"open" \| "close"` | `"open"` | Expandida o colapsada |
| `onClick` | `() => void` | — | Handler de tap |

### ✅ Usar para

- Lista de boletas/pedidos en pantallas de control
- Resúmenes de órdenes con estado visual claro

### ❌ No usar para

- Contenido genérico sin estructura de orden → usar contenedores propios
- Cards de perfil de usuario → estructura diferente

---

## 6. TabsMenu

**Archivo:** `react/TabsMenu/TabsMenu.tsx`

Pill negro de navegación/acción. El elemento de menú principal del sistema.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"Tab"` | Texto del tab |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `layout` | `"label" \| "label+icon"` | `"label"` | Con o sin ícono |
| `icon` | `IconName` | `"home"` | Ícono (solo con `layout="label+icon"`) |
| `onClick` | `() => void` | — | Handler |

### Dimensiones (Figma)

- Min 300×80 · `border-radius: 32px` · padding H 40 px · padding V 24 px
- Fondo: `--ds-color-black` · texto: `--ds-color-white`
- Pressed: halo 8 px `rgba(0,0,0,0.8)` outward

### ✅ Usar para

- Tabs de navegación principal
- Opciones dentro de `SelectionDropdown`
- Acciones secundarias con peso visual alto

### ❌ No usar para

- Botones de acción primaria (colores semánticos) → usar `Button`
- Filtros con estado de selección → usar `SelectionDropdown`
- Acciones inline pequeñas → usar `Button size="sm"`

---

## 7. SearchBar

**Archivo:** `react/SearchBar/SearchBar.tsx`

Barra de búsqueda con múltiples modos de presentación.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `layout` | `"label" \| "normal" \| "icon" \| "expanded"` | `"label"` | Modo de presentación |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `placeholder` | `string` | `"Buscar"` | Placeholder del input |
| `value` | `string` | — | Valor controlado |
| `onChange` | `ChangeEventHandler` | — | Handler de cambio |
| `onClick` | `() => void` | — | Handler (solo `layout="icon"`) |
| `onClose` | `() => void` | — | Muestra botón X de cierre |
| `rightSlot` | `ReactNode` | — | Override del slot derecho |
| `suggestions` | `SearchSuggestion[]` | — | Solo `layout="expanded"` |
| `onPick` | `(s: SearchSuggestion) => void` | — | Selección de sugerencia |

### Layouts

| Layout | Visual | Cuándo |
|--------|--------|--------|
| `icon` | Botón circular 65 px con lupa | Barra colapsada / compacta |
| `normal` | Pill sin texto (input vacío) | Barra activa sin valor |
| `label` | Pill con texto + opcional X | Estado estándar con valor |
| `expanded` | Pill + panel de sugerencias | Búsqueda interactiva con autocomplete |

### ✅ Usar para

- Búsqueda en listas de órdenes, usuarios, materiales
- Filtrado en tiempo real con sugerencias

### ❌ No usar para

- Input de datos del formulario → usar `FormField`
- Selección entre opciones fijas y conocidas → usar `SelectionDropdown`

---

## 8. SelectionDropdown

**Archivo:** `react/SelectionDropdown/SelectionDropdown.tsx`

Selector desplegable de opciones con header colapsable.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"Label"` | Texto del header |
| `items` | `SelectionDropdownItem[]` | `[]` | Lista de opciones |
| `isOpen` | `boolean` | — | Control externo (opcional) |
| `onToggle` | `() => void` | — | Callback de toggle |
| `className` | `string` | — | Clase extra |

```ts
interface SelectionDropdownItem {
  label: string;
  onClick?: () => void;
}
```

### Visual

- Cerrado: 70 px blanco, `border-radius: 32px`, `shadow-01`, label gris + `ToggleCards small`
- Abierto: header + lista de pills negros 80 px cada uno, separados por gap (no padding interno)

### ✅ Usar para

- Filtros categóricos: tipo de material, estado, área
- Selección de una opción de una lista corta y conocida

### ❌ No usar para

- Búsqueda con texto libre → usar `SearchBar`
- Listas largas o dinámicas → usar pantalla de selección dedicada
- Selección múltiple → usar `CheckBox`

---

## 9. QuantitySelector

**Archivo:** `react/QuantitySelector/QuantitySelector.tsx`

Pill circular con anillo de estado. Indicador visual de progreso de materiales.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | — | Número dentro del círculo |
| `state` | `QuantitySelectorState` | `"pendiente"` | Estado del anillo |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | `sm`=49 px · `md`=64 px · `lg`=96 px |
| `mode` | `"standard" \| "pressed"` | `"standard"` | Añade halo en pressed |
| `onTap` | `() => void` | — | Si se pasa, es interactivo |
| `ariaLabel` | `string` | — | Aria label custom |

### Estados (`QuantitySelectorState`)

| Estado | Anillo | Semántica |
|--------|--------|-----------|
| `pendiente` | Sin anillo (gris) | No registrado aún |
| `incompleto` | Amarillo (mitad derecha) | Faltan materiales |
| `completo` | Verde completo | Todos los materiales ok |
| `sin-stock` | Rojo completo | Sin stock disponible |

**Aliases backward-compat:** `default → incompleto` · `ok → completo` · `alert → sin-stock`

### Estructura visual (3 capas)

```
__outer  → disco gray-200 (base)
__ring   → borde colorido por estado (overlay)
__inner  → círculo negro con el número
```

### ✅ Usar para

- Indicadores de cantidad de materiales en boletas y órdenes
- Visualización de estado de completitud en listas
- Elemento interactivo para cambiar estado de cantidad

### ❌ No usar para

- Progreso de procesos genéricos → usar otro indicador
- Selección numérica con +/- → este componente solo muestra, no edita por sí solo

---

## 10. SlideButton

**Archivo:** `react/SlideButton/SlideButton.tsx`

Deslizador de confirmación. Knob fijo con track negro y label centrado.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"Pedir"` | Texto del track |
| `confirmedLabel` | `string` | `"Confirmado"` | Texto post-confirmación |
| `threshold` | `number` | `0.72` | Fracción del recorrido para confirmar (0-1) |
| `onConfirm` | `() => void` | — | **Requerido.** Callback al confirmar |
| `disabled` | `boolean` | `false` | Bloquea el gesto |
| `disabledLabel` | `string` | — | Texto alternativo cuando disabled |
| `confirmedHoldMs` | `number` | `1800` | ms antes del auto-reset |
| `autoReset` | `boolean` | `true` | Reset automático post-confirmación |

### Dimensiones (Figma nodo 997-3096)

- Ancho total: 282 px · Alto: 80 px · Knob: 80×80 squircle

### Comportamiento

- **Drag ≥ threshold**: confirma, muestra estado de éxito, auto-reset
- **Drag < threshold**: snap-back vía `springs.snappy`
- **Tap (sin drag)**: nudge 32 px a la derecha + bounce back (hint pedagógico)

### ✅ Usar para

- Confirmación de acciones irreversibles de peso medio (pedir, enviar)
- Pantallas donde el tap accidental es el riesgo principal

### ❌ No usar para

- Acciones reversibles simples → usar `Button`
- Confirmación dentro de un Sheet o panel emergente → usar `SlideArm`
- Acciones que ya tienen un diálogo de confirmación → redundante

---

## 11. SlideToConfirm

**Archivo:** `react/SlideToConfirm/SlideToConfirm.tsx`

Deslizador con knob que crece al deslizar. Port de `SlideToConfirm.swift`.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"PEDIR"` | Label dentro del knob |
| `onConfirm` | `() => void` | — | **Requerido.** Callback al confirmar |
| `knobWidth` | `number` | `160` | Ancho en reposo del knob (px) |
| `threshold` | `number` | `0.72` | Fracción para confirmar (0-1) |
| `height` | `number` | `80` | Alto del componente (px) |
| `cornerRadius` | `number` | `24` | Radio de esquina (px) |
| `successHoldMs` | `number` | `800` | ms antes de auto-reset |
| `enabled` | `boolean` | `true` | Cuando `false`, ignora input (usado por `SlideArm`) |

### Diferencia con `SlideButton`

| | `SlideButton` | `SlideToConfirm` |
|--|---|---|
| Knob | Posición fija, pequeño | Crece con el drag |
| Track | Negro ancho con label centrado | El knob ES el track |
| Uso standalone | ✅ Sí | ⚠️ Generalmente dentro de `SlideArm` |
| Tap nudge | +32 px | +52 px |

### ✅ Usar para

- Dentro de `SlideArm` (uso principal)
- Confirmaciones de alta consecuencia donde el knob expansivo da feedback visual claro

### ❌ No usar para

- Uso directo en pantalla sin `SlideArm` wrapper → usar `SlideButton` en su lugar
- Confirmaciones simples → usar `Button`

---

## 12. SlideArm

**Archivo:** `react/SlideArm/SlideArm.tsx`

Píldora compacta que se expande en un `SlideToConfirm` completo. Port de `PedirBar.swift`.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"PEDIR"` | Texto de la píldora colapsada |
| `collapsedWidth` | `number` | `160` | Ancho colapsado (px) |
| `height` | `number` | `80` | Alto (px) |
| `cornerRadius` | `number` | `24` | Radio de esquina (px) |
| `onConfirm` | `() => void` | — | **Requerido.** Callback al confirmar |
| `successHoldMs` | `number` | `800` | ms antes del auto-reset |

### Estados

```
Collapsed  →  Tap  →  Armed (SlideToConfirm full-width + X cancel)
  Armed    →  Drag completo  →  Confirmed (fires onConfirm, disarms)
  Armed    →  X cancel       →  Collapsed
```

### ✅ Usar para

- CTA de pedido/confirmación dentro de un `Sheet` o panel flotante
- Cuando el espacio es limitado y el botón necesita "armarse" antes de confirmar
- Flujo de pedir materiales (patrón PedirBar de iOS)

### ❌ No usar para

- Acciones que no requieren double-confirmation → usar `Button`
- Pantallas con espacio suficiente para un `SlideButton` standalone
- Si el ancestro tiene `overflow: hidden` → los halos y la X se recortarán

---

## 13. Sheet

**Archivo:** `react/Sheet/Sheet.tsx`

Superficie FAB → bottom-sheet con morph animado. 3 estados: cerrado, abierto, fullscreen.

### Props de `Sheet`

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Requerido.** Estado de apertura |
| `onOpen` | `() => void` | — | **Requerido.** Callback para abrir |
| `onDismiss` | `() => void` | — | **Requerido.** Callback para cerrar |
| `fab` | `SheetFab` | — | Config del FAB cerrado |
| `children` | `ReactNode` | — | `Sheet.Header`, `Sheet.Body`, `Sheet.Footer` |

```ts
interface SheetFab {
  color: ButtonColor;   // color del FAB
  icon: IconName;       // ícono del FAB
  ariaLabel: string;    // accesibilidad
}
```

### Slots de contenido

```tsx
<Sheet ...>
  <Sheet.Header>...</Sheet.Header>   {/* Título / descripción */}
  <Sheet.Body>...</Sheet.Body>       {/* Contenido scrolleable */}
  <Sheet.Footer>...</Sheet.Footer>   {/* Sticky bottom — acciones */}
</Sheet>
```

### Comportamiento

- **FAB cerrado**: 84×80 px, `border-radius: 24 px`, posición `fixed` bottom-right
- **Morph al abrir**: ancho crece primero → alto 180 ms después
- **Drag-to-dismiss**: offset.y > 120 px OR velocity.y > 600 → cierra
- **Scroll-to-fullscreen**: scroll 12 px → fullscreen; scroll 2 px de vuelta → vuelve a open
- **Scrim**: cierra al tap
- **Desktop**: centrado, max-width 402 px
- **Cascade entrance**: `staggerChildren: 0.06, delayChildren: 0.38`

### ⚠️ Sharp edges

- Si el ancestro tiene `overflow: hidden`, el FAB fijo no se ve
- El estado de apertura lo controla el padre — Sheet no tiene estado propio

### ✅ Usar para

- Formularios de creación de recursos (nuevo usuario, nuevo material)
- Paneles de acción contextuales que no justifican una pantalla completa
- Cualquier flujo que empiece desde un FAB

### ❌ No usar para

- Diálogos de confirmación simples (sí/no) → usar un modal dedicado
- Contenido que siempre debe estar visible → usar pantalla normal
- Múltiples sheets simultáneos

---

## 14. ToggleCards

**Archivo:** `react/ToggleCards/ToggleCards.tsx`

Squircle negro con chevron que gira 540° al cambiar estado. Usado como control de expansión.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `visibility` | `"open" \| "close"` | `"open"` | Estado actual |
| `size` | `"big" \| "small"` | `"big"` | `big`=60×88 · `small`=60×50 |
| `mode` | `"normal" \| "disabled"` | `"normal"` | Disabled atenúa |
| `onClick` | `() => void` | — | Handler |
| `ariaLabel` | `string` | — | Accesibilidad |

### Animación

- Cada tap acumula +540° (1.5 vueltas) — nunca revierte dirección
- El ícono cambia a la mitad del giro (270 ms de 540 ms totales)
- `open` → ícono `open` (chevrons verticales) · `close` → ícono `close` (chevron-down)

### ✅ Usar para

- Control de expansión de `SelectionDropdown`
- Chevron en `SummaryCard`
- Cualquier toggle de visibilidad de sección

### ❌ No usar para

- Acciones con texto → usar `Button` o `TabsMenu`
- Toggles booleanos de configuración → semánticamente incorrecto
- Standalone sin contexto de expansión

---

## 15. NavigationControls

**Archivo:** `react/nav/Nav.tsx`

Botón de navegación atrás/adelante. Pill blanco 65×59.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `navigation` | `"back" \| "go"` | `"back"` | Dirección |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `onClick` | `() => void` | — | Handler |

### ✅ Usar para

- Navegación lineal en flujos paso-a-paso
- Complemento visual del back nativo de la app

### ❌ No usar para

- Cancelar acciones → usar `Button color="black"` con label "Cancelar"
- Cerrar panels/sheets → usar el drag-to-dismiss o el drag-handle del `Sheet`

---

## 16. FilterOptions

**Archivo:** `react/nav/Nav.tsx`

Botón de apertura/cierre del panel de filtros. Pill 65×59.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `mode` | `"normal" \| "close"` | `"normal"` | `normal`=blanco+filter · `close`=negro+chevron-down |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `onClick` | `() => void` | — | Handler |

### ✅ Usar para

- Toggle del panel de filtros en listas
- Siempre en par con `SelectionDropdown` o un panel de filtros

### ❌ No usar para

- Acciones que no sean filtrar → usar `Button`

---

## 17. ToggleMenu

**Archivo:** `react/nav/Nav.tsx`

Botón de apertura/cierre del menú lateral. Pill 65×59.

### Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `mode` | `"open" \| "close"` | `"open"` | Estado del menú |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `onClick` | `() => void` | — | Handler |

### ✅ Usar para

- Control del menú lateral / drawer
- Siempre en la navbar superior, a la izquierda

### ❌ No usar para

- Cerrar sheets o modales → usar sus controles propios

---

## 18. AdelanteMark

**Archivo:** `react/AdelanteMark/AdelanteMark.tsx`

El logo SVG canónico de Adelante. `fill="currentColor"` — se recolorea por CSS.

### Props

Acepta todas las props de `SVGProps<SVGSVGElement>`: `width`, `height`, `className`, `style`, etc.

### Modos de apariencia

| Modo | `color` del padre | `background` |
|------|------------------|--------------|
| Light (default) | `var(--ds-color-green-100)` | blanco |
| Dark | `var(--ds-color-black)` | `var(--ds-color-green-100)` |
| Tinted | `#111` | `#F3F3F3` |

```tsx
{/* Light */}
<div style={{ color: "var(--ds-color-green-100)" }}>
  <AdelanteMark width={163} height={71} />
</div>

{/* Dark */}
<div style={{ background: "var(--ds-color-green-100)", color: "var(--ds-color-black)" }}>
  <AdelanteMark width={163} height={71} />
</div>
```

### ✅ Usar para

- Splash screen / onboarding
- Navbar / header de la app
- Emails y documentos de marca

### ❌ No usar para

- Íconos de acciones → usar `Icon`
- Recolorar con `fill` como atributo inline → usar `color:` CSS en el padre

---

## Reglas globales

1. **Sin Tailwind.** Todo estilo via `var(--ds-*)` en CSS.
2. **Sin valores hardcodeados.** Si no hay token, pedir al usuario.
3. **`fill` en SVG como atributo NO resuelve `var()`.** Siempre usar CSS property para colores dinámicos en SVGs.
4. **`springs` disponibles:** `snappy` · `completing` · `deleting` · `expanding` · `settling` · `popping`. No existe `shrinking` — usar `settling`.
5. **Haptics:** `haptic.select()` en taps · `haptic.drag()` en snap-backs · `haptic.complete()` en confirmaciones.
6. **ControlDeUsuarios screen** existe en `react/screens/ControlDeUsuarios/` — pantalla de referencia para el patrón de gestión de usuarios con `Sheet` + `SlideArm`.
