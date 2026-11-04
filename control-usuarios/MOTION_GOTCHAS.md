---
name: motion-gotchas
purpose: Every failure mode we hit building the Nuevo Pedido panel (motion.dev + React), with the symptom, the real cause, and the fix that survived. Read BEFORE touching animation or gesture code in this prototype — or before porting any of it to production.
scope: control-usuarios (desktop prototype) · applies equally to losa-flotante (mobile) and to any Adelante motion.dev work
live: https://control-usuarios.vercel.app/pedido
---

# Motion & gesture gotchas — read this first

Every item below cost real debugging time on this prototype. Each one is a
**symptom → cause → fix**, and every fix is in the code today. If you're about
to "clean up" something that looks redundant here, check this list first: most
of the odd-looking code is load-bearing.

---

## 0. Before you port any of this to production

Two rules from `memory.md` / `losa.md` that this document does **not** override:

1. **This is a disposable prototype.** It is not production code and it never
   connected to anything but mock data. Do not copy `components/pedido/*`
   into a production app as-is.
2. **DS-owned components change in the DS repo first.** If a fix belongs to a
   real component (Sheet, SlideArm, SlideToConfirm, Button…), it originates in
   `adelante-design-system/react/<Component>/`, gets reviewed, lands in **Temp
   Losa Flotante**, and only a human decides promotion to **Live**. The
   prototype is a consumer, not a source.

What *is* safe to carry over verbatim: the **lessons** in this file, and the
`lib/springs.ts` / `lib/haptic.ts` / `lib/use-shake.ts` vocabularies.

---

## 1. motion cannot interpolate CSS `var()` colors

**Symptom** — a whole animation batch freezes mid-way. Not just the color: the
`width` on the same element also stops (we saw a morph stuck at `width: 260`).

**Cause** — animating `backgroundColor` between two `var(--token)` values.
motion can't resolve them, and it stalls **every property in that keyframe
batch**, not only the color.

**Fix** — resolve to a concrete `rgb()` once, then animate that.

```ts
function resolveColor(c: string): string {
  if (typeof window === "undefined" || !c.includes("var(")) return c;
  const probe = document.createElement("span");
  probe.style.color = c;
  probe.style.position = "absolute";
  probe.style.opacity = "0";
  document.body.appendChild(probe);
  const resolved = getComputedStyle(probe).color || c;
  probe.remove();
  return resolved;
}
```

**Rule** — anything inside an `animate={{…}}` target is a **literal**
(`"#ADD010"`, `"rgb(173,208,16)"`). Tokens are for `className` / static
`style` only.

---

## 2. motion cannot animate `height` across unit types

**Symptom** — the FAB→panel morph never opened; height stayed at its start
value.

**Cause** — `height: 80` → `height: "max(calc(100vh - 180px), 320px)"`. Mixed
units / nested CSS functions don't interpolate.

**Fix** — compute pixels at runtime and animate a number.

```tsx
const [vh, setVh] = useState(0);
useEffect(() => {
  const update = () => setVh(window.innerHeight);
  update();
  window.addEventListener("resize", update);
  return () => window.removeEventListener("resize", update);
}, []);
const sheetH = vh > 0 ? Math.max(vh - 180, 320) : 560;
```

---

## 3. motion's `drag` prop fights animated layout props

**Symptom** — with `drag` enabled on the morphing surface, the open animation
froze (`width` stuck ~260) and the surface was flung off-screen (`y ≈ 1020`).

**Cause** — `drag` builds a **layout projection** for the element. That
projection is incompatible with animating `width` / `height` / `right` /
`bottom` on the *same* element.

**Fix** — hand-roll the drag. Track pointers yourself and write the offset to a
`MotionValue` consumed as a **transform** (`y`), which never touches the layout
box:

```tsx
const dragY = useMotionValue(0);
// …pointer handlers set dragY…
<motion.div
  style={{ y: dragY }}          // transform — safe
  animate={surfaceTarget}       // width/height/right/bottom — safe
/>
```

Same conclusion for `Reorder`: it can't drag between groups, and its projection
has the same conflict. The cross-obra drag here is fully hand-rolled.

---

