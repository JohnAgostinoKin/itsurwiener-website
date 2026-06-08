import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Custom duplicate action
function DuplicateAction(props) {
  const { draft, published, onComplete } = props
  const client = props.client || props.useClient?.({ apiVersion: '2024-01-01' })

  return {
    label: 'Duplicate',
    icon: () => '⧉',
    onHandle: async () => {
      const doc = draft || published
      if (!doc) return
      const { _id, _rev, ...rest } = doc
      const newDoc = {
        ...rest,
        _id: `drafts.${crypto.randomUUID()}`,
        _type: doc._type,
      }
      await props.client.create(newDoc)
      onComplete()
      alert('Document duplicated! Find it at the top of the list.')
    }
  }
}

export default defineConfig({
  name: 'default',
  title: 'Itsurwiener',
  projectId: 'dwoifffe',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
  ],
  document: {
    actions: (prev) => [...prev, DuplicateAction],
  },
  schema: {
    types: schemaTypes,
  },
})
