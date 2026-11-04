---
name: losa-flotante-prototype
brand: Losa Flotante
stack: Next.js 16 + Tailwind v4 + motion.dev + @dnd-kit + @phosphor-icons
source_of_truth: H4 Figma (file key v4iOmxL9gzmkZx0KOS5sjR) + P2 SwiftUI prototype
purpose: Single self-contained reference for building Losa Flotante prototype screens on the web. Pair this file with a Figma node and you have everything you need.
---

# Losa Flotante — Prototype Design & Stack Guide

This file is the contract. When dropped into a new context (new Claude session, new engineer, new repo), reading this file + a Figma node ID **must** be enough to build a screen that feels exactly like the SwiftUI P2 prototype.

Two governing rules — everything else is detail:

1. **Vocabulary, not inline values.** Springs, haptics, halos, colors, spacing — all named. Never `transition={{ stiffness: 320 }}` inline, never `#ADD010` inline. If you need a new meaning, add it to the vocabulary below before using it.
2. **Halo and press-delay on every interactive element.** No raw `<button>` or `<div onClick>`. Every tap target goes through `<PressableButton>` (see §6). The 80/180/120ms timing is the design language; changing it changes the brand.

---

## 1. How to use this file

For any new screen:

1. Open the Figma node via MCP (`mcp__Figma__get_screenshot` + `mcp__Figma__get_metadata`) — get layout + structure.
2. Reach for an existing component in `components/ui/` before inventing one. The card pattern, sheet pattern, slide-to-confirm, quantity slider, sortable list — they exist and have been tuned.
3. Use **only** the vocabulary tokens in §3 (tokens) and §5 (springs). If a value isn't listed, it doesn't exist yet — add it to this file first.
4. Wrap every interactive element in `<PressableButton>` (§6).
5. Verify against the QA checklist (§13) before claiming done.

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 16** | App Router, Turbopack, `"use client"` per interactive route |
| Language | TypeScript (strict) | No `any` in committed code |
| Styling | **Tailwind CSS v4** | `@theme inline` in `app/globals.css` |
| Motion | **`motion`** (motion.dev / framer-motion) | Import from `motion/react`. Never inline springs |
| Drag & drop | **`@dnd-kit/core`** + `@dnd-kit/sortable` + `@dnd-kit/modifiers` | See §10 |
| Icons | **`@phosphor-icons/react`** | `regular` / `bold` / `fill` weights |
| Theming | `next-themes` (class on `<html>`) | Overridden to LIGHT inside prototype routes — see §3.1 |
| Class util | `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts` |
| Haptics | Custom wrapper around `navigator.vibrate` | Silent on iOS Safari — see §4 |
| State | Local `useState` / `useReducer` only | No TanStack Query, no Zustand — this is a prototype |
| Deploy | Vercel | `npx vercel --prod` |

**Required peer files** (every prototype repo must have these):

```
lib/
├── springs.ts          # §5 — named motion vocabulary
├── haptic.ts           # §4 — haptic vocabulary
└── utils.ts            # cn() helper

components/ui/
├── pressable-button.tsx    # §6 — THE press contract
├── checkbox-mark.tsx
└── (other reused primitives)
```

If any of these is missing, copy them from `adelante-web` before writing the new screen.

---

## 3. Design tokens — Losa Flotante

All values transcribed from the Figma `Losa Flotante / Core` page. Tokens take precedence over raw values; raw hex appears only for tones with no token equivalent.

### 3.1 Forced light mode

`adelante-web` runs dark by default. Every prototype route group must override tokens inside its `layout.tsx`:

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

### 3.2 Color palette

| Token | Hex | Use |
|---|---|---|
| `green-100` (brand) | `#ADD010` | FAB, "Crear usuario" CTA, slide-to-confirm track |
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

### 3.5 Spacing (px)

`2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40` — and `24px` layout margin.

### 3.6 Radii (px)

`4, 8, 16, 32`. The "squircle" buttons use `24` (between 16 and 32) — that's intentional, matches the FAB.

### 3.7 Shadows

