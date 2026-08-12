import './statusBar.scss'

type StatusBarProps = {
  showDynamicIsland?: boolean
  timeLabel?: string
}

export function StatusBar({ showDynamicIsland = false, timeLabel = '9:41' }: StatusBarProps) {
  return (
    <div className={`statusBar ${showDynamicIsland ? 'statusBar--withIsland' : ''}`}>
      <div className="statusBar__left">
        <span className="statusBar__time">{timeLabel}</span>
      </div>

      <div className="statusBar__right" aria-label="status indicators">
        <span className="statusBar__signal" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="statusBar__wifi" aria-hidden="true" />
        <span className="statusBar__battery" aria-hidden="true">
          <span className="batteryFill" />
        </span>
      </div>
    </div>
  )
}
