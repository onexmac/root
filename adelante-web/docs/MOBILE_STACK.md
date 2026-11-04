# Control de Usuarios — Mobile Prototype (M1/M2) Dev Stack

Reference for another Claude / engineer continuing the mobile prototype. Same conventions for the desktop one (`/control-usuarios/desktop`); the only difference is layout + the morph axis.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) — TypeScript, server components disabled per route via `"use client"` |
| Styling | Tailwind CSS v4 with `@theme` tokens in `app/globals.css` |
| Motion | `motion` (a.k.a. `motion.dev`, formerly framer-motion) — import from `motion/react` |
| Icons | `@phosphor-icons/react` — `regular` / `bold` / `fill` weights |
| Theming | `next-themes` (class-based dark mode on `<html>`) — overridden to light inside `/control-usuarios/*` |
| Class util | `clsx` + `tailwind-merge` via `cn()` (`lib/utils.ts`) |
| Deploy | Vercel — `npx vercel --prod --scope onexmacs-projects` |

No backend, no TanStack Query — this is a prototype. State is all local `useState` / `useReducer`.

---

## Project layout

The prototype lives **inside `adelante-web`** as a route group. Do NOT spin up a new Next app.

```
adelante-web/
├── app/
│   ├── globals.css                      # Token definitions (read-only)
│   ├── layout.tsx                       # Geist font, next-themes provider
│   └── control-usuarios/
│       ├── layout.tsx                   # 🔑 forces LIGHT tokens for this route group
│       ├── mobile/page.tsx              # M1/M2 entry
│       └── desktop/page.tsx             # UO2–UO5 entry
│
├── components/
│   ├── ui/                              # ⭐ THE library — reuse from here, do not reinvent
│   │   ├── pressable-button.tsx         # PressableButton + PressableSlot + halo palette
│   │   ├── checkbox-mark.tsx
│   │   ├── package-card.tsx             # Pattern reference for expandable cards
│   │   ├── pedir-bar.tsx                # Pattern reference for state-machine bars
│   │   ├── slide-to-confirm.tsx
│   │   ├── quantity-slider.tsx
│   │   ├── material-badge.tsx
│   │   └── material-list-item.tsx
│   └── control-usuarios/                # Screens for THIS prototype, composed of ui/
│       ├── mock-data.ts
│       ├── worker-card.tsx              # M1 card (collapsed + expanded)
│       ├── nuevo-usuario-sheet.tsx      # M2 morph (FAB → bottom sheet)
│       ├── desktop-sidebar.tsx
│       ├── desktop-users-table.tsx
│       └── desktop-morph-surface.tsx    # UO2 → UO5 morph (FAB → right side panel)
│
├── lib/
│   ├── springs.ts                       # 🔑 named transitions — never inline values
│   ├── haptic.ts                        # Web Vibration vocabulary (silent on iOS Safari)
│   └── utils.ts                         # cn() helper
│
└── docs/MOBILE_STACK.md                 # This file
```

---

## The two non-negotiables

### 1. `lib/springs.ts` — named motion vocabulary

Never write `transition={{ stiffness: 320, damping: 28 }}` inline. Pick by **meaning**:

```ts
export const springs = {
  snappy:     { type: 'spring', stiffness: 450, damping: 32 },  // tap response
  completing: { type: 'spring', stiffness: 320, damping: 26 },  // confirm, check (slight overshoot)
  deleting:   { type: 'spring', stiffness: 520, damping: 24 },  // remove, warning
  expanding:  { type: 'spring', stiffness: 220, damping: 24 },  // reveal, open, card grow
  settling:   { type: 'spring', stiffness: 170, damping: 28 },  // return to rest
  shrinking:  { type: 'spring', stiffness: 280, damping: 36 },  // shrink without overshoot
  popping:    { type: 'spring', stiffness: 450, damping: 20 },  // bouncy pop-in (menu pills)
};
```

