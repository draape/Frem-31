---
description: Implement a planned task in its worktree, run checks, hand over to HITL
argument-hint: <issue number>
---

You are running the **working** and **self-test** steps of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md`, `notes.md` (if present) and the newest entries in `log.md` — a "sent back" entry there carries the human's notes and takes priority.
- Verify you are in the task's worktree: `git rev-parse --abbrev-ref HEAD` must start with `feature/gh-$ARGUMENTS-`. If not, stop and say so; do not work in the main checkout.

## Do

1. Implement `plan.md`, change by change. Commit small, with the repo's commit style. No attribution footers.
2. For each app the change touches, run its `checks` from `.factory/config.yml` in that app's directory. Fix failures and re-run, at most `budgets.maxRetries` rounds. If still failing, go to step 5 with `state: blocked`.
3. Push with `git push -u origin <branch>` — always `-u`, the cleanup tooling depends on it.
4. Prepend a `## <date> · working · claude-code` entry to `log.md`: what was done, what the checks said, anything a reviewer should know. One more line for each self-test round.
5. Update `task.md` frontmatter: `state: hitl-test` (or `blocked` with a `blockedReason`), `branch`, `worktree`, `stateEnteredAt`, `updatedAt`.

## Rules

- Stay inside `plan.md`. If the plan turns out wrong, write why in `log.md` and stop with `state: blocked` rather than improvising a different design.
- Never write to a production Sanity dataset.
- Log before you stop, whatever the outcome.
