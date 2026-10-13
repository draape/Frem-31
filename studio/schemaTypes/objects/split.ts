import {defineType, defineField} from 'sanity'
import {SplitIcon} from './icons'
import {imageAltFields} from './imageAlt'

type LinkValue = {label?: string; internal?: unknown; href?: string; email?: string}

// `link` has initial values, so a CTA object can exist without the editor
// having chosen a destination. Only a destination makes it a real CTA.
const hasDestination = (link: LinkValue) => Boolean(link.internal || link.href || link.email)

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
      fields: imageAltFields,
      validation: (rule) => rule.required(),
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
      validation: (rule) =>
        rule.custom((value) => {
          const link = value as LinkValue | undefined
          return link && hasDestination(link) && !link.label ? 'Add a button label' : true
        }),
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'kicker', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || 'Split', subtitle: subtitle || 'Split (50/50)', media}
    },
  },
})
