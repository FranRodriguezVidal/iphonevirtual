import type { AppDefinition } from '../../types'
import './appIcon.scss'

type AppIconProps = {
  app: AppDefinition
  onClick: () => void
}

export function AppIcon({ app, onClick }: AppIconProps) {
  return (
    <button type="button" className="appIcon" onClick={onClick} aria-label={app.name}>
      <span className="appIcon__glyph" style={{ background: `linear-gradient(135deg, ${app.tint}, ${app.accent})` }}>
        {app.icon}
      </span>
      <span className="appIcon__label">{app.name}</span>
    </button>
  )
}
