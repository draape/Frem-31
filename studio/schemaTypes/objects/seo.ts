import {defineType, defineField} from 'sanity'

/**
 * SEO / metadata. Two object types share the same base fields:
 *
 * - `seoDefaults` — title / description / image only. Used on `siteSettings` as
 *   the site-wide fallback; these are the only fields that make sense as defaults.
 * - `seo` — the base fields plus `canonical` and `noIndex`, which are inherently
 *   per-page. Used on `page`.
 *
 * The frontend resolves each value as:
 *   page.seo.<field>  ->  page's own field  ->  siteSettings.seo.<field>
 */
const baseSeoFields = () => [
  defineField({
    name: 'title',
    title: 'Meta title',
    type: 'string',
    description:
      'Title shown in search results and browser tabs. Falls back to the page title. Around 50–60 characters works best.',
    validation: (rule) =>
      rule.max(60).warning('Titles over ~60 characters get truncated in search results'),
  }),
  defineField({
    name: 'description',
    title: 'Meta description',
    type: 'text',
    rows: 3,
    description:
      'Summary shown under the title in search results. Around 150–160 characters works best.',
    validation: (rule) =>
      rule.max(160).warning('Descriptions over ~160 characters get truncated in search results'),
  }),
  defineField({
    name: 'image',
    title: 'Social share image',
    type: 'image',
    options: {hotspot: true},
    description: 'Used for Open Graph / Twitter cards when shared. Recommended size 1200×630.',
  }),
]

export const seoDefaults = defineType({
  name: 'seoDefaults',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: baseSeoFields(),
})

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    ...baseSeoFields(),
    defineField({
      name: 'canonical',
      title: 'Canonical URL',
      type: 'url',
      description:
        'Optional. Point search engines at a different primary URL for this content (duplicate-content cases). Leave empty to use this page\'s own URL.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      type: 'boolean',
      initialValue: false,
      description: 'Adds a noindex tag so this page is excluded from search results.',
    }),
  ],
})
