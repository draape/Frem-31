import {defineType, defineField} from 'sanity'
import {linkableTypes} from './linkableTypes'

type LinkParent = {type?: string}

/**
 * The common link definition. Use this everywhere a link is needed — as a CTA
 * field on a component, or as a rich-text annotation. Supports:
 *
 * - `internal` — a reference to a linkable document (see `linkableTypes`)
 * - `external` — an http(s) URL
 * - `email`    — a mailto address
 *
 * The destination fields are shown/validated based on the selected `type`.
 */
export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'type',
      title: 'Link type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal page', value: 'internal'},
          {title: 'External URL', value: 'external'},
          {title: 'Email', value: 'email'},
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description:
        'Button or link text. In rich text you can leave this empty to use the selected text.',
    }),
    defineField({
      name: 'internal',
      title: 'Page',
      type: 'reference',
      to: linkableTypes,
      hidden: ({parent}) => (parent as LinkParent)?.type !== 'internal',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as LinkParent | undefined
          if (parent?.type === 'internal' && !value) return 'Select a page to link to'
          return true
        }),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => (parent as LinkParent)?.type !== 'external',
      validation: (rule) =>
        rule
          .uri({scheme: ['http', 'https']})
          .custom((value, context) => {
            const parent = context.parent as LinkParent | undefined
            if (parent?.type === 'external' && !value) return 'Enter a URL'
            return true
          }),
    }),
    defineField({
      name: 'email',
      title: 'Email address',
      type: 'string',
      hidden: ({parent}) => (parent as LinkParent)?.type !== 'email',
      validation: (rule) =>
        rule.email().custom((value, context) => {
          const parent = context.parent as LinkParent | undefined
          if (parent?.type === 'email' && !value) return 'Enter an email address'
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => (parent as LinkParent)?.type === 'email',
    }),
  ],
  preview: {
    select: {label: 'label', type: 'type', internalTitle: 'internal.title', href: 'href', email: 'email'},
    prepare({label, type, internalTitle, href, email}) {
      const destination =
        type === 'internal' ? internalTitle || 'Page' : type === 'email' ? email : href
      return {title: label || destination || 'Link', subtitle: destination}
    },
  },
})
