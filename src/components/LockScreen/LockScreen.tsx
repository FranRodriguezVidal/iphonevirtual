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
      {...handlers}
    >
      <div className="lockScreen__wallpaper" aria-hidden="true" />

      <header className="lockScreen__header">
        <div className="lockScreen__topBar">
          <div className="lockScreen__brand">DIGI ES</div>
          <DynamicIsland />
          <StatusBar timeLabel={timeLabel} compact showSignalBars showBatteryLevel />
        </div>
      </header>

      <main className="lockScreen__content">
        <div className="lockScreen__timeBlock">
          <p className="lockScreen__date">{dateLabel}</p>
          <p className="lockScreen__time">{timeLabel}</p>
        </div>
      </main>
    </motion.div>
  )
}
