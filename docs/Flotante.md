---
name: flotante
companion: Losa.md, Memory.md.
parallel: INFRA.md (iOS/Swift equivalent of this file)
repo: github.com/DavidpcAD/adelante-design-system
purpose: The canonical component library and operational guide for Adelante web prototypes. Lives in the repo. Loaded on demand when Claude Code needs to render or modify a real component. Components must come from here — Figma is exploratory, not canonical. If a component isn't in this file, it doesn't exist yet; flag and stop.
---

# flotante.md — Adelante Web Component Library

**Figma is exploration, this file is truth.** When Claude Code needs to build a screen, components must come from here — not from Figma's invented stand-ins, not from improvisation. If a component isn't documented in this file, it doesn't exist yet: flag the gap and stop.

**Golden rule:** never hard-coded values. Only `--ds-*` tokens or those listed in §3. No Tailwind inside DS components.

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

react/                           # DS component source in this repo
├── AdelanteMark/AdelanteMark.tsx
├── Button/Button.tsx
├── Card/Card.tsx
├── Form/Form.tsx
├── Icon/Icon.tsx
├── Nav/Nav.tsx                  # NavigationControls, FilterOptions, ToggleMenu
├── QuantitySelector/{QuantitySelector.tsx, QuantitySelector.css}
├── SearchBar/{SearchBar.tsx, SearchBar.css}
├── SelectionDropdown/{SelectionDropdown.tsx, SelectionDropdown.css}
├── Sheet/{Sheet.tsx, Sheet.css}
├── SlideArm/{SlideArm.tsx, SlideArm.css}
├── SlideButton/{SlideButton.tsx, SlideButton.css}
├── SlideToConfirm/{SlideToConfirm.tsx, SlideToConfirm.css}
├── TabsMenu/TabsMenu.tsx
├── ToggleCards/{ToggleCards.tsx, ToggleCards.css}
└── design-system.css
```

If any of these is missing, vendor it from the DS (§13) or update this repo from the source. The `lib/springs.ts` and `lib/haptic.ts` values **must match** `react/springs.ts` and `react/haptic.ts` in the DS exactly — they are the same vocabulary.

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

**`gray` Button**: semantically "visually disabled" — 2 px halo only (not 8 px).

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

**`shrinking` does not exist in the old catalog** — it was a gap. Use `settling` in legacy code until migrated.

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

**Preferred:** the DS `Button` (`react/Button/Button.tsx`) with `color` (green/red/white/black/gray) + `layout` (label / icon-left / icon-right / icon) + `size` (md / sm). Implements the halo + `haptic.select()` on touchdown.

**Fallback:** a local `PressableButton` shim — same timing contract, used when the DS variant doesn't match (arbitrary geometry, custom shape).

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

Single source of truth per prototype, e.g. `mock-data.ts` or `src/mock-data.ts`. Type-first:

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

**File:** `react/Button/Button.tsx`

Main button of the system. Covers all CTAs in the app. Implements the halo + `haptic.select()` on touchdown.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Button text |
| `color` | `"green" \| "red" \| "white" \| "black" \| "gray"` | `"green"` | Color / semantic intent |
| `layout` | `"label" \| "icon-left" \| "icon-right" \| "icon"` | `"label"` | Content layout |
| `icon` | `IconName` | — | Icon (requires `layout` with icon) |
| `state` | `"standard" \| "pressed" \| "disabled"` | `"standard"` | Interaction state |
| `size` | `"md" \| "sm"` | `"md"` | `md`=56px · `sm`=44px |
| `fullWidth` | `boolean` | `false` | Fills 100% of the container |
| `onClick` | `() => void` | — | Handler |

**Size**
- `md` → 56 px tall · `sm` → 44 px tall
- `layout="icon"` → exact square (56×56 / 44×44)

**Border-radius**
- `md` → 16 px (`--ds-radius-lg`)
- `sm` → 32 px (`--ds-radius-xl`) — collapses to pill
- `sm` + `layout="icon"` → 50% — collapses to circle

**Shadow**
- `md` → `shadow-03-big`
- `sm` → `shadow-01` (softer)

**Pressed halo**
- 8 px ring outward, same tone as the button fill
- `green` → `#88A024` (green-200) · `red` → `#C96C6C` (red-100) · `black` → `rgba(0,0,0,0.8)`
- `white` → `#F3F3F3` (surface) · `gray` → `#EBEBEB` (gray-100), **2 px** only

**Use for**
- Primary action → `color="green"`.
- Destructive action → `color="red"`.
- Secondary action on dark background → `color="white"`.
- Neutral CTA → `color="black"`.
- Disabled state → `color="gray"` or `state="disabled"`.

**Do not use for**
- Tab navigation → `TabsMenu`.
- Slide-to-confirm → `SlideButton` or `SlideArm`.
- Filter chips → `SelectionDropdown`.
- Card collapse/expand controls → `ToggleCards`.

---

### 12.2 Icon

**File:** `react/Icon/Icon.tsx`

