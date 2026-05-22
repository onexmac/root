# DESIGN.md — Adelante Design System

This file defines the design system specifications for AI agents (GitHub Copilot, Cursor, Claude Code, etc.) to generate UI code consistent with our design language.

---

## Overview

- **Design file:** [Losa Flotante on Figma](https://www.figma.com/design/oRDLRL9OUNcTQ0k6G5MBPS/Losa-Flotante)
- **Storybook:** [https://davidpcad.github.io/adelante-design-system/](https://davidpcad.github.io/adelante-design-system/)
- **Framework:** React 19 + TypeScript
- **Styling:** CSS custom properties (no Tailwind)
- **Component path:** `react/<ComponentName>/<ComponentName>.tsx`
- **CSS tokens file:** `react/design-system.css`

---

## Design Tokens

### Colors

| Token | Value | Usage |
|---|---|---|
| `--ds-color-green-100` | `#add010` | Primary brand / CTA background |
| `--ds-color-green-200` | `#88a024` | Primary pressed state |
| `--ds-color-red-100` | `#c96c6c` | Danger / error |
| `--ds-color-red-200` | `#bb4a4a` | Danger pressed state |
| `--ds-color-gray-500` | `#5d636c` | Text secondary |
| `--ds-color-gray-400` | `#747b86` | Text disabled |
| `--ds-color-gray-300` | `#aaafb6` | Placeholder |
| `--ds-color-gray-200` | `#d9d9d9` | Disabled background |
| `--ds-color-gray-100` | `#ebebeb` | Borders / dividers |
| `--ds-color-black` | `#000000` | Primary text / secondary button bg |
| `--ds-color-white` | `#ffffff` | Surface / secondary button text |
| `--ds-color-surface` | `#f3f3f3` | Page background |
| `--ds-color-yellow` | `#f0c802` | Accent / badge |

### Typography

- **Font family:** `"Roboto", "Segoe UI", sans-serif`
- **Font weights:** 400 (regular), 600 (semibold)

| Token | Value | Usage |
|---|---|---|
| `--ds-font-size-body-sm` | `12px` | Labels, captions |
| `--ds-font-size-body-md` | `16px` | Body text |
| `--ds-font-size-subtitle` | `20px` | Subtitles |
| `--ds-font-size-heading` | `32px` | Page headings |
| `--ds-line-height-body-sm` | `16px` | |
| `--ds-line-height-body-md` | `24px` | |
| `--ds-letter-spacing-default` | `0` | |
| `--ds-letter-spacing-wide` | `0.4px` | Button labels |

### Spacing

| Token | Value |
|---|---|
| `--ds-space-1` | `4px` |
| `--ds-space-2` | `8px` |
| `--ds-space-3` | `12px` |
| `--ds-space-4` | `16px` |
| `--ds-space-5` | `20px` |
| `--ds-space-6` | `24px` |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--ds-radius-sm` | `4px` | Small elements |
| `--ds-radius-md` | `8px` | Cards, inputs |
| `--ds-radius-lg` | `16px` | Panels, toggle cards |
| `--ds-radius-xl` | `32px` | Buttons, tabs, pills |

### Shadows

| Token | Value | Usage |
|---|---|---|
| `--ds-shadow-01` | `0 4px 8px rgba(170,175,182,.25)` | Cards, search bar |
| `--ds-shadow-02-soft` | `0 0 6px rgba(0,0,0,.16)` | Floating elements |
| `--ds-shadow-03-big` | `0 2px 4px rgba(0,0,0,.16), 0 0 6px rgba(0,0,0,.16)` | Buttons, heavy elevation |

---

## Component Catalog

### Button

**File:** `react/Button/Button.tsx`  
**Figma node:** `434-2434`

```tsx
import { Button } from "@/react/Button/Button";

<Button label="Guardar" variant="primary" state="standard" />
<Button label="Cancelar" variant="secondary" state="standard" />
<Button label="No disponible" variant="disabled" state="disabled" />
```

| Prop | Type | Default | Values |
|---|---|---|---|
| `label` | `string` | — | Any string |
| `variant` | `string` | `"primary"` | `primary` \| `secondary` \| `disabled` |
| `state` | `string` | `"standard"` | `standard` \| `pressed` \| `disabled` |
| `onClick` | `() => void` | — | |

**Design notes:**
- Primary: green-100 background, black text, radius-xl
- Secondary: black background, white text, radius-xl
- Disabled: gray-200 background, gray-400 text
- Pressed: translateY(1px) + inset shadow

---

### SearchBar

**File:** `react/SearchBar/SearchBar.tsx`  
**Figma node:** `1014-3556`

```tsx
import { SearchBar } from "@/react/SearchBar/SearchBar";

<SearchBar layout="label" state="standard" />
<SearchBar layout="icon" state="standard" />
<SearchBar layout="normal" state="standard" />
```

| Prop | Type | Default | Values |
|---|---|---|---|
| `layout` | `string` | `"label"` | `label` \| `normal` \| `icon` |
| `state` | `string` | `"standard"` | `standard` \| `pressed` |

---

### TabsMenu

**File:** `react/TabsMenu/TabsMenu.tsx`  
**Figma node:** `1014-3648`

```tsx
import { TabsMenu } from "@/react/TabsMenu/TabsMenu";

<TabsMenu label="Boleta" layout="label+icon" state="standard" />
<TabsMenu label="Opciones" layout="label" state="pressed" />
```

| Prop | Type | Default | Values |
|---|---|---|---|
| `label` | `string` | — | Any string |
| `layout` | `string` | `"label+icon"` | `label` \| `label+icon` |
| `state` | `string` | `"standard"` | `standard` \| `pressed` |

---

### ToggleCards

**File:** `react/ToggleCards/ToggleCards.tsx`  
**Figma node:** `1023-3745`

```tsx
import { ToggleCards } from "@/react/ToggleCards/ToggleCards";

<ToggleCards state="standard" mode="normal" visibility="open" />
<ToggleCards state="standard" mode="disabled" visibility="open" />
```

| Prop | Type | Default | Values |
|---|---|---|---|
| `state` | `string` | `"standard"` | `standard` \| `pressed` |
| `mode` | `string` | `"normal"` | `normal` \| `disabled` |
| `visibility` | `string` | `"open"` | `open` \| `hidden` |

---

### Nav

**File:** `react/Nav/Nav.tsx`  
**Figma node:** `1023-3659`

---

### Card

**File:** `react/Card/Card.tsx`  
**Figma node:** `1027-3998`

---

### Form / FormField

**File:** `react/Form/Form.tsx`  
**Figma node:** `763-2791`

---

### Icon

**File:** `react/Icon/Icon.tsx`  
**Figma node:** `639-2191`

---

## Coding Guidelines

1. **Always import CSS tokens** — components must use `var(--ds-*)` tokens, never hardcoded hex values.
2. **No Tailwind** — this project uses plain CSS with custom properties.
3. **TypeScript** — all components must be typed. Props interfaces go in the same file as the component.
4. **Radius** — buttons and pill-shaped elements use `--ds-radius-xl` (32px). Cards use `--ds-radius-lg` (16px).
5. **Shadows** — interactive elements (buttons, cards) use `--ds-shadow-03-big`. Input fields use `--ds-shadow-01`.
6. **Disabled states** — always use `--ds-color-gray-200` background and `--ds-color-gray-400` text. Set `disabled` attribute on the native element.
7. **Pressed states** — add `translateY(1px)` transform and inset shadow.
8. **Font** — always use `var(--ds-font-family)`. Semibold (600) for labels and buttons.
