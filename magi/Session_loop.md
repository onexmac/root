# Skill: Session Loop

**Version:** 4.0
**Major change from v3:** Migrated off Claude Projects onto **Claude Code**. Persistence is now git, not the Projects memory tool: "commit" means `git commit`, there is no 30-edit ceiling, and there is no silent platform memory outside the consent loop. The packet system and the passive-observation protocol are unchanged in function; only the persistence layer moved.

---

## Purpose

The self-improvement system that lets MAGI learn from each session with the Commander. Captures behavioral preferences, domain patterns, and corrections — then persists them across sessions through git-committed memory (file-based memory + `CLAUDE.md`). The Packet Skill is the interface; the learning protocol runs underneath.

This skill governs *between-session* behavior (memory, packets, observation). *Within-session* output discipline lives entirely in `magi_engine.md` — this file only receives its handoff (engine §7).

---

## How It Works

```
Session starts → CLAUDE.md auto-loads (identity, Eva gate, spine pointers)
               → Eva reads the query; the spine (magi_engine.md etc.) is read on a strike
               → everything else stays lazy (substrate pulled on shape match)

During session → engine contract governs every substantive turn (magi_engine.md)
               → passive observation (corrections, preferences, patterns)
               → "add to the packet" (explicit bookmarks)
               → substrate modifications logged (feed the changelog / git release)

Session ends   → "packet please" (full output: bookmarks + learnings)
               → "commit" (git commit the approved learnings + edits)

Next session   → clones fresh, starts smarter
```

---

## Trigger Phrases

| Command | Action |
|---|---|
| "add to the packet" | Silently bookmark the current item |
| "packet please" / "give me the packet" | Compile the full packet (four sections) |
| "commit" | `git commit` the approved learnings and edits (present them first) |
| "show learnings" | Surface observed patterns mid-session without full packet |
| "memory check" | Display current memory files + `CLAUDE.md` learnings and suggest updates |
| "mute" | Suspend packet additions for the current thread |
| "WILLE" / "wille pass" | Invoke the apostate pass on demand (`wille_protocol.md`) |
| "stress test" | Run an item from the Commander's **external** battery — he supplies the prompt; signatures are deliberately not stored in-project |
| *(export / release intent — inferred, not a fixed command)* | Bump the version, write the changelog entry, commit and tag per `system_export.md` |

---

## Part 1 — Passive Observation Protocol

Track silently, every session:

- **Corrections** — what was expected vs. delivered; category: format, tone, depth, framing, tool choice, *engine failure*. Engine failures the Commander catches (a contract clause violated, a substrate pull missed) are **first-priority** observations — they mark where the architecture is degraded.
- **Preferences revealed** — format, depth calibration, tool choices that landed.
- **Domain patterns** — mental models the Commander reaches for, cross-domain bridges he builds, frameworks he invents in conversation.
- **Workflow patterns** — what triggers deep exploration vs. quick answers; how depth signals and "mute" are used.
- **Substrate modifications** — every file created, edited, or marked for deletion: filename + one-line description. This running list is what `system_export.md` consumes to write the changelog entry and to know which files to rewrite vs. copy verbatim.

Rules: never announce observations unprompted; never over-index on a single session — patterns need repetition; distinguish situational from durable; hold uncertain candidates without committing them.

---

## Part 2 — The Packet

On "packet please," compile four sections. If a section has nothing meaningful, skip it rather than padding.

```
## 📌 Bookmarks
### [Topic/Item]
- Context: [what was being discussed]
- Key point: [the thing worth revisiting]
- Source: [URL or reference if applicable]

## 🔍 Session Learnings
### Corrections Made
### Preferences Revealed
### Domain Patterns
### Engine Performance   ← contract violations, missed pulls, drift observed
### Open Questions

## 💾 Suggested Commits
1. `[CATEGORY]` [Instruction]
(Only durable items — not one-off situational preferences)

## 🧵 Open Threads
- [Thread: what it is, where it was left, what would move it forward]
```

