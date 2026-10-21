import { defineType, defineField, type ValidationContext } from 'sanity';
import { hasDestination, type LinkValue } from './link';

// Sanity validates hidden fields too, so skip the rule unless the hero is in
// use; otherwise a stale button would block publishing a Standard page.
const buttonLabelRule = (value: unknown, context: ValidationContext) => {
  if (context.document?.headerType !== 'hero') return true;
  const link = value as LinkValue | undefined;
  return link && hasDestination(link) && !link.label ? 'Add a button label' : true;
};

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
});
