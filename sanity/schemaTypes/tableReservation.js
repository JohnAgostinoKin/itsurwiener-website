export default {
  name: 'tableReservation',
  title: 'Reserve a Table — Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'title',       title: 'Page Title',           type: 'string',  initialValue: 'Reserve a Table' },
    { name: 'description', title: 'Description',          type: 'text' },
    { name: 'price',       title: 'Base Price ($)',        type: 'number' },
    { name: 'quantity',    title: 'Quantity Available',    type: 'number',  initialValue: 20 },
    { name: 'notice',      title: 'Notice / Policy',      type: 'text' },
    { name: 'confirmationMessage', title: 'Confirmation Message', type: 'text', initialValue: "Your table is reserved! See you soon." },
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
      initialValue: ['11:00 AM','12:00 PM','1:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM']
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
