import type {SanityClient} from 'sanity'

export type ParentReference = {
  _type: 'reference'
  _ref: string
  _weak?: true
  _strengthenOnPublish?: {type: string}
}

/**
 * Build the `path.parent` reference pointing at `parentId`.
 *
 * A strong reference has to resolve to a document that exists. A page that has
 * never been published exists only as `drafts.<id>`, so a strong reference to
 * its base id is rejected outright:
 *
 *   Mutation failed: Document "drafts.<child>" references non-existent
 *   document "<parent>"
 *
 * That is why adding a child under an unpublished page used to silently throw
 * away every keystroke: the draft could never be written.
 *
 * Referencing `drafts.<id>` instead looks like the obvious fix and is worse —
 * it makes the parent impossible to publish, because publishing deletes the
 * draft and the reference blocks that:
 *
 *   Mutation failed: Document "drafts.<parent>" cannot be deleted as there are
 *   references to it from "drafts.<child>"
 *
 * So an unpublished parent gets a *weak* reference to its base id tagged with
 * `_strengthenOnPublish`, which is what the Studio's own reference input does
 * when you pick an unpublished document: the write is accepted now, the parent
 * stays publishable, and Sanity turns the reference strong once the child is
 * published. A published parent is referenced strongly as usual.
 */
export async function parentReference(
  client: SanityClient,
  parentId: string,
  type: string,
): Promise<ParentReference> {
  // Matching the base id explicitly keeps this correct under any perspective —
  // a draft is stored under `drafts.<id>` and can never match it.
  const baseId = parentId.replace(/^drafts\./, '')
  const publishedCount = await client.fetch<number>('count(*[_id == $baseId])', {baseId})

  if (publishedCount > 0) {
    return {_type: 'reference', _ref: baseId}
  }
  return {_type: 'reference', _ref: baseId, _weak: true, _strengthenOnPublish: {type}}
}
