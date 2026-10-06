---
description: Implement a planned task in its worktree, run checks, open a draft PR
argument-hint: <issue number>
---
You are running the **working** and **self-test** steps of the factory pipeline for task `gh-$ARGUMENTS`, ending by opening a draft pull request.

## Setup
- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Being invoked by the human is the approval of the previous gate. Log it as such and proceed; do not look for a separate approval record.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md`, `notes.md` (if present) and the newest entries in `log.md` — a "sent back" entry there carries the human's or reviewer's notes and takes priority. Decisions in `notes.md` override alternatives in `plan.md`.
- Verify you are in the task's worktree: `git rev-parse --abbrev-ref HEAD` must start with `feature/gh-$ARGUMENTS-`. If not, stop and say so; do not work in the main checkout.
- If `origin/main` has moved since the branch was created, rebase onto it first (`git fetch origin && git rebase origin/main`) and reinstall if the lockfile changed.

## Do
1. Implement `plan.md`, change by change. Commit small, with the repo's commit style. No attribution footers.
2. For each app the change touches, run its `checks` from `.factory/config.yml` in that app's directory. Fix failures and re-run, at most `budgets.maxRetries` rounds. If still failing, go to step 6 with `state: blocked`.
3. Push with `git push -u origin <branch>` — always `-u`, the cleanup tooling depends on it.
4. Open a **draft** PR if the task has none yet (`pr:` in `task.md` is empty): `gh pr create --draft --base main --title "<key>: <title>" --body-file <tmp>`. The body has three sections: *What* (from the plan's Approach, short), *HITL checklist* (the "By hand in HITL" list from `plan.md`, as task-list checkboxes), *Notes for reviewers* (anything from `log.md` or `notes.md` a reviewer must know, e.g. environment variables the deployment needs), and ends with `Closes #$ARGUMENTS`. If a PR already exists, the push updated it; leave it as is.
5. Prepend a `## <date> · working · claude-code` entry to `log.md`: what was done, what the checks said, PR number and URL. One more line for each self-test round.
6. Update `task.md` frontmatter: `state: local-review` (or `blocked` with a `blockedReason`), `branch`, `worktree`, `pr: {connection: github-frem-31, id, url}`, `stateEnteredAt`, `updatedAt`.

## Rules
- Stay inside `plan.md` as decided in `notes.md`. If the plan turns out wrong, write why in `log.md` and stop with `state: blocked` rather than improvising a different design.
- Never write to a production Sanity dataset.
- The PR stays a draft. Marking it ready is the human's action after testing the preview.
- Log before you stop, whatever the outcome.
