export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Item Name',
      type: 'string',
      validation: R => R.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. $9.99 or Sm $8.99 / Lg $12.99'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      description: 'e.g. Fan Fave, Best Value'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: R => R.required()
    },
    {
      name: 'sizes',
      title: 'Sizes',
      type: 'array',
      description: 'e.g. 5 Tenders / $7.99, 10 Tenders / $12.99',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Size Label', type: 'string' },
          { name: 'price', title: 'Price',       type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'price' } }
      }]
    },
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      description: 'e.g. Grilled, Fried, Buffalo, Blackened',
      of: [{ type: 'string' }]
    },
    {
      name: 'addons',
      title: 'Add-ons',
      type: 'array',
      description: 'e.g. Add Bacon +$2.99',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Add-on Name',  type: 'string' },
          { name: 'price', title: 'Price',         type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'price' } }
      }]
    },
    {
      name: 'options',
      title: 'Options / Choices',
      type: 'array',
      description: 'e.g. Buffalo, BBQ, Ranch',
      of: [{ type: 'string' }]
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide from menu'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
  },
}
