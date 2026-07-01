import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'weekendEvent',
  title: 'Weekend Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'date', type: 'datetime', validation: r => r.required() }),
    defineField({
      name: 'venue',
      type: 'string',
      options: { list: ['upstairs', 'basement', 'both'] },
    }),
    defineField({ name: 'ticketUrl', type: 'url' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
  ],
  preview: { select: { title: 'title', subtitle: 'date' } },
})
