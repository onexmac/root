# memory.md — Adelante Prototyping

The grounding file Claude Code reads at the start of every prototype session for Adelante. Read it first, every time. It tells you **who** we are, **what** stack we work in, **how** we work, and **where** to go for component-level detail.

---

## 0. Read order

1. **This file** (memory.md) — team, stack, workflow, environment.
2. **losa.md** — the 5 governing rules + routing for prototyping work.
3. **flotante.md** (in the repo) — component library: tokens, springs, haptics, animation patterns, DS inventory, vendoring.
4. **Per-component specs** (HALOPRESS.md / ICON.md / SLIDE_TO_CONFIRM.md / SHEET_MORPH.md) — load on demand when touching a specific component.
5. **INFRA.md** — iOS/Swift parallel to flotante.md. Load when working on SwiftUI prototypes.

---

## 1. Purpose

Adelante is a construction company in Costa Rica. We're transitioning our app stack from Power Apps to a modern stack: **React/Next.js for web, SwiftUI for iOS**. Prototyping is how we test interaction quality, component behavior, and data shape before anything ships to production.

A prototype is **disposable, instrumented design**. It exists to answer questions, not to be deployed. Its job is to make the right decisions cheap to reach.

---

## 2. The v2.0 prototyping workflow

The architecture has three canonical source files plus Claude:

### 2.1 losa.md — Session opener (thin)

Shared into a session for prototyping work. Contains the 5 governing rules and a routing table. Deliberately thin so it doesn't crowd context.

### 2.2 flotante.md — Component library (fat, repo-canonical)

**The canonical source of truth for web components.** Lives in the repo. Real component code + dos/don'ts. Loaded on demand when Claude needs to render or modify a real component. Figma is NOT canonical — only flotante.md is. For iOS, the parallel is INFRA.md.

### 2.3 Figma — Exploration surface (not truth)

Designers use Figma for quick layout and visual exploration. The Dev Mode MCP server exposes frames to Claude Code for layout reference, but the components Claude ships must come from flotante.md / INFRA.md, not from Figma's invented stand-ins.

### 2.4 Claude Code's job per session

- Read this file (memory.md) for grounding
- Read losa.md for rules + routing
- Read the Figma prototype screens (via Dev Mode MCP) for layout
- Consult flotante.md (or INFRA.md for iOS) when assembling real components
- Use the session prompt to understand behavior
- Output a prototype that combines layout (from Figma) + real components (from flotante.md) + behavior (from prompt)

**The anti-hallucination architecture is the point.** Components must be real — never invented. If a component doesn't exist in flotante.md, stop and flag it. Do not improvise.

---

## 3. Database tiers

```
Local         Sandbox       Stage DB      Producción
(Dev / Int.)  (QA)          (QA)          20 Betas / 1000 Production
```

- **Prototypes may connect to Sandbox** when mock data is insufficient — for data-shape validation against real field lengths, null states, cardinality.
- **Prototypes must NEVER connect to Stage DB or Producción.** No exceptions.
- **Default is mock data.** Sandbox is an upgrade path, not the starting point.

---

## 4. Component promotion path

```
Temp Losa Flotante   →   Live Code Losa Flotante
```

New components land in Temp first. Promotion to Live is a deliberate human review — never automated. Treat this exactly like DB promotion: a person decides.

When prototyping introduces a new component, it goes to Temp. Live is only modified after design + dev review.

---

## 5. Triage — when a prototype reveals a problem

| Problem | Owner | Where the fix goes |
|---|---|---|
| Visual / exploration miss | Designer | Figma |
| Component behavior wrong or missing | Designer + dev | flotante.md / INFRA.md (Temp first, then promoted to Live after review) |
| Prototype-specific composition or wiring bug | Whoever is on the prototype | The prototype repo (disposable) |

The triage matters because canonical sources drift if fixes land in the wrong layer. Every prototype iteration should sharpen flotante.md, not accumulate cruft in prototype repos.

---

## 6. DS-first development workflow

**Governing rule #4 from losa.md.** When a DS-owned component needs to change — bug fix, behavior tweak, new variant — the change **originates** in the DS repo (`adelante-design-system`), not in the standalone prototype's vendored copy at `components/ds/`. The standalone is a consumer.

### The 5 steps