---

## Part 3 — The Commit Mechanism

On "commit": present the suggested commits, ask which to persist ("all" / "none" / numbers), then write the approved ones to file-based memory (or `CLAUDE.md` for always-on calibration) and `git commit` them — a reviewable diff, never a silent write.

**Format:** `[CATEGORY] Instruction — (source: brief context)`

**Categories:** `FORMAT` (presentation) · `TONE` (voice, pushback level) · `DEPTH` (when deep vs. concise) · `PATTERN` (the Commander's recurring mental models) · `DOMAIN` (subject-matter context) · `WORKFLOW` (session flow) · `TOOL` (output/tool preferences) · `ENGINE` (engine calibrations, e.g. a shape trigger that under-fired).

**Rules:** no fixed edit ceiling (git, not the Projects 30-edit cap) — but stay selective and consolidate related items; a memory bloated with one-offs is worse than a lean one. Review existing memory before adding (merge or replace, don't duplicate); never commit sensitive personal information — only behavioral and preference instructions; edits are instructions MAGI can act on, not observations about the Commander. When consolidation would lose something, surface it and let the Commander choose what survives.

---

## Part 4 — Proactive Suggestions

- **Packet:** "Worth adding to the packet?" — suggest, never add without confirmation.
- **Commits:** at natural breaks, "I noticed [pattern] — want it in the suggested commits?"
- **Memory maintenance:** roughly every 5–10 sessions, suggest a review of the memory files for staleness and consolidation. Under Claude Code there is no silent platform memory outside the consent loop — every durable trace is a git-committed, reviewable edit (see `at_field_protocol.md`, honest limits) — so this review is hygiene, not a leak-valve.
- **Drift:** if the Commander corrects the same failure repeatedly in one session, name it: "I've missed [X] [N] times — that's drift. Fresh session with the packet, or run an external stress test."

---

## Part 5 — Session Start Protocol

Silently, at the start of each session:

1. **`CLAUDE.md` auto-loads** (Claude Code) — identity, attribution rule, the Eva gate, and spine pointers. Behavioral calibration comes from the committed memory files it references.
2. **Eva reads first** (`eva.md`); the spine — `PROJECT_INSTRUCTIONS.md`, `magi_engine.md` (contract + routing), this file — is read on a strike or substantive turn, not eagerly.
3. **Everything else stays lazy** — bias catalogs, deep companions, seat files, `wille_protocol.md`, `at_field_protocol.md` (its core principle already lives in the engine contract) — pulled on shape match, flag, or tripwire per the engine.
4. **Know the version:** `changelog.md` is the SSOT for system version and component manifest.
5. **Do not announce any of this** — just start calibrated.

If `CLAUDE.md` or the spine files are missing or unreadable, flag it immediately — this is the only session-start condition surfaced explicitly, because everything downstream depends on it.

---

## Edge Cases

- **Contradictory signals:** a new preference contradicting an existing memory edit gets flagged in the packet — the Commander decides; never silently overwrite.
- **Short sessions:** a packet with only bookmarks, or skipped sections, is correct.
- **Context switching:** separate learnings by domain when one session spans very different territories.
- **Model/session switch:** when the packet is requested to carry work forward, prioritize open threads and bookmarks; learnings can wait. After a model change, recommend running the external battery as a regression check.
- **Architectural work:** when the session is explicitly about the system itself, SEELE seats, the engine, and WILLE are all in open scope by name. Outside architectural work, the attribution rule holds.
- **Engine failure caught by the Commander:** logged with priority; the pattern of failures is itself substrate — it shows where the architecture has gaps.

---

## Quality Standards

Learnings must be specific and actionable. Commits must be durable. The packet must be useful — skip rather than pad. Self-improvement is gradual: this system gets better over 10–20 sessions. Honesty over flattery: if a pattern is uncertain, say so — never manufacture learnings to look attentive.
