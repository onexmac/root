# Histok — Session Handoff

_For a fresh Claude Code session with zero memory. Read this top to bottom before touching anything. It is self-contained — you do not need any external memory files to continue._

> **Estado: instantánea histórica, tomada en `5300579`.** Sigue siendo útil
> por el §8 (trampas ya pagadas) y el §4 (por qué la transición está armada
> así). Tres cosas quedaron superadas — no las tomes de aquí:
>
> 1. **Despliegue (§2).** Vercel ya está conectado por Git: push a `main` es
>    producción. No corras `vercel link` ni `alias set`. La fuente es
>    `AGENTS.md`.
> 2. **Los dos bugs abiertos (§6) están arreglados.** `ReelPager` tiene el
>    prop `overlay` y `HaloPress` el opt-out `capturePointer`; el `pushState`
>    se eliminó. No los vuelvas a "arreglar".
> 3. **Sí hay remoto de git** (`onexmac/histok`), y la ruta local del §1 ya
>    no aplica.

---

## 0. TL;DR — what you're picking up

**Histok** is a reels/TikTok-style study web app a dad (Marcos) is building for his 16-year-old daughter to study **Estudios Sociales** (Social Studies) for an exam. Tagline: _"Más Historia, menos Tik Tok."_ It must feel **native and snappy** on his iPhone.

The current focus is the **index → reel opening transition** and its feel. It's been tuned over many iterations. Right now there are **two open bugs, already diagnosed, not yet fixed** (see §6). The working tree is **clean** — start by implementing those two fixes.

**You cannot judge animation feel yourself** (see §5). Verify *logic* in the preview, deploy to Vercel, and let Marcos judge the feel on his phone. Do not claim how something "feels."

---

## 1. The app

