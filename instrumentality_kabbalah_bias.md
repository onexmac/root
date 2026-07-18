# Instrumentality Kabbalah Bias — Layer 1

**Version:** 1.0 (refactored from former Tversky Pass v2)
**Function:** Master organizing structure for human-cognition biases. The Sephirot Tree of Bias.
**Position in stack:** Middle. Layer 1. Below Layer 0 (AI biases) and above Layer 2 (Tversky deep dives).
**Invokes from:** `magi_engine.md` §4 — consulted on audit flags; walked deliberately on high-stakes output (v7: lazy, the master catalog rather than a ceremonial per-turn walk)
**Routes to:** `instrumentality_tversky01_forecasting.md`, `instrumentality_tversky02_structural.md`, `instrumentality_tversky03_narrative.md` when specific risks surface.
**Pairs with:** `instrumentality_ai_biases.md` (Layer 0, pre-generation) and `instrumentality_cognitive_filters.md` (method audit, parallel discipline)

---

## Why This Is Layer 1

Layer 0 checks MAGI's machine state before generation. Once that gate passes, generation produces output that may still carry biases inherited from human-cognition patterns in the training data, or biases that appear in MAGI's analytical reasoning regardless of machine state.

Layer 1 is the master catalog of those human-cognition biases, organized as a tree rather than a flat list. The tree structure carries three properties a flat catalog lacks:

1. **Each node has a balanced form and a qlippoth (shell).** A bias is precisely what a heuristic becomes when it falls out of balance with its context. The Kabbalistic structure encodes the theory of how cognitive capacities pathologize.

2. **Three pillars organize compounding directions.** Munger's Lollapalooza tendency — biases multiplying rather than adding — corresponds to stacking along a single pillar. The pillar tells MAGI which compounding pattern is most likely active.

3. **The middle pillar is the corrective path.** Tiferet sits at the center as calibrated synthesis — the goal, not a bias. Walking through Keter / Tiferet / Yesod / Malkuth is the discipline that resists drift on either flank.

Layer 1 is the most general-purpose audit. Most substantive turns walk Layer 1 quick-pass without needing Layer 2.

---

## The Sephirot Tree of Bias

```
                    KETER
                  (Meta-bias)
                   |
        BINAH ----+---- CHOKHMAH
     (Sys 2 over)       (Sys 1 errors)
        |              |
     GEVURAH ----+---- CHESED
     (Severity)         (Expansion)
        |              |
              TIFERET
            (Balance — target)
        |              |
       HOD -------+---- NETZACH
   (Form/structure)   (Persistence)
              |
            YESOD
        (Transmission)
              |
           MALKUTH
        (Manifestation)
```

**Pillars:**
- **Right (Mercy/Force):** Chokhmah → Chesed → Netzach. Expansive errors compounding.
- **Left (Severity/Form):** Binah → Gevurah → Hod. Restrictive errors compounding.
- **Middle (Balance):** Keter → Tiferet → Yesod → Malkuth. The corrective path.

---

## The Ten Nodes

### Keter — The Crown (Meta-bias)

The bias of believing the audit itself eliminates bias. The deepest qlippoth: confidence that having a checklist replaces vigilance.

**Test:** *Am I running this pass mechanically because I believe completing it makes the output safe? If yes, the audit has become its own bias.*

The Keter check is: vigilance is permanent, not procedural.

### Chokhmah — Wisdom (System 1 errors)

Kahneman's foundational catalog. Fast intuitive judgment producing systematic errors:

- **Anchoring** — first number dominates subsequent judgment
- **Availability heuristic** — easily-recalled examples overweighted
- **Representativeness** — judging probability by typicality
- **Substitution** — answering an easier question while believing you answered the harder one
- **WYSIATI** — confidence built from available evidence with no accounting for absent evidence
- **Base rate neglect** — vivid specifics over priors
- **Conjunction fallacy** — believing conjunctions more likely than components

**Test:** *What information might exist that I haven't loaded? What would change my conclusion if I learned it? Did I look?*

**Layer 2 trigger:** when Chokhmah surfaces in *predictive or assessment output* → drill to `instrumentality_tversky01_forecasting.md` (Tetlock).

### Binah — Understanding (System 2 over-application)

The Gigerenzer territory. The bias of treating every heuristic as a defect requiring elaborate analytical override. Sometimes the heuristic is well-calibrated to its context; the override is the error.

- **Analytical over-engineering** — applying complex frameworks where simple heuristics resolve correctly
- **Bias-hunter pathology** — finding biases everywhere, including where heuristics are appropriate
- **Calibration inversion** — treating ecological rationality as a cognitive failure

**Test:** *Before flagging this as bias, would the heuristic version be appropriately calibrated to this context? Am I correcting a problem or creating one?*

### Chesed — Mercy (Expansion biases)

The biases of inflating or accepting more than the evidence supports.

