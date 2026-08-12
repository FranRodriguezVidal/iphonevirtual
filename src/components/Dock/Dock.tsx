import type { AppDefinition } from '../../types'
import './dock.scss'

type DockProps = {
  apps: AppDefinition[]
  onOpenApp: (appId: AppDefinition['id']) => void
}

export function Dock({ apps, onOpenApp }: DockProps) {
  return (
    <div className="dock" aria-label="App dock">
      {apps.map((app) => (
        <button
          key={app.id}
          type="button"
          className="dock__item"
          onClick={() => onOpenApp(app.id)}
          aria-label={app.name}
        >
          <span className="dock__glyph" style={{ background: `linear-gradient(135deg, ${app.tint}, ${app.accent})` }}>
            {app.icon}
          </span>
        </button>
      ))}
    </div>
  )
}