If you need a new motion that doesn't fit, **add a new name** here. Never reach for an inline value.

### 2. `components/ui/pressable-button.tsx` — every interactive element

Every button — FAB, toggle, tab, CTA, sidebar nav — is `<PressableButton>`. Halo behavior matches the SwiftUI `PressableSquircleStyle` to the millisecond:

- Press-in:  halo opacity 0 → 1, ease-out, **80 ms**
- Release:   halo opacity 1 → 0, ease-out, **180 ms**, **delayed 120 ms** (so brief taps stay legible)
- `pressDelayMs = 100` — onClick fires 100ms after release so the halo registers visually before the UI changes

```tsx
import { PressableButton, halo } from '@/components/ui/pressable-button';

<PressableButton
  cornerRadius={20}                              // tracks the button's visible shape
  haloColor={halo.green}                         // .green / .black / .white
  onPressStart={() => haptic.select()}           // haptic on touchdown
  onClick={() => setOpen(true)}                  // fires after pressDelayMs
  style={{ width: 84, height: 80, background: '#ADD010' }}
  aria-label="Crear usuario"
>
  <Plus size={26} weight="bold" />
</PressableButton>
```

**Container caveat:** the halo sits OUTSIDE the button via `inset: -haloWidth/2`. If an ancestor has `overflow: hidden`, the halo gets clipped. Two fixes:

1. Remove `overflow-hidden` if it's not needed.
2. Wrap with `<PressableSlot>` (provided in the same file) — adds `haloWidth/2` padding + negative margin so the halo breathes without affecting layout.

---

## Tokens (forced light for this prototype)

`adelante-web` runs dark by default (`<html class="dark">` via next-themes). The Losa Flotante design is **light**. Solution: `app/control-usuarios/layout.tsx` is a wrapper that overrides every token inline:

```tsx
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
    color: "rgb(17, 17, 17)",        // ← inherited by descendants (body has dark color)
    background: "rgb(243, 243, 243)",
    minHeight: "100vh",
  }}
>
  {children}
</div>
```

**Why both `--surface-*` and `--color-*`:** Tailwind v4's `@theme inline` generates utilities like `bg-card` that resolve to `var(--color-card)` at render time. Overriding only `--surface-card` doesn't help — must override the `--color-*` Tailwind reads.

**Losa Flotante palette** (use raw values where tokens don't fit):

```
Charcoal (sidebar, table header):  #1c1c1c
Brand green (FAB, "Crear usuario"): #ADD010
Halo green (press ring on brand):   rgb(133, 166, 41) (halo.green)
Halo black (press ring on charcoal): rgb(140, 140, 140) (halo.black)
Halo white (press ring on white):   rgb(209, 209, 209) (halo.white)
Active pill:  bg-black text-white
Inactive pill: bg-foreground/15 text-muted-foreground
Outline pill: ring-1 ring-foreground/15 text-muted-foreground
```

---

## Animation patterns

### Card expand/collapse — CSS `grid-template-rows` trick (smoothest)

Used in `WorkerCard`. Motion's `height: auto` jitters; CSS grid interpolating `0fr → 1fr` is buttery and browser-native:

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
        delay: isExpanded ? 0.12 : 0,   // reveal "after" the grow
      }}
    >
      {/* content */}
    </motion.div>
  </div>
</div>
```

### Crossfade WITHOUT `layoutId`

`layoutId` morphs bounding boxes but fights when two elements compete or differ wildly in size. For the check ↔ Activo tag transform in `WorkerCard`, use `<AnimatePresence mode="popLayout">` with simple offset crossfades:

```tsx
<AnimatePresence initial={false} mode="popLayout">
  {expanded ? (
    <motion.div
      key="activo"
      initial={{ opacity: 0, scale: 0.85, x: 8 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.85, x: 8 }}
      transition={springs.expanding}
    >
      <Tag variant="active" withCheck>Activo</Tag>
    </motion.div>
  ) : (
    <motion.span key="name" ...>{name}</motion.span>
  )}
