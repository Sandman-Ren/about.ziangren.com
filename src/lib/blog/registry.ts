/**
 * Blog Registry Module
 *
 * Functions for accessing blog post data from the registry.
 * The registry is a JSON file that contains metadata for all blog posts.
 */

import { BlogPost } from '@/types/blog'
import blogRegistry from '../../../public/blog-registry.json'

/**
 * Get all posts from the registry (raw, unfiltered)
 */
export function getBlogRegistry(): BlogPost[] {
  return blogRegistry.posts
}

/**
 * Get all published posts, sorted by date descending (newest first)
 */
export function getAllBlogPosts(): BlogPost[] {
  return getBlogRegistry()
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get a single post by slug
 * @returns The post if found and published, null otherwise
 */
export function getBlogPost(slug: string): BlogPost | null {
  return getBlogRegistry().find(post => post.slug === slug && post.published) ?? null
}

/**
 * Get featured posts only
 */
export function getFeaturedPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured)
}

/**
 * Get recent posts with optional limit
 * @param limit Maximum number of posts to return (default: 5)
 */
export function getRecentPosts(limit = 5): BlogPost[] {
  return getAllBlogPosts().slice(0, limit)
}

/**
 * Get all unique tags from published posts, sorted alphabetically
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  getAllBlogPosts().forEach(post => post.tags.forEach(tag => tagSet.add(tag)))
  return Array.from(tagSet).sort()
}

// ============================================================================
// Async versions for backward compatibility
// These can be removed once all consumers are updated
// ============================================================================

/** @deprecated Use getBlogRegistry() instead - async wrapper for backward compatibility */
export async function getBlogRegistryAsync(): Promise<BlogPost[]> {
  return getBlogRegistry()
}

/** @deprecated Use getAllBlogPosts() instead - async wrapper for backward compatibility */
export async function getAllBlogPostsAsync(): Promise<BlogPost[]> {
  return getAllBlogPosts()
}

/** @deprecated Use getBlogPost() instead - async wrapper for backward compatibility */
export async function getBlogPostAsync(slug: string): Promise<BlogPost | null> {
  return getBlogPost(slug)
}

/** @deprecated Use getAllTags() instead - async wrapper for backward compatibility */
export async function getAllTagsAsync(): Promise<string[]> {
  return getAllTags()
}

/** @deprecated Use getFeaturedPosts() instead - async wrapper for backward compatibility */
export async function getFeaturedPostsAsync(): Promise<BlogPost[]> {
  return getFeaturedPosts()
}

/** @deprecated Use getRecentPosts() instead - async wrapper for backward compatibility */
export async function getRecentPostsAsync(limit = 5): Promise<BlogPost[]> {
  return getRecentPosts(limit)
}
