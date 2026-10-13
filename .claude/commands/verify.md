---
description: Verify the mechanical items of the PR's HITL checklist with Playwright, tick them in the PR description, hand over to HITL
argument-hint: <issue number>
---

You are running the **self-test** step of the factory pipeline for task `gh-$ARGUMENTS`: check what a machine can check on the HITL checklist, so the human only does what needs a human. You verify; you fix nothing.

## Setup
- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `task.md`, `plan.md` (its Test strategy) and `review.md`.
- Verify you are in the task's worktree (`git rev-parse --abbrev-ref HEAD` starts with `feature/gh-$ARGUMENTS-`).
- Get the PR: `gh pr view --json number,url,body`. The checklist is the task-list items under `## HITL checklist` in the body.

## Do
1. **Sort the checklist.** For each item decide:
   - **auto**: observable in a browser or HTTP response without changing anything: a page renders (status, no error overlay, no console errors), text or a heading is present, a link or redirect goes to the right place, a 404 for an unknown path, metadata (`<title>`, description), the layout doesn't break at mobile width, an element is visible or hidden.
   - **human**: needs judgement (looks right, reads well, matches the design), or needs changing content or data (editing in the Studio, publishing, waiting for revalidation after an edit), or a deploy, or anything you can't observe from the outside. When in doubt, it's human.
2. **Pick the target.** If the PR's deploy preview is ready (`gh pr checks <number>`; the preview URL is `preview.urlPattern` from `.factory/config.yml` with the PR number), use it. Otherwise build and run locally on port `4100 + (issue number mod 100)` (inside the factory's port range, and the same task always gets the same port): `pnpm build` in `web/`, and let Playwright's `webServer` start `pnpm start --port <port>`. Items only the preview can show (it has the real content) are human if you're on local.
3. **Write throwaway tests** in `web/playwright/.cache/factory-verify/` (gitignored; never commit them): a `verify.config.ts` (`testDir: '.'`, one project, Desktop Chrome, `baseURL` the target, `outputDir` inside that folder, `reporter: 'list'`, a `webServer` only for local) and one `verify.spec.ts` with one `test()` per auto item, named after it. Check what the item says, no more. Add a mobile-width variant only when the item mentions layout or mobile.
4. **Run** `pnpm exec playwright test --config playwright/.cache/factory-verify/verify.config.ts` in `web/`. If the target can't be reached or the build fails, mark every auto item as not verified, with the reason.
5. **Update the PR description** (`gh pr edit <number> --body-file <tmp>`): change only the checklist lines.
   - passed: `- [x] <item> — ✓ factory: <how, a few words>`
   - failed: `- [ ] <item> — ⚠ factory: <what was wrong, a few words>`
   - human: leave the line exactly as it was.
   On a re-run, replace earlier `— ✓ factory:` / `— ⚠ factory:` notes rather than adding more.
6. Write `verify.md` in the task folder: the target, then one line per item: `auto ✓`, `auto ⚠ <what failed, with the error>`, or `human`. Prepend `## <date> · self-test · claude-code` to `log.md`: target, how many verified, failed and left for the human.
7. Set `task.md` to `state: hitl-test` (`stateEnteredAt`, `updatedAt`), whatever the result: a failed check is for the human to see, not for you to fix. Leave `web/playwright/.cache/factory-verify/` in place (gitignored; the next run overwrites it).

## Rules
- Read-only: no code changes, no commits, no content or data changes, never write to any Sanity dataset, no posts other than the description edit.
- Don't add comments to the PR; the ticks in the description are the report.
- Stop any server you started.
