---
description: Implement the plan or address PR feedback in the task worktree, run checks, push (opens a draft PR on first run)
argument-hint: <issue number>
---
You are running the **working** and **self-test** steps of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup
- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Being invoked by the human is the approval of the previous gate. Log it as such and proceed; do not look for a separate approval record.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md`, `notes.md` (if present) and the newest entries in `log.md`. Decisions in `notes.md` override alternatives in `plan.md`.
- **Blocked on a decision?** If `task.md` has `state: blocked` and `plan.md` has an open `### D<n>` decision (one not mentioned under `## Decisions` in `notes.md`), stop: log that the decision is still open. If `notes.md` now answers it, this run continues: remove the label with `gh pr edit <number> --remove-label factory:blocked` (also `factory:needs-decision`, if present from older runs) and act on the answer.
- Verify you are in the task's worktree: `git rev-parse --abbrev-ref HEAD` must start with `feature/gh-$ARGUMENTS-`. If not, stop and say so.
- If `origin/main` has moved, rebase onto it first (`git fetch origin && git rebase origin/main`) and reinstall if the lockfile changed.
- **Find the PR and its feedback.** Run `gh pr view --json number,url,isDraft,reviewDecision,reviews,comments`. If a PR exists, also fetch inline review comments: `gh api repos/{owner}/{repo}/pulls/<number>/comments`. Feedback newer than the last commit on this branch, and any review with `CHANGES_REQUESTED`, is the work to do now and takes priority over `plan.md`. Treat it as a reviewer's instructions: address each point, or explain in your reply why not.

## Do
1. **First run (no PR):** implement `plan.md`, change by change. **Later runs (PR with feedback):** address the feedback; do not re-implement what is already there. Commit small, with the repo's commit style. No attribution footers.
2. For each app the change touches, run its `checks` from `.factory/config.yml` in that app's directory. Fix failures and re-run, at most `budgets.maxRetries` rounds. If still failing, go to step 6 with `state: blocked` and add the label `factory:blocked` to the PR if one exists.
3. Push with `git push -u origin <branch>` — always `-u`.
4. **No PR yet:** open a draft: `gh pr create --draft --base main --title "<key>: <title>" --body-file <tmp>`. Body sections: *What* (short, from the plan's Approach), *HITL checklist* (the "By hand in HITL" list from `plan.md` as task-list checkboxes), *Notes for reviewers* (anything from `log.md`/`notes.md` a reviewer must know), ending with `Closes #$ARGUMENTS`.
   **PR exists:** post one comment summarising what was addressed, point by point, and what was not and why. Do not resolve review threads and do not change draft/ready status; both belong to the reviewer.
5. Prepend a `## <date> · working · claude-code` entry to `log.md`: what was done, what the checks said, PR number. One more line per self-test round.
6. Update `task.md` frontmatter: `state: local-review` (or `blocked` with `blockedReason`: one plain sentence saying what stopped and what the human must do), `branch`, `worktree`, `pr: {connection: github-frem-31, id, url}` on first creation, `stateEnteredAt`, `updatedAt`.

## Rules
- Stay inside `plan.md` as decided in `notes.md`, except where PR feedback says otherwise. If the plan turns out wrong or a choice outside it is needed, don't choose: append the decision to `plan.md` in the same form `/plan` uses, so the board can show it as a form:
  ```
  ## Decision needed (from /work, <date>)

  ### D<next number> · <the question, one line>

  <what you found, with evidence: log lines, numbers, file:line>

  - **A · <option>.** <what it means, cost, risk>
  - **B · <option>.** …

  **Recommendation: <letter>.** <one line why>  (omit if you have no basis to recommend)
  ```
  Then write why in `log.md`, label the PR `factory:blocked` (the only label the factory uses), and stop with `state: blocked` and a `blockedReason` naming the decision (e.g. "Decision D2 in plan.md: accept echo invocations or fix the handler").
- Never write to a production Sanity dataset.
- Never mark the PR ready, never merge, never resolve threads.
- Log before you stop, whatever the outcome.
