/**
 * Formatting Utilities
 *
 * Functions for formatting dates, times, and other display values.
 */

/**
 * Format a date string for display
 *
 * @param dateString - ISO date string or date-parseable string
 * @returns Formatted date like "January 15, 2024"
 *
 * @example
 * formatDate('2024-01-15') // "January 15, 2024"
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format a date string as a relative time (e.g., "2 days ago")
 * Falls back to formatted date if more than 30 days ago
 *
 * @param dateString - ISO date string or date-parseable string
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`

  return formatDate(dateString)
}

/**
 * Format reading time for display
 *
 * @param minutes - Estimated reading time in minutes
 * @returns Formatted reading time like "5 min read"
 *
 * @example
 * formatReadingTime(5) // "5 min read"
 * formatReadingTime(0.5) // "Less than 1 min read"
 */
export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'Less than 1 min read'
  if (minutes === 1) return '1 min read'
  return `${Math.round(minutes)} min read`
}

/**
 * Truncate text to a maximum length with ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length including ellipsis
 * @param suffix - Suffix to append when truncated (default: "...")
 */
export function truncateText(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - suffix.length).trim() + suffix
}
