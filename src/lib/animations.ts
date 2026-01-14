/**
 * Animation Presets
 *
 * Centralized animation configurations for Framer Motion.
 * This ensures consistent animations across all components.
 */

import { Variants, Transition } from 'framer-motion'
import { ANIMATION, SPRING } from './constants'

// ============================================================================
// Spring Configurations
// ============================================================================

/**
 * Pre-configured spring transitions
 */
export const springs = {
  /** Snappy spring for quick interactions (bubble pop-in) */
  snappy: SPRING.SNAPPY,
  /** Bouncy spring for playful interactions (avatar tap) */
  bouncy: SPRING.BOUNCY,
  /** Gentle spring for subtle animations */
  gentle: SPRING.GENTLE,
} as const

// ============================================================================
// Transition Presets
// ============================================================================

/**
 * Common transition configurations
 */
export const transitions = {
  /** Default fade-in transition */
  fadeIn: { duration: ANIMATION.DURATION.DEFAULT } as Transition,
  /** Fast transition for quick changes */
  fadeInFast: { duration: ANIMATION.DURATION.FAST } as Transition,
  /** Slow transition for page-level changes */
  fadeInSlow: { duration: ANIMATION.DURATION.SLOW } as Transition,
  /**
   * Generate a staggered transition for list items
   * @param index - The item's index in the list
   * @param baseDelay - Optional additional delay before starting
   */
  stagger: (index: number, baseDelay = 0): Transition => ({
    duration: ANIMATION.DURATION.DEFAULT,
    delay: baseDelay + index * ANIMATION.DELAY.STAGGER,
  }),
} as const

// ============================================================================
// Animation Variants
// ============================================================================

/**
 * Fade in from below - the most common animation pattern
 * Used for: Blog posts, hero sections, cards appearing on page
 */
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
}

/**
 * Fade in with scale - for emphasis
 * Used for: Avatar, profile images, featured elements
 */
export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
}

/**
 * Pop in from small - for playful elements
 * Used for: Chat bubbles, tooltips, notifications
 */
export const bubblePopIn: Variants = {
  initial: { opacity: 0, scale: 0.1, y: -10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.1, y: -10 },
}

/**
 * Simple fade - no movement
 * Used for: Overlays, subtle transitions
 */
export const fade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Slide in from left
 * Used for: Side navigation, drawers
 */
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
}

/**
 * Slide in from right
 * Used for: Side panels, notifications
 */
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
}

/**
 * Slide in from bottom - for reveal effects
 * Used for: Footer reveal, bottom sheets, snackbars
 */
export const slideInFromBottom: Variants = {
  initial: { opacity: 0, y: '100%' },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: '100%' },
}

// ============================================================================
// Tap/Press Animations
// ============================================================================

/**
 * Scale down slightly on tap - for interactive elements
 */
export const tapScale = {
  whileTap: { scale: 0.95 },
} as const

/**
 * More pronounced tap effect - for playful interactions
 */
export const tapScaleBouncy = {
  whileTap: { scale: 0.85 },
  transition: springs.bouncy,
} as const
