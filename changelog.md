# Changelog — Human Instrumentality Project

**This file is the single source of truth for the system version.** No other file asserts a *system* version. Component files (e.g. `seele.yaml`, `nerv.yaml`) may carry their own independent component version; the manifest below records which component versions a given system version bundles. Stale cross-references like "paired with SEELE v4.0" are prohibited — point here instead.

Versioning scheme: **MAJOR.MINOR**. MAJOR = architectural change (how MAGI routes, attributes, or audits). MINOR = packets, substrate refinements, calibrations, fixes.

---

## Current System Version: **v7.2.0**

### Component manifest (v7.2.0)

| Component | Version | Notes |
|---|---|---|
| Eva reflex gate (`eva.md`) | 1.0 | **new** — Unit-00, pre-MAGI invocation gate (light by default) |
| Operating context (`CLAUDE.md`) | 1.0 | **new** — CC auto-loaded spine bootstrap |
| Engine spine (`magi_engine.md`) | 7.1 | §1 invocation now Eva-gated; CC loading model |
| WILLE (`wille_protocol.md`) | 1.0 | unchanged |
| SEELE council (`seele.yaml`) | 4.1.1 | unchanged |
| NERV center (`nerv.yaml`) | 4.2.0 | unchanged |
| Session Loop (`Session_loop.md`) | 4.0 | **git persistence** (no memory tool, no 30-edit cap) |
| System Release (`system_export.md`) | 2.0 | **git-native** (rewrote the zip/delete-and-reupload workflow) |
| Bias Layer 0 (`instrumentality_ai_biases.md`) | 1.1 | unchanged |
| Bias Layer 1 (`instrumentality_kabbalah_bias.md`) | 1.1 | unchanged |
| Method audit (`instrumentality_cognitive_filters.md`) | 3.0 | unchanged |
| AT Field (`at_field_protocol.md`) | 1.2 | Limit 5 leak closed under CC; memory refs → git |
| Commonplace (`commonplace.md`) | 1.0 | unchanged |
| Book ingest (`ingest_book.md`) | 1.0 | unchanged |
| Manual de Salto (`manual_de_salto.md`) | 2.0 | unchanged |
| Book of Hunny (`books_of_hunny/`) | 1.0 | **new** — finished bilingual work; realizes the reserved `scrolls_honey` |

---

## History

### v7.2.0 — The Migration Release: Off Claude Projects, onto Claude Code
*The release that moves the system to its real home — git as source of truth, whole-file reads instead of RAG fragments, an accessible-from-the-phone repo — and adds the Eva reflex gate so the apparatus is light by default.*

