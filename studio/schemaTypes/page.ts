import {defineType, defineField} from 'sanity'

/**
 * The `page` document type.
 *
 * Pages form a parent/child tree via `path.parent`. The front page is the only
 * page with an empty `parent` reference. `path.fullPath` is derived by walking
 * the parent chain and concatenating slugs — it is computed by the
 * `compute-full-path` Sanity Function (see /functions), not edited by hand, so
 * it stays correct whenever a page or any of its ancestors changes.
 */

type PageDoc = {
  description?: string
  image?: unknown
  seo?: {description?: string; image?: unknown}
}

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      group: 'content',
      of: [
        {type: 'textBlock'},
        {type: 'imageSection'},
        {type: 'split'},
        {type: 'cardSection'},
      ],
      options: {
        insertMenu: {
          showIcons: true,
          // Grid first so the custom block icons appear as thumbnails; list
          // stays available as a compact fallback.
          views: [{name: 'grid'}, {name: 'list'}],
        },
      },
    }),
    defineField({
      name: 'path',
      title: 'Path',
      type: 'object',
      group: 'content',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {source: 'title', maxLength: 96},
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'parent',
          title: 'Parent page',
          type: 'reference',
          to: [{type: 'page'}],
          description: 'Leave empty for the front page. Every other page must point to its parent.',
        }),
        defineField({
          name: 'fullPath',
          title: 'Full path',
          type: 'string',
          readOnly: true,
          description:
            'Computed automatically from the parent chain by the compute-full-path function. Do not edit.',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
      validation: (rule) =>
        rule
          .custom((value, context) => {
            const doc = context.document as PageDoc | undefined
            const seoValue = value as PageDoc['seo']
            const warnings: {message: string; path: string[]}[] = []
            if (!seoValue?.description && !doc?.description) {
              warnings.push({
                message:
                  'No meta description here or on the page — it will fall back to the site-wide default. A unique description per page is better for SEO.',
                path: ['description'],
              })
            }
            if (!seoValue?.image && !doc?.image) {
              warnings.push({
                message:
                  'No social share image here or on the page — it will fall back to the site-wide default.',
                path: ['image'],
              })
            }
            return warnings.length > 0 ? warnings : true
          })
          .warning(),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'path.fullPath', media: 'image'},
  },
})
