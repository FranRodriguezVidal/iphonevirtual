import type { AppDefinition } from '../../types'

export function MessagesApp({ app }: { app: AppDefinition }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {[
        { name: 'Marta', preview: 'You still need to send me the files.', tint: '#dfe6ff' },
        { name: 'Leo', preview: 'Dinner at 8?', tint: '#e8f8ef' },
        { name: 'Mom', preview: 'Your appointment is tomorrow.', tint: '#fff4da' },
      ].map((message) => (
        <div
          key={message.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.44)',
            borderRadius: 18,
            padding: 12,
            boxShadow: '0 8px 20px rgba(24,31,53,0.08)',
          }}
        >
          <div style={{ width: 42, height: 42, borderRadius: 14, background: message.tint, display: 'grid', placeItems: 'center', fontWeight: 700, color: '#1f2432' }}>
            {message.name[0]}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#1d2333', marginBottom: 3 }}>{message.name}</div>
            <div style={{ fontSize: 13, color: 'rgba(29,35,51,0.72)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {message.preview}
            </div>
          </div>
        </div>
      ))}

      <div style={{ fontSize: 12, color: 'rgba(32,40,59,0.68)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: 4 }}>
        {app.name}
      </div>
    </div>
  )
}
