import type { ReactNode } from 'react'
import { useGesture } from '../../hooks/useGesture'

type GestureHandlerProps = {
  children: ReactNode
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  className?: string
  threshold?: number
}

export function GestureHandler({
  children,
  onSwipeUp,
  onSwipeDown,
  className,
  threshold,
}: GestureHandlerProps) {
  const { handlers } = useGesture({
    onSwipeUp,
    onSwipeDown,
    threshold,
  })

  return (
    <div className={className} {...handlers}>
      {children}
    </div>
  )
}