System icon catalog. 34 icons, all `viewBox 0 0 24 24`, filled via CSS.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `IconName` | — | Icon name |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | SVG size |
| `color` | `string` | `"currentColor"` | Fill color — **use CSS property, not SVG attribute** |
| `className` | `string` | — | Extra class |

**Catalog (38 icons)**

- Navigation: `home`, `back`, `arrow-right`, `go`
- Actions: `search`, `filter`, `edit`, `plus`, `minus`, `delete`, `remove`, `close`, `open`, `menu`, `options`, `duplicar`
- State and feedback: `check`, `good`, `info`, `alert`, `completado`, `incompleto`, `pendiente`, `sin-stock`, `sin-autorizar`
- Documents: `boleta`, `traslado`, `entrega`, `list`, `folder`, `calculator`
- People and resources: `user`, `cuadrillas`, `rol`, `place`
- Form controls: `checkbox`, `checkbox-fill`, `square`

**Aliases**

Alternative names the component resolves internally to the canonical name:
- `arrow`, `forward`, `chevron-right` → `arrow-right`
- `chevron-left` → `back`
- `chevron-down` → `close`
- `chevron-up`, `chevrons-up-down` → `open`
- `warning` → `alert`
- `lens`, `leans` → `search`
- `check` → `good`

**Common confusions**

- `good` is a plain checkmark without a circle. `completado` has an outer circle — they are different icons.
- `minus` is a horizontal bar without a circle. `remove` has an outer circle.
- `delete` is a real X. `close` is a chevron-down, not an X — they are different icons.
- There is no standalone `x` glyph in the catalog. If a real X is needed, rotate `plus` 45° (promotion candidate).

**SVG fill**

The `color` prop does not resolve `var()` because browsers do not propagate CSS variables as HTML attributes on SVG elements. Always apply color via CSS on the parent element:

```tsx
// WRONG — var() does not resolve as an attribute
<Icon name="good" color="var(--ds-color-white)" />

// CORRECT — CSS property on the parent
.my-class svg { fill: var(--ds-color-white); }
```

**Do not use for**
- Adelante logo or brand mark → `AdelanteMark`.
- Icons already covered by Phosphor (`@phosphor-icons/react`) available in the DS.

---

### 12.3 FormField

**File:** `react/Form/Form.tsx`

Text field with label, input and helper text.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Nombre"` | Field label |
| `placeholder` | `string` | `"Escribir aquí"` | Input placeholder |
| `type` | `"text" \| "email" \| "password" \| "number" \| "tel"` | `"text"` | HTML input type |
| `state` | `FormFieldState` | `"standard"` | Visual state |
| `helperText` | `string` | — | Helper / warning text |
| `value` | `string` | — | Controlled value |
| `onChange` | `ChangeEventHandler` | — | Change handler |
| `onClear` | `() => void` | — | Clear button handler (only when `state="x"`) |

**States (`FormFieldState`)**

| State | Visual | When |
|--------|--------|------|
| `standard` | Thin gray border | Idle |
| `active` | 2 px black border | Focused / typing |
| `x` | 2 px green border + delete button | Has clearable content |
| `ayuda` | Gray border + gray helper + `info` icon | User instruction |
| `advertencia` | 2 px red border + red helper + `incompleto` icon | Validation failed |
| `disabled` | gray-100 background, no border | Field locked |

**Dimensions**
- Width 370 px, input height 59 px.
- Border-radius 32 px (`--ds-radius-xl`) — pill.

**Do not use for**
- Searching in lists → `SearchBar`.
- Selecting from fixed options → `SelectionDropdown`.
- Quantity input with +/- → `QuantitySelector`.

---

### 12.4 CheckBox

**File:** `react/Form/Form.tsx`

Square checkbox with four visual states. Use for binary on/off selection in forms.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Opción"` | Option text |
| `state` | `"standard" \| "hover" \| "checked" \| "disabled"` | `"standard"` | Visual state |
| `checked` | `boolean` | `false` | Controlled checked value |
| `onChange` | `(checked: boolean) => void` | — | Handler |

**States + colors**

| State | Icon | Icon color | Label color |
|---|---|---|---|
| `standard` | `square` | gray-300 | black |
| `hover` | `square` | black | black |
| `checked` | `checkbox-fill` | black | black |
| `disabled` | `square` | gray-200 | gray-200 |

Hover is also triggered by CSS `:hover` — no need to set `state="hover"` at runtime.

**Do not use for**
- Exclusive selection → radio or `TabsMenu`.
- Circular multi-state selector (add/remove) → `OptionsExtra`.
- Filters → `SelectionDropdown`.

---

### 12.4b OptionsExtra

**File:** `react/Form/Form.tsx`

Circular selector with semantic add/remove states. Previously called `CheckBox`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Opción"` | Option text |
| `state` | `"standard" \| "add" \| "remove" \| "disabled"` | `"standard"` | Semantic state |
| `checked` | `boolean` | `false` | Current value |
| `onChange` | `(checked: boolean) => void` | — | Handler |

**States**
- `standard` — 4 px black border, white fill, no icon.
- `add` — solid black circle (8 px border collapses into fill) + white `good` checkmark.
- `remove` — solid black circle + white `minus` icon.
- `disabled` — gray-100 fill, gray-200 border, no icon, non-interactive.

