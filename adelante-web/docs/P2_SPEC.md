---
name: p2-control-de-usuarios
purpose: Reproduce the P2 SwiftUI prototype (Control de Usuarios / H4) as Next.js + motion.dev screens. Drop this file + DESIGN.md + HALOPRESS.md into a new context with the Figma node IDs and you have a full spec.
swift_source: ~/Documents/Xcode/P2/P2/
figma_file: H4 — v4iOmxL9gzmkZx0KOS5sjR
---

# P2 — Control de Usuarios — Next.js port spec

This file is the bridge between the SwiftUI P2 prototype and its Next.js sibling. It lists every screen, component, animation, and edge case **that's specific to P2**. The generic infrastructure (springs, haptics, tokens, press contract, dnd-kit patterns) lives in `DESIGN.md` and `HALOPRESS.md` — read those first, then read this.

## Companion files

- **`DESIGN.md`** — stack, tokens, springs, haptics, dnd-kit, animation primitives, QA checklist. Required.
- **`HALOPRESS.md`** — exact press-feedback values + the `PressableButton` component. Required.
- **`P2_PROMPTS.md`** *(optional)* — chronological prompt history for context on why decisions were made.

If you haven't read those, stop here and read them. This spec assumes the vocabulary in DESIGN.md (`springs.expanding`, `haptic.select()`, `halo.green`) is already in scope.

---

## 1. What P2 is

A single-screen iOS prototype showing a list of employees ("usuarios") with two morphs:

- **M1** — list at rest. Three employee cards on a `#F3F3F3` background. Fixed bottom bar with a Burger button (left) + green FAB (right).
- **M2** — same list, but the FAB has morphed into a bottom sheet titled "Nuevo Usuario" with a personal/rol tab toggle, form rows, and a footer CTA.
- **M2-fullscreen** — the sheet, after the user scrolls inside it, lifts to 100% viewport height.

There is **one screen**. M1, M2, and M2-fullscreen are the same screen in different morph states. The UI never navigates.

### Forced light mode

The prototype is light-mode only. Dark mode would break white-on-white text. Equivalent to SwiftUI's `.preferredColorScheme(.light)`:

```tsx
// app/p2/layout.tsx
<div className="losa-scope" style={{ /* force-light tokens — see DESIGN.md §3.1 */ }}>
  {children}
</div>
```

---

## 2. Layout & viewport

| Property | Value |
|---|---|
| Frame width | 402 px (Figma frame) — `max-w-[402px] mx-auto` |
| Background | `#F3F3F3` (`Color.h4Background`) |
| Card horizontal margin | **14 px** from frame edge |
| Card vertical spacing | **16 px** between cards |
| Scroll top padding | 24 px |
| Scroll bottom padding | **160 px** (room for the fixed bottom bar) |
| Bottom bar safe area | Fixed at bottom; the bar itself is ~80 px tall + ~24 px below |

The root `<main>` must have `data-prototype` (picks up `user-select: none`, `touch-action: manipulation`, `overscroll-behavior-y: contain` from globals.css).

**Never** apply `overflow-hidden` to the root — clips press halos on the fixed FAB/Burger.

---

## 3. Component inventory

All sizes are in pixels. All colors reference DESIGN.md §3.2.

### 3.1 `UserCard`

White rounded card. Two states.

| Spec | Value |
|---|---|
| Background | white (`#FFFFFF`) |
| Corner radius | 24 px |
| Padding (inner) | 20 px all sides |
| Width | Fills container (`100%`) |
| Collapsed height | ~90 px |
| Expanded height | ~480 px (grows by content) |

**Collapsed layout** (single HStack):

```
[ shortName text ]  ........spacer........  [ ✓ icon ]  [ ChevronToggle ]
```

- `shortName` — `Text` at `20px / semibold` (Roboto), `#000`, `lineLimit(1)`
- `✓ icon` — `checkmark.circle.fill` (Phosphor `CheckCircle weight="fill"`), 24 px, `#000`. **Only renders when `user.isCompleted === true`**.
- `ChevronToggle` — see §3.4, **collapsed variant** (60×56, direction `bidirectional` → ▲▼)

**Expanded layout** (VStack):