| Token | Value |
|---|---|
| `shadow-01` | `0 4px 8px rgba(170, 175, 182, 0.25)` |
| `shadow-02-soft` | `0 0 6px rgba(0, 0, 0, 0.16)` |
| `shadow-03-big` | `0 2px 4px rgba(0,0,0,0.16), 0 0 6px rgba(0,0,0,0.16)` |

---

## 4. Haptic vocabulary

The SwiftUI prototype defines five events. On the web, these map to `navigator.vibrate()` patterns. **All are silent on iOS Safari** (no vibration API support) — they're correct for Android Chrome and PWA installs.

Wrap in `lib/haptic.ts`. Call by event name, never by raw vibration value.

```ts
// lib/haptic.ts
type Event = "select" | "drag" | "complete" | "delete" | "error";

function vibrate(pattern: number | number[]) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pattern);
  }
}

export const haptic = {
  select:   () => vibrate(8),                  // light tap — buttons, toggles
  drag:     () => vibrate(15),                 // medium — drag start/threshold
  complete: () => vibrate([10, 30, 10]),       // success notification
  delete:   () => vibrate([20, 50, 20]),       // warning before destructive
  error:    () => vibrate([30, 30, 30, 30]),   // error notification
};
```

**When to fire:**

| Event | When |
|---|---|
| `select` | On `onPressStart` of any button — fires the instant the finger touches, not on release |
| `drag` | On drag start AND when crossing a snap threshold |
| `complete` | On slide-to-confirm success, form submit OK |
| `delete` | Before a destructive confirm appears |
| `error` | On validation failure |

---

## 5. Motion vocabulary (springs)

Transcribed from `P2/Motion/Springs.swift`. SwiftUI's `spring(response, dampingFraction)` converts to motion.dev's `stiffness, damping` via:

> `stiffness = (2π / response)²` and `damping = 2 · dampingFraction · √stiffness` (mass = 1)

**Spot-check the math** — paste this in a browser console next to any SwiftUI spring you want to port. Should produce the same numbers as the export below:

```ts
const swiftSpring = (response: number, dampingFraction: number) => {
  const omega = (2 * Math.PI) / response;
  return {
    stiffness: Math.round(omega ** 2),
    damping:   Math.round(2 * dampingFraction * omega),
    mass: 1,
  };
};

swiftSpring(0.30, 0.70);  // snappy     → { stiffness: 439, damping: 29, mass: 1 }
swiftSpring(0.40, 0.80);  // completing → { stiffness: 247, damping: 25, mass: 1 }
swiftSpring(0.25, 0.65);  // deleting   → { stiffness: 632, damping: 33, mass: 1 }
swiftSpring(0.50, 0.75);  // expanding  → { stiffness: 158, damping: 19, mass: 1 }
swiftSpring(0.60, 0.85);  // settling   → { stiffness: 110, damping: 18, mass: 1 }
swiftSpring(0.42, 0.98);  // shrinking  → { stiffness: 224, damping: 29, mass: 1 }
swiftSpring(0.32, 0.55);  // popping    → { stiffness: 386, damping: 22, mass: 1 }
```

