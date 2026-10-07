# Frem 31 Studio

Sanity Studio for project `auquaqxb`.

## Functions

### `compute-full-path`

Recomputes `path.fullPath` on `page` documents. It fires when a published page is created, or updated with a changed slug or parent (drafts are excluded), which covers publishing and drag-to-reparent in the content tree. Each run refetches the whole page tree and patches every page whose path drifted, so renaming or moving a page also fixes its descendants. Its own writes only change `path.fullPath`, so they don't trigger it again; edits to other fields (title, content) don't trigger it either.

Path convention:

- front page: `/`
- child of the front page: `/<slug>`
- deeper: `/<parent>/<slug>`

The function is defined in `sanity.blueprint.ts` and is scoped to **every dataset in the project** (`auquaqxb.*`). Each run reads and writes only the dataset that fired the event. That means any new dataset with `page` documents (e.g. `production`, or a copy of `test`) is covered automatically, with no extra deploy, and the first page created, renamed or moved in it backfills `fullPath` for every published page in it.

The stack (`frem-31`) is recorded in `.sanity/blueprint.config.json`, which is committed.

Commands (run from `studio/`):

- Deploy: `pnpm dlx sanity@latest blueprints deploy`
- Logs: `pnpm exec sanity functions logs compute-full-path`
- Local dry-run (no writes, the handler checks `context.local`): `pnpm exec sanity functions test compute-full-path`
- Undo (removes the deployed function): `pnpm dlx sanity@latest blueprints destroy`
