'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, Library, Calendar, Clock } from 'lucide-react'
import { BlogPost } from '@/types/blog'
import { formatDate } from '@/lib/formatting'

interface CollectionNavProps {
  collectionTitle: string
  collectionSlug: string
  currentIndex: number
  totalEpisodes: number
  previousPost: BlogPost | null
  nextPost: BlogPost | null
  siblingPosts: BlogPost[]
  ordered: boolean
}

export default function CollectionNav({
  collectionTitle,
  collectionSlug,
  currentIndex,
  totalEpisodes,
  previousPost,
  nextPost,
  siblingPosts,
  ordered,
}: CollectionNavProps) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Library className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {ordered ? (
              <>Episode {currentIndex} of {totalEpisodes} in{' '}</>
            ) : (
              <>Part of{' '}</>
            )}
            <Link
              href={`/blog/collections/${collectionSlug}`}
              className="font-medium text-foreground hover:underline"
            >
              {collectionTitle}
            </Link>
          </span>
        </div>
        <Link
          href={`/blog/collections/${collectionSlug}`}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </div>

      {ordered ? (
        <OrderedNav previousPost={previousPost} nextPost={nextPost} />
      ) : (
        <UnorderedNav siblingPosts={siblingPosts} />
      )}
    </div>
  )
}

function OrderedNav({
  previousPost,
  nextPost,
}: {
  previousPost: BlogPost | null
  nextPost: BlogPost | null
}) {
  if (!previousPost && !nextPost) return null

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {previousPost ? (
        <Link href={`/blog/${previousPost.slug}`} className="block group">
          <Card className="h-full card-hover-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                <ChevronLeft className="h-3 w-3" />
                <span>Previous</span>
              </div>
              <p className="text-sm font-medium leading-tight group-hover:text-foreground transition-colors line-clamp-2">
                {previousPost.title}
              </p>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link href={`/blog/${nextPost.slug}`} className="block group">
          <Card className="h-full card-hover-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground mb-2">
                <span>Next</span>
                <ChevronRight className="h-3 w-3" />
              </div>
              <p className="text-sm font-medium leading-tight text-right group-hover:text-foreground transition-colors line-clamp-2">
                {nextPost.title}
              </p>
            </CardContent>
          </Card>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

function UnorderedNav({ siblingPosts }: { siblingPosts: BlogPost[] }) {
  if (siblingPosts.length === 0) return null

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {siblingPosts.map(post => (
        <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
          <Card className="h-full card-hover-shadow">
            <CardContent className="p-4">
              <p className="text-sm font-medium leading-tight mb-2 group-hover:text-foreground transition-colors line-clamp-2">
                {post.title}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                {post.summary}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