1. **DS branch + commit.**
   ```bash
   cd ~/Documents/claudecode/adelante-design-system
   git checkout main && git pull
   git checkout -b fix/<component>-<short-desc>
   ```
   Edit `react/<Component>/<Component>.tsx` (+ `.css`, `.stories.tsx`). Verify in `npm run storybook` locally.

2. **DS PR.** Pull current labels/milestones (see §7). Open the PR with the right metadata applied. Wait for review and merge.

3. **Pull main, re-vendor** the changed files into the standalone:
   ```bash
   DS=~/Documents/claudecode/adelante-design-system/react
   cp "$DS/<Component>/<Component>.tsx" \
      "$DS/<Component>/<Component>.css" \
      ~/Documents/claudecode/<prototype>/components/ds/<Component>/
   # If springs/haptic changed, also: cp "$DS/springs.ts" lib/
   sed -i '' 's|from "\.\./springs"|from "@/lib/springs"|g; s|from "\.\./haptic"|from "@/lib/haptic"|g' \
     ~/Documents/claudecode/<prototype>/components/ds/<Component>/<Component>.tsx
   ```

4. **Verify in the standalone.** `npm run dev` on the standalone (not Storybook alone) — Storybook isolates the component, the standalone exercises it in real layout context (sheet overflow, scroll containers, z-index).

5. **Mirror in `react/screens/<Name>/`** if the screen's consumption changed (different prop name, removed prop). Same PR as the component fix — not a follow-up.

### What NOT to do

- **Don't** edit `components/ds/` in the standalone. The next re-vendor silently overwrites it.
- **Don't** ship without a Storybook story for any new state.
- **Don't** declare done from Storybook alone. Step 4 is required.
- **Don't** open the DS PR without applying labels you found via `gh label list` (pull-first — see §7).

### Stacked PR pattern

When a fix depends on an unmerged PR, branch off the existing branch and open the new PR with `--base <existing-branch>`. When the existing PR merges, GitHub auto-rebases the stacked PR to `main`. Don't bloat one PR with multiple unrelated changes.

---

## 7. GitHub-native documentation workflow

**Governing rule #5 from losa.md.** There is no `CHANGELOG.md` in Adelante repos. History lives where the work happens — in PR descriptions, review comments, conversation threads, labels, milestones, and Projects v2. To understand a past decision, read the PR — not a file.

If a previous session shipped a `CHANGELOG.md`, the current session deletes it.

### 7.1 Pull-first workflow

Before opening or updating a PR, run these reads:

```bash
gh label list --repo <org>/<repo>
gh api /repos/<org>/<repo>/milestones?state=all
gh pr view <number> --json labels,milestone,assignees,projectItems,reviewRequests

# Projects v2 — requires `read:project` scope on the token. If the
# query returns INSUFFICIENT_SCOPES, surface that rather than silently skip.
gh api graphql -f query='
  query { user(login: "<owner>") {
    projectsV2(first: 10) { nodes { id title number url } }
  } }'
```

Summarize results to the dev as **menus, not assumptions**:

> *"PR #N has no labels. The repo has these: enhancement, documentation, bug, ... Which apply?"*

Never apply metadata without an explicit yes.

### 7.2 Prompt-before-create

If the dev needs metadata that doesn't exist, prompt with: exact name (kebab-case for labels), color + description, due date (if milestone), and for projects, confirmation that the Project already exists on GitHub web. On yes:

```bash
gh label create <name> --description "..." --color <hex> \
  --repo <org>/<repo>
gh api /repos/<org>/<repo>/milestones --method POST \
  -f title="..." -f description="..."
gh pr edit <n> --add-label <name> --milestone "<title>"
```

### 7.3 PR description requirements

The PR body is the **canonical** record of:

- **What changed** — diff + English summary at the top
- **Why** — the trade-off / bug / request that prompted it. Quote the requester verbatim where intent matters
- **How authored** — for AI-pair sessions, end with `Co-Authored-By: Claude <noreply@anthropic.com>` trailer
- **How to verify** — checklist the reviewer can execute without context-switching
- **What's not addressed** — known follow-ups, missing metadata flags
- **Linked work items** — `AB#<id>` for ADO when synced; `Closes #NN` / `Fixes #NN` / `Refs #NN` for GitHub issues

Use the `--body "$(cat <<'EOF' ... EOF)"` HEREDOC pattern with `gh pr create` so newlines + markdown render cleanly.

### 7.4 Azure DevOps sync (when present)

Adelante's ADO board (when used):
- Org: `davidpc98` · Project: `Main work` · Team: `Main work Team`

