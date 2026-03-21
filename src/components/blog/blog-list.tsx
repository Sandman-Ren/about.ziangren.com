"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowRight, Calendar, Clock, Library, Search, Star, X } from "lucide-react";
import { BlogPost, Collection, SearchFilters } from "@/types/blog";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/formatting";
import { useBlogFilters } from "@/hooks/useBlogFilters";
import { POSTS_PER_PAGE, UI } from "@/lib/constants";

interface BlogListProps {
  posts: BlogPost[];
  collections?: Array<Collection & { postCount: number }>;
  initialFilters?: Partial<SearchFilters>;
}

export default function BlogList({
  posts,
  collections = [],
  initialFilters = {},
}: BlogListProps) {
  // Use the custom hook for all filtering, search, and pagination logic
  const {
    filteredPosts,
    paginatedPosts,
    allTags,
    currentPage,
    totalPages,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    selectedTags,
    addTag,
    removeTag,
    showOnlyFeatured,
    setShowOnlyFeatured,
    clearFilters,
    hasActiveFilters,
  } = useBlogFilters({ posts, initialFilters });

  // Skip pagination when the total post count is small
  const skipPagination = filteredPosts.length < POSTS_PER_PAGE * 2;
  const displayPosts = skipPagination ? filteredPosts : paginatedPosts;

  return (
    <div>
      {/* Header Section */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight">
                Blog
              </h1>
              <Link href="/blog/collections">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Library className="h-4 w-4" />
                  <span className="hidden sm:inline">Collections</span>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            className="mb-6 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Search row: input + featured toggle + clear */}
            <div className="flex gap-2 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearchQuery(e.target.value)
                  }
                  className="pl-10"
                  aria-label="Search blog posts"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                className={`shrink-0 h-10 gap-1.5 ${showOnlyFeatured ? "border-amber-500/50 bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 dark:border-amber-400/50 dark:bg-amber-400/10 dark:text-amber-300 dark:hover:bg-amber-400/20" : ""}`}
                aria-pressed={showOnlyFeatured}
                aria-label="Show featured posts only"
              >
                <Star className={`h-4 w-4 ${showOnlyFeatured ? "fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" : "text-amber-500 dark:text-amber-400"}`} />
                <span className="hidden sm:inline">Featured</span>
              </Button>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
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

            {/* Inline tag pills */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:pb-0">
              {allTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <Badge
                    key={tag}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-colors shrink-0 py-2 px-3.5 text-sm sm:py-0.5 sm:px-2.5 sm:text-xs ${
                      isSelected
                        ? ""
                        : "hover:bg-muted"
                    }`}
                    onClick={() => (isSelected ? removeTag(tag) : addTag(tag))}
                    aria-pressed={isSelected}
                    aria-label={isSelected ? `Remove tag ${tag}` : `Filter by tag ${tag}`}
                  >
                    {tag}
                    {isSelected && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                );
              })}
            </div>

            {/* Results count — only shown when filters narrow the list */}
            {hasActiveFilters && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredPosts.length} of {posts.length} posts
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Collections Section — hidden when filters are active */}
      {collections.length > 0 && !hasActiveFilters && (
        <div className="px-4 sm:px-6 lg:px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Library className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Collections
                  </h2>
                </div>
                <Link href="/blog/collections" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                  View all
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {collections.map((collection) => (
                  <Link
                    key={collection.slug}
                    href={`/blog/collections/${collection.slug}`}
                    className="block"
                  >
                    <Card className="cursor-pointer card-hover-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-medium text-sm leading-tight mb-1 truncate">
                              {collection.title}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {collection.description}
                            </p>
                          </div>
                          <Badge variant="secondary" className="text-xs shrink-0 py-0">
                            {collection.ordered
                              ? `${collection.postCount} parts`
                              : `${collection.postCount} posts`}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Blog Posts Grid */}
          {displayPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 mb-12">
              {displayPosts.map((post, index) => {
                const isFeatured = !!post.featured;

                return (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 * Math.min(index, 6),
                    }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <Card
                        className={`h-full cursor-pointer ${
                          isFeatured
                            ? "card-hover-shadow-featured"
                            : "card-hover-shadow"
                        }`}
                      >
                        <CardHeader>
                          {(isFeatured || post.collection) && (
                            <div className="flex items-center gap-1.5 mb-1">
                              {isFeatured && (
                                <Star className="h-4 w-4 shrink-0 text-amber-500 fill-amber-500 dark:text-amber-400 dark:fill-amber-400" />
                              )}
                              {post.collection && (
                                <Badge variant="secondary" className="text-xs gap-1 py-0">
                                  <Library className="h-3 w-3" />
                                  Series
                                </Badge>
                              )}
                            </div>
                          )}
                          <CardTitle className="text-lg leading-tight">
                            {post.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {post.summary}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {post.tags
                              .slice(0, UI.MAX_VISIBLE_TAGS)
                              .map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs cursor-pointer hover:bg-muted py-1 sm:py-0.5"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addTag(tag);
                                  }}
                                  title="Click to add to filters"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            {post.tags.length > UI.MAX_VISIBLE_TAGS && (
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <Badge
                                    variant="outline"
                                    className="text-xs cursor-pointer py-1 px-3 sm:py-0.5 sm:px-2.5"
                                    aria-label={`Show ${
                                      post.tags.length - UI.MAX_VISIBLE_TAGS
                                    } more tags`}
                                    title="Show more tags"
                                  >
                                    +{post.tags.length - UI.MAX_VISIBLE_TAGS}
                                  </Badge>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                  {post.tags
                                    .slice(UI.MAX_VISIBLE_TAGS)
                                    .map((tag) => (
                                      <DropdownMenuItem
                                        key={tag}
                                        onSelect={() => addTag(tag)}
                                      >
                                        {tag}
                                      </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>

                          {/* Meta Information */}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(post.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readingTime} min read</span>
                            </div>
                            {post.aiAssisted && (
                              <span className="text-muted-foreground/60">
                                AI assisted
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
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

          {/* Pagination — hidden when post count is small enough to show all */}
          {!skipPagination && totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isCurrentPage = pageNum === currentPage;
                    const isNearCurrentPage =
                      Math.abs(pageNum - currentPage) <= 2;
                    const isFirstOrLast =
                      pageNum === 1 || pageNum === totalPages;

                    if (!isNearCurrentPage && !isFirstOrLast) {
                      if (pageNum === 2 || pageNum === totalPages - 1) {
                        return (
                          <span key={pageNum} className="px-2">
                            ...
                          </span>
                        );
                      }
                      return null;
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
                    );
                  }
                )}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
