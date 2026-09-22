import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
  resources: [
    /**
     * Recomputes `path.fullPath` on `page` documents whenever a page is created
     * or published. The handler refetches the whole page tree and patches every
     * page whose computed path drifted, so moving or renaming an ancestor fixes
     * all descendants too.
     */
    defineDocumentFunction({
      name: 'compute-full-path',
      event: {
        on: ['create', 'update'],
        filter: '_type == "page"',
        projection: '{_id}',
        resource: {
          type: 'dataset',
          id: 'auquaqxb.test',
        },
      },
    }),
  ],
})