Pull from **both** GitHub and ADO and reconcile when applying labels. ADO PAT goes in `~/.config/adelante/ado.token` (chmod 600, never committed). Required scope: `Work Items: Read`. Query via curl:

```bash
curl -s -u ":$ADO_PAT" \
  "https://dev.azure.com/davidpc98/Main%20work/_apis/wit/wiql?api-version=7.1" \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT [System.Id], [System.Title], [System.Tags] FROM WorkItems WHERE [System.TeamProject] = \"Main work\" AND [System.State] <> \"Closed\""}'
```

When the Azure Boards GitHub app is installed on the repo, `AB#<id>` mentions in PR descriptions auto-link to ADO work items.

---

## 8. Tech stack

### 8.1 Web prototypes (fixed stack)

- **Next.js 16** + TypeScript (strict)
- **Tailwind CSS v4** with `@theme inline` token generation
- **`motion`** (motion.dev — formerly Framer Motion) — install `motion` not `framer-motion`; import from `motion/react`
- **`@dnd-kit/core`** + `@dnd-kit/sortable` + `@dnd-kit/modifiers` for drag-and-drop
- **`@phosphor-icons/react`** for icons not covered by DS Icon registry
- **shadcn/ui** for primitives where DS doesn't cover
- **`adelante-design-system`** components vendored into `components/ds/`
- Vercel for deploy previews (only when explicitly requested)

### 8.2 iOS prototypes

- **SwiftUI** (iOS 17+)
- **SwiftData** where persistence is needed
- SwiftUI spring curves (named vocabulary, never inline literals)
- `UIImpactFeedbackGenerator` / `UINotificationFeedbackGenerator` for haptics
- `@Observable` ViewModel pattern

### 8.3 Shared design tooling

- **Figma Dev Mode MCP Server** (local, port 3845) — works with Claude Code only, NOT Claude chat or the macOS desktop app
- **Rive** for cross-platform motion design with state machines (selected over Phase and Framer)

### 8.4 Production backend (NOT for prototypes)

- Microsoft Business Central (ERP)
- Azure SQL (see database tiers above)

---

## 9. Quality benchmark — Things 3 for iOS

The interaction quality bar is Things 3. Concretely:

- **Snappy perceived performance** — no lag between intent and acknowledgment
- **Physics-based spring animations with semantic names** (`snappy`, `completing`, `deleting`, `expanding`, `settling`, `shrinking`, `popping`) — never inline `stiffness: …` literals
- **Press contract timing**: 80 ms attack, 180 ms hold, 120 ms release, 100 ms click delay (the "halo" feedback — see HALOPRESS.md for the full spec)
- **Haptic events tied to semantic moments** (`select`, `drag`, `complete`, `delete`, `error`) — not decorative
- **Typographic restraint** — clear hierarchy, generous spacing, no decorative type
- **Motion choreography** (staggered children, sequenced reveals) when revealing structure
- **`prefers-reduced-motion` support** — substitutes `{ duration: 0.2, ease: "easeOut" }` for the spring vocabulary

Detailed token + vocabulary definitions live in flotante.md (web) and INFRA.md (iOS).

---

## 10. Filesystem conventions

### 10.1 Prototype repos

Prototypes live at `~/Documents/claudecode/<prototype-name>/` — never on Desktop. Create the parent `claudecode` folder if missing.

```
~/Documents/claudecode/
├── adelante-design-system/    # The DS repo (canonical components)
├── losa-flotante/             # Mobile prototype example
├── control-usuarios/          # Web prototype example
├── adelante-web/              # Web reference
└── <new-prototype>/           # Each prototype gets its own folder
```

### 10.2 Standard peer files per web prototype

```
lib/
├── springs.ts          # mirror of react/springs.ts in the DS
├── haptic.ts           # mirror of react/haptic.ts in the DS
└── utils.ts            # cn() helper

components/ds/          # vendored from adelante-design-system
├── Button/
├── Form/
├── Icon/
├── Sheet/
├── SelectionDropdown/
├── SlideButton/
├── SlideToConfirm/
├── SlideArm/
├── TabsMenu/
├── ToggleCards/
└── design-system.css   # strip the Google Fonts @import (Roboto via next/font)

components/ui/
└── pressable-button.tsx  # fallback shim when no DS variant fits
```

### 10.3 Force-light layout

