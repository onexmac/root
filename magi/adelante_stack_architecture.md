# Adelante Stack Architecture

> Operating reference for the React-era Adelante platform. Captures the constellation pattern, the shared substrate, the app inventory, and the boundaries that hold the system together. Update as decisions evolve.

> Companion file: `adelante_plataforma_estado.md` (team, governance, decision dynamics).

## Pattern

**Constellation of standalone apps over shared substrate.** Each Adelante tool is its own deployed Next.js application. They share a live component library, an auth layer, a data layer, and a typed domain model — but they do not share a frontend bundle, a router, or a deploy cycle.

This is not Power Apps' fragmentation reflex. It is a deliberate platform pattern: shared architecture, separate frontends. The shared substrate makes the apps cohere; the separation makes each one shippable, debuggable, and ownable on its own terms.

The apps inherit consistency by construction (same components, same tokens, same telemetry, same realtime plumbing) rather than by enforcement. The hardest problem in this pattern — keeping visual and behavioral coherence across satellites — is solved at the component-library layer.

## App inventory

Adelante apps follow a terse internal-industrial-tool naming convention: short code, no marketing name, no emoji. The aesthetic is "this is the tool, get to work." Code and name are shown together as "A3 • Tres Amigos", "B0 • Boletas", and so on.

| Code | Name | Purpose | Primary users |
|---|---|---|---|
| **H4** | Horas (app nº 4) | User management — registering hours, activities, role and obra assignments | Managers, supervisors |
| **B0** | Boletas | Material requests for current obra (the *boleta de salida de materiales*) | Team leaders (jefes de obra) |
| **A3** | Tres Amigos | Sprint control for the home construction division (*tres amigos*, agile import) | Home division leads |
| **V5** | Ventas (app nº 5) | Sales control | Sales team |
| **BC** | Business Central | The ERP in use today — the system of record the new apps are built around, not one of them | — |

When a screen shows where a number comes from (e.g. the KPI prototype), the source is labelled with this code.

H4 sits on top of Entra ID; it owns business-logic identity (which role on which obra), not authentication. Entra remains the identity provider.

A3 is the interesting cultural artifact — agile sprint rituals imported into home construction. Worth a separate civilizational-register conversation about what it means to bring software-team practices into trades work. Not unique to Adelante (Last Planner, takt planning already do this), but the explicit borrowing of Three Amigos vocabulary signals intent.

## Build sequence

Apps are built **sequentially, not in parallel.** H4 ships first. The other three queue.

H4 is first because once it's in operation, the organization can onboard new users — assign roles and obras — without involving IT in support mode. That self-service onboarding capability is what frees IT capacity to build the next app. The trade-off (B0 has higher daily-active-user volume in the field) resolves in favor of unblocking the team's own capacity.

The order of B0, A3, V5 is not yet decided and will be determined by use-pressure and library maturity at the time H4 ships.

A consequence of sequential builds: the "library breaks four apps simultaneously" risk doesn't exist until the second consumer ships. Library guardrails (visual regression, contract tests) are a *before-second-app* concern, not a *before-H4* concern.

## Team and ownership

Five people including the Commander as advisor. **Daniel** — architect by training, brother of the Commander — is team lead and primary builder, code-literate from the Power Apps era and currently developing in React via AI-assisted vibe coding. **Daniela** governs the component library. **Alexia** is the second developer. **David PC** is the product manager. **Marcos** (Commander) operates as advisor: design conscience, technical direction, architectural memory of the Power Apps era.

The full team file — composition, decision dynamics, geography, risk surfaces specific to this configuration — is `adelante_plataforma_estado.md`.

## Location

The entire team works from an office inside Adelante's main warehouse in Sabana Grande de Cartago — on a parcel inside Ciudad del Valle itself, future commercial land. The platform team is literally inside the project the apps serve. Field-truth feedback is a thirty-second walk, not a coordination ritual.

