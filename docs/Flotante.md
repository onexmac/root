---
name: flotante
companion: Losa.md, Memory.md, HALOPRESS.md, ICON.md, SLIDE_TO_CONFIRM.md, SHEET_MORPH.md
parallel: INFRA.md (iOS/Swift equivalent of this file)
repo: github.com/DavidpcAD/adelante-design-system
purpose: The canonical component library and operational guide for Adelante web prototypes. Lives in the repo. Loaded on demand when Claude Code needs to render or modify a real component. Components must come from here — Figma is exploratory, not canonical. If a component isn't in this file, it doesn't exist yet; flag and stop.
---

# flotante.md — Adelante Web Component Library

**Figma is exploration, this file is truth.** When Claude Code needs to build a screen, components must come from here — not from Figma's invented stand-ins, not from improvisation. If a component isn't documented in this file, it doesn't exist yet: flag the gap and stop.

**Regla de oro:** nunca valores hardcodeados. Solo tokens `--ds-*` o los listados en §3. Sin Tailwind dentro de componentes DS.

---

## 0. Read order for component work

1. **§3 (Design tokens)** — colors, halo palette, typography, spacing, radii, shadows. Required for any visual decision.
2. **§4 (Haptic vocabulary)** and **§5 (Spring vocabulary)** — the named events and curves. Required for any interactive decision.
3. **§6 (Press contract)** — the 80/180/120/100 ms feedback model. Defer to HALOPRESS.md for the React implementation.
4. **§12 (DS component inventory)** — what already exists. Reach here before authoring anything custom.
5. **§13 (Vendoring workflow)** — how to bring DS components into a prototype repo.
6. **§14 (NOT-IN-DS pattern)** — what to do when nothing fits.
7. **Per-component specs** — HALOPRESS.md / ICON.md / SLIDE_TO_CONFIRM.md / SHEET_MORPH.md, loaded on demand.

---

## 1. Stack (fixed for every prototype)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** | App Router, Turbopack, `"use client"` per interactive route |
| Language | TypeScript (strict) | No `any` in committed code |
| Styling | **Tailwind CSS v4** | `@theme inline` in `app/globals.css` |
| Motion | **`motion`** (motion.dev) | Import from `motion/react`. Never inline springs. |
| Drag & drop | **`@dnd-kit/core`** + `@dnd-kit/sortable` + `@dnd-kit/modifiers` | See §9 |
| Icons | **`@phosphor-icons/react`** | `regular` / `bold` / `fill` weights. DS uses its own `Icon` registry (§12). |
| Class util | `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts` | |
| Haptics | Custom wrapper around `navigator.vibrate` | Silent on iOS Safari — see §4 |
| State | Local `useState` / `useReducer` only | No TanStack Query, no Zustand — this is a prototype |
| Local dev | `npm run dev` | Shareable preview is the DS Storybook on gh-pages, not Vercel |

---

## 2. Required peer files per prototype

```
lib/
├── springs.ts                   # §5 — must mirror react/springs.ts in the DS exactly
├── haptic.ts                    # §4 — must mirror react/haptic.ts in the DS exactly
└── utils.ts                     # cn() helper

components/ds/                   # §13 — vendored from adelante-design-system
├── Button/Button.tsx
├── Form/Form.tsx
├── Icon/Icon.tsx
├── SelectionDropdown/{SelectionDropdown.tsx, SelectionDropdown.css}
├── Sheet/{Sheet.tsx, Sheet.css}
├── SlideButton/{SlideButton.tsx, SlideButton.css}
├── SlideToConfirm/{SlideToConfirm.tsx, SlideToConfirm.css}
├── SlideArm/{SlideArm.tsx, SlideArm.css}
├── TabsMenu/TabsMenu.tsx
├── ToggleCards/{ToggleCards.tsx, ToggleCards.css}
├── AdelanteMark/AdelanteMark.tsx
└── design-system.css

components/ui/
└── pressable-button.tsx         # §6 — fallback press contract when no DS variant fits
```

If any of these is missing, vendor it from the DS (§13). The `lib/springs.ts` and `lib/haptic.ts` values **must match** `react/springs.ts` and `react/haptic.ts` in the DS exactly — they are the same vocabulary.

---

## 3. Design tokens — Losa Flotante

All values transcribed from the Figma `Losa Flotante / Core` page. Tokens take precedence over raw values; raw hex appears only for tones with no token equivalent.

### 3.1 Forced light mode

Every prototype route group must apply force-light inside its `layout.tsx`:

```tsx
// app/<prototype>/layout.tsx
<div
  className="losa-scope"
  style={{
    "--surface-bg": "243 243 243",
    "--surface-card": "255 255 255",
    "--surface-card-muted": "235 235 235",
    "--fg-primary": "17 17 17",
    "--fg-secondary": "115 115 115",
    "--color-background": "rgb(243, 243, 243)",
    "--color-card": "rgb(255, 255, 255)",
    "--color-card-muted": "rgb(235, 235, 235)",
    "--color-foreground": "rgb(17, 17, 17)",
    "--color-muted-foreground": "rgb(115, 115, 115)",
    color: "rgb(17, 17, 17)",
    background: "rgb(243, 243, 243)",
    minHeight: "100vh",
  }}
>
  {children}
</div>
```

**Both `--surface-*` and `--color-*` are required.** Tailwind v4's `@theme inline` generates utilities (e.g. `bg-card`) from `--color-*` at render time. Overriding only `--surface-*` does nothing.

When using DS components, prefer the `--ds-color-*` tokens emitted by `design-system.css` (see §13.4). The two sets coexist — `--color-*` for Tailwind utilities, `--ds-color-*` for inline references inside DS-styled regions.

### 3.2 Color palette

| Token | Hex | Use |
|---|---|---|
| `green-100` (brand) | `#ADD010` | FAB, "Crear usuario" CTA, slide-to-confirm track/knob |
| `green-200` | `#88A024` | Pressed-state halo on green surfaces (`halo.green`) |
| `gray-500` | `#5D636C` | Body secondary text |
| `gray-400` | `#747B86` | Drag-handle, disabled placeholders |
| `gray-300` | `#AAAFB6` | Hairlines, outlined-pill borders |
| `gray-200` | `#D9D9D9` | Dividers |
| `gray-100` | `#EBEBEB` | Muted card surface |
| `background` | `#F3F3F3` | Screen background |
| `white` | `#FFFFFF` | Card surface |
| `black` | `#000000` | Foreground primary, charcoal alternative |
| `charcoal` | `#1C1C1C` | Sidebar, burger button, table header |
| `red-100` | `#C96C6C` | Destructive (delete) |
| `red-200` | `#BB4A4A` | Destructive pressed |
| `yellow` | `#F0C802` | Warning |
| `black-100` | `#000000CC` | Scrim / modal overlay (80% black) |

### 3.3 Halo palette (press feedback)