- **Repo:** `~/Documents/claudecode/estudia-reels/`
- **Live URL:** https://histok.vercel.app
- **Stack:** Next.js (App Router) + TypeScript + Tailwind v4 + `motion` (import from `motion/react`, NOT `framer-motion`).
- **Owner/GitHub:** Marcos, GitHub user **`onexmac`** (NOT `davidpc` — that's a different account; never use it). Vercel scope **`onexmacs-projects`**.
- **Content:** 6 Social-Studies topics (Imperialismo, Primera Guerra Mundial, Revolución Rusa, Segunda Guerra Mundial, Guerra Fría, …), each ~4–5 slides with a unique period image + glossary terms. Lives in `data/topics.ts`.

### Screens / routes
- `app/page.tsx` → `<IndexScreen>` — the topic grid (home).
- `app/tema/[slug]/page.tsx` → `<ReelScreen>` (standalone) — deep link into a topic's reel. Has its own "rise from bottom" entrance.
- The **in-app** open (tapping a card on the index) does **not** navigate routes — it embeds the reel and grows it (see §4).

---

## 2. Run & deploy

### Local dev
- Dev server runs on **port 3003**. There's a `.claude/launch.json`; use the preview tooling (`preview_start`) rather than raw `npm run dev` so you get console/network/DOM inspection.
- After big multi-file edits, if HMR shows phantom errors: hard-restart the dev server + `rm -rf .next`.

### Typecheck / lint (run before every deploy)
```bash
cd ~/Documents/claudecode/estudia-reels
npx tsc --noEmit
npx eslint .
```

### Deploy (the review loop)
Deploy to Vercel prod, then **re-alias** (a manual `.vercel.app` alias does NOT auto-track prod — you must re-alias after every `--prod`):
```bash
cd ~/Documents/claudecode/estudia-reels
DEPLOY=$(npx vercel --prod --yes --scope onexmacs-projects 2>&1 | grep -oE "https://histok-[a-z0-9]+-onexmacs-projects.vercel.app" | head -1)
npx vercel alias set "$DEPLOY" histok.vercel.app --scope onexmacs-projects
curl -s -o /dev/null -w "%{http_code}\n" https://histok.vercel.app/   # expect 200
```
Commit messages end with a `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>` trailer. Note: this local repo has **no git remote configured** — commits stay local; deploys go straight to Vercel. Don't try to `git push` unless Marcos sets a remote.

---

## 3. Design vocabulary (how this codebase does motion)

- **Springs** live in `lib/springs.ts` — semantic names (`springs.settling`, `springs.snappy`, `springs.popping`, …). Never inline spring configs; use the named ones. Overshoot IS the intended feel.
- **Haptics** live in `lib/haptic.ts` — iOS-safe trick (hidden `<input type=checkbox switch>`), fired synchronously inside the pointer handler. `haptic.select()`, `haptic.drag()`.
- **Press contracts:**
  - `components/HaloPress.tsx` — halo ring press, for small icon buttons (e.g. the reel back button). Timed press-and-hold detection.
  - `components/PressScale.tsx` — shrink-on-touchdown + spring-back, for large cards (e.g. index topic cards). Has `onPressChange`. Note it calls `setPointerCapture` on pointerdown (line ~48) — relevant to Bug B below.

---

## 4. The opening transition (understand this before editing it)

Tapping a topic card on the index must feel like the photo grows up to fill the screen while the index fades — with **no route-swap flicker**. Architecture (all in `components/IndexScreen.tsx`):

- State: `opening: Topic | null` and `closing: boolean`. `fading = opening !== null && !closing`.
- The **whole index** (`<motion.div data-app>`, ~line 154) fades as one group: `animate={{ opacity: fading ? 0 : 1 }}`, `transition={{ duration: 0.3, ease: "easeInOut" }}`. (This replaced an earlier per-element "cascade" that Marcos scrapped — do NOT bring the cascade back; he wants a plain group fade that reverses on return.)
- The **real `<ReelScreen>` is embedded** inside a growing container — a `<motion.div className="fixed inset-0 z-[60] overflow-hidden bg-black">` (~line 215+). It grows from `initial={{ y:"52%", scale:0.55, opacity:0, borderRadius:44 }}` to `{ y:"0%", scale:1, opacity:1, borderRadius:0 }`. Open spring: `{ type:"spring", stiffness:120, damping:18, mass:1, delay: growDelay }` where `growDelay = 0.06`. `transformOrigin` is bottom-center so it rises + grows from under.
- On settle, `onAnimationComplete` calls `window.history.pushState(...)` to update the URL to `/tema/<slug>` **without** a Next.js route change — one React tree, nothing unmounts, nothing flickers. Closing reverses and pushes `/`.
- `<ReelScreen>` takes `embedded` + `onClose`. When `embedded`, it uses `initial={false}` (renders static at rest, no own entrance) and delegates closing to `onClose`. The standalone deep-link route keeps the rise entrance.
- Images are preloaded on the index (`useEffect`, covers first then rest on `requestIdleCallback`) so opening is instant on iOS.

**Why it was built this way (hard-won):** App Router unmounts the old page on route change, which flickered. Embedding the real reel in a growing container with `history.pushState` (no route swap) is the fix. Don't "simplify" it back into a route transition.

---

## 5. How to verify (critical — read this)

**The preview tab throttles `requestAnimationFrame`.** In the headless/hidden preview, `motion`'s rAF-driven animations DON'T advance — transforms freeze mid-flight, screenshots catch half-finished states, `AnimatePresence` exits never complete.

Consequences:
- **You cannot judge animation smoothness/feel in the preview. Do not claim how something feels.** Say "logic verified; feel needs a device."
- Verify **logic** via the DOM: `getComputedStyle`, `getBoundingClientRect`, `elementFromPoint`, React-state-derived signals (e.g. how many slides are rendered). Not the visual.
- **CSS transitions** (not motion/rAF) and `setTimeout` DO run in the preview — so opacity driven by a CSS `transition` and idle timers are observable there.
- The loop is: implement → `tsc`/`eslint` → verify logic in preview → **deploy → Marcos reviews feel on his iPhone** → iterate. Expect 2–3 passes on any tactile value ("a little" then "too subtle" is the same person zeroing in — not a failure).

---

## 6. THE TWO OPEN BUGS (diagnosed, not yet fixed) — do these first

Both were reported after the last commit (`5300579 Standard group fade for main; keep back button always visible`). That commit made the reel back button **always visible** (previously it hid with the 2s idle-fade), which introduced Bug B.

### Bug A — "the new photo carries a black border/box as it grows"

**Diagnosis (confirmed via screenshots + measured rects):** During the grow the photo card is scaled down (`scale:0.55`, `y:52%`, bottom-center origin) → a small rounded card. The image **fully covers the card** — there is NO gap between image and card edges (measured: image covers the card vertically, overflows horizontally, clipped). So the black is NOT a gap in the card.

The black is the area **around** the growing card. The index (behind, below `z-[60]`) fades to `opacity:0` in **0.3s**, which reveals the root `<div className="min-h-dvh bg-black">` = pure black. But the card grows over **~0.6s** (spring 120/18). So there's a window where the index is already black but the card hasn't filled the screen → a small photo on a black field with black margins above/left/right → reads as "a black box the photo carries."

**Recommended fix:** Keep the fading index visible **behind** the growing card until the card nearly fills — i.e., don't let the index beat the card to black. In `IndexScreen.tsx`, slow the index group-fade duration (~line 154) from `0.3` to roughly the grow duration (~`0.55`), and start them together (`growDelay` already 0.06). Then during the grow you see the dimming index behind the card (this matches Marcos's original storyboard images 1–2 where the dimmed index showed behind), not a black void. Optionally nudge the start scale `0.55 → 0.6` to shrink side margins and/or lower `borderRadius`.