**Do not use for**
- Simple binary checkbox → `CheckBox`.
- Exclusive selection → radio or `TabsMenu`.
- Filters → `SelectionDropdown`.

---

### 12.5 Tag

**File:** `react/Form/Form.tsx`

Pill label that represents a category or selection state. When `active`, appends a `completado` icon to the right of the label.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Tag"` | Tag text |
| `state` | `"active" \| "standard" \| "disabled"` | `"standard"` | Visual state |
| `onClick` | `() => void` | — | Tap handler |

**States**
- `standard` — transparent, 2 px gray-200 border, gray-300 text.
- `active` — black fill, white text, `completado` icon on the right.
- `disabled` — same border as standard, gray-200 text, 0.55 opacity, non-interactive.

**Use for**
- Category or status chips on content rows.
- Read-only selection labels.

**Do not use for**
- Multi-select filters → `SelectionDropdown`.
- Navigation → `TabsMenu`.

---

### 12.6 ProgressBar

**File:** `react/Form/Form.tsx`

Horizontal progress track with an optional label and description. Figma layout: label → track → description (vertical stack).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `progress` | `number` | `0` | Percentage (0–100). Semantic steps: 0, 25, 50, 75, 100 |
| `label` | `string` | — | Title above the bar (e.g. `"0% completado"`) |
| `description` | `string` | — | Text below the bar (e.g. `"Faltan 4 materiales"`) |

**Visual structure**
- Track: 100% width, 14 px tall, border-radius 20 px, white background with inner shadow.
- Fill: black, border-radius 20 px. Minimum rendered width: 4 px when `progress > 0`.

**Use for**
- Showing completion percentage of a boleta or order (materials done / total).

**Do not use for**
- Step indicators → compose with multiple discrete items.
- Indeterminate / loading states.

---

### 12.7 OptionLabel

**File:** `react/Form/Form.tsx`

Selectable row option with a circular dot indicator. Behaves like a radio button — use it inside lists where exactly one option can be active.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Opción"` | Option text |
| `state` | `"active" \| "standard" \| "disabled"` | `"standard"` | Visual state |
| `onClick` | `() => void` | — | Selection handler |

**States**
- `standard` — 30×30 circle, 4 px `gray-200` border, white fill.
- `active` — 4 px pure black border + `black-100` fill (`rgba(0,0,0,0.8)`). Appears as a solid dark dot.
- `disabled` — `gray-100` fill, `gray-200` border, `gray-300` text, non-interactive.

**Animation** — `motion.button` with `whileTap: { scale: 0.97 }` and `springs.snappy`.

**Use for**
- Single-selection lists (radio-like behavior without the native radio input).

**Do not use for**
- Multi-select → `CheckBox`.
- Navigation tabs → `TabsMenu`.

---

### 12.8 Card / SummaryCard

**File:** `react/Card/Card.tsx`

Summary card for an order or boleta with a completion status indicator.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `company` | `string` | `"NOVARUM"` | Company name |
| `code` | `string` | `"C.01"` | Work order / cost center code |
| `orderNumber` | `string` | `"BS000095"` | Order number |
| `timestamp` | `string` | `"Ayer 10:25 am"` | Human-readable timestamp |
| `statusState` | `QuantitySelectorState` | `"completo"` | Status icon state |
| `visibility` | `"open" \| "close"` | `"open"` | Expanded or collapsed |
| `onClick` | `() => void` | — | Tap handler |

**Use for**
- Lists of boletas or orders with a clear visual status.

**Do not use for**
- Generic content without an order structure.
- User profile cards.

---

### 12.9 TabsMenu + TabFilterChip

**File:** `react/TabsMenu/TabsMenu.tsx`

`TabsMenu` is a black pill for navigation or primary actions. `TabFilterChip` is a chip row for multi-select filtering. **Neither is a two-tab segmented control (outlined ↔ filled)** — compose two `Button`s for that.

| Prop (`TabsMenu`) | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Tab"` | Tab text |
| `state` | `"standard" \| "pressed"` | `"standard"` | Visual state |
| `layout` | `"label" \| "label+icon"` | `"label"` | With or without icon |
| `icon` | `IconName` | `"home"` | Icon (only with `layout="label+icon"`) |
| `onClick` | `() => void` | — | Handler |

**Dimensions**
- Min size 300×80 px, border-radius 32 px.
- Padding: 40 px horizontal, 24 px vertical.
- Background `--ds-color-black`, text `--ds-color-white`.
- Pressed halo 8 px `rgba(0,0,0,0.8)`.

**Do not use for**
- Primary action buttons → `Button`.
- Stateful filters → `SelectionDropdown`.
- Small inline actions → `Button size="sm"`.

---

### 12.10 SearchBar

**File:** `react/SearchBar/SearchBar.tsx`

