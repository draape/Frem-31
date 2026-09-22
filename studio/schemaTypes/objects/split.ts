import {defineType, defineField} from 'sanity'
import {SplitIcon} from './icons'

export const split = defineType({
  name: 'split',
  title: 'Split (50/50)',
  type: 'object',
  icon: SplitIcon,
  fields: [
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small label shown above the title.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Lead',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'imagePosition',
      title: 'Image position',
      type: 'string',
      options: {
        list: [
          {title: 'Left', value: 'left'},
          {title: 'Right', value: 'right'},
        ],
        layout: 'radio',
      },
      initialValue: 'left',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Call to action',
      type: 'link',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'kicker', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Split', subtitle: subtitle || 'Split (50/50)', media}
    },
  },
})
