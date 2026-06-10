export default {
  name: 'vipReservation',
  title: 'Reserve VIP — Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    { name: 'title',       title: 'Page Title',           type: 'string',  initialValue: 'Reserve VIP' },
    { name: 'description', title: 'Description',          type: 'text',    description: 'Shown on the page' },
    { name: 'price',       title: 'Base Price ($)',        type: 'number',  description: 'Full payment amount', validation: R => R.required().positive() },
    { name: 'quantity',    title: 'Quantity Available',    type: 'number',  description: 'Max VIP reservations available. Decrease manually after bookings.', initialValue: 5 },
    { name: 'notice',      title: 'Notice / Policy',      type: 'text',    description: 'Shown at top of form' },
    { name: 'confirmationMessage', title: 'Confirmation Message', type: 'text', description: 'Shown after successful booking', initialValue: "Your VIP section is reserved! We'll reach out to confirm details." },
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
      description: 'What comes with every VIP reservation',
      of: [{ type: 'string' }],
      initialValue: ['Private Bartender', 'Reserved Seating', 'Priority Service']
    },
  ]
}
