import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import {
  PublishAction,
  DiscardChangesAction,
  DeleteAction,
  DuplicateAction,
} from 'sanity'

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
    actions: () => [PublishAction, DuplicateAction, DiscardChangesAction, DeleteAction],
  },
  schema: {
    types: schemaTypes,
  },
})
