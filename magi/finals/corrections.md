# Corrections — where default reasoning was wrong

This file is deliberately adversarial to my own priors. Each entry records a confident claim that
turned out to be false, the truth, and — most importantly — **why the error happened**, so the
same generator doesn't produce a new instance of it.

Read this before giving tactical advice. The failure mode it documents is not "missing a fact." It
is *building an internally consistent framework from genre intuition and mistaking its coherence
for knowledge.*

---

## 1. Coin economy — INVERTED (the big one)

**Claimed:** Revives consume the scarce resource. Therefore early revives are "cheap" only in time
and exposure, and letting a teammate respawn is the free option.

**Truth `[V]`:** A respawn coin is consumed **when a player respawns**, not when they are revived.
Reviving *saves* a coin. Letting them respawn *spends* one. Ranked contestants start with 2 and
gain 1 per round; casual and Power Shift are unlimited.

**Consequence:** Advice given across four turns — "contested revive early → skip it, respawns are
free" — was actively burning the scarce resource in ranked. The correct default is nearly the
opposite: in ranked, **revive whenever it is survivable**, because the respawn is what costs.

**Why it happened:** Analogy to extraction shooters and MOBAs, where the revive is the paid action.
The word "coin" was read as a revive token rather than a respawn token. The Commander used the
scarcity framing three separate times; each time it was reinterpreted to fit the existing model
instead of being allowed to break it. **Defending a framework against a domain expert's phrasing is
the primary error here — worse than the factual gap.**

**Rule extracted:** When the Commander's vocabulary implies a mechanic not in these files, that is
ground truth arriving. Stop and ask. Do not translate it into something already believed.

---

## 2. Cash box movement penalty — FALSE

**Claimed:** Carrying the box slows you down.

**Truth `[V]`:** There is **no movement speed penalty.** Carriers move and sprint normally. The
restriction is on weapons, gadgets, and specializations — using one drops the box.

**Consequence:** Made solo box-running sound more costly than it is. A runner is a *normal-speed*
unarmed player, which makes the deny-and-relocate play considerably stronger than described.

---

## 3. "You cannot steal solo" — FALSE

**Claimed:** A lone player cannot meaningfully steal a cashout.

**Truth `[V]`:** Stealing is a discrete 7s action (6s in the final round). One player with seven
uncontested seconds steals it. It is not a contest-by-presence mechanic.

**Consequence:** Ruled out a play that is not only legal but is a standard endgame line — the late
solo steal against a distracted or over-extended defense.

---

## 4. Respawn timer scaling — UNSUPPORTED, RETRACTED

**Claimed:** Respawn timers lengthen as the round progresses, so the deliberate-wipe reset is a
late-round tool.

**Truth `[V]`:** Flat 30s individual, 25s on a full team wipe. No evidence of scaling.

**Consequence:** The reasoning was backwards in an interesting way. A team wipe respawn is *faster*
than an individual one (25 < 30) **and** it syncs the team. That makes the deliberate-wipe reset
stronger than argued, not situational — though in ranked it now carries a coin cost, which is the
real constraint.

---

## 5. "Live-service games change constantly" — SCAPEGOAT

**Claimed:** Errors were attributable to the game patching frequently and a knowledge cutoff.

**Truth:** The coin system was never known. It was invented from priors. Mode *rules* in THE FINALS
are considerably more stable than the excuse implied; balance *values* drift, structural rules
largely don't.

**Rule extracted:** Do not reach for environmental volatility to explain a gap in knowledge. Say
"I didn't know this." Patch drift is a maintenance schedule (see `numbers.md` header), not an alibi.

---

## 6. The 20/80 deposit split — MISSING ENTIRELY

**Claimed (implicitly):** a deposit that gets stolen is a total loss, so marginal deposits are
close to pure downside.

**Truth `[V]`:** **20% of the box's value is paid to your team the instant it goes in.** $2,000 /
$3,000 / $4,000 depending on the vault. The remaining 80% sits in the station for whoever owns it
at expiry.

**Consequence:** every "should I deposit?" answer given was too conservative. A deposit is partially
banked immediately and cannot be fully stolen. The Double Jeopardy exception still stands and still
dominates — 50% of total match cash is categorically larger than a $2–4k instant payout.

**Why it happened:** the deposit was modelled as a binary — hold it or lose it — because that's how
objective capture works in most shooters. The mode is actually paying out continuously.

---

## 7. Eliminations pay cash — MISSING ENTIRELY

**Claimed:** "Kills off-objective are worth nothing here." Combat was modelled purely as a means to
objective control.

**Truth `[V]`:** **an elimination pays $500.** A team wipe is $1,500 — more than a steal ($1,000).
There are five revenue streams in the mode, not one: eliminations, vault opens, steals, the 20%
deposit instant, and the station pot at expiry.

**Consequence:** an entire strategic option — farming eliminations when you cannot hold or reach an
objective — was written off as worthless. In ranked it is doubly wrong, because each elimination also
costs the enemy a coin or forces a 4s revive. Combat pressure attacks money and resources at once.

**Why it happened:** an assumption that objective modes pay only for objectives. Never checked. The
Commander surfaced it, again — that is now **three** substantive mechanics the Commander has
supplied that were absent from the model (coins, kill rewards, and by extension the whole revenue
structure).

**Rule extracted:** when building a model of a game's economy, **enumerate the revenue streams
explicitly and verify the list is complete** before reasoning about allocation. An allocation
framework over an incomplete set of income sources will be confidently wrong in exactly the way this
one was.

---

## Pattern summary

Across all five: **uniform confidence across known and inferred claims.** Rules and inventions were
delivered in the same register, which removed the Commander's ability to distinguish them. The `[V]`
/ `[I]` / `[?]` markers exist to make that impossible going forward — and they only work if
uncertainty is stated *inline, at the point of the claim*, not as a disclaimer at the end.
