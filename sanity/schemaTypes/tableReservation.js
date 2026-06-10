export default {
  name: 'tableReservation',
  title: 'Reserve a Table — Settings',
  type: 'document',
  fields: [
    { name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 0 },
    { name: 'title',       title: 'Page Title',           type: 'string',  initialValue: 'Reserve a Table' },
    { name: 'description', title: 'Description',          type: 'text',    description: 'Shown on the page' },
    { name: 'price',       title: 'Base Price ($)',        type: 'number',  description: 'Full payment amount', validation: R => R.required().positive() },
    { name: 'quantity',    title: 'Quantity Available',    type: 'number',  description: 'Max reservations. Decrease manually after bookings.', initialValue: 20 },
    { name: 'notice',      title: 'Notice / Policy',      type: 'text',    description: 'Shown at top — e.g. game day policy, cancellation policy' },
    { name: 'confirmationMessage', title: 'Confirmation Message', type: 'text', description: 'Shown after successful booking', initialValue: "Your table is reserved! We'll see you soon." },
    {
      name: 'packages',
      title: 'Packages',
      type: 'array',
      description: 'Reservation packages customers can choose from',
      of: [{
        type: 'object',
        fields: [
          { name: 'name',        title: 'Package Name',  type: 'string' },
          { name: 'description', title: 'Description',   type: 'text' },
          { name: 'price',       title: 'Price ($)',      type: 'number' },
          { name: 'maxGuests',   title: 'Max Guests',     type: 'number' },
          {
            name: 'effectiveDates',
            title: 'Effective Dates',
            type: 'array',
            description: 'Leave blank = always available. Add specific dates to restrict this package.',
            of: [{ type: 'date' }],
          },
          { name: 'available',   title: 'Available',      type: 'boolean', initialValue: true },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
    },
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
    { name: 'time', title: 'Time', type: 'string', description: 'e.g. 8:00 PM - 2:00 AM or Open at 10AM on game days' },
  ]
}
