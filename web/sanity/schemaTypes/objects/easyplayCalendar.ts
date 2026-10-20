import {defineType, defineField} from 'sanity'
import {EasyplayCalendarIcon} from './icons'

/**
 * The Frembanen booking calendar from EasyPlay. The block has nothing to edit:
 * the embed URL, height and fallback live in the web's `CalendarEmbed`. Adding
 * the block places the calendar on the page.
 */
export const easyplayCalendar = defineType({
  name: 'easyplayCalendar',
  title: 'Banekalender (EasyPlay)',
  type: 'object',
  icon: EasyplayCalendarIcon,
  fields: [
    // A Sanity object needs at least one field. This one is never shown or set.
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Banekalender (EasyPlay)',
        subtitle: 'Frembanen calendar. The URL is fixed in code.',
      }
    },
  },
})
