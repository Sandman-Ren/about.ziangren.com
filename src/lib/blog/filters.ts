/**
 * Blog Filters Module
 *
 * Functions for filtering blog posts based on various criteria.
 */

import { BlogPost, SearchFilters, TagFilterMode } from '@/types/blog'

/**
 * Filter posts based on search criteria
 *
 * @param posts - Array of posts to filter
 * @param filters - Search filter criteria
 * @param tagMode - How to match multiple tags: 'any' (OR) or 'all' (AND)
 * @returns Filtered array of posts
 */
export function filterPosts(
  posts: BlogPost[],
  filters: SearchFilters,
  tagMode: TagFilterMode = 'any'
): BlogPost[] {
  return posts.filter(post => {
    // Text search in title, summary, keywords, and tags
    if (filters.query) {
      const query = filters.query.toLowerCase()
      const searchableText = [
        post.title,
        post.summary,
        ...post.keywords,
        ...post.tags,
      ].join(' ').toLowerCase()

      if (!searchableText.includes(query)) {
        return false
      }
    }

    // Tag filtering
    if (filters.tags && filters.tags.length > 0) {
      const matchesTags = tagMode === 'all'
        ? filters.tags.every(tag => post.tags.includes(tag))
        : filters.tags.some(tag =>
            post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
          )
      if (!matchesTags) {
        return false
      }
    }

    // Date range filtering
    const postDate = new Date(post.date)

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      if (postDate < fromDate) {
        return false
      }
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      if (postDate > toDate) {
        return false
      }
    }

    // AI assistance filter
    if (filters.aiAssisted !== undefined) {
      if (post.aiAssisted !== filters.aiAssisted) {
        return false
      }
    }

    return true
  })
}

/**
 * Check if a post matches a text query
 * Searches in title, summary, keywords, and tags
 */
export function matchesQuery(post: BlogPost, query: string): boolean {
  if (!query) return true

  const normalizedQuery = query.toLowerCase()
  const searchableText = [
    post.title,
    post.summary,
    ...post.keywords,
    ...post.tags,
  ].join(' ').toLowerCase()

  return searchableText.includes(normalizedQuery)
}

/**
 * Check if a post has any of the specified tags
 */
export function hasAnyTag(post: BlogPost, tags: string[]): boolean {
  if (!tags || tags.length === 0) return true
  return tags.some(tag =>
    post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
  )
}

/**
 * Check if a post has all of the specified tags
 */
export function hasAllTags(post: BlogPost, tags: string[]): boolean {
  if (!tags || tags.length === 0) return true
  return tags.every(tag => post.tags.includes(tag))
}
