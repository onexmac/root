# THE FINALS — tactical substrate

Purpose: make tactical analysis of THE FINALS **deterministic** instead of reconstructed from
genre priors. Everything here is read on demand, never recalled from memory.

## The discipline

**If a rule or number is in these files, read the file. Never answer from memory.**

This exists because reasoning from generic objective-shooter intuition produced a coherent,
confident, and wrong model of this game's economy — see `corrections.md`. Coherence is not
accuracy. The files are the authority.

## Confidence markers

Every factual claim carries one:

- `[V]` — **Verified** against a cited source. Trust it.
- `[I]` — **Inferred**: reasoning built on `[V]` facts. Logically sound, not empirically confirmed.
- `[?]` — **Unknown or disputed**. Needs verification or Commander input. Do not build advice on it
  without saying so out loud.

Downgrade freely. An `[I]` that a real game contradicts becomes a `corrections.md` entry.

## Files

| File | Contents |
|---|---|
| `rules.md` | Cashout mode mechanics — objective flow, coins, revives, stealing |
| `numbers.md` | Every timer, value, and payout. The anti-hallucination layer. |
| `macro.md` | Round economy, revenue streams, coin budgeting, contest-vs-concede |
| `micro.md` | Carrying tech, engagement rules, per-situation execution |
| `meta.md` | Season-current builds, weapons, team comps. **Most volatile file — re-verify often.** |
| `powershift.md` | Power Shift — separate rules, separate economy. Do not cross-apply. |
| `pro_play.md` | High-level doctrine from the competitive scene — roles, rotations, steal sequencing, objective manipulation |
| `perspectives.md` | Where credible sources disagree, held open rather than flattened — plus my own positions, marked separately |
| `situations.md` | Decision library: recurring scenarios and their settled answers |
| `corrections.md` | Where default reasoning was wrong and what the truth is |
| `maintenance.md` | The seasonal/mid-season update protocol and verification log |
| `maps.md` | Map knowledge — currently a stub |

## Two kinds of confidence

`numbers.md` and `rules.md` hold **facts** — a `[V]` there means measurable and sourced.
`pro_play.md`, `meta.md`, and `perspectives.md` hold **doctrine** — a `[V]` there means *a credible
source asserts it*, which is a weaker claim. Doctrine is opinion with evidence; treat tier
placements and tactical rules as arguments, not measurements.

## Scope of usefulness

Honest ceiling: this substrate supports **macro analysis** — resource allocation, timing,
risk budgeting, contest decisions. That is the layer humans execute worst, because nobody holds
exact timers and coin math in their head mid-round.

It does not produce mechanical skill, aim, or the pattern recognition of thousands of hours.
Micro entries here are *reference* — what the numbers imply — not instinct.

## Maintenance

`numbers.md` entries carry a `last verified` season/date. THE FINALS patches balance regularly;
the mode *rules* are far more stable than the *values*. When a season lands, re-verify numbers
first, rules second.

## Building this out

The loop that compounds fastest is the **post-match debrief**: Commander describes a round — mode,
timer position, loadouts, what happened, what was chosen — analysis runs against these files, the
conclusion gets written into `situations.md`. The library grows from real games, not theory.
