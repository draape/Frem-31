---
description: Review the draft PR against the plan, post one thread per finding, hand over to HITL
argument-hint: <issue number>
---
You are running the **local-review** step of the factory pipeline for task `gh-$ARGUMENTS`.

## Setup
- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Being invoked by the human is the approval of the previous gate. Log it as such and proceed; do not look for a separate approval record.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md`, `triage.md`, `notes.md` (if present), the latest `log.md` entries, and `.factory/rubric.md` if it exists.
- Find the PR from the branch: `gh pr view --json number,url,isDraft`. `git fetch origin && git diff origin/main...HEAD` is the diff.
- Read the findings already on the PR, so you neither repeat one nor reuse an id: `gh api repos/{owner}/{repo}/pulls/<number>/comments --paginate` and `gh api repos/{owner}/{repo}/issues/<number>/comments --paginate`. A finding is a comment whose first line is `R<n> · <severity> · suggest: <disposition>`.

## Do
1. Review the diff against the acceptance criteria in `triage.md`, the plan, and the decisions in `notes.md`. Look for: criteria not met, behaviour outside the plan, missing error handling, schema changes without migration, anything that would break the other app, secrets, lockfile or `.env` files committed by mistake, and anything on the PR's HITL checklist the code cannot actually deliver.
2. Give each new finding the next free id (`R1`, `R2`, … continuing after the highest id already on the PR), a severity — `blocking`, `should fix` or `nit` — and a suggested disposition:
   - `fix`: change it in this PR. The default for blocking findings and for most should-fix ones.
   - `later`: real, but outside this PR's scope; `/work` will file it as a new issue.
   - `skip`: not worth changing (a matter of taste, intentional, or covered elsewhere).
3. Write `review.md`: **Findings**, one per line in exactly the form posted on the PR (`R3 · should fix · suggest: fix — <one line> (<path>:<line>)`), then the **Verdict**: `ready-for-hitl` or `send-back` (send-back when any blocking finding is suggested `fix`).
4. Post the review as **one thread per finding**. The first line of every finding comment is exactly `R<n> · <severity> · suggest: <disposition>`, then a blank line, then the finding: what is wrong, why, and what to change.
   - **Line-anchored findings** (the line is part of the diff) go as inline comments in a single review: write `{"event": "COMMENT", "body": <summary>, "comments": [{"path": …, "line": …, "side": "RIGHT", "body": …}, …]}` to a temp file and run `gh api repos/{owner}/{repo}/pulls/<number>/reviews --input <file>`. A line outside the diff can't be anchored; make that finding general and name `path:line` in its text.
   - **General findings** go as one top-level comment each: `gh pr comment <number> --body-file <file>`.
   - The **summary** (the review's body; with no inline findings, post it as one more `gh pr comment`) is short: the verdict in one line, every finding as one line as in `review.md`, nothing else, and it ends with: *Answer each finding with `fix`, `later` or `skip`, optionally followed by a note (`later — not for this release`): reply on its thread, or for a finding without a thread comment `R4 later — note`. No answer means the suggestion is taken. `/work` applies the answers.*
   - Always `event: COMMENT`, never `REQUEST_CHANGES`: GitHub refuses it on your own PR. The verdict lives in the summary and in `task.md`.
   - No findings: post only the summary, saying so.
   - Keep findings short: what's wrong and what to change, in a few sentences. No restating the diff.
5. **The PR description is not a finding.** Never write a finding or comment suggesting a change to it. If it's wrong or stale (an outdated checklist item, a note the code no longer matches, a recount of the diff), fix it yourself in this run with `gh pr edit <number> --body-file <tmp>`, keeping it short (see `/work`), and say nothing about it. This is the one thing `/review` changes.
6. Prepend a `## <date> · local-review · claude-code` entry to `log.md`: the verdict and the finding ids with severity and suggestion.
7. If `send-back`: set `task.md` to `state: working` and stop; `/work` applies the findings.
8. If `ready-for-hitl`: set `task.md` to `state: hitl-test`, read `preview.urlPattern` from `.factory/config.yml`, substitute the PR number, check deploy status with `gh pr checks <number>`, and finish by printing the preview URL and the HITL checklist with this line: *Pass: mark the PR ready for review. Fail: leave a review with "Request changes" and your notes; `/work` picks them up. Findings answered `fix` or `later` are applied by the next `/work`.*

## Rules
- Fix nothing here except the PR description; findings go to the PR and `review.md`, fixes happen in `/work`.
- Never mark the PR ready, never merge, never resolve threads.
- **Mark everything you post on GitHub.** End every comment, reply and review body you post with a line `<!-- factory -->` (invisible on GitHub). It tells the factory's posts from human feedback: `factory-sync` moves a task back to working when a PR has unmarked comments newer than the last commit and the last marked post.
