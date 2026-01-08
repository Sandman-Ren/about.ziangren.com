'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getBlogPost } from '@/lib/client-utils'
import { BlogPost } from '@/types/blog'
import BlogPostPage from '@/components/blog/blog-post-page'

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const pathname = usePathname()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  // Extract slug from pathname (e.g., /blog/my-post -> my-post)
  // Remove trailing slash if present
  const rawSlug = pathname.startsWith('/blog/') ? pathname.slice(6) : null
  const slug = rawSlug?.replace(/\/$/, '') || null
  const isPostPage = slug && slug.length > 0

  useEffect(() => {
    async function loadPost() {
      if (!isPostPage || !slug) {
        setLoading(false)
        return
      }

      try {
        const postData = await getBlogPost(slug)
        setPost(postData)
      } catch (error) {
        console.error('Failed to load post metadata:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug, isPostPage])

  // Blog list page - just render children directly
  if (!isPostPage) {
    return (
      <div className="h-full flex flex-col bg-background">
        {children}
      </div>
    )
  }

  // Blog post page - show loading state
  if (loading) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading post...</p>
          </div>
        </div>
      </div>
    )
  }

  // Blog post page - post not found
  if (!post) {
    return (
      <div className="h-full flex flex-col bg-background">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
            <p className="text-muted-foreground">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
      </div>
    )
  }

  // Blog post page - render with BlogPostPage wrapper
  return (
    <div className="h-full flex flex-col bg-background">
      <BlogPostPage post={post}>
        {children}
      </BlogPostPage>
    </div>
  )
}
