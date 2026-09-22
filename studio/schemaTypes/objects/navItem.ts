import {defineType, defineField} from 'sanity'
import {linkableTypes} from './linkableTypes'

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Links to',
      type: 'reference',
      to: linkableTypes,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'reference.title'},
    prepare({title, subtitle}) {
      return {title: title || '(no label)', subtitle: subtitle || 'Navigation item'}
    },
  },
})
