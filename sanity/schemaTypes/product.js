import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'category', title: 'Category', type: 'string',
      options: { list: ['tees', 'hoodies', 'hats', 'souvenirs', 'giftcards'] } }),
    defineField({ name: 'price', title: 'Price', type: 'number' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'sizes', title: 'Available Sizes', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'colors', title: 'Available Colors', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'denominations', title: 'Gift Card Amounts', type: 'array', of: [{ type: 'number' }],
      description: 'Gift cards only — e.g. 25, 50, 100' }),
    defineField({ name: 'weight', title: 'Weight (oz)', type: 'number' }),
    defineField({ name: 'sortOrder', title: 'Sort Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'available', title: 'Available for Purchase', type: 'boolean', initialValue: true }),
  ],
  preview: { select: { title: 'name', subtitle: 'category', media: 'image' } },
})
