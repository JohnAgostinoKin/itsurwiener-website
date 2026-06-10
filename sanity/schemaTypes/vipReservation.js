export default {
  name: 'vipReservation',
  title: 'Reserve VIP — Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'title',       title: 'Page Title',           type: 'string',  initialValue: 'Reserve VIP' },
    { name: 'description', title: 'Description',          type: 'text' },
    { name: 'price',       title: 'Base Price ($)',        type: 'number' },
    { name: 'quantity',    title: 'Quantity Available',    type: 'number',  initialValue: 5 },
    { name: 'notice',      title: 'Notice / Policy',      type: 'text' },
    { name: 'confirmationMessage', title: 'Confirmation Message', type: 'text', initialValue: "Your VIP section is reserved! We'll be in touch." },
    {
      name: 'availableDates',
      title: 'Available Dates',
      type: 'array',
      description: 'Leave blank to allow any date. Add specific dates to restrict bookings (e.g. game days only).',
      of: [{ type: 'date' }]
    },
    {
      name: 'availableTimes',
      title: 'Available Times',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['8:00 PM','9:00 PM','10:00 PM']
    },
    {
      name: 'perks',
      title: 'Included Perks',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Private Bartender','Reserved Seating','Priority Service']
    },
    {
      name: 'variables',
      title: 'Add-Ons',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name',        title: 'Add-On Name',   type: 'string' },
          { name: 'price',       title: 'Price ($)',      type: 'number' },
          { name: 'description', title: 'Description',   type: 'string' },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
    },
  ]
}
