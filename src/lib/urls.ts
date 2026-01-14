/**
 * URL Generation Utilities
 *
 * Functions for generating URLs for various purposes.
 */

import { BlogPost } from '@/types/blog'
import { EXTERNAL_URLS } from './constants'

/**
 * Generate a GitHub issue URL for reporting problems with a blog post
 *
 * @param post - The blog post to report an issue for
 * @returns A GitHub issue URL with pre-filled title and body
 */
export function generateGitHubIssueUrl(post: BlogPost): string {
  const title = encodeURIComponent(`Issue with blog post: ${post.title}`)
  const body = encodeURIComponent(`
**Blog Post:** ${post.title}
**URL:** ${EXTERNAL_URLS.SITE_URL}/blog/${post.slug}
**Issue Description:**

[Please describe the issue you found]

**Post Metadata:**
- Date: ${post.date}
- Tags: ${post.tags.join(', ')}
- AI Assisted: ${post.aiAssisted ? 'Yes' : 'No'}
`)

  return `${EXTERNAL_URLS.GITHUB_REPO}/issues/new?title=${title}&body=${body}&labels=blog,content`
}

/**
 * Generate the canonical URL for a blog post
 *
 * @param slug - The blog post slug
 * @returns The full URL to the blog post
 */
export function getBlogPostUrl(slug: string): string {
  return `${EXTERNAL_URLS.SITE_URL}/blog/${slug}`
}

/**
 * Generate a shareable URL for a blog post on various platforms
 */
export function getShareUrl(post: BlogPost, platform: 'twitter' | 'linkedin' | 'facebook'): string {
  const postUrl = getBlogPostUrl(post.slug)
  const text = encodeURIComponent(`${post.title} - ${post.summary}`)

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${text}`
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
  }
}
