import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'weeklySpecials',
  title: 'Weekly Specials (standing)',
  type: 'document',
  fields: [
    defineField({
      name: 'days',
      title: 'Days',
      type: 'array',
      of: [defineField({
        name: 'daySpecial',
        type: 'object',
        fields: [
          defineField({
            name: 'day', title: 'Day', type: 'string',
            options: { list: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] },
            validation: r => r.required(),
          }),
          defineField({ name: 'title', title: 'Label', type: 'string' }),
          defineField({
            name: 'items', title: 'Specials', type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. "$1 mimosas", "$2 tall boys", "gameday brunch"',
          }),
          defineField({
            name: 'timeWindow', title: 'Time window', type: 'string',
            description: 'optional, e.g. "10am-2pm"',
          }),
          defineField({
            name: 'menuUrl', title: 'Menu link', type: 'url',
            description: 'optional, e.g. brunch menu',
          }),
          defineField({
            name: 'featured', title: 'Show in hero teaser', type: 'boolean',
            initialValue: false,
          }),
        ],
        preview: { select: { title: 'day', subtitle: 'title' } },
      })],
    }),
  ],
})
