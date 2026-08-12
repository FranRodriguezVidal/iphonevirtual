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
    const timeLabel = new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(now)

    const weekday = new Intl.DateTimeFormat('es-ES', { weekday: 'short' }).format(now)
    const month = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(now)
    const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
    const dateLabel = `${formattedWeekday} ${now.getDate()} ${month}`

    const shortDate = new Intl.DateTimeFormat('es-ES', {
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
