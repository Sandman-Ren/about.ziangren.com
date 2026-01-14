'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { EASTER_EGG } from '@/lib/constants'

interface UseEasterEggOptions<T> {
  /** Array of items to cycle through when easter egg is activated */
  items: T[]
  /** Number of clicks required to activate (default: 5) */
  clickThreshold?: number
  /** Time window for clicks in ms (default: 3000) */
  clickWindowMs?: number
  /** Duration before item auto-hides in ms (default: 3000) */
  hideTimeoutMs?: number
}

interface UseEasterEggReturn<T> {
  /** Whether the easter egg has been activated */
  isEnabled: boolean
  /** Whether the current item is visible */
  isVisible: boolean
  /** Current item index */
  currentIndex: number
  /** Current item from the items array */
  currentItem: T | undefined
  /** Click handler to attach to the trigger element */
  handleClick: () => void
  /** Mouse enter handler to pause auto-hide */
  handleMouseEnter: () => void
  /** Mouse leave handler to resume auto-hide */
  handleMouseLeave: () => void
}

/**
 * Custom hook for managing easter egg interactions
 *
 * Implements the pattern of:
 * 1. User clicks N times within a time window to activate
 * 2. Once activated, each click cycles to the next item
 * 3. Items auto-hide after a timeout unless hovered
 *
 * @example
 * const quotes = ['Quote 1', 'Quote 2', 'Quote 3']
 *
 * function MyComponent() {
 *   const {
 *     isEnabled,
 *     isVisible,
 *     currentItem,
 *     handleClick,
 *     handleMouseEnter,
 *     handleMouseLeave,
 *   } = useEasterEgg({ items: quotes })
 *
 *   return (
 *     <div onClick={handleClick}>
 *       Click me!
 *       {isEnabled && isVisible && (
 *         <div
 *           onMouseEnter={handleMouseEnter}
 *           onMouseLeave={handleMouseLeave}
 *         >
 *           {currentItem}
 *         </div>
 *       )}
 *     </div>
 *   )
 * }
 */
export function useEasterEgg<T>({
  items,
  clickThreshold = EASTER_EGG.CLICK_THRESHOLD,
  clickWindowMs = EASTER_EGG.CLICK_WINDOW_MS,
  hideTimeoutMs = EASTER_EGG.BUBBLE_TIMEOUT_MS,
}: UseEasterEggOptions<T>): UseEasterEggReturn<T> {
  const [clickCount, setClickCount] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const clearHideTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const startHideTimeout = useCallback(() => {
    clearHideTimeout()
    timeoutRef.current = setTimeout(() => {
      if (!isHovering) {
        setIsVisible(false)
      }
    }, hideTimeoutMs)
  }, [clearHideTimeout, hideTimeoutMs, isHovering])

  const handleClick = useCallback(() => {
    const now = Date.now()

    // Reset counter if too much time has passed since last click
    if (now - lastClickTime > clickWindowMs) {
      setClickCount(1)
    } else {
      setClickCount(prev => prev + 1)
    }
    setLastClickTime(now)

    if (!isEnabled) {
      // Check if we've reached the activation threshold
      // Note: clickCount hasn't updated yet, so we check >= clickThreshold - 1
      if (clickCount >= clickThreshold - 1 && now - lastClickTime <= clickWindowMs) {
        setIsEnabled(true)
        setClickCount(0)
        setCurrentIndex(0)
        setIsVisible(true)
        startHideTimeout()
      }
    } else {
      // Easter egg is enabled - cycle to next item
      setCurrentIndex(prev => (prev + 1) % items.length)
      setIsVisible(true)
      startHideTimeout()
    }
  }, [
    clickCount,
    lastClickTime,
    isEnabled,
    clickWindowMs,
    clickThreshold,
    items.length,
    startHideTimeout,
  ])

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true)
    clearHideTimeout()
  }, [clearHideTimeout])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    if (isVisible) {
      startHideTimeout()
    }
  }, [isVisible, startHideTimeout])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearHideTimeout()
  }, [clearHideTimeout])

  return {
    isEnabled,
    isVisible,
    currentIndex,
    currentItem: items[currentIndex],
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
  }
}
