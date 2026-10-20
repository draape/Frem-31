'use client'

/**
 * The Sanity Studio, mounted at /studio by app/studio/[[...tool]]/page.tsx.
 * Project and dataset come from the same env vars the site reads.
 */
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './sanity/schemaTypes'
import {structure, singletonTypes} from './sanity/structure'
import {templates} from './sanity/schemaTypes/templates'

export default defineConfig({
  name: 'default',
  title: 'frem-31',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [structureTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
    // Appended to the auto-generated per-type templates rather than replacing
    // them, so the default "Create new" entries keep working.
    templates: (prev) => [...prev, ...templates],
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) =>
            ['publish', 'discardChanges', 'restore'].includes(action ?? ''),
          )
        : input,
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((template) => !singletonTypes.has(template.templateId))
        : prev,
  },
})
