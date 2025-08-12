'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, ArrowLeft, ExternalLink, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getBlogPost, generateGitHubIssueUrl, formatDate, formatReadingTime } from '@/lib/client-utils'
import { BlogPost } from '@/types/blog'

interface BlogLayoutProps {
  slug: string
  children: React.ReactNode
}

export default function BlogLayout({ slug, children }: BlogLayoutProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
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
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
          <p className="text-muted-foreground mb-4">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  const issueUrl = generateGitHubIssueUrl(post)

  return (
    <article className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Blog Link */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/blog">
            <Button variant="ghost" size="sm" className="p-0 h-auto text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Featured Badge */}
          {post.featured && (
            <Badge variant="secondary" className="mb-4">
              Featured Post
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {post.summary}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{formatReadingTime(post.readingTime)}</span>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
            )}
            {post.lastModified && post.lastModified !== post.date && (
              <div className="flex items-center gap-2">
                <span>Updated {formatDate(post.lastModified)}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="hover:bg-muted cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* AI Assisted Notice */}
          {post.aiAssisted && (
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <span className="text-lg">🤖</span>
              <span>
                This post was written with AI assistance to help structure content and improve clarity.
              </span>
            </div>
          )}

          <Separator className="mt-8" />
        </motion.header>

        {/* Article Content */}
        <motion.div
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-pre:bg-muted prose-pre:border prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {children}
        </motion.div>

        {/* Footer */}
        <motion.footer
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Separator className="mb-8" />
          
          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-muted/50 rounded-lg">
            <div>
              <h3 className="font-semibold mb-2">Found this helpful?</h3>
              <p className="text-sm text-muted-foreground">
                Have questions, suggestions, or spotted an issue? Let me know!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={issueUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Report Issue
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/blog">
                  More Posts
                </Link>
              </Button>
            </div>
          </div>

          {/* Keywords for SEO (hidden) */}
          <div className="sr-only">
            Keywords: {post.keywords.join(', ')}
          </div>
        </motion.footer>
      </div>
    </article>
  )
}
