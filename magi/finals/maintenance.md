# Maintenance — the seasonal update protocol

This substrate decays. THE FINALS ships a new season roughly every three months and a mid-season
patch partway through each one, and both move the numbers this analysis rests on.

## Patch cadence `[V]`

- **Season length:** ~93 days average across the first ten seasons; band of **77–106 days**, most
  landing in 83–98. Roughly **12–14 weeks**.
- **Mid-season update** partway through each season (e.g. patch `8.6.0` mid-Season 8).
- Each season ships: a new arena, new weapons and gadgets, a ranked reset, and balance changes.
- **Current: Season 11 "Galaxy Masters", launched 2026-07-09.** `[V]`

**Effective update interval: ~6–7 weeks.**

## The automated check

**Routine `trig_0173DvSBUFJWGycqBvgtkQ6b` — "THE FINALS — substrate season check"**
Cron `0 15 1,15 * *` — the **1st and 15th of each month at 09:00 Costa Rica** (15:00 UTC).
Each firing spawns a fresh session and runs the protocol below.

Twice-monthly against a ~6–7 week real cadence means the substrate is never more than about two
weeks stale. It is designed to **no-op silently** when nothing has changed — the cost of a wasted
check is a few minutes; the cost of a missed season launch is a substrate that is confidently wrong
for six weeks.

**Known limitation:** the Routine's sessions run without MCP connectors, so they have **no GitHub
tooling**. They can commit and `git push` normally, but cannot open a PR. The prompt accounts for
this — it pushes the branch and reports the compare URL for manual PR creation. To get automatic
PRs, recreate the Routine from the claude.ai Routines UI with connectors attached.

To adjust cadence or scope, update the trigger rather than creating a second one.

## Update protocol

Run in order. Stop early if step 1 finds nothing.

### 1. Has anything shipped?

Check the official patch notes (`reachthefinals.com/patchnotes`) and the wiki for a version newer
than the one stamped in `numbers.md`. If not, **stop and do nothing.** No commit, no message.

### 2. Triage what moved

| Change type | Files affected | Priority |
|---|---|---|
| Mode rules (timers, steal duration, coin counts, payouts, Double Jeopardy) | `rules.md`, `numbers.md`, cascades to `macro.md` | **Highest** — these are load-bearing |
| Weapon/class balance | `numbers.md`, `meta.md` | High |
| New gadgets/specializations | `meta.md`, `micro.md`, `pro_play.md` | Medium |
| New arena | `maps.md` | Medium |
| Meta shift without balance change | `meta.md`, `perspectives.md` | Low |

### 3. Re-verify and re-stamp

- Update the `last verified` line in `numbers.md` and `meta.md`.
- **Re-check every `[?]` in the substrate** — a patch is the most likely moment for an open question
  to become answerable.
- Downgrade any `[V]` that the patch invalidated. **Do not silently overwrite** — if a number
  changed, that is a `corrections.md`-adjacent event worth noting in the commit.

### 4. Cascade the consequences

The failure mode is updating a number and leaving the reasoning built on it intact. Every changed
value must be traced:

- Coin counts changed → the whole of `macro.md` §1 and `situations.md` §3–5.
- Cashout or steal timers changed → `macro.md` §4 ("deny 7 seconds for 130 seconds") is stated in
  literal numbers and will be wrong.
- Kill reward changed → `macro.md` §2 pricing.
- Box values or the 20/80 split changed → `macro.md` §3 and `situations.md` §1.

### 5. Refresh doctrine, seasonally

At a **season launch** (not mid-season), also re-pull the competitive layer:
- S-tier builds and weapons → `meta.md`
- New or shifted comp consensus → `perspectives.md` §1
- Any new tech the scene has found → `pro_play.md`

### 6. Commit and report

One commit on a `claude/finals-season-update-*` branch, PR as usual. The report should lead with
**what changed that invalidates prior advice** — not with what was added.

## Standing principle

Rules are stable; values are not. When time is short, verify the numbers and trust the structure.

## Verification log

| Date | Season / patch | What changed | By |
|---|---|---|---|
| 2026-08-08 | S11 (initial build) | Substrate created; numbers sourced at S11 with S9 weapon data | Claude |
