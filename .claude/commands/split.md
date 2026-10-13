---
description: Carry out the split triage proposed — narrow the issue to the kept story, create issues for the rest
argument-hint: <issue number>
---

You are carrying out the **split** that triage proposed for issue #$ARGUMENTS, after the human approved it. Invoking this command is the approval.

## Setup

- If `$ARGUMENTS` starts with `gh-`, strip that prefix; the issue number is what remains.
- Task folder = `~/.factory/projects/frem-31/tasks/gh-$ARGUMENTS/`. Read `triage.md` and `notes.md` (if present).
- Stop with a clear message if `triage.md` has no `## Proposed split`, or no story marked `(keep)`. Log why before stopping.
- Fetch the issue: `gh issue view $ARGUMENTS --json number,title,body,labels,url`.

## Do

1. **Create an issue for every story except the kept one**, in order: `gh issue create --title "<story title>" --label ready --body-file <tmp>`. The body: the part of the original issue's text that belongs to this story (keep the reporter's words where they apply), the story's acceptance criteria from `triage.md`, and a last line `Split from #$ARGUMENTS.` It gets `ready`, so the factory triages it like any other issue.
2. **Narrow the original issue to the kept story**: `gh issue edit $ARGUMENTS --title "<kept story title>" --body-file <tmp>`, with the part of the original text that belongs to the kept story and its acceptance criteria, then a section listing the new issues: `Split into: #<a> <title>, #<b> <title>.` Don't lose the reporter's context that still applies; drop what moved to the new issues.
3. Comment once on the original issue: `Split by the factory: this issue now covers <kept story>. The rest moved to #<a>, #<b>.` End the comment with a line `<!-- factory -->`.
4. In the task folder, add to `notes.md` under `## Decisions` (create it if needed): `- SPLIT: done — kept "<kept story>"; created #<a>, #<b>`. Prepend `## <date> · triage-approval · claude-code` to `log.md` with the same.
5. Leave `task.md` as it is; the board runs `/triage $ARGUMENTS` right after this, which re-triages the narrowed issue.

## Rules

- Change no code. Create and edit issues only as above; don't close anything, don't touch labels on the original.
