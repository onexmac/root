# Macro — round economy and decision framework

Built on `numbers.md`. Every claim traces to a `[V]` fact or is marked `[I]`.

This is the layer worth the most: nobody holds exact timers and coin math in their head mid-round,
and most ranked losses are resource-allocation errors, not aim errors.

---

## 1. The coin economy (ranked only)

**Ranked stock: 2 coins per contestant, +1 at the start of each round. `[V]`
A coin is spent on RESPAWN, never on revive. `[V]`**

That inverts the intuitive model completely. Restated as a budget:

- A **revive costs 4 seconds and some risk.** `[V]`
- A **respawn costs 30 seconds and one coin off a finite stock.** `[V]`
- A **team wipe costs 25 seconds and three coins.** `[I]`

So in ranked, **the revive is the cheap action and the respawn is the expensive one.** Every
avoidable respawn is capacity spent that you cannot get back until the next round.

### The budget is tighter than it feels `[I]`

Two coins in round one means a contestant can afford exactly two un-revived deaths. The third death
without a revive leaves them **unable to respawn at all** — a permanent 2v3 until someone reaches
their statue. `[V]` That is a round-ending state, and it arrives faster than players expect because
early deaths feel cheap.

### Practical rules `[I]`

- **Default to reviving in ranked.** If it's survivable, take it — you're saving the resource, not
  spending it. Drag the statue out of line of sight first; enemies cannot pick up your
  statues. `[V]`
- **A "free respawn" does not exist in ranked.** Anytime the phrase feels right, you're about to
  spend a coin.
- **Deliberate team wipes cost 3 coins.** The 25s sync is real and the tempo reset is real, but in
  ranked it is a genuinely expensive play — roughly half of a round-one stock. Reserve it for
  positions where the round is otherwise lost.
- **In casual Cashout and Power Shift, none of this applies** — coins are unlimited. `[V]` The wipe
  reset is nearly free there, and the aggressive lines are correct. **Do not cross-apply ranked
  discipline to casual, or casual habits to ranked.** This is the single biggest mode split.

---

## 2. Combat is a revenue stream

**An elimination pays $500. `[V]`** This was absent from the original model and it changes the
framework — see `corrections.md` §7.

Consequences `[I]`:

- **A team wipe is worth $1,500** — 1.5× a steal ($1,000 `[V]`), and it comes with map control and,
  in ranked, three coins off the enemy's stock.
- **"Off-objective kills are worthless" is false.** Fighting has direct revenue. The correct claim is
  narrower: *kills that cost you the terminal* are bad, because the station pot dwarfs $500. Killing
  an isolated enemy at no positional cost is simply free money.
- **Farming is a real fallback.** If you cannot hold or reach an objective, hunting for eliminations
  is not a consolation prize — three fights won is a steal's worth of cash.
- **In ranked it double-dips:** each elimination is $500 *and* forces a coin or a 4s revive from
  them. Combat pressure attacks two resources at once.

### The 20/80 deposit split `[V]`

**On deposit, 20% of the box is paid to your team immediately** — $2,000 / $3,000 / $4,000 depending
on the vault. The other 80% sits in the station for whoever owns it at expiry. `[V]`

This softens every "should I deposit?" decision `[I]`. A deposit that gets stolen is not a zero — you
banked a fifth up front. Marginal deposits are therefore less reckless than originally argued.

**The exception is absolute:** this does not apply to a **second** box into an active station.
Double Jeopardy risks 50% of your *total match cash* `[V]`, which is categorically larger than a
$2–4k instant payout. The 20% consolation never justifies a Double Jeopardy gamble. See §5.

---

## 3. Pricing the objectives

Box values escalate: **$10k, $10k, $15k, $15k, $22k, $22k.** `[V]` Final round is first to
**$50,000.** `[V]`

**The first cashout is worth less than half the fifth.** `[V]` Spending coins, position, and tempo
to salvage a first cashout you're losing is a pricing error — you're paying late-round rates for
early-round goods.

