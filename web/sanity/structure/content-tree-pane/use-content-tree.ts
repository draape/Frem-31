import {useCallback, useEffect, useState} from 'react'
import {useSanityClient} from '../../utils/useSanityClient'

type HierarchicalDocument = {
  _id: string
  _originalId: string
  imageUrl?: string
  parentRef: string | null
  title: string
  subtitle?: string
  slug?: string
}

// Generic hierarchy query. `subtitle`, `slug`, and `parentRef` are projected
// from a `page`-shaped document (parent + slug live under `path`). To reuse this
// pane for another hierarchical type that stores them elsewhere, adjust those
// three projections — the `select()` already falls back to a top-level `parent`.
const HIERARCHICAL_DOCUMENT_QUERY = `
*[_type == $type] {
  _id,
  _originalId,
  title,
  "subtitle": path.fullPath,
  "slug": path.slug.current,
  "parentRef": select(
    defined(path.parent) => path.parent._ref,
    defined(parent) => parent._ref
  ),
  "imageUrl": image.asset->url + "?w=80&h=80&fit=crop",
}
`

export type TreeNode = Omit<
  HierarchicalDocument,
  '_id' | '_originalId' | 'parentRef'
> & {
  _id: string
  hasPublished: boolean
  hasDraft: boolean
  children: TreeNode[]
}

function stripDraftsPrefix(id: string | null): string | null {
  if (id == null) return null
  return id.replace(/^drafts\./, '')
}

function isDraftId(id: string): boolean {
  return id.startsWith('drafts.')
}

function buildDocumentTree(documents: HierarchicalDocument[]): TreeNode[] {
  const nodeMap = new Map<string, TreeNode>()

  // 1. Create one node per published-id, merging draft and published rows.
  //    The 'raw' perspective returns both `X` and `drafts.X` when both exist;
  //    we collapse them so each document occupies a single row in the tree.
  for (const doc of documents) {
    const publishedId = stripDraftsPrefix(doc._id)!
    const fromDraft = isDraftId(doc._id)
    const existing = nodeMap.get(publishedId)

    if (!existing) {
      nodeMap.set(publishedId, {
        _id: publishedId,
        title: doc.title ?? 'untitled',
        subtitle: doc.subtitle,
        slug: doc.slug,
        imageUrl: doc.imageUrl,
        hasPublished: !fromDraft,
        hasDraft: fromDraft,
        children: [],
      })
    } else {
      // Prefer draft values for what's displayed so in-progress edits show.
      if (fromDraft) {
        existing.title = doc.title ?? existing.title
        existing.subtitle = doc.subtitle ?? existing.subtitle
        existing.slug = doc.slug ?? existing.slug
        existing.imageUrl = doc.imageUrl ?? existing.imageUrl
        existing.hasDraft = true
      } else {
        existing.hasPublished = true
      }
    }
  }

  // 2. Wire up parent-child relationships. Drafts can point at either the
  //    published id or `drafts.<id>` — normalize both to the published id.
  const roots: TreeNode[] = []
  const seenAsChild = new Set<string>()

  for (const doc of documents) {
    const publishedId = stripDraftsPrefix(doc._id)!
    const node = nodeMap.get(publishedId)!
    const normalizedParentRef = stripDraftsPrefix(doc.parentRef)

    if (normalizedParentRef == null) {
      if (!seenAsChild.has(publishedId) && !roots.includes(node)) {
        roots.push(node)
      }
      continue
    }

    const parent = nodeMap.get(normalizedParentRef)
    if (parent && parent !== node) {
      if (!parent.children.includes(node)) {
        parent.children.push(node)
        seenAsChild.add(publishedId)
      }
    } else if (!seenAsChild.has(publishedId) && !roots.includes(node)) {
      // Orphan node, treat as root
      roots.push(node)
    }
  }

  // 3. Sort children alphabetically by title.
  const sortChildren = (nodes: TreeNode[]) => {
    nodes.sort((a, b) => a.title.localeCompare(b.title))
    for (const node of nodes) {
      sortChildren(node.children)
    }
  }
  sortChildren(roots)

  return roots
}

export function useContentTree(type: string) {
  const client = useSanityClient('raw')
  const [documents, setDocuments] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // `silent` refreshes update the tree in place without flashing the spinner —
  // used for realtime updates so editing a title doesn't reload the whole pane.
  const fetchDocuments = useCallback(
    async (silent = false) => {
      try {
        if (!silent) setLoading(true)
        setError(null)

        const results = await client.fetch<HierarchicalDocument[]>(HIERARCHICAL_DOCUMENT_QUERY, {
          type,
        })

        const documentTree = buildDocumentTree(results)

        setDocuments(documentTree)
      } catch (err) {
        console.error('Error fetching content tree:', err)
        setError(err instanceof Error ? err : new Error('Failed to fetch documents'))
      } finally {
        if (!silent) setLoading(false)
      }
    },
    [client, type],
  )

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  useEffect(() => {
    // Debounce realtime refreshes so a burst of mutations (e.g. typing a
    // title) collapses into a single silent refetch instead of one per change.
    let debounce: ReturnType<typeof setTimeout> | undefined

    const subscription = client
      .listen(`*[_type == $type]`, {type}, {includeResult: false})
      .subscribe({
        next: () => {
          if (debounce) clearTimeout(debounce)
          debounce = setTimeout(() => fetchDocuments(true), 400)
        },
        error: (err) => {
          console.error('Subscription error:', err)
        },
      })

    return () => {
      if (debounce) clearTimeout(debounce)
      subscription.unsubscribe()
    }
  }, [client, type, fetchDocuments])

  return {documents, loading, error, refetch: fetchDocuments}
}
