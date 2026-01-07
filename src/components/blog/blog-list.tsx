'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Calendar, Clock, Search, X } from 'lucide-react'
import { BlogPost, SearchFilters } from '@/types/blog'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/client-utils'

interface BlogListProps {
  posts: BlogPost[]
  initialFilters?: Partial<SearchFilters>
}

const POSTS_PER_PAGE = 6

export default function BlogList({ posts, initialFilters = {} }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState(initialFilters.query || '')
  // Multi-tag selection state
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filterMode, setFilterMode] = useState<'any' | 'all'>('any')
  const [tagPicker, setTagPicker] = useState('')
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

  // Filter posts based on search criteria
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      // Search in title, summary, and tags
      const searchInContent = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(searchInContent) ||
        post.summary.toLowerCase().includes(searchInContent) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchInContent))

      // Filter by selected tags (any/all)
      const matchesTag = selectedTags.length === 0
        ? true
        : filterMode === 'all'
          ? selectedTags.every(t => post.tags.includes(t))
          : selectedTags.some(t => post.tags.includes(t))

      // Filter by featured status
      const matchesFeatured = !showOnlyFeatured || post.featured

      return matchesSearch && matchesTag && matchesFeatured
    })
  }, [posts, searchQuery, selectedTags, filterMode, showOnlyFeatured])

  // Paginate filtered posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedTags, filterMode, showOnlyFeatured])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setFilterMode('any')
    setShowOnlyFeatured(false)
    setTagPicker('')
    setCurrentPage(1)
  }

  // Helpers to manage selected tags
  const addTag = (tag: string) => {
    if (!tag) return
    setSelectedTags(prev => (prev.includes(tag) ? prev : [...prev, tag]))
  }
  const removeTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Fixed Header Section */}
      <div className="flex-shrink-0 px-4 sm:px-6 lg:px-8 pt-8 pb-4 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-4xl font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Blog Posts
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Thoughts on technology, development, and the intersection of code and creativity.
            </motion.p>
          </div>

      {/* Search and Filters */}
      <motion.div 
        className="mb-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input with Clear Button */}
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts, tags, or content..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search blog posts"
              />
            </div>
            {/* Clear Filters - separate from search bar but shrinks it */}
            {(searchQuery || selectedTags.length > 0 || showOnlyFeatured) && (
              <Button 
                variant="outline" 
                onClick={clearFilters} 
                size="sm"
                className="shrink-0 h-10"
                aria-label="Clear all filters"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Tag Filter (adds a tag to selection) */}
          <select
            value={tagPicker}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              addTag(e.target.value)
              setTagPicker('')
            }}
            className="px-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Add tag to filter"
            title="Add a tag to filter"
          >
            <option value="">Add tag…</option>
            {allTags.map(tag => (
              <option key={tag} value={tag} disabled={selectedTags.includes(tag)}>
                {tag}
              </option>
            ))}
          </select>

          {/* Match mode toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Match</span>
            <Button
              size="sm"
              variant={filterMode === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterMode('all')}
              aria-pressed={filterMode === 'all'}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filterMode === 'any' ? 'default' : 'outline'}
              onClick={() => setFilterMode('any')}
              aria-pressed={filterMode === 'any'}
            >
              Any
            </Button>
          </div>

          {/* Featured Filter */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyFeatured}
              onChange={(e) => setShowOnlyFeatured(e.target.checked)}
              className="rounded border-input"
            />
            <span className="text-sm">Featured only</span>
          </label>

        </div>

        {/* Selected tags list */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer group"
                onClick={() => removeTag(tag)}
                aria-label={`Remove tag ${tag}`}
                title="Click to remove"
              >
                <span className="mr-1">{tag}</span>
                <X className="inline-block h-3 w-3 opacity-70 group-hover:opacity-100" />
              </Badge>
            ))}
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length === posts.length 
            ? `Showing all ${posts.length} posts`
            : `Showing ${filteredPosts.length} of ${posts.length} posts`
          }
        </p>
      </motion.div>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">

      {/* Blog Posts Grid */}
      {paginatedPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {paginatedPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <Card className="h-full card-hover-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-lg leading-tight group-hover:underline">
                        {post.title}
                      </CardTitle>
                      {post.featured && (
                        <Badge variant="secondary" className="shrink-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="line-clamp-2">
                      {post.summary}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs cursor-pointer hover:bg-muted"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            addTag(tag)
                          }}
                          title="Click to add to filters"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                            <Badge 
                              variant="outline" 
                              className="text-xs cursor-pointer"
                              aria-label={`Show ${post.tags.length - 3} more tags`}
                              title="Show more tags"
                            >
                              +{post.tags.length - 3}
                            </Badge>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start">
                            {post.tags.slice(3).map(tag => (
                              <DropdownMenuItem key={tag} onSelect={() => addTag(tag)}>
                                {tag}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    {/* Meta Information */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    {/* AI Assisted Badge */}
                    {post.aiAssisted && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          🤖 AI Assisted
                        </Badge>
                      </div>
                    )}

                    {/* Read More Link */}
                    <div className="mt-4">
                      <span className="text-sm font-medium text-primary hover:underline">
                        Read more →
                      </span>
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
          <p className="text-lg text-muted-foreground mb-4">
            No posts found matching your criteria.
          </p>
          <Button onClick={clearFilters} variant="outline">
            Clear filters and show all posts
          </Button>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div 
          className="flex justify-center items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
              const isCurrentPage = pageNum === currentPage
              const isNearCurrentPage = Math.abs(pageNum - currentPage) <= 2
              const isFirstOrLast = pageNum === 1 || pageNum === totalPages

              if (!isNearCurrentPage && !isFirstOrLast) {
                if (pageNum === 2 || pageNum === totalPages - 1) {
                  return <span key={pageNum} className="px-2">...</span>
                }
                return null
              }

              return (
                <Button
                  key={pageNum}
                  variant={isCurrentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </motion.div>
      )}
        </div>
      </div>
    </div>
  )
}
