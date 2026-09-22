export type PageRow = {
  _id: string
  slug: string | null
  parent: string | null
  fullPath: string | null
}

/**
 * Build the fullPath for a single page by walking up its parent chain.
 *
 * - Front page (no parent) -> "/"
 * - Child of front page    -> "/" + slug             e.g. "/about"
 * - Deeper page            -> parentPath + "/" + slug e.g. "/about/team"
 *
 * `seen` guards against accidental reference cycles so a misconfigured tree
 * can never cause infinite recursion.
 */
export function computeFullPath(
  id: string,
  byId: Map<string, PageRow>,
  seen = new Set<string>(),
): string {
  const page = byId.get(id)
  if (!page || seen.has(id)) return '/'
  seen.add(id)

  if (!page.parent) return '/'

  const parentPath = computeFullPath(page.parent, byId, seen)
  const base = parentPath === '/' ? '' : parentPath
  const slug = page.slug ?? ''
  return `${base}/${slug}`
}

/**
 * Given the full set of pages, return the id/fullPath pairs whose stored
 * `fullPath` has drifted from what it should be. Returning only the diff keeps
 * the function from writing (and thus re-triggering itself) on no-op changes.
 */
export function computePathUpdates(pages: PageRow[]): {_id: string; fullPath: string}[] {
  const byId = new Map(pages.map((p) => [p._id, p]))
  const updates: {_id: string; fullPath: string}[] = []
  for (const p of pages) {
    const desired = computeFullPath(p._id, byId)
    if (desired !== p.fullPath) {
      updates.push({_id: p._id, fullPath: desired})
    }
  }
  return updates
}
