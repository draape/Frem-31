import {defineType, defineField} from 'sanity'
import {linkableTypes} from './linkableTypes'
import {CardIcon} from './icons'

type CardParent = {reference?: unknown}

/**
 * A card shows its own title and description, falling back to the referenced
 * page's. With a reference it links to that page; without one it is plain.
 */
export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: CardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Leave empty to use the title of the linked page.',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as CardParent | undefined
          if (!value && !parent?.reference) return 'Add a title or choose a page'
          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Leave empty to use the description of the linked page.',
    }),
    defineField({
      name: 'reference',
      title: 'Links to',
      type: 'reference',
      to: linkableTypes,
    }),
  ],
  preview: {
    select: {title: 'title', pageTitle: 'reference.title', media: 'reference.image'},
    prepare({title, pageTitle, media}) {
      return {
        title: title || pageTitle || 'Untitled card',
        subtitle: pageTitle ? `Card → ${pageTitle}` : 'Card',
        media,
      }
    },
  },
})