| Token | RGB | Use |
|---|---|---|
| `halo.green` | `rgb(133, 166, 41)` | Brand-green surfaces (FAB, CTA) |
| `halo.black` | `rgb(140, 140, 140)` | Charcoal/black surfaces (burger, toggle) |
| `halo.white` | `rgb(209, 209, 209)` | White surfaces (close buttons, secondary CTAs) |

**Halo color must be a muted/darker shade of the button's own fill, not a contrasting color.** Green button → green halo, charcoal → gray halo. Never accent colors.

**`gray` Button**: semánticamente "deshabilitado visual" — halo de 2 px (no 8 px).

### 3.4 Typography (Roboto)

| Token | Spec |
|---|---|
| `body/regular 12px` | 12 / 16, tracking 0 |
| `body/semibold 12px` | 12 / 16, tracking 0.4 |
| `body/regular 16px` | 16 / 24, tracking 0 |
| `body/semibold 16px` | 16 / 24, tracking 0 |
| `subtitle/regular 20px` | 20 / 24, tracking 0.4 |
| `subtitle/semibold 20px` | 20 / 24, tracking 0.4 |
| `subtitle/regular 24px` | 24 / 24, tracking 0.4 |
| `subtitle/semibold 24px` | 24 / 24, tracking 0.4 |
| `heading/semibold 32px` | 32 / 40, tracking 0.4 |

Roboto loaded via `next/font/google` — never via the `@import url("https://fonts.googleapis.com/...")` in `design-system.css` (Turbopack rejects mid-file `@import`s). Strip that line when vendoring (§13.2).

### 3.5 Spacing (px)

`2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40` — and `24px` layout margin.

### 3.6 Radii (px)

`4, 8, 16, 32`. The "squircle" buttons use `24` (between 16 and 32) — that's intentional, matches the FAB.

DS token equivalents: `--ds-radius-sm` = 4 px · `--ds-radius-md` = 8 px · `--ds-radius-lg` = 16 px · `--ds-radius-xl` = 32 px.

### 3.7 Shadows

| Token | Value |
|---|---|
| `shadow-01` | `0 4px 8px rgba(170, 175, 182, 0.25)` |
| `shadow-02-soft` | `0 0 6px rgba(0, 0, 0, 0.16)` |
| `shadow-03-big` | `0 2px 4px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.16)` |

---

## 4. Haptic vocabulary

The SwiftUI prototype defines five events. On the web, these map to `navigator.vibrate()` patterns. **All are silent on iOS Safari** (no vibration API support) — they're correct for Android Chrome and PWA installs.

Wrap in `lib/haptic.ts`. Values must match the DS (`react/haptic.ts` in adelante-design-system).

```ts
// lib/haptic.ts
const vibrate = (pattern: number | number[]) => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
};

export const haptic = {
  complete: () => vibrate([10, 30, 10]),         // success / confirm
  select:   () => vibrate(5),                    // light tap — buttons, toggles
  drag:     () => vibrate(8),                    // drag start/threshold
  delete:   () => vibrate([15, 10, 15]),         // warning before destructive
  error:    () => vibrate([20, 40, 20, 40, 20]), // error notification
};
```

| Event | When |
|---|---|
| `select` | On `onPressStart` of any button — fires the instant the finger touches, not on release |
| `drag` | On drag start AND when crossing a snap threshold |
| `complete` | On slide-to-confirm success, form submit OK |
| `delete` | Before a destructive confirm appears |
| `error` | On validation failure |

---

## 5. Motion vocabulary (springs)

The DS catalog includes seven named springs. The five iOS-derived ones (`snappy`, `completing`, `deleting`, `expanding`, `settling`) plus two add-ons (`shrinking`, `popping`) needed for the FAB → sheet morph and the SlideArm cancel-X pop.

```ts
// lib/springs.ts
import type { Transition } from "motion/react";

export const springs = {
  snappy:     { type: "spring", stiffness: 400, damping: 30 },               // tap response
  completing: { type: "spring", stiffness: 300, damping: 28 },               // confirm, check
  deleting:   { type: "spring", stiffness: 500, damping: 25 },               // remove, warning
  expanding:  { type: "spring", stiffness: 170, damping: 30 },               // reveal, card grow
  settling:   { type: "spring", stiffness: 150, damping: 28 },               // return to rest
  shrinking:  { type: "spring", stiffness: 224, damping: 29, mass: 1 },      // close, disarm
  popping:    { type: "spring", stiffness: 385, damping: 22, mass: 1 },      // pop-in for ephemera
} as const satisfies Record<string, Transition>;
```

**No existe `shrinking` en el catálogo viejo** — era un gap. Usar `settling` en código legado hasta migrar.

### 5.1 Spring usage cheat sheet

| Interaction | Spring |
|---|---|
| Button press release / dialog dismiss | `snappy` |
| Checkbox check, "✓ saved" confirmation | `completing` |
| Row delete, dismissing destructive sheet | `deleting` |
| Card expand, FAB → sheet morph, dropdown open | `expanding` |
| Sheet released mid-drag, scroll snap-back | `settling` |
| Sheet close, collapse to FAB, drawer close, SlideArm disarm | `shrinking` |
| Pill enter, tag insert, "Activo" badge appear, cancel X pop | `popping` |

**Rule:** open with `expanding`, close with `shrinking` (or `settling` if user-driven). Symmetric springs across the same interaction read as one motion.

If you add a spring, add it here AND in `react/springs.ts` of the DS (PR alongside the prototype publish).

---

## 6. Press contract (high-level)

Every tap target uses one of these. The 80/180/120 ms timing is **part of the brand**; mirrors `PressableSquircleStyle` in `P2/Components/PressableSquircleStyle.swift` to the millisecond.

**Preferred:** the DS `Button` (`components/ds/Button/Button.tsx`) with `color` (green/red/white/black/gray) + `layout` (label / icon-left / icon-right / icon) + `size` (md / sm). Implements the halo + `haptic.select()` on touchdown.

**Fallback:** `components/ui/pressable-button.tsx` (local `PressableButton`) — same timing contract, used when the DS variant doesn't match (arbitrary geometry, custom shape).

### 6.1 The four numbers — non-negotiable

| Phase | Duration |
|---|---|
| Halo opacity 0 → 1 | **80 ms** |
| Halo persists after release | **120 ms** |
| Halo opacity 1 → 0 | **180 ms** |
| `onClick` fires after release | **100 ms** |

**Full breakdown:** see **HALOPRESS.md** — React implementation, container caveats, haptic placement, `cornerRadius` matching. HALOPRESS.md is the source-of-truth for the press component; this section is the index.

### 6.2 Container caveats