(Rounding differs by ±1 in a couple of entries — `snappy.stiffness` is stored as `440` rounded up to match SwiftUI's runtime, `popping.stiffness` as `385`. Within margin of perceptual identical.)

Use the named export. Never inline.

```ts
// lib/springs.ts
import type { Transition } from "motion/react";

export const springs = {
  // SwiftUI: response 0.30, damping 0.70 — tap response
  snappy:     { type: "spring", stiffness: 440, damping: 29, mass: 1 } as const,

  // SwiftUI: 0.40, 0.80 — confirm, check, slight overshoot
  completing: { type: "spring", stiffness: 247, damping: 25, mass: 1 } as const,

  // SwiftUI: 0.25, 0.65 — remove, warning
  deleting:   { type: "spring", stiffness: 632, damping: 33, mass: 1 } as const,

  // SwiftUI: 0.50, 0.75 — reveal, open, card grow
  expanding:  { type: "spring", stiffness: 158, damping: 19, mass: 1 } as const,

  // SwiftUI: 0.60, 0.85 — return to rest after drag
  settling:   { type: "spring", stiffness: 110, damping: 18, mass: 1 } as const,

  // SwiftUI: 0.42, 0.98 — near-critically damped, shrink without overshoot
  shrinking:  { type: "spring", stiffness: 224, damping: 29, mass: 1 } as const,

  // SwiftUI: 0.32, 0.55 — bouncy pop-in (Activo pill, menu items)
  popping:    { type: "spring", stiffness: 385, damping: 22, mass: 1 } as const,
} satisfies Record<string, Transition>;
```

### Spring usage cheat sheet

| Interaction | Spring |
|---|---|
| Button press release / dialog dismiss | `snappy` |
| Checkbox check, "✓ saved" confirmation | `completing` |
| Row delete, dismissing destructive sheet | `deleting` |
| Card expand, FAB → sheet morph, dropdown open | `expanding` |
| Sheet released mid-drag, scroll snap-back | `settling` |
| Sheet close, collapse to FAB, drawer close | `shrinking` |
| Pill enter, tag insert, "Activo" badge appear | `popping` |

**Rule:** open with `expanding`, close with `shrinking` (or `settling` if user-driven). Symmetric springs across the same interaction read as one motion.

---

## 6. `PressableButton` — the press contract

Every tap target uses this. The 80/180/120ms timing is **part of the brand**; mirrors `PressableSquircleStyle` in `P2/Components/PressableSquircleStyle.swift` to the millisecond.

### 6.1 Behavior (testable)

| Phase | Property | Duration | Easing | Delay |
|---|---|---|---|---|
| Press-in | halo opacity 0 → 1 | **80 ms** | `ease-out` | 0 |
| Release | halo opacity 1 → 0 | **180 ms** | `ease-out` | **120 ms** |
| Click fire | `onClick` callback runs | — | — | **100 ms** after release |

**Why the 120ms release delay:** even the briefest tap leaves the halo visible long enough to register as press feedback.

**Why the 100ms press-delay before `onClick`:** the action would otherwise fire in the same frame as the press, and the halo would never render before the UI changes underneath it.

### 6.2 API

```tsx
import { PressableButton, halo } from "@/components/ui/pressable-button";
import { Plus } from "@phosphor-icons/react";
import { haptic } from "@/lib/haptic";

<PressableButton
  cornerRadius={24}                       // MUST match the visible shape
  haloColor={halo.green}                  // halo.green | halo.black | halo.white
  haloWidth={8}                           // default 8; matches SwiftUI
  onPressStart={() => haptic.select()}    // fire haptic on touchdown
  onClick={() => setOpen(true)}           // fires 100ms after release
  style={{ width: 84, height: 80, background: "#ADD010" }}
  aria-label="Crear usuario"
>
  <Plus size={26} weight="bold" />
</PressableButton>
```

### 6.3 Container caveat

The halo extends `haloWidth/2` (4 px) **outside** the button via `inset: -haloWidth/2` + stroke. If any ancestor has `overflow: hidden`, the halo gets clipped.

Two fixes — pick one:

1. Remove `overflow-hidden` from the ancestor if it isn't doing anything load-bearing.
2. Wrap with `<PressableSlot>` (provided in the same file) — adds `haloWidth/2` padding + negative margin so the halo breathes without affecting layout.

### 6.4 Halo color rule

Halo must be a **muted/darker shade of the button's own fill**, not a contrasting color:

- Green button → green halo
- Charcoal/black → medium-gray halo
- White → light-gray halo

Use the `halo` constants from `pressable-button.tsx`. Don't reach for accent colors.

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

Mirrors the lesson learned in P2 the hard way: the `Activo` pill / `✓` icon transform is **not** matched geometry — it's a coordinated crossfade with offset + scale.

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

**Rule of thumb:**
- Same shape, different position → `layoutId`
- Different shapes → `<AnimatePresence mode="popLayout">` + crossfade

### 7.3 FAB → bottom sheet morph (two-phase)

Single `motion.div` with a variants object. Width grows first (horizontal pill), then height (sheet rises). Same physics on all phases via `springs.expanding`.

```tsx
const sheetVariants = {
  closed: {
    width: 84, height: 80, right: 16, bottom: 24,
    backgroundColor: "#ADD010", borderRadius: 24,
    transition: {
      // Reverse symmetric: vertical collapses first, then horizontal
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
      width:        { ...springs.expanding },                   // phase 1
      right:        { ...springs.expanding },
      height:       { delay: 0.18, ...springs.expanding },      // phase 2
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

**The cascade** lives as a child `motion.div`:

```tsx
<motion.div
  variants={{ open: { transition: { staggerChildren: 0.06, delayChildren: 0.38 } } }}
>
  {items.map((item, i) => (
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

### 7.4 Scroll-to-fullscreen (sheet rises when inner content scrolls)

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

For the sheet itself (the surface), use motion's drag — NOT dnd-kit (dnd-kit is for items inside the sheet).

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

**Thresholds (testable):**
- `offset.y > 120 px` → dismiss (distance threshold)
- `velocity.y > 600 px/s` → dismiss (flick threshold)
- Otherwise → spring back via `settling`

### 7.6 State machine — three-state morph

Drive the surface variant from derived state:

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
// Root of a screen with draggable lists
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";

const sensors = useSensors(
  // Distance constraint — pointer must move 5px before drag starts
  // so taps still register as taps (avoids fighting <PressableButton>)
  useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  // Mobile: 200ms hold before drag — long enough that taps & scrolls still work
  useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 5 },
  }),
);

<DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragStart={() => haptic.drag()}
  onDragEnd={(event) => {
    haptic.select();
    handleReorder(event);
  }}
  onDragCancel={() => haptic.select()}
>
  {/* sortable region */}
</DndContext>
```

**Activation constraints are non-negotiable:**
- Pointer: `distance: 5` — coexists with `<PressableButton>`'s 100ms press-delay
- Touch: `delay: 200` — long-press to lift, otherwise tap goes through

Without these, every tap on a draggable item registers as a drag and `PressableButton` never fires.

### 9.2 Sortable list

```tsx
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableRow({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <motion.div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,                    // use dnd-kit's, NOT motion's, for sorting
      }}
      animate={{ scale: isDragging ? 1.03 : 1 }}
      transition={springs.snappy}
      {...attributes}
      {...listeners}
      className="touch-none"           // disable browser pan so dnd-kit owns the gesture
    >
      {children}
    </motion.div>
  );
}