_Alternative to offer him if that's not it:_ make the photo nearly fill from the start (`scale ~0.92`) for a clean crossfade with negligible margins — but he has repeatedly asked for a **visible grow**, so prefer the "keep index behind" fix. Confirm feel on device.

### Bug B — "scrolling on photos refuses to scroll sometimes on mobile"

**Diagnosis (confirmed):** In `ReelScreen.tsx`, the back button and the `<VerticalPills>` are rendered as **siblings** of `<ReelPager>` (all children of the `data-app` div), stacked on top at `z-30`. The pager's pointer handlers (`onPointerDown/Move/Up`) live on the pager's **own** `<div className="absolute inset-0 overflow-hidden">` (`ReelPager.tsx` ~line 327), which is NOT an ancestor of those siblings. So a pointerdown that starts on the back button (bottom-left) or on the pills strip (right edge) **never reaches the pager** → no drag/scroll begins there.

Confirmed in preview: `document.elementFromPoint(30, 800)` (back-button corner) does not resolve inside the pager (`backCornerReachesPager: false`); center does. Before commit `5300579` the back button was `pointerEvents: none` when idle, so after 2s it passed through and scrolling worked — that's why this is a regression from the "always visible" change.

**Recommended fix (route the chrome through the pager):**
1. Add an `overlay?: ReactNode` prop to `ReelPager`. Render `{overlay}` **inside** the pager's viewport `<div>` (the one with the pointer handlers), as a sibling of the translating `<motion.div style={{ y }}>` so it stays fixed and on top.
2. In `ReelScreen`, move the back button + `<VerticalPills>` out of being siblings and pass them as `overlay={...}`. (Keep `<GlossaryCard>` as a sibling — it's a modal that disables the pager when open.)
3. Now a pointerdown on the button/pills bubbles to the pager's viewport → the pager tracks the gesture. A **tap** (no move past `SLOP=8`) leaves the pager idle and the button's `onClick` fires (goHome). A **drag** locks axis `y` and scrolls.
4. **BUT** HaloPress calls `setPointerCapture` on pointerdown (verify — PressScale does at line ~48; HaloPress likely mirrors it). That capture would steal move events from the pager. So add a `capturePointer=false` (or similar) prop to HaloPress and use it for the reel back button, so the pager can capture on axis-lock. Without capture: moving off the button fires `onPointerLeave` → cancels the press (no accidental goHome), and moves bubble to the pager → scroll works.

**Verify the fix in preview via logic** (not feel): after the change, `document.elementFromPoint(<back-button x/y>, ...)` starting a synthetic pointer sequence should let the pager's drag begin, and `backCornerReachesPager`-style checks / page-state changes should confirm a swipe from the corner advances the reel. Then deploy for Marcos to confirm on device.

---

## 7. Hard constraints & preferences (don't violate these)

- **Never claim how an animation feels** from the preview (rAF throttle). Logic-verified ≠ feels-right.
- **Deploy for review** after each change; re-alias every time (§2).
- GitHub is **`onexmac`**, never `davidpc`.
- **Don't push code / deploy when told not to.** When Marcos says "don't add until I tell you," don't.
- **Outward/irreversible actions are gated** by a safety classifier (creating a GitHub repo, disabling deploy protection, publishing). Prepare the exact command locally and hand it to Marcos to run; don't try to force it.
- This is a **personal project**. (Marcos also works on an Adelante construction-company prototyping stack with its own rules — DB tiers, DS-first workflow, GitHub-native docs — but **none of that applies to Histok**. If you see references to `losa.md` / `flotante.md` / Sandbox/Stage/Prod DBs, that's the Adelante world, not this app.)
- There is a reusable "vibecode-kit" distilled from this project. **Do not add new "lessons" to it until Marcos device-validates the pattern** — a past session wrote an unvalidated lesson from a preview-only "fix" that was actually broken on device. Propose lessons in chat; only write after his OK.

---

## 8. Gotchas already paid for (in this codebase)

1. **`object-fit: cover` can't be scaled to reveal its crop.** To reveal the full frame, size the element to **cover dimensions** (bigger than viewport, clipped by `overflow:hidden`) then scale it *down*. Same element — never crossfade a second copy (that "peek" bug was visible in the hand: "you are cheating"). De-blur in lockstep via `filter: blur(calc(var(--base-blur) * (1 - var(--peek))))`, `--base-blur` set responsively.
2. **A `style` MotionValue fights an `AnimatePresence` exit** over the same prop → the element lingers then unmounts abruptly. Use Framer's `drag` prop so enter/drag/exit share one transform system (this is how `GlossaryCard` was fixed).
3. **Animating `top`/`height` for a "rise" janks AND clips** the content as it grows. Transforms only (`translate`/`scale` from a `transformOrigin`).
4. **A cached image fires no `onLoad`** (already `complete` before React attaches the handler). Detect on mount: `if (img.complete && img.naturalWidth) setLoaded(true)` — otherwise skeletons never clear on warm loads.
5. **Entrance delays stack into lag** — a leading `setTimeout` + a staggered spring `delay` = perceptible text delay. Keep entrance delays near-zero; the spring is the arrival.
6. **`motionValue.set()` updates the value now, the DOM transform next frame** — a synchronous `getComputedStyle().transform` read returns the stale value. Don't conclude "it didn't move" from an immediate read.
7. **Desktop wheel paging** (`ReelPager` wheel handler): 1:1 wheel→page feels resistant. It amplifies the delta (`WHEEL_GAIN`), drags the page along, and commits past a low threshold (`WHEEL_ADVANCE_RATIO`) on a short debounce. The numbers are the design — tune them, don't rip it out.
8. **Nested scroll (long-text slides) vs the pager:** the scrollable text panel must `stopPropagation` on pointerdown and use `touch-action: pan-y` **only when it actually overflows**, else it steals paging on every slide.

---

## 9. File map (the ones you'll touch)

| File | Role |
|---|---|
| `components/IndexScreen.tsx` | Topic grid + the open/close transition (group fade + growing embedded reel). **Bug A lives here.** |
| `components/ReelScreen.tsx` | The reel: slides, back button, pills, glossary. Chrome idle-fade (`chromeVisible` + 2s timer, `bumpActivity`). Back button is now always-visible. **Bug B: back button + pills are siblings of the pager here.** |
| `components/ReelPager.tsx` | Hand-rolled gesture pager driven by a MotionValue `y`. Pointer + wheel handling. **Add the `overlay` prop here for Bug B.** |
| `components/Slide.tsx` | One slide: cover-sized image scaled for peek, scroll-darken for long text, skeleton. |
| `components/GlossaryCard.tsx` | Draggable dismissable glossary term card (Framer `drag`). |
| `components/HaloPress.tsx` / `PressScale.tsx` | Press contracts. Check `setPointerCapture` for Bug B. |
| `lib/springs.ts` / `lib/haptic.ts` | Motion + haptic vocabulary. |
| `data/topics.ts` | The 6 topics, slides, images, glossary. |
| `app/page.tsx`, `app/tema/[slug]/page.tsx` | Home (index) and deep-link reel routes. |
| `app/globals.css` | Skeleton shimmer, safe-area vars (`--sat`/`--sab`). |

---

## 10. Recent history (last commits, newest first)
```
5300579 Standard group fade for main; keep back button always visible   <- current HEAD
5564380 Cascade: longer, overlapping fadeouts (FADE 0.13 -> 0.24)        (cascade since scrapped)
9e2f3cd Transition: bigger starting size for the growing photo (0.42 -> 0.55)
39fb256 Cascade: top fades as one group (element-above-touch with the title)
c5e774b Transition timing: faster pops that lead, less grow bounce
59771b5 Transition: start off-screen below, then rise + grow
b7d0f27 Transition: real grow (starts small), springier, overlaps cascade
8c7da11 Tune transition: discrete "tap tap tap" cascade + slower felt grow
```
The "cascade" commits are historical — Marcos **scrapped the cascade** in favor of the plain group fade (`5300579`). Don't reintroduce it.

---

### First move for the fresh session
1. Read this file, then read `IndexScreen.tsx`, `ReelScreen.tsx`, `ReelPager.tsx`, `HaloPress.tsx`.
2. Implement **Bug B** (scroll dead zone — the `overlay` prop + no-capture back button) and **Bug A** (slow the index fade so no black void).
3. `tsc` + `eslint`, verify logic in preview, deploy + re-alias, and tell Marcos it's ready for his device — **without claiming how it feels.**