## 4. `AnimatePresence mode="wait"` deadlocks on a non-animatable exit

**Symptom** — content never mounted at all.

**Cause** — `mode="wait"` waits for the outgoing child's exit to *resolve*. Our
cascade's `"hidden"` variant was `{}` — nothing animatable — so the exit never
completed and the incoming child never mounted.

**Fix** — drop `mode="wait"` (default mode cross-fades, which is what a morph
wants anyway), or give the exit something real to animate.

---

## 5. A nested `AnimatePresence` blocks its parent's exit forever

**Symptom** — deleted rows stayed in the DOM at `opacity: 0` forever; a drag
ghost stayed on screen after release.

**Cause** — the row's kebab icon swap used its own `AnimatePresence` **inside**
a subtree that was itself exiting. The nested presence never resolves, so the
parent's exit never resolves, so the node never unmounts.

**Fix** — inside anything that can exit, swap icons with a **stacked opacity
cross-fade**, never `AnimatePresence`:

```tsx
<span className="relative flex h-6 w-6 items-center justify-center">
  <motion.span initial={false} animate={{ opacity: open ? 0 : 1 }} className="absolute flex">
    <DotsThreeVertical />
  </motion.span>
  <motion.span initial={false} animate={{ opacity: open ? 1 : 0 }} className="absolute flex">
    <CaretLineUp />
  </motion.span>
</span>
```

---

## 6. `AnimatePresence` exits don't resolve inside a `Reorder.Group`

**Symptom** — removing an item left an invisible node mounted forever.

**Fix** — **manual removal**: flag → animate → filter on a timer.

```tsx
const remove = (id: string) => {
  setDying((d) => [...d, id]);                       // row animates height→0
  window.setTimeout(() => {
    setItems((prev) => prev.filter((p) => p.id !== id));
    setDying((d) => d.filter((x) => x !== id));
  }, 380);                                            // must outlast the animation
};
```

---

## 7. Pointer capture dies when the node re-parents mid-drag

**Symptom** — dragging a row toward another group froze the ghost mid-air and
wedged the panel.

**Cause** — the live drop-preview **re-parents the dragged row's DOM node**.
That destroys any `setPointerCapture` held by that node, and the pointer stream
stops.

**Fix** — the row owns the gesture only until the hold fires; then it
**releases capture and hands off to the parent, which listens on `window`**.
Window listeners survive any remount.

```tsx
// row: hold fired
head.releasePointerCapture?.(pointerId);
onLiftStart({ … });

// parent
const onMove = (e: PointerEvent) => onLiftMove(e.clientX, e.clientY);
window.addEventListener("pointermove", onMove);
window.addEventListener("pointerup", onUp);
window.addEventListener("pointercancel", onUp);
```

Also: **force-end any live drag when the panel closes** — a ghost must never
outlive its container.

---

## 8. Hold-to-drag must not be cancelled by movement

**Symptom** — "drag doesn't work", repeatedly, on real hardware while synthetic
tests passed.

**Cause** — the hold timer was cancelled if the pointer moved > 6 px before it
fired. **Nobody presses and holds perfectly still** — people press *and pull*
in one motion, so the gesture died every time.

**Fix** — movement never cancels the hold; it only suppresses the *click*.
And start the lift from the **latest** pointer position, not the pointerdown
position, so the ghost appears under the cursor.

```tsx
const onPointerMove = (e) => {
  if (press !== "pressing" || !downAt.current) return;
  lastPos.current = { x: e.clientX, y: e.clientY };
  if (Math.hypot(e.clientX - downAt.current.x, e.clientY - downAt.current.y) > SLOP)
    movedPastSlop.current = true;      // drag, not click — but hold survives
};
```

`HOLD_MS = 260`, `SLOP = 8`.

---

## 9. `stopPropagation` on a child kills the parent's gesture

**Symptom** — the row was draggable everywhere **except** from the ⋮ dots.

**Cause** — the kebab `<button>` called `e.stopPropagation()` on pointerdown to
stop a tap from starting a drag. That also stopped the parent's drag tracking
from ever seeing the press.

**Fix** — `pointer-events-none` on the inner button so presses fall through to
the row's gesture; keep the `<button>` purely for keyboard access, and let a
still press (< `SLOP`) fall through to the click path. One toggle path for
pointers — two would double-fire.

