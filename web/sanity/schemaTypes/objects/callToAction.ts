import { defineType, defineField } from 'sanity';
import { CallToActionIcon } from './icons';
import { hasDestination, type LinkValue } from './link';

const variants = [
  { title: 'Blue', value: 'blue' },
  { title: 'Yellow', value: 'yellow' },
  { title: 'White', value: 'white' },
];

export const callToAction = defineType({
  name: 'callToAction',
  title: 'Call to action',
  type: 'object',
  icon: CallToActionIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cta',
      title: 'Button',
      type: 'link',
      validation: (rule) =>
        rule.custom((value) => {
          const link = value as LinkValue | undefined;
          if (!link || !hasDestination(link)) return 'Choose where the button links to';
          if (!link.label) return 'Add a button label';
          return true;
        }),
    }),
    defineField({
      name: 'variant',
      title: 'Colour',
      type: 'string',
      options: { list: variants, layout: 'radio' },
      initialValue: 'blue',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: 'title', variant: 'variant', label: 'cta.label' },
    prepare({ title, variant, label }) {
      const variantTitle = variants.find((v) => v.value === variant)?.title;
      return {
        title: title || 'Call to action',
        subtitle: ['Call to action', variantTitle, label].filter(Boolean).join(' · '),
      };
    },
  },
});
