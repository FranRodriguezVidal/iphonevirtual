import type { AppDefinition } from '../../types'

export function PhotosApp({ app }: { app: AppDefinition }) {
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
        {[
          'linear-gradient(135deg, rgba(90,110,255,0.9), rgba(53,76,175,0.85))',
          'linear-gradient(135deg, rgba(255,180,100,0.95), rgba(234,104,90,0.88))',
          'linear-gradient(135deg, rgba(116,203,162,0.95), rgba(52,128,109,0.8))',
          'linear-gradient(135deg, rgba(190,136,255,0.9), rgba(123,91,214,0.82))',
          'linear-gradient(135deg, rgba(255,144,180,0.9), rgba(202,96,124,0.8))',
          'linear-gradient(135deg, rgba(116,166,255,0.9), rgba(67,94,186,0.8))',
        ].map((background, index) => (
          <div
            key={index}
            style={{
              aspectRatio: '0.96',
              borderRadius: 18,
              background,
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2), 0 10px 18px rgba(25,37,68,0.12)',
            }}
          />
        ))}
      </div>

      <div style={{ background: 'rgba(255,255,255,0.42)', borderRadius: 18, padding: 14, boxShadow: '0 8px 20px rgba(24,31,53,0.08)' }}>
        <div style={{ fontSize: 12, color: 'rgba(32, 40, 59, 0.68)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
          {app.name}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#1d2333', fontWeight: 600 }}>
          <span>Recent</span>
          <span style={{ color: 'rgba(29,35,51,0.62)' }}>12 items</span>
        </div>
      </div>
    </div>
  )
}
