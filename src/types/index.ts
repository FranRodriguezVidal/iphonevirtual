export type ScreenState = 'LOCK_SCREEN' | 'HOME_SCREEN' | 'APP'

export type AppId = 'settings' | 'notes' | 'photos' | 'messages'

export type AppDefinition = {
  id: AppId
  name: string
  icon: string
  enabled: boolean
  tint: string
  accent: string
  description: string
}

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
