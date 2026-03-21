'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Library, ArrowRight } from 'lucide-react'
import { Collection } from '@/types/blog'
import { motion } from 'framer-motion'

interface CollectionsListProps {
  collections: Array<Collection & { postCount: number }>
}

export default function CollectionsList({ collections }: CollectionsListProps) {
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
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Library className="h-8 w-8 text-muted-foreground" />
              <h1 className="text-4xl font-bold tracking-tight">Collections</h1>
            </div>
            <p className="text-muted-foreground">
              Curated series of related posts on the same topic.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {collections.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 * index,
                  }}
                >
                  <Link href={`/blog/collections/${collection.slug}`} className="block h-full">
                    <Card className="h-full cursor-pointer card-hover-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">
                            {collection.ordered
                              ? `${collection.postCount}-part series`
                              : `${collection.postCount} posts`}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg leading-tight">
                          {collection.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {collection.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>View collection</span>
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-muted-foreground">
                No collections yet.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
