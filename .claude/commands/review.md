---
description: Review the task branch against main, write review.md, propose the PR
argument-hint: <issue number>
---

You are running the **local-review** step of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md`, `triage.md`, the latest `log.md` entries.
- `git fetch origin && git diff origin/main...HEAD` is the thing under review.

## Do

1. Review the diff against the acceptance criteria in `triage.md` and the plan. Look for: criteria not met, behaviour outside the plan, missing error handling, schema changes without migration, anything that would break the other app, secrets or config committed by mistake.
2. Write `review.md` with:
   - **Findings**: grouped as _blocking_, _should fix_, _nit_; each with file and line
   - **Verdict**: `ready-for-pr` or `send-back`
   - **PR title** and **PR body**: the body lists what changed, how it was tested, and links the issue with `Closes #$ARGUMENTS`
3. Prepend a `## <date> · local-review · claude-code` entry to `log.md`.
4. If the verdict is `send-back`: set `task.md` to `state: working` with the blocking findings summarised in the log entry, and stop.
5. If `ready-for-pr`: show the PR title and body and ask the human whether to create it. Only after a yes, run `gh pr create --title … --body … --base main`, record `pr: {connection: github-frem-31, id, url}` in `task.md`, set `state: pr`, and log it.

## Rules

- Fix nothing in this step; findings go to `review.md`, fixes happen in `/work`.
- Never create the PR without an explicit yes in this session.