- **Don't put `overflow: hidden` on a halo ancestor.** The halo lives 8 px outside the button. Fix: remove `overflow-hidden`, or wrap with `<PressableSlot>` (adds `4 px` padding + negative margin so the halo breathes without affecting layout).
- **`cornerRadius` prop must match the visible shape.** Mismatch makes the halo curve not match the button curve.
- **Don't nest a `<button>` inside `PressableButton`.** Nested buttons are an a11y bug. Compose with `<span>`/`<div>` children only.
- **`touch-action: manipulation`** kills the 300 ms tap delay on mobile Safari. Built into PressableButton; don't remove it.
- **Haptic on `onPressStart`, not `onClick`.** Must fire on touchdown, not after the 100 ms delay.

---

## 7. Animation patterns

### 7.1 Card expand / collapse — `grid-template-rows` trick

Used wherever a row reveals inline detail (e.g. `WorkerCard`, `UserCard`). Motion's animated `height: auto` jitters; CSS grid interpolating `0fr → 1fr` is browser-native and buttery.

```tsx
<div
  style={{
    display: "grid",
    gridTemplateRows: isExpanded ? "1fr" : "0fr",
    transition: "grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1)",
  }}
>
  <div style={{ overflow: "hidden", minHeight: 0 }}>
    <motion.div
      initial={false}
      animate={{ opacity: isExpanded ? 1 : 0 }}
      transition={{
        duration: isExpanded ? 0.32 : 0.18,
        ease: "easeOut",
        delay: isExpanded ? 0.12 : 0,   // reveal AFTER the grow
      }}
    >
      {/* expanded content */}
    </motion.div>
  </div>
</div>
```

Cascade rows inside the expanded content use `staggerChildren: 0.06, delayChildren: 0.18`.

### 7.2 Crossfade WITHOUT `layoutId`

`layoutId` morphs bounding boxes — great for same-shape, different-position pairs. Useless (and glitchy) when the two elements have different shapes/sizes.

```tsx
<AnimatePresence initial={false} mode="popLayout">
  {expanded ? (
    <motion.div
      key="activo"
      initial={{ opacity: 0, scale: 0.85, x: 8 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.85, x: 8 }}
      transition={springs.popping}
    >
      <Tag variant="active">Activo</Tag>
    </motion.div>
  ) : (
    <motion.span
      key="name"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={springs.expanding}
    >
      {shortName}
    </motion.span>
  )}
</AnimatePresence>
```

**Rule of thumb:** same shape, different position → `layoutId`. Different shapes → `<AnimatePresence mode="popLayout">` + crossfade.

### 7.3 FAB → bottom sheet morph (two-phase)

Single `motion.div` with a variants object. Width grows first (horizontal pill), then height (sheet rises). Same physics on all phases via `springs.expanding`.

```tsx
const sheetVariants = {
  closed: {
    width: 84, height: 80, right: 16, bottom: 24,
    backgroundColor: "#ADD010", borderRadius: 24,
    transition: {
      width:        { delay: 0.18, ...springs.shrinking },
      right:        { delay: 0.18, ...springs.shrinking },
      height:       { ...springs.shrinking },
      bottom:       { ...springs.shrinking },
      borderRadius: { ...springs.shrinking },
      backgroundColor: { duration: 0.28 },
    },
  },
  open: {
    width: "100%", height: "75vh", right: 0, bottom: 0,
    backgroundColor: "#FFFFFF", borderRadius: 24,
    transition: {
      width:        { ...springs.expanding },                  // phase 1
      right:        { ...springs.expanding },
      height:       { delay: 0.18, ...springs.expanding },     // phase 2
      bottom:       { delay: 0.18, ...springs.expanding },
      borderRadius: { delay: 0.28, ...springs.expanding },
      backgroundColor: { duration: 0.28, delay: 0.10 },
    },
  },
  fullScreen: {
    width: "100%", height: "100vh", right: 0, bottom: 0,
    backgroundColor: "#FFFFFF", borderRadius: 0,
    transition: springs.expanding,
  },
} as const;
```

The cascade child:

```tsx
<motion.div
  variants={{ open: { transition: { staggerChildren: 0.06, delayChildren: 0.38 } } }}
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={springs.expanding}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Sheet footer rule:** action CTAs must live **outside** the scrollable body — pinned as a `shrink-0` footer at the bottom of the sheet `motion.div`. Otherwise long forms scroll the CTA off-screen.

**Full Sheet spec** — see **SHEET_MORPH.md** for the 3-state machine + orthogonal `isFullScreen`, 2-phase asymmetric morph, stacked color crossfade, drag-to-dismiss on header only, scroll-to-fullscreen one-way threshold, cascade bottom-up.

### 7.4 Scroll-to-fullscreen

Use a **native** scroll listener — `onScroll` is unreliable when motion is on the same element.

```tsx
useEffect(() => {
  const el = bodyRef.current;
  if (!el || !open) return;
  const onScroll = () => {
    const top = el.scrollTop;
    setFullScreen((prev) => {
      if (!prev && top > 12) return true;
      if (prev && top <= 2)  return false;
      return prev;
    });
  };
  el.addEventListener("scroll", onScroll, { passive: true });
  return () => el.removeEventListener("scroll", onScroll);
}, [open]);
```

Hysteresis thresholds (`12` to enter, `2` to exit) prevent flapping at the boundary.

### 7.5 Drag-to-dismiss sheet (motion-based)

For the sheet surface, use motion's drag — NOT dnd-kit (dnd-kit is for items inside the sheet).

```tsx
<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  dragElastic={{ top: 0, bottom: 0.5 }}
  onDragStart={() => haptic.drag()}
  onDragEnd={(_, info) => {
    const closeByDistance = info.offset.y > 120;
    const closeByVelocity = info.velocity.y > 600;
    if (closeByDistance || closeByVelocity) {
      onDismiss();
    }
  }}
  animate={fullScreen ? "fullScreen" : "open"}
  variants={sheetVariants}
>
  {/* sheet content */}
</motion.div>
```

Thresholds: `offset.y > 120 px` → dismiss (distance) · `velocity.y > 600 px/s` → dismiss (flick) · otherwise → spring back via `settling`.

### 7.6 State machine — three-state morph

```tsx
const [open, setOpen] = useState(false);
const [fullScreen, setFullScreen] = useState(false);
const animateTo = !open ? "closed" : fullScreen ? "fullScreen" : "open";

<motion.div initial="closed" animate={animateTo} variants={sheetVariants} />
```

Don't keep three separate booleans. Derive `animateTo` from `open` + `fullScreen`.

---

## 8. Layout conventions

### 8.1 Mobile viewport

```tsx
<main
  data-prototype
  className="mx-auto max-w-[402px]"
>
  {/* screen content */}
</main>
```

- `max-w-[402px]` — Figma frame width; centers on desktop testing
- `data-prototype` attribute — picks up `user-select: none`, `touch-action: manipulation`, `overscroll-behavior-y: contain` from `globals.css` so the prototype feels native
- **Never** `overflow-hidden` on the root — halos extend past edges

### 8.2 Bottom action bar

Fixed to the bottom, never inside the scrolling area:

```tsx
<div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[402px] px-4 pb-6 pt-3">
  <BottomActionBar />
