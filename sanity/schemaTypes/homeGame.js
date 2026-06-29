import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homeGame',
  title: 'Home Game',
  type: 'document',
  fields: [
    defineField({
      name: 'date', title: 'Date', type: 'date',
      validation: r => r.required(),
    }),
    defineField({ name: 'opponent', title: 'Opponent', type: 'string' }),
    defineField({ name: 'kickoff', title: 'Kickoff', type: 'datetime' }),
  ],
  preview: { select: { title: 'opponent', subtitle: 'date' } },
})