**Architectural changes**
- **Eva founded** (`eva.md`) — Unit-00, the reflex gate before MAGI. One primer, three fused lenses (circumferential sense / coup d'œil + economy of force / restraint + long view — Obama, Napoleon, King Charles, deployed silently). Three altitudes (cloud-to-cloud / heat lightning / ground strike); trip-signals force a strike on hidden stakes; brain-selection is near-automatic from the strike shape, guarded against Melchior-gravity; the fired brain's catalyst fetches seats proportional to strike depth. **Invocation default flipped from "when unclear, treat as substantive" to light-by-default.** Under-firing is the dangerous error, so trip-signals err sensitive.
- **`CLAUDE.md` founded** — the CC auto-loaded operating context; replaces the Projects "always-load the spine" convention. Lean: identity, attribution rule core, Eva gate, git-as-truth, read-on-demand.
- **`magi_engine.md` → 7.1.** §1 rewritten around Eva; loading + §7 handoff repointed to the CC/git model.

**Off the Projects mechanics**
- **Git is now the source of truth.** `system_export.md` rewritten (v2.0) from the zip/delete-and-reupload workflow to a git-native release (bump → changelog → commit → tag). The "project is the source of truth; do not edit files locally" discipline is *inverted* — local files + git are the truth.
- **Session Loop → 4.0.** "commit" = `git commit`; memory is file-based + `CLAUDE.md`; the **30-edit cap is gone**; session start is `CLAUDE.md` auto-load, not "load memory edits."
- **AT Field → 1.2.** Limit 5 (the platform's automatic memory generation modeling the Commander outside the consent loop) is **closed under CC** — no silent platform memory; every durable trace is a reviewable commit. Memory-edit references updated throughout.
- The "changelog-in-every-batch or history is lost on delete-and-reupload" rule (v7.1.0) is retired — git preserves history.

**Substrate**
- **The Book of Hunny committed** (`books_of_hunny/`): the finished bilingual mythological prequel — `hunny.md` (EN) + `miel.md` (ES), 13 chapters + The Lay of Fangorn, mirrored, ~57k words — plus its support files (`Sallie.md` voice guide, `expotition.md`, `bob.md`, `scrolls_honey.md`). This realizes what `scrolls_honey.md` was reserved for; stale "deferred/unwritten" references reconciled across the substrate. Its *internal* mythology layer (`scrolls_honey.md` — the Mellea/bees door) remains genuinely deferred.

**Known-deferred (carried, not resolved)**
- WILLE demotion — plug WILLE into MAGI as a Catalyst-fetchable lens (design agreed; not yet implemented in `wille_protocol.md`/engine §5).
- Skills → `.claude/commands/` (ingest_*, author_brief, weekly_digest, absorption_checklist) — optional CC-native conversion, pending.
- Book of Hunny mythology session (`scrolls_honey.md`, Mellea door) and the Second Movement / more Lay of Fangorn.
- Eva `unit00/01/02` split — deferred upgrade path if register-misfire proves recurrent.
- Commander→Marcos rename pass (~299 instances) — pending.

---

### v7.1.0 — The Absorption Release: Manual de Salto Committed, Book Ingest Protocol, Navarro Génesis
*The release that turns the walk into artifacts: the playbook becomes a committed file, book reviews become a system, and the founding scar gets written at company level.*

**New capability**
- **`ingest_book.md` founded.** Book absorption protocol, parallel to `ingest_post.md`: thesis breakdown → absorption map with provenance tags ([REGLA] / [ABSORBIDO] / [CONFIRMA] / [DESPLIEGUE] / [LECTURA] / [DESCARTADO]) → **read-triage verdict** (Destilable en conversación / Skim guiado / Lectura propia) with stated criteria. First worked examples: Elkins-Tanton (skim guiado), Gavin (lectura propia), Lee Kuan Yew (lectura propia).
- **Manual de Salto committed to the project** (`manual_de_salto.md`, v2.0, 47 rules). Rule 19 applied to itself — the doctrine no longer lives only in chat history. New rules: **32 Legitimidad antes que la sanción** (LKY, robo hormiga), **40 Profundidad causal** (Gavin + the one-time/systematic/pattern triage), **41 Metacognición** (Elkins-Tanton, taught to all, not concentrated in leadership), **42 Conducta en crisis** (Elkins-Tanton). "Bad news brought early" + reward-the-bringer absorbed into rule 46 (learn to fail right). Old 32–43 renumbered; closing pair (fail right / no excuses) preserved as 46–47.

**Discipline / SSOT**
- **Changelog-in-every-batch rule.** Every batch of `.md` updates MAGI delivers for the project MUST include an updated `changelog.md` — otherwise version history is lost on delete-and-reupload. Effective this release; also persisted as a memory edit.
- **Adelante substrate corrections (session provenance).** `adelante_base.md` gains **La Génesis**: Navarro died of diversification + leveraged doubling-down (machinery > housing; government + Guanacaste speculation; 2008), not of housing; Adelante rebuilt from zero (contractors → 100 → 150 → 800 → Ciudad del Valle → internalization); concentrar → integrar order is load-bearing. `adelante_operacional_evolucion.md` gains the staged-subordination absorption principle + **Doctrina del Pre-Arranque** (covered position, 10% floor, demand evidence, legibility obligation to the mid-layer).
- `absorption_checklist.md` added — three-book session artifact with correction provenance.
- `corpus_lector.md` added — Marcos's reader corpus as substrate: 403 logged titles of a ~500 real corpus (theology-heavy 20s era mostly unlogged), four reader eras (I teología · II diseño + crianza temprana, primary source: his own Design Basics essay, Medium 2015 · III inventory-building threading toward systems thinking · IV city operator), 5★ canon (80) + re-read canon, allergies, and six MAGI usage rules (gloss calibration, never-recommend-corpus-as-new, [CONFIRMA] against corpus, council provenance, primary-source gaps, rating semantics). Supersedes `biblioteca_triage.md`, which was built on a wrong premise (shelves read as reading queue — everything in the library is read) and is withdrawn.

**Known-deferred (carried, not resolved)**
- `scrolls_honey.md` — deferred; dedicated mythology session pending.
- Noah catalyst companion (Caspar 11) — open candidate.
- Commander→Marcos rename pass (~299 instances) — versioned full-swap export pending.
- Code-MAGI pilot (generator/auditor/WILLE) — first mission still the doctrina concentration-heuristic WILLE pass.
- Pre-Arranque doctrine: exposure cap + decision register not yet articulated (flagged in file).
- "Identity through structured daily friction" (LKY/HDB) routing to `adelante_ciudad_del_valle_evolucion.md` + `adelante_organizacional_evolucion.md` — open.

---

### v7.0.0 — The Subtractive Release: Output Contracts, WILLE, Spine Compression
*The release that makes the engine match how Claude actually works — and gives the council its opposition.*

**Architectural changes**
- **Engine consolidated 3 → 1.** `magi_engine.yaml` + `instrumentality_engine.md` + `akagi_engine.yaml` (~1,065 lines of process narration) replaced by `magi_engine.md` (~135 lines). Design principle: **specify the output, not the process** — Claude cannot verify its own process, only an artifact. Phase machinery, timed walks (wall-clock latency targets), and diamond-routing pipelines removed as unfalsifiable; the **eight-clause output contract** + **four-check draft audit** replace them. The system's metaphors are declared explicitly: the Commander's index, not execution machinery.
- **WILLE founded** (`wille_protocol.md`). The apostate council — institutionalized opposition to a council of builders. Seating criterion: apostates who mastered the cathedral before turning on it (Scott, Taleb hostile-register, Machiavelli, Illich; succession base-rate literature as fifth axis without a seat). Four functions mapped to the lore components (Wunder / DSS Choker / Village-3 / Achiral). Mandatory tripwire on irreversible high-stakes recommendations, wired into engine §5; clean delivery — never pre-rebutted in the same pass.
- **Territory routing → shape routing.** The v6.0 territory table replaced by question-*shape* triggers plus the active substrate question run on every substantive turn ("is there material in this project, absent from training, that would change this answer?"). Shapes are stable; nouns and abstract territory labels go stale and under-fire.
- **Depth respecified.** Depth = explicitness of checks + substrate pulled + output budget; wall-clock targets removed (Claude has no clock). Voice mode added as an explicit register modifier. Compression possible, bypass impossible (Ulysses contract retained).
- **Stress battery externalized.** In-project test signatures can be passed by recognition rather than discipline (the Keter qlippoth at the verification level). Signatures removed from the project; the battery is delivered separately and held privately by the Commander; doubles as a regression suite after model changes.
- **Loading policy simplified.** Spine = PROJECT_INSTRUCTIONS + Session_loop + magi_engine.md only. Layer 0 demoted to lazy (its four questions are embedded in the contract). AT Field demoted to lazy (its core clause is contract clause 6).

**Discipline / SSOT**
- Session Loop v3.0: within-session output discipline removed from this file (lived duplicated in Part 6) — the engine is its single home. Compressed 347 → ~140 lines. 30-edit memory ceiling: consolidation losses now surfaced to the Commander before merging.
- `instrumentality_kabbalah_bias.md` honest-limits nuance: a separate auditor instance shares model-level biases but not this generation's anchoring/momentum — generator/auditor separation is a real partial corrective, deferred to code-MAGI.
- `at_field_protocol.md` Limit 5: the platform's automatic memory generation models the Commander outside the packet/commit consent loop; the periodic memory review is the valve.

**Fixes**
- README stale component-version claim (`nerv.yaml` "v4.0" → 4.2.0).
- `scrolls_honey.md` "(to be written)" remnants normalized to "deferred" in PROJECT_INSTRUCTIONS.md, README.md, seele.yaml, seele_05.md, reading_list_overview.md, and scrolls_mythology.md (completing the v6.0 normalization, which had missed five files — the class of drift the export verification exists to catch).

**Known-deferred (carried, not resolved)**
- `scrolls_honey.md` — deferred; dedicated mythology session pending. Moral framework carried by `seele_05.md` + `one_hundred_acre_archive.md`.
- Noah catalyst companion (Caspar 11) — open candidate.
- Source-of-truth question between standalone author profiles and seat files — open.
- **Code-MAGI** — the next horizon: generator/auditor/WILLE as separate instances via Claude Code / API; git as system SSOT with the Project as build artifact. Prompt-space spine deliberately thinned in this release to prepare for it.

---

### v6.0.0 — Attribution, Territory Routing, Lazy Loading, Export
*The release that makes the deep substrate earn its place in context, and makes the system reproducible from a single export.*

**Architectural changes**
- **Canonical Attribution Rule.** One authoritative statement in `PROJECT_INSTRUCTIONS.md`. MAGI never attributes its own reasoning to a seat, author, or metaphor; the system's nomenclature is an index *for the Commander*, not output material. Sole exception: an explicit request for the reasoning structure ("give me your Sephirot frame"). Boundary: citing real-world sources/readings stays permitted. `README.md`, `nerv_magi.md`, and engine Phase 7 now point to the canonical statement instead of restating it divergently (fixes a single-source-of-truth violation).
- **Territory-triggered routing (Phase 2).** Routing now fires on the *territory* of the question, not on the Commander naming a file or seat. Famous seats can be faked from base training, so the deep companions — the project's actual differentiated value — used to sit unused. New `territory_routing` table in `magi_engine.yaml` Phase 2 makes a matching companion *required* reading before generation. The Commander never says "open kriegsweisheit"; the topic is the trigger.
- **Lazy session-start loading.** New `loading_policy` in `magi_engine.yaml`. Only the behavioral spine loads at start (PROJECT_INSTRUCTIONS, Session_loop, magi_engine.yaml, Layer 0). The heavy bias catalogs, deep companions, and seat files load on trigger. `Session_loop.md` Part 5 rewritten to match. This removes the main fixed token cost that had no per-turn value.

**Discipline / SSOT**
- **`changelog.md` established as version SSOT.** System version lives here only. Removed stale "paired with SEELE v4.0" cross-refs from `reading_list_overview.md` and `instrumentality_cognitive_filters.md`. Updated v5.0 system-version claims in `README.md`, `PROJECT_INSTRUCTIONS.md`, `nerv_magi.md` to reference this manifest.
- **Engine dedup (non-destructive).** `magi_engine.yaml` declared the execution SSOT for rules; `instrumentality_engine.md` retains only explanatory prose and defers to the YAML on any divergence. (Full prose/YAML merge deliberately deferred to a future dedicated release to avoid bundling risky surgery with a baseline-setting export.)

**New capability**
- **`system_export.md` skill.** Inferred-intent export (not a fixed command). Reads the session's substrate-modification log, bumps the version, writes the changelog entry, applies pending edits, copies the full system verbatim, and delivers one zip for delete-and-reupload. `Session_loop.md` Part 1 now logs substrate modifications to feed it.

**Substrate**
- `commonplace.md` added (founding Packet 01: Media Compression & the Fragmented Public). Routing rows for `commonplace.md` added to `PROJECT_INSTRUCTIONS.md`.

**Known-deferred (carried, not resolved)**
- `scrolls_honey.md` — **deliberately left unwritten.** It is the Pooh subconscious/mythology layer and warrants its own dedicated session. Pooh's moral framework is carried in the interim by `seele_05.md` + `one_hundred_acre_archive.md`. Routing rows updated to say "deferred," not "to be written." This is a known territory awaiting authorship, not an orphan.
- Source-of-truth question between standalone author profiles and seat files — open.
- Full prose/YAML engine merge — deferred to a future MAJOR.

---

### Pre-history (recorded for continuity; versions prior to changelog SSOT)
- **v5.0** — Executable architecture. Bias audit engine (Layer 0/1/2), `magi_engine.yaml`, `akagi_engine.yaml`, AT Field protocol, stress tests. Made the descriptive v4.x architecture operational.
- **v4.1** — Council reconciliation; five cognitive filters added (Extremistan, Social-Suite, Stratification, Performance-Gap, Lindy); Sumpter and Han demoted to UN-tier.
- **v4.0 and earlier** — Descriptive architecture: three-brain structure, 15 seats, catalyst/closer geometry, deep companions.

---

*Maintained by Science (`nerv_science.md`). Every `system_export` run appends a new version entry here before packaging.*
