# Losa Flotante — Interaction & Engineering Playbook

Losa Flotante ("floating slab") is our design philosophy for building **native-feeling, gesture-first** interfaces: surfaces that move like physical objects — with momentum, resistance, and spring — never like pages that cut or fade on a timer. This doc is framework-agnostic in spirit; the concrete examples are web (React + `motion`), and the same principles carry to the SwiftUI side.

It's deliberately app-neutral. Whether you're building a data-heavy internal tool or a full-bleed media feed, these are the patterns and the traps that repeatedly cost time — read it before writing interaction code.

---

## 0. How we work: verify logic in preview, judge feel on a device

The single most important workflow rule, because it changes how you validate everything:

- **Headless/hidden previews throttle `requestAnimationFrame`.** Spring/rAF-driven animations freeze mid-flight — transforms don't advance, exit animations never complete, screenshots catch half-states, and viewport metrics can read `0`. **You cannot judge animation feel in a preview.**
  - Verify **logic**, not feel: DOM structure/containment, `getComputedStyle`, computed `touch-action`, `event.defaultPrevented` on synthetic events, state-derived signals.
  - **CSS transitions and `setTimeout` DO run** (only rAF is throttled). Opacity via a CSS `transition` is observable; a spring is not.
  - Loop: implement → typecheck + lint → verify logic → **ship → judge feel on a real device** → iterate. Expect 2–3 passes on any tactile value; "a bit more" then "too much" is one person zeroing in, not failure. Never claim how something feels from a preview — say "logic verified; feel needs a device."
- **Change ONE tactile number, ship, feel it.** Don't batch-tune spring/threshold/distance values blind — you can't tell which one did what.
- **Phantom build-cache errors after multi-file edits.** Bundlers (Turbopack/SWC) cache an intermediate broken state — a symbol that briefly existed twice mid-edit, a tag mid-rename — and report a parse/duplicate error even though the typechecker is clean and the app renders. Fix: stop the dev server, clear the build cache dir, restart. Never clear it *while the server is running* — that corrupts the live build and blanks the page.

---

## 1. The philosophy in practice

- **Surfaces obey physics.** Momentum, inertia, elastic overshoot. The house feel is *snappy but not stiff*: a fast leading edge with a springy arrival — not slow, not floaty, not a hard stop.
- **A named spring vocabulary, not inline configs.** Keep semantic springs (`snappy`, `settling`, `shrinking`, `popping`, …) in one place and reference them. Overshoot is intentional; don't dial it out.
- **The spring IS the arrival.** Keep entrance delays near zero — a leading `setTimeout` plus a staggered spring delay stacks into perceptible lag.
- **Haptics on commit points** (selection, drag-lock, threshold crossings) — fired synchronously inside the pointer handler.

---

## 2. Reversible transitions run on ONE value

Drive an open/close (or expand/collapse, sheet up/down) from a **single 0→1 value** that every transform derives from — scale, translate, radius, opacity. Opening springs it 0→1; a drag pulls it 1→0 and commits on release; a tap animates it to 0.

**Why:** one continuous, interruptible value means **no timed jumps** — a drag hands off to a spring mid-flight, a close can be cancelled, everything stays in sync. Avoid boolean `opening`/`closing` flags that fire fixed-duration animations; that's the thing this replaces.

**Corollary — unify every dismiss path through one function.** Button tap, edge-drag, drag-handle, pull-to-dismiss should all funnel to the *same* exit routine and play the identical animation. If you add a new way to leave, route it through that function; don't hand-animate a parallel one.

---

## 3. Movable chrome lives OUTSIDE transformed containers

Controls that must move independently (a back button that follows the finger, indicators that slide to their edge) **cannot be children of a scaling/translating container** — the parent transform drags them along. Render them in a sibling layer in screen space (a portal is the clean way to keep component state while relocating the DOM). Then each moves on its own transform, unaffected by the container.