// Parent
<SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
  {items.map(item => (
    <SortableRow key={item.id} id={item.id}>
      <Card data={item} />
    </SortableRow>
  ))}
</SortableContext>
```

**Critical:** `touch-none` (CSS `touch-action: none`) on the draggable item. Without it, browser pan-y fights the drag.

### 9.3 Drag overlay (clean ghost while dragging)

```tsx
import { DragOverlay } from "@dnd-kit/core";

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

Keeps the dragged item visible above z-index conflicts and adds the "lifted" shadow + scale.

### 9.4 Modifiers (constrain axis or container)

```tsx
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";

<DndContext modifiers={[restrictToVerticalAxis, restrictToParentElement]}>
```

Use `restrictToVerticalAxis` for vertical lists, `restrictToParentElement` to prevent dragging outside a section.

### 9.5 Haptic checkpoints

- `haptic.drag()` on `onDragStart` (lift) — medium impact
- `haptic.select()` when crossing a snap boundary (`onDragOver` fires per item)
- `haptic.select()` on `onDragEnd` (drop)
- `haptic.error()` on `onDragCancel` when dropped outside a valid zone

Be conservative — too many haptics feels jittery. Lift + drop is the minimum.

---

## 10. Accessibility (WCAG 2.2 AA)

Non-negotiable. Every prototype must pass these:

- **Focus-visible** preserved on every `PressableButton`. The component handles this; don't override with `outline: none`.
- **Keyboard nav**: Tab order matches visual order. Sortable lists support arrow-key reorder via dnd-kit's `KeyboardSensor` (add it alongside `PointerSensor`/`TouchSensor` when keyboard reorder is needed).
- **`aria-label`** on every icon-only button (FAB, burger, close, chevron).
- **`aria-expanded`** on cards/sheets that toggle a region.
- **`prefers-reduced-motion`**: gate the bouncy springs (`popping`, `expanding`) — fall back to `{ duration: 0.2, ease: "easeOut" }`. Use a hook:

```ts
// lib/use-reduced-motion.ts
import { useReducedMotion } from "motion/react";

export function useSpring(name: keyof typeof springs) {
  const reduce = useReducedMotion();
  return reduce ? { duration: 0.2, ease: "easeOut" } : springs[name];
}
```

