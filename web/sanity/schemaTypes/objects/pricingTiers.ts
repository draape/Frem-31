import { defineType, defineField, defineArrayMember } from 'sanity';
import { PricingTiersIcon } from './icons';
import { hasDestination, type LinkValue } from './link';

type Tiers = unknown[];

export const pricingTiers = defineType({
  name: 'pricingTiers',
  title: 'Pricing tiers',
  type: 'object',
  icon: PricingTiersIcon,
  fields: [
    defineField({
      name: 'tiers',
      title: 'Tiers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pricingTier',
          title: 'Tier',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'Shown as written, e.g. "kr 800 / år".',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'cta',
              title: 'Call to action',
              type: 'link',
              validation: (rule) =>
                rule.custom((value) => {
                  const link = value as LinkValue | undefined;
                  return link && hasDestination(link) && !link.label ? 'Add a button label' : true;
                }),
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlighted',
              type: 'boolean',
              description: 'Shown with a yellow card and a primary button.',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name', price: 'price', highlighted: 'highlighted' },
            prepare({ title, price, highlighted }) {
              const subtitle = [price, highlighted ? 'highlighted' : null]
                .filter(Boolean)
                .join(' · ');
              return { title: title || 'Tier', subtitle };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { tiers: 'tiers' },
    prepare({ tiers }) {
      const count = ((tiers as Tiers) || []).length;
      return { title: 'Pricing tiers', subtitle: `${count} tier${count === 1 ? '' : 's'}` };
    },
  },
});
