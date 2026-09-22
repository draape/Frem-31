import {defineType, defineField} from 'sanity'
import {ImageSectionIcon} from './icons'

export const imageSection = defineType({
  name: 'imageSection',
  title: 'Image',
  type: 'object',
  icon: ImageSectionIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {title: 'caption', media: 'image'},
    prepare({title, media}) {
      return {title: title || 'Image', subtitle: 'Image', media}
    },
  },
})