Search bar with multiple presentation modes.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layout` | `"label" \| "normal" \| "icon" \| "expanded"` | `"label"` | Presentation mode |
| `state` | `"standard" \| "pressed"` | `"standard"` | Visual state |
| `placeholder` | `string` | `"Buscar"` | Placeholder text |
| `value` | `string` | — | Controlled value |
| `onChange` | `ChangeEventHandler` | — | Change handler |
| `onClick` | `() => void` | — | Click handler (`layout="icon"` only) |
| `onClose` | `() => void` | — | Shows X close button when provided |
| `rightSlot` | `ReactNode` | — | Overrides the right slot |
| `suggestions` | `SearchSuggestion[]` | — | `layout="expanded"` only |
| `onPick` | `(s: SearchSuggestion) => void` | — | Suggestion selection handler |

**Layouts**
- `icon` — circular button 65 px with search icon.
- `normal` — pill with no text.
- `label` — pill with text and optional X button.
- `expanded` — pill + suggestions panel below.

**Do not use for**
- Form data input → `FormField`.
- Selecting from fixed options → `SelectionDropdown`.

---

### 12.11 SelectionDropdown

**File:** `react/SelectionDropdown/SelectionDropdown.tsx`

Collapsible option selector with a fixed-width header. Fixed width 372 px.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Label"` | Header text |
| `items` | `SelectionDropdownItem[]` | `[]` | Option list |
| `isOpen` | `boolean` | — | External open control (optional) |
| `onToggle` | `() => void` | — | Toggle callback |
| `className` | `string` | — | Extra class |

```ts
interface SelectionDropdownItem {
  label: string;
  onClick?: () => void;
}
```

**Appearance**
- Closed — 70 px white pill, border-radius 32 px, `shadow-01`, gray label + `ToggleCards small`.
- Open — header + list of black 80 px pills separated by gap.

**Do not use for**
- Free-text search → `SearchBar`.
- Long or dynamic lists → dedicated screen.
- Multi-select → `CheckBox`.

---

### 12.12 QuantitySelector

**File:** `react/QuantitySelector/QuantitySelector.tsx`

Circular pill with a status ring. Visual progress indicator for materials.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Number displayed inside the circle |
| `state` | `QuantitySelectorState` | `"pendiente"` | Ring state |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | `sm`=49 px · `md`=64 px · `lg`=96 px |
| `mode` | `"standard" \| "pressed"` | `"standard"` | Adds halo when pressed |
| `onTap` | `() => void` | — | Makes the component interactive when provided |
| `ariaLabel` | `string` | — | Custom aria label |

**States**
- `pendiente` — no ring (gray).
- `incompleto` — yellow ring (right half only).
- `completo` — full green ring.
- `sin-stock` — full red ring.

Backward-compatible aliases: `default → incompleto` · `ok → completo` · `alert → sin-stock`

**Visual structure**
- `__outer` — gray-200 base disc
- `__ring` — colored border overlay, driven by state
- `__inner` — black circle with the number

**Use for**
- Showing completion status of a material item (boleta, pedido).
- Inline status indicator alongside a card or row.

**Do not use for**
- Quantity input with +/- → `QuantitySelector` in the DS handles display only; for editing use a dedicated input.
- Generic numeric badges with no status meaning.

---

### 12.13 SlideButton

**File:** `react/SlideButton/SlideButton.tsx`

Slide-to-confirm with a fixed knob on a black track. Fixed width 282 px.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"Pedir"` | Track label |
| `confirmedLabel` | `string` | `"Confirmado"` | Label after confirmation |
| `threshold` | `number` | `0.72` | Fraction of travel required to confirm (0–1) |
| `onConfirm` | `() => void` | — | **Required.** Confirmation callback |
| `disabled` | `boolean` | `false` | Blocks the gesture |
| `disabledLabel` | `string` | — | Alternative label when disabled |
| `confirmedHoldMs` | `number` | `1800` | ms before auto-reset |
| `autoReset` | `boolean` | `true` | Auto-reset after confirmation |

**Dimensions** (Figma node 997-3096)
- Width 282 px, height 80 px, knob 80×80 squircle.

**Behavior**
- Drag ≥ threshold → confirms + auto-reset.
- Drag < threshold → snaps back via `springs.snappy`.
- Tap without drag → nudges 32 px + bounces back (pedagogical hint).

Width is set inline (282 px) and cannot be overridden via CSS — center it with `flex justify-center`.

**Do not use for**
- Confirmation inside a Sheet or panel → `SlideArm`.
- Simple reversible actions → `Button`.
- Actions that already have a confirmation dialog → redundant.

---

### 12.14 SlideToConfirm

**File:** `react/SlideToConfirm/SlideToConfirm.tsx`

Slider where the knob grows with the drag. Port of `SlideToConfirm.swift`. Width 100% of the container.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"PEDIR"` | Label inside the knob |
| `onConfirm` | `() => void` | — | **Required.** Confirmation callback |
| `knobWidth` | `number` | `160` | Knob width at rest (px) |
| `threshold` | `number` | `0.72` | Fraction required to confirm (0–1) |
| `height` | `number` | `80` | Component height (px) |
| `cornerRadius` | `number` | `24` | Corner radius (px) |
| `successHoldMs` | `number` | `800` | ms before auto-reset |
| `enabled` | `boolean` | `true` | When `false`, ignores input (used internally by `SlideArm`) |

