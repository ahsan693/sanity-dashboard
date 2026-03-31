import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import bulkCarImportPlugin from './plugins/bulkCarImport.jsx'

export default defineConfig({
  name: 'indus_motor_group_studio',
  title: 'Indus Motor Group Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'en832qbs',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool(),
    bulkCarImportPlugin(),
    // visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      // Only show delete and unpublish for car documents
      if (context.schemaType === 'car') {
        return prev.filter(
          action => 
            action.action === 'publish' || 
            action.action === 'discardChanges' ||
            action.action === 'delete' ||
            action.action === 'unpublish'
        )
      }
      return prev
    },
  },
})
