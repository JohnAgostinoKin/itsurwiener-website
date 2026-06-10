export default {
  name: 'tableReservation',
  title: 'Reserve a Table — Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'title',       title: 'Page Title',           type: 'string',  initialValue: 'Reserve a Table' },
    { name: 'description', title: 'Description',          type: 'text',    description: 'Shown on the page' },
    { name: 'price',       title: 'Base Price ($)',        type: 'number',  description: 'Full payment amount', validation: R => R.required().positive() },
    { name: 'quantity',    title: 'Quantity Available',    type: 'number',  description: 'Max reservations. Decrease manually after bookings.', initialValue: 20 },
    { name: 'notice',      title: 'Notice / Policy',      type: 'text',    description: 'Shown at top — e.g. game day policy, cancellation policy' },
    { name: 'confirmationMessage', title: 'Confirmation Message', type: 'text', description: 'Shown after successful booking', initialValue: "Your table is reserved! We'll see you soon." },
    {
      name: 'variables',
      title: 'Add-Ons / Variables',
      type: 'array',
      description: 'Optional upgrades the customer can add',
      of: [{
        type: 'object',
        fields: [
          { name: 'name',  title: 'Add-On Name',   type: 'string', description: 'e.g. Bottle of Champagne, Birthday Decoration' },
          { name: 'price', title: 'Price ($)',      type: 'number' },
          { name: 'description', title: 'Description', type: 'string' },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
    },
    {
      name: 'availableTimes',
      title: 'Available Times',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['11:00 AM','12:00 PM','1:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM']
    },
  ]
}
