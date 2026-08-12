import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'

export type GestureCallback = () => void

type GestureState = {
  x: number
  y: number
}

export function useGesture({
  onSwipeUp,
  onSwipeDown,
  threshold = 90,
}: {
  onSwipeUp?: GestureCallback
  onSwipeDown?: GestureCallback
  threshold?: number
}) {
  const startRef = useRef<GestureState | null>(null)
  const lastRef = useRef<GestureState | null>(null)

  const resetGesture = () => {
    startRef.current = null
    lastRef.current = null
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    startRef.current = {
      x: event.clientX,
      y: event.clientY,
    }
    lastRef.current = startRef.current
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!startRef.current) {
      return
    }

    lastRef.current = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    if (!startRef.current || !lastRef.current) {
      return
    }

    const deltaY = lastRef.current.y - startRef.current.y
    const deltaX = lastRef.current.x - startRef.current.x

    if (Math.abs(deltaY) > threshold && deltaY < 0) {
      onSwipeUp?.()
    }

    if (Math.abs(deltaY) > threshold && deltaY > 0) {
      onSwipeDown?.()
    }

    if (Math.abs(deltaX) > threshold) {
      // Reserved for future horizontal gestures.
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId)
    resetGesture()
  }

  return {
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: () => resetGesture(),
    },
  }
}
