# Frem 31 Studio

Sanity Studio for project `auquaqxb`.

## Migrating the legacy pages

`/frembanen` and `/banekalender` used to be hand-written routes in the web. `scripts/migrateLegacyPages.ts` creates them as `page` documents (`page-frembanen`, `page-banekalender`) and sets the site-settings header, footer and Facebook link to what those routes showed.

On a new dataset, run from `studio/`, in this order:

1. `pnpm seed:front-page` (the pages hang off the front page; the script stops if there is none)
2. `pnpm migrate:legacy-pages`

Both use the dataset in `sanity.cli.ts` (`test`). `sanity exec` has no dataset flag, so both scripts read `DATASET` instead:

```bash
DATASET=production pnpm seed:front-page
DATASET=production pnpm migrate:legacy-pages
```

Re-running never overwrites the two pages, but it does reset the header, footer columns and Facebook link in site settings. If another page already sits at `/frembanen` or `/banekalender`, the script reports it and writes nothing.

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