```
Row 1:  [ Activo pill ]  ........spacer........  [ ChevronToggle ▼ ]
Row 2:  [ fullName text (big) ]
Row 3:  Area  ........ Producción
Row 4:  Rol   ........ Ingeniero
Row 5:  │ (vertical connector)
Row 6:  Obras ........ Casa Bosque ›
Row 7:  Rol   ........ Visor
Row 8:  │
Row 9:  Obras ........ Edificio Centro
```

- `fullName` — `Text` at `22px / bold`, `#000`, `lineLimit(2)`.
- `ChevronToggle` — **expanded variant** (60×56, direction `down` → ▼ only)
- The check icon is gone; the Activo pill (matched-geometry-linked, see §4.2) sits where the check was.

**Interaction:**
- Tap anywhere on a collapsed card → expands, fires `haptic.select()` on touchdown
- Tap the ▼ chevron when expanded → collapses
- The whole card surface is the tap target when collapsed; only the chevron is a tap target when expanded (so the user can scroll detail content without accidentally collapsing).

### 3.2 `StatusPill`

The "Activo" badge that appears at top-left when a card is expanded.

| Spec | Value |
|---|---|
| Background (active) | `#000` |
| Foreground (active) | `#FFFFFF` |
| Background (inactive) | `rgba(0,0,0,0.08)` |
| Foreground (inactive) | `#5D636C` |
| Text | "Activo" / "Inactivo", `13px / semibold`, tracking 0.4 |
| Padding | H 10, V 6 |
| Corner radius | 999 (full pill) |
| Leading icon | small `✓` 11 px when active (white), none when inactive |

Used **only** in the expanded UserCard for now. Sized for the matched-geometry growth from the collapsed check icon's frame.

### 3.3 `TagPill`

Used in `NewUserSheet` for option chips ("Personal", "Rol", area/obras pickers). Outlined variant by default; filled when selected.

| Variant | Background | Border | Text |
|---|---|---|---|
| Outlined (default) | transparent | 1 px `#AAAFB6` | `#5D636C` `13px / semibold` |
| Selected | `#000` | none | `#FFFFFF` `13px / semibold` |
| With chevron | + trailing `chevron.down` (12 px) | | |

Padding H 12, V 8, corner radius 999. Only one chevron on pills that open a picker.

### 3.4 `ChevronToggleButton`

The circular toggle on the right side of the card. Two sizes:

| Variant | Width × Height | Corner radius | Icon | Halo |
|---|---|---|---|---|
| `.card` (collapsed) | 60 × 56 | 14 | `chevron.up.chevron.down` (▲▼ stacked, 16 px) | `halo.white` |
| `.card` (expanded) | 60 × 56 | 14 | `chevron.down` only (▼, 16 px) | `halo.white` |
| `.fab` (bottom bar) | 84 × 80 | 24 | `plus` 26 px **OR** sheet-specific icon | `halo.green` |
| `.burger` (bottom bar) | 84 × 80 | 24 | `line.3.horizontal` (Phosphor `List`) 24 px | `halo.black` |

Background: white (card chevron), green (FAB), charcoal `#1C1C1C` (burger).

All four are `<PressableButton>` instances (see HALOPRESS.md). Fire `haptic.select()` on `onPressStart`.

### 3.5 `AttributeRow`

Generic label/value row used in the expanded card AND inside the sheet.

```
[ Label ]      spacer       [ Value text ]  [ optional ›  chevron ]
```

| Spec | Value |
|---|---|
| Label | `13px / regular`, `#5D636C` |
| Value | `16px / semibold`, `#000` |
| Chevron | `chevron.right` 14 px, `#5D636C` — only when `hasChevron: true` |
| Row height | 32–40 px (content sizes) |

### 3.6 `ConnectorLine`

The vertical hairline between Rol/Obras pairs inside a card.

- Width: 1 px
- Height: ~14 px
- Color: `#AAAFB6` (`h4Gray300`)
- Margin: leading 0 (aligns with label column), top 2, bottom 2

### 3.7 `BottomActionBar`

Fixed at the bottom. Holds the Burger button on the left and the morphing FAB on the right. **The FAB doesn't live inside this bar visually** — it's the morphing surface that becomes the sheet, so it lives in its own layer above the bar (z-stacked).

Two stacked layers:

