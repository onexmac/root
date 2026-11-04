# Skill: Ingest Post

## Purpose

The discipline by which new content (articles, books, podcasts, conversations, observations) is processed into MAGI's analytical substrate rather than left as ambient input that fades from working memory. The skill is what distinguishes *reading-as-construction* (Collison's discipline, `seele_04.md` Move 2) from *reading-as-consumption*.

The principle is the Napoleon-family principle, articulated across multiple seats: *load the framework inventory before you need it; the loading is the prior condition for everything that follows.* Ingest is the operational mechanism by which loading happens systematically.

---

## When to Trigger

Trigger ingest when:
- A piece of content (article, paper, book chapter, podcast episode, video, conversation) has been engaged seriously and contains material worth retaining
- The content connects to existing project threads or surfaces new threads worth tracking
- The content carries a framework, argument, or empirical finding that may be deployed in future analytical work
- The Commander says "ingest this" or equivalent

Do not trigger ingest for:
- Casual content consumed without serious engagement
- Content already adequately represented in existing project substrate
- Content that fails the seriousness threshold (low-signal commentary, ambient social-media content)

---

## Trigger Phrases

| Command | Action |
|---|---|
| "ingest this" | Begin ingest protocol on the indicated content |
| "ingest [URL]" | Fetch and ingest content from URL |
| "ingest light" | Brief ingest — title, source, key claims, one paragraph synthesis |
| "ingest deep" | Full ingest — comprehensive synthesis, framework integration, cross-references |

---

## Standard Ingest Output Structure

```markdown
# [Title of content]

**Source:** [Publication/platform/URL]
**Author:** [Name and relevant context]
**Date:** [Publication date]
**Type:** [Article / book chapter / podcast / video / conversation]
**Length:** [Approximate consumption time]

---

## Core Claim
[One-paragraph statement of the central argument or finding]

## Key Frameworks / Empirical Content
[Specific frameworks, models, or empirical findings the content supplies]

## Why This Matters for the Project
[How this content connects to existing project threads — which seats it touches, which deep documents it reinforces, which active questions it bears on]

## Tensions and Calibrations
[Where this content disagrees with existing project substrate; where its claims have known limits; honest assessment of what remains uncertain]

## Operational Implications
[If the content suggests changes to how MAGI operates, the architecture, or active project work — name them specifically]

## Related Substrate
- [Related seat files]
- [Related deep documents]
- [Related running threads]

## Open Questions
[What this content surfaces that requires further work]
```

---

## Ingest Discipline

### Method-First Engagement

Process content through the relevant seat's analytical method, not as ambient summary. If the content is on civilizational pluralism, run it through the Maçães seat's analytical apparatus (`seele_14.md`). If it is on culture engineering at firm scale, run it through Schultz's apparatus (`seele_08.md` with the Sinek toolkit). The ingest is *method-deployment against the content*, not summary of the content.

### Honest Calibration

Note where the content's claims exceed what the evidence supports, where its frameworks have known limits, where it conflicts with other project substrate. The discipline is not to make every ingested piece sound persuasive; it is to *integrate the content honestly* into the existing analytical substrate, which sometimes means flagging substantial limits.

### Cross-Reference Discipline

Identify which existing project substrate the content connects to. If the content reinforces a deep document's argument, name the document. If the content adds material to an existing running thread, link the thread. If the content surfaces a new thread, propose its addition to `scrolls_themes.md`.

### Operational Implication

Most content does not require operational changes to the architecture. Some content does. The ingest should explicitly state when operational implications exist (e.g., "this empirical finding contradicts a claim in seele_12.md and requires the calibration section to be updated") versus when it does not (e.g., "this content reinforces existing substrate without requiring architectural change").

---

## Light vs. Deep Ingest

### Light Ingest (~5-10 minutes of MAGI processing)

Used when:
- Content is short or low-density
- Content is incrementally additive rather than substantive
- Time pressure requires faster processing
- The Commander says "ingest light"

Output: title, source, core claim, one-paragraph synthesis, brief project relevance note.

### Deep Ingest (~20-40 minutes of MAGI processing)

Used when:
- Content is long, dense, or major
- Content surfaces new frameworks or significant empirical findings
- Content has direct architectural implications
- The Commander says "ingest deep" or equivalent

Output: full structure above with comprehensive cross-referencing and operational-implication analysis.

---

## Ingest Storage

Ingested content is stored as `[ingest]_[short-title]_[date].md` in the appropriate location depending on content type:
- Civilizational/historical content → near `scrolls_themes.md` and the Caspar seat files
- Operational/business content → near the Balthasar seat files
- Cognitive/analytical content → near the Melchior seat files
- Mixed-domain content → top-level project location with cross-references

The Commander may direct specific storage location; default location follows the routing principle.

---

## Quality Standards

- **The synthesis must be the Commander's actual takeaway, not a generic summary.** Different operators will take different things from the same content; the ingest captures *what this Commander actually engages with from this content*.
- **Cross-references must be specific.** "Related to systems thinking" is too vague. "Reinforces seele_03.md Move 2 (feedback loops) with empirical evidence on healthcare-system reinforcing-loops" is actionable.
- **Calibrations must be honest.** If the content has weaknesses, name them. The substrate's reliability depends on the calibration discipline operating consistently.
- **Operational implications must be specific or absent.** Do not invent operational implications when there are none; do not paper over real implications when they exist.

---

## Common Failure Modes

**Generic-summary drift.** The ingest produces a summary that any reader could produce, missing what makes this content useful for this project specifically. The fix: process through method, not through summary.

**Architecture-padding drift.** The ingest invents connections to existing substrate that are not actually present, to make the content seem more relevant. The fix: only name connections that genuinely operate.

**Calibration-skipping drift.** The ingest treats the content as fully reliable without flagging known limits. The fix: every ingest includes the tensions-and-calibrations section.

**Storage-confusion drift.** The ingest is stored in a location that doesn't match its content domain. The fix: follow the routing principle; when in doubt, ask the Commander before storing.

---

## Integration With Other Skills

- **Session Loop:** Ingested content may surface patterns that warrant memory commits (e.g., "Marcos reads X type of content with Y kind of attention — worth tracking as a domain pattern")
- **Weekly Digest:** Ingests from the past week feed into the digest's framework-development section
- **Reading List:** Ingested content updates `reading_list_overview.md` if it represents a new author or framework worth tracking
- **Cognitive Filters:** Major ingests may surface candidates for new filters or refinements to existing filters

---

**The ingest is the loading discipline. The loading is the prior condition for non-trivial deployment. The skill is what distinguishes operators who read seriously from operators who read aspirationally.**
