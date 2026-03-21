/**
 * Centralized constants for the application
 * Extracted from various components to improve maintainability
 */

// ============================================================================
// Pagination
// ============================================================================

/** Number of blog posts to display per page */
export const POSTS_PER_PAGE = 6

// ============================================================================
// Easter Egg Configuration (HeroSection avatar interaction)
// ============================================================================

export const EASTER_EGG = {
  /** Number of clicks required to activate the easter egg */
  CLICK_THRESHOLD: 5,
  /** Time window (ms) within which clicks must occur */
  CLICK_WINDOW_MS: 3000,
  /** Duration (ms) before the quote bubble auto-hides */
  BUBBLE_TIMEOUT_MS: 3000,
} as const

// ============================================================================
// Animation Timing
// ============================================================================

export const ANIMATION = {
  DURATION: {
    /** Fast transitions (hover states, small changes) */
    FAST: 0.3,
    /** Default animation duration */
    DEFAULT: 0.5,
    /** Slower animations (page transitions) */
    SLOW: 0.6,
  },
  DELAY: {
    /** Delay between staggered items in a list */
    STAGGER: 0.1,
    /** Short delay for sequential animations */
    SHORT: 0.1,
    /** Medium delay */
    MEDIUM: 0.2,
    /** Longer delay for later items */
    LONG: 0.3,
  },
} as const

// ============================================================================
// Spring Physics (Framer Motion)
// ============================================================================

export const SPRING = {
  /** Snappy spring for quick interactions (bubble pop) */
  SNAPPY: {
    type: 'spring' as const,
    stiffness: 700,
    damping: 25,
    mass: 0.8,
  },
  /** Bouncy spring for playful interactions (avatar tap) */
  BOUNCY: {
    type: 'spring' as const,
    stiffness: 500,
    damping: 15,
  },
  /** Gentle spring for subtle animations */
  GENTLE: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
  },
} as const

// ============================================================================
// External URLs
// ============================================================================

export const EXTERNAL_URLS = {
  GITHUB_PROFILE: 'https://github.com/Sandman-Ren',
  GITHUB_REPO: 'https://github.com/Sandman-Ren/about.ziangren.com',
  LINKEDIN: 'https://linkedin.com/in/ziangren',
  SITE_URL: 'https://about.ziangren.com',
} as const

// ============================================================================
// UI Configuration
// ============================================================================

export const UI = {
  /** Maximum number of tags to show before "show more" */
  MAX_VISIBLE_TAGS: 3,
  /** Number of page buttons to show on each side of current page */
  PAGINATION_WINDOW: 2,
} as const
