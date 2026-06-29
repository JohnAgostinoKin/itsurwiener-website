import { defineConfig, useClient } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

function DuplicateAction({ id, type, onComplete }) {
  const client = useClient({ apiVersion: '2024-01-01' })
  return {
    label: 'Duplicate',
    onHandle: async () => {
      const doc = await client.getDocument(id)
      if (!doc) return
      const { _id, _rev, _updatedAt, _createdAt, ...rest } = doc
      await client.create({ ...rest, _type: type })
      alert('Duplicated! Check the top of the document list.')
      onComplete()
    }
  }
}

const SINGLETONS = ['weeklySpecials', 'currentWeekend']

export default defineConfig({
  name: 'default',
  title: 'Itsurwiener',
  projectId: 'dwoifffe',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Weekly Specials (standing)')
              .id('weeklySpecials')
              .child(
                S.document()
                  .schemaType('weeklySpecials')
                  .documentId('weeklySpecials')
              ),
            S.listItem()
              .title('This Weekend (dynamic)')
              .id('currentWeekend')
              .child(
                S.document()
                  .schemaType('currentWeekend')
                  .documentId('currentWeekend')
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              item => !SINGLETONS.includes(item.getId())
            ),
          ]),
    }),
    visionTool(),
  ],
  document: {
    actions: (prev) => [...prev, DuplicateAction],
  },
  schema: { types: schemaTypes },
})
