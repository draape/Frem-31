import {Box, Card, Flex, TextInput, Text, Spinner, useToast} from '@sanity/ui'
import {SearchIcon} from '@sanity/icons/Search'
import {DocumentIcon} from '@sanity/icons/Document'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import {useRouter} from 'sanity/router'
import {TreeNode, useContentTree} from './use-content-tree'
import {useCallback, useMemo, useState} from 'react'
import {AncestorThread, ContentTreeExpander, ContentTreeNode} from './content-tree-node'
import {canDrop, executeMove, indexTree} from './tree-move'
import {useSanityClient} from '../../utils/useSanityClient'
import {ContentTreePaneOptions} from '.'
import './content-tree-pane.css'

// Drag-and-drop state shared with renderNode so each row knows whether it is the
// active source / a valid drop target. `rootIds` marks the parent-less nodes
// (front page) so they render as non-draggable.
type DndState = {
  enabled: boolean
  activeId: string | null
  overId: string | null
  dropValid: boolean
  rootIds: Set<string>
}

type ContentTreePaneProps = {
  options?: Record<string, unknown>
  childItemId?: string
}

export function ContentTreePane({options, childItemId}: ContentTreePaneProps) {
  const {type, addChildTemplate, draggable} = options as ContentTreePaneOptions
  const {documents, loading, error, refetch} = useContentTree(type)
  const {navigateIntent} = useRouter()
  const client = useSanityClient('published')
  const toast = useToast()
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [activeId, setActiveId] = useState<string | null>(null)
  const [overId, setOverId] = useState<string | null>(null)

  // A small drag (< 8px) is treated as a click so the row's ChildLink still
  // navigates; only a real drag starts a move. This is what lets the whole row
  // be the drag affordance without a dedicated handle.
  const sensors = useSensors(useSensor(PointerSensor, {activationConstraint: {distance: 8}}))

  // id -> node lookup used by the drop checks; rebuilt only when the tree changes.
  const nodeIndex = useMemo(() => indexTree(documents), [documents])

  // The parent-less nodes. In the standard single-site model this is just the
  // front page; it is a drop target but never a drag source.
  const rootIds = useMemo(() => new Set(documents.map((d) => d._id)), [documents])

  const dropValid =
    activeId !== null && overId !== null ? canDrop(activeId, overId, nodeIndex, rootIds).ok : false

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id))
  }, [])

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setOverId(event.over ? String(event.over.id) : null)
  }, [])

  // Escape (or any cancelled drag) fires onDragCancel, not onDragEnd — reset the
  // drag state here too, otherwise the source stays dimmed and the last hovered
  // row keeps its drop-target highlight.
  const handleDragCancel = useCallback(() => {
    setActiveId(null)
    setOverId(null)
    // The pointer-down focused the row's link; pressing Escape flips the browser
    // into keyboard focus-visible mode, so that link now paints a focus ring
    // that lingers after the cancel. Drop the focus to clear it.
    const active = document.activeElement
    if (active instanceof HTMLElement && active.closest('.content-tree-pane')) {
      active.blur()
    }
  }, [])

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const draggedId = String(event.active.id)
      const targetId = event.over ? String(event.over.id) : null
      setActiveId(null)
      setOverId(null)
      if (!targetId) return

      // Re-run the same check that gated the highlight, now as a hard guard.
      const check = canDrop(draggedId, targetId, nodeIndex, rootIds)
      if (!check.ok) {
        toast.push({
          status: 'warning',
          title: 'Move not allowed',
          description: check.reason,
        })
        return
      }

      const dragged = nodeIndex.get(draggedId)
      if (!dragged) return

      try {
        await executeMove(dragged, targetId, client, type)
        toast.push({status: 'success', title: 'Moved'})
        // Silent refetch: update the tree in place. A non-silent refetch would
        // flip `loading` on and swap the whole tree for the spinner, unmounting
        // the scroll container and making the view jump. The realtime listener
        // would also catch this; this just makes it immediate.
        refetch(true)
      } catch (err) {
        console.error('Failed to move:', err)
        toast.push({
          status: 'error',
          title: 'Move failed',
          description: err instanceof Error ? err.message : 'Unknown error',
        })
      }
    },
    [nodeIndex, rootIds, client, toast, refetch, type],
  )

  const toggleCollapse = useCallback((id: string) => {
    setCollapsedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }, [])

  // Create a child via the initial-value template and open it in the editor
  // pane. The pane's `canHandleIntent` routes the create intent through its
  // `.child()` resolver, so the new draft opens just like a clicked row.
  const handleAddChild = useCallback(
    (parentBaseId: string) => {
      if (!addChildTemplate) return
      navigateIntent('create', [{type, template: addChildTemplate}, {parent: parentBaseId}])
    },
    [navigateIntent, type, addChildTemplate],
  )

  const onAddChild = addChildTemplate ? handleAddChild : undefined

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const {filtered: filteredDocuments, matchingIds} = useMemo(
    () => filterTree(documents, searchQuery),
    [documents, searchQuery],
  )

  // A single root is the front page: pin it on top, separated by a divider,
  // and promote its children to the top level so everything else is one step
  // shallower.
  const frontPage = documents.length === 1 ? (filteredDocuments[0] ?? null) : null
  const topLevelNodes = frontPage ? frontPage.children : filteredDocuments

  const dnd: DndState = {
    enabled: !!draggable,
    activeId,
    overId,
    dropValid,
    rootIds,
  }

  // The node currently being dragged, rendered in the cursor-following overlay.
  const activeNode = activeId ? (nodeIndex.get(activeId) ?? null) : null

  if (error) {
    return (
      <Card padding={4} tone="critical">
        <Text>Error loading: {error.message}</Text>
      </Card>
    )
  }

  return (
    <Flex direction="column" height="fill" className="content-tree-pane">
      <Card paddingX={2}>
        <Flex gap={3} align="center">
          <Box flex={1}>
            <TextInput
              icon={SearchIcon}
              placeholder={`Search ${type}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              border={false}
              fontSize={1}
            />
          </Box>
        </Flex>
      </Card>
      {loading ? (
        <Flex flex={1} align="center" justify="center" padding={5}>
          <Spinner muted />
        </Flex>
      ) : (
        <DndOrFragment
          enabled={dnd.enabled}
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          overlay={activeNode ? <DragPreview node={activeNode} /> : null}
        >
          <Box flex={1} overflow="auto" padding={2}>
            {frontPage && (
              <>
                <ContentTreeNode
                  baseId={frontPage._id}
                  title={frontPage.title}
                  subtitle={frontPage.subtitle}
                  imageUrl={frontPage.imageUrl}
                  hasPublished={frontPage.hasPublished}
                  hasDraft={frontPage.hasDraft}
                  level={0}
                  isSelected={frontPage._id === childItemId}
                  hasChildren={false}
                  isSearchMatch={matchingIds.size ? matchingIds.has(frontPage._id) : undefined}
                  onToggle={toggleCollapse}
                  onAddChild={onAddChild}
                  dndEnabled={dnd.enabled}
                  draggable={false}
                  showDropIndicator={dnd.overId === frontPage._id && dnd.dropValid}
                />
                <div className="content-tree__divider" />
              </>
            )}
            {topLevelNodes.map((doc) =>
              renderNode(
                doc,
                0,
                [],
                collapsedIds,
                toggleCollapse,
                childItemId,
                matchingIds,
                onAddChild,
                dnd,
              ),
            )}
          </Box>
        </DndOrFragment>
      )}
    </Flex>
  )
}

// Wraps the tree in a DndContext only when drag-and-drop is enabled for this
// tree, so trees without it (e.g. categories) render exactly as before. The
// DragOverlay renders `overlay` at the cursor while dragging (null otherwise).
function DndOrFragment({
  enabled,
  sensors,
  onDragStart,
  onDragOver,
  onDragEnd,
  onDragCancel,
  overlay,
  children,
}: {
  enabled: boolean
  sensors: ReturnType<typeof useSensors>
  onDragStart: (event: DragStartEvent) => void
  onDragOver: (event: DragOverEvent) => void
  onDragEnd: (event: DragEndEvent) => void
  onDragCancel: () => void
  overlay: React.ReactNode
  children: React.ReactNode
}) {
  if (!enabled) return <>{children}</>
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      {children}
      <DragOverlay dropAnimation={null}>{overlay}</DragOverlay>
    </DndContext>
  )
}

// A compact, cursor-following preview of the dragged node so it is obvious what
// is being moved. Reuses the row's thumbnail styling for visual consistency.
function DragPreview({node}: {node: TreeNode}) {
  return (
    <Card
      className="content-tree__drag-preview"
      padding={2}
      radius={2}
      shadow={3}
      style={{display: 'inline-flex', cursor: 'grabbing', maxWidth: 280}}
    >
      <Flex gap={2} align="center" style={{minWidth: 0}}>
        {node.imageUrl ? (
          <img className="content-tree__thumbnail" src={node.imageUrl} alt="" />
        ) : (
          <div
            className="content-tree__thumbnail content-tree__thumbnail--fallback"
            aria-hidden="true"
          >
            <DocumentIcon />
          </div>
        )}
        <Text size={1} weight="medium" textOverflow="ellipsis">
          {node.title || '(Untitled)'}
        </Text>
      </Flex>
    </Card>
  )
}

function renderNode(
  node: TreeNode,
  level: number,
  ancestors: AncestorThread[],
  collapsedIds: Set<string>,
  toggleCollapse: (id: string) => void,
  selectedId?: string,
  matchingIds?: Set<string>,
  onAddChild?: (parentBaseId: string) => void,
  dnd?: DndState,
): React.ReactNode {
  const isCollapsed = collapsedIds.has(node._id)
  const hasChildren = node.children.length > 0
  const isSearchMatch = matchingIds?.size ? matchingIds.has(node._id) : undefined

  // A root node (the front page) is never a drag source, even if it ever appears
  // here as a non-pinned (orphan) node.
  const nodeDraggable = !!dnd?.enabled && !dnd.rootIds.has(node._id)

  return (
    <div key={node._id}>
      <ContentTreeNode
        baseId={node._id}
        title={node.title}
        subtitle={node.subtitle}
        imageUrl={node.imageUrl}
        hasPublished={node.hasPublished}
        hasDraft={node.hasDraft}
        level={level}
        ancestors={ancestors}
        isCollapsed={isCollapsed}
        isSelected={node._id === selectedId}
        hasChildren={hasChildren}
        isSearchMatch={isSearchMatch}
        onToggle={toggleCollapse}
        onAddChild={onAddChild}
        dndEnabled={!!dnd?.enabled}
        draggable={nodeDraggable}
        isDragging={dnd?.activeId === node._id}
        showDropIndicator={!!dnd?.enabled && dnd.overId === node._id && dnd.dropValid}
      />
      {hasChildren &&
        !isCollapsed &&
        node.children.map((child, i) =>
          // A child inherits the ancestor chain plus this node's thread, whose
          // line stays alive through the child only while a later sibling
          // follows.
          renderNode(
            child,
            level + 1,
            [...ancestors, {id: node._id, continues: i < node.children.length - 1}],
            collapsedIds,
            toggleCollapse,
            selectedId,
            matchingIds,
            onAddChild,
            dnd,
          ),
        )}
      {hasChildren && isCollapsed && (
        <ContentTreeExpander
          ownerId={node._id}
          count={node.children.length}
          level={level + 1}
          ancestors={[...ancestors, {id: node._id, continues: false}]}
          onToggle={toggleCollapse}
        />
      )}
    </div>
  )
}

function filterTree(
  nodes: TreeNode[],
  query: string,
): {filtered: TreeNode[]; matchingIds: Set<string>} {
  if (!query.trim()) {
    return {filtered: nodes, matchingIds: new Set()}
  }

  const lowerQuery = query.toLowerCase()
  const matchingIds = new Set<string>()

  function collectMatches(node: TreeNode): boolean {
    const titleMatches = node.title?.toLowerCase().includes(lowerQuery) ?? false

    const childMatchResults = node.children.map((child) => collectMatches(child))
    const childMatches = childMatchResults.some(Boolean)

    if (titleMatches) {
      matchingIds.add(node._id)
    }

    return titleMatches || childMatches
  }

  function filterNode(node: TreeNode): TreeNode | null {
    const titleMatches = node.title?.toLowerCase().includes(lowerQuery)
    const filteredChildren = node.children.map(filterNode).filter((n): n is TreeNode => n !== null)

    if (titleMatches || filteredChildren.length > 0) {
      return {...node, children: filteredChildren}
    }
    return null
  }

  nodes.forEach(collectMatches)

  const filtered = nodes.map(filterNode).filter((n): n is TreeNode => n !== null)

  return {filtered, matchingIds}
}