**Difference from `SlideButton`**
- `SlideButton` — small fixed knob + black track with centered label, standalone use
- `SlideToConfirm` — growing knob that becomes the track, primary use is inside `SlideArm`
- Tap nudge: `SlideButton` +32 px · `SlideToConfirm` +52 px

**Use for**
- Inside `SlideArm` — this is its primary context.

**Do not use for**
- Standalone on a screen → use `SlideButton` instead.

---

### 12.15 SlideArm

**File:** `react/SlideArm/SlideArm.tsx`

Compact pill that expands into a full `SlideToConfirm`. Port of `PedirBar.swift`. Anchored to the trailing edge; the bar grows left via `springs.expanding`. Disarms via `springs.shrinking` (no overshoot).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | `"PEDIR"` | Collapsed pill text |
| `collapsedWidth` | `number` | `160` | Collapsed width (px) |
| `height` | `number` | `80` | Height (px) |
| `cornerRadius` | `number` | `24` | Corner radius (px) |
| `onConfirm` | `() => void` | — | **Required.** Confirmation callback |
| `successHoldMs` | `number` | `800` | ms before auto-reset |

```
Collapsed  →  Tap  →  Armed (SlideToConfirm full-width + X cancel)
  Armed    →  Full drag  →  Confirmed (fires onConfirm, disarms)
  Armed    →  X cancel   →  Collapsed
```

**Use for**
- Order/confirmation CTA inside a `Sheet`.
- When space is limited and the action needs to be "armed" before confirming.
- Material order flow (PedirBar pattern from iOS).

**Do not use for**
- Ancestors with `overflow: hidden` — halos and the X button will be clipped.

---

### 12.16 Sheet

**File:** `react/Sheet/Sheet.tsx`

FAB → bottom-sheet surface with animated morph. 3 states: closed, open, fullscreen.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | **Required.** Open state |
| `onOpen` | `() => void` | — | **Required.** Open callback |
| `onDismiss` | `() => void` | — | **Required.** Dismiss callback |
| `fab` | `SheetFab` | — | Closed FAB config |
| `children` | `ReactNode` | — | `Sheet.Header`, `Sheet.Body`, `Sheet.Footer` |

```ts
interface SheetFab {
  color: ButtonColor;
  icon: IconName;
  ariaLabel: string;
}
```

**Slots**
- `<Sheet.Header>` — title and description.
- `<Sheet.Body>` — scrollable content.
- `<Sheet.Footer>` — sticky bottom actions.

**Behavior**
- Closed FAB: 84×80 px, border-radius 24 px, `fixed` bottom-right.
- Open morph: width grows first → height follows after ~180 ms delay.
- Drag-to-dismiss: `offset.y > 120 px` OR `velocity.y > 600 px/s` → closes.
- Scroll-to-fullscreen: scroll 12 px → fullscreen; scroll back to 2 px → returns to open.
- Scrim tap → closes.
- Desktop: centered, max-width 402 px.
- Cascade entrance: `staggerChildren: 0.06, delayChildren: 0.38`.

Open state is controlled by the parent — Sheet has no internal state. If an ancestor has `overflow: hidden`, the fixed FAB will not be visible.

**Do not use for**
- Yes/no dialogs → dedicated modal.
- Multiple simultaneous sheets.

---

### 12.17 ToggleCards

**File:** `react/ToggleCards/ToggleCards.tsx`

Black squircle with a chevron that rotates 540° on each state change. Expansion control.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `visibility` | `"open" \| "close"` | `"open"` | Current state |
| `size` | `"big" \| "small"` | `"big"` | `big`=60×88 · `small`=60×50 |
| `mode` | `"normal" \| "disabled"` | `"normal"` | Disabled dims the control |
| `onClick` | `() => void` | — | Handler |
| `ariaLabel` | `string` | — | Accessibility label |

**Animation**
- Each tap accumulates +540° (1.5 turns) — never reverses direction.
- Icon swaps at the midpoint of the rotation (270 ms into the 540 ms spin).
- `open` state → `open` icon · `close` state → `close` icon.

**Use for**
- Expansion control in `SelectionDropdown`.
- Chevron in `SummaryCard`.
- Any section visibility toggle.

**Do not use for**
- Buttons with text labels.
- Boolean configuration toggles.

---

### 12.18 NavigationControls

**File:** `react/Nav/Nav.tsx`

Back/forward navigation button. White pill 65×59.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `navigation` | `"back" \| "go"` | `"back"` | Direction |
| `state` | `"standard" \| "pressed"` | `"standard"` | Visual state |
| `onClick` | `() => void` | — | Handler |

**Do not use for**
- Canceling actions → `Button color="black"` with label "Cancelar".
- Closing panels or sheets → use the `Sheet` drag-to-dismiss.

---

### 12.19 FilterOptions

**File:** `react/Nav/Nav.tsx`