</AnimatePresence>
```

**Rule of thumb:** layoutId is for matched-geometry pairs (same shape, different position). Different shapes → crossfade.

### FAB → bottom sheet morph (mobile)

Single `motion.div` with a `surfaceVariants` keyframe object — width grows first, then height. Same physics on all phases:

```ts
const surfaceVariants = {
  closed: {
    width: 84, height: 80, right: 16, bottom: 24,
    backgroundColor: "#ADD010", borderRadius: 24,
    transition: { /* mirror in reverse — see source */ },
  },
  fab: {  // identical to closed but kept named for symmetry
    /* ... */
  },
  open: {
    width: "100%", height: "75vh", right: 0, bottom: 0,
    backgroundColor: "#ffffff", borderRadius: 24,
    transition: {
      width: { ...springs.morphing },                  // phase 1 — horizontal
      right: { ...springs.morphing },
      height: { delay: 0.18, ...springs.morphing },    // phase 2 — vertical
      bottom: { delay: 0.18, ...springs.morphing },
      borderRadius: { delay: 0.28, ...springs.morphing },  // corners stay rounded; only top stays
    },
  },
  fullScreen: {  // ← scroll-to-fullscreen variant
    width: "100%", height: "100vh", right: 0, bottom: 0,
    backgroundColor: "#ffffff", borderRadius: 0,
    transition: { /* all snappy together once user scrolls inside */ },
  },
};
```

**The cascade** lives inside, in a child motion.div with `variants={contentContainerVariants}` and `staggerChildren: 0.06, delayChildren: 0.38`. Each cascade item: `initial={{ opacity: 0, y: 10 }}`, `animate={{ opacity: 1, y: 0 }}`.

### Scroll-to-fullscreen

`useEffect` attaches a native `scroll` listener (more reliable than React's synthetic `onScroll` when motion is on the same element) to the sheet's body ref:

```tsx
useEffect(() => {
  const el = bodyRef.current;
  if (!el || !open) return;
  const onScroll = () => {
    const top = el.scrollTop;
    setFullScreen((prev) => {
      if (!prev && top > 12) return true;
      if (prev && top <= 2) return false;
      return prev;
    });
  };
  el.addEventListener("scroll", onScroll, { passive: true });
  return () => el.removeEventListener("scroll", onScroll);
}, [open]);
```

Hysteresis (12 / 2) prevents flapping at the threshold.

### Header fade in fullScreen

Absolute `motion.div` at the top of the body area, opacity tied to fullScreen state:

```tsx
<motion.div
  aria-hidden
  initial={false}
  animate={{ opacity: fullScreen ? 1 : 0 }}
  transition={{ duration: 0.2 }}
  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-card to-transparent"
/>
```

---

## State machine for the morph (mobile)

Three named states drive the surface variant. Stored as derived value, not separate state:

```tsx
const [open, setOpen] = useState(false);
const [fullScreen, setFullScreen] = useState(false);

const animateTo = !open ? "closed" : fullScreen ? "fullScreen" : "open";

<motion.div initial="closed" animate={animateTo} variants={surfaceVariants}>
```

---

## Mock data shape

`components/control-usuarios/mock-data.ts` — single source for both prototypes:

```ts
export type Worker = {
  id: string;
  nombre: string;          // "Juan Alberto Perez Medina"
  cedula: string;          // "1-0234-5678"
  contacto: string;        // "8812-3232"
  area: string;            // "Producción"
  rolPrimary: string;      // "Ingeniero"
  obraPrimary: string;     // "Viviendas"
  rolSecondary?: string;   // optional second role
  obraSecondary?: string;  // optional second obra
  estado: "activo" | "completado" | "inactivo";
};

