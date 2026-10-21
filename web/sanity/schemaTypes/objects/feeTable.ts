import { defineType, defineField, defineArrayMember } from 'sanity';
import { FeeTableIcon } from './icons';

type Groups = { title?: string }[];
type Rows = unknown[];

export const feeTable = defineType({
  name: 'feeTable',
  title: 'Fee table',
  type: 'object',
  icon: FeeTableIcon,
  fields: [
    defineField({
      name: 'groups',
      title: 'Groups',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'feeGroup',
          title: 'Group',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                defineArrayMember({
                  name: 'feeRow',
                  title: 'Row',
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'price',
                      title: 'Price',
                      type: 'string',
                      description: 'Free text, e.g. kr 1 200',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'note',
                      title: 'Note',
                      type: 'string',
                      description: 'Optional small line under the label.',
                    }),
                  ],
                  preview: {
                    select: { title: 'label', subtitle: 'price' },
                  },
                }),
              ],
              validation: (rule) => rule.required().min(1).error('Add at least one row'),
            }),
          ],
          preview: {
            select: { title: 'title', rows: 'rows' },
            prepare({ title, rows }) {
              const count = ((rows as Rows) || []).length;
              return { title: title || 'Group', subtitle: `${count} row${count === 1 ? '' : 's'}` };
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1).error('Add at least one group'),
    }),
  ],
  preview: {
    select: { groups: 'groups' },
    prepare({ groups }) {
      const titles = ((groups as Groups) || []).map((group) => group.title).filter(Boolean);
      return { title: 'Fee table', subtitle: titles.length > 0 ? titles.join(', ') : 'No groups' };
    },
  },
});
