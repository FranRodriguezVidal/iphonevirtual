import type { AppDefinition } from '../../types'

export function SettingsApp({ app }: { app: AppDefinition }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {[
        'General',
        'Privacy & Security',
        'Display & Brightness',
      ].map((item) => (
        <div
          key={item}
          style={{
            background: 'rgba(255,255,255,0.42)',
            borderRadius: 18,
            padding: '13px 14px',
            color: '#1d2333',
            fontWeight: 600,
            boxShadow: '0 8px 20px rgba(24,31,53,0.08)',
          }}
        >
          {item}
        </div>
      ))}

      <div style={{ fontSize: 12, color: 'rgba(32,40,59,0.68)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: 4 }}>
        {app.name}
      </div>
    </div>
  )
}
