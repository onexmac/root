# LosaFlotante — Changelog

Tracks every change shipped to this repo that touches the LosaFlotante
prototype, its consumed DS components, or the [`losa.md`](https://github.com/DavidpcAD/adelante-design-system/blob/main/react/screens/LosaFlotante/CHANGELOG.md)
contract on the maintainer's Desktop. Newest entries on top.

**Maintenance rule** (from `losa.md` §0 / governing rule #5 + §19): every
PR that touches `react/screens/LosaFlotante/`, any DS component LosaFlotante
consumes, or the `losa.md` contract itself **must** update this file in
the same PR. Each entry names who authored the change (the AI agent, by
model + session) and who merged it (the GitHub account performing the
merge).

Live preview (auto-deploys on push to `main`, ~1–3 min):
<https://davidpcad.github.io/adelante-design-system/?path=/story/h4-losa-flotante--default>

---

## 2026-05-18 — v0.5 · "Linger halved + CHANGELOG-in-repo + author-attribution"

### DS repo changes

- `react/SlideToConfirm/SlideToConfirm.tsx`: `successHoldMs` default
  **1600 → 800 ms** + docstring rewritten to explain the rationale
  ("long enough to register, short enough not to feel sluggish when the
  parent reacts").
- `react/SlideArm/SlideArm.tsx`: `successHoldMs` default 800 ms (bubbles
  through to SlideToConfirm) + docstring added flagging the sync
  requirement.
- `react/SlideToConfirm/SlideToConfirm.stories.tsx` +
  `react/SlideArm/SlideArm.stories.tsx`: `successHoldMs` range control
  lower bound dropped 300 → 200 ms.
- `react/screens/LosaFlotante/CHANGELOG.md`: **new file** — this
  changelog. Replaces the desktop-only `losa.md.CHANGELOG.md` that lived
  outside source control.

### losa.md changes (Desktop contract, `~/Desktop/losa.md`)

- **Governing rule #5 added**: *"Every PR updates the CHANGELOG."* — any
  PR touching LosaFlotante, its DS consumers, or `losa.md` must update
  this file in the same PR.
- **§15 Source references rewritten**: removed the Vercel deploy section
  (no longer the shareable preview). Added "Live preview (the working
  link to share)" pointing to the GitHub Pages Storybook URL. Added
  "Changelog (lives in the GitHub repo)" pointing to this file's URL on
  `main`.
- **§19 added — CHANGELOG workflow**: when to update (4 triggers), entry
  format (date + version + theme + sub-sections), version bump policy
  (0.X.0 for behavior, 0.X.Y for bugfix), what NOT to put in the
  changelog, how to keep §15 and §19 pointers in sync.

### Authorship

- **Authored by:** Claude Opus 4.7 (1M context) in pair-coding session
  with @1xmac (2026-05-18).
- **DS merge author:** pending @1xmac (PR #13 still open at time of
  writing).

### PR / commits

- PR: [#13](https://github.com/DavidpcAD/adelante-design-system/pull/13)
- Last commit on branch `slide-arm-grow-from-button`:
  [`314a8ab`](https://github.com/DavidpcAD/adelante-design-system/commit/314a8ab)
  — *feat(SlideToConfirm,SlideArm): halve successHoldMs default (1600 →
  800) · chore(LosaFlotante): add in-repo CHANGELOG.md*

---

## 2026-05-18 — v0.4 · "SlideArm + linger contract"

### DS repo changes (all on PR #13 branch, pre-merge)

- **New components:**
  - `react/SlideToConfirm/SlideToConfirm.tsx` + `.css` + `.stories.tsx`
    — green knob that grows with drag. Quarter-progress haptic ticks
    (`haptic.drag()` at p=0.25/0.50/0.75), 0.25× / 0.2× rubber-band, tap
    nudge (+52 px `springs.popping` → `springs.settling`), commit slam
    via `springs.completing`, auto-reset via `springs.settling`, idle
    hint bob (4 px / 1.1 s `easeInOut` infinite), pressed scale 1.02 +
    heavier shadow.
  - `react/SlideArm/SlideArm.tsx` + `.css` + `.stories.tsx` — wrapper
    that lets a tap on the compact green pill **arm** the slider. Width
    morphs trailing→leading via `springs.expanding` (or `shrinking`
    closing). Cancel X above the bar, scale-in via `springs.popping`,
    anchor bottom-right. Includes a local `HaloPress` shim (transparent
    halo press surface, since DS `Button` always paints a fill).
- **Vocabulary additions in `react/springs.ts`:**
  - `shrinking` — `stiffness 224, damping 29, mass 1` (SwiftUI response
    0.42 / damping 0.98). Mirror of `expanding` for the close side of
    symmetric morphs.
  - `popping` — `stiffness 385, damping 22, mass 1` (SwiftUI 0.32 /
    0.55). For ephemera entering from `scale 0.01`.
- **Screen update:** `react/screens/LosaFlotante/LosaFlotante.tsx`
  replaces the previous `SlideButton` "Crear usuario" footer with
  `<SlideArm label="Crear usuario" collapsedWidth={200} />`.

### Behavior fixes during PR #13 (commits on the same branch)

- **`68af072`** — *fix(SlideArm): explicit initial width + rotated-plus X
  for cancel*. Without `initial={{ width: collapsedWidth }}`, motion was
  reading the inner SlideToConfirm's 100% width from the DOM on first
  mount and rendering the pill full-width instead of collapsed. Also: the
  DS Icon registry has no X glyph (`close` paints a chevron-down), so
  the cancel button now draws a true X by rotating the DS `plus` icon
  45°. Promotion candidate flagged for adding `x` to the registry.
- **`3268d59`** — *fix(SlideToConfirm, SlideArm): linger before firing
  onConfirm*. The check used to render then `onConfirm` fired
  immediately, allowing consumers that close-on-success to unmount the
  slider before the user saw the check. Moved `onConfirm` inside the
  `successHoldMs` setTimeout. SlideArm's `disarm` is now immediate (the
  inner slider already lingered) — previously it scheduled another
  `setTimeout(disarm, successHoldMs)`, totaling 3.2 s.

### losa.md changes

- **Governing rule #4 added**: *"DS-first for every fix."* — component
  changes always originate in the DS repo, never in the standalone's
  vendored copies.
- **§17 component inventory updated**: added rows for `SlideToConfirm`
  and `SlideArm` (with the explicit distinction from `SlideButton`).
  Noted the missing-`x`-icon caveat in the `Icon` row.
- **§17.2 vendoring workflow**: extended `cp` and `sed` snippets to
  cover SlideToConfirm / SlideArm + `cp springs.ts`.
- **§18.6 added — DS-first fix workflow**: 5-step procedure (branch DS
  → PR → merge → re-vendor → verify in standalone → mirror screen) +
  anti-patterns ("don't fix in `components/ds/` vendored copy", "don't
  skip Storybook story", "don't skip step 4 — `npm run dev` in the
  standalone is the real verification").
- **§13 QA**: added line — *"Any component-level fix landed in the DS
  repo FIRST. Standalone re-vendored AFTER the DS PR merged."*
- **§15 source references**: added pointer to `~/Desktop/slide-to-confirm.md`
  as the component spec for SlideToConfirm + SlideArm.

### Standalone prototype changes (downstream consequence)

- `~/Documents/claudecode/losa-flotante/`:
  - Vendored `components/ds/SlideToConfirm/`, `components/ds/SlideArm/`.
  - Synced `lib/springs.ts` with the DS (gained `shrinking`, `popping`).
  - `components/losa/nuevo-usuario-sheet.tsx`: replaced `<SlideButton
    label="Crear usuario" />` with `<SlideArm label="Crear usuario"
    collapsedWidth={200} />`.

### Authorship

- **Authored by:** Claude Opus 4.7 (1M context) in pair-coding session
  with @1xmac (2026-05-18).
- **DS merge author:** pending @1xmac (PR #13 still open).

### PR / commits

- PR: [#13](https://github.com/DavidpcAD/adelante-design-system/pull/13)
- Commits on branch `slide-arm-grow-from-button`:
  - [`bf13618`](https://github.com/DavidpcAD/adelante-design-system/commit/bf13618)
    — initial SlideArm + SlideToConfirm + springs + LosaFlotante migration
  - [`68af072`](https://github.com/DavidpcAD/adelante-design-system/commit/68af072)
    — initial-width + rotated-X fix
  - [`3268d59`](https://github.com/DavidpcAD/adelante-design-system/commit/3268d59)
    — linger fix

---

## 2026-05-18 — v0.3 · "DS source-of-truth + first LosaFlotante port"

### DS repo changes

- **New screen module:** `react/screens/LosaFlotante/` with three files:
  - `LosaFlotante.tsx` — single-file port of the standalone Next.js
    prototype's M1 (mobile user feed) + M2 (FAB → NUEVO USUARIO sheet
    morph). Consumes DS `Button`, `Tag` (from `Form`), `FormField`,
    `SelectionDropdown`, `SlideButton` (later replaced in v0.4),
    `ToggleCards`, `Icon`. Mock data inline. ~482 LOC.
  - `LosaFlotante.stories.tsx` — Storybook entry at *H4 / Losa Flotante*,
    `viewport: mobile1`, fullscreen layout. Default story.
  - `LosaFlotante.css` — `lf-*` styles for the layout primitives that
    don't belong in `design-system.css` (mobile bottom action bar, sheet
    morph surface, UserCard expand grid, paired Rol→Obras row, sheet
    drag-handle, content cascade helper).
- **8 stubs annotated `NOT-IN-DS:`** in `LosaFlotante.tsx` — promotion
  candidates: mobile bottom action bar, FAB → bottom-sheet morph, mobile
  collapsed↔expanded UserCard, Tag with trailing icon (Activo ✓), paired
  Rol→Obras with hairline, two-tab segmented toggle, sheet drag-handle,
  sheet content cascade helper.

### losa.md changes

- **Governing rule #3 added**: *"Design system before custom code."*
- **§17 added — Design system source of truth**: full inventory of
  available DS components, vendoring workflow (with exact `cp` + `sed`
  commands), `.losa-stack` width overrides for the mobile shell, token
  coexistence (`--ds-color-*` vs `--color-*`), the `NOT-IN-DS:`
  annotation rule.
- **§18 added — Publishing back to the DS**: target shape
  (`react/screens/<Name>/`), porting rules (Tailwind → CSS classes,
  relative imports `../../Button/Button`, mock data inline), Stories
  format, branch/commit/PR conventions, maintenance contract.
- **§13 QA additions**: new "DS rules" subsection (4 items).
- **§14 anti-patterns additions**: *"Don't invent a custom component
  when the DS has one"* and *"Don't put sheet CTAs inside the
  scrollable body"*.

### Standalone prototype changes (downstream consequence)

- `~/Documents/claudecode/losa-flotante/`:
  - Vendored `components/ds/{Icon, Button, Form, SlideButton,
    SelectionDropdown, ToggleCards, TabsMenu, design-system.css}` from
    the DS repo.
  - Redirected all `from "../springs"` / `from "../haptic"` imports in
    vendored DS files to `from "@/lib/springs"` / `from "@/lib/haptic"`.
  - Stripped the `@import url("https://fonts.googleapis.com/...")` from
    `design-system.css` (Turbopack rejects @imports mid-file; Roboto is
    loaded via `next/font/google` in `app/layout.tsx`).
  - Refactored `components/losa/nuevo-usuario-sheet.tsx` to use DS
    `FormField`, `SelectionDropdown`, `Button` for tabs, `SlideButton`
    for CTA (later replaced in v0.4).
  - Refactored `components/losa/user-card.tsx` to use DS `Tag` +
    `ToggleCards`.
  - Refactored `components/losa/bottom-action-bar.tsx` to use DS `Button
    color="black" layout="icon" icon="list"` for the burger.
  - Removed obsolete custom components: `tag.tsx`, `field-row.tsx`,
    `sheet-tabs.tsx`, `slide-to-confirm.tsx`.

### Authorship

- **Authored by:** Claude Opus 4.7 (1M context) in pair-coding session
  with @1xmac (2026-05-18).
- **DS merge author:** @1xmac (squash-merged via GitHub UI at 2026-05-18
  22:35 UTC).

### PR / commits

- PR: [#12](https://github.com/DavidpcAD/adelante-design-system/pull/12)
  (merged)
- Merge commit:
  [`279724b6`](https://github.com/DavidpcAD/adelante-design-system/commit/279724b6)

---

## 2026-05-18 — v0.2 · "M1 + M2 build-ready (pre-DS-adoption)"

### Standalone prototype work (not in the DS repo)

Scaffolded the Next.js 16 + Tailwind v4 + motion + Phosphor prototype at
`~/Documents/claudecode/losa-flotante/`. Built M1 (mobile user feed) and
M2 (FAB → NUEVO USUARIO sheet morph). Press contract via a custom
`<PressableButton>` component matching the SwiftUI P2 80/180/120 ms halo
timing. Springs + haptic vocabulary in `lib/` aligned with `losa.md` §4 +
§5. No DS components were used yet — all primitives lived in
`components/losa/` and `components/ui/`. This was the version of the
prototype that proved the contract before it was published to the DS in
v0.3.

### losa.md baseline

`losa.md` v0.2 was the file the maintainer opened the session with. It
covered:

- §1–§16: tech stack, force-light tokens, full color palette + halo
  palette, typography + spacing + radii + shadows, haptic vocabulary,
  spring vocabulary with the SwiftUI math derivation, `PressableButton`
  contract (80/180/120/100 ms), animation patterns (grid-template-rows
  expand, `AnimatePresence mode="popLayout"` crossfade, FAB → sheet
  morph, drag-to-dismiss, scroll-to-fullscreen, three-state machine),
  layout conventions, dnd-kit setup, accessibility (WCAG 2.2 AA),
  state patterns, mock data, QA acceptance checklist, anti-patterns,
  source references, quick-start.
- No DS adoption rules (§17 / §18 / §19 didn't exist yet).
- Two governing rules: vocabulary-not-inline-values, halo-on-every-tap.

### Authorship

- **Authored by:** @1xmac (the file as shared with Claude at session
  start).
- **Adapted by:** Claude Opus 4.7 (1M context) into the live prototype
  scaffolding (no DS repo PR — local work only).

### PR / commits

- No DS repo PR (work was pre-DS-adoption local-only).

---

## How to read this changelog

- **DS repo changes** describe what changed inside this repo —
  components, screens, vocabulary files. Each entry links commits.
- **losa.md changes** describe what changed in the contract that governs
  LosaFlotante work. The contract lives on the maintainer's Desktop at
  `~/Desktop/losa.md`; only the rules / sections appear here, not the
  full diff.
- **Standalone prototype changes** (when listed) describe what happened
  downstream in `~/Documents/claudecode/losa-flotante/` as a consequence
  of DS changes. They're informational — the DS PR is what's logged
  here for sourcing.
- **Authorship**: every entry names the AI agent + session that drafted
  the code/prose AND the GitHub account that performed the merge.
  Future maintainers can trace decisions to a specific session.
- **PR / commits**: every entry includes the PR number + the relevant
  commit SHAs so a `git show <sha>` reveals the actual diff.
