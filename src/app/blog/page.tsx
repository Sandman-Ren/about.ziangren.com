/**
 * Blog List Page
 *
 * Server component that statically generates the blog list page.
 * The blog registry is imported synchronously, so no async/await needed.
 */

import { getAllBlogPosts } from '@/lib/blog/registry'
import { getAllCollections, getCollectionPosts } from '@/lib/blog/collections'
import BlogList from '@/components/blog/blog-list'

export default function BlogPage() {
  // Get all published posts, sorted by date
  const posts = getAllBlogPosts()

  // Get collections with post counts for the collections section
  const collections = getAllCollections().map(collection => ({
    ...collection,
    postCount: getCollectionPosts(collection.slug).length,
  }))

  return <BlogList posts={posts} collections={collections} />
}
