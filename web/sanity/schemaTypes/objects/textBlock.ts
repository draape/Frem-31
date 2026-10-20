import {defineType, defineField, defineArrayMember} from 'sanity'
import {TextBlockIcon} from './icons'

type Block = {_type?: string; children?: {text?: string}[]}

export const textBlock = defineType({
  name: 'textBlock',
  title: 'Text',
  type: 'object',
  icon: TextBlockIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Paragraph', value: 'normal'},
            {title: 'Title', value: 'title'},
            {title: 'Subtitle', value: 'subtitle'},
          ],
          lists: [
            {title: 'Bulleted', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Strikethrough', value: 'strike-through'},
              {title: 'Superscript', value: 'sup'},
              {title: 'Subscript', value: 'sub'},
            ],
            annotations: [{type: 'link'}],
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {content: 'content'},
    prepare({content}) {
      const block = ((content as Block[]) || []).find((b) => b._type === 'block')
      const text = block?.children?.map((c) => c.text).join('') || 'Empty text'
      return {title: text, subtitle: 'Text'}
    },
  },
})
