// Client-safe utilities that don't require Node.js modules
import { BlogPost, SearchFilters } from '@/types/blog'
import blogRegistry from '../../public/blog-registry.json'

// Fetch blog registry from imported JSON
export async function getBlogRegistry(): Promise<BlogPost[]> {
  try {
    return blogRegistry.posts
  } catch (error) {
    console.error('Error loading blog registry:', error)
    return []
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogRegistry()
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogRegistry()
  return posts.find(post => post.slug === slug && post.published) || null
}

export async function getFilteredBlogPosts(filters: SearchFilters): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  
  return allPosts.filter(post => {
    // Search in title, summary, and keywords
    if (filters.query) {
      const query = filters.query.toLowerCase()
      const searchableText = [
        post.title,
        post.summary,
        ...post.keywords,
        ...post.tags
      ].join(' ').toLowerCase()
      
      if (!searchableText.includes(query)) {
        return false
      }
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        post.tags.some(postTag => 
          postTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
      if (!hasMatchingTag) {
        return false
      }
    }
    
    // Filter by date range
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
    
    // Filter by AI assistance
    if (filters.aiAssisted !== undefined) {
      if (post.aiAssisted !== filters.aiAssisted) {
        return false
      }
    }
    
    return true
  })
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  const tagSet = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet).sort()
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.featured)
}

export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.slice(0, limit)
}

export function generateGitHubIssueUrl(post: BlogPost): string {
  const title = encodeURIComponent(`Issue with blog post: ${post.title}`)
  const body = encodeURIComponent(`
**Blog Post:** ${post.title}
**URL:** https://about.ziangren.com/blog/${post.slug}
**Issue Description:**

[Please describe the issue you found]

**Post Metadata:**
- Date: ${post.date}
- Tags: ${post.tags.join(', ')}
- AI Assisted: ${post.aiAssisted ? 'Yes' : 'No'}
`)

  const repoUrl = 'https://github.com/Sandman-Ren/about.ziangren.com'
  return `${repoUrl}/issues/new?title=${title}&body=${body}&labels=blog,content`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 1) return 'Less than 1 min read'
  if (minutes === 1) return '1 min read'
  return `${Math.round(minutes)} min read`
}
