'use client'

import { BlogPost } from '@/types/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, ArrowLeft, ExternalLink, MessageCircle, User } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { generateGitHubIssueUrl } from '@/lib/urls'
import { formatDate } from '@/lib/formatting'
import { slideInLeft, fade } from '@/lib/animations'
import { ANIMATION } from '@/lib/constants'
import Image from 'next/image'

interface BlogPostPageProps {
  post: BlogPost
  children?: React.ReactNode
}

export default function BlogPostPage({ post, children }: BlogPostPageProps) {
  const issueUrl = generateGitHubIssueUrl(post)

  return (
    <article className="flex-1 flex flex-col overflow-hidden">
      {/* Cover Image - Full width hero (fixed at top) */}
      {post.coverImage && (
        <motion.div
          className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden flex-shrink-0"
          initial="initial"
          animate="animate"
          variants={fade}
          transition={{ duration: ANIMATION.DURATION.SLOW }}
        >
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </motion.div>
      )}

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Blog Link */}
        <motion.div
          className="mb-8"
          initial="initial"
          animate="animate"
          variants={slideInLeft}
          transition={{ duration: ANIMATION.DURATION.DEFAULT }}
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
          className="mb-10"
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-5 leading-tight">
            {post.title}
          </h1>

          {/* Summary */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 leading-relaxed">
            {post.summary}
          </p>

          {/* Meta Information - Redesigned */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-6">
            {post.author && (
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.author}</span>
              </div>
            )}
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            {post.lastModified && post.lastModified !== post.date && (
              <>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="italic">Updated {formatDate(post.lastModified)}</span>
                </div>
              </>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="hover:bg-muted cursor-pointer transition-colors">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* AI Assisted Notice */}
          {post.aiAssisted && (
            <div className="flex items-center gap-2.5 p-3 bg-muted/40 border border-border/50 rounded-lg text-sm text-muted-foreground">
              <span className="text-lg">🤖</span>
              <span>
                This post was written with AI assistance to help structure content and improve clarity.
              </span>
            </div>
          )}

          <Separator className="mt-8" />
        </motion.header>

        {/* Article Content - Optimized prose container */}
        <motion.div
          className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:font-semibold prose-headings:tracking-tight
            prose-p:text-foreground/90 prose-p:leading-relaxed
            prose-a:text-primary prose-a:decoration-primary/30 prose-a:underline-offset-4 hover:prose-a:decoration-primary
            prose-strong:text-foreground prose-strong:font-semibold
            prose-blockquote:border-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:not-italic
            prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium
            prose-code:before:content-none prose-code:after:content-none
            prose-img:rounded-lg prose-img:border prose-img:border-border
            prose-hr:border-border"
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
      </div>
    </article>
  )
}