1. **Burger button** — `84×80`, charcoal, fixed bottom-left at `left: 16, bottom: 24`.
2. **Morphing surface** — initially `84×80` green FAB at `right: 16, bottom: 24`. Animates through three states (see §5).

Important: the Burger slides leftward and out-of-frame as the morph surface widens during open. Not unmounted — translated.

### 3.8 `NewUserSheet`

Content of the sheet. Visible only when the morph surface has reached its "sheet" state.

Three sections in a vertical layout:

```
┌─────────────────────────────────────┐
│  [grip]  Nuevo Usuario          [×] │  ← header — 64 px tall, drag-handle here
├─────────────────────────────────────┤
│  [ Personal ]  [    Rol    ]        │  ← tab toggle — 50/50 split, 44 px tall
├─────────────────────────────────────┤
│  Scroll area:                       │
│    Nombre        ___________        │
│    Cédula        ___________        │
│    Contacto      ___________        │
│    Area          [Producción ▾]     │
│    Rol           [Ingeniero ▾]      │
│    Obras         [Casa Bosque ▾]    │
│    ...                              │
├─────────────────────────────────────┤
│  [↶ back]      [  Crear usuario  ]  │  ← footer — 80 px tall, sticky
└─────────────────────────────────────┘
```

| Section | Specs |
|---|---|
| Header | 64 px tall; grip = 36×4 rounded pill `#AAAFB6` centered horizontally; title `20px / semibold`; close = circular `<PressableButton>` 44×44, halo.white, `X` icon 16 px |
| Tab toggle | 50/50 width split; active tab `#000` bg / `#FFFFFF` text; inactive transparent / `#5D636C` text; corner radius 12; padding 4 around toggle, 12 between text and tab edge |
| Scroll area | `padding: 16 20`; rows are `AttributeRow` variants or `TagPill` selectors; uses native scroll, hysteresis-tracked for fullscreen lift (§5.4) |
| Footer | Sticky bottom; back button circular `<PressableButton>` 60×60 halo.white with `arrow.uturn.left` 18 px; CTA `<PressableButton>` flex-1 80px tall green w/ `Crear usuario` `16px / semibold` white + chevron right |

Background: white. Corner radius: 24 px top corners only when in "open" state; all 4 corners when transitioning to fullscreen drop to 0.

**Drag handle**: the entire header section (grip + title + close button row, except the close button itself) is draggable. See §4.4.

---

## 4. Animations specific to P2

The generic primitives (`springs.expanding`, etc.) come from DESIGN.md. This section is the P2-specific *application* of them.

### 4.1 Card expand / collapse + cascade

Use the grid-template-rows pattern from DESIGN.md §7.1 with these specific numbers:

```tsx
<div
  style={{
    display: "grid",
    gridTemplateRows: isExpanded ? "1fr" : "0fr",
    transition: "grid-template-rows 420ms cubic-bezier(0.22, 1, 0.36, 1)",
  }}
>
  <div style={{ overflow: "hidden", minHeight: 0 }}>
    {/* expanded content */}
  </div>
</div>
```