A future move to an adjacent parcel Adelante has already acquired preserves both co-location and operational proximity without remaining inside the commercial development.

## Shared substrate

The live component library is the platform's center of gravity. It is consumed identically by prototypes and production apps — same imports, same components, same behavior. Only the data source changes between stages.

Components ship with:
- **Azure Application Insights instrumentation baked in.** Telemetry is the default, not an opt-in. Every app that consumes the library is instrumented by construction. This is a quiet but compounding advantage — most internal tools fly blind because instrumentation is annoying enough that nobody does it.
- **Socket connections wired up.** Realtime is the default behavior, not a per-app reinvention.
- **shadcn primitives + Tailwind tokens + motion conventions.** Visual and motion language is centralized.

Other shared packages alongside the UI library:
- Auth layer (Entra ID via Auth.js / NextAuth)
- Data layer (Business Central and Azure SQL clients) with the mock/real adapter pattern preserved from the prototype philosophy
- Shared domain types (Obra, Empleado, Material, Sprint, Venta) — one source of truth across all apps. The database refactor currently underway reshapes these; the shared types package follows the refactor, not the other way around.

## Boundaries that must hold

These are the rules that keep the constellation from collapsing back into a monolith or fragmenting into Power Apps-style islands:

- **Apps never import from each other.** H4 does not import from B0. Cross-app sharing happens only through the shared packages.
- **Cross-app data flows through the source of truth.** Business Central or Azure SQL. B0 does not call H4's frontend to ask who a user is; it asks the data layer, which asks the system of record.
- **A change to a shared package requires thinking about all consumers.** This is a feature, not friction — it forces the substrate to stay coherent.
- **The component library is the design system.** No app reinvents primitives. One-off styling at the app level is a smell. *This is the boundary most at risk under AI-assisted development: vibe coding optimizes for forward motion and tends to generate new components instead of reaching for existing primitives. Daniela's library governance is the explicit countermeasure.*

## Prototype-to-production continuity

Prototypes consume the same component library as production. The Things 3 motion quality, the haptic-equivalent micro-interactions, the spring curves — all tuned at the prototype stage carry through to production unchanged. There is no rewrite step.

This dissolves the most common failure mode in design-led teams: prototype quality lost in translation to production. The library is the translation, and it only exists once.

The SwiftUI-equivalent throwaway prototype environment remains separate — that lives in its own Xcode project with hardcoded mocks, for interaction studies meant to be discarded. The React prototypes (Losa Flotante and successors) are stage-one production work.

## Losa Flotante — the design language

*Source: `DavidpcAD/adelante-design-system` (`docs/Losa.md`, `docs/Flotante.md`, `react/springs.ts`, `react/haptic.ts`); tokens transcribed from the Figma page `Losa Flotante / Core`. Read 2026-10-27. For detail, read the repo, not this summary.*

Losa Flotante is the name of Adelante's prototyping design language and its component system. Entry door is `Losa.md` (thin, five rules + routing); `Flotante.md` is the web library; `INFRA.md` the SwiftUI parallel.

**Five governing rules.** (1) Vocabulary, not inline values: springs, haptics, halos, colors, spacing are all named. (2) Halo and press delay on every interactive element. (3) Design system before custom code; anything missing ships as a `NOT-IN-DS:` stub flagged for promotion. (4) DS-first for every fix: change the component in the DS repo, then re-vendor; the prototype never originates a component fix. (5) GitHub is the documentation system: PRs, labels, milestones; no CHANGELOG.

**Press contract (is the brand).** Halo in 80 ms, held 120 ms after release, out in 180 ms; the action fires 100 ms after release. Haptic on touchdown.

**Springs (motion.dev, by meaning).** `snappy` 400/30 taps · `completing` 300/28 confirm · `deleting` 500/25 destructive · `expanding` 170/30 reveal · `settling` 150/28 rest · `shrinking` 224/29 close side of morphs · `popping` 385/22 ephemera. Reduced motion substitutes 200 ms ease-out.

