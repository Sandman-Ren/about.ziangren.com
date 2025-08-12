'use client'

import { useEffect, useState } from 'react'
import { getAllBlogPosts } from '@/lib/client-utils'
import BlogList from '@/components/blog/blog-list'
import { BlogPost } from '@/types/blog'

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const blogPosts = await getAllBlogPosts()
        setPosts(blogPosts)
      } catch (error) {
        console.error('Failed to load blog posts:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <BlogList posts={posts} />
    </main>
  )
}