</div>
```

The scrolling card list above it needs `pb-[160px]` (or similar) so the last card isn't behind the bar.

---

## 9. Drag & drop with `@dnd-kit`

dnd-kit is for **items inside a screen** (sortable cards, kanban columns, file reorder). For dragging the **sheet surface itself**, use motion's drag (§7.5). They don't compete — different concerns.

### 9.1 Setup

```bash
npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers @dnd-kit/utilities
```

```tsx
const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 5 },
  }),
);

<DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragStart={() => haptic.drag()}
  onDragEnd={(event) => { haptic.select(); handleReorder(event); }}
  onDragCancel={() => haptic.select()}
>
  {/* sortable region */}
</DndContext>
```

**Activation constraints are non-negotiable:** pointer `distance: 5` coexists with PressableButton's 100 ms delay; touch `delay: 200` lets taps through.

### 9.2 Sortable list

```tsx
function SortableRow({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      animate={{ scale: isDragging ? 1.03 : 1 }}
      transition={springs.snappy}
      {...attributes}
      {...listeners}
      className="touch-none"
    >
      {children}
    </motion.div>
  );
}
```

`touch-none` (CSS `touch-action: none`) is required on the draggable item.

### 9.3 Drag overlay

```tsx
<DragOverlay>
  {activeId ? (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1.05 }}
      transition={springs.snappy}
      style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.18)" }}
    >
      <Card data={activeItem} />
    </motion.div>
  ) : null}
</DragOverlay>
```

### 9.4 Modifiers

```tsx
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

<DndContext modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
```

### 9.5 Haptic checkpoints

`haptic.drag()` on lift · `haptic.select()` on snap boundary and drop · `haptic.error()` on cancel outside valid zone. Be conservative — lift + drop is the minimum.

---

## 10. Accessibility (WCAG 2.2 AA)

Non-negotiable. Every prototype must pass these:

- **Focus-visible** preserved on every `PressableButton` / DS `Button`. Don't override with `outline: none`.
- **Keyboard nav:** Tab order matches visual order. Add `KeyboardSensor` alongside `PointerSensor`/`TouchSensor` when keyboard reorder is needed.
- **`aria-label`** on every icon-only button (FAB, burger, close, chevron).
- **`aria-expanded`** on cards/sheets that toggle a region.
- **`prefers-reduced-motion`:** gate the bouncy springs (`popping`, `expanding`) — fall back to `{ duration: 0.2, ease: "easeOut" }`:

```ts
// lib/use-spring.ts
import { useReducedMotion } from "motion/react";

export function useSpring(name: keyof typeof springs) {
  const reduce = useReducedMotion();
  return reduce ? { duration: 0.2, ease: "easeOut" } : springs[name];
}
```

- **Contrast:** foreground (`#111`) on background (`#F3F3F3`) → ratio ≈ 14.5:1 ✓. Muted foreground (`#5D636C`) on white → 6.4:1 ✓. Don't introduce one-off tones that haven't been checked.

---

## 11. State + mock data patterns

### 11.1 State patterns

- **Card expanded state:** `useState` per row unless multiple rows need coordination.
- **Sheet open + fullScreen:** two separate `useState`s, derived `animateTo` (§7.6).
- **Form data inside a sheet:** `useReducer` — easier to reset on close.
- **Sortable list order:** `useState<Item[]>`; mutate via `arrayMove(items, oldIndex, newIndex)`.
- **No global store.** If two screens need to share data, the prototype is too big — split it.

### 11.2 Mock data

Single source of truth per prototype, e.g. `components/<prototype>/mock-data.ts`. Type-first:

```ts
export type User = {
  id: string;
  shortName: string;
  fullName: string;
  area: string;
  status: "active" | "inactive";
  assignments: Array<{ id: string; role: string; obra: string }>;
};

export const mockUsers: User[] = [ /* … */ ];
```

Mirror what the eventual backend will return — but only the fields screens use. No persistence, no localStorage, no SwiftData / SQL.

---

## 12. DS component inventory

