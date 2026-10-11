---
description: Answer review findings on a task's PR in one go, e.g. /findings 2 fix R1 R3 later R2 skip R4 R5
argument-hint: <issue number> (fix|later|skip) R<n>... ["note"] ...
---
You are answering **review findings** for task `gh-<issue>` on its PR. This only posts replies; it changes no code and no task state.

## Parse `$ARGUMENTS`
- The first token is the issue number (a `gh-` prefix is stripped).
- Then a sequence of words: `fix`, `later` or `skip` sets the answer for the ids that follow it; each `R<n>` gets the current answer. A quoted string (`"not for this release"`) is a note for the ids in the group just before it.
- Example: `/findings 2 fix R1 R3 later R2 "not for this release" skip R4 R5` → R1 fix, R3 fix, R2 later with the note, R4 skip, R5 skip.
- If an `R<n>` comes before any answer word, or the arguments don't parse, stop and say what's wrong. Post nothing.

## Do
1. Task folder = `~/.factory/projects/frem-31/tasks/gh-<issue>/`; the PR number is `pr.id` in `task.md`. No PR: stop and say so.
2. List the findings on the PR: `gh api repos/{owner}/{repo}/pulls/<number>/comments --paginate` and `gh api repos/{owner}/{repo}/issues/<number>/comments --paginate`. A finding is a comment whose first line is `R<n> · <severity> · suggest: <disposition>`; an inline one has a thread (its comment id), a top-level one doesn't.
3. For each answered id, post exactly one reply, `<answer>` or `<answer> — <note>`:
   - inline finding: `gh api -X POST repos/{owner}/{repo}/pulls/<number>/comments/<comment id>/replies -f body="<answer> — <note>"`;
   - top-level finding: `gh pr comment <number> --body "R<n> <answer> — <note>"`.
   An id that isn't on the PR: report it, post nothing for it.
4. Prepend `## <date> · <current state> · claude-code` to `log.md`, starting "Answered findings:" and listing the answers posted.
5. Print a table: id, severity, suggestion, your answer, note. End with: *`/work` applies these on its next run.*

## Rules
- Post only answers. No code changes, no commits, no state changes, no resolving threads.
