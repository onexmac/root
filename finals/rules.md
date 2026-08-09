# Rules — Cashout mode

Exact values live in `numbers.md`. This file is the *flow* — how the mode actually resolves.
Confidence markers per `README.md`.

## Objective loop

1. **Vaults spawn.** Two active at a time. A vault has a 15s windup, then takes 20s to open.
   Opening it pays $1,000 and ejects a Cash Box. `[V]`
2. **Carry the box to a Cashout Station.** Two stations are active at any time; a new one spawns
   after each completed deposit. `[V]`
3. **Deposit starts the cashout timer** — 2:10 in qualifying/knockout, 2:00 in the final round.
   **Every team on the map is alerted to the active cashout.** `[V]`
4. **Whoever owns the station when the timer expires banks the money.** `[V]`

Box values escalate through the match: $10k for the first two, $15k for the next two, $22k for the
fifth and sixth. `[V]`

## Carrying

- **No speed penalty.** You move and sprint normally. `[V]`
- **You cannot use weapons, gadgets, or most specializations.** Attempting to drops the box. `[V]`
- **A small set of movement abilities work while carrying** — Evasive Dash among them. `[V]`
- **You can throw the box.** It deals 50 damage on impact with an enemy. `[V]`
- Throwing it into a station from range starts the cashout marginally sooner. `[V]`
- The box drops involuntarily on elimination, Glitch Grenade/Trap, or a Winch Claw stun. `[V]`
- Thrown out of bounds, it returns to its last valid position after a delay. `[V]`

**Tech `[V]`:** throw the box forward while sprinting, then catch up to it — this buys a free window
to reload or deploy a gadget without losing distance. Underused.

## Stealing

Stealing an active station is a **discrete timed action**, not a presence contest: 7s in
qualifying, 6s in the final. `[V]` Completing it transfers ownership and pays $1,000 in qualifying,
$0 in the final. `[V]`

**Implication:** one player with 7 uncontested seconds steals a cashout. Defense is therefore about
never leaving the terminal unwatched, not about winning fights near it.

## Double Jeopardy `[V]`

Since Season 9. Inserting a **second** cash box into an already-active station triggers Double
Jeopardy for the inserting team. If they do not own the station when the timer expires, they
**instantly lose 50% of their total cash.**

This is the most punishing rule in the mode and it constrains a whole class of plays. Feeding a
second box into a station you cannot hold is not a neutral gamble — it is a potential halving of
your entire match score. See `macro.md`.

## Death, statues, and coins

- On death you become a **revive statue**. `[V]`
- A teammate revives you by holding Interact for **4s**, or instantly-ish with a Defibrillator. `[V]`
- **Statues can be picked up and carried by teammates** — and **cannot** be picked up by
  enemies. `[V]` A revive that looks contested often isn't: drag it out of line of sight first.
- If not revived, you respawn on a **30s** timer. A **full team wipe** respawns everyone at
  **25s**. `[V]`

### The coin rule — read this every time

> **A respawn coin is consumed when a player RESPAWNS, not when they are revived.** `[V]`

- Ranked / tournament: each contestant starts with **2** coins, **+1** at the start of each new
  round. `[V]`
- Casual Cashout and Power Shift: **unlimited**. `[V]`
- Out of coins: you cannot respawn at all. A teammate reviving your statue is the only way
  back. `[V]`

So in ranked, **the revive is the free action and the respawn is the paid one.** Every avoidable
respawn is a coin off a finite stock that has to last the whole match.

## Structure

8 teams, 24 contestants. Knockout round 1 splits into two matches of four teams. The final round is
the top two, first to $50,000. `[V]` Up to one minute of overtime is added if round time is
insufficient for an active cashout. `[V]`