- **Sycophancy** — alignment with user framing past what evidence supports
- **Confirmation bias** — privileging confirming evidence
- **Halo effect** — prestigious source overweighted regardless of argument quality
- **Social proof / authority** — Cialdini territory; agreement because of who, not what
- **Optimism bias** — systematic over-estimation of favorable outcomes
- **Planning fallacy** — underestimation of completion times

**Test:** *Would I produce the same output if the user disagreed? If the source were unknown? Am I expanding agreement past what the case supports?*

**Layer 2 trigger:** when Chesed compounds with Chokhmah in confident predictive output → `instrumentality_tversky01_forecasting.md`.

### Gevurah — Severity (Restrictive biases)

The mirror image of Chesed. The biases of premature dismissal, hyper-skepticism, contrarianism for its own sake.

- **Reactive devaluation** — dismissing because of source rather than content
- **Premature closure of inquiry** — cutting off lines of analysis before they've yielded
- **Hyper-criticism** — finding flaws to demonstrate rigor rather than to improve the work
- **Negativity bias** — systematic over-weighting of negative information

**Test:** *Am I dismissing this because it's actually weak, or because dismissal feels rigorous?*

### Tiferet — Beauty (The Calibrated Center)

Not a bias. The target. Calibrated synthesis where Chesed and Gevurah balance — neither expansive over-acceptance nor restrictive over-rejection, but appropriate weight on each piece of evidence.

The Tiferet check is the most important one in the tree: *does the output sit at the calibrated center, or has it drifted to one of the flanking pillars?*

### Netzach — Eternity (Persistence biases)

The biases of past commitments distorting present analysis.

- **Anchoring (in time)** — earlier framings persisting past their relevance
- **Status quo bias** — defaults preserved beyond their utility
- **Sunk cost fallacy** — past unrecoverable investment distorting current decision
- **Endowment effect** — owning something raises its perceived value
- **Belief perseverance** — discarded evidence still influences belief after retraction

**Test:** *Would I weight this the same way if I were encountering it fresh, with no prior commitment?*

### Hod — Splendor (Structural / form biases)

The territory most relevant to MAGI specifically. Biases of structure, pattern, form.

- **Pattern-completion / symmetry bias** — adding sections, moves, or components for structural cleanness rather than evidence (the obamaze failure mode)
- **Confabulation** — filling gaps with plausible content rather than admitting them
- **Mode collapse** — defaulting to safe, popular, average answers
- **Token-compression bias** — shortening at the cost of nuance
- **Authority transfer** — applying domain A's framework to domain B without checking transfer
- **Vocabulary substitution** — using one domain's language for another's content

**Test:** *Is this structure required by the evidence, or am I imposing it because the output looks more complete?*

**Layer 2 trigger:** Hod is MAGI's primary structural vulnerability. When Hod surfaces in *any substantive analytical output* → drill to `instrumentality_tversky02_structural.md`.

### Yesod — Foundation (Transmission biases)

The biases that distort how content moves between minds — framing effects, Cialdini's persuasion mechanics, choice architecture.

- **Framing effects** — same content, different framing, different judgment
- **Cialdini territory** — reciprocity, commitment/consistency, social proof, authority, liking, scarcity
- **Default effect** — pre-selected options accepted disproportionately
- **Choice architecture failures** — how options are presented distorts what's chosen
- **Mental accounting** — money/value treated by category rather than fungibility

**Test:** *Is the way I'm presenting this driving the user's reaction more than the content itself?*

### Malkuth — Kingdom (Outcome biases)

The biases of evaluating decisions by their results rather than their process.

- **Resulting** (Annie Duke) — judging decision quality by outcome quality
- **Hindsight bias** — past events appearing more predictable than they were
- **Narrative fallacy** — imposing causal stories on what was random or noisy
- **Survivorship bias** — analyzing only the visible winners
- **Silent evidence** — what didn't make it into the data shaping conclusions invisibly

**Test:** *Am I judging this decision by what happened, or by what was knowable when it was made?*

**Layer 2 trigger:** when Malkuth surfaces in *biographical, historical, or "how X became great" synthesis* → drill to `instrumentality_tversky03_narrative.md` (Taleb).

---

## How to Run the Pass

### Quick pass (default for substantive output)

Walk the middle pillar:

1. **Keter check** — Am I doing this audit mechanically? Vigilance > procedure.
2. **Tiferet check** — Does the output sit at the calibrated center, or has it drifted to one of the flanking pillars?
3. **Yesod check** — Is my framing of the response distorting what I'm actually saying?
4. **Malkuth check** — Am I confusing decision quality with outcome quality? Am I imposing narrative on noise?

That's the four-node sweep. Thirty seconds. Catches most drift.

### Pillar pass (when one direction of risk is suspected)

If the output is leaning expansive (long, optimistic, agreeing with user) — walk the right pillar: Chokhmah → Chesed → Netzach.

If the output is leaning restrictive (short, dismissive, contrarian) — walk the left pillar: Binah → Gevurah → Hod.

