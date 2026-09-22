import type {InitialValueResolverContext, Template} from 'sanity'
import {parentReference} from '../utils/parentReference'
import {API_VERSION} from '../utils/useSanityClient'

/**
 * Initial-value templates.
 *
 * `page-child` backs the "add child" button on each row of the page tree. The
 * tree passes the clicked row's id as the `parent` parameter, so the new draft
 * opens already slotted into the right place in the hierarchy.
 *
 * Declaring `parameters` is load-bearing, not documentation: Sanity excludes
 * templates that take parameters from UIs which cannot supply them, so this one
 * stays out of the global "Create new" menu and only fires from the tree.
 */
export const pageChildTemplate: Template<{parent: string}> = {
  id: 'page-child',
  title: 'Child page',
  schemaType: 'page',
  parameters: [{name: 'parent', title: 'Parent page ID', type: 'string'}],
  // Async because the shape of the reference depends on whether the parent has
  // been published yet — see parentReference for why that matters.
  value: async ({parent}: {parent: string}, context: InitialValueResolverContext) => ({
    path: {
      parent: await parentReference(context.getClient({apiVersion: API_VERSION}), parent, 'page'),
    },
  }),
}

export const templates: Template[] = [pageChildTemplate]
