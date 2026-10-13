---
description: Write plan.md for a triaged task
argument-hint: <issue number>
---

You are running the **planning** step of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `triage.md` and `notes.md` (if present).
- Stop with a clear message if `triage.md` is missing or its verdict isn't `ready`. Prepend a `## <date> · planning · claude-code` entry to `log.md` saying why before you stop, and leave `task.md` unchanged.

## Do

1. Read the code the task touches. Prefer reading over guessing.
2. Write `plan.md`. A human reads only the top, so everything they must see goes there; the rest is for `/work`.
   ```
   # Plan · gh-<n> · <title>

   ## Summary

   - <3 to 5 bullets: what will happen, in plain words, and anything a human must notice
     (a deploy, a data change, a manual step). No file paths.>

   ## Decision needed           (only if a choice must be made; then stop, see Rules)
   ### D1 · <question>
   - **A · <option>.** <what it means>
   - **B · <option>.** …
   **Recommendation: <letter>.** <why>

   ## Choices made              (only if you settled something the issue, triage.md and notes.md didn't)
   - **<choice>.** <the alternative you rejected, and why — one or two lines>

   ---

   ## Changes
   <ordered list, each with the file path and what changes>

   ## Data and schema
   <Sanity schema or content changes and how existing content migrates; "none" if none>

   ## Test strategy
   <what the checks in .factory/config.yml catch; "By hand in HITL": the checklist for the human>

   ## Out of scope
   ```
   Keep **Summary**, **Decision needed** and **Choices made** short enough to read in a minute. Don't repeat `triage.md`.
3. Decide the next state. **`plan-approval`** if any of these holds, otherwise **`working`**:
   - `gates.plan: true` in `.factory/config.yml`;
   - `planGate: true` in `task.md` (triage recommended plan approval);
   - `plan.md` has a **Choices made** section;
   - the work has effects outside the repo: a deploy, a billable resource, or a write to any Sanity dataset.
4. Prepend a `## <date> · planning · claude-code` entry to `log.md` that names the next state and, for `plan-approval`, which of the reasons above applied. Work after this step may run unattended, so be explicit.
5. Update `task.md` frontmatter: `state`, `stateEnteredAt`, `updatedAt`.

## Rules

- Change no code.
- If the plan needs a decision the issue doesn't answer, write the options in `plan.md` and stop instead of choosing silently.
