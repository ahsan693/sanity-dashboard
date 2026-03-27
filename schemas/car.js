export default {
  name: 'car',
  title: 'Car',
  type: 'document',
  fields: [
    {
      name: 'make',
      title: 'Make',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: false
    },
    {
      name: 'model',
      title: 'Model',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: false
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
      readOnly: false
    },
    {
      name: 'price',
      title: 'Price (€)',
      type: 'number',
      readOnly: false
    },
    {
      name: 'mileage',
      title: 'Mileage (km)',
      type: 'number',
      readOnly: false
    },
    {
      name: 'fuelType',
      title: 'Fuel Type',
      type: 'string',
      options: {
        list: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
        layout: 'radio'
      },
      readOnly: false
    },
    {
      name: 'transmission',
      title: 'Transmission',
      type: 'string',
      options: {
        list: ['Manual', 'Automatic'],
        layout: 'radio'
      },
      readOnly: false
    },
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      readOnly: false
    },
    {
      name: 'engineSize',
      title: 'Engine Size (L)',
      type: 'number',
      readOnly: false
    },
    {
      name: 'bodyType',
      title: 'Body Type',
      type: 'string',
      options: {
        list: ['Saloon', 'SUV', 'Hatchback', 'Estate', 'Coupe', 'Convertible', 'Van'],
        layout: 'radio'
      },
      readOnly: false
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      readOnly: false
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ],
      readOnly: false
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Reserved', value: 'reserved' }
        ],
        layout: 'radio'
      },
      initialValue: 'available',
      readOnly: false
    },
    {
      name: 'featured',
      title: 'Featured on homepage?',
      type: 'boolean',
      initialValue: false,
      readOnly: false
    },
    {
      name: 'nctExpiry',
      title: 'NCT Expiry Date',
      type: 'date',
      readOnly: false
    },
    {
      name: 'owners',
      title: 'Number of Previous Owners',
      type: 'number',
      readOnly: false
    },
  ],
  preview: {
    select: {
      title: 'make',
      subtitle: 'model',
      media: 'images.0'
    }
  },
  __experimental_actions: ['create', 'update', 'publish', 'delete']
}