The [adelante-design-system](https://github.com/DavidpcAD/adelante-design-system) is the canonical source of UI primitives. **Reach for a DS component before writing any custom one.**

### 12.1 Button

**Archivo:** `react/Button/Button.tsx`

Botón principal del sistema. Cubre todos los CTAs de la app. Implementa el halo + `haptic.select()` en touchdown.

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

Detalles visuales: `md` altura 56 px · `border-radius: var(--ds-radius-lg)` (16 px) · `sm` altura 44 px · `border-radius: var(--ds-radius-xl)` (32 px) · sombra ligera · `layout="icon"` círculo exacto 56×56 (`md`) / 44×44 (`sm`) · Pressed halo 8 px outward del mismo tono (`green-200`, `red-100`, `rgba(0,0,0,0.8)`, `#F3F3F3`, `gray-100`) · `gray` halo 2 px (no 8).

Usar para acciones primarias (`green`), destructivas (`red`), secundarias sobre fondo oscuro (`white`), CTAs neutros (`black`), deshabilitados (`gray` o `state="disabled"`). No usar para: navegación de tabs → `TabsMenu` · confirmar deslizando → `SlideButton` o `SlideArm` · chips de filtro → `SelectionDropdown` · botones de cierre en cards → `ToggleCards`.

---

### 12.2 Icon

**Archivo:** `react/Icon/Icon.tsx`

Catálogo de íconos del sistema. 34 íconos, todos `viewBox 0 0 24 24`, fill por CSS.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `name` | `IconName` | — | Nombre del ícono |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño del SVG |
| `color` | `string` | `"currentColor"` | Color fill — **usar CSS prop, no atributo SVG** |
| `className` | `string` | — | Clase extra |

**Nombres disponibles:** `home` · `user` · `folder` · `open` · `arrow-right` · `back` · `search` · `go` · `check` · `list` · `boleta` · `traslado` · `entrega` · `sin-stock` · `completado` · `incompleto` · `pendiente` · `sin-autorizar` · `filter` · `close` · `edit` · `info` · `plus` · `minus` · `delete` · `place` · `alert` · `remove` · `calculator` · `cuadrillas` · `rol` · `menu` · `options` · `good`

**Aliases:** `arrow` / `forward` → `arrow-right` · `chevron-left` → `back` · `chevron-right` → `arrow-right` · `chevron-down` → `close` · `chevron-up` / `chevrons-up-down` → `open` · `warning` → `alert` · `lens` / `leans` → `search` · `check` → `good`

**Confusiones frecuentes:**
- `good` = checkmark simple (sin círculo) · `completado` tiene círculo exterior
- `minus` = barra horizontal (sin círculo) · `remove` tiene círculo exterior
- `delete` = X real · `close` es chevron-down, NO una X
- No existe glifo `x` standalone — `close` pinta un chevron-down. Rotar `plus` 45° si se necesita una X real (promotion candidate).

**SVG fill:** el atributo HTML no resuelve `var()`. Siempre sobreescribir via CSS property:
```tsx
// MAL
<Icon name="good" color="var(--ds-color-white)" />
// BIEN
.mi-clase svg { fill: var(--ds-color-white); }
```

No usar para el logo/marca → usar `AdelanteMark`. No usar para íconos que dupliquen los de Phosphor que ya están en el DS.

---

### 12.3 FormField

**Archivo:** `react/Form/Form.tsx`

Campo de texto con label, input y helper.

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

**Estados (`FormFieldState`):**

| Estado | Visual | Cuándo |
|--------|--------|--------|
| `standard` | Borde gris fino | Reposo |
| `active` | Borde negro 2 px | Foco / typing |
| `x` | Borde verde 2 px + botón delete | Tiene contenido clearable |
| `ayuda` | Borde gris + helper gris + ícono `info` | Instrucción al usuario |
| `advertencia` | Borde rojo 2 px + helper rojo + ícono `incompleto` | Validación fallida |
| `disabled` | Fondo gray-100, sin borde | Campo bloqueado |

Dimensiones: width 370 px · input height 59 px · `border-radius: var(--ds-radius-xl)` (32 px).

No usar para: buscar en listas → `SearchBar` · seleccionar opciones fijas → `SelectionDropdown` · cantidades con +/- → `QuantitySelector`.

---

### 12.4 CheckBox

**Archivo:** `react/Form/Form.tsx`

Selector binario con estados de intención.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"Opción"` | Texto de la opción |
| `state` | `"standard" \| "add" \| "remove" \| "disabled"` | `"standard"` | Estado semántico |
| `checked` | `boolean` | `false` | Valor actual |
| `onChange` | `(checked: boolean) => void` | — | Handler |

`standard` = borde gris sin relleno · `add` = círculo negro + checkmark blanco (`good`) · `remove` = círculo negro + minus blanco (`minus`) · `disabled` = atenuado, no interactivo.

No usar para selección exclusiva → radio o `TabsMenu` · activar/desactivar features → toggle dedicado · filtros → `SelectionDropdown`.

---

### 12.5 Card / SummaryCard

**Archivo:** `react/cards/Card.tsx`

Tarjeta resumen de una orden/boleta con estado de completitud.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `company` | `string` | `"NOVARUM"` | Nombre de empresa |
| `code` | `string` | `"C.01"` | Código de obra/centro |
| `orderNumber` | `string` | `"BS000095"` | Número de orden |
| `timestamp` | `string` | `"Ayer 10:25 am"` | Tiempo legible |
| `statusState` | `QuantitySelectorState` | `"completo"` | Estado visual del ícono |
| `visibility` | `"open" \| "close"` | `"open"` | Expandida o colapsada |
| `onClick` | `() => void` | — | Handler de tap |

Usar para listas de boletas/pedidos con estado visual claro. No usar para contenido genérico sin estructura de orden ni para cards de perfil de usuario.

---

### 12.6 TabsMenu + TabFilterChip

**Archivo:** `react/TabsMenu/TabsMenu.tsx`

`TabsMenu` es un pill negro de navegación/acción. `TabFilterChip` es el chip row de selección múltiple. **Ninguno es un segmented control outlined↔filled de dos tabs** — componer con dos `Button`s para eso.

| Prop (`TabsMenu`) | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"Tab"` | Texto del tab |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `layout` | `"label" \| "label+icon"` | `"label"` | Con o sin ícono |
| `icon` | `IconName` | `"home"` | Ícono (solo con `layout="label+icon"`) |
| `onClick` | `() => void` | — | Handler |

Dimensiones: min 300×80 · `border-radius: 32px` · padding H 40 px · V 24 px · fondo `--ds-color-black` · texto `--ds-color-white` · pressed halo 8 px `rgba(0,0,0,0.8)`.

No usar para botones de acción primaria → `Button` · filtros con estado → `SelectionDropdown` · acciones inline pequeñas → `Button size="sm"`.

---

### 12.7 SearchBar

**Archivo:** `react/SearchBar/SearchBar.tsx`

Barra de búsqueda con múltiples modos de presentación.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `layout` | `"label" \| "normal" \| "icon" \| "expanded"` | `"label"` | Modo de presentación |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `placeholder` | `string` | `"Buscar"` | Placeholder |
| `value` | `string` | — | Valor controlado |
| `onChange` | `ChangeEventHandler` | — | Handler de cambio |
| `onClick` | `() => void` | — | Handler (solo `layout="icon"`) |
| `onClose` | `() => void` | — | Muestra botón X de cierre |
| `rightSlot` | `ReactNode` | — | Override del slot derecho |
| `suggestions` | `SearchSuggestion[]` | — | Solo `layout="expanded"` |
| `onPick` | `(s: SearchSuggestion) => void` | — | Selección de sugerencia |

Layouts: `icon` = botón circular 65 px con lupa · `normal` = pill sin texto · `label` = pill con texto + X opcional · `expanded` = pill + panel de sugerencias.

No usar para: input de datos de formulario → `FormField` · selección entre opciones fijas → `SelectionDropdown`.

---

### 12.8 SelectionDropdown

**Archivo:** `react/SelectionDropdown/SelectionDropdown.tsx`

Selector desplegable de opciones con header colapsable. Width fijo 372 px.

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

Visual: cerrado = 70 px blanco `border-radius: 32px` `shadow-01` label gris + `ToggleCards small` · abierto = header + lista de pills negros 80 px, separados por gap.

No usar para: búsqueda con texto libre → `SearchBar` · listas largas o dinámicas → pantalla dedicada · selección múltiple → `CheckBox`.

---

### 12.9 QuantitySelector

**Archivo:** `react/QuantitySelector/QuantitySelector.tsx`

Pill circular con anillo de estado. Indicador visual de progreso de materiales.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number` | — | Número dentro del círculo |
| `state` | `QuantitySelectorState` | `"pendiente"` | Estado del anillo |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | `sm`=49 px · `md`=64 px · `lg`=96 px |
| `mode` | `"standard" \| "pressed"` | `"standard"` | Añade halo en pressed |
| `onTap` | `() => void` | — | Si se pasa, es interactivo |
| `ariaLabel` | `string` | — | Aria label custom |

**Estados:** `pendiente` = sin anillo (gris) · `incompleto` = anillo amarillo (mitad derecha) · `completo` = anillo verde completo · `sin-stock` = anillo rojo completo. Aliases backward-compat: `default → incompleto` · `ok → completo` · `alert → sin-stock`.

Estructura visual: `__outer` disco gray-200 (base) · `__ring` borde colorido por estado (overlay) · `__inner` círculo negro con el número.

---

### 12.10 SlideButton

**Archivo:** `react/SlideButton/SlideButton.tsx`

Deslizador de confirmación con knob fijo en track negro. Ancho fijo 282 px.

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

Dimensiones (Figma nodo 997-3096): ancho 282 px · alto 80 px · knob 80×80 squircle. Comportamiento: drag ≥ threshold → confirma + auto-reset · drag < threshold → snap-back vía `springs.snappy` · tap sin drag → nudge 32 px + bounce back (hint pedagógico).

`SlideButton` tiene el width seteado inline (282 px) y no puede sobreescribirse via CSS — centrarlo con `flex justify-center`.

No usar para: confirmación dentro de Sheet/panel → `SlideArm` · acciones reversibles simples → `Button` · acciones que ya tienen diálogo → redundante.

---

### 12.11 SlideToConfirm

**Archivo:** `react/SlideToConfirm/SlideToConfirm.tsx`

Deslizador donde el knob crece con el drag. Port de `SlideToConfirm.swift`. Width 100% del contenedor.

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

**Diferencia con `SlideButton`:** `SlideButton` tiene knob fijo pequeño + track negro con label centrado, uso standalone. `SlideToConfirm` tiene knob que crece = el knob ES el track, uso principal dentro de `SlideArm`. Tap nudge: `SlideButton` +32 px · `SlideToConfirm` +52 px.

Usar principalmente dentro de `SlideArm`. No usar standalone en pantalla → usar `SlideButton`. **Full spec: SLIDE_TO_CONFIRM.md**.

---

### 12.12 SlideArm

**Archivo:** `react/SlideArm/SlideArm.tsx`

Píldora compacta que se expande en un `SlideToConfirm` completo. Port de `PedirBar.swift`. Anchored trailing; la barra crece hacia la izquierda vía `springs.expanding`. Disarma vía `springs.shrinking` (sin overshoot).

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | `"PEDIR"` | Texto de la píldora colapsada |
| `collapsedWidth` | `number` | `160` | Ancho colapsado (px) |
| `height` | `number` | `80` | Alto (px) |
| `cornerRadius` | `number` | `24` | Radio de esquina (px) |
| `onConfirm` | `() => void` | — | **Requerido.** Callback al confirmar |
| `successHoldMs` | `number` | `800` | ms antes del auto-reset |

```
Collapsed  →  Tap  →  Armed (SlideToConfirm full-width + X cancel)
  Armed    →  Drag completo  →  Confirmed (fires onConfirm, disarms)
  Armed    →  X cancel       →  Collapsed
```

Usar para CTA de pedido/confirmación dentro de un `Sheet` · cuando el espacio es limitado y el botón necesita "armarse" antes de confirmar · flujo de pedir materiales (patrón PedirBar de iOS). No usar si el ancestro tiene `overflow: hidden` — los halos y la X se recortarán.

---

### 12.13 Sheet

**Archivo:** `react/Sheet/Sheet.tsx`

Superficie FAB → bottom-sheet con morph animado. 3 estados: cerrado, abierto, fullscreen.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Requerido.** Estado de apertura |
| `onOpen` | `() => void` | — | **Requerido.** Callback para abrir |
| `onDismiss` | `() => void` | — | **Requerido.** Callback para cerrar |
| `fab` | `SheetFab` | — | Config del FAB cerrado |
| `children` | `ReactNode` | — | `Sheet.Header`, `Sheet.Body`, `Sheet.Footer` |

```ts
interface SheetFab {
  color: ButtonColor;
  icon: IconName;
  ariaLabel: string;
}
```

Slots: `<Sheet.Header>` título/descripción · `<Sheet.Body>` contenido scrolleable · `<Sheet.Footer>` sticky bottom para acciones.

Comportamiento: FAB cerrado 84×80 px `border-radius: 24 px` `fixed` bottom-right · morph al abrir: ancho crece primero → alto 180 ms después · drag-to-dismiss: offset.y > 120 px OR velocity.y > 600 → cierra · scroll-to-fullscreen: scroll 12 px → fullscreen; scroll 2 px de vuelta → vuelve a open · scrim cierra al tap · desktop centrado max-width 402 px · cascade entrance `staggerChildren: 0.06, delayChildren: 0.38`.

Si el ancestro tiene `overflow: hidden`, el FAB fijo no se ve. El estado de apertura lo controla el padre — Sheet no tiene estado propio.

**Full spec: SHEET_MORPH.md**. No usar para diálogos sí/no → modal dedicado · múltiples sheets simultáneos.

---

### 12.14 ToggleCards

**Archivo:** `react/ToggleCards/ToggleCards.tsx`

Squircle negro con chevron que gira 540° al cambiar estado. Control de expansión.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `visibility` | `"open" \| "close"` | `"open"` | Estado actual |
| `size` | `"big" \| "small"` | `"big"` | `big`=60×88 · `small`=60×50 |
| `mode` | `"normal" \| "disabled"` | `"normal"` | Disabled atenúa |
| `onClick` | `() => void` | — | Handler |
| `ariaLabel` | `string` | — | Accesibilidad |

Animación: cada tap acumula +540° (1.5 vueltas) — nunca revierte dirección · ícono cambia a la mitad del giro (270 ms de 540 ms) · `open` → ícono `open` · `close` → ícono `close`.

Usar para control de expansión de `SelectionDropdown` · chevron en `SummaryCard` · cualquier toggle de visibilidad de sección. No usar para acciones con texto ni toggles booleanos de configuración.

---

### 12.15 NavigationControls

**Archivo:** `react/nav/Nav.tsx`

Botón de navegación atrás/adelante. Pill blanco 65×59.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `navigation` | `"back" \| "go"` | `"back"` | Dirección |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `onClick` | `() => void` | — | Handler |

No usar para cancelar acciones → `Button color="black"` label "Cancelar" · cerrar panels/sheets → drag-to-dismiss del `Sheet`.

---

### 12.16 FilterOptions

**Archivo:** `react/nav/Nav.tsx`

Botón de apertura/cierre del panel de filtros. Pill 65×59.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `mode` | `"normal" \| "close"` | `"normal"` | `normal`=blanco+filter · `close`=negro+chevron-down |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `onClick` | `() => void` | — | Handler |

Siempre en par con `SelectionDropdown` o un panel de filtros.

---

### 12.17 ToggleMenu

**Archivo:** `react/nav/Nav.tsx`

Botón de apertura/cierre del menú lateral. Pill 65×59.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `mode` | `"open" \| "close"` | `"open"` | Estado del menú |
| `state` | `"standard" \| "pressed"` | `"standard"` | Estado visual |
| `onClick` | `() => void` | — | Handler |

Siempre en la navbar superior, a la izquierda. No usar para cerrar sheets o modales → sus controles propios.

---

### 12.18 AdelanteMark

**Archivo:** `react/AdelanteMark/AdelanteMark.tsx`

El logo SVG canónico de Adelante. `fill="currentColor"` — se recolorea por CSS. Single 2-path SVG.

Acepta todas las props de `SVGProps<SVGSVGElement>`: `width`, `height`, `className`, `style`, etc.

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

No recolorar con `fill` como atributo inline → usar `color:` CSS en el padre. **Full spec: ICON.md** para favicon recipe, PWA manifest, iOS AppIcon parity.

---

### 12.19 Promotion candidates (NOT-IN-DS today)

Patrones que existen como stubs en screens, pendientes de promoción:

- Two-tab segmented toggle (outlined ↔ filled)
- Trailing-icon `Tag` variant
- Paired `Rol → Obras` row con hairline
- Mobile bottom action bar
- True `x` glyph en el Icon registry

Cuando se shipea uno como `NOT-IN-DS:` stub, flaggearlo para promoción en el PR description.

---

## 13. Vendoring workflow

El DS no está publicado en npm. Vendorear los archivos React al prototipo en `components/ds/<Component>/`.

### 13.1 Initial vendor (new prototype)

```bash
DS=~/Documents/claudecode/adelante-design-system/react
mkdir -p components/ds/{Icon,Button,Form,Sheet,SlideButton,SlideToConfirm,SlideArm,SelectionDropdown,ToggleCards,TabsMenu,AdelanteMark}

cp "$DS/Icon/Icon.tsx"                                    components/ds/Icon/
cp "$DS/Button/Button.tsx"                                components/ds/Button/
cp "$DS/Form/Form.tsx"                                    components/ds/Form/
cp "$DS/Sheet/Sheet.tsx"                                  components/ds/Sheet/
cp "$DS/Sheet/Sheet.css"                                  components/ds/Sheet/
cp "$DS/SlideButton/SlideButton.tsx"                      components/ds/SlideButton/
cp "$DS/SlideButton/SlideButton.css"                      components/ds/SlideButton/
cp "$DS/SlideToConfirm/SlideToConfirm.tsx"                components/ds/SlideToConfirm/
cp "$DS/SlideToConfirm/SlideToConfirm.css"                components/ds/SlideToConfirm/
cp "$DS/SlideArm/SlideArm.tsx"                            components/ds/SlideArm/
cp "$DS/SlideArm/SlideArm.css"                            components/ds/SlideArm/
cp "$DS/SelectionDropdown/SelectionDropdown.tsx"          components/ds/SelectionDropdown/
cp "$DS/SelectionDropdown/SelectionDropdown.css"          components/ds/SelectionDropdown/
cp "$DS/ToggleCards/ToggleCards.tsx"                      components/ds/ToggleCards/
cp "$DS/ToggleCards/ToggleCards.css"                      components/ds/ToggleCards/
cp "$DS/TabsMenu/TabsMenu.tsx"                            components/ds/TabsMenu/
cp "$DS/AdelanteMark/AdelanteMark.tsx"                    components/ds/AdelanteMark/
cp "$DS/design-system.css"                                components/ds/

cp "$DS/springs.ts"                                       lib/springs.ts
cp "$DS/haptic.ts"                                        lib/haptic.ts
```

### 13.2 Post-vendor cleanup

```bash
cd components/ds
sed -i '' 's|from "\.\./springs"|from "@/lib/springs"|g; s|from "\.\./haptic"|from "@/lib/haptic"|g' \
  Sheet/Sheet.tsx SlideButton/SlideButton.tsx SlideToConfirm/SlideToConfirm.tsx \
  SlideArm/SlideArm.tsx Form/Form.tsx SelectionDropdown/SelectionDropdown.tsx \
  TabsMenu/TabsMenu.tsx Button/Button.tsx

# Strip Google Fonts @import (Roboto loaded via next/font)
sed -i '' '/^@import url("https:\/\/fonts.googleapis.com/d' design-system.css
```

Luego `@import "../components/ds/design-system.css";` al tope de `app/globals.css`.

### 13.3 Width overrides para el mobile shell

Los componentes DS se autorearon para un frame de 372 px. Dentro del shell de 402 px (menos 48 px gutters → 354 px), desbordan. Agregar a `app/globals.css`:

```css
.losa-stack .ds-form-field,
.losa-stack .ds-sd { width: 100%; }
.losa-stack .ds-sd__list-inner { max-height: 240px; overflow-y: auto; }
```

Envolver la sheet (o cualquier región con componentes DS) con `className="losa-stack"`.

`SlideButton` tiene width inline (282 px) y no puede sobreescribirse via CSS — centrarlo con `flex justify-center`. `SlideToConfirm` / `SlideArm` son width-100% por diseño.

### 13.4 Token coexistence

| Uso | Token |
|---|---|
| Tailwind utility class | `--color-*` |
| Inline style dentro de región DS | `--ds-color-*` |
| Halo / press states | `--ds-color-*-pressed` o constantes `halo.*` |

No inventar un tercer namespace.

---

## 14. When the DS doesn't have what you need (NOT-IN-DS pattern)

1. Verificar que ninguna variante DS calza (size, color, layout). Leer `react/<Component>/<Component>.stories.tsx` — lista cada combinación soportada.
2. Si nada calza, **stop and flag**:

   > *"The DS doesn't have a `<thing>` that fits this design. Options: (a) compose from existing primitives, (b) author a local stub flagged `NOT-IN-DS:` and promote later, (c) extend an existing DS component. Which path?"*

3. Si el usuario elige (b), marcar el primitive local:

   ```tsx
   // NOT-IN-DS: <one-line description> · Promote to DS when stable.
   ```

4. El módulo de screen publicado (§15) mantiene estos localmente en `react/screens/<Name>/` hasta que sean promovidos. No agregar primitivos a medio terminar en `react/<Component>/`.

**Never invent components silently.** La arquitectura anti-alucinación depende de esto — si Claude Code no puede trazar un componente a flotante.md o a un stub NOT-IN-DS, no debería existir.

---

## 15. Per-screen pattern (DS-side screen modules)

Cuando un prototipo se estabiliza, espejarlo dentro del DS como `react/screens/<Name>/` — así Storybook lo indexa para el equipo.

### 15.1 Target shape

```
adelante-design-system/react/screens/<Name>/
├── <Name>.tsx              # single-file port (all sub-components inline)
├── <Name>.stories.tsx      # Storybook entry
└── <Name>.css              # screen-only styles not in design-system.css
```

Seguir `react/screens/ControlUsuarios/ControlUsuarios.tsx` como referencia estructural.

### 15.2 Porting rules

| Standalone prototype | DS screen |
|---|---|
| `app/page.tsx` + `components/<proto>/*.tsx` | Single `<Name>.tsx` |
| `import { Button } from "@/components/ds/Button/Button"` | `import { Button } from "../../Button/Button"` |
| Tailwind utility classes | CSS classes en `<Name>.css`, prefijadas con el screen (e.g. `lf-*`) |
| `import { springs } from "@/lib/springs"` | `import { springs } from "../../springs"` |
| Mock data en `mock-data.ts` | Inline `SEED_*` constants al tope de `<Name>.tsx` |
| `NOT-IN-DS:` comments | Mantener tal cual |

El DS no usa Tailwind. Convertir cada `className="…"` a una clase `<name>-*` CSS o `style={{ }}` inline. Inline para one-offs; promover a `<name>-*` cuando la misma combo aparezca 3+ veces.

### 15.3 Maintenance contract

- El prototipo standalone en `~/Documents/claudecode/<name>/` es el workspace de dev local.
- El screen DS en `react/screens/<Name>/` es la referencia para el equipo.
- **Deben mantenerse en sync.** Cambio en uno → espejarlo en el otro en el mismo ciclo de PR.
- Cuando un `NOT-IN-DS:` se promueve a `react/<Component>/`, eliminar el stub del screen y actualizar ambos para importar desde la nueva ubicación.

---

## 16. QA acceptance checklist

Una screen está lista cuando **todos** los items abajo están verificados en dispositivo real.

### Press feedback
- [ ] Cada elemento interactivo usa DS `Button` o `<PressableButton>` — sin `<button>` o `<div onClick>` raw.
- [ ] Halo fade-in dentro de ~80 ms del touchdown.
- [ ] Halo persiste ~120 ms después del release.
- [ ] Halo fade-out tarda ~180 ms.
- [ ] `onClick` dispara ~100 ms después del release.
- [ ] Color del halo es un tono apagado/oscuro del fill del botón, no un color de contraste.
- [ ] Ningún ancestro con `overflow: hidden` recorta el halo.

### Motion
- [ ] Sin valores de spring inline. Todas las transiciones referencian `springs.<name>`.
- [ ] Open usa `expanding`; close usa `shrinking` o `settling`.
- [ ] Springs simétricos en la misma interacción (open/close con phasing espejado).
- [ ] Sin `height: auto` en expand/collapse — usar `grid-template-rows: 0fr → 1fr`.
- [ ] FAB → sheet morph: ancho crece primero, alto después de ~180 ms delay.
- [ ] Sheet drag dismiss a `offset.y > 120 px` OR `velocity.y > 600 px/s`; sino spring back vía `settling`.
- [ ] Cascade staggers a `0.06 s` por hijo después de `0.38 s` desde inicio del morph.
- [ ] Action CTAs del sheet en footer `shrink-0` fuera del scroll body.

### Haptics
- [ ] `haptic.select()` en cada `onPressStart` (touchdown, no release).
- [ ] `haptic.drag()` en drag start.
- [ ] `haptic.complete()` en confirm / success.
- [ ] `haptic.delete()` antes de cualquier confirmación destructiva.
- [ ] Sin haptic en eventos hover-style.

### Drag & drop
- [ ] PointerSensor con `activationConstraint: { distance: 5 }`.
- [ ] TouchSensor con `activationConstraint: { delay: 200, tolerance: 5 }`.
- [ ] Items draggables con `touch-action: none` (`touch-none`).
- [ ] Tap en item draggable sigue disparando acciones DS `Button` / `<PressableButton>`.
- [ ] `<DragOverlay>` muestra ghost levantado con `scale: 1.05` + shadow.
- [ ] `KeyboardSensor` agregado cuando el reorder necesita ser accesible por teclado.

### Accessibility
- [ ] Cada botón icon-only tiene `aria-label`.
- [ ] Regiones expandibles usan `aria-expanded`.
- [ ] Focus rings visibles en Tab nav; ningún botón los suprime.
- [ ] `prefers-reduced-motion` sustituye `{ duration: 0.2, ease: "easeOut" }` para springs bouncy.
- [ ] Contraste verificado para cualquier tono nuevo.

### Layout
- [ ] Mobile root es `max-w-[402px] mx-auto` con atributo `data-prototype`.
- [ ] Sin `overflow-hidden` en el root.
- [ ] Bottom action bar es `fixed` fuera del scroll container; scroll content tiene `pb-[160px]`.
- [ ] Force-light tokens aplicados en el `layout.tsx` del prototipo (ambos `--surface-*` y `--color-*`).

### Build
- [ ] `npm run build` pasa — todas las rutas prerenderean como static.
- [ ] Sin console warnings de layout shift o animation cancellation.
- [ ] Sin tipos `any` en código committed.

### DS rules
- [ ] Cada primitive interactivo reutilizable verificado contra el DS antes de autorearlo localmente.
- [ ] Primitivos custom tienen comentario `NOT-IN-DS:` con una línea de description.
- [ ] `lib/springs.ts` / `lib/haptic.ts` matches `react/springs.ts` / `react/haptic.ts` del DS.
- [ ] Cuando el prototipo se estabiliza, está siendo portado a `react/screens/<Name>/` del DS (§15).
- [ ] Cualquier fix a nivel de componente llegó al DS repo PRIMERO (DS-first workflow — Memory.md §8). Standalone re-vendoreado DESPUÉS de que el PR del DS fue mergeado. Las copias vendoreadas en `components/ds/` nunca son el origen de cambios.

---

## 17. Anti-patterns (don't do)

- **No** inline spring values (`transition={{ stiffness: 320 }}`). Agregar a `lib/springs.ts` primero.
- **No** usar `layoutId` para morphs entre shapes diferentes. Crossfade con `AnimatePresence mode="popLayout"`.
- **No** animar `width`/`height` en el mismo elemento que se está haciendo scroll. Scroll en un hijo de tamaño estático de la surface del morph.
- **No** agregar `overflow-hidden` a un contenedor que envuelve un button — recorta el halo.
- **No** poner handlers de dnd-kit en la surface del sheet. dnd-kit para items; motion drag para el sheet.
- **No** confiar en screenshots del dev preview para timing de animaciones. Verificar en dispositivo real.
- **No** inventar componentes. Si no está en §12 ni en un stub `NOT-IN-DS:`, no existe.
- **No** editar `components/ds/` en el prototipo standalone. El próximo re-vendor sobreescribe los cambios silenciosamente. Fix en el DS repo primero (Memory.md §8).
- **No** shipear un stub `NOT-IN-DS:` que use comportamiento que ya está en el DS. Si el DS lo tiene, usarlo (vendor + apply).
- **No** valores hardcodeados. Solo tokens `--ds-*` o los definidos en §3.
- **No** Tailwind dentro de componentes DS vendoreados.
- **No** `fill` como atributo inline en SVGs que necesitan `var()` — usar CSS property en el padre.

---

## 18. Pointers a specs por componente

Cuando se toca un componente específico, cargar su spec primero — esa es el contrato. La spec se actualiza **antes** del código.

| Componente | Spec file |
|---|---|
| Press contract (PressableButton + DS Button halo) | **HALOPRESS.md** |
| AdelanteMark brand mark (web + iOS AppIcon) | **ICON.md** |
| SlideToConfirm + SlideArm | **SLIDE_TO_CONFIRM.md** |
| Sheet (3-state morph + drag + cascade) | **SHEET_MORPH.md** |

Si un componente listado en §12 no tiene spec aún, el entry del inventario es el contrato. Promover a spec standalone cuando el comportamiento sea no-trivial.

---

*End of flotante.md. Si algo aquí está mal o es ambiguo, actualizar este archivo antes de tocar el código — el archivo es el contrato.*
