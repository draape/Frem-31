import {defineType, defineField} from 'sanity'
import {MapEmbedIcon} from './icons'

// Only Google Maps embed URLs (Share → Embed a map → the iframe's `src`). The
// web renders the URL in an iframe, so anything else is refused here and
// skipped there.
const MAP_EMBED_PREFIX = 'https://www.google.com/maps/embed'

export const mapEmbed = defineType({
  name: 'mapEmbed',
  title: 'Map',
  type: 'object',
  icon: MapEmbedIcon,
  fields: [
    defineField({
      name: 'url',
      title: 'Google Maps embed URL',
      type: 'url',
      description:
        'In Google Maps: Share → Embed a map → copy the address inside src="…" (it starts with https://www.google.com/maps/embed).',
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true
          return (value as string).startsWith(MAP_EMBED_PREFIX)
            ? true
            : `Use a Google Maps embed URL (starts with ${MAP_EMBED_PREFIX})`
        }),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Read out by screen readers. Describe what the map shows.',
      initialValue: 'Kart over Frembanen',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Map', subtitle: 'Map'}
    },
  },
})