Prototypes are spec'd in light mode (dark mode is a later concern). Apply force-light tokens at the route-group level via `app/<prototype>/layout.tsx`. Both `--surface-*` and `--color-*` are required — Tailwind v4's `@theme inline` generates utilities from `--color-*` only. (See flotante.md §3.1 for the exact wrapper.)

### 10.4 `data-prototype` attribute

The root `<main>` element of every prototype gets `data-prototype` so prototype-only CSS rules (`user-select: none`, `touch-action: manipulation`, `overscroll-behavior-y: contain`) apply without polluting production styles.

---

## 11. CLI configuration

Each dev configures these on their own machine.

### 11.1 `gh` CLI

Required scopes: `repo`, `read:org`, `gist`. For Projects v2, also `read:project`.

Verify:

```bash
gh auth status
gh api user --jq .login
```

If Projects v2 queries fail with INSUFFICIENT_SCOPES, regenerate the token at <https://github.com/settings/tokens> with the `project` scope added.

### 11.2 Azure DevOps

No `az` CLI required. ADO API calls use raw `curl` + PAT stored at `~/.config/adelante/ado.token` (chmod 600, never committed).

Generate a PAT at <https://dev.azure.com/davidpc98/_usersSettings/tokens> with `Work Items: Read` scope.

### 11.3 Figma Dev Mode MCP

- Plugin: `figma@claude-plugins-official` (installed in the Figma desktop app)
- Use `mcp__Figma__get_metadata` + `mcp__Figma__get_screenshot` proactively whenever a Figma URL or design reference appears
- Skip `get_design_context` unless explicitly needed
- Common failure: port 3845 in use after a Figma restart:
  ```bash
  lsof -i :3845
  kill -9 <PID>
  ```
  Then fully quit and relaunch Figma desktop. The MCP server only works with Claude Code, not Claude chat or the macOS desktop app.
- URL → nodeId conversion: hyphens convert to colons. `866-3514` → `866:3514`.

---

## 12. Skills available

The team maintains custom Claude Code skills that automate common tasks:

- **`prototype`** — scaffolds a new prototype with the full Adelante stack pre-wired (`lib/springs.ts`, `lib/haptic.ts`, `lib/utils.ts`, force-light layout, vendored DS components). Use for new prototype starts instead of manual scaffolding.
- **`figma-use`** — load before any Figma write via the `use_figma` MCP tool. Provides Plugin API guidance.

---

## 13. Shareable preview convention

The **Storybook gh-pages** of `adelante-design-system` is the canonical link to share. Standalone Next.js apps in `~/Documents/claudecode/<name>/` are local dev only — no Vercel deploy unless explicitly requested.

- Storybook: <https://davidpcad.github.io/adelante-design-system>
- Storybook iframe (clean, mobile-friendly): `https://davidpcad.github.io/adelante-design-system/iframe.html?id=<screen-id>`

Auto-deploys via `.github/workflows/deploy-storybook-pages.yml` on every push to `main` (~1–3 min build).

---

## 14. The spec-per-component pattern

Each complex component or screen has its own `.md` spec (on Desktop or in the repo) with frontmatter `name` + `purpose` + `source`. When a session changes the component's behavior, **the spec file is updated FIRST** (contract before code). The DS implementation should match the spec at any commit.

Active specs:

| File | Covers |
|---|---|
| **flotante.md** | Web component library — the master inventory |
| **INFRA.md** | iOS/Swift parallel — SwiftUI infra |
| **HALOPRESS.md** | The 80/180/120/100 ms press contract for React |
| **ICON.md** | AdelanteMark + favicon + PWA + iOS AppIcon recipes |
| **SLIDE_TO_CONFIRM.md** | SlideToConfirm + SlideArm behavior contract |
| **SHEET_MORPH.md** | Sheet 3-state morph + drag-to-dismiss + cascade |
| **NEXT_SESSION.md** | Transient session-state for resuming work |

---

## 15. Working conventions with Claude Code

These are team conventions that apply to every dev's sessions, not personal preferences.

### 15.1 Language

Product copy and UI strings are in **Spanish** (Costa Rican vocabulary — use *Cédula*, not *DNI*). Code, identifiers, filenames, log strings, commit messages, PR titles, and technical labels stay in **English**. Chat-language is the dev's call.

### 15.2 Preview before push

Devs must **see changes in their localhost browser before any push to GitHub**. Workflow:

