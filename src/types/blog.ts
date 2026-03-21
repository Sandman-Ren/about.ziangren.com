/**
 * Blog post metadata from blog-registry.json
 */
export interface BlogPost {
  slug: string
  title: string
  summary: string
  date: string
  lastModified?: string
  tags: string[]
  keywords: string[]
  readingTime: number
  published: boolean
  featured?: boolean
  aiAssisted?: boolean
  author?: string
  coverImage?: string
  collection?: string | null
  episode?: number | null
}

/**
 * Collection metadata from collections-registry.json
 */
export interface Collection {
  slug: string
  title: string
  description: string
  ordered: boolean
  postSlugs: string[]
}

/**
 * Context for a post's position within a collection
 */
export interface CollectionContext {
  collection: Collection
  currentIndex: number
  totalEpisodes: number
  previousPost: BlogPost | null
  nextPost: BlogPost | null
  siblingPosts: BlogPost[]
}

/**
 * Search/filter parameters for blog list
 */
export interface SearchFilters {
  query?: string
  tags?: string[]
  dateFrom?: string
  dateTo?: string
  aiAssisted?: boolean
}

/**
 * Filter mode for multi-tag selection
 * - 'any': Post matches if it has ANY of the selected tags
 * - 'all': Post matches only if it has ALL selected tags
 */
export type TagFilterMode = 'any' | 'all'

/**
 * Pagination state for blog list
 */
export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
