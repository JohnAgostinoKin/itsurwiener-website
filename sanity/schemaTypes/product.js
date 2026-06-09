export default {
  name: 'product',
  title: 'Merch Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: R => R.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'T-Shirts',    value: 'tees' },
          { title: 'Sweatshirts', value: 'hoodies' },
          { title: 'Hats',        value: 'hats' },
          { title: 'Souvenirs',   value: 'souvenirs' },
          { title: 'Gift Cards',  value: 'giftcards' },
        ]
      },
      validation: R => R.required()
    },
    {
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: R => R.required().positive()
    },
    {
      name: 'denominations',
      title: 'Gift Card Amounts',
      type: 'array',
      description: 'For gift cards only — list available amounts e.g. 10, 25, 50, 100, 500',
      of: [{ type: 'number' }]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'image',
      title: 'Product Photo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'sizes',
      title: 'Available Sizes',
      type: 'array',
      description: 'e.g. S, M, L, XL, 2XL — leave empty if no sizes',
      of: [{ type: 'string' }]
    },
    {
      name: 'colors',
      title: 'Available Colors',
      type: 'array',
      description: 'e.g. Black, Orange, Purple — leave empty if no colors',
      of: [{ type: 'string' }]
    },
    {
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
      description: 'Show at top of page'
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
      description: 'Uncheck to hide from store'
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'price', media: 'image' }
  }
}
