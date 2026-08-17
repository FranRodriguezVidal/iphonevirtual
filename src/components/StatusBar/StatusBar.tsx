import { useEffect, useState } from 'react'
import './statusBar.scss'

type BatteryState = {
  level: number
  charging: boolean
  addEventListener?: (type: 'levelchange' | 'chargingchange', listener: () => void) => void
  removeEventListener?: (type: 'levelchange' | 'chargingchange', listener: () => void) => void
}

type NetworkInfo = {
  effectiveType?: string
  type?: string
  downlink?: number
  downlinkMax?: number
  addEventListener?: (type: 'change', listener: () => void) => void
  removeEventListener?: (type: 'change', listener: () => void) => void
}

type StatusBarProps = {
  showDynamicIsland?: boolean
  timeLabel?: string
  showBatteryLevel?: boolean
  compact?: boolean
  showSignalBars?: boolean
}

function getNetworkState(connection?: NetworkInfo | null) {
  const type = connection?.type
  const effectiveType = connection?.effectiveType
  const isWifi = type === 'wifi' || effectiveType === 'wifi'

  if (isWifi) {
    return { label: 'Wi‑Fi', bars: 4 }
  }

  if (effectiveType === '5g' || connection?.downlinkMax && connection.downlinkMax >= 300) {
    return { label: '5G', bars: 4 }
  }

  if (effectiveType === '4g') {
    return {
      label: connection?.downlinkMax && connection.downlinkMax >= 300 ? '5G' : 'LTE',
      bars: 3,
    }
  }

  if (effectiveType === '3g') {
    return { label: '3G', bars: 3 }
  }

  if (effectiveType === '2g' || effectiveType === 'slow-2g') {
    return { label: '2G', bars: 2 }
  }

  if (type === 'cellular') {
    return { label: '5G', bars: 4 }
  }

  return { label: '5G', bars: 4 }
}

export function StatusBar({
  showDynamicIsland = false,
  timeLabel = '9:41',
  showBatteryLevel = false,
  compact = false,
  showSignalBars = true,
}: StatusBarProps) {
  const [batteryLevel, setBatteryLevel] = useState<number>(78)
  const [isCharging, setIsCharging] = useState<boolean>(false)
  const [networkInfo, setNetworkInfo] = useState({ label: '5G', bars: 4 })

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
    } else {
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
    }
  }, [])

  useEffect(() => {
    if (typeof navigator === 'undefined') {
      return
    }

    const connection = (navigator as Navigator & {
      connection?: NetworkInfo
    }).connection

    const updateNetworkInfo = () => {
      setNetworkInfo(getNetworkState(connection))
    }

    updateNetworkInfo()
    connection?.addEventListener?.('change', updateNetworkInfo)

    return () => {
      connection?.removeEventListener?.('change', updateNetworkInfo)
    }
  }, [])

  const batteryPercent = Math.min(100, Math.max(0, batteryLevel))
  const signalBars = Array.from({ length: 4 }, (_, index) => index < networkInfo.bars)

  return (
    <div className={`statusBar ${showDynamicIsland ? 'statusBar--withIsland' : ''} ${compact ? 'statusBar--compact' : ''}`}>
      <div className="statusBar__left">
        {timeLabel && !showBatteryLevel ? <span className="statusBar__time">{timeLabel}</span> : null}
      </div>

      <div className="statusBar__right" aria-label="status indicators">
        <span className="statusBar__network">{networkInfo.label}</span>

        {showSignalBars ? (
          <>
            <span className="statusBar__signal" aria-hidden="true">
              {signalBars.map((active, index) => (
                <span key={index} className={active ? 'is-active' : 'is-inactive'} />
              ))}
            </span>
            {networkInfo.label === 'Wi‑Fi' ? <span className="statusBar__wifi" aria-hidden="true" /> : null}
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
