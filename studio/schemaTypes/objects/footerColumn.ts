import {defineType, defineField, defineArrayMember} from 'sanity'

type Links = unknown[]

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer column',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
    }),
  ],
  preview: {
    select: {title: 'title', links: 'links'},
    prepare({title, links}) {
      const count = ((links as Links) || []).length
      return {title: title || 'Footer column', subtitle: `${count} link${count === 1 ? '' : 's'}`}
    },
  },
})
