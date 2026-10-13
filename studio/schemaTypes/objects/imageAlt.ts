import {defineField} from 'sanity'

type ImageParent = {decorative?: boolean}

/**
 * Alt text sub-fields for content images. `alt` is required unless the editor
 * marks the image as decorative, in which case the web renders `alt=""`.
 */
export const imageAltFields = [
  defineField({
    name: 'alt',
    title: 'Alt text',
    type: 'string',
    description: 'Describe the image for people who cannot see it.',
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as ImageParent | undefined
        if (!value && !parent?.decorative) return 'Add alt text, or mark the image as decorative'
        return true
      }),
  }),
  defineField({
    name: 'decorative',
    title: 'Decorative',
    type: 'boolean',
    description: 'The image adds nothing to the content, so screen readers skip it.',
    initialValue: false,
  }),
]
