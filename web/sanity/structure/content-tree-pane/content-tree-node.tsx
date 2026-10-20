import {Card, Flex, Text} from '@sanity/ui'
import {AddIcon} from '@sanity/icons/Add'
import {ChevronDownIcon} from '@sanity/icons/ChevronDown'
import {DocumentIcon} from '@sanity/icons/Document'
import {useDraggable, useDroppable} from '@dnd-kit/core'
import {useCallback} from 'react'
import {DocumentStateIndicator} from './document-state-indicator'
import {usePaneRouter} from 'sanity/structure'

const STATUS_WIDTH = 28
const THUMB_SIZE = 32
// One level of indent equals one thumbnail width.
const INDENT_PER_LEVEL = 32
const CONTENT_INSET = 8
// A node's vertical spine runs through the centre of its thumbnail (YouTube
// reply-thread style): centre = thumbnail left edge + half a thumbnail.
const SPINE_OFFSET = CONTENT_INSET + THUMB_SIZE / 2
// The elbow sweeps from the parent's spine to the child thumbnail's left edge.
const HOOK_WIDTH = INDENT_PER_LEVEL - THUMB_SIZE / 2
const CURVE_RADIUS = 14
// Transparent width that widens each 1px line's hit area; the visible stroke
// stays on the line's left edge.
const LINE_HIT_WIDTH = 14

export type AncestorThread = {
  // The ancestor whose children-thread runs through this column.
  id: string
  // True while that ancestor still has a later sibling — draw a full-height
  // line through this row rather than ending at the elbow.
  continues: boolean
}

// Hovering any segment of a thread highlights the whole thread. The segments
// live in different rows, so we toggle a class on every element tagged with the
// same owner id rather than relying on CSS :hover cascading.
function threadElements(target: Element): NodeListOf<Element> | [] {
  const thread = (target as HTMLElement).dataset.thread
  const root = target.closest('.content-tree-pane')
  if (!thread || !root) return []
  return root.querySelectorAll(`[data-thread="${CSS.escape(thread)}"]`)
}

function handleLineEnter(e: React.MouseEvent<HTMLElement>) {
  threadElements(e.currentTarget).forEach((el) => el.classList.add('is-thread-hover'))
}

function handleLineLeave(e: React.MouseEvent<HTMLElement>) {
  threadElements(e.currentTarget).forEach((el) => el.classList.remove('is-thread-hover'))
}

// Toggling re-renders the tree, which can unmount the very element being
// hovered before its mouseleave fires — leaving the highlight stuck on the
// segments that survive. Clear it across the pane just before the change.
function clearHighlights(target: Element) {
  target
    .closest('.content-tree-pane')
    ?.querySelectorAll('.is-thread-hover')
    .forEach((el) => el.classList.remove('is-thread-hover'))
}

// Shared mouse interactions for any element that belongs to a thread: hover
// highlights the whole thread, click toggles it (stopping the row's link from
// navigating).
function threadProps(owner: string, onToggle?: (id: string) => void) {
  return {
    'data-thread': owner,
    onMouseEnter: handleLineEnter,
    onMouseLeave: handleLineLeave,
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      clearHighlights(e.currentTarget)
      onToggle?.(owner)
    },
  }
}

// The connectors that join a row to its ancestors: straight lines for every
// ancestor whose thread is still alive, plus the elbow (and its continuation)
// for the immediate parent. Reused by both real rows and the expander.
function TreeLines({
  ancestors,
  level,
  onToggle,
}: {
  ancestors: AncestorThread[]
  level: number
  onToggle?: (id: string) => void
}) {
  const parent = ancestors[level - 1]

  return (
    <>
      {ancestors.slice(0, level - 1).map((anc, i) =>
        anc.continues ? (
          <span
            key={`anc-${i}`}
            {...threadProps(anc.id, onToggle)}
            aria-hidden="true"
            className="content-tree__line content-tree__line--vertical"
            style={{
              left: `${i * INDENT_PER_LEVEL + SPINE_OFFSET}px`,
              width: `${LINE_HIT_WIDTH}px`,
              top: 0,
              bottom: 0,
            }}
          />
        ) : null,
      )}
      {parent && (
        <span
          {...threadProps(parent.id, onToggle)}
          aria-hidden="true"
          className="content-tree__line content-tree__hook"
          style={{
            left: `${(level - 1) * INDENT_PER_LEVEL + SPINE_OFFSET}px`,
            width: `${HOOK_WIDTH}px`,
            borderBottomLeftRadius: `${CURVE_RADIUS}px`,
          }}
        />
      )}
      {parent?.continues && (
        <span
          {...threadProps(parent.id, onToggle)}
          aria-hidden="true"
          className="content-tree__line content-tree__line--vertical"
          style={{
            left: `${(level - 1) * INDENT_PER_LEVEL + SPINE_OFFSET}px`,
            width: `${LINE_HIT_WIDTH}px`,
            top: `calc(50% - ${CURVE_RADIUS}px)`,
            bottom: 0,
          }}
        />
      )}
    </>
  )
}

type ContentTreeNodeProps = {
  baseId: string
  title: string
  subtitle?: string
  imageUrl?: string
  hasPublished: boolean
  hasDraft: boolean
  level?: number
  ancestors?: AncestorThread[]
  isCollapsed?: boolean
  isSelected: boolean
  hasChildren: boolean
  isSearchMatch?: boolean
  onToggle?: (id: string) => void
  onAddChild?: (parentBaseId: string) => void
  // Drag-and-drop state, threaded from the pane. `dndEnabled` turns the feature
  // on for this tree; `draggable` is false for the front page (a drop target
  // but not a source).
  dndEnabled?: boolean
  draggable?: boolean
  isDragging?: boolean
  showDropIndicator?: boolean
}

