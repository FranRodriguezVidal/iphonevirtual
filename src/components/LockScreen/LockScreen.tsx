import { motion } from 'framer-motion'
import { useDeviceTime } from '../../hooks/useDeviceTime'
import { useGesture } from '../../hooks/useGesture'
import { DynamicIsland } from '../DynamicIsland/DynamicIsland'
import { StatusBar } from '../StatusBar/StatusBar'
import './lockScreen.scss'

type LockScreenProps = {
  onUnlock: () => void
}

export function LockScreen({ onUnlock }: LockScreenProps) {
  const { timeLabel, dateLabel } = useDeviceTime()
  const { handlers } = useGesture({
    onSwipeUp: onUnlock,
    threshold: 90,
  })

  return (
    <motion.div
      className="lockScreen"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.98 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="lockScreen__wallpaper" aria-hidden="true" />

      <header className="lockScreen__header">
        <DynamicIsland />
        <StatusBar timeLabel={timeLabel} />
      </header>

      <main className="lockScreen__content">
        <div className="lockScreen__timeBlock">
          <p className="lockScreen__time">{timeLabel}</p>
          <p className="lockScreen__date">{dateLabel}</p>
        </div>
      </main>

      <footer className="lockScreen__footer">
        <div className="lockScreen__quickActions" aria-label="Quick actions">
          <span>Flashlight</span>
          <span>Camera</span>
        </div>

        <div
          className="lockScreen__unlockArea"
          role="button"
          tabIndex={0}
          {...handlers}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onUnlock()
            }
          }}
        >
          <span className="lockScreen__unlockBar" />
          <span className="lockScreen__unlockText">Swipe up to unlock</span>
        </div>
      </footer>
    </motion.div>
  )
}