**Haptics (by meaning).** `select`, `complete`, `drag`, `delete`. Android only; iOS Safari no-ops.

**Look.** Forced light mode. Background `#F3F3F3`, white cards, brand green `#ADD010`, charcoal `#1C1C1C`, destructive red `#C96C6C`, warning yellow `#F0C802`.

**Stack.** Next.js 16, TypeScript strict, Tailwind v4, motion.dev, dnd-kit, Phosphor icons. Signature components: morphing Sheet (3 states, drag dismiss), SlideToConfirm / SlideArm, halo `Button`.

## A3 — measuring success on home production tasks

A3 imports Three Amigos vocabulary from software practice into home construction. The instrumentation question is *how to measure whether the import is working* without building a process layer that suffocates the team it serves.

The disposition is Rework (Fried/DHH) — measure what falls out of work already happening, react to clusters, don't pre-engineer:

- **PPC** (Percent Plan Complete) — percent of weekly committed tasks completed. One number per sprint per team.
- **Miss reason codes** — every uncompleted task tagged with one of six reasons: prereq not ready, materials, weather, design change, crew, other. Thirty-second tag, no narrative.

The percentage moves slowly. The miss-reason distribution is where the signal lives — after four to six weeks the pattern is visible without analytics. If materials shows up half the time, the lever is upstream in B0, not in A3. If "prereq not ready" dominates, the Three Amigos commitment ritual itself is the lever. The instrumentation diagnoses which problem you actually have.

The Three Amigos ritual earns its keep at the *commitment moment* — site lead, trade crew, and quality function aligned before the task enters the sprint. The risk specific to physical construction (unlike software, where "before code" is a clean moment) is that the equivalent "before work" moment is harder to manufacture. If the ritual is happening but PPC stays low with misses clustering outside the trio's control (design changes mid-sprint, materials), the ritual isn't the lever — the upstream constraint is.

## Stack constraints

- **Framework:** Next.js for all four apps. Vite reserved for genuinely disposable prototypes if needed.
- **Router decision pending:** App Router vs Pages Router. App Router for new capabilities and Server Components; Pages Router for a gentler on-ramp from Power Apps mental models. Decide before H4 ships.
- **Monorepo:** Turborepo (or pnpm workspaces) with separate deploy targets per app.
- **Deployment:** Azure environment (compliance / proximity to Business Central). Vercel is not the default.
- **Auth:** Entra ID via Auth.js / NextAuth, shared package, single sign-on across all apps.

## Open questions

- **Router choice (App vs Pages).** Decide before H4 ships.
- **Role propagation across apps.** H4 owns role-on-obra. The other apps need to read it on every meaningful action — per-call lookup against the data layer, JWT claim, or cached client state. Each has different consequences when permissions change mid-session. Decide as part of the data-layer package shape; lands before B0 starts.
- **Socket multiplexing.** Components opening their own socket connections is powerful but risks connection sprawl. Confirm whether the library multiplexes at the app shell level or per-component. Healthier pattern is one connection at the shell, components subscribing through a client-side event bus.
- **Telemetry hygiene.** With Application Insights baked into components, decide which events fire by default and which require opt-in. Default-everything is noisy; default-nothing defeats the point.
- **Library breaking-change protocol.** Daniela governs day-to-day, but when a breaking change is necessary, what's the coordination ritual with Daniel and Alexia? Becomes urgent when the second app starts consuming.

## What is not in scope

- The SwiftUI prototype environment (separate project, separate philosophy, discardable artifacts).
- Customer-facing marketing or public web properties (different requirements; Next.js still appropriate but separate codebase).
- ERP / backend architecture (Business Central + Azure SQL is the system of record; this document covers what sits on top of it).
- Team composition and governance (lives in `adelante_plataforma_estado.md`).