- **Contrast**: foreground (`#111`) on background (`#F3F3F3`) → ratio ≈ 14.5:1 ✓. Muted foreground (`#5D636C`) on white → 6.4:1 ✓. Don't introduce one-off tones that haven't been checked.

---

## 11. State patterns

- **Card expanded state**: live on the card itself (`useState` per row) unless multiple rows need coordination.
- **Sheet open + fullScreen**: two separate `useState`s, derived `animateTo` (§7.6).
- **Form data inside a sheet**: `useReducer` — easier to reset on close.
- **Sortable list order**: `useState<Item[]>`; mutate via `arrayMove(items, oldIndex, newIndex)` from `@dnd-kit/sortable`.
- **No global store.** If two screens need to share data, the prototype is too big — split it.

---

## 12. Mock data

Single source of truth per prototype, e.g. `components/<prototype>/mock-data.ts`. Type-first:

```ts
export type User = {
  id: string;
  shortName: string;        // "Juan… Perez…" with ellipsis placeholders
  fullName: string;         // "Juan Antonio Perez Lopez"
  area: string;
  status: "active" | "inactive";
  assignments: Array<{ id: string; role: string; obra: string }>;
};

export const mockUsers: User[] = [ /* … */ ];
```

Mirror what the eventual backend will return — but only the fields screens use. No persistence, no localStorage, no SwiftData / SQL.

---

## 13. QA acceptance checklist

A screen is done when **every** item below is verified on a real device (not just dev preview screenshots).

### Press feedback
- [ ] Every interactive element wraps `<PressableButton>` — no raw `<button>` or `<div onClick>`.
- [ ] Halo fades in within ~80 ms of touchdown.
- [ ] Halo persists ~120 ms after release before fading.
- [ ] Halo fade-out takes ~180 ms.
- [ ] `onClick` callback fires ~100 ms after release (visible: halo registers before UI changes).
- [ ] Halo color is a muted/darker shade of the button's fill, not a contrast color.
- [ ] No ancestor `overflow: hidden` clips any halo.

### Motion
- [ ] No inline spring values. All transitions reference `springs.<name>`.
- [ ] Open uses `expanding`; close uses `shrinking` or `settling`.
- [ ] Symmetric springs across the same interaction (open/close use mirrored phasing).
- [ ] No `height: auto` motion on expand/collapse — use `grid-template-rows: 0fr → 1fr`.
- [ ] FAB → sheet morph: width grows first, height after `~180 ms` delay.
- [ ] Sheet drag dismisses at `offset.y > 120 px` OR `velocity.y > 600 px/s`; otherwise springs back via `settling`.
- [ ] Cascade staggers at `0.06 s` per child after `0.38 s` from morph start.

### Haptics
- [ ] `haptic.select()` fires on every `onPressStart` (touchdown, not release).
- [ ] `haptic.drag()` on drag start.
- [ ] `haptic.complete()` on confirm / success.
- [ ] `haptic.delete()` before any destructive confirmation.
- [ ] No haptic on hover-style events (web has no hover on touch).

