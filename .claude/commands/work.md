---
description: Implement the plan, or apply review findings and PR feedback, in the task worktree; run checks, push (opens a draft PR on first run)
argument-hint: <issue number>
---
You are running the **working** and **self-test** steps of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup
- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Being invoked by the human is the approval of the previous gate. Log it as such and proceed; do not look for a separate approval record.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md`, `notes.md` (if present) and the newest entries in `log.md`. Decisions in `notes.md` override alternatives in `plan.md`.
- **Blocked on a decision?** If `task.md` has `state: blocked` and `plan.md` has an open `### D<n>` decision (one not mentioned under `## Decisions` in `notes.md`), stop: log that the decision is still open. If `notes.md` now answers it, this run continues: remove the label with `gh pr edit <number> --remove-label factory:blocked` (also `factory:needs-decision`, if present from older runs) and act on the answer.
- Verify you are in the task's worktree: `git rev-parse --abbrev-ref HEAD` must start with `feature/gh-$ARGUMENTS-`. If not, stop and say so.
- **Bring the branch up to date with `origin/main` by merging** (never rebase: the branch is pushed and may have an open PR). The board may have started the merge already: if `git status` shows a merge in progress, continue it; otherwise, if `origin/main` isn't in `HEAD`, `git fetch origin && git merge origin/main`. Resolve each conflict keeping the intent of both sides: this branch's change and what landed on main (typically both new entries in a shared list or registry; keep both, in a sensible order). Reinstall if a lockfile changed, run the checks, and commit the merge (`git commit --no-edit`). Name the resolved files in your PR comment. If a conflict can't be resolved without guessing what either side meant, `git merge --abort` and stop blocked with a decision (see Rules).
- **Find the PR and its feedback.** Run `gh pr view --json number,url,isDraft,reviewDecision,reviews,comments`. If a PR exists, also fetch inline review comments: `gh api repos/{owner}/{repo}/pulls/<number>/comments`. Human feedback newer than the last commit on this branch and newer than your own last marked post (`<!-- factory -->`), and any review with `CHANGES_REQUESTED`, is the work to do now and takes priority over `plan.md`. Treat it as a reviewer's instructions: address each point, or explain in your reply why not. Review findings follow their own rules, below.
- **Review findings and their answers.** Also read the PR's top-level comments: `gh api repos/{owner}/{repo}/issues/<number>/comments --paginate`. A **finding** is a comment (inline or top-level) whose first line is `R<n> · <severity> · suggest: <fix|later|skip>`. Its **answer** is the newest of: a reply in the finding's thread whose first word is `fix`, `later` or `skip`; or any PR comment starting `R<n>` followed by one of those words. Text after the word (after `—`, `-` or `:`) is the note. **No answer means no change**: the reviewer's `suggest:` is advice to the human, never an instruction to you. Leave unanswered findings alone and post nothing on them, whatever their severity or suggestion. A finding is **done** when a result of yours is newer than its latest answer: a thread reply starting `Done in`, `Filed as` or `Noted, not changing`, or a top-level comment starting `R<n> · ` followed by one of those. Act only on findings that have an answer and aren't done.

## Do
1. **First run (no PR):** implement `plan.md`, change by change. **Later runs (PR with feedback):** address the feedback; do not re-implement what is already there. Commit small, with the repo's commit style. No attribution footers.
   For each **answered** finding that isn't done, by its answer (unanswered findings: nothing):
   - `fix`: make the change; one commit per finding where practical, mentioning `R<n>` in the message.
   - `later`: file it after the push (step 4). Don't change code for it.
   - `skip`: nothing to change.
2. For each app the change touches, run its `checks` from `.factory/config.yml` in that app's directory. Fix failures and re-run, at most `budgets.maxRetries` rounds. If still failing, go to step 6 with `state: blocked` and add the label `factory:blocked` to the PR if one exists.
3. Push with `git push -u origin <branch>` — always `-u`.
4. **No PR yet:** open a draft: `gh pr create --draft --base main --title "<key>: <title>" --body-file <tmp>` with the description below.
   **PR exists:** first bring the description up to date if anything in it is now wrong (`gh pr edit <number> --body-file <tmp>`); don't mention that you did. Then post one short comment: one line per point addressed, one line per point not addressed and why. Do not resolve review threads and do not change draft/ready status; both belong to the reviewer.
   **The PR description** is short. The code shows what changed; don't recount it file by file.
   - *What*: two to four sentences: the behaviour this PR adds or changes, and why. No list of files or commits.
   - *HITL checklist*: the "By hand in HITL" list from `plan.md` as task-list checkboxes, kept true to the current code.
   - *Notes for reviewers*: only what a reviewer can't see in the diff (a manual step, a decision taken, a known limitation), one line each. Omit the section if there's nothing.
   - End with `Closes #$ARGUMENTS`.
   Keep it current: whenever a run changes behaviour, a checklist item or a note, edit the description in the same run.
   **Then answer every finding you acted on**, on its thread: an inline finding by `gh api -X POST repos/{owner}/{repo}/pulls/<number>/comments/<comment id>/replies -f body=…`, a top-level one by `gh pr comment <number> --body …` starting `R<n> · `:
   - `fix` → `Done in <short sha>.` (and a line on what changed if it isn't obvious).
   - `later` → first make sure the label exists (`gh label create from-review --color C5DEF5 --description "Follow-up split out of a PR review" 2>/dev/null || true`), then `gh issue create --title "<short title>" --label from-review --body-file <tmp>` with the finding's text, its severity, and links to the finding's comment and the PR. No `ready` label: it enters the backlog un-triaged. Reply `Filed as #<issue>.`
   - `skip` → `Noted, not changing.` followed by the note, if one was given.
   In the summary comment, one line per finding: id, answer, result. If a **blocking** finding was answered `later` or `skip`, put that first, in bold, with the note: a skipped blocking finding is either a wrong review or a real risk, and a human should look at it.
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
  Then write why in `log.md`, label the PR `factory:blocked` (the only PR label the factory uses), and stop with `state: blocked` and a `blockedReason` naming the decision (e.g. "Decision D2 in plan.md: accept echo invocations or fix the handler").
- Never write to a production Sanity dataset.
- Never mark the PR ready, never merge, never resolve threads (that's for the human or a reviewer).
- **Mark everything you post on GitHub.** End every comment, reply and review body you post with a line `<!-- factory -->` (invisible on GitHub). It tells the factory's posts from human feedback: `factory-sync` moves a task back to working when a PR has unmarked comments newer than the last commit and the last marked post.
- Log before you stop, whatever the outcome.