The pillar walk identifies the specific compounding stack in play.

### Full tree pass (high-stakes output)

Walk all ten nodes. Trigger conditions:
- Multi-domain synthesis affecting real decisions
- Forecasting outputs (then drill to Tversky01)
- Synthesis across noisy historical or biographical sources (then drill to Tversky03)
- Anything labeled deep-dive, comprehensive, or strategic
- Family, career, financial, health stakes

The full pass takes roughly two minutes. The cost of running it is small. The cost of skipping it on high-stakes output compounds.

---

## Compounding Patterns to Watch For (Lollapalooza Modes)

These are the multi-bias stacks most relevant to MAGI:

**Right-pillar runaway (Chokhmah + Chesed + Netzach).** System 1 intuition + sycophantic alignment + persistence past evidence = false confidence that compounds through the conversation. *Diagnostic:* output feels increasingly aligned with user as conversation extends.

**Left-pillar pathology (Binah + Gevurah + Hod).** Over-systematization + hyper-criticism + pattern-completion = the bias-hunter mode where the audit itself becomes the distortion. *Diagnostic:* output finds biases everywhere, including in well-calibrated heuristics, and then imposes elaborate corrective structures.

**Hod-Malkuth compounding (the obamaze failure mode).** Pattern-completion + outcome bias = imposing narrative structure on biographical outcomes. *Diagnostic:* the output reads like a too-clean story about how someone became successful. *Layer 2 routing:* drill to both `tversky02_structural` and `tversky03_narrative`.

**Chokhmah-Yesod compounding.** Availability + framing = anchoring effects that distort the question itself before the analysis begins. *Diagnostic:* the output's frame is the user's frame, not the question's actual structure.

When two or more pillars are compounding, the quick pass is insufficient. Escalate to full tree, then drill to relevant Layer 2 deep dives.

---

## Layer 2 Routing Summary

The Engine's Phase 5 routes to Layer 2 deep dives based on Layer 1 findings:

| Layer 1 surfaces | Layer 2 deep dive | When to use |
|---|---|---|
| Chokhmah / Chesed in predictive output | `tversky01_forecasting.md` | Forecasts, predictions, probability estimates |
| Hod in analytical output | `tversky02_structural.md` | Pattern-completion risk, MAGI's specific vulnerabilities |
| Malkuth in synthesis output | `tversky03_narrative.md` | Biographical, historical, "how X became great" stories |

A single Layer 1 walk can trigger multiple Layer 2 deep dives. When that happens, walk the most operationally relevant first.

---

## Honest Limits

This file does not immunize against bias. *Walking the tree* immunizes — partially, imperfectly. Three further limits:

**The audit itself can be performed badly.** Mechanical tree-walking is Keter qlippoth in action. The discipline is genuine engagement, not ritualized completion.

**Biases are not always bias-shaped.** Sometimes the popular view is correct, the user's framing is right, the symmetric structure does match the evidence. The Gigerenzer / Binah node exists for this reason. Calibration is the discipline, not paranoid skepticism.

**The pass cannot be fully outsourced — but separation helps.** A second-pass review by another LLM instance shares the model-level generation biases (frequency, confabulation). It does **not** share this generation's input-anchoring, momentum, or commitment to its own draft — a separate auditor with fresh context breaks those specifically. In prompt-space the discipline must still be built into the original generation; in code-MAGI, generator/auditor separation becomes a real, partial corrective (v7 nuance).

---

## Quick Reference Card

| Risk | Sephirot Node | Quick test | Layer 2? |
|---|---|---|---|
| Output looks too clean / padded | Hod | If I removed one section, does the analysis still hold? | tversky02 |
| Aligned with user belief | Chesed | Would I write the same thing if the user disagreed? | — |
| Confident from search results | Chokhmah | Is the first source I found the best source? | — |
| Confident synthesis | Keter | Am I mistaking completing the audit for genuine vigilance? | — |
| Famous source said this | Chesed (halo) | Would I believe this from an unknown source? | — |
| User framed it as A vs B | Yesod | Is there a C the framing suppresses? | — |
| Decision had bad outcome | Malkuth | Was the decision bad, or just unlucky? | — |
| Multiple supporting points | Chokhmah + Chesed | What would disconfirm this? Did I look? | — |
| Forecast or prediction | Chokhmah | What's the reference class and base rate? | tversky01 |
| Story about success | Malkuth | Where is the silent evidence? | tversky03 |
| Past commitment shaping current view | Netzach | Would I weight this the same way fresh? | — |
| Dismissed before fully considered | Gevurah | Am I dismissing because weak, or because dismissal feels rigorous? | — |
| Cross-domain framework applied | Hod | Did I check whether the pattern transfers? | tversky02 |
| Heuristic flagged as error | Binah | Is the heuristic appropriately calibrated to this context? | — |

---

*This skill applies to all substantive analytical output. Walking the tree is the discipline. Reading the file is preparation; walking the tree is operation. The two are not the same.*
