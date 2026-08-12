import { useEffect, useMemo, useState } from 'react'

export function useDeviceTime() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date())
    }, 30000)

    return () => window.clearInterval(timer)
  }, [])

  return useMemo(() => {
    const timeLabel = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(now)

    const dateLabel = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }).format(now)

    const shortDate = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(now)

    return {
      timeLabel,
      dateLabel,
      shortDate,
      hour: now.getHours(),
      minute: now.getMinutes(),
    }
  }, [now])
}