export function ContentTreeNode({
  baseId,
  title,
  subtitle,
  imageUrl,
  hasPublished,
  hasDraft,
  level = 0,
  ancestors = [],
  isCollapsed = false,
  isSelected,
  hasChildren,
  isSearchMatch,
  onToggle,
  onAddChild,
  dndEnabled = false,
  draggable = false,
  isDragging = false,
  showDropIndicator = false,
}: ContentTreeNodeProps) {
  const {ChildLink} = usePaneRouter()

  // The whole row is the drag affordance (no separate handle). The hooks are
  // always called to respect the rules of hooks; `disabled` neutralizes them for
  // trees without drag-and-drop (e.g. categories) and for the non-draggable
  // front page row, which still acts as a drop target. The PointerSensor's
  // distance constraint (in the pane) lets a plain click still navigate.
  const draggableState = useDraggable({id: baseId, disabled: !dndEnabled || !draggable})
  const droppableState = useDroppable({id: baseId, disabled: !dndEnabled})

  const setRowRef = useCallback(
    (el: HTMLElement | null) => {
      draggableState.setNodeRef(el)
      droppableState.setNodeRef(el)
    },
    // dnd-kit's setNodeRef callbacks are stable; depending on the whole state
    // objects would re-create this ref every render and churn the node ref.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [draggableState.setNodeRef, droppableState.setNodeRef],
  )

  const cardTone = showDropIndicator ? 'positive' : isSelected ? 'primary' : 'default'

  return (
    <ChildLink childId={baseId}>
      <Card
        ref={setRowRef}
        /* Only the pointer listeners — not dnd-kit's `attributes` — so we don't
           put role="button"/tabIndex on the Card, which already sits inside the
           focusable ChildLink anchor. */
        {...(draggable ? draggableState.listeners : undefined)}
        className="content-tree__row"
        padding={2}
        radius={2}
        tone={cardTone}
        selected={isSelected}
        style={{
          paddingLeft: `${level * INDENT_PER_LEVEL + CONTENT_INSET}px`,
          position: 'relative',
          cursor: draggable ? 'grab' : undefined,
          opacity: isDragging ? 0.4 : undefined,
        }}
      >
        <TreeLines ancestors={ancestors} level={level} onToggle={onToggle} />

        {/* This node's own descending thread doubles as the keyboard-focusable
            expand/collapse control. */}
        {hasChildren && (
          <span
            {...threadProps(baseId, onToggle)}
            role="button"
            tabIndex={0}
            aria-label={isCollapsed ? 'Expand' : 'Collapse'}
            aria-expanded={!isCollapsed}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation()
                e.preventDefault()
                clearHighlights(e.currentTarget)
                onToggle?.(baseId)
              }
            }}
            className="content-tree__line content-tree__line--toggle"
            style={{
              left: `${level * INDENT_PER_LEVEL + SPINE_OFFSET}px`,
              width: `${LINE_HIT_WIDTH}px`,
            }}
          />
        )}

        <Flex gap={2} align="center" paddingY={2}>
          <Thumbnail imageUrl={imageUrl} />
          <Flex
            direction="column"
            flex={1}
            gap={2}
            style={{minWidth: 0, opacity: isSearchMatch === false ? 0.5 : 1}}
          >
            <Text size={1} weight="medium" textOverflow="ellipsis">
              {title || '(Untitled)'}
            </Text>
            {subtitle && (
              <Text size={1} muted textOverflow="ellipsis">
                {subtitle}
              </Text>
            )}
          </Flex>
          <Flex align="center" gap={1} style={{flexShrink: 0}}>
            {onAddChild && (
              <button
                type="button"
                className="content-tree__add-button"
                aria-label="Add child"
                title="Add child"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  onAddChild(baseId)
                }}
              >
                <AddIcon />
              </button>
            )}
            <Flex style={{width: STATUS_WIDTH}} justify="center" align="center">
              <DocumentStateIndicator hasPublished={hasPublished} hasDraft={hasDraft} />
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </ChildLink>
  )
}

// Shown in place of a collapsed node's children: a compact "N ⌄" pill sitting
// where the first child would be, joined to the parent by the same elbow.
// Clicking it (or the thread line) expands the node.
export function ContentTreeExpander({
  ownerId,
  count,
  level,
  ancestors,
  onToggle,
}: {
  ownerId: string
  count: number
  level: number
  ancestors: AncestorThread[]
  onToggle?: (id: string) => void
}) {
  return (
    <div
      className="content-tree__expander"
      style={{
        paddingLeft: `${level * INDENT_PER_LEVEL + CONTENT_INSET}px`,
        position: 'relative',
      }}
    >
      <TreeLines ancestors={ancestors} level={level} onToggle={onToggle} />
      <Flex align="center" paddingY={1}>
        <button
          type="button"
          {...threadProps(ownerId, onToggle)}
          className="content-tree__expander-pill"
          aria-label={`Expand ${count} item${count === 1 ? '' : 's'}`}
        >
          <span className="content-tree__expander-count">{count}</span>
          <ChevronDownIcon />
        </button>
      </Flex>
    </div>
  )
}

function Thumbnail({imageUrl}: {imageUrl?: string}) {
  if (imageUrl) {
    return <img className="content-tree__thumbnail" src={imageUrl} alt="" />
  }

  return (
    <div className="content-tree__thumbnail content-tree__thumbnail--fallback" aria-hidden="true">
      <DocumentIcon />
    </div>
  )
}
