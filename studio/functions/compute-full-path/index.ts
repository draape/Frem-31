import {documentEventHandler} from '@sanity/functions'
import {createClient, type SanityClient} from '@sanity/client'
import {computePathUpdates, type PageRow} from './fullPath.ts'

export const handler = documentEventHandler(async ({context}) => {
  const client: SanityClient = createClient({
    ...context.clientOptions,
    apiVersion: '2025-05-08',
    useCdn: false,
  })

  // Refetch the whole (published) page tree. Recomputing everything is the
  // simplest way to guarantee correctness when an ancestor's slug or parent
  // changes — descendants are healed in the same pass.
  const pages = await client.fetch<PageRow[]>(
    `*[_type == "page" && !(_id in path("drafts.**"))]{
      _id,
      "slug": path.slug.current,
      "parent": path.parent._ref,
      "fullPath": path.fullPath
    }`,
  )

  const updates = computePathUpdates(pages)

  if (updates.length === 0) {
    console.log(`fullPath already correct for all ${pages.length} page(s) — nothing to do`)
    return
  }

  const tx = updates.reduce(
    (t, {_id, fullPath}) => t.patch(_id, (patch) => patch.set({'path.fullPath': fullPath})),
    client.transaction(),
  )

  // dryRun during `functions test` / `dev` (context.local) so local runs never
  // mutate the dataset. Only writing when something drifted also keeps the
  // function from re-triggering itself in a loop.
  await tx.commit({dryRun: context.local, visibility: 'async'})
  console.log(
    `Updated fullPath on ${updates.length} of ${pages.length} page(s)${context.local ? ' (dry run)' : ''}: ` +
      updates.map((u) => `${u._id} -> ${u.fullPath}`).join(', '),
  )
})
