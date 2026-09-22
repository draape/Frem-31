import type {ComponentType} from 'react'
import type {ListItemBuilder, StructureBuilder, StructureResolver} from 'sanity/structure'
import {BiCog, BiErrorCircle, BiGlobe} from 'react-icons/bi'
import {contentTreePane} from './structure/content-tree-pane'

/**
 * Singleton document types — edited as one fixed document each, never listed or
 * created/deleted as a collection. `sanity.config.ts` reads `singletonTypes` to
 * strip its create/delete/duplicate actions.
 */
type Singleton = {type: string; title: string; icon: ComponentType}

const singletons: Singleton[] = [{type: 'siteSettings', title: 'Site settings', icon: BiCog}]

export const singletonTypes = new Set(singletons.map((s) => s.type))

/**
 * Document types rendered by a custom item in the "primary" group below and so
 * excluded from the default "rest" list, to avoid listing them twice.
 */
const customTypeIds = new Set<string>(['page'])

/**
 * Join non-empty groups with a divider between each. Empty groups are dropped
 * first, so adding/removing features never leaves a leading or doubled divider.
 */
function withDividers(
  S: StructureBuilder,
  groups: ListItemBuilder[][],
): Array<ListItemBuilder | ReturnType<StructureBuilder['divider']>> {
  const nonEmpty = groups.filter((g) => g.length > 0)
  return nonEmpty.flatMap((g, i) => (i < nonEmpty.length - 1 ? [...g, S.divider()] : g))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items(
      withDividers(S, [
        // 1. Primary content.
        [contentTreePane(S, 'page', 'Pages', BiGlobe, {draggable: true})],
        // 2. The rest of the document types (default list), minus singletons and
        //    any type handled by a custom item above.
        S.documentTypeListItems().filter((item) => {
          const id = item.getId() as string
          return !singletonTypes.has(id) && !customTypeIds.has(id)
        }),
        // 3. Singletons (site settings, etc.).
        singletons.map(({type, title, icon}) =>
          S.listItem()
            .id(type)
            .title(title)
            .icon(icon)
            .child(S.document().schemaType(type).documentId(type)),
        ),
        // 4. Danger zone / orphanage: EVERY document type with its default edit
        //    pane — nothing filtered out. An escape hatch for fixing a document
        //    when the custom structure above hides or breaks it.
        [
          S.listItem()
            .id('danger-zone')
            .title('Danger zone')
            .icon(BiErrorCircle)
            .child(S.list().title('All document types').items(S.documentTypeListItems())),
        ],
      ]),
    )
