export default {
  name: 'vipReservation',
  title: 'Reserve VIP — Settings',
  type: 'document',
  fields: [
    { name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 0 },
    { name: 'title',       title: 'Page Title',           type: 'string',  initialValue: 'Reserve VIP' },
    { name: 'description', title: 'Description',          type: 'text',    description: 'Shown on the page' },
    { name: 'price',       title: 'Base Price ($)',        type: 'number',  description: 'Full payment amount', validation: R => R.required().positive() },
    { name: 'quantity',    title: 'Quantity Available',    type: 'number',  description: 'Max VIP reservations available. Decrease manually after bookings.', initialValue: 5 },
    { name: 'notice',      title: 'Notice / Policy',      type: 'text',    description: 'Shown at top of form' },
    { name: 'confirmationMessage', title: 'Confirmation Message', type: 'text', description: 'Shown after successful booking', initialValue: "Your VIP section is reserved! We'll reach out to confirm details." },
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
          { name: 'available',   title: 'Available',      type: 'boolean', initialValue: true },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
    },
    {
      name: 'variables',
      title: 'Add-Ons / Variables',
      type: 'array',
      description: 'Optional upgrades the customer can add to their VIP reservation',
      of: [{
        type: 'object',
        fields: [
          { name: 'name',  title: 'Add-On Name',   type: 'string', description: 'e.g. Bottle Service, Custom Decoration, Extra Bartender Hour' },
          { name: 'price', title: 'Price ($)',      type: 'number' },
          { name: 'description', title: 'Description', type: 'string' },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
    },
    { name: 'time', title: 'Time', type: 'string', description: 'e.g. 8:00 PM - 2:00 AM or Open at 10AM on game days' },
    {
      name: 'perks',
      title: 'Included Perks',
      type: 'array',
      description: 'What comes with every VIP reservation',
      of: [{ type: 'string' }],
      initialValue: ['Private Bartender', 'Reserved Seating', 'Priority Service']
    },
  ]
}