### Drag & drop
- [ ] PointerSensor has `activationConstraint: { distance: 5 }`.
- [ ] TouchSensor has `activationConstraint: { delay: 200, tolerance: 5 }`.
- [ ] Draggable items have `touch-action: none` (`touch-none`).
- [ ] Tapping a draggable item still triggers `<PressableButton>` actions (the drag doesn't swallow taps).
- [ ] `<DragOverlay>` shows a lifted ghost with `scale: 1.05` + shadow.
- [ ] `KeyboardSensor` added when reorder must be keyboard-accessible.

### Accessibility
- [ ] Every icon-only button has `aria-label`.
- [ ] Expandable regions use `aria-expanded`.
- [ ] Focus rings visible on Tab nav; none of the `PressableButton`s suppress them.
- [ ] `prefers-reduced-motion` substitutes `{ duration: 0.2, ease: "easeOut" }` for bouncy springs.
- [ ] Contrast checked for any new tone — no one-off colors.

### Layout
- [ ] Mobile root is `max-w-[402px] mx-auto` with `data-prototype` attribute.
- [ ] No `overflow-hidden` on the root.
- [ ] Bottom action bar is `fixed` outside the scroll container; scroll content has `pb-[160px]`.
- [ ] Force-light tokens applied in the prototype `layout.tsx` (both `--surface-*` and `--color-*`).

### Build
- [ ] `npm run build` passes — all routes prerender as static.
- [ ] No console warnings about layout shift or animation cancellation.
- [ ] No `any` types in committed code.

---

## 14. Anti-patterns (don't do)

- **Don't** inline spring values (`transition={{ stiffness: 320 }}`). Add to `lib/springs.ts` first.
- **Don't** use `layoutId` for morphs between different shapes. Crossfade with `AnimatePresence mode="popLayout"`.
- **Don't** animate `width`/`height` on the same element you're scrolling. Scroll on a static-sized child of the morph surface.
- **Don't** add `overflow-hidden` to a container that wraps `<PressableButton>` — it clips the halo.
- **Don't** put dnd-kit handlers on the sheet surface. dnd-kit is for items; motion's drag is for the sheet.
- **Don't** trust dev preview screenshots for animation timing. Verify on a real device.
- **Don't** reach for `<button>` instead of `<PressableButton>` "just for this one thing." The brand is the 80/180/120 timing.
- **Don't** read `--surface-*` from Tailwind utilities — they generate from `--color-*`. Override both.
- **Don't** persist state. No localStorage, no IndexedDB, no auth. Prototype only.
- **Don't** branch the prototype repo. Everything lives in `adelante-web/app/<prototype>/` and `adelante-web/components/<prototype>/`.

---

## 15. Source references

### Figma (H4 — `v4iOmxL9gzmkZx0KOS5sjR`)

| Screen | nodeId |
|---|---|
| M1 — mobile feed | `209:334` |
| M2 — mobile feed + sheet | `210:365` |
| Icon | `213:526` |
| UO2 — desktop list | `205:1720` |
| UO3 — desktop button armed | `207:2453` |
| UO4 — desktop panel personal | `207:2619` |
| UO5 — desktop panel role | `205:1925` |

Use `mcp__Figma__get_metadata` for structure, `mcp__Figma__get_screenshot` for visual reference. Skip `get_design_context` unless you need code stubs.

### SwiftUI P2 prototype (reference for behavior)

Source of truth for spring/halo/haptic timing, layered animations, and morph phasing. Location: `~/Documents/Xcode/P2/P2/`.

| Concern | SwiftUI file |
|---|---|
| Spring constants | `Motion/Springs.swift` |
| Haptic events | `Haptics/HapticEngine.swift` |
| Press contract | `Components/PressableSquircleStyle.swift` |
| FAB → sheet morph | `Components/BottomActionBar.swift` |
| Sheet body + drag | `Components/NewUserSheet.swift` |
| Card expand pattern | `Components/UserCard.swift` |

### Existing web reference

The adelante-web prototype already implements every pattern above. When in doubt, read it first:

- `adelante-web/components/ui/pressable-button.tsx`
- `adelante-web/components/ui/package-card.tsx` — card expand pattern
- `adelante-web/components/ui/pedir-bar.tsx` — state-machine bar
- `adelante-web/components/control-usuarios/nuevo-usuario-sheet.tsx` — FAB → sheet morph
- `adelante-web/lib/springs.ts`, `adelante-web/lib/haptic.ts`

---

## 16. Quick start for a new screen

```bash
# 1. Verify peer files exist (copy from adelante-web if missing)
ls lib/springs.ts lib/haptic.ts components/ui/pressable-button.tsx

# 2. Create the route
mkdir -p app/<prototype-name>
touch app/<prototype-name>/layout.tsx   # force-light tokens wrapper
touch app/<prototype-name>/page.tsx     # screen

# 3. Create the screen components
mkdir -p components/<prototype-name>
touch components/<prototype-name>/mock-data.ts

# 4. Read the Figma node before writing any UI
#    (use Figma MCP get_metadata + get_screenshot)

# 5. Build & verify
npm run dev
# walk through §13 checklist on a real device

# 6. Deploy
npm run build
npx vercel --prod
```

---

*End of guide. If something here is wrong or ambiguous, update this file before fixing the code — the file is the contract.*
