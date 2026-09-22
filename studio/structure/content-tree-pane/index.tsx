import type {ComponentType} from 'react'
import {StructureBuilder} from 'sanity/structure'
import {ContentTreePane} from './content-tree-pane'

export type ContentTreePaneOptions = {
  type: string
  // When set, an "add child" button is shown on each row, creating a new child
  // document from this initial-value template. Omit for trees whose documents
  // are managed programmatically.
  addChildTemplate?: string
  // When true, rows can be dragged onto another row to reparent the document
  // (changing path.parent). Enable only for trees whose hierarchy is
  // editor-managed via path.parent (e.g. pages) — not for synced trees.
  draggable?: boolean
}

/**
 * A structure list item that renders documents of `type` as a hierarchical tree
 * pane (search, draft/publish status, collapse, optional drag-to-reparent).
 *
 *   contentTreePane(S, 'page', 'Pages', BiGlobe, {draggable: true})
 */
export const contentTreePane = (
  S: StructureBuilder,
  type: string,
  title: string,
  icon: ComponentType,
  opts: {addChildTemplate?: string; draggable?: boolean} = {},
) => {
  const {addChildTemplate, draggable = false} = opts
  return S.listItem()
    .id(`${type}-tree`)
    .title(title)
    .icon(icon)
    .child(
      S.component(ContentTreePane)
        .id(`${type}-tree-pane`)
        .title(title)
        .options({type, addChildTemplate, draggable})
        .canHandleIntent((intentName, params) => intentName === 'create' && params.type === type)
        .child((pageId: string) => S.document().schemaType(type).documentId(pageId)),
    )
}
