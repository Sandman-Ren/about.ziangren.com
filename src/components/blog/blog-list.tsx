"use client";

import { useState } from "react";
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
import { ArrowRight, Calendar, ChevronDown, Clock, Library, Search, Star, Tag, X } from "lucide-react";
import { BlogPost, Collection, SearchFilters } from "@/types/blog";
import { motion, AnimatePresence } from "framer-motion";
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
  const [tagsExpanded, setTagsExpanded] = useState(false);

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

  // Expand tags automatically when tags are selected
  const showTags = tagsExpanded || selectedTags.length > 0;

  return (
    <div className="h-full flex flex-col">
      {/* Header Section — fixed */}
      <div className="shrink-0 px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <motion.h1
              className="text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Blog
            </motion.h1>
          </div>

          {/* Search and Filters */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Search row: input + tags toggle + featured toggle + clear */}
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
                onClick={() => setTagsExpanded(!tagsExpanded)}
                className={`shrink-0 h-10 gap-1.5 ${showTags ? "border-foreground/30" : ""}`}
                aria-expanded={showTags}
                aria-label="Filter by tags"
              >
                <Tag className="h-4 w-4" />
                <span className="hidden sm:inline">Tags</span>
                {selectedTags.length > 0 && (
                  <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs rounded-full">
                    {selectedTags.length}
                  </Badge>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform ${showTags ? "rotate-180" : ""}`} />
              </Button>
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

            {/* Collapsible tag pills */}
            <AnimatePresence>
              {showTags && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results count — only shown when filters narrow the list */}
            {hasActiveFilters && (
              <p className="text-sm text-muted-foreground">
                Showing {filteredPosts.length} of {posts.length} posts
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Collections Section — fixed, hidden when filters are active */}
      {collections.length > 0 && !hasActiveFilters && (
        <div className="shrink-0 px-4 sm:px-6 lg:px-8 pb-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  Collections
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {collections.map((collection) => (
                  <motion.div
                    key={collection.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href={`/blog/collections/${collection.slug}`}
                      className="block h-full"
                    >
                      <Card className="h-full cursor-pointer card-hover-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Library className="h-4 w-4 text-muted-foreground" />
                            <Badge variant="secondary" className="text-xs gap-1 py-0">
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
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>View collection</span>
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Content Area — fills remaining height */}
      <div className="flex-1 min-h-0 flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex-1 min-h-0 flex flex-col">
          {/* Posts Section Header */}
          {collections.length > 0 && !hasActiveFilters && (
            <div className="shrink-0 flex items-center gap-3 mb-4">
              <h2 className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                Posts
              </h2>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

          {/* Scrollable Posts Grid */}
          {displayPosts.length > 0 ? (
            <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
              <div className="grid gap-6 md:grid-cols-2 pb-4">
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
            </div>
          ) : (
            <div className="flex-1 min-h-0 flex items-center justify-center">
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
            </div>
          )}

          {/* Pagination — pinned below scrollable area */}
          {!skipPagination && totalPages > 1 && (
            <motion.div
              className="shrink-0 flex justify-center items-center space-x-2 py-4 border-t border-border/40"
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
