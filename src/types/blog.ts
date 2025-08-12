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
}

export interface BlogPostMatter {
  title: string
  summary: string
  date: string
  lastModified?: string
  tags: string[]
  keywords: string[]
  published: boolean
  featured?: boolean
  aiAssisted?: boolean
  author?: string
  coverImage?: string
}

export interface SearchFilters {
  query?: string
  tags?: string[]
  dateFrom?: string
  dateTo?: string
  aiAssisted?: boolean
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalPosts: number
  postsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
