import { useEffect, useState } from 'react'
import './statusBar.scss'

type BatteryState = {
  level: number
  charging: boolean
  addEventListener?: (type: 'levelchange' | 'chargingchange', listener: () => void) => void
  removeEventListener?: (type: 'levelchange' | 'chargingchange', listener: () => void) => void
}

type StatusBarProps = {
  showDynamicIsland?: boolean
  timeLabel?: string
  showBatteryLevel?: boolean
  compact?: boolean
  showSignalBars?: boolean
}

export function StatusBar({
  showDynamicIsland = false,
  timeLabel = '9:41',
  showBatteryLevel = false,
  compact = false,
  showSignalBars = false,
}: StatusBarProps) {
  const [batteryLevel, setBatteryLevel] = useState<number>(78)
  const [isCharging, setIsCharging] = useState<boolean>(false)

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return
    }

    const batteryApi = (navigator as Navigator & {
      getBattery?: () => Promise<BatteryState>
    }).getBattery

    if (!batteryApi) {
      setBatteryLevel(78)
      setIsCharging(false)
      return
    }

    let battery: BatteryState | null = null

    const updateBatteryInfo = () => {
      if (!battery) {
        return
      }

      const level = Math.round((battery.level ?? 0) * 100)
      setBatteryLevel(Math.min(100, Math.max(0, Number.isFinite(level) ? level : 78)))
      setIsCharging(Boolean(battery.charging))
    }

    batteryApi()
      .then((value) => {
        battery = value
        updateBatteryInfo()
        value.addEventListener?.('levelchange', updateBatteryInfo)
        value.addEventListener?.('chargingchange', updateBatteryInfo)
      })
      .catch(() => {
        setBatteryLevel(78)
        setIsCharging(false)
      })

    return () => {
      if (battery) {
        battery.removeEventListener?.('levelchange', updateBatteryInfo)
        battery.removeEventListener?.('chargingchange', updateBatteryInfo)
      }
    }
  }, [])

  const batteryPercent = Math.min(100, Math.max(0, batteryLevel))

  return (
    <div className={`statusBar ${showDynamicIsland ? 'statusBar--withIsland' : ''} ${compact ? 'statusBar--compact' : ''}`}>
      <div className="statusBar__left">
        {timeLabel && !showBatteryLevel ? <span className="statusBar__time">{timeLabel}</span> : null}
      </div>

      <div className="statusBar__right" aria-label="status indicators">
        <span className="statusBar__network">5G</span>

        {showSignalBars && !compact ? (
          <>
            <span className="statusBar__signal" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
            <span className="statusBar__wifi" aria-hidden="true" />
          </>
        ) : null}

        <span className={`statusBar__battery ${isCharging ? 'statusBar__battery--charging' : ''}`} aria-label={`Battery ${batteryPercent}%`}>
          <span className="batteryFill" style={{ width: `${batteryPercent}%` }} />
          {showBatteryLevel ? <span className="statusBar__batteryText">{batteryPercent}</span> : null}
        </span>
      </div>
    </div>
  )
}
