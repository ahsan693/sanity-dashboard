import FeaturedToggleInput from '../src/components/FeaturedToggleInput'

const interiorComfortFeatures = [
  { title: 'Air Conditioning', value: 'airConditioning' },
  { title: 'Centre Armrest', value: 'centreArmrest' },
  { title: 'Climate Control', value: 'climateControl' },
  { title: 'Electric Seats', value: 'electricSeats' },
  { title: 'Electric Windows', value: 'electricWindows' },
  { title: 'Folding Rear Seats', value: 'foldingRearSeats' },
  { title: 'Heated Front Seats', value: 'heatedFrontSeats' },
  { title: 'Sunroof', value: 'sunroof' }
]

const safetySecurityFeatures = [
  { title: 'Anti-Theft System', value: 'antiTheftSystem' },
  { title: 'Automatic Wipers', value: 'automaticWipers' },
  { title: 'Brake Assist System', value: 'brakeAssistSystem' },
  { title: 'Central Locking', value: 'centralLocking' },
  { title: 'Daytime Running Lights', value: 'daytimeRunningLights' },
  { title: 'EBD (Electronic Brakeforce Distribution)', value: 'ebd' },
  { title: 'Hill-Start Assist', value: 'hillStartAssist' },
  { title: 'Traction Control', value: 'tractionControl' }
]

const techDriverAssistFeatures = [
  { title: 'Bluetooth', value: 'bluetooth' },
  { title: 'Cruise Control', value: 'cruiseControl' },
  { title: 'Electronic Handbrake', value: 'electronicHandbrake' },
  { title: 'Multi-Function Steering Wheel', value: 'multiFunctionSteeringWheel' },
  { title: 'Parking Sensors', value: 'parkingSensors' },
  { title: 'Sat Nav', value: 'satNav' },
  { title: 'Selectable Drive Mode', value: 'selectableDriveMode' },
  { title: 'Stop / Start Button', value: 'stopStartButton' }
]

const exteriorStylingFeatures = [
  { title: 'Alloy Wheels', value: 'alloyWheels' },
  { title: 'Metallic Paint', value: 'metallicPaint' },
  { title: 'Rear Spoiler', value: 'rearSpoiler' }
]

const FEATURED_SLOTS = [1, 2, 3, 4]

const normalizeCarId = (id) => (typeof id === 'string' ? id.replace(/^drafts\./, '') : '')

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
      name: 'seats',
      title: 'Seats',
      type: 'number',
      readOnly: false
    },
    {
      name: 'doors',
      title: 'Doors',
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
      title: 'Colour',
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
      name: 'enginePower',
      title: 'Engine Power (BHP)',
      type: 'number',
      readOnly: false
    },
    {
      name: 'co2Emissions',
      title: 'CO2 Emissions (g/km)',
      type: 'number',
      readOnly: false
    },
    {
      name: 'roadTax',
      title: 'Road Tax (€ / year)',
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
      name: 'features',
      title: 'Features',
      description: 'Select only the features this vehicle has.',
      type: 'object',
      fields: [
        {
          name: 'interiorComfort',
          title: 'Interior & Comfort',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: interiorComfortFeatures
          },
          validation: (Rule) => Rule.unique()
        },
        {
          name: 'safetySecurity',
          title: 'Safety & Security',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: safetySecurityFeatures
          },
          validation: (Rule) => Rule.unique()
        },
        {
          name: 'technologyDriverAssistance',
          title: 'Technology & Driver Assistance',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: techDriverAssistFeatures
          },
          validation: (Rule) => Rule.unique()
        },
        {
          name: 'exteriorStyling',
          title: 'Exterior & Styling',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: exteriorStylingFeatures
          },
          validation: (Rule) => Rule.unique()
        }
      ],
      options: {
        collapsible: true
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
      description: 'Select this car to appear in Featured Cars on the homepage (maximum 4 cars).',
      components: {
        input: FeaturedToggleInput
      },
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (isFeatured, context) => {
          if (!isFeatured) return true

          const client = context.getClient({ apiVersion: '2024-01-01' })
          const currentLogicalId = normalizeCarId(context.document?._id)
          const featuredDocs = await client.fetch(
            `*[_type == "car" && featured == true && defined(featuredOrder) && featuredOrder in $slots]{_id}`,
            { slots: FEATURED_SLOTS }
          )

          const featuredOtherCarsCount = new Set(
            featuredDocs
              .map((doc) => normalizeCarId(doc._id))
              .filter((id) => id && id !== currentLogicalId)
          ).size

          if (featuredOtherCarsCount >= 4) {
            return 'Only 4 cars can be featured at a time. Unfeature another car first.'
          }

          return true
        }),
      readOnly: false
    },
    {
      name: 'featuredOrder',
      title: 'Featured Car Number',
      type: 'number',
      description: 'Set display slot for homepage featured cars (1 to 4).',
      options: {
        list: FEATURED_SLOTS.map((slot) => ({ title: `Featured Car ${slot}`, value: slot })),
        layout: 'radio'
      },
      hidden: ({ document }) => !document?.featured,
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          const isFeatured = Boolean(context.document?.featured)

          if (!isFeatured) return true

          if (!FEATURED_SLOTS.includes(value)) {
            return 'Select a Featured Car Number from 1 to 4.'
          }

          const client = context.getClient({ apiVersion: '2024-01-01' })
          const currentLogicalId = normalizeCarId(context.document?._id)
          const featuredDocs = await client.fetch(`*[_type == "car" && featured == true && defined(featuredOrder)]{_id, featuredOrder}`)

          const hasConflict = featuredDocs.some((doc) => {
            const docLogicalId = normalizeCarId(doc._id)
            return docLogicalId !== currentLogicalId && doc.featuredOrder === value
          })

          if (hasConflict) {
            return `Featured Car ${value} is already assigned. Choose another number.`
          }

          return true
        }),
      readOnly: false
    },
    {
      name: 'nctExpiry',
      title: 'NCT Due',
      type: 'date',
      readOnly: false
    },
    {
      name: 'owners',
      title: 'Previous Owners',
      type: 'number',
      readOnly: false
    },
  ],
  preview: {
    select: {
      title: 'make',
      subtitle: 'model',
      images: 'images',
      featured: 'featured',
      featuredOrder: 'featuredOrder'
    },
    prepare({ title, subtitle, images, featured, featuredOrder }) {
      const media = Array.isArray(images) && images.length > 0 ? images[0] : undefined
      const suffix = featured && FEATURED_SLOTS.includes(featuredOrder) ? ` • Featured Car ${featuredOrder}` : ''

      return {
        title,
        subtitle: `${subtitle || ''}${suffix}`,
        media
      }
    }
  },
  __experimental_actions: ['create', 'update', 'publish', 'delete']
}