export const mockWorkers: Worker[]      // M1/M2 — 3 cards
export const desktopUsers: Array<...>   // UO2 — 5 rows
export const areasDeTrabajo: string[]
export const puestosDeTrabajo: string[]
export const salarios: string[]
export const fechasIngreso: string[]
export const rolesDisponibles: string[]
```

---

## Conventions

1. **Springs and haptics are vocabulary, not decoration.** Name them by meaning. Add to `lib/springs.ts` / `lib/haptic.ts` when a new meaning appears.
2. **`PressableButton` everywhere.** Never raw `<button>` for interactive elements. The halo + press-delay are the design language.
3. **Tokens, not raw hex.** `bg-card`, `text-foreground`, `text-muted-foreground`, `rounded-card`, `rounded-pill`. Hex/inline only for Losa-specific tones (`#ADD010`, `#1c1c1c`) that don't have a token.
4. **`data-prototype` on the root.** Picks up the `user-select: none` + `touch-action: manipulation` + `overscroll-behavior-y: contain` rules from `globals.css` so the prototype feels native, not web-ish.
5. **Mobile viewport.** `max-w-[402px]` + `mx-auto` so it centers on desktop testing. No `overflow-hidden` on the outer container — halos extend past edges.
6. **Grid-rows over motion height.** For collapse/expand inside cards. Less measuring, no springs running past target.
7. **`mode="popLayout"` for crossfade.** Stable when two AnimatePresence branches have different sizes.

---

## How to verify

```bash
cd ~/Documents/claudecode/adelante-web
npm run dev               # http://localhost:3000 (or 3001 if 3000 taken)
```

Open `/control-usuarios/mobile` and:

1. Toggle a card — should grow/shrink smoothly, content cascades in/out.
2. Tap the green "+" — should expand horizontally first (becomes a wide pill at the bottom), then upward into the sheet. Corners stay rounded throughout. Content cascades in after the surface settles (~380ms).
3. Inside the sheet, scroll down — sheet should lift to 100vh, header gets a white-to-transparent fade.
4. Tap any button — halo (green-olive on the FAB, medium-gray on the toggle/burger, light-gray on white buttons) fades in fast, lingers 120ms after release, fades out over 180ms.

Build check:

```bash
npm run build             # all 19 routes prerender as static
```

Deploy:

```bash
npx vercel --prod --scope onexmacs-projects
# → https://adelante-web.vercel.app/control-usuarios/mobile
```

---

## Reference Figma (for source of truth)

H4 file: `https://www.figma.com/design/v4iOmxL9gzmkZx0KOS5sjR/H4`

| Screen | nodeId |
|---|---|
| M1 (mobile feed) | `209:334` |
| M2 (mobile feed + sheet) | `210:365` |
| icon (homescreen) | `213:526` |
| UO2 (desktop list) | `205:1720` |
| UO3 (button armed) | `207:2453` |
| UO4 (panel personal) | `207:2619` |
| UO5 (panel role) | `205:1925` |

Use Figma MCP `get_metadata` for structure, `get_screenshot` for visual reference. Skip `get_design_context` if you don't need code stubs.

---

## What NOT to do

- **Don't reinvent components.** If something looks like `PackageCard`, extend the pattern. If it looks like `PedirBar`, mirror the state machine.
- **Don't reach for `layoutId`** unless both sides are matched geometry. The check ↔ Activo tag morph is a crossfade, not a layout transition.
- **Don't animate `width`/`height` on the same element you're scrolling.** The scrolling element should be a static-sized child of the morph surface, not the surface itself.
- **Don't use the existing `control-usuarios` Next app at `~/Documents/claudecode/control-usuarios/`.** That's the abandoned standalone version. Everything new goes in `adelante-web/app/control-usuarios/` and `adelante-web/components/control-usuarios/`.
- **Don't add `overflow-hidden` to the mobile page root.** It clips the halo of the fixed FAB and Burger buttons.
- **Don't trust dev preview screenshots for animation timing.** They're snapshots, not video. Verify on a real device for the morph + cascade + halo feel.
