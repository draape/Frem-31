import {defineType, defineField} from 'sanity'
import {linkableTypes} from './linkableTypes'
import {CardIcon} from './icons'

export const card = defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
  icon: CardIcon,
  fields: [
    defineField({
      name: 'reference',
      title: 'Links to',
      type: 'reference',
      to: linkableTypes,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'reference.title', media: 'reference.image'},
    prepare({title, media}) {
      return {title: title || '(missing reference)', subtitle: 'Card', media}
    },
  },
})
