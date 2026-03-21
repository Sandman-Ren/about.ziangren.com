'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, Clock, Library } from 'lucide-react'
import { Collection, BlogPost } from '@/types/blog'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/formatting'

interface CollectionPageProps {
  collection: Collection
  posts: BlogPost[]
}

export default function CollectionPage({ collection, posts }: CollectionPageProps) {
  const router = useRouter()

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Button>
          </div>

          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Library className="h-5 w-5 text-muted-foreground" />
              <Badge variant="secondary" className="text-xs">
                {collection.ordered
                  ? `${posts.length}-part series`
                  : `${posts.length} posts`}
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              {collection.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {collection.description}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {collection.ordered ? (
            <OrderedList posts={posts} />
          ) : (
            <UnorderedGrid posts={posts} />
          )}
        </div>
      </div>
    </div>
  )
}

function OrderedList({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div className="absolute left-[19px] top-8 bottom-8 w-px bg-border" />

      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1 * index,
            }}
          >
            <Link href={`/blog/${post.slug}`} className="block group">
              <div className="flex gap-4">
                {/* Episode number circle */}
                <div className="relative z-10 flex items-center justify-center w-10 h-10 shrink-0 rounded-full bg-background border-2 border-border text-sm font-semibold text-muted-foreground group-hover:border-foreground group-hover:text-foreground transition-colors">
                  {index + 1}
                </div>

                {/* Content card */}
                <Card className="flex-1 cursor-pointer card-hover-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base leading-tight group-hover:text-foreground transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 text-sm">
                      {post.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function UnorderedGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1 * index,
          }}
        >
          <Link href={`/blog/${post.slug}`} className="block h-full">
            <Card className="h-full cursor-pointer card-hover-shadow">
              <CardHeader>
                <CardTitle className="text-lg leading-tight">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {post.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs py-0.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
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
        </motion.div>
      ))}
    </div>
  )
}