---

## 10. A `MotionValue` in `style` is dropped when `animate` owns transforms

**Symptom** — an alarm shake rendered as `transform: none`. Nothing moved.

**Cause** — the element had `animate={{ scale, … }}` **and** `style={{ x:
shakeX }}`. motion rebuilds the transform from its own animate target and
discards the competing `x`.

**Fix** — put the shake on a **dedicated wrapper element**, and use
`useAnimationControls` (see next item).

**Rule** — *one element, one owner of `transform`.* This also means **Tailwind
transform classes lose to motion**: `-translate-y-1/2` on an element whose `x`
motion animates will be overwritten. Center with flex (`inset-y-0 flex
items-center`) instead.

---

## 11. A keyframe array in `animate` won't re-fire

**Symptom** — the shake played once and then never again.

**Cause** — motion doesn't re-run an animation whose target is unchanged.

**Fix** — `useAnimationControls`, the one API built to *replay* on demand:

```tsx
const controls = useAnimationControls();
const refuse = () => {
  controls.start({ x: [0, -9, 9, -7, 7, -4, 4, 0] }, { duration: 0.42, ease: "easeInOut" });
  haptic.error();
};
<motion.div animate={controls}>{/* target */}</motion.div>
```

For cross-component fan-out (one refusal shaking several elements), pass a
**counter**, not a boolean — see `lib/use-shake.ts`.

---

## 12. A signal-driven effect fires on mount

**Symptom** — every newly created obra box shook the instant it appeared.

**Cause** — `useEffect(…, [signal])` runs on mount. Once the user had refused
even once, the counter was already `> 0`, so each new mount saw a "live" signal.

**Fix** — seed a ref with the current signal and only react to a genuine change:

```tsx
const seen = useRef(signal);
useEffect(() => {
  const isNew = signal !== seen.current;
  seen.current = signal;
  if (isNew && signal > 0 && active) controls.start({ x: SHAKE_KEYFRAMES }, SHAKE_TRANSITION);
}, [signal]);
```

---

## 13. `navigator.vibrate()` can throw and kill the code after it

**Symptom** — an animation silently never ran.

**Cause** — `vibrate()` without a real user activation can throw, and the throw
propagated out of the haptic call, skipping everything after it.

**Fix** — guard it once, in the vocabulary, so every call site is safe. And
**order matters**: fire the visual first, the haptic second.

```ts
const vibrate = (pattern: number | number[]) => {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(pattern); } catch { /* no activation — ignore */ }
  }
};
```

---

## 14. `gap` still applies to a zero-width child

**Symptom** — the green `+` sat off-centre and clipped in its collapsed 48 px
button.

**Cause** — the label was a flex sibling with `gap-3`. Even collapsed to 0
width, the **gap kept its 12 px**: `13 + 0 + 12 + 22 + 13 = 60 > 48`.

**Fix** — take the label **out of flow** (`absolute`) so it can never push the
icon; keep the icon as the only child in flow.

**General rule** — anything that fades in/out inside a size-animating container
should be absolutely positioned. A flex row will reflow and shove content out of
the clipped box.

---

## 15. Two layout props + an overshooting spring = visible wobble

**Symptom** — a pill "appeared, flickered, and appeared again".

**Cause** — `height` *and* `marginTop` animated with `springs.morphing`
(stiffness 380 — it overshoots). Height passed its target and came back while
marginTop did the same, with `overflow-hidden` clipping the label through the
bounce — and a sibling card was layout-animating simultaneously.

**Fix hierarchy** for conditional elements — try in this order:

1. **Keep it mounted, animate `opacity` only, reserve the space.** No remount,
   no layout, one property — nothing left that *can* flicker. This is what
   shipped.
2. If the space must collapse: animate layout **on exit only** (a wobble on the
   way out is invisible) and keep the entrance GPU-only (`opacity`, `scale`).
3. Mount/unmount without an exit animation is always a blink. Don't.

We tried 3 → 2 → 1 in that order; only 1 was actually flicker-free.

---

## 16. A parent at `opacity: 0` takes your overlay with it

