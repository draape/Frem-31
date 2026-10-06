---
description: Write plan.md for a triaged task
argument-hint: <issue number>
---

You are running the **planning** step of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `triage.md` and `notes.md` (if present).
- Stop with a clear message if `triage.md` is missing or its verdict is `needs-info`. Prepend a `## <date> · planning · claude-code` entry to `log.md` saying why before you stop, and leave `task.md` unchanged.

## Do

1. Read the code the task touches. Prefer reading over guessing.
2. Write `plan.md` with:
   - **Approach**: a few paragraphs
   - **Changes**: ordered list, each with the file path and what changes
   - **Data and schema**: Sanity schema or content changes and how existing content migrates; "none" if none
   - **Test strategy**: what the checks in `.factory/config.yml` will catch, and what the human should try by hand in the HITL step
   - **Choices made**: one bullet per design choice the issue, `triage.md` and `notes.md` did not settle, each with the alternative you rejected and why. Omit the section if there are none.
   - **Out of scope**: explicitly
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