**Cascade indices** (per-row delay from card-open start, applied to each row's `opacity` + `y` animation):

| Row | Index | Delay (open) | Delay (close) |
|---|---|---|---|
| Area | 0 | `0.06 + 0×0.05 = 0.06 s` | `0×0.03 = 0 s` |
| Rol (1st assignment) | 1 | `0.06 + 1×0.05 = 0.11 s` | `1×0.03 = 0.03 s` |
| Connector | 2 | `0.16 s` | `0.06 s` |
| Obras (1st) | 3 | `0.21 s` | `0.09 s` |
| Rol (2nd) | 4 | `0.26 s` | `0.12 s` |
| Connector | 5 | `0.31 s` | `0.15 s` |
| Obras (2nd) | 6 | `0.36 s` | `0.18 s` |

Per row:

```tsx
<motion.div
  initial={false}
  animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 4 }}
  transition={{
    duration: isExpanded ? 0.32 : 0.16,
    ease: "easeOut",
    delay: isExpanded ? 0.06 + idx * 0.05 : idx * 0.03,
  }}
>
  {rowContent}
</motion.div>
```

### 4.2 Activo pill ↔ check icon — coordinated crossfade

**Do NOT use `layoutId`.** Different shapes (small circle ↔ wider pill) → use `<AnimatePresence mode="popLayout">` with offset + scale.

```tsx
<AnimatePresence initial={false} mode="popLayout">
  {isExpanded ? (
    <motion.div
      key="activo"
      initial={{ opacity: 0, scale: 0.85, x: 8 }}
      animate={{ opacity: 1, scale: 1,   x: 0 }}
      exit={{    opacity: 0, scale: 0.85, x: 8 }}
      transition={springs.popping}        // bouncy "snaps in"
    >
      <StatusPill status="active" />
    </motion.div>
  ) : (
    <motion.div
      key="check"
      initial={{ opacity: 0, scale: 0.6, rotate: 90 }}
      animate={{ opacity: 1, scale: 1,   rotate: 0 }}
      exit={{    opacity: 0, scale: 0.6, rotate: 90 }}
      transition={springs.expanding}
    >
      <CheckCircle weight="fill" size={24} />
    </motion.div>
  )}
</AnimatePresence>
```

The check **rotates 90°** + scales 0.6 + fades on exit. The pill **enters from x: +8** + scale 0.85 + fades. Run them simultaneously and it reads as one transform.

### 4.3 Name transition (truncated → full)

**Two Text elements with simple scale+fade transitions.** We tried four other approaches (matched geometry, single-Text-with-content-morphing, custom `Animatable` typewriter, sizer-based reservation) and reverted. **Don't reintroduce typewriter logic** — it flickers at line-wrap boundaries and the gain is not worth the complexity.

```tsx
<AnimatePresence initial={false} mode="popLayout">
  {!isExpanded ? (
    <motion.span
      key="short"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{    opacity: 0, scale: 0.85 }}
      transition={springs.expanding}
      style={{ fontSize: 20, fontWeight: 600, color: "#000" }}
    >
      {user.shortName}      {/* "Juan… Perez…" */}
    </motion.span>
  ) : null}
</AnimatePresence>

{/* In expandedDetails: */}
<AnimatePresence initial={false}>
  {isExpanded ? (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{    opacity: 0, scale: 0.85 }}
      transition={springs.expanding}
      style={{ fontSize: 22, fontWeight: 700, color: "#000" }}
    >
      {user.fullName}       {/* "Juan Antonio Perez Lopez" */}
    </motion.div>
  ) : null}
</AnimatePresence>
```

Short = fades+shrinks out, full = fades+grows in. The two live in different layout positions (header vs. expanded section); the user reads it as "the name moved and grew."

### 4.4 FAB → bar → sheet — two-phase morph

The morphing surface is **one** `motion.div` with a variants object. Width grows first (horizontal pill), then height (sheet rises). Symmetric reverse on close.

```tsx
const surfaceVariants = {
  collapsed: {
    width: 84, height: 80, right: 16, bottom: 24,
    backgroundColor: "#ADD010", borderRadius: 24,
    transition: {
      // Close: vertical collapses first, then horizontal — REVERSE of open
      width:        { delay: 0.18, ...springs.shrinking },
      right:        { delay: 0.18, ...springs.shrinking },
      height:       { ...springs.shrinking },
      bottom:       { ...springs.shrinking },
      borderRadius: { ...springs.shrinking },
      backgroundColor: { duration: 0.28 },
    },
  },
  bar: {
    // Intermediate state: wide pill at the bottom, not yet risen.
    // Used during the close animation's first phase, so the sheet
    // contracts to this pill before becoming the FAB.
    width: "calc(100% - 32px)", height: 80, right: 16, bottom: 24,
    backgroundColor: "#FFFFFF", borderRadius: 24,
    transition: springs.expanding,
  },
  sheet: {
    width: "100%", height: "75vh", right: 0, bottom: 0,
    backgroundColor: "#FFFFFF", borderRadius: 24,    // top-only via clipPath, see below
    transition: {
      width:        { ...springs.expanding },                  // phase 1 — horizontal
      right:        { ...springs.expanding },
      height:       { delay: 0.18, ...springs.expanding },     // phase 2 — vertical
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
};
```

**State machine** — derive variant from two booleans:

```tsx
const [isOpen, setIsOpen]           = useState(false);
const [isFullScreen, setIsFullScreen] = useState(false);

const variant = !isOpen
  ? "collapsed"
  : isFullScreen
    ? "fullScreen"
    : "sheet";
```

**Reverse close (the tricky bit — 8 attempts in the SwiftUI version):**

Don't go directly from `sheet` → `collapsed`. Two-phase:

```tsx
function close() {
  haptic.select();
  // Phase 1: sheet shrinks DOWN to bar (white pill at bottom, height collapses)
  setIsOpen(false);  // triggers transition from sheet → collapsed
  // The surfaceVariants close transition delays width/right/bg-color by 180ms
  // so the height collapses first, then the bar contracts horizontally into
  // the FAB, then the color shifts to green. ALL ONE withAnimation block.
}
```

Round corners only on the top during the `sheet` state. Two approaches:

- (Simpler) Set `borderTopLeftRadius` + `borderTopRightRadius` to 24 and the bottom ones to 0 via separate animatable properties.
- (Cleaner) `clip-path: inset(0 round 24px 24px 0 0)` — animate the inset values directly.

**Burger slide-out:**

```tsx
<motion.div
  animate={{ x: variant === "collapsed" ? 0 : -100 }}
  transition={springs.expanding}
>
  <BurgerButton />
</motion.div>
```

Slides leftward and off-screen as the surface widens; reverses on close.

**Sheet contents (`NewUserSheet`) mounts when `variant !== "collapsed"`** — kept mounted during close so the white-to-green color morph applies to the existing element rather than mounting a green pill underneath a disappearing white sheet.

### 4.5 Drag-to-dismiss (sheet handle)

Motion's drag on the surface — NOT dnd-kit. Drag handle = the header section (the title row).

```tsx
<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 0 }}
  dragElastic={{ top: 0, bottom: 0.5 }}
  onDragStart={() => haptic.drag()}
  onDragEnd={(_, info) => {
    if (isFullScreen) {
      // Two-step descent: fullscreen → sheet first, sheet → collapsed only on
      // a second drag. Stops "one giant pull collapses everything."
      if (info.offset.y > 100 || info.velocity.y > 500) {
        setIsFullScreen(false);
        haptic.select();
      }
      return;
    }
    // From sheet state:
    if (info.offset.y > 120 || info.velocity.y > 600) {
      close();   // sheet → collapsed (full reverse morph)
    }
    // else: snap back via settling — handled by drag's built-in elastic spring
  }}
  variants={surfaceVariants}
  animate={variant}
>
```

**Thresholds (testable):**

| State | Distance to dismiss | Velocity to dismiss |
|---|---|---|
| `fullScreen` → `sheet` | `offset.y > 100 px` | `velocity.y > 500 px/s` |
| `sheet` → `collapsed` | `offset.y > 120 px` | `velocity.y > 600 px/s` |

Otherwise: `dragElastic` springs back via motion's built-in spring (or override with `springs.settling`).

### 4.6 Scroll-to-fullscreen

The sheet body has its own scroll. When the user scrolls down within it, the sheet lifts to `100vh`. When they scroll back to top, it returns to `75vh`.

Hysteresis: 12 px to enter fullscreen, 2 px to exit. Prevents flapping.

```tsx
useEffect(() => {
  const el = bodyRef.current;
  if (!el || !isOpen) return;
  const onScroll = () => {
    const top = el.scrollTop;
    setIsFullScreen((prev) => {
      if (!prev && top > 12) return true;
      if (prev && top <= 2)  return false;
      return prev;
    });
  };
  el.addEventListener("scroll", onScroll, { passive: true });
  return () => el.removeEventListener("scroll", onScroll);
}, [isOpen]);
```

**Header fade in fullscreen** — a top fade gradient appears when the user has scrolled past the top:

```tsx
<motion.div
  aria-hidden
  initial={false}
  animate={{ opacity: isFullScreen ? 1 : 0 }}
  transition={{ duration: 0.2 }}
  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6"
  style={{ background: "linear-gradient(to bottom, #fff, transparent)" }}
/>
```

---

## 5. Mock data shape

Single source. No persistence. Mirror the SwiftUI struct.

```ts
// components/p2/mock-data.ts

export type User = {
  id: string;
  shortName: string;        // truncated form: "Juan… Perez…" (Unicode …)
  fullName: string;         // "Juan Antonio Perez Lopez"
  status: "active" | "inactive";
  area: string;             // "Producción"
  assignments: Array<{
    id: string;
    role: string;           // "Ingeniero"
    obras: string;          // "Casa Bosque"
    obrasHasChevron: boolean;
  }>;
  isExpanded: boolean;      // local UI state, but sample 2 starts true
  isCompleted: boolean;     // drives the check icon
};

export const sampleUsers: User[] = [
  {
    id: "u1",
    shortName: "Juan… Perez…",
    fullName: "Juan Antonio Perez Lopez",
    status: "active",
    area: "Producción",
    assignments: [
      { id: "a1", role: "Ingeniero", obras: "Casa Bosque",     obrasHasChevron: true  },
      { id: "a2", role: "Visor",     obras: "Edificio Centro", obrasHasChevron: false },
    ],
    isExpanded: false,
    isCompleted: true,
  },
  {
    id: "u2",
    shortName: "Juan… Perez…",
    fullName: "Juan Alberto Perez Medina",
    status: "active",
    area: "Producción",
    assignments: [
      { id: "a3", role: "Ingeniero", obras: "Viviendas",       obrasHasChevron: true  },
      { id: "a4", role: "Visor",     obras: "Infraestructura", obrasHasChevron: false },
    ],
    isExpanded: true,           // pre-expanded to match the M1 frame
    isCompleted: true,
  },
  {
    id: "u3",
    shortName: "Juan… Perez…",
    fullName: "Juan Manuel Perez Cruz",
    status: "active",
    area: "Construcción",
    assignments: [
      { id: "a5", role: "Supervisor", obras: "Torre Norte", obrasHasChevron: false },
    ],
    isExpanded: false,
    isCompleted: true,
  },
];
```

The `shortName` template uses Unicode `…` (single character, `U+2026`), not three dots.

---

## 6. File map (suggested)

```
adelante-web/
├── app/p2/
│   ├── layout.tsx                 # force-light tokens (DESIGN.md §3.1)
│   └── page.tsx                   # the only screen
│
├── components/p2/
│   ├── mock-data.ts               # §5
│   ├── user-card.tsx              # §3.1, §4.1, §4.2, §4.3
│   ├── status-pill.tsx            # §3.2
│   ├── tag-pill.tsx               # §3.3
│   ├── chevron-toggle.tsx         # §3.4 — wraps PressableButton
│   ├── attribute-row.tsx          # §3.5
│   ├── connector-line.tsx         # §3.6
│   ├── bottom-action-bar.tsx      # §3.7, §4.4 — owns surfaceVariants
│   └── nuevo-usuario-sheet.tsx    # §3.8, §4.5, §4.6
│
├── components/ui/                 # shared (DESIGN.md / HALOPRESS.md)
│   └── pressable-button.tsx
│
└── lib/                           # shared
    ├── springs.ts
    └── haptic.ts
```

---

## 7. State machine — the whole screen

```tsx
// app/p2/page.tsx
"use client";

import { useState } from "react";
import { sampleUsers, type User } from "@/components/p2/mock-data";
import { UserCard } from "@/components/p2/user-card";
import { BottomActionBar } from "@/components/p2/bottom-action-bar";
import { NuevoUsuarioSheet } from "@/components/p2/nuevo-usuario-sheet";

export default function P2Page() {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const variant = !isOpen ? "collapsed" : isFullScreen ? "fullScreen" : "sheet";

  return (
    <main data-prototype className="relative mx-auto max-w-[402px] min-h-screen">
      {/* Feed */}
      <div className="flex flex-col gap-4 px-[14px] pt-6 pb-[160px]">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onChange={(next) => setUsers((u) => u.map(x => x.id === user.id ? next : x))}
          />
        ))}
      </div>

      {/* Dim layer — visible only when sheet is open AND not fullscreen */}
      <motion.div
        aria-hidden
        initial={false}
        animate={{ opacity: variant === "sheet" ? 0.5 : 0 }}
        transition={{ duration: 0.28 }}
        className="fixed inset-0 z-30 bg-black"
        style={{ pointerEvents: variant === "sheet" ? "auto" : "none" }}
        onClick={() => {
          if (variant === "sheet") setIsOpen(false);
        }}
      />

      {/* Bottom bar + morphing surface */}
      <BottomActionBar
        variant={variant}
        onOpen={() => setIsOpen(true)}
        onClose={() => { setIsOpen(false); setIsFullScreen(false); }}
        onBurger={() => { /* placeholder — no-op or open a placeholder sheet */ }}
        isFullScreen={isFullScreen}
        setIsFullScreen={setIsFullScreen}
      >
        {/* Sheet contents render inside the morph surface so the bg color
            morphs with the same element, NOT mounted/unmounted */}
        {variant !== "collapsed" && (
          <NuevoUsuarioSheet
            variant={variant}
            onClose={() => { setIsOpen(false); setIsFullScreen(false); }}
            isFullScreen={isFullScreen}
            setIsFullScreen={setIsFullScreen}
          />
        )}
      </BottomActionBar>
    </main>
  );
}
```

**Critical:** `NuevoUsuarioSheet` mounts when `variant !== "collapsed"` (sheet OR fullScreen). It stays mounted during the close animation so the surface's `backgroundColor` morph from white → green plays on the existing element, not on a phantom layer.

---

## 8. Lessons learned (DO NOT repeat)

These are the rakes the SwiftUI build stepped on. Save yourself the rounds:

### 8.1 White-sheet → green-bar morph

8 attempts to land. The winning approach:

- ONE `motion.div` is the entire morph surface.
- `backgroundColor`, `width`, `height`, `borderRadius`, `right`, `bottom` are all animated on the SAME element.
- Sheet content (`NuevoUsuarioSheet`) lives **inside** that motion.div, with its own fade-out so the inner text doesn't survive the bg color morph.
- On close, the surface delays its width/right collapse by 180 ms so the height drops FIRST, then the horizontal pill contracts into the FAB, then the color shifts green. NOT all simultaneous.

Wrong approaches we tried:

- ❌ Two stacked rectangles cross-fading — looked transparent mid-morph
- ❌ Green base always opaque + white overlay opacity — felt like a pop
- ❌ Single shape, `fill(color)` interpolated — color sometimes didn't animate
- ❌ Sheet unmounted before surface morph completed — color jumped instead of crossfading

### 8.2 Name transition (truncated → full)

After 9 attempts at typewriter effects (5 in one session) — **don't try to type letters in.** The flicker between 1-line and 2-line wrap during character changes is unavoidable in SwiftUI/React without painful precalculation. We reverted to two separate Text views with simple scale+fade transitions (§4.3). Live with it.

### 8.3 Drag flicker

The sheet flickering during drag was caused by the sheet's React component re-rendering on every drag tick (because the `dragYOffset` prop was a `@Binding` / a stateful prop). Fix: make the sheet a memoized component and drive the drag offset via a transform on a wrapper, not via re-rendering the sheet body. In motion.dev terms: the `drag` prop on the wrapper `motion.div` is fine; just don't pipe the drag offset into a state setter that retriggers React renders.

### 8.4 Drag while pressed-state lingers

If the user starts a drag from inside a `<PressableButton>` (e.g., dragging starting from the close button), the press state would never release. Fix: PointerCapture in `PressableButton` (already in HALOPRESS.md component), plus `onPointerLeave → setPressed(false)` so dragging off the button cancels both the halo and the click.

### 8.5 Dark mode

Force light mode at the route layer. Without it, default `Text` foreground adapts to system theme — on a white card in dark mode that becomes white-on-white. Tokens override in `app/p2/layout.tsx` (see DESIGN.md §3.1).

### 8.6 dnd-kit not used here

P2 has no draggable lists or reorderable items. dnd-kit is **not** a dependency for this prototype. The only "drag" is the sheet dismissal, which uses motion's drag (§4.5). Don't import @dnd-kit.

---

## 9. P2-specific QA checklist

In addition to the generic checklist in DESIGN.md §13, verify these P2-specific behaviors on a real device:

### Cards
- [ ] Tapping a collapsed card expands it; tapping the ▼ chevron when expanded collapses it
- [ ] Tapping the card body when expanded does **not** collapse (only the chevron does)
- [ ] Check icon (when `isCompleted: true`) is visible only when collapsed
- [ ] Activo pill (expanded) and check icon (collapsed) share the same on-screen position — the pill grows out of the check's frame (`mode="popLayout"` crossfade, not `layoutId`)
- [ ] Cascade plays top-down on open (Area → Rol → Connector → Obras → Rol → Connector → Obras), 0.05 s between rows
- [ ] Close cascade plays faster (0.03 s/row) and in the same order
- [ ] `shortName` (truncated) fades + shrinks on exit; `fullName` fades + grows on enter (no typewriter, no matched geometry)

### FAB → sheet morph
- [ ] Tap FAB → first the width grows to fill (~180 ms), then the height rises (`bottom: 24` → `0`, `height: 80` → `75vh`)
- [ ] Background goes green → white during the morph
- [ ] Sheet cascade content appears ~380 ms after morph start (`staggerChildren: 0.06`)
- [ ] Close from sheet: height collapses FIRST, then the bar contracts horizontally to the right, then color shifts green — not all at once
- [ ] Burger button slides left by 100 px when the morph surface widens; slides back on close
- [ ] Dim overlay (50% black) appears when `variant === "sheet"`; tap-to-dismiss works
- [ ] Dim overlay does **not** appear when `variant === "fullScreen"` (sheet covers it)

### Sheet behavior
- [ ] Scrolling inside the sheet past 12 px lifts it to fullscreen (`height: 100vh`, `borderRadius: 0`)
- [ ] Scrolling back to top within 2 px returns to `sheet` state
- [ ] Top fade gradient appears only in fullScreen
- [ ] Drag the header section down — surface follows finger with elastic resistance
- [ ] Release at `offset.y > 120` OR `velocity.y > 600` from `sheet` → closes to FAB
- [ ] Release at `offset.y > 100` OR `velocity.y > 500` from `fullScreen` → returns to `sheet` (not all the way to FAB)
- [ ] Close button (X) in header dismisses to FAB via the same two-phase reverse as the bottom-up morph (i.e., identical to a successful drag-to-dismiss)

### Press / haptic
- [ ] Every interactive element (cards, chevron, burger, FAB, close, back, CTA, tab toggle, area/obras pickers) uses `<PressableButton>` with the right `haloColor` for its fill
- [ ] `haptic.select()` fires on every `onPressStart`
- [ ] `haptic.drag()` fires on sheet drag start
- [ ] No raw `<button>` or `<div onClick>` anywhere

---

## 10. Figma reference (H4)

File key: `v4iOmxL9gzmkZx0KOS5sjR`

| Screen | nodeId |
|---|---|
| M1 — feed at rest | `209:334` |
| M2 — feed + sheet | `210:365` |
| Icon (app icon) | `213:526` |

Use Figma MCP:
- `mcp__Figma__get_screenshot` for visual reference
- `mcp__Figma__get_metadata` for layer structure / exact positions
- Skip `get_design_context` (it generates code stubs for native, not useful here)

---

## 11. SwiftUI source map (for cross-checking values)

Location: `~/Documents/Xcode/P2/P2/`

| Concern | SwiftUI file | Section here |
|---|---|---|
| Spring constants | `Motion/Springs.swift` | DESIGN.md §5 |
| Haptic events | `Haptics/HapticEngine.swift` | DESIGN.md §4 |
| Press contract | `Components/PressableSquircleStyle.swift` | HALOPRESS.md |
| User card | `Components/UserCard.swift` | §3.1, §4.1–4.3 |
| Status pill | `Components/StatusPill.swift` | §3.2 |
| Tag pill | `Components/TagPill.swift` | §3.3 |
| Chevron toggle | `Components/ChevronToggleButton.swift` | §3.4 |
| Bottom bar + morph | `Components/BottomActionBar.swift` | §3.7, §4.4 |
| Sheet content + drag | `Components/NewUserSheet.swift` | §3.8, §4.5, §4.6 |
| Mock data | `Mocks/MockData.swift` | §5 |
| Screen composition | `Screens/UserListScreen.swift` | §7 |

When a value in this spec contradicts the SwiftUI source, **the SwiftUI source wins** — update this file and re-run the QA checklist.

---

*End of P2 spec. Pair with DESIGN.md + HALOPRESS.md and you have everything needed to rebuild the prototype on Next.js.*
