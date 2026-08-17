import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useDeviceTime } from '../../hooks/useDeviceTime'
import { useGesture } from '../../hooks/useGesture'
import { DynamicIsland } from '../DynamicIsland/DynamicIsland'
import { StatusBar } from '../StatusBar/StatusBar'
import './lockScreen.scss'

type LockScreenProps = {
  onUnlock: () => void
}

const PASSCODE = '200526'
const keypad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', ''],
]

export function LockScreen({ onUnlock }: LockScreenProps) {
  const { timeLabel, dateLabel } = useDeviceTime()
  const [showPasscode, setShowPasscode] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const maskedCode = useMemo(
    () => Array.from({ length: 6 }, (_, index) => (index < code.length ? '•' : '·')).join(' '),
    [code],
  )

  const handleSwipeUp = () => {
    setShowPasscode(true)
    setError(false)
  }

  const appendDigit = (digit: string) => {
    if (!showPasscode) {
      setShowPasscode(true)
    }

    if (digit === '') {
      return
    }

    setCode((current) => {
      const next = `${current}${digit}`
      if (next.length >= PASSCODE.length) {
        const isMatch = next === PASSCODE

        if (isMatch) {
          setTimeout(() => onUnlock(), 180)
        } else {
          setError(true)
        }

        return isMatch ? PASSCODE : ''
      }

      return next
    })
  }

  const { handlers } = useGesture({
    onSwipeUp: handleSwipeUp,
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

      <main className={`lockScreen__content ${showPasscode ? 'is-blurred' : ''}`}>
        <div className="lockScreen__timeBlock">
          <p className="lockScreen__date">{dateLabel}</p>
          <p className="lockScreen__time">{timeLabel}</p>
        </div>

        <div className={`lockScreen__passcode ${showPasscode ? 'is-visible' : ''}`} aria-live="polite">
          <span className="lockScreen__passcodeLabel">Enter Passcode</span>
          <span className={`lockScreen__digits ${error ? 'is-error' : ''}`}>{maskedCode}</span>

          <div className="lockScreen__keypad">
            {keypad.map((row, rowIndex) => (
              <div key={rowIndex} className="lockScreen__keypadRow">
                {row.map((digit, index) => (
                  <button
                    key={`${rowIndex}-${index}`}
                    type="button"
                    className={`lockScreen__key ${digit === '' ? 'is-empty' : ''}`}
                    onClick={() => appendDigit(digit)}
                    aria-label={digit ? `Digit ${digit}` : 'Empty'}
                  >
                    {digit || ''}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  )
}