1. Edit the DS component.
2. Vendor into the standalone (`components/ds/`).
3. Reload localhost (each prototype runs on its own port; check the project's `package.json`).
4. Verify the change visually.
5. Then commit + push.

Claude should wait for the dev's explicit go-ahead before pushing — "push", "go", "ship", or similar. No auto-pushes.

### 15.3 Ask when paths fork

When there are 2–4 reasonable paths and the dev hasn't picked, ask instead of assuming. The "Other" free-text option is encouraged — devs sometimes pick something not on the list.

### 15.4 Numeric trade-offs spelled out

When tuning a value (rotation amount, threshold, duration), surface **explicit numbers with consequences**. Example:

> 540° = 1.5 spins. Close icon lands at 180° visual = upside-down.
> 360° = 1 spin. Lands at 0° = natural.
> 720° = 2 spins. Lands at 0° = natural, but more spin time.

Numbers + their consequence is the right level of detail to surface, not just "use a higher number."

### 15.5 Quote intent verbatim

When summarizing decisions in PR descriptions or contract files, quote the dev's exact words where they meant something specific. Verbatim quotes are better evidence of intent than paraphrase.

### 15.6 No padding

Lead with the answer, then support it. Brevity by default; depth when asked. Flag processing time upfront — no dead air. Don't pad responses with options when a decision is implicit.

### 15.7 No workarounds

Don't suggest copy-paste workarounds, screenshots, or "do it manually" when the underlying problem is fixable. If a tool is broken, fix the tool. If a component is missing, surface that — don't work around it.

### 15.8 Simple > clever

Propose the simplest thing that meets the spec verbatim. If a clever approach is genuinely better, explain the trade-off briefly and let the dev decide.

---

## 16. Dos

- DO read losa.md first when the session opens for prototyping work
- DO load flotante.md (or INFRA.md for iOS) on demand when assembling real components
- DO use named spring vocabulary from `lib/springs.ts`
- DO wrap every tap target in the DS `Button` (or `PressableButton`/`PressableSlot` shim when no DS variant fits)
- DO use Sandbox DB only when mock data is genuinely insufficient
- DO surface uncertainty — if flotante.md doesn't cover a component, say so and stop
- DO use the Figma Dev Mode MCP server (port 3845) for layout reference
- DO match the Things 3 quality bar
- DO write product copy in Spanish (Costa Rican vocabulary), code in English
- DO pull GitHub metadata before touching a PR; prompt before creating new labels/milestones
- DO wait for the dev's explicit approval before pushing to GitHub
- DO ask when 2–4 reasonable paths exist and the dev hasn't picked

## 17. Don'ts

- DON'T invent components. If it's not in flotante.md / INFRA.md, stop and flag.
- DON'T connect to Stage DB or Producción. Ever.
- DON'T use inline spring literals. Only named vocabulary.
- DON'T use raw `<button>` or `<div onClick>`. Every tap goes through the DS `Button` or `PressableButton` / `PressableSlot`.
- DON'T put `overflow-hidden` on `<main>` or any halo ancestor.
- DON'T suggest copy-paste workarounds when the underlying problem is fixable.
- DON'T promote components automatically. Temp → Live is human-reviewed.
- DON'T treat Figma components as canonical — they're exploratory.
- DON'T deploy a prototype to production. Prototypes are disposable.
- DON'T conflate Figma MCP surfaces. The cloud REST connector (Claude chat) ≠ Dev Mode local server (Claude Code).
- DON'T use Spain-coded vocabulary (e.g., DNI). Costa Rica context: *Cédula*, *Identificación*.
- DON'T edit `components/ds/` in the standalone prototype. The next re-vendor silently overwrites it. Fix in the DS repo first.
- DON'T ship a `CHANGELOG.md` file. History lives in PR descriptions, review threads, labels, milestones.
- DON'T invent GitHub labels / milestones / projects. Pull-first every session.
- DON'T apply PR metadata without explicit dev approval.
- DON'T over-engineer. Propose the simplest thing that meets the spec verbatim.

---

## 18. Success criteria for a prototype session

A prototype session succeeded if:

1. The prototype matches the Figma layout
2. Every component in the prototype came from flotante.md / INFRA.md (or landed in Temp with a flag)
3. No production DB was touched
4. The interaction quality matches the Things 3 bar
5. The session produced learnings — what to add to flotante.md, what to tighten in losa.md — not just a deliverable
6. The dev saw the change in localhost and gave explicit approval before any push to GitHub

The deliverable is the side effect. The system improvement is the point.
