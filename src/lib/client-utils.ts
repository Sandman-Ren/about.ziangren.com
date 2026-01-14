/**
 * Client Utilities - Re-export Barrel
 *
 * This file re-exports from the new modular structure for backward compatibility.
 * New code should import directly from the specific modules:
 * - @/lib/blog/registry - Blog post data access
 * - @/lib/blog/filters - Post filtering
 * - @/lib/formatting - Date and time formatting
 * - @/lib/urls - URL generation
 */

// Re-export blog registry functions (async versions for backward compatibility)
export {
  getBlogRegistryAsync as getBlogRegistry,
  getAllBlogPostsAsync as getAllBlogPosts,
  getBlogPostAsync as getBlogPost,
  getAllTagsAsync as getAllTags,
  getFeaturedPostsAsync as getFeaturedPosts,
  getRecentPostsAsync as getRecentPosts,
} from './blog/registry'

// Re-export filtering (wrapped for backward compatibility)
import { filterPosts } from './blog/filters'
import { getAllBlogPosts } from './blog/registry'
import { SearchFilters } from '@/types/blog'

export async function getFilteredBlogPosts(filters: SearchFilters) {
  const allPosts = getAllBlogPosts()
  return filterPosts(allPosts, filters)
}

// Re-export formatting utilities
export { formatDate, formatReadingTime } from './formatting'

// Re-export URL utilities
export { generateGitHubIssueUrl } from './urls'