Corollary `[I]`: losing the opening cashout *cleanly*, with your coin stock intact and your team
grouped, is a better position than winning it at the cost of three coins and a scattered team.

**Final-round note `[V]`:** a steal pays $1,000 in qualifying but **$0** in the final. The steal
action itself stops being a revenue source — its entire value becomes denial plus taking ownership
so *you* bank the deposit at expiry. Late-final steals are about the box, not the bonus.

---

## 4. What defending a cashout actually is

The timer is **2:10** (2:00 in the final). A steal takes **7s** (6s final). `[V]`

So the job, stated exactly: **deny the enemy any 7 consecutive uncontested seconds on the terminal,
for 130 seconds.**

That reframing kills the most common defensive error `[I]`. Winning fights near the station is not
the objective; *terminal denial* is. A defense that wins every duel twenty meters out and leaves the
terminal unwatched for eight seconds loses. Someone must always have eyes on the terminal itself.

It also means **one player is a real threat.** Seven uncontested seconds is not much. Never assume a
lone enemy is harmless.

### Structure `[I]`

- **First ~90 seconds: geometry, not fighting.** Narrow approaches, cut stairs, decide what the
  floor and ceiling are doing. You're choosing where attackers appear.
- **Assume two attacking teams, not one.** The deposit alerts everyone `[V]`; four teams are in a
  qualifying match. Set up for sequential waves from different directions, and let the first two
  attackers grind each other where you can.
- **Last 30 seconds: collapse tight.** Everyone in contest range. Trades are fine — a trade where
  you hold the terminal is a win. This is also the window your saved coins exist for: a defib on a
  teammate down at 0:10 is unrecoverable by any respawn.
- **Don't chase — but don't refuse free kills either.** Every meter off the station is a meter
  toward someone's seven seconds. The test is positional cost, not the kill itself: an elimination
  you take *from* your holding angle is $500 `[V]` and a coin off their stock. One you have to walk
  twenty meters for is how you lose the pot.

---

## 5. Double Jeopardy — the hard constraint `[V]`

Insert a **second** box into an already-active station and you trigger Double Jeopardy. Don't own
the station at expiry and you **instantly lose 50% of your total cash.**

This is not a normal risk. It is potentially the largest single swing in the match, and it is
self-inflicted.

**Rule `[I]`: never feed a second box into a station you are not confident of holding.** Being
down a player, out of position, or arriving late all disqualify the play. Holding your box and
waiting for the *next* station to spawn is almost always better than a Double Jeopardy gamble —
a new station appears after every completed deposit. `[V]`

This also means the *original* question in this repo's founding conversation — solo-depositing while
your team is down — has a much sharper answer than "it's risky." If it's a second box into an active
station, it can cost you half the match. See `situations.md` §1.

---

## 6. Two stations are always live `[V]`

Underused macro lever `[I]`: when a station is heavily contested, the answer is often to **go take
the other one** rather than win the fight in front of you. Contested objectives are priced by how
many teams want them; the uncontested station pays the same money for a fraction of the resources.

Concede-and-rotate is not passivity. It is buying the same goods at a lower price.

---

## 7. Decision checklist

Before committing resources to any objective, ask in order:

1. **Which box number is this?** ($10k or $22k — the answer changes what it's worth.)
2. **Ranked or casual?** (Is a death costing a coin or not?)
3. **Would this be a second box into an active station?** (Double Jeopardy — if yes, is holding it
   genuinely likely? If not, this is disqualifying regardless of everything else.)
4. **Is the other station cheaper right now?**
5. **How many coins does my team have left?** (Under ~1 each, the team is fragile in a way that
   should change every aggression decision.)
6. **Where is the timer?** (Setup phase or the last 30s — completely different games.)
7. **Is there free money on the table?** (Eliminations at no positional cost are $500 each `[V]`;
   a deposit banks 20% instantly `[V]`. Neither requires winning the objective.)
