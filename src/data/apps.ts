import type { AppDefinition } from '../types'

export const APP_CATALOG: AppDefinition[] = [
  {
    id: 'photos',
    name: 'Photos',
    icon: '🖼️',
    enabled: true,
    tint: '#7c9cff',
    accent: '#9ca9ff',
    description: 'Your visual library',
  },
  {
    id: 'messages',
    name: 'Messages',
    icon: '💬',
    enabled: true,
    tint: '#5ad39c',
    accent: '#7ce4b0',
    description: 'Conversations',
  },
  {
    id: 'notes',
    name: 'Notes',
    icon: '📝',
    enabled: true,
    tint: '#ffd166',
    accent: '#f6d672',
    description: 'Quick ideas',
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: '⚙️',
    enabled: true,
    tint: '#c4c7d3',
    accent: '#dfe2f4',
    description: 'System controls',
  },
]

export const DOCK_APPS: AppDefinition[] = APP_CATALOG.slice(0, 4)
