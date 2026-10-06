---
description: Review the draft PR against the plan, post findings on the PR, hand over to HITL
argument-hint: <issue number>
---
You are running the **local-review** step of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup
- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Being invoked by the human is the approval of the previous gate. Log it as such and proceed; do not look for a separate approval record.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md`, `triage.md`, `notes.md` (if present), the latest `log.md` entries, and `.factory/rubric.md` if it exists.
- `pr.id` in `task.md` is the PR under review. `git fetch origin && git diff origin/main...HEAD` is the diff.

## Do
1. Review the diff against the acceptance criteria in `triage.md`, the plan, and the decisions in `notes.md`. Look for: criteria not met, behaviour outside the plan, missing error handling, schema changes without migration, anything that would break the other app, secrets, lockfile or `.env` files committed by mistake, and anything on the PR's HITL checklist that the code cannot actually deliver.
2. Write `review.md` with:
   - **Findings**: grouped as *blocking*, *should fix*, *nit*; each with file and line
   - **Verdict**: `ready-for-hitl` or `send-back`
3. Post the findings to the PR as a single review comment: `gh pr review <pr.id> --comment --body-file <tmp>` (use `--request-changes` when the verdict is `send-back`). Keep the comment to the findings and the verdict; the full `review.md` stays in the task folder.
4. Prepend a `## <date> · local-review · claude-code` entry to `log.md`.
5. If `send-back`: set `task.md` to `state: working` with the blocking findings summarised in the log entry, and stop. The human re-runs `/work`.
6. If `ready-for-hitl`: read `preview.urlPattern` from `.factory/config.yml`, substitute the PR number, and check the deploy status with `gh pr checks <pr.id>`. Set `task.md` to `state: hitl-test`, log it, and finish by printing the preview URL and the HITL checklist, with one line saying the gate is cleared by marking the PR ready for review.

## Rules
- Fix nothing in this step; findings go to the PR and `review.md`, fixes happen in `/work`.
- Never mark the PR ready and never merge. Those are the human's actions.
