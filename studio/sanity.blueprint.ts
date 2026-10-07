import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    /**
     * Recomputes `path.fullPath` on `page` documents whenever a published page
     * is created or updated (drafts are excluded, `includeDrafts` is off). That
     * covers publishing and drag-to-reparent, which patches the published
     * document directly. The handler refetches the whole page tree and patches
     * every page whose computed path drifted, so moving or renaming an ancestor
     * fixes all descendants too.
     *
     * Updates only fire when the slug or parent changed. The function's own
     * writes touch nothing but `path.fullPath`, so they don't trigger it again.
     *
     * Scoped to every dataset in the project (`auquaqxb.*`). The handler's
     * client is bound to whichever dataset fired the event, so a new dataset
     * with pages (e.g. `production`) is covered automatically, with no extra
     * deploy.
     */
    defineDocumentFunction({
      name: 'compute-full-path',
      event: {
        on: ['create', 'update'],
        filter:
          '_type == "page" && (delta::operation() == "create" || delta::changedAny(path.slug.current) || delta::changedAny(path.parent._ref))',
        projection: '{_id}',
        resource: {
          type: 'dataset',
          id: 'auquaqxb.*',
        },
      },
    }),
  ],
})
