# Skill: System Release (git-native)

**Function:** Cut a coherent, versioned release of the Human Instrumentality Project — bump the version, write the changelog entry, commit, and tag. Under Claude Code the git history *is* the system's source of truth; this skill is the discipline for stamping a clean version across it.
**Triggered by:** *inferred intent*, not a fixed command string.
**Writes to:** `changelog.md` (version entry) + a git commit and tag.

---

## Why This Exists (and what changed)

Under the old Claude Projects workflow this skill compiled the whole system into a **zip for delete-and-reupload**, because the uploaded project was the source of truth and partial updates caused silent drift. **That world is gone.** In Claude Code:

- **Git is the source of truth.** Files are edited in place and committed; history is preserved automatically. There is no zip, no delete-and-reupload, no "copy unchanged files verbatim."
- **Drift is prevented by version control, not by snapshotting.** Every change is already a reviewable diff.

What remains worth doing deliberately is the **release stamp**: bumping the version, writing the changelog entry, and tagging — so any point in history can be named and returned to.

---

## Trigger — Inferred, Not Literal

There is no magic command. MAGI infers release intent from any phrasing that means *"stamp a new version of the system."* Examples:

- "cut a release" / "tag a version" / "bump the version"
- "empaca vX" / "package the new version"
- "actualiza el changelog y commiteá"
- "quiero dejar esto versionado"

If intent is ambiguous (e.g. "commit this" referring to one file just discussed), do the ordinary commit rather than a full release.

---

## Mechanics

When release intent is inferred, MAGI runs this sequence:

1. **Gather the change set.** `git status` / `git diff` and the Session Loop's substrate-modification log — the files created/edited/deleted since the last release tag. If nothing changed, say so; don't cut an empty release.

2. **Determine the version bump.** MAJOR if the session changed how MAGI routes, attributes, gates, or audits. MINOR otherwise (packets, refinements, fixes). State the proposed version and proceed unless corrected.

3. **Write the `changelog.md` entry.** New version section at the top of History: a one-line release title, the architectural/discipline/substrate changes grouped, and any known-deferred items carried forward. Update the "Current System Version" line and the component manifest. **Never rewrite past history entries** — they are the record; append.

4. **Commit.** Stage the changed files and the changelog; `git commit` with a message whose subject matches the release title.

5. **Tag.** `git tag vX.Y.Z` at that commit, so the version is a named point in history.

6. **Report.** A short manifest: version, count of files changed, the one-line changelog title, and the tag. No long postamble.

---

## The One Discipline This Imposes

**Commit as you go; don't let the working tree drift far from a clean state.** The value of the git model is that every change is reviewable — but only if changes are actually committed. Large uncommitted working trees recreate the exact drift the old zip workflow fought. Edit, commit, and let the changelog + tags mark the coherent versions.

---

## Verification Before Tagging

- `changelog.md` "Current System Version" matches the tag you're about to write.
- No file still asserts a *system* version that contradicts the changelog (component versions are fine).
- Any deferred reference is honest, not an orphan pointing at a missing required file.
- `git status` is clean after the release commit (nothing important left unstaged).

---

*Maintained by Science (`nerv_science.md`). The release is the project's reproducibility guarantee: from one tag, the entire system can be checked out at a known version.*
