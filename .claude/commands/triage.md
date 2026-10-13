---
description: Gate a GitHub issue — can it become one good PR as written? Writes a short triage.md
argument-hint: <issue number>
---

You are running the **triage** step of the factory pipeline for issue #$ARGUMENTS. Triage is a **gate**, not a plan. It answers one question: *can this issue become one good PR as written?* The plan comes later and is where approach, files and risks go. Keep `triage.md` to one screen.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- KEY = `gh-$ARGUMENTS`. Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Create it if missing.
- Fetch the issue: `gh issue view $ARGUMENTS --json number,title,body,labels,url`.
- If `task.md` does not exist, create it with this frontmatter and the issue body under `## From backlog`:
  `key, project: frem-31, title, state: triage, stateEnteredAt, createdAt, updatedAt, backlog: {connection: github-frem-31, id, url}, branch: null, worktree: null, size: null`.
  If it exists, refresh `title` and the `## From backlog` body from the issue (a split may have narrowed it).
- If the task folder already existed, this is a re-triage: read `notes.md` (if present), the current `triage.md` and the newest `log.md` entries. Answers under `## Decisions` in `notes.md` (`- Q<n> (<question>): …`, from the board or by hand) answer the previous questions; fold them in and don't ask an answered question again. `- SPLIT: keep as one task` means don't propose a split again.

## Do

1. Read the issue, then just enough of `web/` and/or `studio/` to run the four checks. Don't design the solution.
2. Run the **four checks**:
   - **Acceptance criteria**: are there testable criteria that say when it's done? Weak, missing or untestable criteria fail.
   - **Size**: does it fit one reviewable PR (a few days' work, one coherent change)? If not, propose a split.
   - **Code vs. issue**: does the code contradict what the issue assumes (a component that doesn't exist, a field with another shape, behaviour that's already there)? Name `file:line`.
   - **Feasibility**: can it be done under current constraints (APIs and versions in use, permissions, services, cost)? Name the constraint.
3. Write `triage.md` in exactly this shape, short:
   ```
   # Triage · gh-<n> · <title>

   ## Verdict

   **<ready | needs-info | split | infeasible>** — <one sentence why>

   ## Checks

   - ✓ Acceptance criteria: <one line>
   - ⚠ Size: <one line>
   - ✓ Code vs. issue: <one line, with file:line when it fails>
   - ✓ Feasibility: <one line>

   ## Acceptance criteria

   1. <testable statement>   (restated or proposed; at most ~8)

   ## Questions

   1. **Q1 · <short title>.** <the question>
      - **Proposed default:** <what you'd do without an answer>

   ## Proposed split

   ### S1 · <title> (keep)
   <two or three lines: scope, and the acceptance criteria it takes>

   ### S2 · <title>
   <two or three lines>
   ```
   - Use `✓` for a pass and `⚠` for a failing check; every `⚠` needs a question, a proposed split, or (for feasibility) the reason it's `infeasible`.
   - **Questions** only when needs-info, at most five, numbered `Q1`, `Q2`, … (keep the ids of still-open questions on a re-triage). Omit the section otherwise.
   - **Proposed split** only when the verdict is `split`: two to four stories, each a PR on its own. Mark exactly one `(keep)`: the most relevant part, which the original issue will be narrowed to. Omit the section otherwise.
   - Nothing else: no approach, no list of files, no risk essay. Those are the plan's.
   - Verdict: `ready` when all four pass; `split` when size fails (and the rest can wait for the stories' own triage); `infeasible` when feasibility fails; otherwise `needs-info`.
4. Prepend an entry to `log.md`: `## <YYYY-MM-DD HH:MM> · triage · claude-code` followed by one or two lines: the verdict and the failing checks.
5. Update `task.md` frontmatter: `state: triage-approval`, `size` (S, M or L), `planGate` (`true` when the work will have effects outside the repo — deploys, billable resources, writes to a dataset — or touches data irreversibly; else `false`), `stateEnteredAt`, `updatedAt`. `/plan` reads `planGate`.

## Rules

- Change no code.
- Post nothing to GitHub; the human decides what goes back to the reporter.
- If something is missing, say exactly what, as a question. Never "needs clarification".
