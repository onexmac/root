---
name: design-system-losa-flotante
description: Creates implementation-ready design-system guidance derived from local Figma styles in "Losa Flotante".
---

<!-- TYPEUI_SH_MANAGED_START -->

# Losa Flotante

## Mission
Document and operationalize the Losa Flotante style foundations extracted from Figma so teams can build consistent interfaces quickly.

## Brand
- Product/brand: Losa Flotante
- Audience: Designers and engineers building this product
- Product surface: web app

## Style Foundations
- Visual style: structured, token-driven, layered, radius corner radious - spacing /corner radiuos/corner radiuos 4/corner radious - spacing /corner radiuos/corner radiuos 8/corner radious - spacing /corner radiuos/corner radiuos 16/corner radious - spacing /corner radiuos/corner radiuos 32
- Typography scale: body/regular 12px, body/semibold 12px, body/regular 16px, body/semibold 16px, subtitle/regular 20px, subtitle/semibold 20px, subtitle/regular 24px, subtitle/semibold 24px, heading/semibold 32px
- Color palette: color /secundary/green 100, color /primary/gray 500, color /white-black/black, color /primary/gray 200, color /white-black/white, color /secundary/green 200, color /secundary/red 100, color /primary/gray 400, color /primary/gray 300, color /primary/gray 100, color /extra/background, color /secundary/red 200, color /extra/yellow, color /white-black/black 100
- Spacing scale: corner radious - spacing /spacing/spacing 4, corner radious - spacing /spacing/spacing 8, corner radious - spacing /spacing/spacing 12, tipography/font spacing/font sapcing 0, 4, tipography/font spacing/font sapcing 0, layout /margin/margin 24, corner radious - spacing /spacing/spacing 32, corner radious - spacing /spacing/spacing 16, corner radious - spacing /spacing/spacing 24, corner radious - spacing /spacing/spacing 36, corner radious - spacing /spacing/spacing 28, corner radious - spacing /spacing/spacing 40, corner radious - spacing /spacing/spacing 20, corner radious - spacing /spacing/spacing 2
- Radius/shadow/motion tokens: shadow 01, shadow 02_soft, shadow 03_big

## Component Families
- tabFilterBar
- searchBar
- tabsMenu
- filterOptions
- navigationControls
- toggleCards
- toggleMenu
- selectionDropdown
- setButtons
- labels
- quiantitySelector
- slideButton
- summaryCard
- optionLabel

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required
- Contrast constraints required

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use extracted color tokens before introducing one-off values: color /secundary/green 100
- color /primary/gray 500
- color /white-black/black
- color /primary/gray 200
- color /white-black/white
- color /secundary/green 200.
- Use these typography styles consistently: body/regular 12px
- body/semibold 12px
- body/regular 16px
- body/semibold 16px
- subtitle/regular 20px
- subtitle/semibold 20px.
- Define all interaction states for interactive components: default
- hover
- focus-visible
- active
- disabled
- and loading.

## Rules: Don't
- Do not duplicate existing style tokens with one-off naming.
- Do not remove focus-visible indicators or keyboard support.
- Do not hard-code raw values where local styles or variables already exist.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy
4. variants
5. and interactions.
6. Add accessibility acceptance criteria.
7. Add anti-patterns and migration notes.
8. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule uses "must".
- Every recommendation uses "should".
- Every accessibility rule is testable in implementation.
- Prefer system consistency over local visual exceptions.

## Acceptance Checklist
- Frontmatter exists with valid `name` and `description`.
- Guidance is under 500 lines for `skill.md` when possible.
- Accessibility and interaction states are explicitly documented.
- Rules are concrete, testable, and non-ambiguous.
- Output can be reused in other repositories with only variable replacement.

## TypeUI + Agentic Integration
This `SKILL.md` is intended for `typeui.sh` CLI workflows.
It can later be integrated with agentic tools including Claude Code, OpenCode, Gemini CLI, Cursor, and similar assistants.

<!-- TYPEUI_SH_MANAGED_END -->
