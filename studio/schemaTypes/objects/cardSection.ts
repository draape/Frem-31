import {defineType, defineField, defineArrayMember} from 'sanity'
import {CardSectionIcon} from './icons'

type Cards = unknown[]

export const cardSection = defineType({
  name: 'cardSection',
  title: 'Cards',
  type: 'object',
  icon: CardSectionIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional heading shown above the cards.',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [defineArrayMember({type: 'card'})],
      validation: (rule) => rule.min(2).error('Add at least two cards'),
    }),
  ],
  preview: {
    select: {title: 'title', cards: 'cards'},
    prepare({title, cards}) {
      const count = ((cards as Cards) || []).length
      return {title: title || 'Cards', subtitle: `${count} card${count === 1 ? '' : 's'}`}
    },
  },
})
