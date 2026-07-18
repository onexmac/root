# Skill: System Export

**Function:** Compile the entire Human Instrumentality Project into a single versioned zip the Commander can use to delete-and-reupload the whole knowledge base, eliminating drift between files.
**Triggered by:** *inferred intent*, not a fixed command string.
**Writes to:** `changelog.md` (version entry) before packaging.

---

## Why This Exists

The Commander's update workflow is **delete-everything-and-reupload**. That makes the export the source of truth at update time: whatever the zip contains *becomes* the project. The risk this defends against is partial updates — a few files changed in place while others drift — producing silent inconsistency across a 60+ file system. The export guarantees a coherent snapshot: changed files rewritten, unchanged files copied verbatim, one version stamped across the whole set.

---

## Trigger — Inferred, Not Literal

There is no magic command. MAGI infers export intent from any phrasing that means *"give me the files to update the system."* Examples that should fire it:

- "dame los archivos para actualizar el sistema"
- "exporta el sistema" / "export the system"
- "quiero resubir todo" / "I want to re-upload everything"
- "empaca v6" / "package the new version"
- "dame el zip del sistema"

If intent is ambiguous (e.g. "give me the file" referring to one specific artifact just discussed), ask one clarifying question rather than exporting the whole system.

---

## Mechanics

When export intent is inferred, MAGI runs this sequence:

1. **Read the substrate-modification log** from the Session Loop (`Session_loop.md` Part 1, "Substrate modifications"). This is the list of files created/edited/deleted this session, each with a one-line description. If the log is empty but the Commander clearly wants an export, confirm there were no changes and export a verbatim snapshot at the current version.

2. **Determine the version bump.** MAJOR if the session changed how MAGI routes, attributes, or audits. MINOR otherwise (packets, refinements, fixes). State the proposed version to the Commander and proceed unless corrected.

3. **Write the `changelog.md` entry.** New version section at the top of History, with: a one-line release title, the architectural/discipline/substrate changes grouped, and any known-deferred items carried forward. Update the "Current System Version" line and the component manifest table.

4. **Apply pending edits** to the affected files (the ones in the modification log).

5. **Assemble the full snapshot.** Copy *every* project file into the export directory. Unchanged files are copied **verbatim** — never regenerated, never paraphrased (regeneration risks silent drift and is the failure this skill prevents). Only files in the modification log are rewritten.

6. **Package as one zip.** Single archive, never loose files (loose-file delivery is error-prone for delete-and-reupload). Name it with the version, e.g. `magi_system_v6.0.0.zip`.

7. **Deliver via `present_files`** with a short manifest: version, count of files changed vs. carried verbatim, and the one-line changelog title. No long postamble.

---

## The One Discipline This Imposes

**The project is the source of truth; do not edit files locally without re-uploading.** Because the export copies unchanged files verbatim from the current project state, any local edit the Commander made *outside* this workflow and did not re-upload would be silently reverted by the next export's "verbatim" copy. The contract: edits happen in-session (logged, exported) or get re-uploaded immediately so the project reflects them before the next export.

---

## Verification Before Delivery

- File count matches the previous export ± intended additions/deletions (flag any unexpected delta).
- `changelog.md` "Current System Version" matches the zip name.
- No file still asserts a *system* version that contradicts the changelog (component versions are fine).
- Any "(to be written)" / deferred reference is honest, not an orphan pointing at a missing required file.
- Every file the modification log marked as changed is actually different from the prior snapshot.

---

*Maintained by Science (`nerv_science.md`). The export is the project's reproducibility guarantee: from one zip, the entire system can be reconstituted at a known version.*