**Symptom** — one element never got the green "sending" veil.

**Cause** — the element itself faded to `opacity: 0` while confirming, and
opacity is inherited by children, so its veil went to 0 too.

**Fix** — anything that must be *covered* by an overlay has to stay visible.
Remove the competing fade.

---

## 17. Sequence, don't overlap, when one thing must clear another

**Symptom** — the label overlapped the `+` while the button shrank.

**Fix** — **asymmetric, per-property transitions**. Grow: pill opens, *then*
the label travels in. Shrink: label leaves fast, *then* the width collapses.

```tsx
// label
transition={hovered
  ? { duration: 0.3,  ease: "easeOut", delay: 0.08 }
  : { duration: 0.12, ease: "easeIn" }}

// container width — waits for the fade before collapsing
transition={{
  width: hovered ? springs.morphing : { ...springs.morphing, delay: 0.14 },
  scale: springs.snappy,
}}
```

---

## 18. Verifying animations in a headless / hidden browser

**This wasted more of our time than any actual bug.** If the automation pane
reports `document.visibilityState === "hidden"`, **`requestAnimationFrame`
never fires**, so:

- motion animations never run; every `transform` reads `none`
- elements sit frozen at their entrance values (`opacity: 0`, `height: 0`,
  `scale(0.96)`) — so **any measurement is garbage**
- a panel can report `role="dialog"` (state open) while still painted collapsed

Check it before trusting anything:

```js
document.hidden, document.visibilityState,
await new Promise(r => { let f=false; requestAnimationFrame(()=>f=true); setTimeout(()=>r(f),300) })
```

What *is* reliable while hidden: **DOM structure, node identity (remount
detection), computed `border-radius` / colors, and React state effects.**
Verify those; ask a human to eyeball motion.

Also: **synthetic `.click()` ≠ real input.** Synthetic events skip pointer
capture, don't grant user activation (see #13), and repeatedly left this panel
in states real clicks never produced. Use real CDP input
(`computer left_click` / `left_click_drag`) for gesture verification.

---

## 19. Values used here that are NOT in the DS

Flagged so nobody assumes they're tokens. Candidates for review:

| Value | Where | Why |
|---|---|---|
| `#D3E27F` | `saving-veil.tsx`, secondary pills | Pale green. Must be **opaque** — an alpha green lets content show through, the design shows a solid fill. |
| `#F0524A` | `sidebar-nav.tsx` | Notification dot. `--color-red-100` (`#c96c6c`) reads dusty next to the design. |
| `obraMeta` | `lib/mock-items.ts` | Tooltip detail keyed by código, so obra creation doesn't have to thread the fields. |

**Corner radius scale is 8 / 16 / 20 / 24 only.** No `rounded-full`, no
arbitrary values. One deliberate exception: the users-table container is
`rounded-[40px]` because it's *concentric* — header radius (24) + padding (16)
— so the outer corner follows the header's curve instead of cutting across it.

**Elevation**: everything that lifts uses the same `CARD_SHADOW`
(`--shadow-big` + a 1 px ring in one animatable `boxShadow`). Carry the ring in
the shadow stack, and keep a **transparent twin with the same layer count** so
the keyframes stay interpolable. Don't also add a `ring-1` class — they double
up while animating.

---

## 20. Pre-flight checklist

Before you call an interaction done:

- [ ] Every animated color/size in an `animate` target is a **literal**, not a token (#1, #2)
- [ ] No element both `drag`s and animates layout props (#3)
- [ ] No `AnimatePresence` nested inside anything that can exit (#5)
- [ ] Every conditional element: mounted + opacity, or GPU-only enter (#15)
- [ ] One owner of `transform` per element; shake/offset on a wrapper (#10)
- [ ] Gesture verified with **real** mouse input in a **visible** window (#18)
- [ ] Hold-to-drag survives immediate movement (#8)
- [ ] Radii from 8/16/20/24; elevation from `CARD_SHADOW` (#19)
- [ ] `npm run build` clean (TypeScript included)

---

*Behavior contracts live in `~/Desktop/SHEET_MORPH.md` (mobile sheet morph) and
`flotante.md` (component library). This file is only about the traps.*