Filter panel open/close button. Pill 65×59.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"normal" \| "close"` | `"normal"` | `normal`=white+filter icon · `close`=black+chevron-down |
| `state` | `"standard" \| "pressed"` | `"standard"` | Visual state |
| `onClick` | `() => void` | — | Handler |

**Use for**
- Opening and closing a filter panel alongside a `SelectionDropdown`

**Do not use for**
- Opening the side menu → `ToggleMenu`.
- Any action unrelated to filtering.

---

### 12.20 ToggleMenu

**File:** `react/Nav/Nav.tsx`

Side menu open/close button. Pill 65×59.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"open" \| "close"` | `"open"` | Menu state |
| `state` | `"standard" \| "pressed"` | `"standard"` | Visual state |
| `onClick` | `() => void` | — | Handler |

**Use for**
- Opening and closing the side navigation menu, always in the top navbar left side

**Do not use for**
- Opening a filter panel → `FilterOptions`.
- Closing sheets or modals → use their own dismiss controls.

---

### 12.21 AdelanteMark

**File:** `react/AdelanteMark/AdelanteMark.tsx`

Canonical Adelante SVG logo. `fill="currentColor"` — recolored via CSS. Single 2-path SVG.

Accepts all `SVGProps<SVGSVGElement>` props: `width`, `height`, `className`, `style`, etc.

| Mode | Parent `color` | `background` |
|------|----------------|--------------|
| Light (default) | `var(--ds-color-green-100)` | white |
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

Do not recolor using `fill` as an inline attribute — always use `color:` CSS on the parent. Full spec: **ICON.md** for favicon recipe, PWA manifest, iOS AppIcon parity.

**Use for**
- Any placement of the Adelante brand mark (splash screen, navbar, login).

**Do not use for**
- System icons → `Icon`.
- Decorative or non-brand SVGs.

---

### 12.22 Promotion candidates (NOT-IN-DS today)

Patterns that exist as stubs in screens, pending promotion to the DS:

- Two-tab segmented toggle (outlined ↔ filled).
- Trailing-icon `Tag` variant.
- Paired `Rol → Obras` row with hairline divider.
- Mobile bottom action bar.
- True `x` glyph in the Icon registry.

When shipping one as a `NOT-IN-DS:` stub, flag it for promotion in the PR description.

---

## 13. Vendoring workflow

The DS is not published on npm. The canonical source in this repo lives under `react/`. When a standalone prototype needs these components, copy them from `react/` into the prototype's structure.

### 13.1 Initial vendor (new prototype)

```bash
DS=~/Documents/claudecode/adelante-design-system/react
mkdir -p prototype/src/ds/{Icon,Button,Form,Sheet,SlideButton,SlideToConfirm,SlideArm,SelectionDropdown,ToggleCards,TabsMenu,AdelanteMark}

cp "$DS/Icon/Icon.tsx"                                    prototype/src/ds/Icon/
cp "$DS/Button/Button.tsx"                                prototype/src/ds/Button/
cp "$DS/Form/Form.tsx"                                    prototype/src/ds/Form/
cp "$DS/Sheet/Sheet.tsx"                                  prototype/src/ds/Sheet/
cp "$DS/Sheet/Sheet.css"                                  prototype/src/ds/Sheet/
cp "$DS/SlideButton/SlideButton.tsx"                      prototype/src/ds/SlideButton/
cp "$DS/SlideButton/SlideButton.css"                      prototype/src/ds/SlideButton/
cp "$DS/SlideToConfirm/SlideToConfirm.tsx"                prototype/src/ds/SlideToConfirm/
cp "$DS/SlideToConfirm/SlideToConfirm.css"                prototype/src/ds/SlideToConfirm/
cp "$DS/SlideArm/SlideArm.tsx"                            prototype/src/ds/SlideArm/
cp "$DS/SlideArm/SlideArm.css"                            prototype/src/ds/SlideArm/
cp "$DS/SelectionDropdown/SelectionDropdown.tsx"          prototype/src/ds/SelectionDropdown/
cp "$DS/SelectionDropdown/SelectionDropdown.css"          prototype/src/ds/SelectionDropdown/
cp "$DS/ToggleCards/ToggleCards.tsx"                      prototype/src/ds/ToggleCards/
cp "$DS/ToggleCards/ToggleCards.css"                      prototype/src/ds/ToggleCards/
cp "$DS/TabsMenu/TabsMenu.tsx"                            prototype/src/ds/TabsMenu/
cp "$DS/AdelanteMark/AdelanteMark.tsx"                    prototype/src/ds/AdelanteMark/
cp "$DS/design-system.css"                                prototype/src/ds/

cp "$DS/springs.ts"                                       lib/springs.ts
cp "$DS/haptic.ts"                                        lib/haptic.ts
```

### 13.2 Post-vendor cleanup

```bash
cd prototype/src/ds
sed -i '' 's|from "\.\./springs"|from "@/lib/springs"|g; s|from "\.\./haptic"|from "@/lib/haptic"|g' \
  Sheet/Sheet.tsx SlideButton/SlideButton.tsx SlideToConfirm/SlideToConfirm.tsx \
  SlideArm/SlideArm.tsx Form/Form.tsx SelectionDropdown/SelectionDropdown.tsx \
  TabsMenu/TabsMenu.tsx Button/Button.tsx

# Strip Google Fonts @import (Roboto loaded via next/font)
sed -i '' '/^@import url("https:\/\/fonts.googleapis.com/d' design-system.css
```

