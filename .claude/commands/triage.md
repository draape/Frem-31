---
description: Triage a GitHub issue for readiness and write triage.md
argument-hint: <issue number>
---

You are running the **triage** step of the factory pipeline for issue #$ARGUMENTS.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- KEY = `gh-$ARGUMENTS`. Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Create it if missing.
- Fetch the issue: `gh issue view $ARGUMENTS --json number,title,body,labels,url`.
- If `task.md` does not exist, create it with this frontmatter and the issue body under `## From backlog`:
  `key, project: frem-31, title, state: triage, stateEnteredAt, createdAt, updatedAt, backlog: {connection: github-frem-31, id, url}, branch: null, worktree: null, size: null`.

## Do

1. Read the issue, then the parts of `web/` and/or `studio/` it touches, enough to judge whether it can be built as written.
2. Write `triage.md` with these sections, in this order:
   - **Verdict**: `ready` or `needs-info`
   - **Acceptance criteria**: restated as testable statements
   - **Questions for the reporter**: only when needs-info; concrete, answerable questions
   - **Risks and areas touched**: which app, schema or data changes, anything irreversible
   - **Size**: S, M or L, one line of reasoning
   - **Recommended gates**: whether plan approval is worth it for this task
3. Prepend an entry to `log.md`: `## <YYYY-MM-DD HH:MM> · triage · claude-code` followed by two or three lines.
4. Update `task.md` frontmatter: `state: triage-approval`, `size`, `stateEnteredAt`, `updatedAt`.

## Rules

- Change no code.
- Post nothing to GitHub; the human decides what goes back to the reporter.
- If something is missing, say exactly what, as questions. Never "needs clarification".
