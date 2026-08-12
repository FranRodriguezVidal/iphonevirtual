import type { AppDefinition } from '../../types'

export function NotesApp({ app }: { app: AppDefinition }) {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {[
        'Create a new concept for the app shell.',
        'Test transitions on the actual device later.',
        'Polish the overall iPhone visual fidelity.'
      ].map((note, index) => (
        <div
          key={note}
          style={{
            background: index % 2 === 0 ? 'rgba(255, 240, 178, 0.72)' : 'rgba(255,255,255,0.44)',
            borderRadius: 18,
            padding: 14,
            boxShadow: '0 8px 20px rgba(24,31,53,0.08)',
            color: '#1d2333',
            fontWeight: 500,
            lineHeight: 1.5,
          }}
        >
          {note}
        </div>
      ))}

      <div style={{ fontSize: 12, color: 'rgba(32,40,59,0.68)', textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: 4 }}>
        {app.name}
      </div>
    </div>
  )
}
