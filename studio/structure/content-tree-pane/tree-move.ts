import type {SanityClient} from 'sanity'
import {parentReference} from '../../utils/parentReference'
import type {TreeNode} from './use-content-tree'

// Flatten the in-memory tree into an id -> node lookup so the drop checks stay
// synchronous (no extra fetches while dragging).
export function indexTree(
  nodes: TreeNode[],
  map = new Map<string, TreeNode>(),
): Map<string, TreeNode> {
  for (const n of nodes) {
    map.set(n._id, n)
    indexTree(n.children, map)
  }
  return map
}

// Every descendant id of `node`, excluding the node itself. Used to forbid
// dropping a node into its own subtree (which would orphan the branch / cycle).
export function descendantIds(node: TreeNode, acc = new Set<string>()): Set<string> {
  for (const c of node.children) {
    acc.add(c._id)
    descendantIds(c, acc)
  }
  return acc
}

export type DropCheck = {ok: true} | {ok: false; reason: string}

// Single source of truth for "may `draggedId` be dropped onto `targetId`?".
// Used both to drive the drop-target highlight while dragging and as the hard
// guard before committing the move, so an invalid target can never be applied.
// `rootIds` is the set of parent-less nodes; the front page is a root and has no
// parent reference to change, so it cannot be moved.
export function canDrop(
  draggedId: string,
  targetId: string,
  index: Map<string, TreeNode>,
  rootIds: Set<string>,
): DropCheck {
  const dragged = index.get(draggedId)
  if (!dragged) return {ok: false, reason: 'Unknown page'}

  // A root node (the front page) has no parent to change.
  if (rootIds.has(draggedId)) return {ok: false, reason: 'The front page cannot be moved'}

  if (targetId === draggedId) return {ok: false, reason: 'Cannot drop a page onto itself'}

  if (descendantIds(dragged).has(targetId)) {
    return {ok: false, reason: 'Cannot move a page into its own subtree'}
  }

  const target = index.get(targetId)

  // No-op: already a direct child of the target.
  if (target?.children.some((c) => c._id === draggedId)) {
    return {ok: false, reason: 'Page is already here'}
  }

  // The slug must stay unique among the new siblings. The schema validator is
  // the backstop; this just blocks the obvious collision up front with a clear
  // message instead of a silent invalid document.
  const slug = dragged.slug
  const newSiblings = target?.children ?? []
  if (slug && newSiblings.some((s) => s._id !== draggedId && s.slug === slug)) {
    return {ok: false, reason: `Another page here already uses the slug "${slug}"`}
  }

  return {ok: true}
}

// Apply the reparent. The move is written straight to the document(s); the
// compute-full-path Sanity Function (page-hierarchy feature) recomputes
// path.fullPath for the moved page and every descendant. We patch whichever
// versions exist so publishing an in-progress draft later can't revert the move.
// `targetId` is the published (base) id. The drop target may itself be an
// unpublished page, so the reference is built by `parentReference` rather than
// inline — a strong reference to a draft-only target is rejected by the API.
export async function executeMove(
  dragged: TreeNode,
  targetId: string,
  client: SanityClient,
  type = 'page',
): Promise<void> {
  const parent = await parentReference(client, targetId, type)
  const tx = client.transaction()
  if (dragged.hasPublished) {
    tx.patch(dragged._id, (p) => p.set({'path.parent': parent}))
  }
  if (dragged.hasDraft) {
    tx.patch(`drafts.${dragged._id}`, (p) => p.set({'path.parent': parent}))
  }
  await tx.commit()
}
