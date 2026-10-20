import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure, singletonTypes} from './structure'
import {templates} from './schemaTypes/templates'

export default defineConfig({
  name: 'default',
  title: 'frem-31',

  projectId: 'auquaqxb',
  dataset: 'test',

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