Then add `@import "../ds/design-system.css";` at the top of `app/globals.css` (or the prototype's equivalent).

### 13.3 Width overrides for the mobile shell

DS components were authored for a 372 px frame. Inside the 402 px shell (minus 48 px gutters → 354 px), they overflow. Add to `app/globals.css`:

```css
.losa-stack .ds-form-field,
.losa-stack .ds-sd { width: 100%; }
.losa-stack .ds-sd__list-inner { max-height: 240px; overflow-y: auto; }
```

Wrap the sheet (or any region containing DS components) with `className="losa-stack"`.

`SlideButton` has an inline width (282 px) that cannot be overridden via CSS — center it with `flex justify-center`. `SlideToConfirm` and `SlideArm` are width-100% by design.

### 13.4 Token coexistence

| Use | Token |
|---|---|
| Tailwind utility class | `--color-*` |
| Inline style inside a DS region | `--ds-color-*` |
| Halo / press states | `--ds-color-*-pressed` or `halo.*` constants |

Do not invent a third namespace.

---

## 14. When the DS doesn't have what you need (NOT-IN-DS pattern)

1. Verify that no DS variant fits (size, color, layout). Read `react/<Component>/<Component>.stories.tsx` — it lists every supported combination.
2. If nothing fits, **stop and flag**:

   > *"The DS doesn't have a `<thing>` that fits this design. Options: (a) compose from existing primitives, (b) author a local stub flagged `NOT-IN-DS:` and promote later, (c) extend an existing DS component. Which path?"*

3. If the user picks (b), mark the local primitive:

   ```tsx
   // NOT-IN-DS: <one-line description> · Promote to DS when stable.
   ```

4. The published screen module (§15) keeps these locally in `react/screens/<Name>/` until promoted. Do not add half-finished primitives to `react/<Component>/`.

**Never invent components silently.** The anti-hallucination architecture depends on this — if Claude Code cannot trace a component back to `Flotante.md` or a `NOT-IN-DS:` stub, it should not exist.

---

## 15. Per-screen pattern (DS-side screen modules)

**`react/screens/` is a port destination, not a workspace.**

A screen lands here only after it has been built and validated in a standalone prototype at `~/Documents/claudecode/<name>/`. Do not create or edit files under `react/screens/<Name>/` unless that standalone already exists.

If it does not exist, stop and ask: *"There is no standalone prototype for this screen. Should I scaffold one first at `~/Documents/claudecode/`?"*

The sequence is always:
```
Build in ~/Documents/claudecode/<name>/   ← real layout context, disposable
        ↓  only when stable
Port to react/screens/<Name>/             ← Storybook reference for the team
```

### 15.1 Target shape

```
adelante-design-system/react/screens/<Name>/
├── <Name>.tsx              # single-file port (all sub-components inline)
├── <Name>.stories.tsx      # Storybook entry
└── <Name>.css              # screen-only styles not in design-system.css
```

### 15.2 Porting rules

| Standalone prototype | DS screen |
|---|---|
| `app/page.tsx` + prototype source files | Single `<Name>.tsx` |
| `import { Button } from "@/ds/Button/Button"` | `import { Button } from "../../Button/Button"` |
| Tailwind utility classes | CSS classes in `<Name>.css`, prefixed with the screen name (e.g. `lf-*`) |
| `import { springs } from "@/lib/springs"` | `import { springs } from "../../springs"` |
| Mock data in `mock-data.ts` | Inline `SEED_*` constants at the top of `<Name>.tsx` |
| `NOT-IN-DS:` comments | Keep as-is |

The DS does not use Tailwind. Convert every `className="…"` to a `<name>-*` CSS class or inline `style={{ }}`. Use inline for one-offs; promote to `<name>-*` when the same combination appears 3+ times.

### 15.3 Maintenance contract

- The standalone prototype at `~/Documents/claudecode/<name>/` is the local dev workspace.
- The DS screen at `react/screens/<Name>/` is the team reference.
- **They must stay in sync.** A change in one must be mirrored in the other within the same PR cycle.
- When a `NOT-IN-DS:` stub is promoted to `react/<Component>/`, remove it from the screen and update both to import from the new location.

---

## 16. QA acceptance checklist

A screen is ready when **all** items below are verified on a real device.

### Press feedback
- [ ] Every interactive element uses DS `Button` or `<PressableButton>` — no raw `<button>` or `<div onClick>`.
- [ ] Halo fade-in within ~80 ms of touchdown.
- [ ] Halo persists ~120 ms after release.
- [ ] Halo fade-out takes ~180 ms.
- [ ] `onClick` fires ~100 ms after release.
- [ ] Halo color is a muted/darker shade of the button fill, not a contrasting color.
- [ ] No ancestor with `overflow: hidden` clips the halo.

### Motion
- [ ] No inline spring values. All transitions reference `springs.<name>`.
- [ ] Open uses `expanding`; close uses `shrinking` or `settling`.
- [ ] Symmetric springs on the same interaction (open/close with mirrored phasing).
- [ ] No `height: auto` on expand/collapse — use `grid-template-rows: 0fr → 1fr`.
- [ ] FAB → sheet morph: width grows first, height after ~180 ms delay.
- [ ] Sheet drag-dismiss at `offset.y > 120 px` OR `velocity.y > 600 px/s`; otherwise springs back via `settling`.
- [ ] Cascade staggers at `0.06 s` per child after `0.38 s` from morph start.
- [ ] Sheet action CTAs are in a `shrink-0` footer outside the scroll body.

### Haptics
- [ ] `haptic.select()` on every `onPressStart` (touchdown, not release).
- [ ] `haptic.drag()` on drag start.
- [ ] `haptic.complete()` on confirm / success.
- [ ] `haptic.delete()` before any destructive confirmation.
- [ ] No haptic on hover-style events.

### Drag & drop
- [ ] `PointerSensor` with `activationConstraint: { distance: 5 }`.
- [ ] `TouchSensor` with `activationConstraint: { delay: 200, tolerance: 5 }`.
- [ ] Draggable items have `touch-action: none` (`touch-none`).
- [ ] Tapping a draggable item still fires DS `Button` / `<PressableButton>` actions.
- [ ] `<DragOverlay>` shows a lifted ghost with `scale: 1.05` + shadow.
- [ ] `KeyboardSensor` added when reorder needs to be keyboard-accessible.

### Accessibility
- [ ] Every icon-only button has `aria-label`.
- [ ] Expandable regions use `aria-expanded`.
- [ ] Focus rings visible on Tab nav; no button suppresses them.
- [ ] `prefers-reduced-motion` substitutes `{ duration: 0.2, ease: "easeOut" }` for bouncy springs.
- [ ] Contrast verified for any new color tone.

### Layout
- [ ] Mobile root is `max-w-[402px] mx-auto` with `data-prototype` attribute.
- [ ] No `overflow-hidden` on the root.
- [ ] Bottom action bar is `fixed` outside the scroll container; scroll content has `pb-[160px]`.
- [ ] Force-light tokens applied in the prototype's `layout.tsx` (both `--surface-*` and `--color-*`).

### Build
- [ ] `npm run build` passes — all routes pre-render as static.
- [ ] No console warnings for layout shift or animation cancellation.
- [ ] No `any` types in committed code.

### DS rules
- [ ] Every reusable interactive primitive verified against the DS before authoring locally.
- [ ] Custom primitives have a `NOT-IN-DS:` comment with a one-line description.
- [ ] `lib/springs.ts` / `lib/haptic.ts` matches `react/springs.ts` / `react/haptic.ts` in the DS.
- [ ] When the prototype stabilizes, it is being ported to `react/screens/<Name>/` in the DS (§15).
- [ ] Any component-level fix originated in the DS repo first (DS-first workflow — Memory.md §6). Standalone re-vendored only after the DS PR was merged. Vendored copies in standalone prototypes are never the origin of changes.

---

## 17. Anti-patterns (don't do)

- **No** inline spring values (`transition={{ stiffness: 320 }}`). Add to `lib/springs.ts` first.
- **No** `layoutId` for morphs between different shapes. Use `AnimatePresence mode="popLayout"` crossfade.
- **No** animating `width`/`height` on the same element being scrolled. Scroll inside a static-size child of the morph surface.
- **No** `overflow-hidden` on a container wrapping a button — it clips the halo.
- **No** dnd-kit handlers on the sheet surface. dnd-kit is for items; motion drag is for the sheet.
- **No** relying on dev preview screenshots for animation timing. Verify on a real device.
- **No** inventing components. If it's not in §12 or a `NOT-IN-DS:` stub, it does not exist.
- **No** editing vendored copies in a standalone prototype. The next re-vendor silently overwrites changes. Fix in the DS repo first (Memory.md §6).
- **No** shipping a `NOT-IN-DS:` stub that duplicates behavior already in the DS. If the DS has it, use it (vendor + apply).
- **No** hardcoded values. Only `--ds-*` tokens or those defined in §3.
- **No** Tailwind inside vendored DS components.
- **No** `fill` as an inline attribute on SVGs that need `var()` — use CSS property on the parent.

---

## 18. Component spec pointers

When touching a specific component, load its spec first — that is the contract. The spec is updated **before** the code.

| Component | Spec file |
|---|---|
| Press contract (PressableButton + DS Button halo) | **HALOPRESS.md** |
| AdelanteMark brand mark (web + iOS AppIcon) | **ICON.md** |
| SlideToConfirm + SlideArm | **SLIDE_TO_CONFIRM.md** |
| Sheet (3-state morph + drag + cascade) | **SHEET_MORPH.md** |

If a component listed in §12 has no dedicated spec yet, its inventory entry is the contract. Promote to a standalone spec when the behavior becomes non-trivial.

---

*End of Flotante.md. If anything here is wrong or ambiguous, update this file before touching the code — this file is the contract.*
