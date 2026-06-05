export default {
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: R => R.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: R => R.required()
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: '#F56520 (orange) or #9D4EDD (purple)'
    },
    {
      name: 'note',
      title: 'Sub Note',
      type: 'string',
      description: 'Shown under category heading'
    },
    {
      name: 'image',
      title: 'Header Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0
    },

    // ── Category-wide variants ─────────────────────
    {
      name: 'categoryVariants',
      title: 'Category Variants',
      type: 'array',
      description: 'Options that apply to every item in this category (e.g. Grilled, Fried, Buffalo, Blackened)',
      of: [{ type: 'string' }]
    },

    // ── Category-wide add-ons ──────────────────────
    {
      name: 'categoryAddons',
      title: 'Category Add-ons',
      type: 'array',
      description: 'Add-ons available on every item (e.g. Make it a Basket +$5.99)',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Add-on Name', type: 'string' },
          { name: 'price', title: 'Price',        type: 'string' },
        ],
        preview: { select: { title: 'label', subtitle: 'price' } }
      }]
    },

    // ── Category-wide sauces/options ───────────────
    {
      name: 'categoryOptions',
      title: 'Category Options / Sauces',
      type: 'array',
      description: 'Options available across the whole category (e.g. wing sauces, BBQ styles)',
      of: [{
        type: 'object',
        fields: [
          { name: 'groupLabel', title: 'Group Label', type: 'string', description: 'e.g. Wet Sauces, Dry Rubs' },
          { name: 'options',    title: 'Options',     type: 'array', of: [{ type: 'string' }] },
        ],
        preview: { select: { title: 'groupLabel' } }
      }]
    },

    // ── Showcase item ──────────────────────────────
    {
      name: 'showcase',
      title: 'Showcase Item',
      type: 'object',
      description: 'Featured item displayed at top of category (e.g. Chicken & Waffle)',
      fields: [
        { name: 'name',  title: 'Name',        type: 'string' },
        { name: 'price', title: 'Price',        type: 'string' },
        { name: 'desc',  title: 'Description',  type: 'text' },
        { name: 'badge', title: 'Badge',         type: 'string' },
      ]
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'note' },
  },
}
