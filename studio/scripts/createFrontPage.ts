import {getCliClient} from 'sanity/cli'

/**
 * Seeds the front page — the single root of the page tree (the only `page` with
 * no `path.parent`). Everything else hangs off it, and the content tree pane
 * pins it at the top, so a dataset needs one before it is useful.
 *
 * Run with the CLI, which supplies project/dataset from sanity.cli.ts:
 *
 *   pnpm exec sanity exec scripts/createFrontPage.ts --with-user-token
 *
 * Override the defaults with env vars:
 *
 *   FRONT_PAGE_TITLE='Forsiden' FRONT_PAGE_SLUG=forsiden \
 *     pnpm exec sanity exec scripts/createFrontPage.ts --with-user-token
 *
 * Safe to re-run: it bails out if a root page already exists, and creates the
 * document with `createIfNotExists` on a fixed id.
 */

const FRONT_PAGE_ID = 'frontPage'

const title = process.env.FRONT_PAGE_TITLE || 'Front page'
const slug = process.env.FRONT_PAGE_SLUG || 'home'

async function main() {
  const client = getCliClient()
  const {projectId, dataset} = client.config()

  // Any page without a parent is a root. There should only ever be one, so an
  // existing one means this script has already run (or a root was made by hand).
  const existingRoots = await client.fetch<{_id: string; title?: string}[]>(
    `*[_type == "page" && !defined(path.parent)]{_id, title}`,
  )

  if (existingRoots.length > 0) {
    const listed = existingRoots.map((p) => `${p.title ?? '(untitled)'} (${p._id})`).join(', ')
    console.log(`Front page already exists in ${projectId}/${dataset}: ${listed}`)
    console.log('Nothing to do. Delete it first if you want to re-seed.')
    return
  }

  const created = await client.createIfNotExists({
    _id: FRONT_PAGE_ID,
    _type: 'page',
    title,
    path: {
      slug: {_type: 'slug', current: slug},
      // No `parent` — that is what makes this the root of the tree.
      //
      // `fullPath` is normally written by the compute-full-path Function, but
      // that only runs once the blueprint is deployed. Seeding '/' here means
      // the page shows a correct path immediately; the Function will compute
      // the same value and skip the write.
      fullPath: '/',
    },
  })

  console.log(`Created front page "${title}" as ${created._id} in ${projectId}/${dataset}`)
}

main().catch((err) => {
  console.error('Failed to create the front page:', err instanceof Error ? err.message : err)
  process.exit(1)
})
