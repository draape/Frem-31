---
description: Write plan.md for a triaged task
argument-hint: <issue number>
---

You are running the **planning** step of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `triage.md` and `notes.md` (if present).
- Stop with a clear message if `triage.md` is missing or its verdict is `needs-info`.

## Do

1. Read the code the task touches. Prefer reading over guessing.
2. Write `plan.md` with:
   - **Approach**: a few paragraphs
   - **Changes**: ordered list, each with the file path and what changes
   - **Data and schema**: Sanity schema or content changes and how existing content migrates; "none" if none
   - **Test strategy**: what the checks in `.factory/config.yml` will catch, and what the human should try by hand in the HITL step
   - **Out of scope**: explicitly
3. Prepend a `## <date> · planning · claude-code` entry to `log.md`.
4. Update `task.md` frontmatter: `state: working` (plan gate is off for this project), `stateEnteredAt`, `updatedAt`.

## Rules

- Change no code.
- If the plan needs a decision the issue doesn't answer, write the options in `plan.md` and stop instead of choosing silently.
