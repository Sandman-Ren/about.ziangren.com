'use client'

import { BlogPost, CollectionContext } from '@/types/blog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Calendar, Clock, ArrowLeft, ExternalLink, MessageCircle, Sparkles, User } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { generateGitHubIssueUrl } from '@/lib/urls'
import { formatDate } from '@/lib/formatting'
import { fade } from '@/lib/animations'
import { ANIMATION } from '@/lib/constants'
import Image from 'next/image'
import CollectionNav from '@/components/blog/collection-nav'

interface BlogPostPageProps {
  post: BlogPost
  collectionContext?: CollectionContext | null
  children?: React.ReactNode
}

export default function BlogPostPage({ post, collectionContext, children }: BlogPostPageProps) {
  const issueUrl = generateGitHubIssueUrl(post)

  return (
    <article>
      {/* Cover Image */}
      {post.coverImage && (
        <motion.div
          className="relative w-full h-64 sm:h-80 lg:h-96 overflow-hidden"
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

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Blog Link + Article Header: single animation group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center gap-2">
            <Link href="/blog">
              <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3.5 w-3.5" />
                Blog
              </Button>
            </Link>
            {collectionContext && (
              <Link href={`/blog/collections/${collectionContext.collection.slug}`}>
                <Button variant="outline" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {collectionContext.collection.title}
                </Button>
              </Link>
            )}
          </div>

        <header
          className="mb-10"
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
            <span className="text-border hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <span className="text-border hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime} min read</span>
            </div>
            {post.lastModified && post.lastModified !== post.date && (
              <>
                <span className="text-border hidden sm:inline">•</span>
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
                <Badge variant="outline" className="hover:bg-muted cursor-pointer transition-colors py-1.5 px-3 sm:py-0.5 sm:px-2.5">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* AI Assisted Notice */}
          {post.aiAssisted && (
            <div className="flex items-center gap-2.5 p-3 bg-muted/40 border border-border/50 rounded-lg text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>
                This post was written with AI assistance to help structure content and improve clarity.
              </span>
            </div>
          )}

          <Separator className="mt-8" />
        </header>
        </motion.div>

        {/* Article Content + Footer: single animation group */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <div
            className="prose max-w-none dark:prose-invert"
          >
            {children}
          </div>

          <footer
            className="mt-16"
          >
          <Separator className="mb-8" />

          {/* Collection Navigation */}
          {collectionContext && (
            <div className="mb-8">
              <CollectionNav
                collectionTitle={collectionContext.collection.title}
                collectionSlug={collectionContext.collection.slug}
                currentIndex={collectionContext.currentIndex}
                totalEpisodes={collectionContext.totalEpisodes}
                previousPost={collectionContext.previousPost}
                nextPost={collectionContext.nextPost}
                siblingPosts={collectionContext.siblingPosts}
                ordered={collectionContext.collection.ordered}
              />
            </div>
          )}

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
        </footer>
        </motion.div>
        </div>
    </article>
  )
}
