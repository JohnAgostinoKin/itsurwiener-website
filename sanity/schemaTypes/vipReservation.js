export default {
  name: 'vipReservation',
  title: 'Reserve VIP — Settings',
  type: 'document',
  fields: [
    { name: 'sortOrder',           title: 'Sort Order',            type: 'number' },
    { name: 'title',               title: 'Page Title',            type: 'string' },
    { name: 'description',         title: 'Description',           type: 'text' },
    { name: 'price',               title: 'Base Price ($)',         type: 'number' },
    { name: 'quantity',            title: 'Quantity Available',     type: 'number' },
    { name: 'notice',              title: 'Notice / Policy',        type: 'text' },
    { name: 'time',                title: 'Time',                   type: 'string' },
    { name: 'confirmationMessage', title: 'Confirmation Message',   type: 'text' },
    {
      name: 'availableDates',
      title: 'Available Dates',
      type: 'array',
      description: 'Leave blank for any date.',
      of: [{ type: 'date' }]
    },
    {
      name: 'perks',
      title: 'Included Perks',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'packages',
      title: 'Packages',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name',           title: 'Package Name',    type: 'string' },
          { name: 'description',    title: 'Description',     type: 'text' },
          { name: 'price',          title: 'Price ($)',        type: 'number' },
          { name: 'maxGuests',      title: 'Max Guests',       type: 'number' },
          {
            name: 'effectiveDates',
            title: 'Effective Dates',
            type: 'array',
            description: 'Leave blank = always available.',
            of: [{ type: 'date' }]
          },
          {
            name: 'perks',
            title: 'Package Perks',
            type: 'array',
            of: [{ type: 'string' }]
          },
        ],
        preview: { select: { title: 'name', subtitle: 'price' } }
      }]
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
