import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Site-wide settings. This is a singleton — exactly one document of this type
 * exists, edited from a fixed item in the structure (see `structure.ts`). The
 * create/delete/duplicate actions are removed for it in `sanity.config.ts`.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'navigation', title: 'Navigation', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'header',
      title: 'Header navigation',
      type: 'array',
      group: 'navigation',
      description: 'The main menu links shown in the site header.',
      of: [defineArrayMember({type: 'navItem'})],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'navigation',
      options: {collapsible: true, collapsed: false},
      fields: [
        defineField({
          name: 'columns',
          title: 'Columns',
          type: 'array',
          description: 'Each column has a title and its own list of links.',
          of: [defineArrayMember({type: 'footerColumn'})],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seoDefaults',
      group: 'seo',
      description:
        'Site-wide fallbacks. A page’s own title/description/image are used first; these apply when a page has none.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site settings'}
    },
  },
})
