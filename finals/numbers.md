# Numbers — THE FINALS

**Last verified: 2026-08-08.** Sources: [thefinals.wiki Cashout](https://www.thefinals.wiki/wiki/Cashout),
[Cash Box](https://www.thefinals.wiki/wiki/Cash_Box), [Revive Statue](https://www.thefinals.wiki/wiki/Revive_Statue),
[Power Shift](https://www.thefinals.wiki/wiki/Power_Shift).

This is the anti-hallucination layer. **Read it; do not recall it.**

## Objective timers

| Thing | Value | Conf |
|---|---|---|
| Vault windup (before it can be opened) | 15s | `[V]` |
| Vault opening timer | 20s | `[V]` |
| Cashout deposit duration — qualifying/knockout | **2:10** | `[V]` |
| Cashout deposit duration — final round | **2:00** | `[V]` |
| Steal duration — qualifying | **7s** | `[V]` |
| Steal duration — final round | **6s** | `[V]` |
| Overtime added if round time insufficient | up to 1:00 | `[V]` |

## Money — every revenue stream

**There are five ways to earn, not one.** Combat is a revenue stream, not just a means to an
objective. `[V]`

| Source | Value | Conf |
|---|---|---|
| **Eliminating a contestant** | **$500** | `[V]` |
| Eliminating a contestant during Death Match | $1,000 | `[V]` |
| Opening a Vault | $1,000 | `[V]` |
| Stealing an active Cashout Station — qualifying | $1,000 | `[V]` |
| Stealing an active Cashout Station — final round | $0 | `[V]` |
| Completing a deposit | all cash held in the station | `[V]` |
| Final round win threshold | first to $50,000 | `[V]` |

### The deposit split — 20/80 `[V]`

**On deposit, 20% of the box's value is paid to your team instantly. The remaining 80% sits in the
station and goes to whoever owns it at expiry.**

| Box | Value | Instant on deposit (20%) |
|---|---|---|
| Vaults 1–2 | $10,000 `[V]` | **$2,000** `[V]` |
| Vaults 3–4 | $15,000 `[V]` | **$3,000** `[V]` |
| Vaults 5–6 | $22,000 `[?]` | **$4,000** `[V]` |

`[?]` **Conflict:** 20% of $22,000 is $4,400, but the stated instant payout is $4,000 — implying a
$20,000 box. One of the two figures is wrong or stale. Needs Commander confirmation from a scoreboard.

**This is a major correction to the original model** (see `corrections.md` §6). A deposit is never a
total loss — you bank a fifth of the box the moment it goes in, even if the cashout is then stolen.
Depositing is *partially* paid up front, which makes marginal deposits considerably less reckless
than previously argued.

**Escalating box value remains the key pricing fact:** the first cashout is worth roughly half the
last. Early discipline is correct pricing, not passivity.

**Combat pricing `[I]`:** three eliminations ($1,500) out-earn a steal ($1,000). A full team wipe is
$1,500. That is real money and it invalidates "off-objective kills are worthless" — see
`corrections.md` §7.

## Classes

| Class | Health | Speed | Conf |
|---|---|---|---|
| Light | **150** | fastest | `[V]` |
| Medium | **250** | middle | `[V]` |
| Heavy | **350** | slowest | `[V]` |

Health regeneration begins after **9s** without taking damage `[V]` — confirmed for Medium;
`[?]` whether the delay is identical across classes.

## Weapon damage & TTK

**Source: esportsrambles, Season 9 / v9.5.0 (2026-01-15). `[?]` — this predates Season 11 and
balance patches move these numbers. Treat as indicative, re-verify before relying on a specific
figure.** TTKs below are vs **Light (150 HP)** unless stated.

| Weapon | Class | Damage | DPS | TTK vs Light |
|---|---|---|---|---|
| M11 | Light | 16 | 265 | 0.54s |
| V95 | Light | 38 | 228 | 0.50s |
| SH1900 | Light | 195 | 260 | one-shots Light |
| **SR-84 (sniper)** | Light | **118** body / **236** head (2×) | 90 | **1.30s** |
| FCAR | Medium | 22 | 198 | 0.67s |
| AKM | Medium | 20 | 200 | 0.70s |
| R.357 | Medium | 74 | 172 | 0.86s |
| ShAK-50 | Heavy | 30 | 210 | 0.57s |
| M60 | Heavy | 20 | 193 | 0.72s |
| M134 Minigun | Heavy | 11 | 275 | 0.52s |

### SR-84 specifics (Commander's weapon)

- Body 118, head 236 (2× multiplier). `[V]` for S9 data.
- **A headshot does NOT one-shot a Medium (250) or Heavy (350).** `[I]` from the damage figures.
- `[?]` **Conflict:** one community source claims the SR-84 "can one-shot any class." At 236 headshot
  damage that is arithmetically false against Medium and Heavy. Either the source is wrong or the
  weapon was buffed after S9. **Needs verification — this materially changes how to play it.**
- TTK vs Medium/Heavy: **2.61s** `[V, S9]` — i.e. three body shots on a Medium, four on a Heavy.
- Within 40m there is no bullet drop to compensate for. `[V]`

## Death, revives, coins

| Thing | Value | Conf |
|---|---|---|
| Individual respawn timer | **30s** | `[V]` |
| Full team wipe respawn | **25s** | `[V]` |
| Manual revive (hold Interact on statue) | **4s** | `[V]` |
| Defibrillator revive | faster than manual; exact value | `[?]` |
| Respawn coins — starting, ranked/tournament | **2 per contestant** | `[V]` |
| Respawn coins — gained per new round | **+1 per contestant** | `[V]` |
| Respawn coins — casual / Quick Cash | unlimited | `[V]` |
| Respawn coins — Power Shift | unlimited | `[V]` |
| Statue persistence before forced respawn | `[?]` — skull icon fills to show remaining time | `[?]` |
| Out of coins entirely | cannot respawn; revive is the only way back | `[V]` |

**Disputed:** one secondary source states "four respawn coins" per player. The mode-specific wiki
states 2 + 1/round. Treating 2 + 1/round as authoritative for ranked Cashout; flagged `[?]` pending
Commander confirmation from an actual ranked match HUD.

### THE CRITICAL RULE

> **A respawn coin is consumed when a player RESPAWNS — not when they are revived.**
> Reviving a teammate *saves* a coin. Letting them respawn *spends* one. `[V]`

Everything in `macro.md` about coin economy descends from this. It is the inverse of the intuitive
assumption. See `corrections.md` entry 1.

## Carrying the cash box

| Thing | Value | Conf |
|---|---|---|
| Movement speed while carrying | **no penalty — can move and sprint normally** | `[V]` |
| Weapons while carrying | cannot use; attempting drops the box | `[V]` |
| Gadgets / Specializations while carrying | mostly cannot; attempting drops the box | `[V]` |
| Movement abilities usable while carrying | a small set, e.g. Evasive Dash | `[V]` |
| Thrown box impact damage | **50** | `[V]` |
| Throwing into a station from range | starts the cashout marginally sooner | `[V]` |
| Box drops involuntarily on | elimination, Glitch Grenade/Trap, Winch Claw stun | `[V]` |
| Out of bounds | returns to last valid position after a delay | `[V]` |

## Structure

| Thing | Value | Conf |
|---|---|---|
| Tournament size | 8 teams / 24 contestants | `[V]` |
| Knockout round 1 | 8 teams → two matches of 4 | `[V]` |
| Final round | top 2 teams | `[V]` |
| Cashout stations active simultaneously | 2 | `[V]` |
| New station spawns | after each completed deposit | `[V]` |
| Vaults active simultaneously | 2 | `[V]` |

## Double Jeopardy (since Season 9)

Inserting a **second** cash box into an already-active Cashout Station triggers Double Jeopardy for
the inserting team. If that team does not own the station when the timer expires, they **instantly
lose 50% of their total cash.** `[V]`

This is an anti-griefing mechanic and it is a *massive* tactical constraint. See `macro.md`.

## Still needed

- `[?]` Defibrillator exact revive time and cooldown
- `[?]` Statue persistence duration
- `[?]` Class base HP (Light / Medium / Heavy) and movement speeds
- `[?]` Weapon damage, TTK, effective ranges
- `[?]` Gadget cooldowns and charge counts
- `[?]` Whether respawn timer scales with round progression (**previously asserted without basis —
  the 30s/25s figures above show no scaling; treat prior claim as retracted**)
