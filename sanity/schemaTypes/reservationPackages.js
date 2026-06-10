export default {
  name: 'reservationPackages',
  title: 'Reservation Packages',
  type: 'document',
  fields: [
    {
      name: 'tablePackages',
      title: 'Table Reservation Packages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name',        title: 'Package Name',    type: 'string',  description: 'e.g. Standard Table, Game Day Reserved Table' },
          { name: 'description', title: 'Description',     type: 'text' },
          { name: 'price',       title: 'Deposit Price ($)',type: 'number' },
          { name: 'maxGuests',   title: 'Max Guests',      type: 'number' },
          { name: 'available',   title: 'Available',       type: 'boolean', initialValue: true },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
    },
    {
      name: 'vipPackages',
      title: 'VIP Section Packages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name',        title: 'Package Name',    type: 'string',  description: 'e.g. VIP Small, VIP Large, Full VIP Section' },
          { name: 'description', title: 'Description',     type: 'text' },
          { name: 'price',       title: 'Price ($)',        type: 'number' },
          { name: 'maxGuests',   title: 'Max Guests',      type: 'number' },
          { name: 'perks',       title: 'Perks',           type: 'array', of: [{ type: 'string' }] },
          { name: 'available',   title: 'Available',       type: 'boolean', initialValue: true },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
    },
    {
      name: 'availableTimes',
      title: 'Available Times',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. 11:00 AM, 12:00 PM, 4:00 PM'
    },
    {
      name: 'tableNote',
      title: 'Table Reservation Notice',
      type: 'text',
      description: 'Shown at top of table reservation form'
    },
    {
      name: 'vipNote',
      title: 'VIP Notice',
      type: 'text',
      description: 'Shown at top of VIP reservation form'
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
