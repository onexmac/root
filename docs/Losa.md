---
name: losa-flotante-session-opener
brand: Losa Flotante
companion: Memory.md (Claude Code grounding), Flotante.md (web components), INFRA.md (iOS components)
purpose: The thin session opener for Adelante prototyping work. Share this into a Claude chat session to ground the conversation in our 5 governing rules and the routing table. For component-level detail, this file points to flotante.md (web) or INFRA.md (iOS). For session-level grounding (team, stack, workflow), see Memory.md.
---

# Losa.md — Session opener for Adelante prototyping

This file is the entry door. It is deliberately thin. Five governing rules + a routing table + a quick-start checklist. Everything else lives in the files this one points to.

> If you find yourself wanting to add component code, design tokens, or a tech-stack diagram to this file — stop. That belongs in flotante.md. Losa.md stays thin so it can be loaded into every session without crowding context.

---

## The 5 governing rules

1. **Vocabulary, not inline values.** Springs, haptics, halos, colors, spacing — all named. Never `transition={{ stiffness: 320 }}` inline; never `#ADD010` inline. If you need a new meaning, add it to the vocabulary in flotante.md / INFRA.md **before** using it.

2. **Halo and press-delay on every interactive element.** No raw `<button>` or `<div onClick>`. Every tap target goes through the DS `Button` (preferred) or `PressableButton` / `PressableSlot` shim. The 80 / 180 / 120 / 100 ms timing **is** the design language — changing it changes the brand.

3. **Design system before custom code.** The [adelante-design-system](https://github.com/DavidpcAD/adelante-design-system) is the canonical source of UI primitives. Reach for a DS component first; author a custom primitive only when nothing in the DS matches — and flag it as `NOT-IN-DS:` for promotion.

4. **DS-first for every fix.** When a component needs to change — bug fix, behavior tweak, new variant — author the change **in the DS repo first** (branch + Storybook story + PR). Then re-vendor it into the prototype. The standalone prototype is **never** the place where component fixes originate; it's a consumer. Full workflow: Memory.md §8.

5. **GitHub is the documentation system.** PR descriptions, line comments, conversation threads, labels, milestones, and Projects are how change is recorded. There is no `CHANGELOG.md`. Before opening or updating a PR, **pull-first** — fetch current labels / milestones / projects from GitHub (and Azure DevOps when synced) and surface them. Never invent metadata. Full workflow: Memory.md §9.

---

## Routing — when you need detail

| Need | Go to |
|---|---|
| Team / stack / workflow / environment / CLI auth state | **Memory.md** |
| DS-first 5-step workflow | **Memory.md §8** |
| GitHub-native docs workflow (no CHANGELOG, pull-first, ADO sync) | **Memory.md §9** |
| Communication style (Spanish, preview-before-push, simple > clever) | **Memory.md §3** |
| Web component library — tokens, springs, haptics, DS inventory, vendoring | **flotante.md** |
| iOS / SwiftUI component library — parallel to flotante.md | **INFRA.md** |
| Press contract (the 80 / 180 / 120 / 100 ms numbers) — React implementation | **HALOPRESS.md** |
| Sheet — 3-state morph + drag + cascade | **SHEET_MORPH.md** |
| Slide-to-confirm + SlideArm | **SLIDE_TO_CONFIRM.md** |
| Adelante brand mark + favicon + PWA + iOS AppIcon | **ICON.md** |
| Where I left off last session | **NEXT_SESSION.md** |
| Anything not above | Ask the user via `AskUserQuestion` |

---

## Read order for any new session

1. **Memory.md** — grounding (team, stack, workflow). Loaded first.
2. **This file (Losa.md)** — the 5 rules + routing. Re-read whenever you're about to make a decision that touches them.
3. **flotante.md** (or INFRA.md for iOS) — load when you need to assemble real components.
4. **Per-component specs** (HALOPRESS / SHEET_MORPH / SLIDE_TO_CONFIRM / ICON) — load on demand when you're touching that specific component.

---

## Quick start for a new screen

```bash
# 0. Confirm grounding
#    - Read Memory.md for team + workflow context
#    - Read this file (Losa.md) for the 5 rules
#    - Note: if this is a brand-new prototype, use the `prototype` skill
#      to scaffold the standard stack (Memory.md §14)

# 1. Verify peer files exist (vendor from DS if missing — flotante.md §13)
ls lib/springs.ts lib/haptic.ts components/ui/pressable-button.tsx
ls components/ds/Button components/ds/SlideArm components/ds/SlideToConfirm components/ds/Form

# 2. Create the route
mkdir -p app/<prototype-name>
touch app/<prototype-name>/layout.tsx   # force-light tokens wrapper (flotante.md §3.1)
touch app/<prototype-name>/page.tsx     # screen

# 3. Create the screen components
mkdir -p components/<prototype-name>
touch components/<prototype-name>/mock-data.ts

# 4. Read the Figma node BEFORE writing any UI
#    Use `mcp__Figma__get_metadata` + `mcp__Figma__get_screenshot`
#    Components must come from flotante.md §12, not from Figma's stand-ins

# 5. Build & verify
npm run dev
# Walk through the QA checklist in flotante.md §16 on a real device

# 6. When stable, publish back to DS as a Storybook screen (flotante.md §15)

# 7. PR — pull GitHub metadata first (Memory.md §9.1), prompt before creating
#    new labels/milestones, wait for user "go" / "push" before pushing
```

---

## Where things live

| Surface | Location | Purpose |
|---|---|---|
| **Prototype repos** | `~/Documents/claudecode/<prototype-name>/` | Local dev workspace. Disposable. |
| **DS repo** | `~/Documents/claudecode/adelante-design-system/` | Canonical components (`react/<Component>/`) + Storybook screens (`react/screens/<Name>/`) |
| **Shareable preview** | Storybook gh-pages: <https://davidpcad.github.io/adelante-design-system> | The link to share. Not Vercel. |
| **iOS prototypes** | `~/Documents/Xcode/<ProjectName>/` | SwiftUI workspace. See INFRA.md. |
| **Contract files** | `~/Desktop/*.md` | Losa.md, flotante.md, INFRA.md, HALOPRESS.md, etc. Loaded into sessions as needed. |
| **Active session state** | `~/Desktop/NEXT_SESSION.md` | What's open, what's next. Updated session-close. |

---

## What this file is NOT

- It is not the component library. That's flotante.md.
- It is not the team/workflow grounding. That's Memory.md.
- It is not the place for design tokens, spring tables, or QA checklists. Those are in flotante.md.
- It is not a CHANGELOG. History is in GitHub PRs.
- It is not a tutorial. The patterns in flotante.md assume you've read this file's 5 rules first.

If a session starts adding component code or design tokens to Losa.md, the next session should move that content to flotante.md and re-slim this file. The thinness is the discipline.

---

*This file is the contract for how prototyping sessions start. If the 5 rules change, this file changes first.*