Tradeoff to plan for: a gesture starting on a relocated control no longer bubbles to the container's gesture handler — so give the control its own pointer handlers, or make purely-decorative chrome `pointer-events: none` so gestures pass through.

---

## 4. Gesture & motion principles

- **Prefer native physics.** Native elastic scroll bounce gives momentum + inertia for free. Disabling it (e.g. `overscroll-behavior: none`) to "clean up" the edges makes scrolling feel stiff and hard-stopping. A hand-rolled overscroll is a momentum-blind downgrade unless you fully reimplement fling velocity. Reach for custom only when you need a visual the platform can't give you.
- **Interactive drags need tension, or they feel weightless.** A gesture that tracks the finger ~1:1 "slips away." Use a resistance curve so the surface lags and grips — an asymptotic rubber band works well: `travel = MAX · (1 − e^(−fingerPx · slope / MAX))` (resists harder the further you pull). Tune `slope`/`MAX` on a device.
- **Make each gesture's direction physically natural.** A surface pulled from the top should come *down* with the finger; one pulled from the bottom should recede *upward*. Same outcome, opposite, natural directions — don't force one motion for both.
- **Keep transition surfaces looking solid.** Give a detaching/shrinking surface its corner radius while it's mid-transition (and clip it) — a square element peeling off reads as broken. Behind a shrinking surface, prefer a solid backdrop; a blurred-image backdrop is fine to hide a growing edge but reads as a glitch on the way out.
- **A progress/position indicator's current step reads as full.** If the current pill only fills as you move *toward the next* step, the final step looks empty — like there's one more to go.

---

## 5. Web / iOS traps that repeatedly cost time

- **The iOS Safari edge-swipe-back is a system gesture you can't reliably `preventDefault`.** If you push a *same-document* history entry, the native left-edge swipe animates between your two states → a duplicated-page artifact. Fix: **don't create the history entry** — drive the transition with state, not `pushState`. Belt-and-suspenders: `preventDefault` on `touchstart` near the very left edge. Installed-to-home-screen (PWA) has no edge-swipe at all.
- **Press-and-hold on an image opens the iOS share/save sheet.** Kill it with `-webkit-touch-callout: none` + `-webkit-user-select: none`, and make the image `pointer-events: none` so the interactive parent is the touch target.
- **`touch-action` and nested scroll containers.** An ancestor's `touch-action: none` does NOT cover a descendant that is its *own* scroll container (`overflow: auto`). When such a child isn't currently overflowing, set it to `touch-action: none` (not the default `auto`) — otherwise the browser claims the touch as a no-op scroll and cancels the parent's pointer stream ("the gesture just stops working"). Only allow `pan-y` when it actually overflows.
- **`setPointerCapture` steals move events from ancestor gesture handlers.** A control that captures the pointer on `pointerdown` prevents a drag begun on it from reaching a parent gesture. Give such controls an opt-out so the parent can capture on axis-lock.
- **`object-fit: cover` can't be scaled up to reveal its crop.** To reveal the full frame, size the element to *cover dimensions* (larger than the viewport, clipped by `overflow: hidden`) then scale it *down* — same element, never a second crossfading copy.
- **A cached image fires no `onLoad`** (it's `complete` before the handler attaches). Detect on mount (`img.complete && img.naturalWidth`) or skeletons never clear on warm loads.

---

## 6. Content integrity

Never fabricate content or data that a user reads, learns from, or decides on. Verify against the real source; if you can't verify, describe only what's demonstrably true and flag the uncertainty rather than assert a confident-sounding guess. Getting this wrong is worse than leaving a placeholder.

---

## 7. Tuning discipline (recap)

Tactile constants — spring stiffness/damping, drag thresholds, resistance `MAX`/`slope`, commit distances, hold delays — are **feel decisions, not correctness decisions.** Keep them named and centralized, change one at a time, ship, and judge on a device. The preview will lie to you about all of them.
