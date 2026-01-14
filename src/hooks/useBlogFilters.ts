'use client'

import { useState, useMemo, useEffect, useCallback } from 'react'
import { BlogPost, SearchFilters, TagFilterMode } from '@/types/blog'
import { POSTS_PER_PAGE } from '@/lib/constants'

interface UseBlogFiltersOptions {
  /** All blog posts to filter */
  posts: BlogPost[]
  /** Initial filter values */
  initialFilters?: Partial<SearchFilters>
  /** Number of posts per page (default: 6) */
  postsPerPage?: number
}

interface UseBlogFiltersReturn {
  // Filtered/paginated results
  /** Posts after applying all filters */
  filteredPosts: BlogPost[]
  /** Posts for the current page only */
  paginatedPosts: BlogPost[]
  /** All unique tags from the post collection */
  allTags: string[]

  // Pagination state
  /** Current page number (1-indexed) */
  currentPage: number
  /** Total number of pages */
  totalPages: number
  /** Set the current page */
  setCurrentPage: (page: number) => void

  // Search state
  /** Current search query */
  searchQuery: string
  /** Update the search query */
  setSearchQuery: (query: string) => void

  // Tag state
  /** Currently selected tags */
  selectedTags: string[]
  /** Add a tag to the selection */
  addTag: (tag: string) => void
  /** Remove a tag from the selection */
  removeTag: (tag: string) => void
  /** How to match tags: 'any' (OR) or 'all' (AND) */
  filterMode: TagFilterMode
  /** Set the tag filter mode */
  setFilterMode: (mode: TagFilterMode) => void

  // Featured filter
  /** Whether to show only featured posts */
  showOnlyFeatured: boolean
  /** Toggle the featured-only filter */
  setShowOnlyFeatured: (show: boolean) => void

  // Actions
  /** Clear all filters and reset to default state */
  clearFilters: () => void
  /** Whether any filters are currently active */
  hasActiveFilters: boolean
}

/**
 * Custom hook for managing blog list filtering, search, and pagination
 *
 * Consolidates the 7+ useState calls in BlogList into a single, reusable hook.
 *
 * @example
 * function BlogList({ posts }: { posts: BlogPost[] }) {
 *   const {
 *     paginatedPosts,
 *     searchQuery,
 *     setSearchQuery,
 *     currentPage,
 *     totalPages,
 *     setCurrentPage,
 *     // ... more state
 *   } = useBlogFilters({ posts })
 *
 *   return (
 *     <>
 *       <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
 *       {paginatedPosts.map(post => <PostCard key={post.slug} post={post} />)}
 *       <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} />
 *     </>
 *   )
 * }
 */
export function useBlogFilters({
  posts,
  initialFilters = {},
  postsPerPage = POSTS_PER_PAGE,
}: UseBlogFiltersOptions): UseBlogFiltersReturn {
  // Core filter state
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(initialFilters.query ?? '')
  const [selectedTags, setSelectedTags] = useState<string[]>(initialFilters.tags ?? [])
  const [filterMode, setFilterMode] = useState<TagFilterMode>('any')
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
    return Array.from(tagSet).sort()
  }, [posts])

  // Filter posts based on all criteria
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Text search in title, summary, and tags
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const searchableText = [
          post.title,
          post.summary,
          ...post.tags,
        ].join(' ').toLowerCase()

        if (!searchableText.includes(query)) {
          return false
        }
      }

      // Tag filtering
      if (selectedTags.length > 0) {
        const matchesTags = filterMode === 'all'
          ? selectedTags.every(tag => post.tags.includes(tag))
          : selectedTags.some(tag => post.tags.includes(tag))

        if (!matchesTags) {
          return false
        }
      }

      // Featured filter
      if (showOnlyFeatured && !post.featured) {
        return false
      }

      return true
    })
  }, [posts, searchQuery, selectedTags, filterMode, showOnlyFeatured])

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage, postsPerPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedTags, filterMode, showOnlyFeatured])

  // Tag management
  const addTag = useCallback((tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags(prev => [...prev, tag])
    }
  }, [selectedTags])

  const removeTag = useCallback((tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }, [])

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchQuery('')
    setSelectedTags([])
    setFilterMode('any')
    setShowOnlyFeatured(false)
    setCurrentPage(1)
  }, [])

  const hasActiveFilters = searchQuery !== '' || selectedTags.length > 0 || showOnlyFeatured

  return {
    // Results
    filteredPosts,
    paginatedPosts,
    allTags,

    // Pagination
    currentPage,
    totalPages,
    setCurrentPage,

    // Search
    searchQuery,
    setSearchQuery,

    // Tags
    selectedTags,
    addTag,
    removeTag,
    filterMode,
    setFilterMode,

    // Featured
    showOnlyFeatured,
    setShowOnlyFeatured,

    // Actions
    clearFilters,
    hasActiveFilters,
  }
}
