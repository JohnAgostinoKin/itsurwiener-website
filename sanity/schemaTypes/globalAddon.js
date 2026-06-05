export default {
  name: 'globalAddon',
  title: 'Global Add-on',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Add-on Name',
      type: 'string',
      description: 'e.g. Add Cheese',
      validation: R => R.required()
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'e.g. +$0.99',
      validation: R => R.required()
    },
    {
      name: 'options',
      title: 'Choices',
      type: 'array',
      description: 'e.g. American, Cheddar, Swiss, Pepper Jack, Provolone',
      of: [{ type: 'string' }]
    },
    {
      name: 'categories',
      title: 'Apply to Categories',
      type: 'array',
      description: 'Which categories this add-on appears on',
      of: [{
        type: 'reference',
        to: [{ type: 'menuCategory' }]
      }]
    },
    {
      name: 'items',
      title: 'Apply to Specific Items',
      type: 'array',
      description: 'Apply to individual menu items only (overrides category)',
      of: [{
        type: 'reference',
        to: [{ type: 'menuItem' }]
      }]
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    }
  ],
  preview: {
    select: { title: 'label', subtitle: 'price' }
  }
}
