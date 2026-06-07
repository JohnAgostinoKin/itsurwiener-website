export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'bandName',    title: 'Band / Artist Name', type: 'string',  validation: R => R.required() },
    { name: 'eventType', title: 'Event Type', type: 'string',
      options: { list: [
        { title: 'Show (Live Music / DJ)', value: 'show' },
        { title: 'Event (Watch Party, Special, etc.)', value: 'event' },
      ], layout: 'radio' },
      initialValue: 'show',
      validation: R => R.required()
    },
    { name: 'date',        title: 'Date',                type: 'date',    options: { dateFormat: 'MMMM D, YYYY' }, validation: R => R.required() },
    { name: 'time',        title: 'Door / Show Time',    type: 'string',  description: 'e.g. Doors 8PM · Show 9PM', validation: R => R.required() },
    { name: 'ticketPrice', title: 'Ticket Price',        type: 'string',  description: 'e.g. $10 · Free · $15 Advance / $20 Door' },
    { name: 'ticketUrl',   title: 'Ticket Link (fallback)', type: 'url',  description: 'Generic ticket link if not using LineLeap' },
    { name: 'lineleapUrl', title: 'LineLeap URL',         type: 'url',     description: 'Your LineLeap event link — overrides ticket link' },
    { name: 'genre',       title: 'Genre / Type',        type: 'string',  description: 'e.g. Live Rock · DJ Night · Country' },
    { name: 'description', title: 'Event Description',   type: 'text',    description: 'Band bio, event details, what to expect, age restrictions, dress code, etc.' },
    { name: 'image',       title: 'Band / Event Photo',  type: 'image',   options: { hotspot: true }, },
    { name: 'featured',    title: 'Featured Event',      type: 'boolean', initialValue: false },
    { name: 'soldOut',     title: 'Sold Out',            type: 'boolean', initialValue: false },
  ],
  orderings: [{ title: 'Date Upcoming', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }],
  preview: { select: { title: 'bandName', subtitle: 'date' } }
}
