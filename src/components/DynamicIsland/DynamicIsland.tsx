import './dynamicIsland.scss'

export function DynamicIsland() {
  return (
    <div className="dynamicIsland" aria-label="Dynamic Island">
      <div className="dynamicIsland__pill" />
      <div className="dynamicIsland__content">
        <span className="dynamicIsland__dot" />
        <span className="dynamicIsland__dot dynamicIsland__dot--muted" />
      </div>
    </div>
  )
}
