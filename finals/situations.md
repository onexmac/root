# Situations — decision library

Recurring scenarios and their settled answers, built against `numbers.md` and `rules.md`.
Each entry: the situation, the answer, and the facts it depends on — so it can be re-derived if a
patch moves a number.

Seeded from the founding conversation (2026-08-08). **Several entries reverse the advice originally
given in that conversation**; where so, it's marked. The Commander's instincts were correct in every
disputed case.

---

## 1. Solo with the cash box, teammates down

**Answer: relocate and deny. Do not deposit into an active station.**

- Carrying costs you **nothing in speed** — you sprint normally. `[V]` You are an unarmed
  normal-speed player, so escaping is far more viable than it feels.
- You can **throw the box** — off a roof, into a hole, down a shaft. `[V]` Recovery time for the
  enemy is your entire profit.
- **Evasive Dash still works while carrying.** `[V]`
- **If the station is already active, depositing a second box triggers Double Jeopardy — 50% of
  your total cash if you don't hold it.** `[V]` Solo, with your team down, you will not hold it.
  This is not "risky," it is potentially the worst single play in the mode.
- A **new station spawns after every completed deposit** `[V]`, so waiting genuinely costs you
  little.

**Depositing solo into a fresh station** (not a second box, no Double Jeopardy) is **more defensible
than originally argued.** You bank **20% instantly** — $2,000 to $4,000 depending on the vault
`[V]` — which cannot be stolen back. The downside is real but bounded: you alert every team `[V]` and
start a 2:10 clock you defend alone, forfeiting the 80%.

`[I]` So the solo-deposit calculus is: guaranteed 20% now, versus holding the box for a coordinated
deposit later at full value. With teammates respawning in 30s `[V]` and a new station spawning after
every completed deposit `[V]`, waiting is usually still better — but this is a judgement call, not
the blunder it was originally called.

**Exception:** timer math genuinely favours you — round or match ending before anyone can complete a
7s steal. `[V]`

**Also on the table:** if you cannot deposit safely, eliminations pay **$500** each `[V]`. A solo
player denying the box *and* picking off isolated enemies is generating real income, not just
stalling.

---

## 2. Last player alive, sniper, cashout already running, enemies camping statues

**Ranked answer: revive, do not suicide. `[REVERSED from original advice]`**

The original reasoning endorsed a deliberate wipe to sync respawns. With verified numbers that is
wrong in ranked:

- **A wipe costs 3 coins** off a stock of 2+1/round. `[I]` from `[V]` — that is roughly a round's
  entire budget spent to save five seconds (25s wipe vs 30s individual `[V]`).
- **Reviving costs 4 seconds and zero coins.** `[V]`
- **Enemies cannot pick up your statues.** `[V]` The camp is a positional threat, not a permanent
  denial.
- **Statues can be dragged out of line of sight and revived there.** `[V]` A revive that looks
  contested usually isn't — it's just being attempted in the wrong place.

So: break line of sight, pull a statue somewhere they aren't watching, revive, repeat. Every
successful revive banks a coin.

**And the steal is live.** 7 seconds, one player. `[V]` If the defenders over-commit to chasing you
or to camping statues, a solo steal is a real option that was wrongly ruled out originally.

**Casual answer: the suicide-reset is fine** — coins are unlimited `[V]`, so the only cost is 25s
and the sync is a genuine gain.

---

## 3. Wait for respawns, or deliberately wipe?

**Ranked: wait/revive. Casual: wipe freely.**

| | Individual respawn | Team wipe |
|---|---|---|
| Time | 30s `[V]` | 25s `[V]` |
| Coins (ranked) | 1 each `[V]` | 3 `[I]` |
| Sync | staggered | together |

The wipe buys 5 seconds and coordination. In casual that's free and often correct. In ranked you're
paying ~a full round's stock for it. `[I]`

**Note:** the original claim that respawn timers lengthen through the round was invented. They're
flat. See `corrections.md` §4.

---

## 4. Is it wasteful to spend coins early?

**Yes — and more sharply than "early objectives are cheap."**

- The first box is **$10k**; the fifth and sixth are **$22k**. `[V]` Early objectives are literally
  priced at under half.
- Coins **accumulate** (+1 per round on top of what's left) `[V]`, so an unspent coin is capacity
  carried into the rounds that decide the match. `[I]`
- Running to **zero coins means you cannot respawn at all** — only a teammate's revive brings you
  back. `[V]` That's a round-ending state and it arrives sooner than it feels like it should.

**But the correct saving mechanism is the opposite of what was originally advised.** You don't save
coins by declining revives — declining a revive is what *spends* the coin. You save them by
**reviving more.** See `corrections.md` §1.

---

## 5. Revive or let them respawn?

**Ranked: revive by default.** It is the free action. `[V]` The only reasons not to:

- You cannot survive the 4 seconds `[V]` even after dragging the statue out of sight.
- The statue is unreachable in time.
- Doing so loses the objective outright — a body on the terminal in the last 30 seconds outranks
  a coin. `[I]`

**Casual: reviving is a tempo and positioning choice**, not an economic one. Revive when it keeps
your group together near the objective; otherwise take the respawn.

---

## Template for new entries

```
## N. <situation>
**Answer:** <one line>
- <supporting fact> `[V|I|?]`
**Exception:** <when it flips>
**Source:** debrief YYYY-MM-DD — mode, round, timer position, loadouts
```
