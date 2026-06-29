import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'currentWeekend',
  title: 'This Weekend (dynamic)',
  type: 'document',
  fields: [
    defineField({
      name: 'mode', title: 'Mode', type: 'string',
      options: { list: ['auto', 'gameday', 'normal'], layout: 'radio' },
      initialValue: 'auto', validation: r => r.required(),
    }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subline', title: 'Subline', type: 'string' }),
    defineField({
      name: 'ctaLabel', title: 'CTA label', type: 'string',
      initialValue: 'See this weekend',
    }),
    defineField({ name: 'ctaUrl', title: 'CTA link (LineLeap, etc.)', type: 'url' }),
    defineField({
      name: 'opponent', title: 'Gameday: opponent', type: 'string',
      hidden: ({ parent }) => parent?.mode === 'normal',
    }),
    defineField({
      name: 'kickoff', title: 'Gameday: kickoff', type: 'datetime',
      hidden: ({ parent }) => parent?.mode === 'normal',
    }),
    defineField({
      name: 'teaserItems', title: 'Hero teaser overrides', type: 'array',
      of: [{ type: 'string' }],
      description: 'optional; if empty, teaser is built from featured weeklySpecials + events',
    }),
  ],
})
