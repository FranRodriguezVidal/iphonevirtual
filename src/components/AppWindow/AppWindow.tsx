import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useGesture } from '../../hooks/useGesture'
import type { AppDefinition } from '../../types'
import './appWindow.scss'

type AppWindowProps = {
  app: AppDefinition
  onClose: () => void
  children: ReactNode
}

export function AppWindow({ app, onClose, children }: AppWindowProps) {
  const { handlers } = useGesture({
    onSwipeUp: onClose,
    threshold: 110,
  })

  return (
    <motion.div
      className="appWindow"
      initial={{ opacity: 0, scale: 0.96, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      {...handlers}
    >
      <div className="appWindow__header">
        <div className="appWindow__titleWrap">
          <span className="appWindow__icon" style={{ background: `linear-gradient(135deg, ${app.tint}, ${app.accent})` }}>
            {app.icon}
          </span>
          <div>
            <p className="appWindow__eyebrow">{app.description}</p>
            <h2>{app.name}</h2>
          </div>
        </div>

        <button type="button" className="appWindow__close" onClick={onClose} aria-label={`Close ${app.name}`}>
          ✕
        </button>
      </div>

      <div className="appWindow__content">{children}</div>
    </motion.div>
  )
}
