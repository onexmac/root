# LosaFlotante — Changelog

Version history of the LosaFlotante prototype contract (`losa.md`) and the
screen module at `react/screens/LosaFlotante/`. Newest entries on top.

**Maintenance rule** (from `losa.md` §0): every PR that touches the
LosaFlotante screen, its consumed DS components, or the `losa.md` contract
itself **must** add an entry to this file in the same PR. The entry lists
what changed, why, and links to the merge commit / PR.

The canonical contract this changelog tracks:
[`~/Desktop/losa.md`](https://github.com/DavidpcAD/adelante-design-system/blob/main/react/screens/LosaFlotante/CHANGELOG.md)
(not yet committed to the repo — lives on the maintainer's Desktop).

Live preview: <https://davidpcad.github.io/adelante-design-system/?path=/story/h4-losa-flotante--default>

---

## 2026-05-18 — v0.5 · "Linger halved + CHANGELOG-in-repo"

**Behavior fix**

- `SlideToConfirm.successHoldMs` default changed from **1600 ms → 800 ms**.
  The check is still long enough to register but no longer feels sluggish
  when the parent reacts (e.g. the NUEVO USUARIO sheet closing).
- `SlideArm.successHoldMs` default also 800 ms (bubbles through to
  SlideToConfirm — kept in sync).
- The Storybook `successHoldMs` range control now starts at 200 ms (was
  300) for designers to dial it down further per use-case.

**Workflow change**

- `CHANGELOG.md` now lives **inside the DS repo** at
  `react/screens/LosaFlotante/CHANGELOG.md` (this file), not on the
  maintainer's Desktop. Every PR touching LosaFlotante, its components,
  or `losa.md` must update this file in the same PR.
- Vercel deploy of the standalone Next.js prototype is **deprecated** as
  the shareable preview. The Storybook gh-pages URL above is the canonical
  link to share. The standalone stays as local dev only.

**PR**: [#13](https://github.com/DavidpcAD/adelante-design-system/pull/13)
(commits up to the linger-halved fix)

---

## 2026-05-18 — v0.4 · "SlideArm: tap-a-button-it-grows-into-slider"

**Behavior**

- New DS components: `SlideToConfirm` (green knob that grows with drag,
  not a fixed-size knob like `SlideButton`) and `SlideArm` (wraps
  SlideToConfirm so a tap on the collapsed pill arms it into the
  full-width slider with a cancel X above).
- `react/springs.ts` gains `shrinking` (224/29 mass 1) and `popping`
  (385/22 mass 1) — needed by the symmetric open/close rule and the
  cancel-X pop.
- LosaFlotante screen's "Crear usuario" footer migrated from `SlideButton`
  to `<SlideArm label="Crear usuario" collapsedWidth={200} />`.
- Linger contract: `onConfirm` fires **after** `successHoldMs`, not
  immediately. Consumers that close-on-success no longer cut off the
  success state.

**Workflow change**

- `losa.md` adds governing rule #4 (DS-first for every fix) and §18.6 (the
  5-step procedure: branch DS → PR → merge → re-vendor → verify standalone
  → mirror screen).

**PR**: [#13](https://github.com/DavidpcAD/adelante-design-system/pull/13)

---

## 2026-05-18 — v0.3 · "DS source-of-truth + Publishing workflow"

**Workflow change**

- `losa.md` adds governing rule #3 (DS before custom code), §17 (DS
  component inventory + vendoring workflow + width overrides + token
  coexistence), §18 (port standalone prototypes back to `react/screens/`
  as Storybook screens), §13 QA additions, §14 anti-pattern additions.

**Behavior**

- First port of LosaFlotante M1/M2 into the DS as a Storybook screen at
  `react/screens/LosaFlotante/`. 8 stubs annotated `NOT-IN-DS:` (mobile
  bottom action bar, FAB→sheet morph, mobile UserCard, Tag-with-trailing-
  icon, paired Rol→Obras with hairline, two-tab segmented toggle, sheet
  drag-handle, content cascade helper).

**PR**: [#12](https://github.com/DavidpcAD/adelante-design-system/pull/12)
merged 2026-05-18 22:35 UTC (`279724b6`).

---

## 2026-05-18 — v0.2 · "M1 + M2 build-ready"

**Behavior**

- Standalone Next.js 16 + Tailwind v4 + motion + Phosphor prototype
  scaffolded at `~/Documents/claudecode/losa-flotante/`. Built M1 (mobile
  user feed) and M2 (FAB → NUEVO USUARIO sheet morph). Press contract via
  custom `<PressableButton>`. Springs / haptic in `lib/`.

**Contract (losa.md)**

- §1–§16 covered: tech stack, force-light tokens, color palette, halo
  palette, typography, spacing, radii, shadows, haptic vocabulary, spring
  vocabulary (with the SwiftUI math derivation), PressableButton contract
  (80/180/120/100 ms), animation patterns, layout conventions, dnd-kit,
  accessibility, state patterns, mock data, QA checklist, anti-patterns,
  source references, quick-start. No DS adoption rules — all primitives
  lived in `components/losa/` and `components/ui/`.

No PR (pre-DS-adoption local work).

---

## How to read this changelog

- **Behavior** entries describe what changed in the rendered UI or the
  DS component behavior. Track these to know what the user sees.
- **Workflow change** entries describe rules added to `losa.md` (the
  contract). Track these to know what's expected of future PRs.
- **PR** links go to the GitHub PR; the merge commit is in the PR view.
