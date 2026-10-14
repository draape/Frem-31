import {defineType, defineField} from 'sanity'

type LinkValue = {label?: string; internal?: unknown; href?: string; email?: string}

// `link` has initial values, so a button object can exist without the editor
// having chosen a destination. Only a destination makes it a real button.
const hasDestination = (link: LinkValue) => Boolean(link.internal || link.href || link.email)

const buttonLabelRule = (value: unknown) => {
  const link = value as LinkValue | undefined
  return link && hasDestination(link) && !link.label ? 'Add a button label' : true
}

/**
 * The hero header, shown instead of the page header when the page's
 * `headerType` is "hero". The title and description are the page's own.
 */
export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: "Small label above the title, e.g. 'Sesong 2025'.",
    }),
    defineField({
      name: 'titleAccent',
      title: 'Title accent',
      type: 'string',
      description: 'Shown in yellow after the page title.',
    }),
    defineField({
      name: 'primaryButton',
      title: 'Primary button',
      type: 'link',
      validation: (rule) => rule.custom(buttonLabelRule),
    }),
    defineField({
      name: 'secondaryButton',
      title: 'Secondary button',
      type: 'link',
      validation: (rule) => rule.custom(buttonLabelRule),
    }),
  ],
})
