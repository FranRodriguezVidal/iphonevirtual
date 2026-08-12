import type { ReactElement } from 'react'
import type { AppDefinition } from '../types'
import { SettingsApp } from './Settings/SettingsApp'
import { PhotosApp } from './Photos/PhotosApp'
import { MessagesApp } from './Messages/MessagesApp'
import { NotesApp } from './Notes/NotesApp'

export const APP_COMPONENTS: Record<AppDefinition['id'], (props: { app: AppDefinition }) => ReactElement> = {
  settings: SettingsApp,
  photos: PhotosApp,
  messages: MessagesApp,
  notes: NotesApp,
}
